import type { OrbitAccent } from "@/components/three/topic-orbit-scene";

const TONES: Record<OrbitAccent, { core: string; ring: string }> = {
  blaze: { core: "bg-blaze", ring: "border-blaze/35" },
  amber: { core: "bg-blaze-amber", ring: "border-blaze-amber/35" },
  bone: { core: "bg-bone", ring: "border-bone/35" },
};

/** Flat stand-in for TopicOrbitScene: concentric rings around a topic tile. */
export function OrbitFallback({ accent = "blaze" }: { accent?: OrbitAccent }) {
  const tone = TONES[accent];

  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center">
      <div className="relative aspect-square w-[min(80%,22rem)]">
        {[100, 68, 38].map((size) => (
          <div
            key={size}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${tone.ring}`}
            style={{ width: `${size}%`, height: `${size}%` }}
          />
        ))}
        <div
          className={`absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-[2px] ${tone.core}`}
        />
      </div>
    </div>
  );
}
