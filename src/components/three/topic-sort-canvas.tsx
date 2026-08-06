"use client";

import { SceneFrame } from "@/components/three/scene-frame";
import { TileGridFallback } from "@/components/three/tile-grid-fallback";
import { TopicSortScene } from "@/components/three/topic-sort-scene";

/**
 * Everything that pulls in three.js lives behind this module boundary, so the
 * dynamic import in `lazy-scenes.tsx` can code-split the whole engine out of
 * the initial page bundle.
 */
export function TopicSortCanvas({ className }: { className?: string }) {
  return (
    <SceneFrame className={className} cameraZ={8.5} fov={42} fallback={<TileGridFallback />}>
      <TopicSortScene />
    </SceneFrame>
  );
}
