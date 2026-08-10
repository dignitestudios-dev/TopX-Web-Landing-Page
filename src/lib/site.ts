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
  /** Opens in a new tab and is rendered as a plain anchor, not a Next link. */
  external?: boolean;
};

/** The referral site. The only outbound destination on the whole site. */
export const connectLink: NavItem = {
  href: "https://referral.my-topx.com/",
  label: "Connect",
  blurb: "Join the TopX referral programme",
  external: true,
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
    // The canonical legal documents live on the referral site, not here.
    heading: "Legal",
    items: [
      {
        href: "https://referral.my-topx.com/PrivacyPolicy",
        label: "Privacy policy",
        blurb: "How we handle your data",
        external: true,
      },
      {
        href: "https://referral.my-topx.com/Terms",
        label: "Terms of service",
        blurb: "The rules of the platform",
        external: true,
      },
      {
        href: "/child-safety-policy",
        label: "Child safety policy",
        blurb: "How we protect minors on the platform",
      },
    ],
  },
];
