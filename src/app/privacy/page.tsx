import type { Metadata } from "next";

import { LegalDocument, type LegalSection } from "@/components/site/legal-document";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What MyTopX collects, why, who can see it, and the controls you have over your data.",
};

const sections: LegalSection[] = [
  {
    heading: "Information you give us",
    paragraphs: [
      "You create a MyTopX account with Google or Apple sign-in. We receive the account identifier and email address that service passes to us, and use it to create and secure your account.",
      "You choose what goes on your profile. That may include a display name, profile picture, cover photo, bio, interests and links to your other social accounts.",
    ],
  },
  {
    heading: "Information created by using MyTopX",
    bullets: [
      "Content you publish: posts, images, video, audio, knowledge posts, stories, reposts and live streams.",
      "Content you submit to topic pages you do not own, including submissions awaiting an owner's approval.",
      "Topic pages you create, the keywords you tag them with, and their public or private setting.",
      "Topic pages you subscribe to, the subscription pages you sort them into, and the comment settings you choose for each.",
      "Comments, reactions, likes, and comments you have hidden or liked.",
      "Direct messages, group chat messages and message requests.",
      "Reports you file and blocks you apply.",
    ],
  },
  {
    heading: "Information collected automatically",
    paragraphs: [
      "We collect device and log information needed to run the service and keep it secure, including device type, operating system version, app version, IP address, and timestamps of activity.",
      "Push notification tokens are collected so we can deliver the alerts described below.",
    ],
  },
  {
    heading: "How we use your information",
    bullets: [
      "To operate your account, your topic pages and your feed.",
      "To deliver content from the topic pages you subscribe to, filtered by the comment settings you selected.",
      "To power search, recommendations and trending topics.",
      "To send push notifications about new followers, likes, comments, mentions, and live streams from topic pages you follow. You can turn these off in your settings.",
      "To review reported content and enforce the community guidelines.",
      "To review applications and votes for Expert status.",
      "To display advertising within the app, and to measure whether it was delivered.",
      "To detect, investigate and prevent abuse, fraud and security incidents.",
    ],
  },
  {
    heading: "Who can see what",
    paragraphs: [
      "Content published to a public topic page is visible to anyone using MyTopX. Content on a private topic page is visible to people the owner has approved.",
      "A topic page owner can see submissions made to their page, including submissions they have not approved, and can delete comments on their page.",
      "Stories are visible to your followers for 24 hours, and to anyone you send them to directly. Direct and group messages are visible to their participants.",
      "Making your profile private restricts who can view it and prevents messages from people you have not approved.",
    ],
  },
  {
    heading: "Advertising",
    paragraphs: [
      "MyTopX shows advertising in the app. Placements are associated with topic subject matter rather than with profiles built from your activity on other services.",
      "We do not sell your personal information.",
    ],
  },
  {
    heading: "Moderation and reported content",
    paragraphs: [
      "When a post is reported it is placed under review and carries an “Under review” banner while our team assesses it. Depending on the outcome, content or accounts may be removed from the platform.",
      "We retain records of reports and enforcement actions so that decisions can be reviewed and repeat abuse identified.",
    ],
  },
  {
    heading: "Retention and deletion",
    paragraphs: [
      "We keep your information for as long as your account is active. Stories are removed 24 hours after posting.",
      "You can delete your account, after which we delete or de-identify your personal information, except where we are required to retain it for legal, security or abuse-prevention reasons.",
    ],
  },
  {
    heading: "Your controls",
    bullets: [
      "Edit or delete your profile information and your posts at any time.",
      "Make your profile and your topic pages public or private.",
      "Block users from commenting, from a topic page, or from your profile and all your pages.",
      "Accept or decline message requests before a conversation starts.",
      "Turn push notifications off in your settings.",
      "Request access to, correction of, or deletion of your personal information by contacting us.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "MyTopX is not intended for children under 13, and we do not knowingly collect personal information from them. If we learn that we have, we delete the account.",
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      "If we make material changes to this policy we will notify you in the app before they take effect.",
      "Questions about this policy, or requests relating to your data, can be raised through the support options in the app.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy policy"
      updated="5 August 2026"
      intro="MyTopX is built around subjects rather than personal profiles, and the data we collect reflects that. This policy sets out what we hold, why we hold it, and what you can do about it."
      sections={sections}
    />
  );
}
