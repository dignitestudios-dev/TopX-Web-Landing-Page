"use client";

import { OrbitFallback } from "@/components/three/orbit-fallback";
import { SceneFrame } from "@/components/three/scene-frame";
import { TopicOrbitScene, type OrbitAccent } from "@/components/three/topic-orbit-scene";

export function TopicOrbitCanvas({
  className,
  accent = "blaze",
}: {
  className?: string;
  accent?: OrbitAccent;
}) {
  return (
    <SceneFrame
      className={className}
      cameraZ={9}
      fov={40}
      fallback={<OrbitFallback accent={accent} />}
    >
      <TopicOrbitScene accent={accent} />
    </SceneFrame>
  );
}
