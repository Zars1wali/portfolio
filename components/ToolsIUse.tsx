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

/* ── Custom official brand SVG marks (not present in simple-icons) ───────── */
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

/* ── Tool + category data ────────────────────────────────────────────────── */
interface Tool {
  name: string;
  color: string;
  icon?: SimpleIcon;
  svg?: BrandSvg;
  office?: boolean;
  glyph?: string;
}
interface ToolCategory {
  id: string;
  title: string;
  accent: string;
  tools: Tool[];
}

const CYBER_RED = "#EF4444";
const CYBER_SOFT = "#F87171";

const CATEGORIES: ToolCategory[] = [
  {
    id: "ai",
    title: "AI",
    accent: "#8B7CF6",
    tools: [
      { name: "Google Antigravity", color: "#FFFFFF", svg: ANTIGRAVITY_MARK },
      { name: "Claude", color: "#D97757", icon: siAnthropic },
      { name: "ChatGPT", color: "#10A37F", svg: OPENAI_MARK },
      { name: "KIMI", color: "#0058C6", icon: siKimi },
      { name: "OpenRouter", color: siOpenrouter.hex, icon: siOpenrouter },
      { name: "LangChain", color: "#FFFFFF", icon: siLangchain },
    ],
  },
  {
    id: "software",
    title: "Software",
    accent: "#3B82F6",
    tools: [
      { name: "Microsoft Office", color: "#F25022", office: true },
      { name: "Google Chronicle", color: siGooglechronicle.hex, icon: siGooglechronicle },
      { name: "PostgreSQL", color: "#336791", icon: siPostgresql },
      { name: "pgAdmin", color: "#41A0C9", glyph: "database" },
      { name: "Visual Studio", color: "#6c33af", svg: VISUAL_STUDIO_MARK },
      { name: "TryHackMe", color: "#FFFFFF", icon: siTryhackme },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    accent: "#34D399",
    tools: [
      { name: "C++", color: "#00599C", icon: siCplusplus },
      { name: "Python", color: "#3776AB", icon: siPython },
      { name: "MySQL", color: "#4479A1", icon: siMysql },
      { name: "Linux CLI", color: "#FCC624", icon: siLinux },
    ],
  },
  {
    id: "webdev",
    title: "Web Development",
    accent: "#61DAFB",
    tools: [
      { name: "Next.js", color: "#FFFFFF", icon: siNextdotjs },
      { name: "Express", color: "#FFFFFF", icon: siExpress },
      { name: "React", color: "#61DAFB", icon: siReact },
      { name: "Tailwind CSS", color: "#06B6D4", icon: siTailwindcss },
      { name: "CSS3", color: "#1572B6", svg: CSS3_MARK },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    accent: CYBER_RED,
    tools: [
      { name: "OSINT", color: CYBER_SOFT, glyph: "search" },
      { name: "Network Security", color: CYBER_SOFT, glyph: "shield" },
      { name: "Google Chronicle (SOAR)", color: siGooglechronicle.hex, icon: siGooglechronicle },
      { name: "Malware Analysis", color: CYBER_SOFT, glyph: "bug" },
      { name: "Kali Linux", color: "#557C94", icon: siKalilinux },
      { name: "Nmap", color: "#22C55E", glyph: "target" },
      { name: "Burp Suite", color: "#FF6633", icon: siBurpsuite },
      { name: "NIST Frameworks", color: CYBER_SOFT, glyph: "checklist" },
      { name: "MITRE ATT&CK", color: CYBER_RED, glyph: "shieldalert" },
      { name: "Cisco Packet Tracer", color: "#1BA0D7", icon: siCisco },
    ],
  },
  {
    id: "productivity",
    title: "Productivity",
    accent: "#FBBF24",
    tools: [
      { name: "GitHub", color: "#FFFFFF", icon: siGithub },
      { name: "Jira", color: "#0052CC", icon: siJira },
      { name: "Asana", color: "#F06A6A", icon: siAsana },
      { name: "Miro", color: "#FFD02F", icon: siMiro },
      { name: "Notion", color: "#FFFFFF", icon: siNotion },
    ],
  },
];

const TOTAL_TOOLS_COUNT = CATEGORIES.reduce((acc, cat) => acc + cat.tools.length, 0);

/* ── Microsoft 365 mark (2x2 official squares) ───────────────────────────── */
const OFFICE_COLORS = ["#F25022", "#7FBA00", "#00A4EF", "#FFB900"];

function OfficeMark({ size = 16 }: { size?: number }) {
  const cells = [
    [1, 1],
    [12, 1],
    [1, 12],
    [12, 12],
  ];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={11} height={11} rx={2.2} fill={OFFICE_COLORS[i]} />
      ))}
    </svg>
  );
}

/* ── Icon tile (refined compact size: 34x34) ─────────────────────────────── */
function ToolTile({ tool }: { tool: Tool }) {
  return (
    <span
      aria-hidden
      style={{
        flexShrink: 0,
        width: "34px",
        height: "34px",
        borderRadius: "9px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {tool.office ? (
        <OfficeMark size={16} />
      ) : tool.svg ? (
        <svg
          viewBox={tool.svg.viewBox}
          height="17"
          style={{ maxWidth: "68%", maxHeight: "68%" }}
          preserveAspectRatio="xMidYMid meet"
        >
          {tool.svg.paths.map((p) => (
            <path key={p.d.slice(0, 32)} d={p.d} fill={p.fill} />
          ))}
        </svg>
      ) : tool.icon ? (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d={tool.icon.path} fill={tool.color} />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke={tool.color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {GLYPHS[tool.glyph ?? "zap"].paths.map((d) => (
            <path key={d} d={d} />
          ))}
          {GLYPHS[tool.glyph ?? "zap"].circles?.map(([cx, cy, r]) => (
            <circle key={`${cx}${cy}${r}`} cx={cx} cy={cy} r={r} />
          ))}
        </svg>
      )}
    </span>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function ToolsIUse() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const closeRef = useRef<HTMLButtonElement>(null);

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
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const displayedCategories =
    selectedCategory === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === selectedCategory);

  const modalContent = open ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tools I use"
      onClick={() => setOpen(false)}
      className="tools-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(4, 7, 14, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 3vw, 28px)",
      }}
    >
      <div
        role="document"
        onClick={(e) => e.stopPropagation()}
        className="tools-dialog-card"
        style={{
          position: "relative",
          width: "min(1060px, 100%)",
          maxHeight: "min(88vh, 840px)",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(165deg, #0b1220 0%, #070b13 100%)",
          border: "1px solid rgba(86, 232, 208, 0.28)",
          borderRadius: "18px",
          boxShadow:
            "0 24px 64px -20px rgba(0,0,0,0.8), 0 0 36px -16px rgba(86,232,208,0.35)",
          overflow: "hidden",
        }}
      >
        {/* ── Pinned Header ── */}
        <div
          style={{
            padding: "18px 24px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(11, 18, 32, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "13px",
                letterSpacing: "0.08em",
                color: "var(--color-cyan)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--color-cyan)",
                  boxShadow: "0 0 10px var(--color-cyan)",
                  display: "block",
                }}
              />
              <span>{"// tools_i_use"}</span>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(139,147,163,0.7)",
                  letterSpacing: "0.05em",
                }}
              >
                ({TOTAL_TOOLS_COUNT} tools)
              </span>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              className="tools-close-btn"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "13px",
                lineHeight: 1,
                color: "var(--color-mist)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              ✕
            </button>
          </div>

          {/* ── Category filter pills ── */}
          <div
            className="category-pill-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "7px",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`pill-btn ${selectedCategory === "all" ? "active" : ""}`}
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "11.5px",
                padding: "5px 12px",
                borderRadius: "999px",
                cursor: "pointer",
                border:
                  selectedCategory === "all"
                    ? "1px solid var(--color-cyan)"
                    : "1px solid rgba(255,255,255,0.1)",
                background:
                  selectedCategory === "all"
                    ? "rgba(86,232,208,0.14)"
                    : "rgba(255,255,255,0.03)",
                color:
                  selectedCategory === "all"
                    ? "var(--color-cyan)"
                    : "var(--color-mist)",
                transition: "all 0.15s ease",
              }}
            >
              All ({TOTAL_TOOLS_COUNT})
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`pill-btn ${isSelected ? "active" : ""}`}
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "11.5px",
                    padding: "5px 11px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    border: isSelected
                      ? `1px solid ${cat.accent}`
                      : "1px solid rgba(255,255,255,0.1)",
                    background: isSelected
                      ? `color-mix(in srgb, ${cat.accent} 18%, transparent)`
                      : "rgba(255,255,255,0.03)",
                    color: isSelected ? cat.accent : "var(--color-mist)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: cat.accent,
                    }}
                  />
                  {cat.title} ({cat.tools.length})
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Scrollable Content Area ── */}
        <div
          className="tools-scroll-content"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: "20px 24px 26px",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          {selectedCategory === "all" ? (
            /* 3-column responsive layout for 'All' */
            <div className="tools-grid-all">
              {displayedCategories.map((cat) => (
                <section
                  key={cat.id}
                  aria-label={cat.title}
                  className="cat-section"
                  style={{ "--accent": cat.accent } as CSSProperties}
                >
                  <div className="cat-head">
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: cat.accent,
                        boxShadow: `0 0 8px ${cat.accent}`,
                        display: "block",
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: cat.accent,
                        margin: 0,
                      }}
                    >
                      {cat.title}
                    </h3>
                    <span className="cat-count">{cat.tools.length}</span>
                  </div>

                  <ul className="tools-list">
                    {cat.tools.map((tool, i) => (
                      <li
                        key={tool.name}
                        title={tool.name}
                        className="tool-card"
                        style={{ animationDelay: `${i * 15}ms` }}
                      >
                        <ToolTile tool={tool} />
                        <span className="tool-name">{tool.name}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            /* 2/3-column card grid when a specific category is selected */
            <div
              style={{
                "--accent": displayedCategories[0]?.accent ?? "var(--color-cyan)",
              } as CSSProperties}
            >
              <div className="cat-head" style={{ marginBottom: "18px" }}>
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: displayedCategories[0]?.accent,
                    boxShadow: `0 0 10px ${displayedCategories[0]?.accent}`,
                    display: "block",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "13px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: displayedCategories[0]?.accent,
                    margin: 0,
                  }}
                >
                  {displayedCategories[0]?.title}
                </h3>
                <span className="cat-count">
                  {displayedCategories[0]?.tools.length} tools
                </span>
              </div>

              <div className="tools-grid-single">
                {displayedCategories[0]?.tools.map((tool, i) => (
                  <div
                    key={tool.name}
                    className="tool-card"
                    style={{ animationDelay: `${i * 20}ms` }}
                  >
                    <ToolTile tool={tool} />
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
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

      {/* Render via Portal so it mounts to document.body, free from parent transforms */}
      {mounted && typeof document !== "undefined" && modalContent
        ? createPortal(modalContent, document.body)
        : null}

      <style>{`
        @keyframes toolsOverlayFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes toolsCardScaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes toolItemFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tools-overlay {
          animation: toolsOverlayFadeIn 180ms ease-out both;
        }
        .tools-dialog-card {
          animation: toolsCardScaleIn 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .tool-card {
          animation: toolItemFadeIn 240ms ease-out both;
        }

        /* ── Close button hover ── */
        .tools-close-btn:hover {
          color: var(--color-cyan) !important;
          border-color: rgba(86, 232, 208, 0.45) !important;
          background: rgba(86, 232, 208, 0.08) !important;
        }

        /* ── Pill filter buttons hover ── */
        .pill-btn:hover:not(.active) {
          border-color: rgba(255, 255, 255, 0.25) !important;
          color: var(--color-fog) !important;
          background: rgba(255, 255, 255, 0.06) !important;
        }

        /* ── Category grid layout (All mode) ── */
        .tools-grid-all {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 880px) {
          .tools-grid-all {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        @media (max-width: 560px) {
          .tools-grid-all {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        /* ── Single category filtered grid ── */
        .tools-grid-single {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 720px) {
          .tools-grid-single {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .tools-grid-single {
            grid-template-columns: 1fr;
          }
        }

        .tools-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        /* ── Category header ── */
        .cat-head {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          padding-bottom: 9px;
        }
        .cat-head::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1.5px;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--accent) 75%, transparent) 0%,
            color-mix(in srgb, var(--accent) 20%, transparent) 60%,
            transparent 100%
          );
        }
        .cat-count {
          font-family: var(--font-jetbrains), monospace;
          font-size: 10px;
          color: rgba(139, 147, 163, 0.65);
          margin-left: auto;
          padding: 1px 6px;
          border-radius: 6px;
          border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
        }

        /* ── Tool card: sleek, compact, readable ── */
        .tool-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 10px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 11px;
          transition: transform 140ms ease, border-color 140ms ease,
            box-shadow 140ms ease, background 140ms ease;
        }
        .tool-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.055);
          border-color: color-mix(in srgb, var(--accent) 55%, rgba(255, 255, 255, 0.15));
          box-shadow: 0 8px 18px -10px color-mix(in srgb, var(--accent) 50%, transparent);
        }
        .tool-name {
          font-size: 12.5px;
          line-height: 1.25;
          font-weight: 500;
          color: var(--color-fog);
          word-break: break-word;
        }

        /* ── Custom sleek scrollbar ── */
        .tools-scroll-content {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 147, 163, 0.3) transparent;
        }
        .tools-scroll-content::-webkit-scrollbar {
          width: 6px;
        }
        .tools-scroll-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .tools-scroll-content::-webkit-scrollbar-thumb {
          background: rgba(139, 147, 163, 0.25);
          border-radius: 6px;
        }
        .tools-scroll-content:hover::-webkit-scrollbar-thumb {
          background: rgba(86, 232, 208, 0.5);
        }
      `}</style>
    </>
  );
}
