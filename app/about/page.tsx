import type { Metadata } from "next";
import GlassPanel from "@/components/GlassPanel";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Umer (zarss) — BS Cybersecurity @ GIKI, Co-Founder/COO of Zero Point Intel.",
};

/* ─── Skills Data ───────────────────────────────────────────────────────────
   No invented percentages or progress bars — skills are listed as a flat
   grid, grouped by domain. Content will be replaced from content-seed once
   the MDX pipeline is wired up. <!-- TODO: needs content from about.md -->
─────────────────────────────────────────────────────────────────────────── */
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
      "LangGraph",
      "Multi-Agent Systems",
      "ReAct Pattern",
      "Function / Tool Calling",
      "Human-in-the-Loop (HITL) Guardrails",
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
    <div className="flex flex-col items-center px-6 py-20 gap-12 max-w-4xl mx-auto w-full">
      {/* ── Bio Panel ───────────────────────────────────────────────── */}
      <GlassPanel className="w-full" wide>
        <div className="font-mono text-[12px] tracking-[0.12em] text-cyan flex items-center gap-2 mb-5">
          <span className="block w-[6px] h-[6px] rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
          ABOUT
        </div>
        <h1 className="text-[clamp(26px,4vw,36px)] mb-4">Umer Wali</h1>
        <p className="text-mist text-base leading-relaxed mb-4">
          BS Cybersecurity student at GIKI, Backend AI Engineer (FlyRank AI intern), and Co-Founder of
          Zero Point Intel (ZPI). Full-stack developer with hands-on experience directing engineering teams
          from concept to production, specializing in production-grade AI backends, multi-agent systems,
          and secure infrastructure.
        </p>
        <p className="text-mist text-base leading-relaxed">
          My work spans server-side AI systems (LangGraph state machines, ReAct loops, RAG pipelines, tool calling),
          full-stack web platforms (Next.js, Node.js, PostgreSQL), and low-latency systems programming
          (C++20, kernel bypass, Linux concurrency) — backed by a rigorous cybersecurity foundation.
        </p>
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
              className="p-5 rounded-[16px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-cyan/30 hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200"
            >
              <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs text-mist bg-[rgba(255,255,255,0.05)] px-2.5 py-1 rounded-md border border-transparent hover:border-cyan/20 hover:text-cyan hover:bg-cyan/5 transition-colors"
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
