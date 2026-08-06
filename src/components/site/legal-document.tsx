import { Reveal } from "@/components/motion/reveal";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

/**
 * Shared shell for the privacy policy and terms.
 *
 * These are drafts written from the product described in the TopX proposal.
 * The review banner is deliberate and should stay until a lawyer has signed
 * the text off — both documents are linked from app store submissions.
 */
export function LegalDocument({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
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
            <p className="border-l-2 border-blaze bg-blaze-tint/50 px-6 py-5 text-sm leading-relaxed">
              <strong className="font-semibold">Draft pending legal review.</strong>{" "}
              This document describes the intended handling of the TopX product
              as specified. It has not been reviewed by a qualified lawyer and
              must be before launch or app store submission.
            </p>

            <div className="mt-14 space-y-12">
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
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
