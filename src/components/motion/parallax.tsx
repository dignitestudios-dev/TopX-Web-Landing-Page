"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked vertical drift. Spring-smoothed so it tracks the scrollbar
 * without feeling glued to it — the small lag is most of what makes parallax
 * read as depth rather than as a moving div.
 */
export function Parallax({
  children,
  className,
  distance = 70,
}: {
  children: ReactNode;
  className?: string;
  /** Total travel in pixels across the element's full pass through the viewport. */
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smooth, [0, 1], [distance, -distance]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
