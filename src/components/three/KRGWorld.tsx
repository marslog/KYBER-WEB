"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/motion";
import CameraRig from "./CameraRig";

const THREATS: [number, number, number][] = [
  [-2.4, 1.2, 0.4],
  [2.5, 0.6, -0.3],
  [0.4, -1.9, 0.8],
];

/** KRG world: protected infrastructure inside a defensive shield with detection pulses. */
export default function KRGWorld() {
  const pulses = useRef<THREE.Group>(null!);
  const threats = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (prefersReducedMotion()) return;
    const t = state.clock.elapsedTime;
    if (pulses.current) {
      pulses.current.children.forEach((ring, i) => {
        const p = (t * 0.35 + i * 0.5) % 1;
        const s = 1 + p * 1.1;
        ring.scale.setScalar(s);
        const mat = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = 0.35 * (1 - p);
      });
    }
    if (threats.current) {
      threats.current.children.forEach((th, i) => {
        th.position.x = THREATS[i][0] + Math.sin(t * 0.7 + i * 2) * 0.25;
        th.position.y = THREATS[i][1] + Math.cos(t * 0.6 + i) * 0.2;
      });
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 5, 5]} intensity={50} color="#a78bfa" />

      {/* protected infrastructure */}
      {[
        [-0.45, -0.15, 0],
        [0.45, -0.15, 0],
        [0, 0.5, -0.2],
      ].map((pos, i) => (
        <RoundedBox key={i} args={[0.6, 0.4, 0.45]} radius={0.05} smoothness={4} position={pos as [number, number, number]}>
          <meshStandardMaterial
            color="#0d1526"
            emissive="#a78bfa"
            emissiveIntensity={0.3}
            roughness={0.35}
            metalness={0.7}
          />
        </RoundedBox>
      ))}

      {/* shield shell */}
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.07} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.14} />
      </mesh>

      {/* detection pulses */}
      <group ref={pulses}>
        {[0, 1].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.01, 8, 72]} />
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>

      {/* external threats held off by the shield */}
      <group ref={threats}>
        {THREATS.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#f87171" transparent opacity={0.8} />
          </mesh>
        ))}
      </group>

      <CameraRig intensity={0.5} />
    </>
  );
}
