# AGENTS.md — Portfolio Site Project Rules

## Project
Personal portfolio + project showcase for Umer ("zarss") — BS Cybersecurity student
at GIKI, Co-Founder/COO of Zero Point Intel (ZPI). Purpose: a self-hosted site
linked from CV/LinkedIn, showcasing shipped projects and a live coding/AI-usage
dashboard. Audience: recruiters and hiring managers for security/software roles.

## Stack (locked — do not substitute without asking)
- Framework: Next.js 15 (App Router), TypeScript
- Styling: Tailwind CSS
- Content: MDX for project write-ups and case studies (in /content)
- Dynamic data: Next.js API routes (no separate backend service)
- DB: none by default — add Postgres only if explicitly requested
- Hosting target: self-hosted VPS via Docker + Nginx + Certbot (not Vercel/Netlify)
- Analytics: self-hosted Plausible or Umami, added only in the infra phase

## Folder conventions
- /app            → routes (App Router)
- /components      → shared UI components
- /content/projects/<slug>.mdx  → one file per project
- /content/lab/<slug>.mdx       → coding/AI case studies
- /lib            → API clients (e.g. GitHub GraphQL fetcher), utils
- /public         → static assets, resume PDF
- /infra          → Dockerfile, docker-compose.yml, nginx.conf, deploy workflow

## Design direction
- Dark theme by default, high-contrast, monospace accents for a
  security/engineering feel — avoid generic SaaS-template look
  (no default shadcn purple gradients, no stock hero illustrations)
- Fast and static-first: prerender everything that isn't user-specific
- Mobile-responsive from the start, not bolted on later

## Content rules
- Never invent project details, metrics, or dates. If a project's copy is
  missing, leave a clearly marked `<!-- TODO: needs content -->` placeholder
  instead of fabricating specifics.
- MDX frontmatter schema for /content/projects/*.mdx:
  title, summary, stack[], role, links{repo, live}, year, featured (bool)
- Placeholder contact info below is a default — confirm before publishing:
  - GitHub: github.com/Zars1wali
  - Email: walizar34@gmail.com (personal) · umer.wali@zeropointintel.com (work)

## Security requirements (non-negotiable — this is a cybersecurity portfolio)
- No secrets, API keys, or .env values ever committed — use .env.example only
- All external API calls (e.g. GitHub API) go through a server-side route,
  never exposed client-side
- Nginx config must set: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- Dependabot/renovate config included by the infra phase

## Definition of done (per phase)
- `npm run build` passes with zero errors/warnings
- Lighthouse: Performance ≥90, Accessibility ≥95
- No console errors in browser on any route
- Agent must screenshot/verify the result in-browser before marking complete

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
