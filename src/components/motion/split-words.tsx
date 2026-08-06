"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentType, ReactNode } from "react";

/** Tags this is allowed to render as — keeps the children typing concrete. */
type Tags = "span" | "p" | "h1" | "h2" | "h3";

/**
 * Headline reveal: each word rides up from behind a clipping mask, staggered.
 *
 * This is the site's primary "arrival" gesture — it echoes the hero's sorting
 * scene, where things resolve into place rather than fading in. Words are the
 * unit rather than characters, because character-level staggers on a display
 * face this large read as gimmick and wreck screen-reader output.
 */
export function SplitWords({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  as?: Tags;
  delay?: number;
  stagger?: number;
}) {
  // A union of intrinsic tags collapses their prop types to `never`, so narrow
  // to the only two props this component actually passes down.
  const Tag = as as unknown as ComponentType<{
    className?: string;
    children?: ReactNode;
  }>;

  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {/* The whole string stays available to assistive tech as one label. */}
      <span className="sr-only">{text}</span>

      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          shown: { transition: { delayChildren: delay, staggerChildren: stagger } },
        }}
      >
        {words.map((word, i) => (
          // The separating space must be a real text node *outside* the masked
          // span. Left inside the inline-block it counts as trailing
          // whitespace, gets trimmed, and every word runs into the next one.
          <span key={`${word}-${i}`}>
            <span
              // The mask is what makes it read as a reveal rather than a slide.
              className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "115%", opacity: 0 },
                  shown: {
                    y: "0%",
                    opacity: 1,
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
