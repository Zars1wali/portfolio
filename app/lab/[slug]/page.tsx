import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getLabSlugs, getLabContent } from "@/lib/content";

/* ── Static generation ──────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return getLabSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getLabContent(slug);
    return {
      title: meta.title,
      ...(meta.summary ? { description: meta.summary } : {}),
      openGraph: { type: "article", title: meta.title, ...(meta.summary ? { description: meta.summary } : {}) },
      twitter: { card: "summary_large_image", title: meta.title, ...(meta.summary ? { description: meta.summary } : {}) },
    };
  } catch {
    return { title: "Entry not found" };
  }
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let meta, content;
  try {
    ({ meta, content } = getLabContent(slug));
  } catch {
    notFound();
  }

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
          href="/lab"
          style={{ color: "var(--color-violet)", textDecoration: "none" }}
        >
          Lab
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
            "0 30px 60px -20px rgba(0,0,0,0.5), 0 0 40px -10px rgba(139,124,246,0.10)",
          marginBottom: "32px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-violet)",
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
              background: "var(--color-violet)",
              boxShadow: "0 0 8px var(--color-violet)",
              display: "block",
            }}
          />
          LAB · {meta.year}
        </div>

        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          {meta.title}
        </h1>

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

        {meta.summary && (
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: "var(--color-mist)",
              marginBottom: meta.stack?.length ? "20px" : "0",
            }}
          >
            {meta.summary}
          </p>
        )}

        {meta.stack && meta.stack.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {meta.stack.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "11px",
                  color: "var(--color-mist)",
                  background: "rgba(139,124,246,0.05)",
                  border: "1px solid rgba(139,124,246,0.15)",
                  borderRadius: "6px",
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
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
          <div className="prose">
            <MDXRemote source={content} />
          </div>
        </div>
      )}
    </div>
  );
}
