import type { Metadata } from "next";

import { LegalDocument, type LegalSection } from "@/components/site/legal-document";

export const metadata: Metadata = {
  title: "Child safety policy",
  description:
    "How MyTopX prevents child sexual abuse and exploitation, moderates content, protects minors, and works with law enforcement.",
};

/*
  Client-supplied text. Reproduced as given — this is their published policy,
  not something written here, so it carries no draft banner and should only be
  edited on their instruction.
*/
const sections: LegalSection[] = [
  {
    heading: "Our commitment to child safety",
    paragraphs: [
      "At MyTopX, we take child safety and online protection seriously. We are committed to ensuring a safe and secure environment for all users and strictly enforce policies to prevent Child Sexual Abuse and Exploitation (CSAE).",
    ],
  },
  {
    heading: "Age restrictions",
    bullets: [
      "MyTopX is intended for users of all ages, including children under 13.",
      "We do not knowingly allow minors to use our platform without parental knowledge or supervision.",
      "If we discover that a minor has registered and is being exposed to harmful or inappropriate content, we reserve the right to remove the account or limit its access immediately.",
    ],
  },
  {
    heading: "Content moderation and reporting",
    paragraphs: [
      "We have strict guidelines and enforcement mechanisms to prevent harmful content on MyTopX:",
    ],
    bullets: [
      "Prohibited content: Any content involving child exploitation, nudity, or abuse is strictly forbidden and will be removed immediately and reported to relevant law enforcement or child protection agencies.",
      "User reporting system: All users can report any suspicious, harmful, or unsafe activity or content. Every report is reviewed promptly, and appropriate action is taken, including banning accounts and notifying authorities when necessary.",
    ],
  },
  {
    heading: "User safety measures",
    paragraphs: [
      "To safeguard all users, including minors, we have implemented the following protocols:",
    ],
    bullets: [
      "Profile verification: We take steps to discourage fake accounts and impersonation through registration validation.",
      "Chat and interaction controls: Users can block, mute, or report others if they feel unsafe or threatened in any way.",
      "Live stream monitoring: Our team monitors live sessions using a mix of automated alerts and user feedback to prevent misuse of the feature.",
      "Data protection and privacy: MyTopX does not sell or share personal data with third parties unless required by law or consented to by the user. Our practices are aligned with COPPA and GDPR standards.",
    ],
  },
  {
    heading: "Compliance and law enforcement collaboration",
    paragraphs: [
      "MyTopX complies with child protection laws and platform policies including:",
    ],
    bullets: [
      "COPPA (Children's Online Privacy Protection Act)",
      "GDPR (General Data Protection Regulation)",
      "Google Play and Apple App Store CSAE policies",
    ],
  },
  {
    heading: "Reporting violations",
    paragraphs: [
      "Any violations involving child abuse or exploitation are immediately reported to law enforcement agencies and child protection organisations.",
    ],
  },
  {
    heading: "Contact for child safety concerns",
    paragraphs: [
      "If you have concerns or inquiries regarding child safety on MyTopX, please contact our team at:",
    ],
    link: { href: "mailto:mytopx2025@gmail.com", label: "mytopx2025@gmail.com" },
  },
  {
    heading: "Ongoing work",
    paragraphs: [
      "We are committed to maintaining a secure and positive environment for all users and are continuously working to improve our child safety policies and tools.",
    ],
  },
];

export default function ChildSafetyPolicyPage() {
  return (
    <LegalDocument
      draft={false}
      title="Child Safety Policy — MyTopX"
      updated="17 February 2026"
      intro="MyTopX enforces strict policies to prevent child sexual abuse and exploitation, and works with law enforcement and child protection agencies where violations occur."
      sections={sections}
    />
  );
}
