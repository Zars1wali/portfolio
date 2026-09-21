import type { Metadata } from "next";
import Image from "next/image";
import GlassPanel from "@/components/GlassPanel";
import { Download, ExternalLink, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and CV of Umer Wali — Full-Stack Developer, AI Backend Engineer, Cybersecurity.",
};

const resumePages = [
  {
    pageNum: 1,
    src: "/images/resume-page-1.png",
    alt: "Umer Wali CV - Page 1: Professional Summary, Backend AI Engineer at FlyRank AI, Technical Skills, Rabta AI Project",
  },
  {
    pageNum: 2,
    src: "/images/resume-page-2.png",
    alt: "Umer Wali CV - Page 2: HFT Arbitrage Bot on Polymarket, CIMS Project, From Tribe Multi-Vendor Marketplace, Education",
  },
];

export default function ResumePage() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 py-20 gap-8 w-full max-w-4xl mx-auto">
      {/* ── Header Panel ─────────────────────────────────────────────── */}
      <GlassPanel className="w-full" wide>
        <div className="font-mono text-[12px] tracking-[0.12em] text-cyan flex items-center gap-2 mb-4">
          <span className="block w-[6px] h-[6px] rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
          CURRICULUM VITAE
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[clamp(24px,3.5vw,32px)] font-bold text-fog mb-1 tracking-tight">
              Umer Wali
            </h1>
            <p className="text-mist text-sm font-mono flex flex-wrap items-center gap-2">
              <span>BS Cybersecurity · GIKI</span>
              <span className="text-mist/40">•</span>
              <span>Backend AI Engineer</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-mist hover:text-fog px-3.5 py-2 rounded-[10px] border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.03)] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink width={13} height={13} />
              Open PDF
            </a>
            <a
              href="/resume.pdf"
              download="Umer_Wali_CV.pdf"
              className="font-mono text-[12.5px] font-medium bg-cyan text-void px-4 py-2 rounded-[10px] border border-cyan transition-all hover:bg-[#6EF0DA] shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2 whitespace-nowrap"
            >
              <Download width={14} height={14} />
              Download CV ↓
            </a>
          </div>
        </div>
      </GlassPanel>

      {/* ── High-Resolution CV Document Pages ───────────────────────── */}
      <div className="w-full flex flex-col gap-8">
        {resumePages.map((page) => (
          <div
            key={page.pageNum}
            className="w-full flex flex-col items-center group"
          >
            {/* Page Header Indicator */}
            <div className="w-full flex items-center justify-between pb-3 px-2">
              <div className="flex items-center gap-2 font-mono text-xs text-mist/70">
                <FileText width={13} height={13} className="text-cyan/80" />
                <span>Page {page.pageNum} of {resumePages.length}</span>
              </div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-cyan/70 hover:text-cyan transition-colors"
              >
                View High-Res PDF ↗
              </a>
            </div>

            {/* Document Sheet */}
            <div className="w-full rounded-[14px] sm:rounded-[18px] overflow-hidden border border-[rgba(255,255,255,0.15)] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-cyan/40">
              <Image
                src={page.src}
                alt={page.alt}
                width={1530}
                height={1980}
                priority={page.pageNum === 1}
                className="w-full h-auto block select-none"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Action Bar ───────────────────────────────────────── */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-[16px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md">
        <p className="font-mono text-xs text-mist text-center sm:text-left">
          Ready to review or share? Download the official vector PDF format.
        </p>
        <a
          href="/resume.pdf"
          download="Umer_Wali_CV.pdf"
          className="font-mono text-[12.5px] font-medium bg-cyan text-void px-5 py-2.5 rounded-[10px] border border-cyan transition-all hover:bg-[#6EF0DA] flex items-center gap-2"
        >
          <Download width={14} height={14} />
          Download Umer_Wali_CV.pdf
        </a>
      </div>
    </div>
  );
}
