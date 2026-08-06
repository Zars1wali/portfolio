import type { Metadata } from "next";
import GlassPanel from "@/components/GlassPanel";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with zarss — open to security/software roles and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-20">
      <GlassPanel>
        <div className="font-mono text-[12px] tracking-[0.12em] text-cyan flex items-center gap-2 mb-5">
          <span className="block w-[6px] h-[6px] rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
          CONTACT
        </div>

        <h1 className="text-[clamp(26px,4vw,36px)] mb-4">Get in Touch</h1>

        <p className="text-mist text-base leading-relaxed mb-8 max-w-[40ch]">
          {/* TODO: needs content — replace with contact.md copy once content-seed is available */}
          Open to security engineering roles, software collaborations, and research conversations.
          Best reached by email.
        </p>

        {/* ── Primary CTA ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href="mailto:walizar34@gmail.com"
            className="font-mono text-[12.5px] font-medium bg-cyan text-void px-[18px] py-[10px] rounded-[10px] border border-cyan transition-colors hover:bg-[#6EF0DA]"
          >
            Email Me ↗
          </a>
          <a
            href="https://github.com/Zars1wali"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12.5px] text-fog bg-[rgba(255,255,255,0.02)] px-[18px] py-[10px] rounded-[10px] border border-[rgba(255,255,255,0.12)] transition-colors hover:border-cyan hover:text-cyan hover:bg-[rgba(86,232,208,0.06)]"
          >
            GitHub
          </a>
        </div>

        {/* ── Contacts List ─────────────────────────────────────────── */}
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 w-full">
          <p className="font-mono text-xs text-mist tracking-widest uppercase mb-3">Direct</p>
          <ul className="space-y-2 text-sm text-fog font-mono">
            <li>
              <span className="text-mist mr-2">email</span>
              <a
                href="mailto:walizar34@gmail.com"
                className="text-cyan hover:underline underline-offset-4"
              >
                walizar34@gmail.com
              </a>
            </li>
            <li>
              <span className="text-mist mr-2">work</span>
              <a
                href="mailto:umer.wali@zeropointintel.com"
                className="text-cyan hover:underline underline-offset-4"
              >
                umer.wali@zeropointintel.com
              </a>
            </li>
            <li>
              <span className="text-mist mr-2">github</span>
              <a
                href="https://github.com/Zars1wali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline underline-offset-4"
              >
                github.com/Zars1wali
              </a>
            </li>
          </ul>
          {/* TODO: Add LinkedIn URL when available */}
        </div>
      </GlassPanel>
    </div>
  );
}
