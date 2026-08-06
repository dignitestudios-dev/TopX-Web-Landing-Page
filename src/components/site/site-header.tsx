"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Wordmark } from "@/components/site/wordmark";
import { connectLink, primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Small outbound-link glyph, so "Connect" reads as leaving the site. */
function ExternalGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu is closed from the link handlers rather than from a
  // pathname effect, so navigation doesn't trigger a cascading render.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled || open
            ? "border-b border-ink/10 bg-bone/85 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
      <div className="shell flex h-18 items-center justify-between gap-8">
        <Link href="/" className="group shrink-0" aria-label="TopX home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block px-4 py-2 text-sm transition-colors",
                      active ? "text-ink" : "text-ash hover:text-ink",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-px h-0.5 bg-blaze"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}

            <li className="ml-3">
              <a
                href={connectLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-bone transition-colors hover:bg-blaze"
              >
                {connectLink.label}
                <ExternalGlyph />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="flex w-6 flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-full bg-ink"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-full bg-ink"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-full bg-ink"
            />
          </span>
        </button>
      </div>

        <ScrollProgress />
      </header>

      {/* Rendered as a sibling of <header>, not a child. The header carries
          `backdrop-blur` while open, and a backdrop-filter establishes a
          containing block for fixed descendants — nested here, the panel would
          size against the 4.5rem header and collapse to zero height. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-ink/10 bg-bone lg:hidden"
          >
            <ul className="shell divide-y divide-ink/10 py-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-5"
                  >
                    <span className="font-display text-2xl font-bold tracking-tight">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-ash">{item.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="shell pt-6 pb-10">
              <a
                href={connectLink.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-blaze px-6 py-4 text-white"
              >
                {connectLink.label}
                <ExternalGlyph />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
