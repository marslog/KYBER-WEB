"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/motion";

/** The central KYBER technology core: emissive sphere + wireframe shell + orbit rings. */
export default function KYBERCore({ color = "#4cc3ff" }: { color?: string }) {
  const group = useRef<THREE.Group>(null!);
  const wire = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (prefersReducedMotion()) return;
    group.current.rotation.y += delta * 0.12;
    wire.current.rotation.x += delta * 0.08;
    wire.current.rotation.y -= delta * 0.1;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>
      <mesh ref={wire} scale={1.12}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.1, 0.012, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 1.9, 0.4, 0]}>
        <torusGeometry args={[1.4, 0.008, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}
