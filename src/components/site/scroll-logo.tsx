"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

/*
  The mark travels the length of the page, spinning as it goes.

  It's a spinning top struck through an X, so rotation isn't decoration here —
  it's the object doing the one thing that object does, and the scrollbar is
  what spins it.

  Two separate drivers, deliberately:

  - Spin and horizontal drift are scroll-linked, so they're continuous.
  - Size, vertical offset and opacity are *declared by the section currently
    under the mark*, via `data-logo-*` attributes. Sections know whether they
    have empty space beside their copy; scroll percentages don't, and they go
    stale the moment any section changes length.

  Implementation note: this uses motion's `useScroll` rather than CSS
  scroll-driven animations (`animation-timeline`). Those run off the main
  thread, but have no Firefox support at all and the recommended guidance is
  against the polyfill. Rather than ship two implementations for one decorative
  element, this uses the JS path everywhere and sticks to `transform`/`opacity`
  so the compositor still does the work.
*/

type LogoState = { opacity: number; scale: number; y: number };

const DEFAULT_STATE: LogoState = { opacity: 1, scale: 1, y: 0 };

function readState(el: Element): LogoState {
  const d = (el as HTMLElement).dataset;
  return {
    opacity: Number(d.logoOpacity ?? DEFAULT_STATE.opacity),
    scale: Number(d.logoScale ?? DEFAULT_STATE.scale),
    y: Number(d.logoY ?? DEFAULT_STATE.y),
  };
}

export function ScrollLogo() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [state, setState] = useState<LogoState>(DEFAULT_STATE);

  // Spring-smoothed so the mark trails the scroll slightly and reads as an
  // object with weight rather than something bolted to the scrollbar.
  const p = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0005,
  });

  // Three full turns across the page. Linear, so the spin rate reads as
  // directly coupled to scroll speed.
  const rotate = useTransform(p, [0, 1], [0, 1080]);
  // Gentle lateral drift, as a share of the mark's own width.
  const x = useTransform(p, [0, 0.5, 1], ["0%", "-14%", "6%"]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-logo-opacity]"));
    if (sections.length === 0) return;

    const visible = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }

        // The band is a thin strip across the viewport middle, so at most a
        // couple of sections qualify. Take the last in document order — the
        // one being scrolled into.
        const current = sections.filter((s) => visible.has(s)).pop();
        if (current) setState(readState(current));
      },
      // Only count a section once it occupies the vertical middle of the
      // screen, which is roughly where the mark sits.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  if (reduced) {
    // No travel, no spin — just the mark resting in the hero.
    return (
      <div className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center lg:flex lg:justify-end lg:pr-[6vw]">
        <Image
          src="/topx-logo.png"
          alt=""
          width={188}
          height={155}
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
      {/* Outer: continuous, scroll-linked spin and drift. */}
      <motion.div style={{ rotate, x }} className="will-change-transform">
        {/* Inner: discrete, section-declared size, offset and strength. */}
        <motion.div
          animate={{ opacity: state.opacity, scale: state.scale, y: `${state.y}vh` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/topx-logo.png"
            alt=""
            width={188}
            height={155}
            priority
            className="w-[58vw] max-w-[400px] lg:w-[28vw]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
