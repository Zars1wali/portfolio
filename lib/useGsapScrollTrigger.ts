"use client";

import { useEffect, useRef } from "react";

let gsapRegistered = false;

/**
 * Custom hook that initialises GSAP ScrollTrigger and ScrollToPlugin once,
 * and provides a safe ref-based cleanup pattern for scroll-triggered animations.
 *
 * Usage:
 *   const containerRef = useGsapScrollTrigger((gsap, ScrollTrigger) => {
 *     // build your timeline / ScrollTrigger here
 *   });
 *   return <div ref={containerRef}>…</div>;
 */
export function useGsapScrollTrigger(
  setup: (
    gsap: typeof import("gsap").default,
    ScrollTrigger: typeof import("gsap/ScrollTrigger").default
  ) => (() => void) | void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup: (() => void) | void;

    (async () => {
      const gsapMod = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");

      const gsap = gsapMod.default;

      if (!gsapRegistered) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        gsapRegistered = true;
      }

      cleanup = setup(gsap, ScrollTrigger);
    })();

    return () => {
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Scroll-to utility — smoothly scrolls to a target element or position.
 * Must be called after GSAP is loaded.
 */
export async function scrollToScene(target: string | number, duration = 1) {
  if (typeof window === "undefined") return;
  const gsapMod = await import("gsap");
  gsapMod.default.to(window, {
    scrollTo: target,
    duration,
    ease: "power2.inOut",
  });
}
