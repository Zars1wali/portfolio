/**
 * lib/content.ts
 * Utilities for reading MDX/Markdown content from /content.
 * Uses gray-matter for frontmatter parsing (index pages)
 * and returns raw content strings for next-mdx-remote (detail pages).
 *
 * Frontmatter schema per AGENTS.md:
 *   title, summary, stack[], role, links{repo, live}, year, featured (bool)
 *   wip?: boolean  — extension: visually flags cards as "details coming soon"
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

/* ─── Types ──────────────────────────────────────────────────────────────── */

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  workflow?: string[];
  role: string;
  links?: {
    repo?: string;
    live?: string;
  };
  year: number;
  featured: boolean;
  /** Explicit display order index (1-based); lowest numbers appear first */
  order?: number;
  /** true = body is TODO; show "details coming soon" badge, do not fabricate copy */
  wip?: boolean;
  /** Optional cover image URL — when present, rendered as card background with glass+scrim treatment */
  image?: string;
}

export interface LabMeta {
  slug: string;
  title: string;
  summary: string;
  stack?: string[];
  year: number;
  featured?: boolean;
  wip?: boolean;
}

/* ─── Internal helpers ───────────────────────────────────────────────────── */

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(
      (f) =>
        (f.endsWith(".mdx") || f.endsWith(".md")) && !f.startsWith(".gitkeep")
    );
}

function readFrontmatter<T>(dir: string, file: string): T & { slug: string } {
  const slug = file.replace(/\.(mdx|md)$/, "");
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data } = matter(raw);
  return { slug, ...(data as T) };
}

function readContent<T>(
  dir: string,
  slug: string
): { meta: T & { slug: string }; content: string } {
  const extensions = [".mdx", ".md"];
  for (const ext of extensions) {
    const file = path.join(/*turbopackIgnore: true*/ dir, `${slug}${ext}`);
    if (fs.existsSync(/*turbopackIgnore: true*/ file)) {
      const raw = fs.readFileSync(/*turbopackIgnore: true*/ file, "utf8");
      const { data, content } = matter(raw);
      return { meta: { slug, ...(data as T) }, content };
    }
  }
  throw new Error(`Content not found: ${path.join(dir, slug)}`);
}

/* ─── Projects API ───────────────────────────────────────────────────────── */

export function getAllProjects(): ProjectMeta[] {
  const dir = path.join(contentRoot, "projects");
  return getMDXFiles(dir)
    .map((f) => readFrontmatter<ProjectMeta>(dir, f))
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return (b.year ?? 0) - (a.year ?? 0);
    });
}

export function getProjectSlugs(): string[] {
  const dir = path.join(contentRoot, "projects");
  return getMDXFiles(dir).map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getProjectContent(
  slug: string
): { meta: ProjectMeta; content: string } {
  return readContent<ProjectMeta>(
    path.join(contentRoot, "projects"),
    slug
  );
}

/* ─── Lab API ────────────────────────────────────────────────────────────── */

export function getAllLab(): LabMeta[] {
  const dir = path.join(contentRoot, "lab");
  return getMDXFiles(dir)
    .map((f) => readFrontmatter<LabMeta>(dir, f))
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

export function getLabSlugs(): string[] {
  const dir = path.join(contentRoot, "lab");
  return getMDXFiles(dir).map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getLabContent(
  slug: string
): { meta: LabMeta; content: string } {
  return readContent<LabMeta>(path.join(contentRoot, "lab"), slug);
}
