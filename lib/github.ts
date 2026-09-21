/**
 * lib/github.ts
 * GitHub GraphQL API client — runs ONLY on the server.
 * Token is read from GITHUB_TOKEN env var, never exposed to the client.
 * Response is cached 24 h via Next.js fetch cache (revalidate: 86400).
 *
 * Security: per AGENTS.md, all GitHub API calls go through this file.
 * Never import this from a "use client" component.
 */

import fs from "fs";
import path from "path";

/* ─── GraphQL query (loaded from content-seed at build time) ─────────────── */
const QUERY_PATH = path.join(
  process.cwd(),
  "content-seed",
  "lab-data",
  "github-stats-query.graphql"
);

let _query: string | null = null;
function getQuery(): string {
  if (!_query) {
    _query = fs.readFileSync(/*turbopackIgnore: true*/ QUERY_PATH, "utf8");
  }
  return _query;
}

/* ─── Types (mirror GitHub GraphQL schema field names exactly) ───────────── */

export interface ContributionDay {
  contributionCount: number;
  date: string; // "YYYY-MM-DD"
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GHLanguage {
  name: string;
  color: string | null;
}

interface GHLanguageEdge {
  size: number;
  node: GHLanguage;
}

interface GHRepository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  isArchived: boolean;
  isFork: boolean;
  primaryLanguage: GHLanguage | null;
  languages: { edges: GHLanguageEdge[] };
}

export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: GHLanguage | null;
}

interface GitHubRawResponse {
  data: {
    user: {
      repositories: {
        totalCount: number;
        nodes: GHRepository[];
      };
      pinnedItems: {
        nodes: PinnedRepo[];
      };
      contributionsCollection: {
        totalCommitContributions: number;
        totalIssueContributions: number;
        totalPullRequestContributions: number;
        totalPullRequestReviewContributions: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
  errors?: { message: string }[];
}

/* ─── Processed/derived types for UI components ──────────────────────────── */

export interface ProcessedLanguage {
  name: string;
  color: string;
  bytes: number;
  percentage: number;
}

export interface GitHubStats {
  totalContributions: number;
  publicRepos: number;
  topLanguage: string;
  longestStreak: number;
  currentStreak: number;
  calendar: ContributionWeek[];
  languages: ProcessedLanguage[];
  pinnedRepos: PinnedRepo[];
}

/* ─── Data processing ────────────────────────────────────────────────────── */

function computeStreaks(weeks: ContributionWeek[]): {
  longest: number;
  current: number;
} {
  const today = new Date().toISOString().split("T")[0];
  const allDays = weeks.flatMap((w) => w.contributionDays);

  // Longest streak — forward pass
  let longest = 0;
  let run = 0;
  for (const day of allDays) {
    if (day.date > today) break;
    if (day.contributionCount > 0) {
      run++;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  // Current streak — backward pass from today
  run = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    const day = allDays[i];
    if (day.date > today) continue;
    if (day.contributionCount > 0) {
      run++;
    } else {
      break;
    }
  }

  return { longest, current: run };
}

function processLanguages(repos: GHRepository[]): ProcessedLanguage[] {
  const langMap = new Map<string, { color: string; bytes: number }>();

  for (const repo of repos) {
    if (repo.isFork || repo.isArchived) continue;
    for (const edge of repo.languages.edges) {
      const { name, color } = edge.node;
      const existing = langMap.get(name);
      if (existing) {
        existing.bytes += edge.size;
      } else {
        langMap.set(name, { color: color ?? "#8B93A3", bytes: edge.size });
      }
    }
  }

  const sorted = Array.from(langMap.entries())
    .sort((a, b) => b[1].bytes - a[1].bytes)
    .slice(0, 6);

  const totalBytes = sorted.reduce((s, [, v]) => s + v.bytes, 0);

  return sorted.map(([name, { color, bytes }]) => ({
    name,
    color,
    bytes,
    percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
  }));
}

function processRaw(raw: GitHubRawResponse): GitHubStats {
  const user = raw.data.user;
  const cc = user.contributionsCollection;
  const calendar = cc.contributionCalendar;

  const { longest, current } = computeStreaks(calendar.weeks);
  const languages = processLanguages(user.repositories.nodes);

  return {
    totalContributions: calendar.totalContributions,
    publicRepos: user.repositories.totalCount,
    topLanguage: languages[0]?.name ?? "N/A",
    longestStreak: longest,
    currentStreak: current,
    calendar: calendar.weeks,
    languages,
    pinnedRepos: user.pinnedItems.nodes,
  };
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  "C++": "#F34B7D",
  C: "#555555",
  HTML: "#E34F26",
  CSS: "#563D7C",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Shell: "#89E051",
};

/**
 * Public GitHub REST + Contribution Calendar fallback.
 * Fetches user profile, public repositories, and contributions without requiring a private token.
 */
async function fetchPublicGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const [userRes, reposRes, contribRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { "User-Agent": "zarss-portfolio/1.0" },
        next: { revalidate: 86400 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers: { "User-Agent": "zarss-portfolio/1.0" },
        next: { revalidate: 86400 },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
        headers: { "User-Agent": "zarss-portfolio/1.0" },
        next: { revalidate: 86400 },
      }),
    ]);

    const user = userRes.status === "fulfilled" && userRes.value.ok ? await userRes.value.json() : null;
    const repos = reposRes.status === "fulfilled" && reposRes.value.ok ? await reposRes.value.json() : [];
    const contrib = contribRes.status === "fulfilled" && contribRes.value.ok ? await contribRes.value.json() : null;

    if (!user && repos.length === 0) {
      return null;
    }

    // Build 52-week calendar
    let weeks: ContributionWeek[] = [];
    let totalContributions = 0;

    if (contrib?.contributions?.length) {
      const sortedDays = [...contrib.contributions].sort((a: any, b: any) =>
        a.date.localeCompare(b.date)
      );
      const today = new Date().toISOString().split("T")[0];
      const pastDays = sortedDays.filter((d: any) => d.date <= today);
      const lastYearDays = pastDays.slice(-364);

      totalContributions = lastYearDays.reduce((acc: number, d: any) => acc + (d.count || 0), 0);

      for (let i = 0; i < lastYearDays.length; i += 7) {
        const chunk = lastYearDays.slice(i, i + 7);
        weeks.push({
          contributionDays: chunk.map((d: any) => ({
            date: d.date,
            contributionCount: d.count || 0,
          })),
        });
      }
    }

    const { longest, current } = computeStreaks(weeks);

    // Process languages across user repos
    const langMap = new Map<string, { color: string; bytes: number }>();
    for (const repo of repos) {
      if (repo.fork || !repo.language) continue;
      const lang = repo.language;
      const size = repo.size || 100;
      const existing = langMap.get(lang);
      if (existing) {
        existing.bytes += size;
      } else {
        langMap.set(lang, { color: LANGUAGE_COLORS[lang] ?? "#8B93A3", bytes: size });
      }
    }

    const totalBytes = Array.from(langMap.values()).reduce((sum, v) => sum + v.bytes, 0);
    const languages = Array.from(langMap.entries())
      .map(([name, { color, bytes }]) => ({
        name,
        color,
        bytes,
        percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 6);

    // Pinned repos (top active non-fork repositories)
    const pinnedRepos: PinnedRepo[] = repos
      .filter((r: any) => !r.fork)
      .slice(0, 6)
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stargazerCount: r.stargazers_count ?? 0,
        forkCount: r.forks_count ?? 0,
        primaryLanguage: r.language
          ? {
              name: r.language,
              color: LANGUAGE_COLORS[r.language] ?? "#8B93A3",
            }
          : null,
      }));

    return {
      totalContributions:
        totalContributions ||
        (contrib?.total
          ? Object.values(contrib.total as Record<string, number>).reduce((a, b) => a + b, 0)
          : 0),
      publicRepos: user?.public_repos ?? repos.length,
      topLanguage: languages[0]?.name ?? "TypeScript",
      longestStreak: longest,
      currentStreak: current,
      calendar: weeks,
      languages,
      pinnedRepos,
    };
  } catch (err) {
    console.error("[github] public fetch error:", err);
    return null;
  }
}

/* ─── Public API ─────────────────────────────────────────────────────────── */

/**
 * Fetch GitHub stats server-side with a 24-hour cache.
 * Uses GraphQL when GITHUB_TOKEN is valid, and seamlessly falls back
 * to the public GitHub API and contribution calendar so the Lab dashboard is always live.
 */
export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? "Zars1wali";

  if (token && token !== "ghp_..." && !token.startsWith("ghp_placeholder")) {
    const now = new Date();
    const from = new Date(now);
    from.setFullYear(from.getFullYear() - 1);

    try {
      const rawResponse = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "zarss-portfolio/1.0",
        },
        body: JSON.stringify({
          query: getQuery(),
          variables: {
            username,
            from: from.toISOString(),
            to: now.toISOString(),
          },
        }),
        next: { revalidate: 86400 },
      });

      if (rawResponse.ok) {
        const json: GitHubRawResponse = await rawResponse.json();
        if (!json.errors?.length) {
          return processRaw(json);
        }
      } else {
        console.warn(`[github] GraphQL returned HTTP ${rawResponse.status}, falling back to public GitHub API...`);
      }
    } catch (err) {
      console.warn("[github] GraphQL fetch error, falling back to public GitHub API...", err);
    }
  }

  // Fallback to public GitHub data so dashboard always syncs
  return fetchPublicGitHubStats(username);
}
