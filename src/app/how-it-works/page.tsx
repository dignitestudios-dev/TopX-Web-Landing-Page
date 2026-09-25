import type { Metadata } from "next";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { PhoneFrame } from "@/components/site/device-frames";
import { PageHero } from "@/components/site/page-hero";
import { LazyTopicOrbit } from "@/components/three/lazy-scenes";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Find topics, file them into subscription pages, set how much of the conversation you see, then post or submit. Four steps from signup to a feed that's actually yours.",
};

/*
  This page is the one place on the site where numbered markers are honest:
  the four steps genuinely happen in order, and step three only makes sense
  once step two exists.
*/
const steps = [
  {
    title: "Find the topics",
    body: "Search the subject you care about, or start from recommendations and what's trending. Every topic page carries keywords, so what you find is what it says it is.",
    detail: "If the page you want doesn't exist yet, make it. Naming a topic is how you start one.",
  },
  {
    title: "File them into pages",
    body: "When you follow a topic, you put it in a subscription page — an existing one or a new one. That page becomes a feed of only those topics.",
    detail: "Cycling in one page, work in another. They never mix, because you didn't put them together.",
  },
  {
    title: "Set your terms",
    body: "Each topic inside a subscription page gets its own comment setting: all of them, none of them, only what the owner elevated, or only what cleared a like threshold.",
    detail: "The same topic can be quiet in one of your pages and loud in another.",
  },
  {
    title: "Post, submit, or just read",
    body: "Publish to a page you run, send a submission to a page you follow and wait for the owner's approval, or read and never post at all.",
    detail: "Reading without posting is a first-class way to use MyTopX, not a lesser one.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            Four steps to a feed that&apos;s{" "}
            <span className="text-blaze">actually yours</span>.
          </>
        }
        lede="No algorithm guessing at your interests. You name the subjects, you sort them, and you set how much of the conversation comes with them."
      />

      <section className="border-b border-ink/10">
        <div className="shell">
          <ol>
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-6 border-b border-ink/10 py-14 last:border-b-0 lg:grid-cols-[auto_1fr_1fr] lg:gap-16 lg:py-20"
              >
                <Reveal>
                  <span
                    className="font-mono text-sm text-blaze tabular-nums"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Reveal>

                <Reveal delay={0.05}>
                  <h2 className="font-display text-3xl leading-tight font-bold text-balance sm:text-4xl">
                    {step.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="text-lg leading-relaxed">{step.body}</p>
                  <p className="mt-5 border-l-2 border-blaze-amber pl-5 text-ash">
                    {step.detail}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-ink text-bone">
        <div className="shell grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="relative order-2 h-72 sm:h-96 lg:order-1">
            <LazyTopicOrbit className="absolute inset-0" accent="blaze" />
          </div>
          <Reveal className="order-1 lg:order-2">
            <p className="eyebrow text-blaze">What changes</p>
            <h2 className="mt-6 font-display text-4xl leading-tight font-bold text-balance sm:text-5xl">
              The people posting can change. The subject doesn&apos;t.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-bone/70">
              That&apos;s the whole difference. On a person-centric feed, one
              account changing direction changes what you see. Here, a topic
              page is about its topic — whoever is posting to it this month.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The two ends of the flow, side by side and offset on scroll. */}
      <section className="band overflow-hidden border-b border-ink/10">
        <div className="shell">
          <p className="eyebrow text-blaze-deep">In the app</p>
          <SplitWords
            as="h2"
            text="Sign in, then straight into the subjects."
            className="mt-6 block max-w-2xl font-display text-jumbo font-bold text-balance"
          />

          <div className="mt-16 grid grid-cols-2 gap-6 sm:gap-12 lg:mx-auto lg:max-w-3xl">
            <Parallax distance={30}>
              <PhoneFrame
                screen={{
                  src: "/app/mobile-login.webp",
                  alt: "The MyTopX sign-in screen on iPhone",
                }}
              />
            </Parallax>
            <Parallax distance={-30} className="mt-10 sm:mt-16">
              <PhoneFrame
                screen={{
                  src: "/app/mobile-home.webp",
                  alt: "The MyTopX home feed on iPhone, showing stories and posts from subscribed topic pages",
                }}
              />
            </Parallax>
          </div>
        </div>
      </section>
    </>
  );
}
