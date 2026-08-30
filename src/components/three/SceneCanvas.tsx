"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
}

/**
 * Renders the R3F canvas only while the container is near the viewport,
 * keeping GPU usage low for off-screen sections.
 */
export default function SceneCanvas({
  children,
  className = "",
  camera = { position: [0, 0.4, 7.5], fov: 55 },
}: SceneCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "240px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {inView ? (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: camera.position, fov: camera.fov }}
        >
          {children}
        </Canvas>
      ) : null}
    </div>
  );
}
