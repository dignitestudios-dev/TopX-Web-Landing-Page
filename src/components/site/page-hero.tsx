import { Reveal } from "@/components/motion/reveal";

/** Shared masthead for inner pages, so every page opens on the same rhythm. */
export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
}) {
  return (
    <section className="border-b border-ink/10">
      <div className="shell pt-16 pb-16 lg:pt-24 lg:pb-24">
        <Reveal>
          <p className="eyebrow text-blaze-deep">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl font-display text-jumbo font-extrabold text-balance">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ash sm:text-xl">
            {lede}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
