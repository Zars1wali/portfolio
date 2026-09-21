import type { Metadata } from "next";
import GlassPanel from "@/components/GlassPanel";
import { Download, ExternalLink } from "lucide-react";

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

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-mist hover:text-fog px-[14px] py-[9px] rounded-[10px] border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.03)] transition-colors flex items-center gap-2"
            >
              <ExternalLink width={13} height={13} />
              Open in Tab
            </a>
            <a
              href="/resume.pdf"
              download="Umer_Wali_CV.pdf"
              className="font-mono text-[12.5px] font-medium bg-cyan text-void px-[18px] py-[10px] rounded-[10px] border border-cyan transition-colors hover:bg-[#6EF0DA] flex items-center gap-2 whitespace-nowrap"
            >
              <Download width={14} height={14} />
              Download CV ↓
            </a>
          </div>
        </div>
      </GlassPanel>

      {/* ── PDF Viewer ───────────────────────────────────────────────── */}
      <div className="w-full rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[22px] relative min-h-[700px] flex flex-col">
        {/* Fallback notice — shown if browser cannot embed PDFs directly */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none z-0">
          <p className="font-mono text-mist text-sm mb-2">
            Loading preview or PDF display not supported by browser
          </p>
          <p className="text-mist/60 text-xs max-w-[34ch] mb-4">
            You can view or download Umer&apos;s full CV directly.
          </p>
          <a
            href="/resume.pdf"
            download="Umer_Wali_CV.pdf"
            className="pointer-events-auto font-mono text-xs text-cyan underline hover:opacity-80"
          >
            Download Umer_Wali_CV.pdf
          </a>
        </div>

        {/* Actual PDF embed */}
        <object
          data="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
          type="application/pdf"
          className="w-full relative z-10 flex-1"
          style={{ height: "82vh", minHeight: "680px", border: "none" }}
        >
          <iframe
            src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
            title="Umer Wali CV"
            className="w-full h-full border-none"
            style={{ height: "82vh", minHeight: "680px" }}
          />
        </object>
      </div>
    </div>
  );
}
