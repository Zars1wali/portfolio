"use client";

import { useEffect, useRef, useState } from "react";

interface CounterAnimationProps {
  /** Target number to count to */
  target: number;
  /** Duration in ms (default 2000) */
  duration?: number;
  /** Suffix appended after the number (e.g., "+", "μs", "%") */
  suffix?: string;
  /** Prefix before the number (e.g., "<", "~") */
  prefix?: string;
  /** CSS class for styling */
  className?: string;
}

/**
 * Animated number counter that counts from 0 to target when scrolled into view.
 * Uses IntersectionObserver + requestAnimationFrame for smooth 60fps counting.
 */
export default function CounterAnimation({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic for natural deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
