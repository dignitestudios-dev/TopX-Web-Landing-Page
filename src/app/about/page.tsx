import type { Metadata } from "next";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { PhoneFrame } from "@/components/site/device-frames";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why TopX rebuilt the social feed around subject matter instead of personalities, and the principles the platform is designed to hold to.",
};

const principles = [
  {
    name: "The subject is the unit",
    body: "Every structure on TopX hangs off a topic page. Feeds, permissions, moderation and discovery all resolve to a subject rather than an account.",
  },
  {
    name: "You do the sorting",
    body: "Subscription pages exist because you know how your interests divide better than a ranking model does. The platform's job is to keep them where you put them.",
  },
  {
    name: "Curation beats volume",
    body: "Submissions wait for an owner's approval. That's slower than open posting, and it's the point — a page is worth following because someone is standing behind what's on it.",
  },
  {
    name: "Expertise should be legible",
    body: "Expert status is earned through review or through the judgement of people reading the subject. Either way it's attached to the topic, not to a follower count.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            We rebuilt the feed around{" "}
            <span className="text-blaze">subject matter</span>.
          </>
        }
        lede="Social platforms ask you to follow people and then spend enormous effort guessing which parts of what those people post you actually wanted. TopX skips the guessing."
      />

      <section className="band border-b border-ink/10">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <Reveal>
            <h2 className="font-display text-jumbo font-bold text-balance">
              The problem is the follow.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Following a person is a bet that everything they go on to post
                will interest you. It almost never holds. You follow someone for
                one thing, and over time the feed fills with the rest of their
                life.
              </p>
              <p>
                Platforms answer that with ranking — an algorithm sifting a
                stream you assembled badly in the first place. It works well
                enough to keep you scrolling and badly enough that you rarely
                find what you came for.
              </p>
              <p>
                TopX changes the thing you follow. Subscribe to a subject and
                the feed is coherent by construction. No model has to infer your
                intent, because you stated it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band border-b border-ink/10 bg-ink text-bone">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-blaze">Principles</p>
            <h2 className="mt-6 max-w-2xl font-display text-jumbo font-bold text-balance">
              What we&apos;re building to.
            </h2>
          </Reveal>

          <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {principles.map((item, i) => (
              <Reveal as="li" key={item.name} delay={i * 0.05}>
                <div className="h-0.5 w-10 bg-blaze" />
                <h3 className="mt-5 font-display text-2xl font-bold">{item.name}</h3>
                <p className="mt-3 leading-relaxed text-bone/70">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="band overflow-hidden border-b border-ink/10">
        <div className="shell">
          <p className="eyebrow text-blaze-deep">The result</p>
          <SplitWords
            as="h2"
            text="A profile that lists subjects, not a personal brand."
            className="mt-6 block max-w-3xl font-display text-jumbo font-bold text-balance"
          />
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
            <Parallax className="mx-auto w-52 sm:w-64" distance={30}>
              <PhoneFrame
                screen={{
                  src: "/app/mobile-profile.webp",
                  alt: "A TopX profile on iPhone showing declared interests as tags above the user's posts",
                }}
              />
            </Parallax>
            <Reveal delay={0.1}>
              <p className="max-w-lg text-lg leading-relaxed text-ash">
                Interests are listed plainly — Opinions, History, Basketball,
                Makeup — and the tabs below separate what you posted, the pages
                you run, and the pages you follow. Three different things, kept
                apart, because conflating them is how feeds got confusing in the
                first place.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
