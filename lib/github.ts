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

/* ─── Public API ─────────────────────────────────────────────────────────── */

/**
 * Fetch GitHub stats server-side with a 24-hour cache.
 * Returns null if GITHUB_TOKEN is not set — callers must render skeletons.
 * NEVER call from a client component.
 */
export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? "Zars1wali";

  if (!token || token === "ghp_...") return null;

  const now = new Date();
  const from = new Date(now);
  from.setFullYear(from.getFullYear() - 1);

  let rawResponse: Response;
  try {
    rawResponse = await fetch("https://api.github.com/graphql", {
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
      // Cache for 24 hours via Next.js fetch cache
      next: { revalidate: 86400 },
    });
  } catch (err) {
    console.error("[github] fetch error:", err);
    return null;
  }

  if (!rawResponse.ok) {
    console.error("[github] HTTP error:", rawResponse.status);
    return null;
  }

  const json: GitHubRawResponse = await rawResponse.json();

  if (json.errors?.length) {
    console.error("[github] GraphQL errors:", json.errors);
    return null;
  }

  try {
    return processRaw(json);
  } catch (err) {
    console.error("[github] processing error:", err);
    return null;
  }
}
