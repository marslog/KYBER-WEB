"use client";

import { useFrame } from "@react-three/fiber";
import { prefersReducedMotion } from "@/lib/motion";

interface CameraRigProps {
  intensity?: number;
  target?: [number, number, number];
}

/** Subtle mouse-parallax camera. Disabled for prefers-reduced-motion. */
export default function CameraRig({
  intensity = 1,
  target = [0, 0, 0],
}: CameraRigProps) {
  useFrame((state) => {
    if (prefersReducedMotion()) return;
    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 0.7 * intensity - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.45 * intensity - camera.position.y) * 0.04;
    camera.lookAt(target[0], target[1], target[2]);
  });
  return null;
}
