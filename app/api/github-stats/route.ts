/**
 * app/api/github-stats/route.ts
 * Server-side API route — proxies GitHub GraphQL via lib/github.ts.
 * The GitHub token NEVER leaves the server. The client calls /api/github-stats;
 * the server calls api.github.com with the token.
 */

import { NextResponse } from "next/server";
import { fetchGitHubStats } from "@/lib/github";

// Revalidate cached response every 24 hours (ISR)
export const revalidate = 86400;

export async function GET() {
  const stats = await fetchGitHubStats();

  if (!stats) {
    return NextResponse.json(
      { error: "no_token", message: "GITHUB_TOKEN not configured" },
      {
        status: 200, // return 200 so the client can handle it gracefully
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  return NextResponse.json(stats, {
    headers: {
      // Let CDN/Next.js cache this response for 24h
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
