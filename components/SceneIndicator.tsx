"use client";

import { useState, useEffect, useCallback } from "react";
import { scrollToScene } from "@/lib/useGsapScrollTrigger";

const SCENES = [
  { id: "scene-hero", label: "Hero" },
  { id: "scene-work", label: "Work" },
  { id: "scene-about", label: "About" },
  { id: "scene-skills", label: "Skills" },
  { id: "scene-contact", label: "Contact" },
];

/**
 * Floating dot-based scene indicator along the right edge.
 * Active dot glows and expands. Clicking scrolls to the target scene.
 * Only renders on the homepage.
 */
export default function SceneIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Simple heuristic: which scene's top is closest to the current scroll
      let closest = 0;
      let closestDist = Infinity;

      SCENES.forEach((scene, i) => {
        const el = document.getElementById(scene.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback((id: string) => {
    scrollToScene(`#${id}`, 1);
  }, []);

  return (
    <>
      <nav
        aria-label="Scene navigation"
        style={{
          position: "fixed",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          alignItems: "center",
        }}
      >
        {SCENES.map((scene, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={scene.id}
              onClick={() => handleClick(scene.id)}
              aria-label={`Go to ${scene.label}`}
              aria-current={isActive ? "true" : undefined}
              style={{
                width: isActive ? "12px" : "8px",
                height: isActive ? "12px" : "8px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                background: isActive
                  ? "var(--color-cyan)"
                  : "rgba(255,255,255,0.25)",
                boxShadow: isActive
                  ? "0 0 12px var(--color-cyan), 0 0 24px rgba(86,232,208,0.3)"
                  : "none",
                padding: 0,
                position: "relative",
              }}
            >
              {/* Tooltip on hover */}
              <span
                className="scene-indicator-tooltip"
                style={{
                  position: "absolute",
                  right: "calc(100% + 12px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: isActive ? "var(--color-cyan)" : "var(--color-mist)",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  pointerEvents: "none",
                }}
              >
                {scene.label}
              </span>
            </button>
          );
        })}
      </nav>

      <style>{`
        .scene-indicator-tooltip { opacity: 0; }
        button:hover .scene-indicator-tooltip { opacity: 1 !important; }

        @media (max-width: 768px) {
          nav[aria-label="Scene navigation"] {
            right: 12px !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </>
  );
}
