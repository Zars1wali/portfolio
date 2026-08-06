import Link from "next/link";
import type { PinnedRepo } from "@/lib/github";
import { PinnedReposSkeleton } from "./Skeletons";

interface Props {
  repos: PinnedRepo[] | null;
}

function StarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

export default function PinnedRepos({ repos }: Props) {
  if (!repos) return <PinnedReposSkeleton />;

  if (repos.length === 0) {
    return (
      <p
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "12px",
          color: "var(--color-mist)",
        }}
      >
        No pinned repositories.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "12px",
      }}
    >
      {repos.map((repo) => (
        <Link
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div
            className="gh-pinned-card"
            style={{
              height: "100%",
              padding: "18px 20px 16px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              cursor: "pointer",
              transition: "border-color 0.18s ease, box-shadow 0.18s ease",
            }}
          >
            {/* Repo name */}
            <p
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-cyan)",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {repo.name}
            </p>

            {/* Description */}
            <p
              style={{
                fontSize: "12px",
                lineHeight: 1.5,
                color: "var(--color-mist)",
                margin: 0,
                flex: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {repo.description ?? ""}
            </p>

            {/* Footer: language + stars */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "6px",
              }}
            >
              {repo.primaryLanguage && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    color: "var(--color-mist)",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: repo.primaryLanguage.color ?? "#8B93A3",
                      flexShrink: 0,
                    }}
                  />
                  {repo.primaryLanguage.name}
                </span>
              )}

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "11px",
                  color: "rgba(139,147,163,0.7)",
                }}
              >
                <StarIcon />
                {repo.stargazerCount}
              </span>
            </div>
          </div>
        </Link>
      ))}

      <style>{`
        .gh-pinned-card:hover {
          border-color: rgba(86,232,208,0.28) !important;
          box-shadow: 0 0 20px -8px rgba(86,232,208,0.15);
        }
      `}</style>
    </div>
  );
}
