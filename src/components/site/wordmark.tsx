import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The TopX mark — an X with a spinning top through it — lifted from the app's
 * own chrome, paired with the name set in the display face.
 */
export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "bone";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/topx-logo.png"
        alt=""
        width={188}
        height={155}
        priority
        className="h-8 w-auto transition-transform duration-500 ease-out group-hover:-rotate-12"
      />
      <span
        className={cn(
          "font-display text-2xl leading-none font-extrabold tracking-[-0.04em]",
          tone === "ink" ? "text-ink" : "text-bone",
        )}
      >
        TopX
      </span>
    </span>
  );
}
