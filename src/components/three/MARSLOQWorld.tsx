"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/motion";
import DataParticles from "./DataParticles";
import CameraRig from "./CameraRig";

const BAR_X = [-1.05, -0.63, -0.21, 0.21, 0.63, 1.05];

/** MARSLOQ world: data streams feeding an analytics glass panel with live bars. */
export default function MARSLOQWorld() {
  const bars = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (prefersReducedMotion() || !bars.current) return;
    const t = state.clock.elapsedTime;
    bars.current.children.forEach((bar, i) => {
      const h = 0.5 + Math.abs(Math.sin(t * 0.9 + i * 0.9)) * 0.9;
      bar.scale.y = THREE.MathUtils.damp(bar.scale.y, h, 4, 0.016);
      bar.position.y = -0.55 + (bar.scale.y * 0.5) / 2 + 0.25;
    });
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 5, 5]} intensity={50} color="#2dd4bf" />

      {/* glass analytics panel */}
      <RoundedBox args={[3, 1.8, 0.06]} radius={0.04} smoothness={4} position={[0, 0, -0.2]}>
        <meshPhysicalMaterial
          color="#0d1526"
          transparent
          opacity={0.55}
          roughness={0.15}
          metalness={0.4}
        />
      </RoundedBox>

      {/* analytics bars */}
      <group ref={bars}>
        {BAR_X.map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.24, 0.5, 0.05]} />
            <meshStandardMaterial
              color="#0d1526"
              emissive="#2dd4bf"
              emissiveIntensity={0.55}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
        ))}
      </group>

      {/* incoming log/data streams */}
      <group position={[0, 2.1, 0]}>
        <DataParticles count={140} color="#2dd4bf" area={[3.4, 2.4, 1.2]} speed={0.9} direction="down" />
      </group>

      <CameraRig intensity={0.5} />
    </>
  );
}
