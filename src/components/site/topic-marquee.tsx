const topics = [
  "Basketball",
  "Makeup",
  "History",
  "Cooking",
  "Fitness",
  "Film restoration",
  "Confessions & stories",
  "Opinions",
  "City planning",
  "Long-distance cycling",
  "Clothes",
  "Climate",
];

/**
 * Continuous ticker of real topic names, doubled so the loop is seamless.
 *
 * It earns its place by being the actual content model — these are topic page
 * names, the unit the whole product is built on — rather than decoration.
 */
export function TopicMarquee() {
  return (
    <div
      className="grain relative overflow-hidden border-y border-ink/10 bg-blaze py-5 text-white"
      aria-hidden
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center">
            {topics.map((topic) => (
              <li key={topic} className="flex items-center">
                <span className="px-8 font-display text-xl font-bold whitespace-nowrap sm:text-2xl">
                  {topic}
                </span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
