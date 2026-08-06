import type { NextRequest } from "next/server";

/**
 * Returns the externally visible origin for routes served directly in local
 * development and behind the Nginx reverse proxy in production.
 */
export function getSiteOrigin(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;
  const protocol =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(/:$/, "");

  return `${protocol}://${host}`;
}
