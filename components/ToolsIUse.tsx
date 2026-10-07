"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import {
  siAnthropic,
  siOpenrouter,
  siLangchain,
  siKimi,
  siGooglechronicle,
  siPostgresql,
  siTryhackme,
  siCplusplus,
  siPython,
  siMysql,
  siLinux,
  siNextdotjs,
  siExpress,
  siReact,
  siTailwindcss,
  siKalilinux,
  siBurpsuite,
  siCisco,
  siGithub,
  siJira,
  siAsana,
  siMiro,
  siNotion,
  type SimpleIcon,
} from "simple-icons";

/* ── Lucide-style glyphs (for skill categories / products with no mark) ──── */
interface Glyph {
  paths: string[];
  circles?: [number, number, number][];
}
const GLYPHS: Record<string, Glyph> = {
  zap: { paths: ["M13 2 3 14h9l-1 8 10-12h-9l1-8z"] },
  search: { paths: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "m21 21-4.3-4.3"] },
  shield: {
    paths: [
      "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z",
    ],
  },
  shieldalert: {
    paths: [
      "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z",
      "M12 7v3",
      "M12 14h.01",
    ],
  },
  bug: {
    paths: [
      "m8 2 1.88 1.88",
      "M14.12 3.88 16 2",
      "M9 7.13v-1a3 3 0 1 1 6 0v1",
      "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",
      "M12 20v-9",
      "M6.53 9.13c.8 1.36 2.2 2.34 4.16 2.87",
      "M17.47 9.13c-.8 1.36-2.2 2.34-4.16 2.87",
    ],
  },
  target: { circles: [[12, 12, 10], [12, 12, 6], [12, 12, 2]], paths: [] },
  database: {
    paths: [
      "M12 2c4.97 0 9 1.34 9 3s-4.03 3-9 3-9-1.34-9-3 4.03-3 9-3Z",
      "M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3",
      "M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5",
    ],
  },
  checklist: {
    paths: [
      "M9 2h6a1 1 0 0 1 1 1v1H8V3a1 1 0 0 1 1-1Z",
      "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2",
      "m9 14 2 2 4-4",
    ],
  },
};

/* ── Custom official brand SVG marks ─────────────────────────────────────── */
interface BrandSvg {
  viewBox: string;
  paths: { d: string; fill: string }[];
}

const CSS3_MARK: BrandSvg = {
  viewBox: "0 0 128 128",
  paths: [
    { d: "M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z", fill: "#1572B6" },
    { d: "M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z", fill: "#33A9DC" },
    { d: "M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z", fill: "#fff" },
    { d: "M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z", fill: "#EBEBEB" },
    { d: "M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z", fill: "#fff" },
    { d: "M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z", fill: "#EBEBEB" },
  ],
};

const VISUAL_STUDIO_MARK: BrandSvg = {
  viewBox: "0 0 128 128",
  paths: [
    { d: "M14.39 26.295a5.333 5.333 0 0 0-1.417.373l-9.694 4A5.333 5.333 0 0 0 0 35.561v56.88a5.333 5.333 0 0 0 3.28 4.893l9.693 4.066a5.333 5.333 0 0 0 5.521-.865l2.172-1.867a2.947 2.947 0 0 1-4.666-2.4V31.734a2.947 2.947 0 0 1 4.666-2.4l-2.172-1.799a5.333 5.333 0 0 0-4.103-1.24z", fill: "#52218a" },
    { d: "M94.75.416A8 8 0 0 0 88 2.668l-82.666 91.4A3.08 3.08 0 0 1 0 92.002v.44a5.333 5.333 0 0 0 3.28 4.892l9.693 4.066a5.333 5.333 0 0 0 5.521-.865l2.172-1.867 99.08-81.24A5.053 5.053 0 0 1 128 21.334v-.307a8 8 0 0 0-4.533-7.213L97.094 1.121A8 8 0 0 0 94.75.416Z", fill: "#6c33af" },
    { d: "M14.871 26.238a5.333 5.333 0 0 0-1.898.43l-9.694 4A5.333 5.333 0 0 0 0 35.561v.441a3.08 3.08 0 0 1 5.334-2.066L88 125.334a8 8 0 0 0 9.094 1.547l26.373-12.694a8 8 0 0 0 4.533-7.212v-.307a5.053 5.053 0 0 1-8.254 3.906l-99.08-81.24-2.172-1.865a5.333 5.333 0 0 0-3.623-1.23z", fill: "#854cc7" },
    { d: "M94.75.416a8 8 0 0 0-5.674 1.469A4.693 4.693 0 0 1 96 6.015v116a4.693 4.693 0 0 1-8 3.319 8 8 0 0 0 9.094 1.547l26.373-12.68a8 8 0 0 0 4.533-7.213V21.016a8 8 0 0 0-4.533-7.215L97.094 1.12A8 8 0 0 0 94.75.416Z", fill: "#b179f1" },
  ],
};

const ANTIGRAVITY_MARK: BrandSvg = {
  viewBox: "0 0 16 15",
  paths: [
    {
      d: "M14.0777 13.984C14.945 14.6345 16.2458 14.2008 15.0533 13.0084C11.476 9.53949 12.2349 0 7.79033 0C3.34579 0 4.10461 9.53949 0.527295 13.0084C-0.773543 14.3092 0.635692 14.6345 1.50293 13.984C4.86344 11.7076 4.64663 7.69664 7.79033 7.69664C10.934 7.69664 10.7172 11.7076 14.0777 13.984Z",
      fill: "#FFFFFF",
    },
  ],
};

const OPENAI_MARK: BrandSvg = {
  viewBox: "0 0 256 260",
  paths: [
    {
      d: "M239.183914,106.202783 C245.054304,88.5242096 243.02228,69.1733805 233.607599,53.0998864 C219.451678,28.4588021 190.999703,15.7836129 163.213007,21.739505 C147.554077,4.32145883 123.794909,-3.42398554 100.87901,1.41873898 C77.9631105,6.26146349 59.3690093,22.9572536 52.0959621,45.2214219 C33.8436494,48.9644867 18.0901721,60.392749 8.86672513,76.5818033 C-5.443491,101.182962 -2.19544431,132.215255 16.8986662,153.320094 C11.0060865,170.990656 13.0197283,190.343991 22.4238231,206.422991 C36.5975553,231.072344 65.0680342,243.746566 92.8695738,237.783372 C105.235639,251.708249 123.001113,259.630942 141.623968,259.52692 C170.105359,259.552169 195.337611,241.165718 204.037777,214.045661 C222.28734,210.296356 238.038489,198.869783 247.267014,182.68528 C261.404453,158.127515 258.142494,127.262775 239.183914,106.202783 L239.183914,106.202783 Z M141.623968,242.541207 C130.255682,242.559177 119.243876,238.574642 110.519381,231.286197 L112.054146,230.416496 L163.724595,200.590881 C166.340648,199.056444 167.954321,196.256818 167.970781,193.224005 L167.970781,120.373788 L189.815614,133.010026 C190.034132,133.121423 190.186235,133.330564 190.224885,133.572774 L190.224885,193.940229 C190.168603,220.758427 168.442166,242.484864 141.623968,242.541207 Z M37.1575749,197.93062 C31.456498,188.086359 29.4094818,176.546984 31.3766237,165.342426 L32.9113895,166.263285 L84.6329973,196.088901 C87.2389349,197.618207 90.4682717,197.618207 93.0742093,196.088901 L156.255402,159.663793 L156.255402,184.885111 C156.243557,185.149771 156.111725,185.394602 155.89729,185.550176 L103.561776,215.733903 C80.3054953,229.131632 50.5924954,221.165435 37.1575749,197.93062 Z M23.5493181,85.3811273 C29.2899861,75.4733097 38.3511911,67.9162648 49.1287482,64.0478825 L49.1287482,125.438515 C49.0891492,128.459425 50.6965386,131.262556 53.3237748,132.754232 L116.198014,169.025864 L94.3531808,181.662102 C94.1132325,181.789434 93.8257461,181.789434 93.5857979,181.662102 L41.3526015,151.529534 C18.1419426,138.076098 10.1817681,108.385562 23.5493181,85.125333 L23.5493181,85.3811273 Z M203.0146,127.075598 L139.935725,90.4458545 L161.7294,77.8607748 C161.969348,77.7334434 162.256834,77.7334434 162.496783,77.8607748 L214.729979,108.044502 C231.032329,117.451747 240.437294,135.426109 238.871504,154.182739 C237.305714,172.939368 225.050719,189.105572 207.414262,195.67963 L207.414262,134.288998 C207.322521,131.276867 205.650697,128.535853 203.0146,127.075598 Z M224.757116,94.3850867 L223.22235,93.4642272 L171.60306,63.3828173 C168.981293,61.8443751 165.732456,61.8443751 163.110689,63.3828173 L99.9806554,99.8079259 L99.9806554,74.5866077 C99.9533004,74.3254088 100.071095,74.0701869 100.287609,73.9215426 L152.520805,43.7889738 C168.863098,34.3743518 189.174256,35.2529043 204.642579,46.0434841 C220.110903,56.8340638 227.949269,75.5923959 224.757116,94.1804513 L224.757116,94.3850867 Z M88.0606409,139.097931 L66.2158076,126.512851 C65.9950399,126.379091 65.8450965,126.154176 65.8065367,125.898945 L65.8065367,65.684966 C65.8314495,46.8285367 76.7500605,29.6846032 93.8270852,21.6883055 C110.90411,13.6920079 131.063833,16.2835462 145.5632,28.338998 L144.028434,29.2086986 L92.3579852,59.0343142 C89.7419327,60.5687513 88.1282597,63.3683767 88.1117998,66.4011901 L88.0606409,139.097931 Z M99.9294965,113.5185 L128.06687,97.3011417 L156.255402,113.5185 L156.255402,145.953218 L128.169187,162.170577 L99.9806554,145.953218 L99.9294965,113.5185 Z",
      fill: "#10A37F",
    },
  ],
};

const OFFICE_COLORS = ["#F25022", "#7FBA00", "#00A4EF", "#FFB900"];
function OfficeMark({ size = 18 }: { size?: number }) {
  const cells = [
    [1, 1],
    [12, 1],
    [1, 12],
    [12, 12],
  ];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={10.5} height={10.5} rx={2} fill={OFFICE_COLORS[i]} />
      ))}
    </svg>
  );
}

/* ── Tool interface ──────────────────────────────────────────────────────── */
export interface ToolItem {
  id: string;
  name: string;
  shortName: string;
  category: "AI" | "Software" | "Programming" | "Web Development" | "Cybersecurity" | "Productivity";
  categoryKey: string;
  color: string;
  description: string;
  icon?: SimpleIcon;
  svg?: BrandSvg;
  office?: boolean;
  glyph?: string;
}

const CYBER_RED = "#EF4444";
const CYBER_SOFT = "#F87171";

export const ALL_TOOLS: ToolItem[] = [
  // Programming & Core Web (Top Row)
  {
    id: "python",
    name: "Python",
    shortName: "Python",
    category: "Programming",
    categoryKey: "programming",
    color: "#3776AB",
    description: "High-throughput data analytics, security automation & trading bots",
    icon: siPython,
  },
  {
    id: "cpp",
    name: "C++",
    shortName: "C++",
    category: "Programming",
    categoryKey: "programming",
    color: "#00599C",
    description: "Ultra-low latency HFT engine, polymorphic OOP & systems architecture",
    icon: siCplusplus,
  },
  {
    id: "nextjs",
    name: "Next.js",
    shortName: "Next.js",
    category: "Web Development",
    categoryKey: "webdev",
    color: "#FFFFFF",
    description: "Fullstack React App Router, SSG/SSR, and headless commerce storefronts",
    icon: siNextdotjs,
  },
  {
    id: "react",
    name: "React",
    shortName: "React",
    category: "Web Development",
    categoryKey: "webdev",
    color: "#61DAFB",
    description: "Reactive UI state trees, reusable component hierarchies & hooks",
    icon: siReact,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    shortName: "Tailwind",
    category: "Web Development",
    categoryKey: "webdev",
    color: "#06B6D4",
    description: "Utility-first modern styling, responsive layouts & custom design tokens",
    icon: siTailwindcss,
  },
  {
    id: "css3",
    name: "CSS3",
    shortName: "CSS3",
    category: "Web Development",
    categoryKey: "webdev",
    color: "#1572B6",
    description: "Fluid animations, dark glassmorphism, flexbox & grid design systems",
    svg: CSS3_MARK,
  },
  {
    id: "express",
    name: "Express",
    shortName: "Express",
    category: "Web Development",
    categoryKey: "webdev",
    color: "#FFFFFF",
    description: "Lightweight REST API routing, backend controllers & auth middleware",
    icon: siExpress,
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    shortName: "PostgreSQL",
    category: "Software",
    categoryKey: "software",
    color: "#336791",
    description: "8-table normalized database, CVSS trigger engine & PL/pgSQL RBAC",
    icon: siPostgresql,
  },
  {
    id: "mysql",
    name: "MySQL",
    shortName: "MySQL",
    category: "Programming",
    categoryKey: "programming",
    color: "#4479A1",
    description: "Relational persistence, ACID transactions & foreign key cascading",
    icon: siMysql,
  },
  {
    id: "linux",
    name: "Linux CLI",
    shortName: "Linux CLI",
    category: "Programming",
    categoryKey: "programming",
    color: "#FCC624",
    description: "POSIX shell scripting, kernel telemetry & remote VPS deployment",
    icon: siLinux,
  },

  // Security Operations & Forensics (Row 2)
  {
    id: "kali",
    name: "Kali Linux",
    shortName: "Kali Linux",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: "#557C94",
    description: "Offensive security distributions, exploit payloads & forensic tooling",
    icon: siKalilinux,
  },
  {
    id: "burpsuite",
    name: "Burp Suite",
    shortName: "Burp Suite",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: "#FF6633",
    description: "Web application penetration testing, API intercept proxy & fuzzing",
    icon: siBurpsuite,
  },
  {
    id: "nmap",
    name: "Nmap",
    shortName: "Nmap",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: "#22C55E",
    description: "Host discovery, port mapping, NSE service vulnerability fingerprinting",
    glyph: "target",
  },
  {
    id: "tryhackme",
    name: "TryHackMe",
    shortName: "TryHackMe",
    category: "Software",
    categoryKey: "software",
    color: "#FFFFFF",
    description: "Hands-on cyber labs: privilege escalation, reverse engineering & SOC triage",
    icon: siTryhackme,
  },
  {
    id: "chronicle",
    name: "Google Chronicle",
    shortName: "Chronicle",
    category: "Software",
    categoryKey: "software",
    color: siGooglechronicle.hex,
    description: "Cloud-native SIEM, petabyte-scale log aggregation & YARA-L detection",
    icon: siGooglechronicle,
  },
  {
    id: "vs",
    name: "Visual Studio",
    shortName: "Visual Studio",
    category: "Software",
    categoryKey: "software",
    color: "#854cc7",
    description: "Native C++ tooling, MSVC debugger, memory profiling & CMake targets",
    svg: VISUAL_STUDIO_MARK,
  },
  {
    id: "pgadmin",
    name: "pgAdmin",
    shortName: "pgAdmin",
    category: "Software",
    categoryKey: "software",
    color: "#41A0C9",
    description: "Visual query plan inspection, index tuning & schema administration",
    glyph: "database",
  },
  {
    id: "cisco",
    name: "Cisco Packet Tracer",
    shortName: "Packet Tracer",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: "#1BA0D7",
    description: "VLAN topology modeling, OSPF routing & switch port security config",
    icon: siCisco,
  },

  // Advanced Security & Frameworks (Row 3)
  {
    id: "netsec",
    name: "Network Security",
    shortName: "NetSec",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: CYBER_SOFT,
    description: "Zero-trust architecture, deep packet inspection & firewall rulesets",
    glyph: "shield",
  },
  {
    id: "osint",
    name: "OSINT",
    shortName: "OSINT",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: CYBER_SOFT,
    description: "Open source threat intelligence, asset discovery & breach surveillance",
    glyph: "search",
  },
  {
    id: "malware",
    name: "Malware Analysis",
    shortName: "Malware",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: CYBER_SOFT,
    description: "Static & dynamic analysis, disassembly, and behavioral sandboxing",
    glyph: "bug",
  },
  {
    id: "chronicle_soar",
    name: "Chronicle SOAR",
    shortName: "SOAR",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: siGooglechronicle.hex,
    description: "Automated incident response playbooks, webhook ingest & triage routing",
    icon: siGooglechronicle,
  },
  {
    id: "mitre",
    name: "MITRE ATT&CK",
    shortName: "MITRE",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: CYBER_RED,
    description: "Enterprise adversary TTP mapping, kill chain defense & threat modeling",
    glyph: "shieldalert",
  },
  {
    id: "nist",
    name: "NIST Frameworks",
    shortName: "NIST",
    category: "Cybersecurity",
    categoryKey: "cybersecurity",
    color: CYBER_SOFT,
    description: "Identify, Protect, Detect, Respond, Recover — governance & audit standards",
    glyph: "checklist",
  },
  {
    id: "msoffice",
    name: "Microsoft Office",
    shortName: "MS Office",
    category: "Software",
    categoryKey: "software",
    color: "#F25022",
    description: "Executive technical memos, security audits & project reporting",
    office: true,
  },

  // Agentic AI & LLMs (Row 4)
  {
    id: "antigravity",
    name: "Google Antigravity",
    shortName: "Antigravity",
    category: "AI",
    categoryKey: "ai",
    color: "#FFFFFF",
    description: "Agentic AI development, autonomous coding workflows & systems pair-prog",
    svg: ANTIGRAVITY_MARK,
  },
  {
    id: "claude",
    name: "Claude",
    shortName: "Claude",
    category: "AI",
    categoryKey: "ai",
    color: "#D97757",
    description: "Advanced reasoning, code audits, architecture design & systems review",
    icon: siAnthropic,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    shortName: "ChatGPT",
    category: "AI",
    categoryKey: "ai",
    color: "#10A37F",
    description: "Rapid algorithmic prototyping, threat synthesis & documentation",
    svg: OPENAI_MARK,
  },
  {
    id: "kimi",
    name: "KIMI",
    shortName: "KIMI",
    category: "AI",
    categoryKey: "ai",
    color: "#0058C6",
    description: "Ultra-long context document comprehension & research synthesis",
    icon: siKimi,
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    shortName: "OpenRouter",
    category: "AI",
    categoryKey: "ai",
    color: siOpenrouter.hex,
    description: "Unified LLM API gateway, model routing, latency benchmarking & fallback",
    icon: siOpenrouter,
  },

  // Orchestration & Collaboration (Row 5)
  {
    id: "langchain",
    name: "LangChain",
    shortName: "LangChain",
    category: "AI",
    categoryKey: "ai",
    color: "#FFFFFF",
    description: "RAG vector pipelines, embedding retrievers & structured LLM agent tools",
    icon: siLangchain,
  },
  {
    id: "github",
    name: "GitHub",
    shortName: "GitHub",
    category: "Productivity",
    categoryKey: "productivity",
    color: "#FFFFFF",
    description: "Git source control, PR peer review, automated actions & issue tracking",
    icon: siGithub,
  },
  {
    id: "jira",
    name: "Jira",
    shortName: "Jira",
    category: "Productivity",
    categoryKey: "productivity",
    color: "#0052CC",
    description: "Agile sprints, security bug ticketing, Kanban & roadmap coordination",
    icon: siJira,
  },
  {
    id: "asana",
    name: "Asana",
    shortName: "Asana",
    category: "Productivity",
    categoryKey: "productivity",
    color: "#F06A6A",
    description: "Cross-functional task delivery, release milestones & team coordination",
    icon: siAsana,
  },

  // Collaboration & Strategy (Row 6)
  {
    id: "miro",
    name: "Miro",
    shortName: "Miro",
    category: "Productivity",
    categoryKey: "productivity",
    color: "#FFD02F",
    description: "System architecture diagrams, database ERD wireframing & sprint planning",
    icon: siMiro,
  },
  {
    id: "notion",
    name: "Notion",
    shortName: "Notion",
    category: "Productivity",
    categoryKey: "productivity",
    color: "#FFFFFF",
    description: "Engineering wikis, technical post-mortems & internal documentation",
    icon: siNotion,
  },
];

/* ── Filter Category definitions ─────────────────────────────────────────── */
const FILTER_CATEGORIES = [
  { id: "all", label: "All", count: 36, accent: "#8B5CF6" },
  { id: "ai", label: "AI", count: 6, accent: "#8B7CF6" },
  { id: "software", label: "Software", count: 6, accent: "#3B82F6" },
  { id: "programming", label: "Programming", count: 4, accent: "#34D399" },
  { id: "webdev", label: "Web Development", count: 5, accent: "#61DAFB" },
  { id: "cybersecurity", label: "Cybersecurity", count: 10, accent: "#EF4444" },
  { id: "productivity", label: "Productivity", count: 5, accent: "#FBBF24" },
];

/* ── Canvas 3D Wireframe Globe Component ─────────────────────────────────── */
function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) {
        animId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 - 10;
      const r = Math.min(w, h) * 0.44;

      angle += 0.003;
      const tilt = 0.28;

      // Draw latitude circles
      const latCount = 7;
      for (let i = 1; i < latCount; i++) {
        const phi = (i / latCount) * Math.PI - Math.PI / 2;
        const latR = r * Math.cos(phi);
        const latY = cy + r * Math.sin(phi) * Math.cos(tilt);
        const ry = Math.max(1, latR * Math.sin(tilt));

        ctx.beginPath();
        ctx.ellipse(cx, latY, latR, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(168, 124, 255, 0.11)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw rotating longitude ellipses
      const lonCount = 8;
      for (let i = 0; i < lonCount; i++) {
        const theta = angle + (i * Math.PI) / lonCount;
        const lonW = Math.abs(r * Math.sin(theta));
        const isFacing = Math.cos(theta) > 0;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.max(1, lonW), r, tilt, 0, Math.PI * 2);
        ctx.strokeStyle = isFacing
          ? "rgba(194, 164, 255, 0.22)"
          : "rgba(86, 232, 208, 0.08)";
        ctx.lineWidth = isFacing ? 1.2 : 0.8;
        ctx.stroke();
      }

      // Outer globe boundary halo
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168, 124, 255, 0.22)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="wireframe-globe-canvas"
      aria-hidden="true"
    />
  );
}

/* ── Individual Tool Squircle Card ───────────────────────────────────────── */
function ToolCard({
  tool,
  onHover,
  onLeave,
}: {
  tool: ToolItem;
  onHover: (tool: ToolItem) => void;
  onLeave: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="tech-tile"
      onMouseEnter={() => onHover(tool)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(tool)}
      onBlur={onLeave}
      aria-label={`${tool.name} (${tool.category})`}
      style={{
        "--tool-color": tool.color,
      } as CSSProperties}
    >
      <div className="tech-tile-icon" aria-hidden="true">
        {tool.office ? (
          <OfficeMark size={18} />
        ) : tool.svg ? (
          <svg
            viewBox={tool.svg.viewBox}
            height="20"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
            preserveAspectRatio="xMidYMid meet"
          >
            {tool.svg.paths.map((p, idx) => (
              <path key={idx} d={p.d} fill={p.fill} />
            ))}
          </svg>
        ) : tool.icon ? (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d={tool.icon.path} fill={tool.color} />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke={tool.color}
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {GLYPHS[tool.glyph ?? "zap"].paths.map((d, i) => (
              <path key={i} d={d} />
            ))}
            {GLYPHS[tool.glyph ?? "zap"].circles?.map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} />
            ))}
          </svg>
        )}
      </div>
      <span className="tech-tile-name">{tool.shortName}</span>
    </div>
  );
}

/* ── Standalone Tech Stack Inverted Pyramid View ──────────────────────────── */
export function TechStackView({ isModal = false, onClose }: { isModal?: boolean; onClose?: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredTool, setHoveredTool] = useState<ToolItem | null>(null);

  const getDisplayRows = (): ToolItem[][] => {
    if (activeTab === "all") {
      // 10, 8, 7, 5, 4, 2 = 36 items
      return [
        ALL_TOOLS.slice(0, 10),
        ALL_TOOLS.slice(10, 18),
        ALL_TOOLS.slice(18, 25),
        ALL_TOOLS.slice(25, 30),
        ALL_TOOLS.slice(30, 34),
        ALL_TOOLS.slice(34, 36),
      ];
    }

    const filtered = ALL_TOOLS.filter((t) => t.categoryKey === activeTab);
    if (filtered.length <= 4) return [filtered];
    if (filtered.length === 5) return [filtered.slice(0, 3), filtered.slice(3, 5)];
    if (filtered.length === 6) return [filtered.slice(0, 4), filtered.slice(4, 6)];
    return [
      filtered.slice(0, 4),
      filtered.slice(4, 7),
      filtered.slice(7, 9),
      filtered.slice(9, 10),
    ];
  };

  const rows = getDisplayRows();

  return (
    <div className={`tools-showcase-window ${isModal ? "in-modal" : "embedded"}`}>
      {/* Ambient Nebula Glow Behind Pyramid */}
      <div className="tools-nebula-glow" aria-hidden="true" />

      {/* 3D Wireframe Globe */}
      <WireframeGlobe />

      {/* Watermark TECH STACK Background Typography */}
      <div className="techstack-watermark" aria-hidden="true">
        TECH STACK
      </div>

      {/* Top Header Row with Category Filters & Close Button */}
      <header className="tools-top-bar">
        <div className="tools-header-meta">
          <span className="status-pulse-dot" />
          <span className="tools-header-title">// tools_i_use</span>
          <span className="tools-header-count">({ALL_TOOLS.length} tools)</span>
        </div>

        {/* Filter Pills */}
        <nav className="tools-nav-pills" aria-label="Tool Categories">
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`pill-btn ${isActive ? "active" : ""}`}
                style={{
                  "--pill-accent": cat.accent,
                } as CSSProperties}
              >
                <span
                  className="pill-dot"
                  style={{ background: cat.accent }}
                />
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </nav>

        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="tools-close-btn"
          >
            ✕
          </button>
        )}
      </header>

      {/* Center Stage: The Inverted Pyramid of Tech Cards */}
      <main className="pyramid-stage">
        <div className="pyramid-container">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="pyramid-row"
              style={{
                animationDelay: `${rowIdx * 45}ms`,
              }}
            >
              {row.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onHover={setHoveredTool}
                  onLeave={() => setHoveredTool(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Interactive Recruiter HUD / Status Bar */}
      <footer className="tools-status-bar">
        {hoveredTool ? (
          <div className="status-tool-info">
            <span
              className="status-badge"
              style={{
                color: hoveredTool.color,
                borderColor: `${hoveredTool.color}55`,
                background: `${hoveredTool.color}15`,
              }}
            >
              {hoveredTool.category}
            </span>
            <strong className="status-name">{hoveredTool.name}</strong>
            <span className="status-sep">—</span>
            <span className="status-desc">{hoveredTool.description}</span>
          </div>
        ) : (
          <div className="status-placeholder">
            <span className="status-pulse-dot" />
            <span>Hover or tap any tool to inspect architecture role, workflows &amp; systems context</span>
          </div>
        )}
      </footer>
    </div>
  );
}

/* ── Main Component (Hero Trigger Button + Modal) ────────────────────────── */
export default function ToolsIUse() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey, { passive: true });
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const modalContent = open ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tech Stack and Tools"
      onClick={() => setOpen(false)}
      className="tools-overlay"
    >
      <div
        role="document"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(1200px, 100%)" }}
      >
        <TechStackView isModal onClose={() => setOpen(false)} />
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById("scene-skills");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            setOpen(true);
          }
        }}
        aria-haspopup="dialog"
        className="tools-trigger"
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "12.5px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--color-cyan)",
          background: "rgba(86,232,208,0.06)",
          border: "1px solid rgba(86,232,208,0.35)",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "border-color 0.15s, color 0.15s, background 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-cyan)";
          e.currentTarget.style.background = "rgba(86,232,208,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(86,232,208,0.35)";
          e.currentTarget.style.background = "rgba(86,232,208,0.06)";
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
        Tools I use
      </button>

      {/* Render via Portal so modal is free from parent transforms */}
      {mounted && typeof document !== "undefined" && modalContent
        ? createPortal(modalContent, document.body)
        : null}

      <style jsx global>{`
        /* ── Overlay Animation ── */
        @keyframes toolsOverlayFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to   { opacity: 1; backdrop-filter: blur(14px); }
        }
        @keyframes toolsCardScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes rowSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.85; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes statusBlink {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }

        .tools-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(4, 7, 14, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 2.5vw, 24px);
          animation: toolsOverlayFadeIn 220ms ease-out both;
        }

        .tools-showcase-window {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, #0b090f 0%, #07060a 100%);
          border: 1px solid rgba(168, 124, 255, 0.28);
          border-radius: 24px;
          box-shadow:
            0 32px 80px -16px rgba(0, 0, 0, 0.9),
            0 0 50px -10px rgba(168, 124, 255, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          overflow: hidden;
        }

        .tools-showcase-window.in-modal {
          max-height: min(92vh, 880px);
          animation: toolsCardScaleIn 260ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .tools-showcase-window.embedded {
          min-height: 580px;
          margin-top: 10px;
        }

        /* ── Ambient Glow & 3D Globe ── */
        .tools-nebula-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%;
          height: 80%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle at center,
            rgba(168, 124, 255, 0.25) 0%,
            rgba(86, 232, 208, 0.12) 35%,
            transparent 70%
          );
          filter: blur(50px);
          pointer-events: none;
          z-index: 0;
          animation: pulseGlow 6s ease-in-out infinite;
        }

        .wireframe-globe-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .techstack-watermark {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-space-grotesk), var(--font-jetbrains), sans-serif;
          font-size: clamp(40px, 9vw, 96px);
          font-weight: 800;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.038);
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        /* ── Header ── */
        .tools-top-bar {
          position: relative;
          z-index: 10;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(11, 9, 15, 0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          flex-shrink: 0;
        }

        .tools-header-meta {
          font-family: var(--font-jetbrains), monospace;
          font-size: 13px;
          color: var(--color-cyan);
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: 0.06em;
        }

        .status-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-cyan);
          box-shadow: 0 0 10px var(--color-cyan);
          display: inline-block;
          animation: statusBlink 2s ease-in-out infinite;
        }

        .tools-header-count {
          font-size: 11px;
          color: rgba(139, 147, 163, 0.7);
        }

        .tools-nav-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .pill-btn {
          font-family: var(--font-jetbrains), monospace;
          font-size: 11px;
          padding: 5px 11px;
          border-radius: 999px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: var(--color-mist);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.18s ease;
        }

        .pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .pill-btn:hover {
          border-color: rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.06);
        }

        .pill-btn.active {
          border-color: var(--pill-accent, var(--color-cyan));
          color: var(--pill-accent, var(--color-cyan));
          background: color-mix(in srgb, var(--pill-accent, var(--color-cyan)) 16%, transparent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--pill-accent, var(--color-cyan)) 25%, transparent);
        }

        .tools-close-btn {
          font-family: var(--font-jetbrains), monospace;
          font-size: 13px;
          line-height: 1;
          color: var(--color-mist);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tools-close-btn:hover {
          color: #FFFFFF;
          border-color: rgba(168, 124, 255, 0.6);
          background: rgba(168, 124, 255, 0.12);
        }

        /* ── Stage & Inverted Pyramid ── */
        .pyramid-stage {
          position: relative;
          z-index: 5;
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: clamp(20px, 3.5vh, 36px) 20px clamp(14px, 2vh, 24px);
          display: flex;
          align-items: center;
          justify-content: center;
          WebkitOverflowScrolling: touch;
        }

        .pyramid-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(8px, 1.2vw, 13px);
          position: relative;
          z-index: 5;
          max-width: 100%;
        }

        .pyramid-row {
          display: flex;
          justify-content: center;
          gap: clamp(6px, 0.9vw, 12px);
          flex-wrap: wrap;
          animation: rowSlideUp 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* ── Squircle Tech Cards ── */
        .tech-tile {
          width: clamp(60px, 5.2vw, 75px);
          height: clamp(64px, 5.6vw, 79px);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.045);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.11);
          box-shadow:
            0 8px 24px -4px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 4px;
          cursor: pointer;
          transition:
            transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
            background 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
          position: relative;
          z-index: 5;
          user-select: none;
          outline: none;
        }

        .tech-tile:hover,
        .tech-tile:focus-visible {
          transform: translateY(-6px) scale(1.12);
          background: rgba(255, 255, 255, 0.11);
          border-color: var(--tool-color, #a87cff);
          box-shadow:
            0 16px 36px -4px rgba(0, 0, 0, 0.85),
            0 0 24px color-mix(in srgb, var(--tool-color, #a87cff) 45%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          z-index: 20;
        }

        .tech-tile-icon {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .tech-tile:hover .tech-tile-icon,
        .tech-tile:focus-visible .tech-tile-icon {
          transform: scale(1.1);
        }

        .tech-tile-name {
          font-family: var(--font-jetbrains), monospace;
          font-size: clamp(9px, 0.72vw, 10.5px);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(235, 240, 255, 0.8);
          text-align: center;
          line-height: 1.15;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 90%;
          transition: color 0.2s ease;
        }

        .tech-tile:hover .tech-tile-name,
        .tech-tile:focus-visible .tech-tile-name {
          color: #FFFFFF;
        }

        /* ── Status HUD / Bottom Bar ── */
        .tools-status-bar {
          position: relative;
          z-index: 10;
          padding: 14px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(11, 9, 15, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          flex-shrink: 0;
        }

        .status-tool-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          font-family: var(--font-jetbrains), monospace;
          font-size: 12px;
          animation: rowSlideUp 180ms ease-out both;
        }

        .status-badge {
          font-size: 10px;
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .status-name {
          color: #FFFFFF;
          font-weight: 600;
        }

        .status-sep {
          color: rgba(255, 255, 255, 0.3);
        }

        .status-desc {
          color: var(--color-mist);
        }

        .status-placeholder {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-jetbrains), monospace;
          font-size: 11.5px;
          color: rgba(139, 147, 163, 0.75);
        }

        @media (max-width: 768px) {
          .tools-top-bar {
            padding: 12px 16px;
          }
          .tools-nav-pills {
            order: 3;
            width: 100%;
          }
          .pyramid-stage {
            padding: 16px 10px;
          }
          .tech-tile {
            width: 58px;
            height: 62px;
            border-radius: 13px;
          }
          .tech-tile-icon {
            width: 22px;
            height: 22px;
          }
          .tech-tile-name {
            font-size: 8.5px;
          }
          .techstack-watermark {
            font-size: 32px;
          }
          .tools-status-bar {
            padding: 10px 14px;
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}
