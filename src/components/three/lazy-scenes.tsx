"use client";

import dynamic from "next/dynamic";

import { OrbitFallback } from "@/components/three/orbit-fallback";

/**
 * Public entry points for every 3D scene on the site.
 *
 * `ssr: false` plus the dynamic import keeps three.js, fiber and drei out of
 * the server render and out of the first-load JS. Each scene shows its static
 * fallback until the chunk arrives, so nothing pops in from blank.
 */
export const LazyTopicOrbit = dynamic(
  () => import("@/components/three/topic-orbit-canvas").then((m) => m.TopicOrbitCanvas),
  { ssr: false, loading: () => <OrbitFallback /> },
);
