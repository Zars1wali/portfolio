import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Shipped projects by zarss — security engineering, software, and AI tooling.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "80px 24px 64px",
        width: "100%",
      }}
    >
      {/* ── Header ── */}
      <header style={{ marginBottom: "48px" }}>
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "var(--color-cyan)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--color-cyan)",
              boxShadow: "0 0 8px var(--color-cyan)",
              display: "block",
            }}
          />
          PROJECTS
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          Shipped Work
        </h1>
        <p
          style={{
            color: "var(--color-mist)",
            fontSize: "15px",
            lineHeight: 1.6,
            maxWidth: "48ch",
          }}
        >
          A selection of projects in security, software, and AI. Full
          write-ups added as they&apos;re ready.
        </p>
      </header>

      {/* ── Grid ── */}
      {projects.length === 0 ? (
        <p
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "13px",
            color: "var(--color-mist)",
          }}
        >
          {/* TODO: projects appear here once content/projects/*.mdx files are added */}
          No projects yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
