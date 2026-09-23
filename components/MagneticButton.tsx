"use client";

import { useRef, useCallback, type ReactNode, type CSSProperties } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Max pixel offset the element shifts toward cursor (default 8) */
  strength?: number;
}

/**
 * Wraps interactive elements with a magnetic cursor attraction effect.
 * On mousemove the wrapper div subtly shifts toward the cursor.
 * On mouseleave it springs back. Disabled on touch devices.
 */
export default function MagneticButton({
  children,
  className = "",
  style,
  strength = 8,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      // Disable on touch devices
      if ("ontouchstart" in window) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = ((e.clientX - cx) / (rect.width / 2)) * strength;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * strength;

      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
        display: "inline-block",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
