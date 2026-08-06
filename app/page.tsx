import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import {
  siPython,
  siTypescript,
  siDocker,
  siNginx,
  siLinux,
  siCplusplus,
} from "simple-icons";
import GlassPanel from "@/components/GlassPanel";
import FeaturedProjectsStub from "@/components/FeaturedProjectsStub";
import TypeWriter from "@/components/TypeWriter";
import ToolsIUse from "@/components/ToolsIUse";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "zarss — Cybersecurity & Software",
  description:
    "Personal portfolio of Umer (zarss) — BS Cybersecurity @ GIKI, Co-Founder/COO of Zero Point Intel.",
};

interface HeroChip {
  name: string;
  color: string;
  path: string;
  dx: number;
  dy: number;
}

/* Floating tech chips on a circular orbit around the avatar. Each chip is
   offset by --dx/--dy (px) from the orbit centre at (50%, 28.5%) of the
   stage, on a circle of radius 105px — 6 chips at 60° intervals. Every
   chip sits clear of the cutout silhouette (head/torso). */
const ORBIT_RADIUS = 105;

function orbitPoint(angleDeg: number): { dx: number; dy: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    dx: Math.round(ORBIT_RADIUS * Math.cos(rad)),
    dy: Math.round(ORBIT_RADIUS * Math.sin(rad)),
  };
}

const HERO_CHIPS: HeroChip[] = [
  { name: "TypeScript", color: "#3178C6", path: siTypescript.path, ...orbitPoint(240) },
  { name: "Docker", color: "#2496ED", path: siDocker.path, ...orbitPoint(300) },
  { name: "NGINX", color: "#009639", path: siNginx.path, ...orbitPoint(0) },
  { name: "C++", color: "#00599C", path: siCplusplus.path, ...orbitPoint(60) },
  { name: "Linux", color: "#FCC624", path: siLinux.path, ...orbitPoint(120) },
  { name: "Python", color: "#3776AB", path: siPython.path, ...orbitPoint(180) },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex items-center justify-center p-6 min-h-[80vh]">
        <GlassPanel wide transparent>
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center md:justify-center md:gap-12">
            {/* ── Avatar ── */}
            <div className="avatar-stage mb-[26px] md:mb-0 shrink-0">
              <Image
                src="/images/avatar-v3.png"
                alt="Portrait of Umer (zarss)"
                width={170}
                height={350}
                priority
                sizes="170px"
                className="avatar-figure"
              />
              <div className="avatar-shadow" aria-hidden="true" />
              <div className="hero-orbit-ring" aria-hidden="true" />
              {HERO_CHIPS.map((chip, i) => (
                <div
                  key={chip.name}
                  className="hero-chip"
                  style={
                    {
                      "--chip": chip.color,
                      "--dx": `${chip.dx}px`,
                      "--dy": `${chip.dy}px`,
                      "--delay": `${i * 0.5}s`,
                    } as CSSProperties
                  }
                  title={chip.name}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={chip.path} />
                  </svg>
                </div>
              ))}
            </div>

            {/* ── Copy ── */}
            <div className="hero-copy flex flex-col items-center md:items-start">
              <div className="font-mono text-[12px] tracking-[0.12em] text-cyan flex items-center gap-2 mb-[14px]">
                <span className="block w-[6px] h-[6px] rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
                {"// hello_world"}
              </div>

              <h1 className="text-[clamp(34px,5.5vw,52px)] mb-[12px]">
                Hi! I&apos;m <span className="gradient-text">Umer.</span>
              </h1>

              <p className="text-[17px] leading-[1.6] text-fog mb-[12px] min-h-[54px] md:min-h-[27px] font-mono">
                <TypeWriter />
              </p>

              <p className="text-[15px] leading-[1.6] text-mist mb-[30px] max-w-[46ch]">
                Co-Founder &amp; COO at Zero Point Intel — security
                engineering, software, and the systems in between.
              </p>

              <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                <Link
                  href="/projects"
                  className="font-mono text-[12.5px] font-medium bg-cyan text-void px-[18px] py-[10px] rounded-[10px] border border-cyan transition-colors hover:bg-[#6EF0DA] hover:text-void"
                >
                  See My Work
                </Link>
                <ToolsIUse />
                <a
                  href="https://paxel.ycombinator.com/results/cimwolox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-trigger"
                  data-tip="See my AI coding report — powered by Paxel (Y Combinator)"
                  aria-label="How I use AI — see my AI coding report, powered by Paxel (Y Combinator)"
                >
                  <Sparkles width={14} height={14} aria-hidden="true" />
                  How I use AI
                </a>
                <a
                  href="https://www.linkedin.com/in/nunori/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-trigger"
                  aria-label="Meet my mentor on LinkedIn"
                >
                  <GraduationCap width={14} height={14} aria-hidden="true" />
                  Meet my mentor
                </a>
              </div>
            </div>
          </div>

          <style>{`
            /* Floating figure: plain cutout directly over the cosmic-dust
               page background. No circle, no ring, no glow disc behind it —
               just the figure bobbing gently, grounded by a soft elliptical
               shadow beneath its feet. */
            .avatar-stage {
              position: relative;
              width: 258px;
              height: 420px;
              contain: layout;
              isolation: isolate;
            }
            .avatar-figure {
              position: absolute;
              top: 20px;
              left: 50%;
              margin-left: -85px;
              width: 170px;
              height: 350px;
              filter: drop-shadow(0 14px 30px rgba(0, 0, 0, 0.35));
              animation: float 4s ease-in-out infinite;
              will-change: transform;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50%      { transform: translateY(-12px); }
            }

            /* Soft grounding shadow under the figure's feet — separate from
               the image, pulsing slightly opposite to the float. */
            .avatar-shadow {
              position: absolute;
              bottom: -10px;
              left: 50%;
              transform: translateX(-50%);
              width: 60%;
              height: 20px;
              background: radial-gradient(ellipse, rgba(0, 0, 0, 0.5) 0%, transparent 70%);
              filter: blur(8px);
              z-index: -1;
              animation: shadow-pulse 4s ease-in-out infinite;
              pointer-events: none;
            }
            @keyframes shadow-pulse {
              0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.85; }
              50%      { transform: translateX(-50%) scale(0.92); opacity: 0.55; }
            }

            /* Circular orbit around the avatar — chips at 60° intervals on a
               radius-105px circle centred at the upper body (50%, 28.5%).
               A faint dashed ring ties the chips into a circle; it renders
               behind the figure, so the cutout hides the arc where it passes
               over the body. Chips sit above everything (z-index 2), each
               bobbing with its own stagger. */
            .hero-orbit-ring {
              position: absolute;
              left: 50%;
              top: 28.5%;
              width: 210px;
              height: 210px;
              border-radius: 50%;
              border: 1px dashed rgba(255,255,255,0.08);
              transform: translate(-50%, -50%);
              pointer-events: none;
              z-index: 0;
            }
            .hero-chip {
              position: absolute;
              left: calc(50% + var(--dx));
              top: calc(28.5% + var(--dy));
              transform: translate(-50%, -50%);
              width: 42px;
              height: 42px;
              border-radius: 12px;
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.12);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--chip);
              box-shadow:
                0 0 20px -4px var(--chip),
                0 10px 22px -10px rgba(0,0,0,0.65);
              z-index: 2;
              animation: chip-float 5.5s ease-in-out var(--delay) infinite;
              will-change: transform;
              pointer-events: none;
            }
            .hero-chip svg {
              width: 22px;
              height: 22px;
              filter: drop-shadow(0 0 6px var(--chip));
            }
            @keyframes chip-float {
              0%, 100% { transform: translate(-50%, -50%) translateY(0); }
              50%      { transform: translate(-50%, -50%) translateY(-7px); }
            }

            /* Ghost button (dark bg, cyan border, icon + label) — shared by
               the external "How I use AI" link and the "Meet my mentor" link */
            .ghost-trigger {
              position: relative;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-family: var(--font-jetbrains), monospace;
              font-size: 12.5px;
              color: var(--color-cyan);
              background: rgba(86,232,208,0.06);
              border: 1px solid rgba(86,232,208,0.35);
              padding: 10px 18px;
              border-radius: 10px;
              cursor: pointer;
              transition: border-color 0.15s, color 0.15s, background 0.15s;
            }
            .ghost-trigger:hover {
              border-color: var(--color-cyan);
              background: rgba(86,232,208,0.12);
            }
            .ghost-trigger[data-tip]::after {
              content: attr(data-tip);
              position: absolute;
              bottom: calc(100% + 10px);
              left: 50%;
              transform: translateX(-50%) translateY(4px);
              width: max-content;
              max-width: 260px;
              padding: 7px 10px;
              border-radius: 8px;
              background: rgba(11,18,32,0.95);
              border: 1px solid rgba(86,232,208,0.25);
              color: var(--color-fog);
              font-size: 11px;
              line-height: 1.4;
              font-family: var(--font-sans), system-ui, sans-serif;
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.15s ease, transform 0.15s ease;
              z-index: 30;
            }
            .ghost-trigger[data-tip]:hover::after {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }

            /* Subtle full-bleed radial vignette behind the hero text block
               only — keeps copy readable over bright dust motes without
               reintroducing a boxed panel (soft fade, no edge). */
            .hero-copy {
              position: relative;
              z-index: 1;
            }
            .hero-copy::before {
              content: "";
              position: absolute;
              inset: -24px -64px;
              z-index: -1;
              background: radial-gradient(
                ellipse 70% 60% at center,
                rgba(5, 7, 12, 0.35),
                transparent 72%
              );
              pointer-events: none;
            }

            .gradient-text {
              background: linear-gradient(90deg, var(--color-cyan), var(--color-violet) 55%, var(--color-cyan));
              background-size: 200% auto;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              animation: shimmer 4s linear infinite;
            }
            @keyframes shimmer {
              to { background-position: 200% center; }
            }
            .tw-cursor {
              display: inline-block;
              margin-left: 3px;
              color: var(--color-cyan);
              animation: blink 1s step-end infinite;
            }
            @keyframes blink {
              50% { opacity: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
              .avatar-figure,
              .avatar-shadow,
              .hero-chip,
              .gradient-text,
              .tw-cursor { animation: none; }
            }
          `}</style>
        </GlassPanel>
      </section>

      <FeaturedProjectsStub />
    </div>
  );
}
