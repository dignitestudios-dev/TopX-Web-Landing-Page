import { Reveal } from "@/components/motion/reveal";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Optional trailing link, e.g. a contact address. */
  link?: { href: string; label: string };
};

/**
 * Shared shell for the site's legal documents.
 *
 * `draft` controls the review banner. It defaults to true because the
 * documents written from the proposal are unreviewed drafts — but text
 * supplied by the client is their own copy, and must not be labelled a draft.
 */
export function LegalDocument({
  title,
  updated,
  intro,
  sections,
  draft = true,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  draft?: boolean;
}) {
  return (
    <>
      <section className="border-b border-ink/10">
        <div className="shell pt-16 pb-14 lg:pt-24 lg:pb-16">
          <Reveal>
            <p className="eyebrow text-blaze-deep">Legal</p>
            <h1 className="mt-6 max-w-3xl font-display text-jumbo font-extrabold text-balance">
              {title}
            </h1>
            <p className="mt-6 font-mono text-xs tracking-wider text-ash uppercase">
              Last updated {updated}
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ash">{intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="band-tight">
        <div className="shell">
          <div className="max-w-3xl">
            {draft && (
              <p className="border-l-2 border-blaze bg-blaze-tint/50 px-6 py-5 text-sm leading-relaxed">
                <strong className="font-semibold">Draft pending legal review.</strong>{" "}
                This document describes the intended handling of the MyTopX product
                as specified. It has not been reviewed by a qualified lawyer and
                must be before launch or app store submission.
              </p>
            )}

            <div className={draft ? "mt-14 space-y-12" : "space-y-12"}>
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl leading-tight font-bold sm:text-3xl">
                    {section.heading}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-relaxed text-ash">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="border-l-2 border-ink/15 pl-5 leading-relaxed text-ash"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.link && (
                    <a
                      href={section.link.href}
                      className="mt-5 inline-block border-b border-blaze pb-0.5 break-all transition-colors hover:text-blaze"
                    >
                      {section.link.label}
                    </a>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
