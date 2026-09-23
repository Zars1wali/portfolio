"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CarouselProject {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  image: string;
  role: string;
}

const FEATURED: CarouselProject[] = [
  {
    slug: "rabita-ai",
    title: "Rabta AI",
    summary:
      "WhatsApp-native dual-agent AI commerce platform with zero-hallucination catalog grounding, Multimodal Intelligence (Gemini Vision + Deepgram Nova-3), and Human-in-the-Loop Responsible AI governance — deployed 24/7 for a licensed firearms dealership.",
    stack: [
      "Gemini 3.5 Flash Lite",
      "LangGraph",
      "ReACT",
      "Deepgram Nova-3",
      "Gemini Vision",
      "FastAPI",
      "Docker",
    ],
    image: "/images/whatsapp_card_cover.png",
    role: "AI Forward Deployed Engineer",
  },
  {
    slug: "acreon",
    title: "Acreon",
    summary:
      "Satellite-based supply-chain risk monitoring for food buyers — up to 8 weeks of lead time on crop stress, flooding, and vigor drops, built on Sentinel-2 imagery and SAR radar.",
    stack: ["Sentinel-2", "SAR Radar", "NDVI/NDRE", "Python", "Next.js"],
    image: "/images/crop_vigor_satellite.png",
    role: "Co-Founder & COO",
  },
  {
    slug: "polymarket-arbitrage-bot",
    title: "Polymarket HFT Arbitrage Bot",
    summary:
      "High-frequency prediction-market trading engine with sub-50μs tick-to-trade latency executing latency arb and dump hedge strategies on Polygon. Rebuilt from Python to C++20 after uncovering embedded spyware.",
    stack: [
      "C++20",
      "Boost.Asio",
      "libsecp256k1",
      "simdjson",
      "Polymarket CLOB",
      "EIP-712",
    ],
    image: "/images/polymarket_card_cover.svg",
    role: "Solo Developer",
  },
];

export default function HorizontalCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP horizontal scroll pinning (desktop only)
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    let ctx: { revert: () => void } | null = null;

    (async () => {
      const gsapMod = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      // Total cards including "See All" card
      const totalCards = FEATURED.length + 1;
      const scrollDistance = (totalCards - 1) * window.innerWidth;

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, container);
    })();

    return () => {
      ctx?.revert();
    };
  }, [isMobile]);

  // Mobile: vertical stacked cards
  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          padding: "0 20px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {FEATURED.map((project) => (
          <MobileCard key={project.slug} project={project} />
        ))}
        <SeeAllCard mobile />
      </div>
    );
  }

  // Desktop: horizontal pinned carousel
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: `${(FEATURED.length + 1) * 100}vw`,
          height: "100%",
          willChange: "transform",
        }}
      >
        {FEATURED.map((project, i) => (
          <DesktopCard key={project.slug} project={project} index={i} />
        ))}
        <SeeAllCard />
      </div>
    </div>
  );
}

function DesktopCard({
  project,
  index,
}: {
  project: CarouselProject;
  index: number;
}) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(40px, 6vw, 100px)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "clamp(32px, 4vw, 80px)",
          alignItems: "center",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {/* Left: Image */}
        <div
          style={{
            flex: "1 1 55%",
            position: "relative",
            aspectRatio: "16/10",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 25px 60px -15px rgba(0,0,0,0.6), 0 0 30px rgba(86,232,208,0.06)",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="55vw"
            style={{ objectFit: "cover" }}
            priority={index === 0}
          />
        </div>

        {/* Right: Text */}
        <div style={{ flex: "1 1 40%" }}>
          <div
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--color-violet)",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            {project.role}
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              color: "var(--color-fog)",
              marginBottom: "16px",
              fontFamily: "var(--font-display)",
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h2>
          <p
            style={{
              color: "var(--color-mist)",
              fontSize: "15px",
              lineHeight: 1.65,
              marginBottom: "24px",
              maxWidth: "48ch",
            }}
          >
            {project.summary}
          </p>

          {/* Stack chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "28px",
            }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "11px",
                  color: "rgba(224, 247, 250, 0.9)",
                  background: "rgba(0, 240, 255, 0.06)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(0, 240, 255, 0.18)",
                  textShadow: "0 0 8px rgba(0, 240, 255, 0.2)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--color-cyan)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 20px",
              borderRadius: "10px",
              border: "1px solid rgba(86,232,208,0.35)",
              background: "rgba(86,232,208,0.06)",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
          >
            Deep Dive
            <span style={{ fontSize: "16px" }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileCard({ project }: { project: CarouselProject }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      style={{
        display: "block",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
        overflow: "hidden",
        textDecoration: "none",
        transition: "border-color 0.2s",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/10",
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "10px",
            color: "var(--color-violet)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          {project.role}
        </div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--color-fog)",
            marginBottom: "8px",
            fontFamily: "var(--font-display)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.55,
            color: "var(--color-mist)",
          }}
        >
          {project.summary.slice(0, 120)}…
        </p>
      </div>
    </Link>
  );
}

function SeeAllCard({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <Link
        href="/projects"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid rgba(86,232,208,0.25)",
          background: "rgba(86,232,208,0.04)",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "14px",
          color: "var(--color-cyan)",
          fontWeight: 600,
          textDecoration: "none",
          gap: "8px",
        }}
      >
        See All Projects <span>→</span>
      </Link>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Link
        href="/projects"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          textDecoration: "none",
          padding: "48px",
          borderRadius: "20px",
          border: "1px solid rgba(86,232,208,0.2)",
          background: "rgba(86,232,208,0.03)",
          transition: "all 0.3s",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            color: "var(--color-fog)",
          }}
        >
          See All Projects
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "14px",
            color: "var(--color-cyan)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Explore the full catalog <span style={{ fontSize: "18px" }}>→</span>
        </span>
      </Link>
    </div>
  );
}
