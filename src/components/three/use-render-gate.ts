"use client";

import { useSyncExternalStore } from "react";

type Gate = {
  /** Whether a WebGL scene should mount at all. */
  allow3D: boolean;
  /** Resolved once we've actually checked, so we never flash the wrong thing. */
  ready: boolean;
  /** Device pixel ratio ceiling — the single biggest GPU cost lever. */
  maxDpr: number;
};

/** Used for the server/hydration render: assume no WebGL until we've checked. */
const PENDING: Gate = { allow3D: false, ready: false, maxDpr: 1.5 };

let cached: Gate | null = null;

function measure(): Gate {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Coarse proxies for a low-end device. Both are absent on some browsers,
  // in which case we give the benefit of the doubt.
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const fewCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    webgl = false;
  }

  const weak = lowMemory && fewCores;

  return {
    allow3D: webgl && !reduced && !weak,
    ready: true,
    // Retina beyond ~1.75x buys nothing visible here and costs fragments.
    maxDpr: Math.min(window.devicePixelRatio || 1, weak ? 1 : 1.75),
  };
}

/**
 * The result never changes for the life of the page, so there's nothing to
 * subscribe to — but going through useSyncExternalStore keeps the measurement
 * out of an effect and gives React a correct hydration snapshot.
 */
function subscribe() {
  return () => {};
}

function getSnapshot(): Gate {
  cached ??= measure();
  return cached;
}

function getServerSnapshot(): Gate {
  return PENDING;
}

/**
 * Decides whether this device should get a real WebGL scene or the static
 * fallback. The client asked for 3D across multiple pages, so the guard is
 * what keeps that from becoming a mobile performance problem: anything that
 * looks low-powered, has reduced motion enabled, or can't do WebGL at all
 * gets the flat version instead.
 */
export function useRenderGate(): Gate {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
