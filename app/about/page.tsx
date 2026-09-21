import type { Metadata } from "next";
import GlassPanel from "@/components/GlassPanel";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Umer Wali — Full-Stack AI Engineer, Systems Builder, and Cybersecurity Specialist.",
};

const skillGroups: { label: string; skills: string[] }[] = [
  {
    label: "Languages & Systems",
    skills: [
      "C++ (C++20, low-latency)",
      "Python",
      "TypeScript / JavaScript",
      "Linux Systems Programming",
      "Kernel Bypass & epoll",
      "Multithreading & Concurrency",
      "Memory Alignment",
      "Lock-Free Data Structures",
    ],
  },
  {
    label: "Agentic AI & Orchestration",
    skills: [
      "Agentic AI Development",
      "Prompt Engineering",
      "LangGraph",
      "CrewAI Framework",
      "Bee AI Framework",
      "A2G (AutoGen)",
      "LangChain",
      "Multi-Agent Systems",
      "ReAct Pattern",
      "Function / Tool Calling",
      "Human-in-the-Loop (HITL) Guardrails",
      "RAG / AI Fluency",
      "Vibe Coding & Code Reviewing",
    ],
  },
  {
    label: "LLMs & Multimodal AI",
    skills: [
      "Google Gemini 3.5 Flash Lite (Native SDK)",
      "Gemini Vision",
      "Deepgram Nova-3 (STT)",
      "Retrieval-Augmented Generation (RAG)",
    ],
  },
  {
    label: "Backend & APIs",
    skills: [
      "Python 3.14",
      "FastAPI",
      "AsyncIO",
      "Uvicorn",
      "REST APIs",
      "Meta Official WhatsApp Business Platform",
    ],
  },
  {
    label: "Full-Stack & Web",
    skills: [
      "Next.js 14 / 15",
      "React / Vite",
      "Node.js",
      "Express",
      "Medusa.js",
      "PostgreSQL",
      "MySQL",
      "Prisma",
      "Redis",
      "Stripe Connect",
    ],
  },
  {
    label: "Databases & DevOps",
    skills: [
      "PostgreSQL",
      "Async SQLAlchemy",
      "Connection Pooling",
      "Docker",
      "Linux / Ubuntu VPS",
      "Git",
    ],
  },
  {
    label: "Trading & Data Systems",
    skills: [
      "Exchange / CLOB API Connectivity",
      "Order Execution Logic",
      "Tick-to-Trade Latency Optimization",
      "Satellite & Geospatial Data",
      "Sentinel-2 & SAR",
      "NDVI / NDRE",
    ],
  },
  {
    label: "Cybersecurity & Networking",
    skills: [
      "Network Security",
      "Malware Analysis",
      "Kali Linux",
      "Nmap",
      "Burp Suite",
      "NIST Frameworks",
      "MITRE ATT&CK",
      "Google Chronicle (SOAR)",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 py-20 gap-12 max-w-4xl mx-auto w-full">
      {/* ── Bio Panel ───────────────────────────────────────────────── */}
      <GlassPanel className="w-full" wide>
        <div className="font-mono text-[12px] tracking-[0.12em] text-cyan flex items-center gap-2 mb-5">
          <span className="block w-[6px] h-[6px] rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
          ABOUT
        </div>
        <h1 className="text-[clamp(26px,4vw,36px)] font-bold text-fog mb-6 tracking-tight">
          Umer Wali
        </h1>

        <div className="space-y-4 text-mist/90 text-base leading-relaxed">
          <p className="text-fog font-medium text-[16.5px] leading-relaxed">
            I build AI and full-stack systems that can&apos;t afford to be wrong under pressure. From production AI backends to microsecond trading infrastructure, I own the complete path from architecture to delivery, not just the code in between.
          </p>
          <p>
            During my Backend AI Engineering internship at FlyRank AI, I built production-grade RAG pipelines, structured-output systems, and tool-calling workflows, reviewed against rubric-based evaluation sets for correctness and grounding. I led a three-developer team, under a senior architect&apos;s mentorship, to ship a live multi-vendor commerce marketplace connecting EU artisan brands with customers, owning architecture, task delegation, and delivery timelines from day one.
          </p>
          <p>
            My approach combines deep systems thinking with full-stack execution. I don&apos;t just build AI features, I design them to be deterministic and verifiable wherever possible. On Rabta AI, a WhatsApp-native AI sales agent I built end to end, I kept routing logic fully deterministic and used the language model only for generation, because grounded, predictable behavior matters more than flashy autonomy. That same discipline drove me to architect a C++ arbitrage bot achieving sub-50 microsecond tick-to-trade latency, generating real profit with a 68 percent win rate, and to conduct a full security audit that led to a ground-up secure rewrite of an earlier system.
          </p>
          <p>
            My technical range spans full-stack web development (Next.js, React, Node.js, PostgreSQL), applied AI and LLM backend engineering (LangGraph, LangChain, Gemini API, pgvector), low-latency systems programming in C++, and cybersecurity, backed by a degree in the field and hands-on work in malware analysis and network security. I&apos;m continuously expanding this range, most recently into satellite data processing for supply-chain risk monitoring, because solving hard problems usually means building the technical foundation first.
          </p>
          <p className="text-cyan/95 font-mono text-sm pt-2">
            If you&apos;re building AI products that need to be reliable in production, modernizing systems under real constraints, or need someone who can own both the architecture and the delivery, let&apos;s talk.
          </p>
        </div>
      </GlassPanel>

      {/* ── Skills Grid ─────────────────────────────────────────────── */}
      <section className="w-full">
        <h2 className="text-xl text-fog font-mono mb-6 flex items-center gap-3">
          Skills
          <span className="h-px bg-[rgba(255,255,255,0.12)] flex-1" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="p-5 rounded-[16px] bg-[rgba(255,255,255,0.03)] border border-[rgba(0,240,255,0.12)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-[rgba(0,240,255,0.3)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
            >
              <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3.5 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_var(--color-cyan)]" />
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[12px] text-[#E0F7FA] bg-[rgba(0,240,255,0.06)] px-2.5 py-1 rounded-md border border-[rgba(0,240,255,0.2)] shadow-[0_0_8px_rgba(0,240,255,0.08)] hover:shadow-[0_0_14px_rgba(0,240,255,0.25)] hover:border-cyan hover:text-white hover:bg-[rgba(0,240,255,0.12)] transition-all duration-200 cursor-default select-none"
                    style={{ textShadow: "0 0 10px rgba(0, 240, 255, 0.25)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
