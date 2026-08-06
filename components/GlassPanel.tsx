"use client";

import { useRef, ReactNode } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Use wide=true for full-width content panels (About, Resume, etc.) */
  wide?: boolean;
  /** transparent=true strips all surface styling so the cosmic dust
      background shows through (used on the homepage hero). Keeps the
      entrance + 3D-tilt behavior. */
  transparent?: boolean;
}

export default function GlassPanel({ children, className = "", style, wide = false, transparent = false }: GlassPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isMobile || !panelRef.current) return;

    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

    // Apply the rotate transformation directly
    panelRef.current.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };

  // Reset transform on mouse leave
  const handleMouseLeave = () => {
    if (reducedMotion || isMobile || !panelRef.current) return;
    panelRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      style={{
        perspective: "1200px", // Required on a wrapper to create the 3D space
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`glass-panel ${transparent ? "glass-panel--transparent" : ""} ${className}`}
        style={{ width: wide ? "100%" : undefined, ...style }}
      >
        {children}
      </div>

      <style>{`
        .glass-panel {
          position: relative;
          z-index: 2;
          width: min(520px, 88vw); /* overridden by wide prop */
          padding: 44px 40px;
          background: var(--color-glass, rgba(255,255,255,0.05));
          border: 1px solid var(--color-glass-border, rgba(255,255,255,0.12));
          border-radius: var(--radius-glass, 20px);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 30px 60px -20px rgba(0,0,0,0.6),
            0 0 40px -10px rgba(86,232,208,0.15); /* cyan glow */
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out, box-shadow 0.3s ease;
          
          /* Entrance animation */
          opacity: 0;
          transform: translateY(24px);
          animation: rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Transparent variant — no boxed surface, no blur, no border or
           shadow. Lets the cosmic dust background show through fully. */
        .glass-panel--transparent {
          background: transparent;
          border: none;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .glass-panel {
            animation: none !important;
            opacity: 1;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
