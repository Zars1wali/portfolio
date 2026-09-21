"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * SignalMesh — ambient SVG network overlay.
 * Positioned fixed behind all content (z-index: 0).
 * The gradient background lives on <html> in globals.css, not here.
 * prefers-reduced-motion: drift + pulse animations are disabled.
 * Mobile (<768px): animations are disabled via CSS media query.
 */
export default function SignalMesh() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(true);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = meshRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={meshRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        contain: "strict",
        isolation: "isolate",
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
          animation: reduced || !visible ? "none" : "signal-drift 22s ease-in-out infinite alternate",
        }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#56E8D0" />
            <stop offset="100%" stopColor="#8B7CF6" />
          </linearGradient>
        </defs>

        {/* Connection lines — cyan→violet gradient */}
        <g stroke="url(#lineGrad)" strokeWidth="0.6" opacity="0.5">
          <line x1="120" y1="140" x2="340" y2="260" />
          <line x1="340" y1="260" x2="560" y2="150" />
          <line x1="560" y1="150" x2="820" y2="300" />
          <line x1="820" y1="300" x2="1050" y2="180" />
          <line x1="200" y1="560" x2="420" y2="480" />
          <line x1="420" y1="480" x2="680" y2="600" />
          <line x1="680" y1="600" x2="920" y2="520" />
          <line x1="340" y1="260" x2="420" y2="480" />
          <line x1="560" y1="150" x2="680" y2="600" />
          <line x1="820" y1="300" x2="920" y2="520" />
        </g>

        {/* Top-row nodes — cyan */}
        <g fill="#56E8D0">
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite" }}        cx="120"  cy="140" r="3"   />
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite" }}        cx="340"  cy="260" r="2.4" />
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite" }}        cx="560"  cy="150" r="3.4" />
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite" }}        cx="820"  cy="300" r="2.4" />
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite" }}        cx="1050" cy="180" r="3"   />
        </g>

        {/* Bottom-row nodes — violet */}
        <g fill="#8B7CF6">
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite 1.3s" }}   cx="200"  cy="560" r="2.6" />
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite 1.3s" }}   cx="420"  cy="480" r="3.2" />
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite 1.3s" }}   cx="680"  cy="600" r="2.4" />
          <circle style={{ animation: reduced ? "none" : "signal-pulse 4s ease-in-out infinite 1.3s" }}   cx="920"  cy="520" r="3"   />
        </g>
      </svg>

      <style>{`
        @keyframes signal-drift {
          0%   { transform: translate(0, 0)       scale(1);    }
          100% { transform: translate(-14px, 10px) scale(1.02); }
        }
        @keyframes signal-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
        /* Static on mobile — no pointer to track, no need for motion */
        @media (max-width: 768px) {
          .signal-mesh-svg { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
