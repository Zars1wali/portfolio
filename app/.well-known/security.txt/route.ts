import type { NextRequest } from "next/server";
import { getSiteOrigin } from "@/lib/site-origin";

export function GET(request: NextRequest) {
  const origin = getSiteOrigin(request);
  const body = [
    "Contact: mailto:walizar34@gmail.com",
    "Preferred-Languages: en",
    `Canonical: ${origin}/.well-known/security.txt`,
    "Expires: 2027-01-01T00:00:00.000Z",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
