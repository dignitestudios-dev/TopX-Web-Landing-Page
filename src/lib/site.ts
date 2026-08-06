/**
 * Single source of truth for navigation and shared site copy.
 * Pages read from here so the header, footer and sitemap can never drift apart.
 *
 * The site is informational only — there are no forms, sign-ups or other user
 * actions anywhere on it, by the client's instruction.
 */

export const site = {
  name: "TopX",
  tagline: "Follow topics, not people.",
  description:
    "TopX is a topic-centric social platform. You subscribe to topics instead of personalities, sort them into your own subscription pages, and decide exactly how much of the conversation you see.",
  url: "https://topx.app",
} as const;

export type NavItem = {
  href: string;
  label: string;
  blurb: string;
};

export const primaryNav: NavItem[] = [
  {
    href: "/features",
    label: "Features",
    blurb: "Topic pages, subscriptions, stories, live and messaging",
  },
  {
    href: "/how-it-works",
    label: "How it works",
    blurb: "Follow, organise, engage",
  },
  {
    href: "/about",
    label: "About",
    blurb: "Why we rebuilt the feed around subject matter",
  },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Product",
    items: [primaryNav[0], primaryNav[1]],
  },
  {
    heading: "Company",
    items: [primaryNav[2]],
  },
  {
    heading: "Legal",
    items: [
      { href: "/privacy", label: "Privacy policy", blurb: "How we handle your data" },
      { href: "/terms", label: "Terms of service", blurb: "The rules of the platform" },
    ],
  },
];
