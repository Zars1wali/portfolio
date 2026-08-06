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
    label: "Security",
    skills: ["Threat Modeling", "Penetration Testing", "OSINT", "Network Security", "CTF"],
  },
  {
    label: "Development",
    skills: ["TypeScript", "Next.js", "Rust", "Python", "Go"],
  },
  {
    label: "Infrastructure",
    skills: ["Docker", "Nginx", "Linux", "VPS Self-Hosting", "CI/CD"],
  },
  {
    label: "AI & Data",
    skills: ["LLM Tooling", "Satellite Imagery", "GeoSpatial Analysis", "Retrieval-Augmented Generation"],
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
          {/* TODO: needs content — replace with about.md content once content-seed is available */}
          BS Cybersecurity student at GIKI and Co-Founder & COO of Zero Point Intel (ZPI) — a startup
          building satellite-driven agri-intelligence platforms and secure systems.
        </p>
        <p className="text-mist text-base leading-relaxed">
          {/* TODO: needs content — replace with about.md content once content-seed is available */}
          My work sits at the intersection of security engineering, applied AI, and systems design.
          I ship end-to-end products — from architecture to deployment on self-hosted VPS infrastructure.
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
              className="p-5 rounded-[16px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]"
            >
              <p className="font-mono text-xs text-cyan tracking-widest uppercase mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs text-mist bg-[rgba(255,255,255,0.05)] px-2.5 py-1 rounded-md"
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
