"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useRenderGate } from "@/components/three/use-render-gate";
import { cn } from "@/lib/utils";

type SceneFrameProps = {
  children: ReactNode;
  /** Rendered instead of WebGL on reduced-motion, low-end and no-WebGL devices. */
  fallback: ReactNode;
  className?: string;
  /** Camera distance; scenes are authored around the origin. */
  cameraZ?: number;
  fov?: number;
};

/**
 * Every 3D scene on the site mounts through here.
 *
 * Two things earn their keep: the render gate (see use-render-gate) decides
 * whether WebGL happens at all, and the IntersectionObserver flips the render
 * loop off the moment a scene scrolls out of view. Without the second one, a
 * multi-page 3D site would keep every canvas it has ever mounted running at
 * 60fps in the background.
 */
export function SceneFrame({
  children,
  fallback,
  className,
  cameraZ = 6,
  fov = 45,
}: SceneFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { allow3D, ready, maxDpr } = useRenderGate();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Also stop rendering when the tab is hidden.
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const active = visible && tabVisible;

  return (
    <div ref={hostRef} className={cn("relative", className)}>
      {ready && allow3D ? (
        <Canvas
          frameloop={active ? "always" : "never"}
          dpr={[1, maxDpr]}
          camera={{ position: [0, 0, cameraZ], fov }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          // The scene is decoration; the text beside it carries the meaning.
          aria-hidden
          className="!absolute inset-0"
        >
          {children}
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  );
}
