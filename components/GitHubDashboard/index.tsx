/**
 * GitHubDashboard — server component.
 * Receives pre-fetched stats from app/lab/page.tsx.
 * stats === null means GITHUB_TOKEN not set — renders skeletons throughout.
 * Never fetches directly; all data comes via props from the server.
 */

import type { GitHubStats } from "@/lib/github";
import MetricCards from "./MetricCards";
import CalendarHeatmap from "./CalendarHeatmap";
import TopLanguages from "./TopLanguages";
import PinnedRepos from "./PinnedRepos";

interface Props {
  stats: GitHubStats | null;
}

/* ── Section wrapper ─────────────────────────────────────────────────────── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "24px 28px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          color: "rgba(86,232,208,0.75)",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────────────────────── */
export default function GitHubDashboard({ stats }: Props) {
  return (
    <section aria-label="GitHub activity dashboard">
      {/* ── Outer GlassPanel ── */}
      <div
        style={{
          padding: "32px 32px 28px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "20px",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.4), 0 0 40px -15px rgba(86,232,208,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* ── Section header ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--color-cyan)",
              boxShadow: "0 0 10px var(--color-cyan)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: "var(--color-cyan)",
            }}
          >
            {"// github_activity"}
          </span>

          {!stats && (
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "10px",
                color: "rgba(139,147,163,0.5)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                padding: "2px 8px",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              GITHUB_TOKEN not configured
            </span>
          )}
        </div>

        {/* ── Metric row (4 cards) ── */}
        <MetricCards stats={stats} />

        {/* ── Contribution calendar ── */}
        <Section title="Contributions · Past 12 months">
          <CalendarHeatmap calendar={stats?.calendar ?? null} />
        </Section>

        {/* ── Languages + Pinned side by side on wide screens ── */}
        <div className="gh-bottom-grid">
          <Section title="Top Languages">
            <TopLanguages languages={stats?.languages ?? null} />
          </Section>

          <Section title="Pinned Repos">
            <PinnedRepos repos={stats?.pinnedRepos ?? null} />
          </Section>
        </div>
      </div>

      <style>{`
        .gh-bottom-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 16px;
          align-items: start;
        }
        @media (max-width: 720px) {
          .gh-bottom-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
