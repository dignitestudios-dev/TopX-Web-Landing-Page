import type { Metadata } from "next";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { LaptopFrame } from "@/components/site/device-frames";
import { PageHero } from "@/components/site/page-hero";
import { LazyTopicOrbit } from "@/components/three/lazy-scenes";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Topic pages, subscription pages, submissions, stories, live streams, knowledge posts and messaging — everything MyTopX gives you to follow a subject properly.",
};

const groups = [
  {
    heading: "Topic pages",
    lede: "A page about one subject, run by whoever cares enough to run it.",
    items: [
      {
        name: "Keywords and discovery",
        body: "Tag your page so it turns up when someone searches the subject. Keywords sit on the page profile and sort it into the right corner of the platform.",
      },
      {
        name: "Public or private",
        body: "Open the page to anyone, or keep it to people you approve. You can change your mind later without losing subscribers.",
      },
      {
        name: "Elevated posts",
        body: "Pin the post that matters for a day, a week, a month, or until you change it. It stays at the top of the page while everything else moves.",
      },
    ],
  },
  {
    heading: "Your feed",
    lede: "The topics you follow, filed the way you'd file them yourself.",
    items: [
      {
        name: "Subscription pages",
        body: "Every topic you follow goes into a subscription page you choose. Each page shows only its own topics, so one interest never crowds out another.",
      },
      {
        name: "Favourites",
        body: "Save someone else's subscription page as a shortcut. If a person has curated a corner of the platform well, you can read their version of it.",
      },
      {
        name: "Recommendations and trending",
        body: "See topics close to what you already read, and the pages the rest of the platform is active in right now.",
      },
    ],
  },
  {
    heading: "Posting",
    lede: "Publish to your own page, or send work to someone else's.",
    items: [
      {
        name: "Every format",
        body: "Images, text, video and audio, published to the page and out to everyone subscribed to it.",
      },
      {
        name: "Submissions and approval",
        body: "Send a post to a topic you follow. The owner reviews it, and it only goes public once they approve — so the page stays what it says it is.",
      },
      {
        name: "Knowledge posts",
        body: "Reference cards with their own backgrounds, colours and fonts, sorted into categories on your profile. Built for the material a topic keeps needing, not the material that scrolls past.",
      },
      {
        name: "Reposts",
        body: "Carry a post over to your own topic page or your story. The original page stays credited on the repost.",
      },
    ],
  },
  {
    heading: "Conversation",
    lede: "The discussion, tuned to how much of it you actually want.",
    items: [
      {
        name: "Four comment settings",
        body: "All comments, no comments, only what the owner elevated or liked, or only comments past a like threshold. Set it per topic, inside each subscription page.",
      },
      {
        name: "Comments you liked",
        body: "Like a comment and it stays in your feed for that topic, even when your settings hide everything around it.",
      },
      {
        name: "Reactions",
        body: "React to posts and comments with more than a like when a like isn't the right answer.",
      },
      {
        name: "Hide what you don't want",
        body: "Hide individual comments inside your own subscription pages. Your filter, your copy of the feed.",
      },
    ],
  },
  {
    heading: "Live and temporary",
    lede: "For the parts of a subject that don't keep.",
    items: [
      {
        name: "Stories",
        body: "Post to a story that clears itself after 24 hours, and send it straight into a chat if it's meant for a few people rather than everyone.",
      },
      {
        name: "Live streaming",
        body: "Go live on your topic page and talk to the people who are already there for the subject.",
      },
    ],
  },
  {
    heading: "Messaging",
    lede: "Private conversation, with the door under your control.",
    items: [
      {
        name: "Direct messages",
        body: "One-to-one chat with text, images, video and links, open once you both follow each other.",
      },
      {
        name: "Group chats",
        body: "Invite people into a shared conversation. Leave or mute it whenever you want to step back.",
      },
      {
        name: "Message requests",
        body: "Anyone outside your approvals lands in a requests list first. Read it, then accept or decline before a conversation starts.",
      },
    ],
  },
  {
    heading: "Safety and privacy",
    lede: "Controls that work at the level the problem happens.",
    items: [
      {
        name: "Layered blocking",
        body: "Stop someone commenting but let them read, block them from a topic page entirely, or block them from your profile and every page you run.",
      },
      {
        name: "Private profiles and pages",
        body: "Make a profile or a page private, which also closes it to messages from people you don't know.",
      },
      {
        name: "Reporting",
        body: "Report a post and it goes to review with an “Under review” banner on it, so everyone can see it's being looked at rather than quietly deleted.",
      },
      {
        name: "Your archive",
        body: "Every post you've made on any topic page, in one place, filterable by date.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Everything you need to follow a subject{" "}
            <span className="text-blaze">properly</span>.
          </>
        }
        lede="MyTopX is built around one unit: the topic page. Everything else — your feed, the conversation, the private side — hangs off it."
      />

      <section className="border-b border-ink/10 bg-ink text-bone">
        <div className="shell grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <p className="eyebrow text-blaze">The unit</p>
            <h2 className="mt-6 font-display text-4xl leading-tight font-bold text-balance sm:text-5xl">
              One topic, the pages that subscribe to it, and the people reading.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-bone/70">
              A topic page sits at the centre. Subscription pages pull from it.
              Readers set their own terms on each one. Nothing in that chain
              depends on who happens to be posting today.
            </p>
          </Reveal>
          <div className="relative h-72 sm:h-96">
            <LazyTopicOrbit className="absolute inset-0" accent="bone" />
          </div>
        </div>
      </section>

      {groups.map((group, groupIndex) => (
        <section
          key={group.heading}
          className="border-b border-ink/10 py-16 lg:py-24"
        >
          <div className="shell grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight font-bold sm:text-4xl">
                {group.heading}
              </h2>
              <p className="mt-4 text-ash">{group.lede}</p>
            </Reveal>

            <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {group.items.map((item, i) => (
                <Reveal as="li" key={item.name} delay={i * 0.05}>
                  <div
                    className={`h-0.5 w-8 ${
                      groupIndex % 2 === 0 ? "bg-blaze" : "bg-blaze-amber"
                    }`}
                  />
                  <h3 className="mt-4 font-display text-xl font-bold">{item.name}</h3>
                  <p className="mt-2 leading-relaxed text-ash">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* The web client, shown rather than described. */}
      <section className="band-tight overflow-hidden bg-ink text-bone">
        <div className="shell">
          <p className="eyebrow text-blaze">On the web</p>
          <SplitWords
            as="h2"
            text="Everything above, with room to spread out."
            className="mt-6 block max-w-2xl font-display text-jumbo font-bold text-balance"
          />
          <Parallax className="mt-16" distance={40}>
            <LaptopFrame
              src="/app/web-trending.webp"
              alt="The MyTopX web app showing trending topic pages and suggestions based on your interests"
            />
          </Parallax>
        </div>
      </section>
    </>
  );
}
