import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectSlugs, getProjectContent } from "@/lib/content";
import PolymarketLiveDashboard from "@/components/PolymarketLiveDashboard";

/* ── Static generation ──────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getProjectContent(slug);
    return {
      title: meta.title,
      ...(meta.summary ? { description: meta.summary } : {}),
      openGraph: { type: "article", title: meta.title, ...(meta.summary ? { description: meta.summary } : {}) },
      twitter: { card: "summary_large_image", title: meta.title, ...(meta.summary ? { description: meta.summary } : {}) },
    };
  } catch {
    return { title: "Project not found" };
  }
}

/* ── Helpers ────────────────────────────────────────────────────────────── */
function StackChip({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: "11px",
        color: "var(--color-mist)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "6px",
        padding: "2px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function LinkButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: "12.5px",
        color: "var(--color-fog)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px",
        padding: "8px 16px",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        transition: "border-color 0.15s, color 0.15s",
      }}
    >
      {label} ↗
    </Link>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let meta, content;
  try {
    ({ meta, content } = getProjectContent(slug));
  } catch {
    notFound();
  }

  const hasLinks = meta.links?.repo || meta.links?.live;
  const hasBody = content.trim().length > 0;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 24px 64px",
        width: "100%",
      }}
    >
      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Breadcrumb"
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "12px",
          color: "var(--color-mist)",
          marginBottom: "32px",
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        <Link
          href="/projects"
          style={{ color: "var(--color-cyan)", textDecoration: "none" }}
        >
          Projects
        </Link>
        <span>/</span>
        <span>{meta.title}</span>
      </nav>

      {/* ── Header GlassPanel ── */}
      <div
        style={{
          padding: "36px 36px 28px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "20px",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.5), 0 0 40px -10px rgba(86,232,208,0.1)",
          marginBottom: "32px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-cyan)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--color-cyan)",
              boxShadow: "0 0 8px var(--color-cyan)",
              display: "block",
            }}
          />
          PROJECT · {meta.year}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          {meta.title}
        </h1>

        {/* WIP badge */}
        {meta.wip && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "11px",
              color: "rgba(139,147,163,0.8)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "6px",
              padding: "5px 10px",
              background: "rgba(255,255,255,0.03)",
              marginBottom: "16px",
            }}
          >
            ⏳ Details coming soon
          </div>
        )}

        {/* Summary */}
        {meta.summary && (
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: "var(--color-mist)",
              marginBottom: "20px",
            }}
          >
            {meta.summary}
          </p>
        )}

        {/* Role */}
        {meta.role && (
          <div
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12px",
              color: "var(--color-mist)",
              marginBottom: "16px",
            }}
          >
            <span style={{ color: "rgba(139,147,163,0.6)" }}>role</span>{" "}
            <span style={{ color: "var(--color-fog)" }}>{meta.role}</span>
          </div>
        )}

        {/* Stack chips */}
        {meta.stack?.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: hasLinks ? "20px" : "0",
            }}
          >
            {meta.stack.map((t) => (
              <StackChip key={t} label={t} />
            ))}
          </div>
        )}

        {meta.workflow && meta.workflow.length > 0 && (
          <div
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12px",
              color: "var(--color-mist)",
              marginTop: meta.stack?.length ? "20px" : "0",
            }}
          >
            <span style={{ color: "rgba(139,147,163,0.6)" }}>tools &amp; workflow</span>{" "}
            <span style={{ color: "var(--color-fog)" }}>{meta.workflow.join(" · ")}</span>
          </div>
        )}

        {/* Links */}
        {hasLinks && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
            {meta.links?.repo && (
              <LinkButton href={meta.links.repo} label="View Repo" />
            )}
            {meta.links?.live && (
              <LinkButton href={meta.links.live} label="Live Demo" />
            )}
          </div>
        )}
      </div>

      {/* ── Body content ── */}
      {hasBody && (
        <div
          style={{
            padding: "32px 36px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {slug === "polymarket-arbitrage-bot" && <PolymarketLiveDashboard />}
          <div className="prose">
            <MDXRemote source={content} />
          </div>
        </div>
      )}
    </div>
  );
}
