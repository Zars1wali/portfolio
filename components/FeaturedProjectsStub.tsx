import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/content";

/* The four homepage features, in display order (slugs match content/projects/*.mdx).
   Cards are rendered with the same ProjectCard component as the /projects page,
   so the look and behaviour are identical. */
const FEATURED_SLUGS = ["rabita-ai", "acreon", "polymarket-arbitrage-bot", "from-tribe"];

export default function FeaturedProjectsStub() {
  const all = getAllProjects();
  const featured = FEATURED_SLUGS.map((slug) =>
    all.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "96px 24px 64px",
        width: "100%",
      }}
    >
      <header style={{ marginBottom: "40px" }}>
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
          FEATURED
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          Featured Projects
        </h2>
        <p
          style={{
            color: "var(--color-mist)",
            fontSize: "15px",
            lineHeight: 1.6,
            maxWidth: "48ch",
          }}
        >
          Hand-picked highlights — the same cards as the full Projects page.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
