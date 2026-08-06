import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Device frames drawn in CSS rather than shipped as PNG chrome, so they stay
 * sharp at any size and cost nothing extra to download.
 *
 * Every dimension is expressed in `cqw` — percentages of the frame's own
 * width — because these render anywhere from ~130px on a phone to ~400px on a
 * desktop. With fixed rem values the corner radius stays put while the device
 * shrinks, and a small phone ends up looking like a rounded blob. The ratios
 * below are taken from an iPhone 15 Pro (393pt wide): 55pt corner radius,
 * ~9pt bezel, 125×36pt Dynamic Island.
 */

export type PhoneScreen = {
  src: string;
  alt: string;
};

export function PhoneFrame({
  screen,
  className,
  priority = false,
}: {
  screen: PhoneScreen;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("@container w-full", className)}>
      <div
        className="relative aspect-[393/852] w-full bg-ink"
        style={{
          borderRadius: "14cqw",
          padding: "2.3cqw",
          // Titanium-ish edge: a light top rim and a deep drop shadow.
          boxShadow:
            "inset 0 0 0 0.4cqw #3a2a20, inset 0 0.6cqw 0.6cqw -0.4cqw rgba(255,255,255,0.35), 0 8cqw 14cqw -6cqw rgba(23,16,12,0.55)",
        }}
      >
        {/* Side buttons. Their absence is most of what makes a CSS phone read
            as a rounded rectangle rather than a device. */}
        <span
          aria-hidden
          className="absolute bg-ink-soft"
          style={{ left: "-0.7cqw", top: "16%", width: "0.75cqw", height: "4%", borderRadius: "0.4cqw 0 0 0.4cqw" }}
        />
        <span
          aria-hidden
          className="absolute bg-ink-soft"
          style={{ left: "-0.7cqw", top: "23%", width: "0.75cqw", height: "7.5%", borderRadius: "0.4cqw 0 0 0.4cqw" }}
        />
        <span
          aria-hidden
          className="absolute bg-ink-soft"
          style={{ left: "-0.7cqw", top: "32.5%", width: "0.75cqw", height: "7.5%", borderRadius: "0.4cqw 0 0 0.4cqw" }}
        />
        <span
          aria-hidden
          className="absolute bg-ink-soft"
          style={{ right: "-0.7cqw", top: "26%", width: "0.75cqw", height: "11%", borderRadius: "0 0.4cqw 0.4cqw 0" }}
        />

        <div
          className="relative h-full w-full overflow-hidden bg-white"
          style={{ borderRadius: "11.7cqw" }}
        >
          <Image
            src={screen.src}
            alt={screen.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 320px"
            className="object-cover object-top"
          />

          {/* Dynamic Island. */}
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bg-ink"
            style={{ top: "1.6%", width: "31cqw", height: "4.1%", borderRadius: "99cqw" }}
          />
        </div>
      </div>
    </div>
  );
}

export function LaptopFrame({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("@container w-full", className)}>
      {/* Lid */}
      <div
        className="relative aspect-[16/10] w-full bg-ink"
        style={{
          borderRadius: "1.4cqw 1.4cqw 0 0",
          padding: "0.75cqw",
          paddingBottom: 0,
          boxShadow:
            "inset 0 0.3cqw 0 0 rgba(255,255,255,0.14), 0 6cqw 10cqw -5cqw rgba(23,16,12,0.5)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden bg-white"
          style={{ borderRadius: "0.8cqw 0.8cqw 0 0" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 92vw, 1000px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Hinge and base, slightly wider than the lid as on a real machine. */}
      <div
        className="relative mx-auto bg-ink-soft"
        style={{ width: "104%", height: "1.1cqw", borderRadius: "0 0 0.9cqw 0.9cqw" }}
      >
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bg-ink"
          style={{ top: 0, width: "11%", height: "45%", borderRadius: "0 0 99cqw 99cqw" }}
        />
      </div>
    </div>
  );
}
