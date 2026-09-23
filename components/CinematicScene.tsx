"use client";

import type { ReactNode, CSSProperties } from "react";

interface CinematicSceneProps {
  id: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** If true, the scene uses min-height instead of fixed height for content overflow */
  flexible?: boolean;
}

/**
 * Full-viewport scene wrapper for the cinematic scroll.
 * Each scene occupies 100vh (or min-height: 100vh if flexible),
 * centered via flexbox, with a unique ID for GSAP ScrollTrigger targeting.
 */
export default function CinematicScene({
  id,
  children,
  className = "",
  style,
  flexible = false,
}: CinematicSceneProps) {
  return (
    <section
      id={id}
      className={`cinematic-scene ${className}`}
      style={{
        position: "relative",
        width: "100%",
        ...(flexible
          ? { minHeight: "100vh" }
          : { height: "100vh" }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
