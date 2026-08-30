"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/motion";

export interface NetworkEdge {
  from: [number, number, number];
  to: [number, number, number];
}

interface NetworkLinesProps {
  edges: NetworkEdge[];
  color?: string;
  opacity?: number;
  pulses?: boolean;
  pulseSpeed?: number;
}

/** Thin connection lines with small data pulses travelling along them. */
export default function NetworkLines({
  edges,
  color = "#4cc3ff",
  opacity = 0.3,
  pulses = true,
  pulseSpeed = 0.16,
}: NetworkLinesProps) {
  const group = useRef<THREE.Group>(null!);
  const offsets = useMemo(() => edges.map((_, i) => (i * 0.37) % 1), [edges]);

  useFrame((state) => {
    if (!pulses || !group.current) return;
    if (prefersReducedMotion()) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const e = edges[i];
      if (!e) return;
      const p = (t * pulseSpeed + offsets[i]) % 1;
      child.position.set(
        e.from[0] + (e.to[0] - e.from[0]) * p,
        e.from[1] + (e.to[1] - e.from[1]) * p,
        e.from[2] + (e.to[2] - e.from[2]) * p
      );
    });
  });

  return (
    <group>
      {edges.map((e, i) => (
        <Line
          key={`line-${i}`}
          points={[e.from, e.to]}
          color={color}
          transparent
          opacity={opacity}
          lineWidth={1}
        />
      ))}
      {pulses && (
        <group ref={group}>
          {edges.map((_, i) => (
            <mesh key={`pulse-${i}`}>
              <sphereGeometry args={[0.035, 10, 10]} />
              <meshBasicMaterial color={color} transparent opacity={0.9} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
