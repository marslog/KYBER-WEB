"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/motion";

interface DataParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  area?: [number, number, number];
  speed?: number;
  direction?: "up" | "down";
  opacity?: number;
}

/** Lightweight drifting data particles. Geometry is built in an effect (pure render). */
export default function DataParticles({
  count = 220,
  color = "#4cc3ff",
  size = 0.035,
  area = [9, 6, 5],
  speed = 0.2,
  direction = "up",
  opacity = 0.65,
}: DataParticlesProps) {
  const points = useRef<THREE.Points>(null!);
  const velocities = useRef<Float32Array | null>(null);
  const [areaX, areaY, areaZ] = area;

  useEffect(() => {
    const el = points.current;
    const positions = new Float32Array(count * 3);
    const vels = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * areaX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * areaY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * areaZ;
      vels[i] = 0.5 + Math.random();
    }
    velocities.current = vels;
    el.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return () => {
      el.geometry.deleteAttribute("position");
    };
  }, [count, areaX, areaY, areaZ]);

  useFrame((_, delta) => {
    if (prefersReducedMotion()) return;
    const attr = points.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    if (!attr || !velocities.current) return;
    const dir = direction === "up" ? 1 : -1;
    const half = area[1] / 2;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + dir * delta * speed * velocities.current[i];
      if (y > half) y = -half;
      if (y < -half) y = half;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry />
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
