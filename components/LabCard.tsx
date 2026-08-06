"use client";

import Link from "next/link";
import type { LabMeta } from "@/lib/content";

export default function LabCard({ entry }: { entry: LabMeta }) {
  return (
    <Link href={`/lab/${entry.slug}`} style={{ display: "block" }}>
      <article
        style={{
          height: "100%",
          padding: "28px 28px 24px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "16px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(139,124,246,0.35)";
          e.currentTarget.style.boxShadow = "0 0 24px -8px rgba(139,124,246,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-fog)", margin: 0 }}>
            {entry.title}
          </h2>
          <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "var(--color-violet)", border: "1px solid rgba(139,124,246,0.25)", borderRadius: "6px", padding: "2px 8px", whiteSpace: "nowrap", background: "rgba(139,124,246,0.05)", flexShrink: 0 }}>
            {entry.year}
          </span>
        </div>

        {entry.wip ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "rgba(139,147,163,0.7)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "5px 10px", background: "rgba(255,255,255,0.03)", alignSelf: "flex-start" }}>
            <span style={{ opacity: 0.7 }}>⏳</span>
            Details coming soon
          </div>
        ) : (
          <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--color-mist)", margin: 0, flex: 1 }}>
            {entry.summary}
          </p>
        )}

        {entry.stack && entry.stack.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto", paddingTop: "4px" }}>
            {entry.stack.map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "var(--color-mist)", background: "rgba(139,124,246,0.05)", border: "1px solid rgba(139,124,246,0.15)", borderRadius: "6px", padding: "2px 8px", whiteSpace: "nowrap" }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
