import type { Metadata } from "next";

import { LegalDocument, type LegalSection } from "@/components/site/legal-document";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The rules for using TopX: your account, your content, running a topic page, and how moderation works.",
};

const sections: LegalSection[] = [
  {
    heading: "Accepting these terms",
    paragraphs: [
      "By creating a TopX account or using the app you agree to these terms. If you do not agree, do not use TopX.",
    ],
  },
  {
    heading: "Your account",
    paragraphs: [
      "You must be at least 13 years old to use TopX. You are responsible for activity on your account and for keeping access to it secure.",
      "Accounts are created through Google or Apple sign-in. If you lose access to that sign-in method you may lose access to your TopX account.",
    ],
  },
  {
    heading: "Your content",
    paragraphs: [
      "You keep ownership of everything you post. By posting to TopX you grant us a non-exclusive, worldwide, royalty-free licence to host, store, reproduce and display that content for the purpose of operating the service.",
      "You are responsible for what you post. You must have the rights to any content you publish, including content you repost or share from other platforms.",
    ],
  },
  {
    heading: "Running a topic page",
    paragraphs: [
      "Anyone can create a topic page. As the owner you decide whether it is public or private, review submissions from other users, and moderate comments on it.",
      "Owners are expected to keep a page relevant to the subject it is named for, and to apply the community guidelines when reviewing submissions and comments.",
    ],
    bullets: [
      "You may approve or decline any submission to your page.",
      "You may delete any comment on your page, and block users from commenting on it.",
      "You may pin posts as elevated posts for a fixed period or indefinitely.",
      "Page names are allocated on a first come, first served basis, and we may reclaim names that impersonate others or are held purely to prevent their use.",
    ],
  },
  {
    heading: "Acceptable use",
    bullets: [
      "Do not post unlawful, harassing, hateful or deliberately misleading content.",
      "Do not impersonate another person, brand or organisation.",
      "Do not post sexual content involving minors, or content that promotes violence or self-harm.",
      "Do not infringe anyone's intellectual property.",
      "Do not attempt to break, overload, scrape or reverse-engineer the service, or evade blocks and enforcement actions.",
      "Do not misrepresent your credentials when applying for Expert status.",
    ],
  },
  {
    heading: "Reporting and enforcement",
    paragraphs: [
      "Users can report content. Reported content is placed under review and shows an “Under review” banner while it is assessed.",
      "Depending on the severity of a violation we may remove content, restrict features, or permanently remove an account from the platform. We aim to apply these actions proportionately, and serious or repeated violations may result in removal without prior warning.",
    ],
  },
  {
    heading: "Expert status",
    paragraphs: [
      "Expert status is granted at our discretion, after review of an application or of community votes. It recognises expertise on a specific subject and can be withdrawn if the basis for granting it turns out to be inaccurate.",
    ],
  },
  {
    heading: "Advertising",
    paragraphs: [
      "TopX includes advertising. Advertisers and creators promoting products through the platform must comply with these terms and with applicable advertising law, including disclosing paid promotion where required.",
    ],
  },
  {
    heading: "Availability and changes",
    paragraphs: [
      "We may change, suspend or discontinue parts of TopX. We will give notice of material changes to these terms in the app before they take effect.",
      "The service is provided on an “as is” basis. We do not warrant that it will be uninterrupted or error-free.",
    ],
  },
  {
    heading: "Ending your use",
    paragraphs: [
      "You can stop using TopX and delete your account at any time. We may suspend or terminate an account that breaches these terms.",
      "Provisions that by their nature should survive termination — including content licences already granted for content still hosted, and limitations of liability — continue to apply.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about these terms can be raised through the support options in the app.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of service"
      updated="5 August 2026"
      intro="These terms cover how TopX works, what you can expect from us, and what we expect from you — including the extra responsibilities that come with running a topic page."
      sections={sections}
    />
  );
}
