"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline read-position indicator along the bottom edge of the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-blaze"
    />
  );
}
