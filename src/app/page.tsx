import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { ScrollScale } from "@/components/motion/scroll-scale";
import { SplitWords } from "@/components/motion/split-words";
import { LaptopFrame } from "@/components/site/device-frames";
import { PinnedCapabilities } from "@/components/site/pinned-capabilities";
import { ScrollLogo } from "@/components/site/scroll-logo";
import { StickyShowcase } from "@/components/site/sticky-showcase";
import { TopicMarquee } from "@/components/site/topic-marquee";

const commentModes = [
  { name: "All comments", detail: "Everything, unfiltered." },
  { name: "No comments", detail: "Just the posts. Nothing underneath." },
  { name: "Elevated and liked", detail: "Only what the page owner pinned or liked." },
  { name: "Highly liked", detail: "Only comments past a like threshold you set." },
];

export default function HomePage() {
  return (
    <>
      {/* The mark that travels and spins the length of the page. */}
      <ScrollLogo />

      {/* Hero. */}
      <section className="relative overflow-hidden">
        <div className="shell relative grid items-center gap-14 pt-14 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-28">
          <div className="relative z-10">
            <Reveal>
              <p className="eyebrow text-blaze-deep">Topic-centric social</p>
            </Reveal>

            <h1 className="mt-6 font-display text-mega font-extrabold text-balance">
              <SplitWords text="Follow topics," as="span" className="block" />
              <span className="block">
                <SplitWords text="not" as="span" delay={0.12} />{" "}
                <span className="text-blaze">
                  <SplitWords text="people." as="span" delay={0.18} />
                </span>
              </span>
            </h1>

            <Reveal delay={0.35}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ash sm:text-xl">
                Your feed is built from subjects you picked. Subscribe to a topic,
                file it into a page of your own, and set exactly how much of the
                conversation you want to see.
              </p>
            </Reveal>
          </div>

          {/* Empty on purpose: reserves the space the travelling mark occupies
              at scroll position zero. Fixed elements don't take up layout, so
              without this the hero copy would sit under it on mobile. */}
          <div className="h-[16rem] sm:h-[20rem] lg:h-[32rem]" aria-hidden />
        </div>
      </section>

      <TopicMarquee />

      {/* The contrast that justifies the product. */}
      <section className="band border-b border-ink/10">
        <div className="shell">
          <SplitWords
            as="h2"
            text="Most feeds sort by who posted. TopX sorts by what it's about."
            className="block max-w-4xl font-display text-jumbo font-bold text-balance"
          />

          <div className="mt-16 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-2">
            <Reveal className="bg-bone p-8 sm:p-12">
              <p className="eyebrow text-ash">The usual way</p>
              <p className="mt-6 font-display text-3xl leading-tight font-bold">
                You follow a person, and inherit everything they post.
              </p>
              <p className="mt-5 leading-relaxed text-ash">
                Someone you followed for their photography starts posting about
                politics. You either take it or lose the photography. The feed
                mixes every interest you have into one stream, then asks an
                algorithm to guess what you meant.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="bg-ink p-8 text-bone sm:p-12">
              <p className="eyebrow text-blaze">The TopX way</p>
              <p className="mt-6 font-display text-3xl leading-tight font-bold">
                You follow a subject, and get only that subject.
              </p>
              <p className="mt-5 leading-relaxed text-bone/70">
                Subscribe to the topics you actually want. Sort them into
                separate pages so cycling never lands in the middle of work. The
                people posting can change; what the page is about doesn&apos;t.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pinned phone walkthrough. */}
      <StickyShowcase />

      {/* The web app, drifting on scroll. */}
      <section className="band-tight overflow-hidden border-b border-ink/10 bg-ink text-bone">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-blaze">On the web too</p>
              <SplitWords
                as="h2"
                text="The same feed, with room to spread out."
                className="mt-6 block max-w-2xl font-display text-jumbo font-bold text-balance"
              />
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm leading-relaxed text-bone/70">
                Subscriptions down the left, the feed in the middle, trending
                and suggestions on the right. Nothing hidden behind a menu.
              </p>
            </Reveal>
          </div>

          <ScrollScale className="mt-12 sm:mt-16" from={0.84}>
            <Parallax distance={30}>
              <LaptopFrame
                src="/app/web-home.webp"
                alt="The TopX web app showing the home feed, with subscriptions on the left and trending pages on the right"
              />
            </Parallax>
          </ScrollScale>
        </div>
      </section>

      {/* Capabilities, on a horizontal rail that advances with the scroll. */}
      <PinnedCapabilities />

      {/* Comment control — the detail no other platform offers this granularly. */}
      <section className="grain relative band bg-blaze text-white">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow text-white/70">Comment control</p>
            <h2 className="mt-6 font-display text-jumbo font-bold text-balance">
              Decide how loud the room is.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
              Every topic you follow gets its own comment setting inside your
              subscription page. The same post can be a quiet read in one place
              and a full discussion in another.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="divide-y divide-white/25 border-y border-white/25">
              {commentModes.map((mode) => (
                <li
                  key={mode.name}
                  className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-6"
                >
                  <span className="font-display text-2xl font-bold">{mode.name}</span>
                  <span className="text-white/75">{mode.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/70">
              Comments you&apos;ve liked yourself always stay visible, even in the
              settings that hide the rest.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
