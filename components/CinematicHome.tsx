"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Sparkles, ChevronDown } from "lucide-react";
import {
  siPython,
  siTypescript,
  siDocker,
  siNginx,
  siLinux,
  siCplusplus,
} from "simple-icons";
import CinematicScene from "@/components/CinematicScene";
import SceneIndicator from "@/components/SceneIndicator";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import MagneticButton from "@/components/MagneticButton";
import CounterAnimation from "@/components/CounterAnimation";
import ToolsIUse from "@/components/ToolsIUse";

/* ─── Hero chip orbit data ────────────────────────────────────────────────── */
interface HeroChip {
  name: string;
  color: string;
  path: string;
  dx: number;
  dy: number;
}

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

/* ─── Typewriter strings ─────────────────────────────────────────────────── */
const TYPEWRITER_STRINGS = [
  "Building AI systems that can't afford to be wrong.",
  "WhatsApp-native agentic commerce.",
  "Sub-50μs C++ trading infrastructure.",
  "Zero-hallucination ReACT loops.",
  "Full-stack. AI. Cybersecurity.",
];

/* ─── Skills data ────────────────────────────────────────────────────────── */
const skillGroups = [
  {
    label: "Languages & Systems",
    skills: ["C++ (C++20)", "Python", "TypeScript", "Linux Systems", "Lock-Free Concurrency"],
  },
  {
    label: "Agentic AI & Orchestration",
    skills: ["LangGraph", "CrewAI", "Prompt Engineering", "ReAct Pattern", "HITL Guardrails", "RAG"],
  },
  {
    label: "LLMs & Multimodal AI",
    skills: ["Gemini 3.5 Flash Lite", "Gemini Vision", "Deepgram Nova-3 STT"],
  },
  {
    label: "Backend & APIs",
    skills: ["FastAPI", "AsyncIO", "Meta WhatsApp Platform", "REST APIs"],
  },
  {
    label: "Full-Stack & Web",
    skills: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    label: "DevOps & Infrastructure",
    skills: ["Docker", "Linux VPS", "Caddy Auto-TLS", "Git"],
  },
  {
    label: "Trading & Data",
    skills: ["CLOB API Connectivity", "Tick-to-Trade Optimization", "Sentinel-2 / SAR"],
  },
  {
    label: "Cybersecurity",
    skills: ["Malware Analysis", "Kali Linux", "Burp Suite", "MITRE ATT&CK", "NIST"],
  },
];

/* ─── Scene color tints for GSAP ─────────────────────────────────────────── */
const SCENE_TINTS = [
  { cool: [0.178, 0.831, 0.749], warm: [0.655, 0.545, 0.980] }, // Hero: cyan/violet
  { cool: [0.545, 0.490, 0.965], warm: [0.506, 0.776, 0.953] }, // Work: violet/blue
  { cool: [0.961, 0.620, 0.043], warm: [0.980, 0.745, 0.180] }, // About: amber/gold
  { cool: [0.231, 0.510, 0.965], warm: [0.133, 0.878, 0.878] }, // Skills: blue/teal
  { cool: [0.898, 0.906, 0.922], warm: [0.655, 0.545, 0.980] }, // Contact: white/violet
];

export default function CinematicHome() {
  const [revealed, setRevealed] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [soundMuted, setSoundMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ─── Cinematic entrance ─────────────────────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(timer);
  }, []);

  /* ─── Sound cue on entrance ─────────────────────────────────────────── */
  useEffect(() => {
    if (soundMuted) return;
    const playSound = () => {
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.2);
      } catch {
        /* AudioContext may be blocked by browser autoplay policy */
      }
    };
    // Play on first user interaction (click/scroll) to satisfy autoplay policy
    const trigger = () => {
      playSound();
      window.removeEventListener("click", trigger);
      window.removeEventListener("scroll", trigger);
    };
    window.addEventListener("click", trigger, { once: true });
    window.addEventListener("scroll", trigger, { once: true, passive: true });
    return () => {
      window.removeEventListener("click", trigger);
      window.removeEventListener("scroll", trigger);
    };
  }, [soundMuted]);

  /* ─── Typewriter loop ────────────────────────────────────────────────── */
  useEffect(() => {
    let strIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = TYPEWRITER_STRINGS[strIdx];
      if (!deleting) {
        charIdx++;
        setTypewriterText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          timeout = setTimeout(() => { deleting = true; tick(); }, 2000);
          return;
        }
        timeout = setTimeout(tick, 45);
      } else {
        charIdx--;
        setTypewriterText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          strIdx = (strIdx + 1) % TYPEWRITER_STRINGS.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 25);
      }
    };

    timeout = setTimeout(tick, 1500); // delay start for entrance animation
    return () => clearTimeout(timeout);
  }, []);

  /* ─── GSAP ScrollTrigger: scene color morphing ──────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: { revert: () => void } | null = null;

    (async () => {
      const gsapMod = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const root = document.documentElement;

      ctx = gsap.context(() => {
        SCENE_TINTS.forEach((tint, i) => {
          if (i === 0) return; // first scene is the default
          const sceneEl = document.getElementById(
            ["scene-hero", "scene-work", "scene-about", "scene-skills", "scene-contact"][i]
          );
          if (!sceneEl) return;

          gsap.to(root, {
            "--scene-cool-r": tint.cool[0],
            "--scene-cool-g": tint.cool[1],
            "--scene-cool-b": tint.cool[2],
            "--scene-warm-r": tint.warm[0],
            "--scene-warm-g": tint.warm[1],
            "--scene-warm-b": tint.warm[2],
            scrollTrigger: {
              trigger: sceneEl,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          });
        });

        /* ─── Scroll-triggered text reveals for Scene 3 (About) ─── */
        const aboutItems = document.querySelectorAll(".about-reveal");
        aboutItems.forEach((el, i) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ─── Scroll-triggered reveals for Scene 4 (Skills) ─── */
        const skillCards = document.querySelectorAll(".skill-card-reveal");
        skillCards.forEach((el, i) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ─── Scroll-triggered reveals for Scene 5 (Contact) ─── */
        const contactItems = document.querySelectorAll(".contact-reveal");
        contactItems.forEach((el, i) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      });
    })();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <SceneIndicator />

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 1 — HERO (Cinematic Entrance)
      ═══════════════════════════════════════════════════════════════════ */}
      <CinematicScene id="scene-hero">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "0px",
            transition: "opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1), transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Avatar Stage */}
          <div className="avatar-stage" style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 1.2s ease 0.3s",
          }}>
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
                style={{
                  "--chip": chip.color,
                  "--dx": `${chip.dx}px`,
                  "--dy": `${chip.dy}px`,
                  "--delay": `${0.8 + i * 0.15}s`,
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.8 + i * 0.15}s`,
                } as CSSProperties}
                title={chip.name}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d={chip.path} />
                </svg>
              </div>
            ))}
          </div>

          {/* Copy */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.6s, transform 1s ease 0.6s",
          }}>
            <div style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: "var(--color-cyan)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}>
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--color-cyan)",
                boxShadow: "0 0 8px var(--color-cyan)",
                display: "block",
              }} />
              {"// hello_world"}
            </div>

            <h1 style={{
              fontSize: "clamp(34px, 5.5vw, 52px)",
              marginBottom: "12px",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
            }}>
              Hi! I&apos;m <span className="gradient-text">Umer.</span>
            </h1>

            <p style={{
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--color-fog)",
              marginBottom: "12px",
              minHeight: "54px",
              fontFamily: "var(--font-jetbrains), monospace",
            }}>
              {typewriterText}
              <span className="tw-cursor">|</span>
            </p>

            <p style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--color-mist)",
              marginBottom: "30px",
              maxWidth: "46ch",
            }}>
              Co-Founder &amp; COO at Zero Point Intel — security
              engineering, software, and the systems in between.
            </p>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              opacity: revealed ? 1 : 0,
              transition: "opacity 0.8s ease 1.2s",
            }}>
              <MagneticButton>
                <button
                  onClick={() => {
                    const el = document.getElementById("scene-work");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="cta-primary"
                >
                  See My Work
                </button>
              </MagneticButton>
              <ToolsIUse />
              <MagneticButton>
                <a
                  href="https://paxel.ycombinator.com/results/b1qyu7zu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-trigger"
                >
                  <Sparkles width={14} height={14} aria-hidden="true" />
                  How I use AI
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/nunori/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-trigger"
                >
                  <GraduationCap width={14} height={14} aria-hidden="true" />
                  Meet my mentor
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Sound mute toggle */}
        <button
          onClick={() => setSoundMuted(!soundMuted)}
          aria-label={soundMuted ? "Unmute sound" : "Mute sound"}
          style={{
            position: "absolute",
            bottom: "80px",
            right: "24px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            padding: "8px",
            color: soundMuted ? "var(--color-mist)" : "var(--color-cyan)",
            cursor: "pointer",
            fontSize: "11px",
            fontFamily: "var(--font-jetbrains), monospace",
            opacity: revealed ? 0.6 : 0,
            transition: "opacity 0.5s ease 1.5s",
          }}
        >
          {soundMuted ? "🔇" : "🔊"}
        </button>

        {/* Scroll hint */}
        <div style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: revealed ? 0.5 : 0,
          transition: "opacity 1s ease 1.8s",
          animation: "scroll-hint 2s ease-in-out infinite",
        }}>
          <span style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "10px",
            color: "var(--color-mist)",
            letterSpacing: "0.15em",
          }}>
            SCROLL
          </span>
          <ChevronDown size={16} color="var(--color-mist)" />
        </div>
      </CinematicScene>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 2 — FEATURED WORK (Horizontal Carousel)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="scene-work">
        <div style={{
          padding: "60px 0 0",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-violet)",
            marginBottom: "10px",
          }}>
            FEATURED WORK
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            marginBottom: "8px",
          }}>
            Shipped Projects
          </h2>
          <p style={{
            color: "var(--color-mist)",
            fontSize: "15px",
            marginBottom: "40px",
          }}>
            Scroll to explore flagship deployments
          </p>
        </div>
        <HorizontalCarousel />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 3 — ABOUT / PHILOSOPHY
      ═══════════════════════════════════════════════════════════════════ */}
      <CinematicScene id="scene-about" flexible>
        <div style={{
          maxWidth: "800px",
          width: "100%",
          padding: "100px 24px 80px",
          margin: "0 auto",
        }}>
          <div className="about-reveal" style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-cyan)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--color-cyan)",
              boxShadow: "0 0 8px var(--color-cyan)",
              display: "block",
            }} />
            ABOUT
          </div>

          <h2 className="about-reveal" style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            marginBottom: "28px",
          }}>
            Umer Wali
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p className="about-reveal" style={{
              color: "var(--color-fog)",
              fontWeight: 500,
              fontSize: "16.5px",
              lineHeight: 1.6,
            }}>
              I build AI and full-stack systems that can&apos;t afford to be wrong under pressure. From production AI backends to microsecond trading infrastructure, I own the complete path from architecture to delivery, not just the code in between.
            </p>
            <p className="about-reveal" style={{ color: "var(--color-mist)", fontSize: "15px", lineHeight: 1.7 }}>
              During my Backend AI Engineering internship at FlyRank AI, I built production-grade RAG pipelines, structured-output systems, and tool-calling workflows, reviewed against rubric-based evaluation sets for correctness and grounding. I led a three-developer team, under a senior architect&apos;s mentorship, to ship a live multi-vendor commerce marketplace connecting EU artisan brands with customers.
            </p>
            <p className="about-reveal" style={{ color: "var(--color-mist)", fontSize: "15px", lineHeight: 1.7 }}>
              My approach combines deep systems thinking with full-stack execution. On Rabta AI, a WhatsApp-native AI sales agent I built end to end, I kept routing logic fully deterministic and used the language model only for generation, because grounded, predictable behavior matters more than flashy autonomy. That same discipline drove me to architect a C++ arbitrage bot achieving sub-50 microsecond tick-to-trade latency with a 68% win rate.
            </p>
            <p className="about-reveal" style={{
              color: "var(--color-cyan)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "14px",
              paddingTop: "8px",
            }}>
              If you&apos;re building AI products that need to be reliable in production, let&apos;s talk.
            </p>
          </div>
        </div>
      </CinematicScene>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 4 — SKILLS & ARSENAL
      ═══════════════════════════════════════════════════════════════════ */}
      <CinematicScene id="scene-skills" flexible>
        <div style={{
          maxWidth: "900px",
          width: "100%",
          padding: "100px 24px 80px",
          margin: "0 auto",
        }}>
          <div className="skill-card-reveal" style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-cyan)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--color-cyan)",
              boxShadow: "0 0 8px var(--color-cyan)",
              display: "block",
            }} />
            ARSENAL
          </div>

          <h2 className="skill-card-reveal" style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            marginBottom: "32px",
          }}>
            Technical Skills
          </h2>

          {/* Counter stats row */}
          <div className="skill-card-reveal" style={{
            display: "flex",
            gap: "clamp(24px, 4vw, 48px)",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}>
            {[
              { target: 8, suffix: "+", label: "Projects Shipped" },
              { target: 6, suffix: "", label: "Languages" },
              { target: 50, suffix: "μs", prefix: "<", label: "Tick-to-Trade" },
              { target: 24, suffix: "/7", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  color: "var(--color-fog)",
                  lineHeight: 1,
                }}>
                  <CounterAnimation
                    target={stat.target}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2000}
                  />
                </div>
                <div style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "11px",
                  color: "var(--color-mist)",
                  letterSpacing: "0.05em",
                  marginTop: "6px",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Skills grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}>
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="skill-card-reveal"
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,240,255,0.12)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  transition: "border-color 0.3s, background 0.3s",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "11px",
                  color: "var(--color-cyan)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "var(--color-cyan)",
                    boxShadow: "0 0 6px var(--color-cyan)",
                    display: "inline-block",
                  }} />
                  {group.label}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontSize: "12px",
                        color: "#E0F7FA",
                        background: "rgba(0,240,255,0.06)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border: "1px solid rgba(0,240,255,0.2)",
                        boxShadow: "0 0 8px rgba(0,240,255,0.08)",
                        textShadow: "0 0 10px rgba(0,240,255,0.25)",
                        transition: "all 0.2s",
                        cursor: "default",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CinematicScene>

      {/* ═══════════════════════════════════════════════════════════════════
          SCENE 5 — CONTACT / CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <CinematicScene id="scene-contact">
        <div style={{
          maxWidth: "600px",
          width: "100%",
          padding: "0 24px",
          textAlign: "center",
        }}>
          <div className="contact-reveal" style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-cyan)",
            marginBottom: "20px",
          }}>
            CONTACT
          </div>

          <h2 className="contact-reveal" style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            marginBottom: "16px",
          }}>
            Get in Touch
          </h2>

          <p className="contact-reveal" style={{
            color: "var(--color-mist)",
            fontSize: "15px",
            lineHeight: 1.65,
            marginBottom: "32px",
            maxWidth: "40ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Building mission-critical AI systems, scaling resilient architectures,
            or seeking a technical leader? Let&apos;s connect.
          </p>

          <div className="contact-reveal" style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}>
            <MagneticButton>
              <a
                href="mailto:walizar34@gmail.com"
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "12.5px",
                  fontWeight: 500,
                  background: "var(--color-cyan)",
                  color: "var(--color-void)",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "1px solid var(--color-cyan)",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "background 0.15s",
                }}
              >
                Email Me ↗
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://github.com/Zars1wali"
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-trigger"
              >
                GitHub
              </a>
            </MagneticButton>
            <MagneticButton>
              <Link href="/resume" className="ghost-trigger">
                Resume
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/lab" className="ghost-trigger">
                Lab
              </Link>
            </MagneticButton>
          </div>

          <div className="contact-reveal" style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12px",
            }}>
              <a
                href="mailto:walizar34@gmail.com"
                style={{ color: "var(--color-cyan)", textDecoration: "none" }}
              >
                walizar34@gmail.com
              </a>
              <a
                href="mailto:umer.wali@zeropointintel.com"
                style={{ color: "var(--color-cyan)", textDecoration: "none" }}
              >
                umer.wali@zeropointintel.com
              </a>
            </div>
          </div>

          {/* Footer credit */}
          <div className="contact-reveal" style={{
            marginTop: "60px",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            color: "rgba(139,147,163,0.5)",
          }}>
            © {new Date().getFullYear()} zarss — built with Next.js
          </div>
        </div>
      </CinematicScene>

      {/* ─── Shared styles ────────────────────────────────────────────────── */}
      <style>{`
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
        @keyframes scroll-hint {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(8px); }
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
        .cta-primary {
          font-family: var(--font-jetbrains), monospace;
          font-size: 12.5px;
          font-weight: 600;
          background: var(--color-cyan);
          color: var(--color-void);
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid var(--color-cyan);
          cursor: pointer;
          transition: background 0.15s;
        }
        .cta-primary:hover {
          background: #6EF0DA;
        }
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
          text-decoration: none;
          transition: border-color 0.15s, background 0.15s;
        }
        .ghost-trigger:hover {
          border-color: var(--color-cyan);
          background: rgba(86,232,208,0.12);
        }
        @media (prefers-reduced-motion: reduce) {
          .avatar-figure,
          .avatar-shadow,
          .hero-chip,
          .gradient-text,
          .tw-cursor { animation: none; }
        }

        @media (max-width: 768px) {
          .avatar-stage {
            width: 200px;
            height: 340px;
          }
          .avatar-figure {
            width: 140px;
            height: 290px;
            margin-left: -70px;
          }
        }
      `}</style>
    </div>
  );
}
