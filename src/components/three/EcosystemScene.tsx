"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { products } from "@/data/products";
import { prefersReducedMotion } from "@/lib/motion";
import KYBERCore from "./KYBERCore";
import ProductNode from "./ProductNode";
import NetworkLines, { type NetworkEdge } from "./NetworkLines";
import DataParticles from "./DataParticles";
import CameraRig from "./CameraRig";

const CORE: [number, number, number] = [0, 0.1, 0];

/** Hero scene: KYBER core with product nodes orbiting in a connected ecosystem. */
export default function EcosystemScene({
  onProductClick,
}: {
  onProductClick?: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (prefersReducedMotion()) return;
    group.current.rotation.y += delta * 0.04;
  });

  const coreEdges = useMemo<NetworkEdge[]>(
    () => products.map((p) => ({ from: CORE, to: p.position })),
    []
  );
  const ringEdges = useMemo<NetworkEdge[]>(() => {
    const edges: NetworkEdge[] = [];
    for (let i = 0; i < products.length; i++) {
      edges.push({
        from: products[i].position,
        to: products[(i + 1) % products.length].position,
      });
    }
    return edges;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={60} color="#4cc3ff" />
      <pointLight position={[-6, -4, -6]} intensity={35} color="#a78bfa" />
      <group ref={group}>
        <group position={CORE}>
          <KYBERCore />
        </group>
        {products.map((p) => (
          <ProductNode key={p.id} product={p} onActivate={onProductClick} />
        ))}
        <NetworkLines edges={coreEdges} color="#4cc3ff" opacity={0.3} />
        <NetworkLines edges={ringEdges} color="#94a3b8" opacity={0.14} pulses={false} />
        <DataParticles count={200} color="#4cc3ff" area={[10, 6, 6]} speed={0.14} />
      </group>
      <CameraRig intensity={0.8} />
    </>
  );
}
