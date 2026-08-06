import Link from "next/link";

import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="shell band">
      <p className="eyebrow text-blaze-deep">404</p>
      <h1 className="mt-6 max-w-3xl font-display text-jumbo font-extrabold text-balance">
        There&apos;s no page here.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash">
        The address you followed doesn&apos;t match anything on the site. Try one
        of these instead.
      </p>

      <ul className="mt-12 grid max-w-3xl gap-x-12 gap-y-6 sm:grid-cols-2">
        {primaryNav.map((item) => (
          <li key={item.href} className="border-t border-ink/15 pt-4">
            <Link href={item.href} className="group block">
              <span className="font-display text-xl font-bold group-hover:text-blaze">
                {item.label}
              </span>
              <span className="mt-1 block text-sm text-ash">{item.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-14 inline-block bg-ink px-7 py-4 text-bone transition-colors hover:bg-blaze"
      >
        Back to the home page
      </Link>
    </section>
  );
}
