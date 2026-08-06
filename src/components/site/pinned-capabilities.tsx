"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

type Capability = { title: string; body: string };

const capabilities: Capability[] = [
  {
    title: "Topic pages",
    body: "Create a page about one subject, tag it with keywords so people can find it, and decide whether it's open to everyone or invite-only.",
  },
  {
    title: "Subscription pages",
    body: "Group the topics you follow into your own pages. A cycling page, a film page, a work page — each one shows only its own feed.",
  },
  {
    title: "Submissions",
    body: "Send a post to a topic you follow. Nothing goes public until the page owner approves it.",
  },
  {
    title: "Stories and live",
    body: "Post a story that clears after 24 hours, or go live on your topic page and talk to the people already there for the subject.",
  },
  {
    title: "Knowledge posts",
    body: "Reference cards with their own backgrounds, colours and fonts, sorted into categories on your profile.",
  },
  {
    title: "Expert status",
    body: "Apply with your credentials, or get voted up by the people who read you. Expertise attached to the subject you know.",
  },
  {
    title: "Reposts",
    body: "Carry a post over to your own topic page or story. The original page stays credited on it.",
  },
  {
    title: "Messaging",
    body: "Direct messages once you follow each other, group chats, and a requests list for everyone else.",
  },
];

/**
 * The capabilities move sideways as the section is scrolled through, with the
 * section pinned to the viewport. It suits this content specifically: these are
 * parallel, equally-weighted features, so a horizontal rail reads as a set
 * rather than implying the ranking a vertical list would.
 *
 * Below `lg` — and under reduced motion — it degrades to an ordinary grid,
 * because pinned horizontal scrolling on a phone fights the browser's own
 * gestures.
 */
export function PinnedCapabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Travel far enough to bring the last card fully into view.
  const x = useTransform(smooth, [0, 1], ["0%", "-72%"]);

  const heading = (
    <>
      <p className="eyebrow text-blaze-deep">What you get</p>
      <h2 className="mt-6 max-w-2xl font-display text-jumbo font-bold text-balance">
        Built for people who came for the subject.
      </h2>
    </>
  );

  const card = (item: Capability, i: number) => (
    <>
      <span className="font-mono text-xs text-blaze tabular-nums">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="mt-4 h-0.5 w-10 bg-blaze" />
      <h3 className="mt-6 font-display text-2xl leading-tight font-bold sm:text-3xl">
        {item.title}
      </h3>
      <p className="mt-4 leading-relaxed text-ash">{item.body}</p>
    </>
  );

  // Static grid for small screens and reduced motion.
  const fallback = (
    <section className="band border-b border-ink/10 lg:hidden">
      <div className="shell">
        {heading}
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {capabilities.map((item, i) => (
            <li key={item.title}>{card(item, i)}</li>
          ))}
        </ul>
      </div>
    </section>
  );

  if (reduced) {
    return (
      <section className="band border-b border-ink/10">
        <div className="shell">
          {heading}
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, i) => (
              <li key={item.title}>{card(item, i)}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <>
      {fallback}

      <section
        ref={ref}
        className="relative hidden border-b border-ink/10 lg:block"
        aria-label="What you get"
      >
        <div className="h-[280vh]">
          {/* Pinned below the 4.5rem sticky header, not at top-0, so the
              heading isn't covered by it. */}
          <div className="sticky top-18 flex h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden">
            <div className="shell">{heading}</div>

            <motion.ul style={{ x }} className="mt-14 flex gap-8 pl-14 will-change-transform">
              {capabilities.map((item, i) => (
                <li
                  key={item.title}
                  className="w-[22rem] shrink-0 border-t border-ink/15 pt-6"
                >
                  {card(item, i)}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
    </>
  );
}
