"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/*
  The mark travels the length of the page, spinning as it goes.

  It's a spinning top struck through an X, so rotation isn't decoration here —
  it's the object doing the one thing that object does, and the scrollbar is
  what spins it.

  Implementation note: this uses motion's `useScroll` rather than CSS
  scroll-driven animations (`animation-timeline`). Those run off the main
  thread, but have no Firefox support at all and the recommended guidance is
  against the polyfill. Rather than ship two implementations for one decorative
  element, this uses the JS path everywhere and sticks to `transform`/`opacity`
  so the compositor still does the work.
*/

/** Scroll checkpoints, roughly matching the home page's section boundaries. */
const STOPS = [0, 0.14, 0.34, 0.56, 0.78, 1];

export function ScrollLogo() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Spring-smoothed so the mark trails the scroll slightly and reads as an
  // object with weight rather than something bolted to the scrollbar.
  const p = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0005,
  });

  // Large in the hero, then small and watermark-like while the copy does the
  // work, swelling again over the quieter full-bleed sections.
  const scale = useTransform(p, STOPS, [1, 0.5, 0.34, 0.62, 0.3, 0.58]);
  const y = useTransform(p, STOPS, ["0vh", "24vh", "-16vh", "18vh", "-20vh", "12vh"]);
  const x = useTransform(p, STOPS, ["0%", "-30%", "34%", "-24%", "30%", "-10%"]);

  // Three full turns across the page. Linear, so the spin rate reads as
  // directly coupled to scroll speed.
  const rotate = useTransform(p, [0, 1], [0, 1080]);

  // Full strength only in the hero, where it sits in its own column. After
  // that it drops to a watermark so it can pass over text without competing.
  const opacity = useTransform(p, [0, 0.06, 0.12], [1, 1, 0.13]);

  if (reduced) {
    // No travel, no spin — just the mark resting in the hero.
    return (
      <div className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center lg:flex lg:justify-end lg:pr-[6vw]">
        <Image
          src="/topx-logo.png"
          alt=""
          width={626}
          height={517}
          priority
          className="w-[26vw] max-w-[380px]"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center lg:justify-end lg:pr-[8vw]"
    >
      <motion.div style={{ scale, x, y, rotate, opacity }} className="will-change-transform">
        <Image
          src="/topx-logo.png"
          alt=""
          width={626}
          height={517}
          priority
          className="w-[58vw] max-w-[400px] lg:w-[28vw]"
        />
      </motion.div>
    </div>
  );
}
