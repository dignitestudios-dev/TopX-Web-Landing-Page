"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

import { PhoneFrame, type PhoneScreen } from "@/components/site/device-frames";

type Step = {
  screen: PhoneScreen;
  eyebrow: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    screen: { src: "/app/mobile-home.webp", alt: "The TopX home feed on iPhone" },
    eyebrow: "The feed",
    title: "Only the topics you subscribed to",
    body: "Stories along the top, posts underneath, and every one of them from a topic page you chose by name. Nothing arrives because an algorithm guessed you might tolerate it.",
  },
  {
    screen: { src: "/app/mobile-profile.webp", alt: "A TopX profile screen on iPhone" },
    eyebrow: "Your profile",
    title: "Interests you declared, pages you run",
    body: "Your interests sit on your profile as plain tags. Below them, your posts, the topic pages you own, and the ones you follow — all separated, because they're different things.",
  },
  {
    screen: { src: "/app/mobile-login.webp", alt: "The TopX sign-in screen on iPhone" },
    eyebrow: "Getting in",
    title: "Google, Apple, or an email address",
    body: "Sign in with an account you already have. No profile-building interview before you're allowed to look at anything.",
  },
];

/**
 * The site's long-form moment: the phone pins to the viewport while the copy
 * scrolls past it, and the screen swaps at each step.
 *
 * Under reduced motion this degrades to a plain stacked list — the phone
 * appears once per step instead of pinning, which keeps the same information
 * without the scroll hijack.
 */
export function StickyShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    // Split the scrollable run evenly between steps.
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActive((current) => (current === next ? current : next));
  });

  if (reduced) {
    return (
      <section className="band border-b border-ink/10">
        <div className="shell space-y-20">
          {steps.map((step) => (
            <div key={step.title} className="grid items-center gap-10 lg:grid-cols-2">
              <div className="mx-auto w-52 sm:w-56">
                <PhoneFrame screen={step.screen} />
              </div>
              <div>
                <p className="eyebrow text-blaze-deep">{step.eyebrow}</p>
                <h3 className="mt-5 font-display text-3xl font-bold">{step.title}</h3>
                <p className="mt-4 leading-relaxed text-ash">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative border-b border-ink/10"
      aria-label="The app"
    >
      {/* One viewport of scroll per step, plus a little breathing room. */}
      <div style={{ height: `${steps.length * 100 + 20}svh` }}>
        {/* Pinned *below* the sticky header (4.5rem) rather than at top-0, so
            the header never covers the top of the phone. Height is reduced by
            the same amount so the pinned block still fits exactly one screen.
            svh rather than vh so mobile browser chrome collapsing mid-scroll
            doesn't change the pin height. */}
        <div className="sticky top-18 flex h-[calc(100svh-4.5rem)] items-center overflow-hidden py-6 sm:py-10">
          <div className="shell grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
            {/* Phone. Screens are stacked and cross-faded in place. */}
            <div className="relative mx-auto w-32 shrink-0 sm:w-40 lg:order-2 lg:w-64">
              <div className="relative aspect-[393/852] w-full">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.screen.src}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      scale: active === i ? 1 : 0.94,
                      y: active === i ? 0 : 18,
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ pointerEvents: active === i ? "auto" : "none" }}
                  >
                    <PhoneFrame screen={step.screen} priority={i === 0} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Copy. Only the active step is shown, so the eye has one target. */}
            <div className="relative lg:order-1">
              <div className="flex gap-3" aria-hidden>
                {steps.map((step, i) => (
                  <span
                    key={step.title}
                    className={`h-0.5 flex-1 transition-colors duration-500 ${
                      i <= active ? "bg-blaze" : "bg-ink/15"
                    }`}
                  />
                ))}
              </div>

              <div className="relative mt-5 min-h-[13rem] sm:mt-8 sm:min-h-[14rem]">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      y: active === i ? 0 : 24,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ pointerEvents: active === i ? "auto" : "none" }}
                    aria-hidden={active !== i}
                  >
                    <p className="eyebrow text-blaze-deep">{step.eyebrow}</p>
                    <h3 className="mt-4 font-display text-2xl leading-tight font-bold text-balance sm:mt-5 sm:text-4xl lg:text-5xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-md leading-relaxed text-ash sm:mt-5 sm:text-lg">
                      {step.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
