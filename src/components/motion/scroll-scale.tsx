"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked "unfold": the element starts small with heavy corner rounding
 * and resolves to full size and square corners as it reaches the viewport
 * centre. Used on the device mockups so they arrive rather than just appear.
 */
export function ScrollScale({
  children,
  className,
  from = 0.82,
}: {
  children: ReactNode;
  className?: string;
  /** Starting scale. Lower means a more dramatic unfold. */
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Runs from the element entering the viewport to it being centred.
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.35, 1]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ scale, opacity, borderRadius: radius }}
        className="origin-center overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
