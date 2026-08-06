import type { Metadata } from "next";
import GlassPanel from "@/components/GlassPanel";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and CV of Umer (zarss) — cybersecurity and software engineering.",
};

export default function ResumePage() {
  return (
    <div className="flex flex-col items-center px-6 py-20 gap-8 w-full max-w-4xl mx-auto">
      {/* ── Header Panel ─────────────────────────────────────────────── */}
      <GlassPanel className="w-full" wide>
        <div className="font-mono text-[12px] tracking-[0.12em] text-cyan flex items-center gap-2 mb-5">
          <span className="block w-[6px] h-[6px] rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
          RESUME
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[clamp(24px,3.5vw,32px)] mb-1">Umer Wali</h1>
            <p className="text-mist text-sm font-mono">BS Cybersecurity · GIKI · Co-Founder, ZPI</p>
          </div>

          <div className="flex gap-3">
            {/* ── PLACEHOLDER BADGE ── */}
            <span className="font-mono text-[11px] border border-yellow-400/40 text-yellow-400 bg-yellow-400/5 rounded px-2 py-1">
              ⚠ Placeholder PDF
            </span>
            <a
              href="/resume.pdf"
              download="umer-wali-resume.pdf"
              className="font-mono text-[12.5px] font-medium bg-cyan text-void px-[18px] py-[10px] rounded-[10px] border border-cyan transition-colors hover:bg-[#6EF0DA] whitespace-nowrap"
            >
              Download PDF ↓
            </a>
          </div>
        </div>
      </GlassPanel>

      {/* ── PDF Viewer ───────────────────────────────────────────────── */}
      <div className="w-full rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[22px] relative">
        {/* Placeholder notice — shown if PDF fails to load */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none z-0">
          <p className="font-mono text-mist text-sm mb-2">
            ⚠ This is a placeholder resume.pdf
          </p>
          <p className="text-mist/60 text-xs max-w-[30ch]">
            Replace{" "}
            <code className="font-mono text-cyan">/public/resume.pdf</code>{" "}
            with your real CV to update this view.
          </p>
        </div>

        {/* Actual PDF embed — sits above the notice when it renders */}
        <iframe
          src="/resume.pdf"
          title="Resume PDF"
          className="w-full relative z-10"
          style={{ height: "80vh", minHeight: "600px", border: "none" }}
        />
      </div>
    </div>
  );
}
