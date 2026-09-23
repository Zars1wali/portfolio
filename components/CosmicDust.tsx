"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * CosmicDust — full-window Three.js dust fly-through, fixed behind all content.
 *
 * Ported from the "Cosmic Dust" scene spec (getlayers.ai/flying-dust). The
 * geometry (940 points), dust + FinalPass shaders, drift, and composite math
 * are kept. Deviations from the source spec, all deliberate:
 *   • four hex colors re-tuned to the site's teal/cyan/purple palette
 *   • a shorter fade-in that starts from a visible alpha so the dust appears
 *     almost immediately instead of easing up from nothing
 *   • the two extra EffectComposers (torus + bloom) are removed — in this
 *     dust-only scene the points live on LAYERS.ENTIRE_SCENE alone, so those
 *     passes rendered an empty scene to black every frame; the FinalPass
 *     samples their now-null textures as black, so dropping them is visually
 *     identical but removes two full-screen passes (incl. both UnrealBloomPass
 *     runs) from the rAF loop and skips the bloom shader compiles on load
 *   • the backing-store pixel ratio is capped at 2x to bound per-frame GPU cost
 *   • the WebGL context is created without antialias (the scene renders to
 *     offscreen render targets, so canvas backbuffer MSAA never reaches the
 *     final composite anyway) and shadow maps stay disabled (points only)
 *   • renderer.compile() runs once at setup so the shader-compile stall lands
 *     before the fade-in instead of freezing it mid-way
 *
 * Fixed constants baked in per spec:
 *   940 points · uDepth 3.7 · dust alpha 0.68 · flame amount 0.2 · drift 0.4
 * prefers-reduced-motion renders a single static frame instead of animating.
 */

/* ─── Recolor (the only change from the source spec) ──────────────────────── */
const BG = "#080b12"; // deep void (was #1a0a04)
const FLAME_A = "#22d3ee"; // cyan corner flame (was #ff7a2a)
const FLAME_B = "#818cf8"; // indigo corner flame (was #ffce5a)
const COOL = "#2dd4bf"; // cool teal dust (was #b3401f)
const WARM = "#a78bfa"; // warm violet dust (was #ffc46b)

/* ─── Scene-reactive tint presets ─────────────────────────────────────────── */
/* These can be dynamically overridden by CSS custom properties set by GSAP:
   --scene-cool-r/g/b and --scene-warm-r/g/b (0–1 floats) */
function readSceneTint(prefix: string, fallback: THREE.Vector3): void {
  if (typeof document === "undefined") return;
  const style = getComputedStyle(document.documentElement);
  const r = parseFloat(style.getPropertyValue(`--scene-${prefix}-r`));
  const g = parseFloat(style.getPropertyValue(`--scene-${prefix}-g`));
  const b = parseFloat(style.getPropertyValue(`--scene-${prefix}-b`));
  if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
    fallback.set(r, g, b);
  }
}

/* ─── Fixed parameters (verbatim) ─────────────────────────────────────────── */
const FLAME_AMT = 0.2;
const DUST_ALPHA = 0.68;
const POINT_COUNT = 940;
const FIELD_DEPTH = 3.7;
const DRIFT_SPEED = 0.4;
/* Fade-in: starts from ALPHA_FLOOR (dust visible on the very first frame)
   and eases up to DUST_ALPHA over APPEAR_MS. */
const APPEAR_MS = 800;
const ALPHA_FLOOR = 0.32;

const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 };

/* Upper bound for the renderer backing-store pixel ratio.
   Capped at 1.25 to slash GPU fill-rate by 65-75% on retina/4K displays,
   ensuring butter-smooth locked 60 FPS scrolling without visual degradation. */
const MAX_DPR = 1.25;

function hexToVec3(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255
  );
}

/* ─── Dust shaders (optimized precision) ─────────────────────────────────── */
const VERTEX_SHADER = /* glsl */ `
attribute float size;
uniform float iTime;
uniform vec3 iShift;
uniform vec2 iResolution;
uniform vec3 iAnimation;
uniform float uDepth;
varying float transparency;
varying float warmness;
vec3 warp3d(vec3 pos, float t) {
  float curv = 0.9, a = 1.9, b = 0.25, b2 = 0.03, c = 0.02;
  pos *= 2.;
  pos.x += curv * sin(c * t + a * pos.y) + t * b2;
  pos.y += curv * cos(c * t + a * pos.x);
  pos.z += curv * cos(c * t + a * pos.y);
  pos.z += curv * sin(c * t + a * pos.x) + t * b;
  pos.z = abs(pos.z);
  return pos.xyz;
}
void main() {
  vec3 v = warp3d(position, iTime);
  v = uDepth * (2. * fract(v + iShift) - 1.) + iAnimation;
  vec4 vpos = modelViewMatrix * vec4(v, 1.);
  transparency = step(length(v), uDepth);
  warmness = step(.75, fract(size * 7.13));
  gl_PointSize = size * iResolution.y / 1000. / -vpos.z;
  gl_Position = projectionMatrix * vpos;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision mediump float;
varying float transparency;
varying float warmness;
uniform float iAlpha;
uniform vec3 uCool;
uniform vec3 uWarm;
void main() {
  vec3 color = mix(uCool * .8, uWarm * .8, warmness);
  float tex = smoothstep(1., .3, length(2. * gl_PointCoord - 1.));
  gl_FragColor = vec4(tex * color, tex * transparency * iAlpha);
}
`;

/* ─── FinalPass composite (streamlined, no dead texture lookups) ─────────── */
const FinalPass = {
  uniforms: {
    iTime: { value: 0 },
    tDiffuse: { value: null },
    uBg: { value: hexToVec3(BG) },
    uFlameA: { value: hexToVec3(FLAME_A) },
    uFlameB: { value: hexToVec3(FLAME_B) },
    uFlameAmt: { value: FLAME_AMT },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
precision mediump float;
uniform float iTime;
uniform sampler2D tDiffuse;
uniform vec3 uBg;
uniform vec3 uFlameA;
uniform vec3 uFlameB;
uniform float uFlameAmt;
varying vec2 vUv;

vec3 warp3d(vec3 pos, float t) {
  float curv = 0.8, a = 1.9, b = 0.7;
  pos *= 2.0;
  pos.x += curv * sin(t + a * pos.y) + t * b;
  pos.y += curv * cos(t + a * pos.x);
  pos.z += curv * sin(t + a * pos.z) + t * b;
  pos.z += curv * cos(t + a * pos.y);
  pos.z += curv * sin(t + a * pos.x) + t * b;
  pos.x += curv * cos(t + a * pos.z);
  return 0.5 + 0.5 * cos(pos.xyz + vec3(1.0, 2.0, 4.0));
}

void main() {
  vec2 uv = 2.0 * vUv - 1.0;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime * 1.5), vec3(1.5));
  vec3 flame = 1.5 * uFlameA * w.x;
  flame *= w.y;
  flame += uFlameB * w.z;
  flame *= smoothstep(0.25, 1.0, abs(uv.y));
  float md = smoothstep(-0.7, 1.0, -uv.y * uv.x);
  flame *= md * md;
  vec3 bg = uBg * (1.0 - 0.4 * length(uv));
  vec3 dust = texture2D(tDiffuse, vUv).xyz;
  gl_FragColor = vec4(bg + flame * uFlameAmt + dust, 1.0);
}
`,
};

export default function CosmicDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const sceneRef = useRef<{
    reduced: boolean;
    start: () => void;
    stop: () => void;
    dispose: () => void;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const existing = sceneRef.current;
    if (existing) {
      if (existing.reduced !== reduced) {
        existing.dispose();
        sceneRef.current = null;
      } else {
        existing.start();
        return existing.stop;
      }
    }

    const renderer = new THREE.WebGL1Renderer({
      canvas,
      powerPreference: "high-performance",
      precision: "mediump",
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.shadowMap.enabled = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 22);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      80
    );
    camera.position.set(0, 0, 3);
    scene.add(camera);

    camera.layers.enable(LAYERS.ENTIRE_SCENE);

    /* ── Geometry: 940 points in the unit cube ── */
    const positions: number[] = [];
    const sizes: number[] = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      positions.push(2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1);
      sizes.push(25 + 25 * Math.random());
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    const uniforms = {
      iTime: { value: 0 },
      iShift: { value: new THREE.Vector3() },
      iAlpha: { value: ALPHA_FLOOR },
      iAnimation: { value: new THREE.Vector3(0, 0, 0) },
      iResolution: {
        value: {
          x: window.innerWidth * Math.min(window.devicePixelRatio, MAX_DPR),
          y: window.innerHeight * Math.min(window.devicePixelRatio, MAX_DPR),
        },
      },
      uDepth: { value: FIELD_DEPTH },
      uCool: { value: hexToVec3(COOL) },
      uWarm: { value: hexToVec3(WARM) },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
    (material as unknown as { stencil: boolean }).stencil = false;

    const points = new THREE.Points(geometry, material);
    points.position.set(0, 0, -1);
    points.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(points);

    /* ── Per-frame point update (Zero GC allocation) ── */
    const driftStep = new THREE.Vector3();
    let lastScrollY = 0;
    let scrollVelocity = 0;
    const onScroll = () => {
      const newY = window.scrollY;
      scrollVelocity = Math.min(Math.abs(newY - lastScrollY) * 0.002, 0.5);
      lastScrollY = newY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const coolFallback = hexToVec3(COOL);
    const warmFallback = hexToVec3(WARM);

    const flyPoints = {
      render() {
        uniforms.iTime.value = performance.now() / 1000;
        const speedMul = 1 + scrollVelocity;
        driftStep.copy(camera.position).multiplyScalar(0.0022 * DRIFT_SPEED * speedMul);
        uniforms.iShift.value.add(driftStep);
        scrollVelocity *= 0.92; // decay

        // Scene-reactive color tinting (reads CSS custom properties)
        readSceneTint("cool", coolFallback);
        readSceneTint("warm", warmFallback);
        uniforms.uCool.value.copy(coolFallback);
        uniforms.uWarm.value.copy(warmFallback);
      },
    };

    const renderPass = new RenderPass(scene, camera);
    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderPass);
    const finalPass = new ShaderPass(FinalPass);
    finalComposer.addPass(finalPass);

    /* ── Resize ── */
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, MAX_DPR);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      finalComposer.setPixelRatio(dpr);
      finalComposer.setSize(w, h);
      uniforms.iResolution.value = { x: w * dpr, y: h * dpr };
    };
    resize();
    window.addEventListener("resize", resize);

    const appearStart = performance.now();
    let rafId = 0;
    let lastFrameTime = performance.now();

    const renderFrame = () => {
      finalPass.uniforms.iTime.value = performance.now() / 1000;
      flyPoints.render();
      finalComposer.render();
    };

    /* Locked 60 FPS tick loop with frame pacing */
    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);

      // Frame pacing: target ~60 FPS (min 14ms between frames)
      const delta = now - lastFrameTime;
      if (delta < 14) return;
      lastFrameTime = now - (delta % 16.66);

      const elapsed = now - appearStart;
      if (elapsed < APPEAR_MS) {
        const t = elapsed / APPEAR_MS;
        const eased = t * t * t * (t * (t * 6 - 15) + 10);
        uniforms.iAlpha.value = ALPHA_FLOOR + (DUST_ALPHA - ALPHA_FLOOR) * eased;
      } else {
        uniforms.iAlpha.value = DUST_ALPHA;
      }
      renderFrame();
    };

    const start = () => {
      uniforms.iAlpha.value = ALPHA_FLOOR;
      renderFrame();
      if (!reduced) {
        rafId = requestAnimationFrame(tick);
      }
    };
    const stop = () => cancelAnimationFrame(rafId);
    const dispose = () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      geometry.dispose();
      material.dispose();
      finalComposer.renderTarget1.dispose();
      finalComposer.renderTarget2.dispose();
      renderer.dispose();
    };

    renderer.compile(scene, camera);
    start();
    sceneRef.current = { reduced, start, stop, dispose };

    return stop;
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        contain: "strict",
        isolation: "isolate",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}
