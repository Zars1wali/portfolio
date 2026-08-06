"use client";

import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";

function StackChip({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: "11px",
        color: "var(--color-mist)",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "6px",
        padding: "2px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/** Card with full-bleed cover photo/video + gradient scrim + glass text panel */
function ImageCard({ project }: { project: ProjectMeta }) {
  const isVideo = project.image && /\.(mp4|webm|ogv)(\?.*)?$/i.test(project.image);

  return (
    <Link href={`/projects/${project.slug}`} style={{ display: "block", height: "100%" }}>
      <article
        className="project-card-image"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          minHeight: "300px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.12)",
          cursor: "pointer",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(86,232,208,0.4)";
          e.currentTarget.style.boxShadow = "0 0 28px -6px rgba(86,232,208,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Cover photo or video — full bleed */}
        {isVideo ? (
          <video
            src={project.image}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 0,
            }}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={`${project.title} preview`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 0,
            }}
            loading="lazy"
          />
        )}

        {/* Gradient scrim — bottom-heavy (92% at bottom → 10% at top) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(5,7,12,0.92) 0%, rgba(5,7,12,0.72) 38%, rgba(5,7,12,0.28) 65%, rgba(5,7,12,0.10) 100%)",
            zIndex: 1,
          }}
        />

        {/* Glass text panel — sits on top of scrim, blurs everything behind it */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 24px 22px",
            background: "rgba(5,7,12,0.25)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--color-fog)",
                margin: 0,
              }}
            >
              {project.title}
            </h2>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "11px",
                color: "var(--color-cyan)",
                border: "1px solid rgba(86,232,208,0.28)",
                borderRadius: "6px",
                padding: "2px 8px",
                whiteSpace: "nowrap",
                background: "rgba(86,232,208,0.07)",
                flexShrink: 0,
              }}
            >
              {project.year}
            </span>
          </div>

          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.58,
              color: "var(--color-mist)",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.summary}
          </p>

          {project.stack?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {project.stack.slice(0, 4).map((t) => (
                <StackChip key={t} label={t} />
              ))}
              {project.stack.length > 4 && (
                <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "rgba(139,147,163,0.5)", padding: "2px 4px" }}>
                  +{project.stack.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

/** Card with tinted-SignalMesh fallback (no image) — original design unchanged */
function MeshCard({ project }: { project: ProjectMeta }) {
  return (
    <Link href={`/projects/${project.slug}`} style={{ display: "block" }}>
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
          e.currentTarget.style.borderColor = "rgba(86,232,208,0.35)";
          e.currentTarget.style.boxShadow = "0 0 24px -8px rgba(86,232,208,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-fog)", margin: 0 }}>
            {project.title}
          </h2>
          <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "var(--color-cyan)", border: "1px solid rgba(86,232,208,0.25)", borderRadius: "6px", padding: "2px 8px", whiteSpace: "nowrap", background: "rgba(86,232,208,0.05)", flexShrink: 0 }}>
            {project.year}
          </span>
        </div>

        {project.wip ? (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "rgba(139,147,163,0.7)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "5px 10px", background: "rgba(255,255,255,0.03)", alignSelf: "flex-start" }}>
            <span style={{ opacity: 0.7 }}>⏳</span>
            Details coming soon
          </div>
        ) : (
          <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--color-mist)", margin: 0, flex: 1 }}>
            {project.summary}
          </p>
        )}

        {project.stack?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto", paddingTop: "4px" }}>
            {project.stack.map((t) => <StackChip key={t} label={t} />)}
          </div>
        )}
      </article>
    </Link>
  );
}

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return project.image ? (
    <ImageCard project={project} />
  ) : (
    <MeshCard project={project} />
  );
}
