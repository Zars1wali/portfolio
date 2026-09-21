import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // Standalone output for Docker self-hosting (per AGENTS.md).
  // Disabled on Vercel: Next 16.3 no longer emits next-server.js.nft.json,
  // which Vercel's build expects when standalone is enabled (known issue #96646).
  output: process.env.VERCEL ? undefined : "standalone",
  // Do not disclose the framework in response headers.
  poweredByHeader: false,
  // Keep browser source maps out of production static assets.
  productionBrowserSourceMaps: false,

  // Security headers — non-negotiable for a cybersecurity portfolio (AGENTS.md §Security)
  async headers() {
    const headers = [
      // Strict Content-Security-Policy
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          // next/font loads fonts from Google Fonts via inlined @font-face
          "font-src 'self' https://fonts.gstatic.com data:",
          // Next.js requires 'unsafe-inline' for styles in both dev and prod
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          // React dev mode requires 'unsafe-eval' for call-stack reconstruction; strip in prod
          isDev
            ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
            : "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
          "img-src 'self' data: blob:",
          "connect-src 'self' https://va.vercel-scripts.com",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "upgrade-insecure-requests",
        ].join("; "),
      },
      // HSTS — force HTTPS for 1 year, include subdomains
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
      // Prevent framing (clickjacking) — allow same-origin for internal embeds (e.g. /resume.pdf)
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      // Prevent MIME sniffing
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      // Control referrer info
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      // Permissions policy — disable features not used
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers,
      },
    ];
  },
};

export default nextConfig;
