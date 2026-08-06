import type { GitHubStats } from "@/lib/github";
import { MetricRowSkeleton } from "./Skeletons";

interface Props {
  stats: GitHubStats | null;
}

interface MetricDef {
  key: keyof Pick<
    GitHubStats,
    "totalContributions" | "publicRepos" | "topLanguage" | "longestStreak"
  >;
  label: string;
  sub: string;
  fmt: (v: number | string) => string;
}

const METRICS: MetricDef[] = [
  {
    key: "totalContributions",
    label: "Contributions",
    sub: "past 12 months",
    fmt: (v) => Number(v).toLocaleString(),
  },
  {
    key: "publicRepos",
    label: "Public Repos",
    sub: "owner",
    fmt: (v) => String(v),
  },
  {
    key: "topLanguage",
    label: "Top Language",
    sub: "by commit volume",
    fmt: (v) => String(v),
  },
  {
    key: "longestStreak",
    label: "Longest Streak",
    sub: "days",
    fmt: (v) => `${v}d`,
  },
];

export default function MetricCards({ stats }: Props) {
  if (!stats) return <MetricRowSkeleton />;

  return (
    <>
      <div
        className="github-metric-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
        }}
      >
        {METRICS.map(({ key, label, sub, fmt }) => {
          const raw = stats[key] as number | string;
          const value = fmt(raw);
          return (
            <div
              key={key}
              style={{
                padding: "20px 20px 18px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "14px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "var(--color-mist)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: key === "topLanguage" ? "18px" : "26px",
                  fontWeight: 600,
                  color: "var(--color-cyan)",
                  lineHeight: 1.1,
                  marginBottom: "4px",
                  letterSpacing: key === "topLanguage" ? "0" : "-0.02em",
                  wordBreak: "break-all",
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "10px",
                  color: "rgba(139,147,163,0.6)",
                }}
              >
                {sub}
              </p>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .github-metric-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
