import type { Metadata } from "next";
import { getAllLab } from "@/lib/content";
import { fetchGitHubStats } from "@/lib/github";
import GitHubDashboard from "@/components/GitHubDashboard";
import LabCard from "@/components/LabCard";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Coding case studies, AI experiments, and live GitHub activity — zarss.",
};

// ISR: regenerate this page every 24 hours to pick up fresh GitHub data
export const revalidate = 86400;

export default async function LabPage() {
  // Fetch GitHub stats server-side — token never touches the client
  const githubStats = await fetchGitHubStats();

  const entries = getAllLab();

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "80px 24px 64px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "64px",
      }}
    >
      {/* ── Page header ── */}
      <header>
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-violet)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
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
          LAB
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          Experiments &amp; Case Studies
        </h1>
        <p
          style={{
            color: "var(--color-mist)",
            fontSize: "15px",
            lineHeight: 1.6,
            maxWidth: "52ch",
          }}
        >
          Live GitHub activity dashboard, coding case studies, and AI tooling
          experiments.
        </p>
      </header>

      {/* ── GitHub Activity Dashboard ── */}
      <GitHubDashboard stats={githubStats} />

      {/* ── Case-study grid ── */}
      <section aria-label="Case studies">
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-violet)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
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
          CASE STUDIES
        </div>

        {entries.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "13px",
              color: "var(--color-mist)",
            }}
          >
            {/* TODO: entries appear here once content/lab/*.mdx files are added */}
            No entries yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {entries.map((e) => (
              <LabCard key={e.slug} entry={e} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
