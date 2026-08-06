"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type OrbitAccent = "blaze" | "amber" | "bone";

const ACCENTS: Record<OrbitAccent, [string, string, string]> = {
  blaze: ["#f85e00", "#b93b00", "#2a1e17"],
  amber: ["#ff9142", "#f85e00", "#2a1e17"],
  bone: ["#f4efe8", "#f85e00", "#6b615a"],
};

/** Three nested rings: a topic, the pages that subscribe to it, their readers. */
const RINGS = [
  { radius: 1.5, count: 6, speed: 0.24, tilt: 0.0 },
  { radius: 2.7, count: 10, speed: -0.16, tilt: 0.32 },
  { radius: 3.9, count: 14, speed: 0.1, tilt: -0.24 },
];

export function TopicOrbitScene({ accent = "blaze" }: { accent?: OrbitAccent }) {
  const group = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Group | null)[]>([]);
  const pointer = useRef(new THREE.Vector2());

  const colors = useMemo(() => ACCENTS[accent].map((c) => new THREE.Color(c)), [accent]);

  useFrame((state, delta) => {
    const step = Math.min(delta, 1 / 30);

    RINGS.forEach((ring, i) => {
      const node = ringRefs.current[i];
      if (node) node.rotation.z += ring.speed * step;
    });

    if (group.current) {
      pointer.current.lerp(state.pointer, 1 - Math.pow(0.002, step));
      group.current.rotation.y = pointer.current.x * 0.3;
      group.current.rotation.x = -0.35 + -pointer.current.y * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 6]} intensity={1.4} />
      <directionalLight position={[-5, -3, 2]} intensity={0.45} color="#ffd9bf" />

      <group ref={group}>
        {/* The topic itself, at the centre. */}
        <mesh>
          <boxGeometry args={[1.1, 1.1, 0.12]} />
          <meshStandardMaterial color={colors[0]} roughness={0.45} />
        </mesh>

        {RINGS.map((ring, ringIndex) => (
          <group
            key={ring.radius}
            rotation={[ring.tilt, 0, 0]}
            ref={(el) => {
              ringRefs.current[ringIndex] = el;
            }}
          >
            {Array.from({ length: ring.count }, (_, i) => {
              const angle = (i / ring.count) * Math.PI * 2;
              return (
                <mesh
                  key={i}
                  position={[
                    Math.cos(angle) * ring.radius,
                    Math.sin(angle) * ring.radius,
                    0,
                  ]}
                  rotation={[0, 0, angle + Math.PI / 2]}
                >
                  <boxGeometry args={[0.62, 0.4, 0.05]} />
                  <meshStandardMaterial
                    color={colors[(ringIndex + i) % 3]}
                    roughness={0.55}
                  />
                </mesh>
              );
            })}
          </group>
        ))}
      </group>
    </>
  );
}
