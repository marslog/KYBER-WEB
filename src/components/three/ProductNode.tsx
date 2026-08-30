"use client";

import { useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Product } from "@/data/products";
import { prefersReducedMotion } from "@/lib/motion";

interface ProductNodeProps {
  product: Product;
  onActivate?: (id: string) => void;
}

/** Interactive 3D product node: hover highlights, click activates (scrolls to section). */
export default function ProductNode({ product, onActivate }: ProductNodeProps) {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const target = hovered ? 1.12 : 1;
    const s = THREE.MathUtils.damp(g.scale.x, target, 6, delta);
    g.scale.setScalar(s);
    if (!prefersReducedMotion()) {
      g.rotation.y += delta * (hovered ? 0.5 : 0.18);
      g.position.y =
        product.position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onActivate?.(product.id);
  };

  return (
    <group
      ref={group}
      position={product.position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <RoundedBox args={[0.85, 0.85, 0.85]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color="#0d1526"
          emissive={product.accent}
          emissiveIntensity={hovered ? 0.7 : 0.28}
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>
      <mesh scale={1.22}>
        <boxGeometry args={[0.85, 0.85, 0.85]} />
        <meshBasicMaterial
          color={product.accent}
          wireframe
          transparent
          opacity={hovered ? 0.5 : 0.16}
        />
      </mesh>
      <Html center position={[0, -0.95, 0]} distanceFactor={9} className="pointer-events-none">
        <div className="glass rounded-md px-3 py-1.5 text-center whitespace-nowrap">
          <div
            className="text-[11px] font-bold tracking-[0.18em] uppercase"
            style={{ color: product.accent }}
          >
            {product.name}
          </div>
          <div className="text-[10px] text-ink2">{product.category}</div>
        </div>
      </Html>
    </group>
  );
}
