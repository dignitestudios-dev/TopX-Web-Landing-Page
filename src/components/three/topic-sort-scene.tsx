"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const BLAZE = new THREE.Color("#f85e00");
const BLAZE_DEEP = new THREE.Color("#b93b00");
const INK = new THREE.Color("#2a1e17");
const BONE = new THREE.Color("#f4efe8");
const AMBER = new THREE.Color("#ff9142");

const COLUMNS = 4;
const ROWS = 5;
const COUNT = COLUMNS * ROWS;

/** Deterministic pseudo-random so the scattered state is stable across mounts. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Tile = {
  scattered: THREE.Vector3;
  sorted: THREE.Vector3;
  scatterRot: THREE.Euler;
  color: THREE.Color;
  phase: number;
};

/**
 * The site's signature moment: a loose drift of posts collapsing into four
 * tidy topic columns. It's the product thesis rendered literally — the same
 * content, the difference is that it arrives sorted by subject.
 */
export function TopicSortScene() {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(0);
  const pointer = useRef(new THREE.Vector2());

  const tiles = useMemo<Tile[]>(() => {
    // One column per topic; the far-left column is the brand orange so the
    // sorted state reads as "your topic" against the rest.
    const columnColors = [BLAZE, INK, AMBER, BLAZE_DEEP];

    return Array.from({ length: COUNT }, (_, i) => {
      const col = i % COLUMNS;
      const row = Math.floor(i / COLUMNS);

      const sorted = new THREE.Vector3(
        (col - (COLUMNS - 1) / 2) * 1.55,
        ((ROWS - 1) / 2 - row) * 1.02,
        0,
      );

      const scattered = new THREE.Vector3(
        (seeded(i, 1) - 0.5) * 13,
        (seeded(i, 2) - 0.5) * 8.5,
        (seeded(i, 3) - 0.5) * 7 - 1.5,
      );

      const scatterRot = new THREE.Euler(
        (seeded(i, 4) - 0.5) * 2.2,
        (seeded(i, 5) - 0.5) * 2.2,
        (seeded(i, 6) - 0.5) * 2.2,
      );

      // A few tiles in each column stay bone-coloured: submissions awaiting
      // the owner's approval, which is how topic pages actually work.
      const color = seeded(i, 7) > 0.78 ? BONE : columnColors[col];

      return { scattered, sorted, scatterRot, color, phase: seeded(i, 8) * Math.PI * 2 };
    });
  }, []);

  useFrame((state, delta) => {
    // Ease toward sorted once, then hold. Clamped delta keeps the intro
    // consistent if the tab was throttled.
    const step = Math.min(delta, 1 / 30);
    progress.current = Math.min(1, progress.current + step * 0.42);

    // Cubic ease-out, so tiles arrive rather than slam into place.
    const p = 1 - Math.pow(1 - progress.current, 3);
    const t = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      const mesh = meshes.current[i];
      const tile = tiles[i];
      if (!mesh) continue;

      // Stagger by column so the columns resolve left to right.
      const local = THREE.MathUtils.clamp(p * 1.6 - (i % COLUMNS) * 0.12, 0, 1);

      mesh.position.lerpVectors(tile.scattered, tile.sorted, local);
      // Once sorted, tiles breathe gently on Z rather than sitting dead flat.
      mesh.position.z += Math.sin(t * 0.6 + tile.phase) * 0.06 * local;

      mesh.rotation.x = THREE.MathUtils.lerp(tile.scatterRot.x, 0, local);
      mesh.rotation.y = THREE.MathUtils.lerp(
        tile.scatterRot.y,
        Math.sin(t * 0.4 + tile.phase) * 0.05,
        local,
      );
      mesh.rotation.z = THREE.MathUtils.lerp(tile.scatterRot.z, 0, local);
    }

    if (group.current) {
      // Pointer parallax, damped so it never feels twitchy.
      pointer.current.lerp(state.pointer, 1 - Math.pow(0.001, step));
      group.current.rotation.y = pointer.current.x * 0.18;
      group.current.rotation.x = -pointer.current.y * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 8]} intensity={1.5} />
      <directionalLight position={[-6, -2, 4]} intensity={0.5} color="#ffd9bf" />

      <group ref={group}>
        {tiles.map((tile, i) => (
          <mesh
            key={i}
            ref={(el) => {
              meshes.current[i] = el;
            }}
          >
            <boxGeometry args={[1.28, 0.82, 0.05]} />
            <meshStandardMaterial
              color={tile.color}
              roughness={0.55}
              metalness={0.05}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
