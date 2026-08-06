import Link from "next/link";

import { Wordmark } from "@/components/site/wordmark";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bone">
      <div className="shell band-tight">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Wordmark tone="bone" className="text-3xl" />
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-bone/70">
              {site.tagline} A feed built around subject matter, so what you see
              is what you actually came for.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="eyebrow text-blaze">{group.heading}</h2>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-bone/70 transition-colors hover:text-bone"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/15 pt-8 font-mono text-xs tracking-wider text-bone/50 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
