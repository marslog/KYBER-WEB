"use client";

import { Html, RoundedBox } from "@react-three/drei";
import NetworkLines, { type NetworkEdge } from "./NetworkLines";
import DataParticles from "./DataParticles";
import CameraRig from "./CameraRig";

const NODES: [number, number, number][] = [
  [-1.9, -1, 0],
  [1.9, -1, 0],
  [0, -1, -1.7],
];

const VMS: { pos: [number, number, number]; label: string }[] = [
  { pos: [-1.4, 1.1, 0.2], label: "VM · 4 vCPU · 16 GB" },
  { pos: [1.4, 1.1, 0.2], label: "VM · 8 vCPU · 32 GB" },
];

const edges: NetworkEdge[] = [
  { from: NODES[0], to: NODES[1] },
  { from: NODES[1], to: NODES[2] },
  { from: NODES[2], to: NODES[0] },
  { from: VMS[0].pos, to: NODES[0] },
  { from: VMS[1].pos, to: NODES[1] },
];

/** KYBER HCI world: cluster nodes, distributed storage blocks, floating VMs. */
export default function HCIWorld() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 5, 5]} intensity={50} color="#4cc3ff" />
      <NetworkLines edges={edges} color="#4cc3ff" opacity={0.35} />

      {NODES.map((pos, i) => (
        <group key={`node-${i}`} position={pos}>
          <RoundedBox args={[1, 0.62, 0.7]} radius={0.06} smoothness={4}>
            <meshStandardMaterial
              color="#0d1526"
              emissive="#4cc3ff"
              emissiveIntensity={0.25}
              roughness={0.35}
              metalness={0.7}
            />
          </RoundedBox>
          {/* storage blocks */}
          {[0, 1, 2].map((s) => (
            <mesh key={s} position={[0, -0.52 - s * 0.16, 0]}>
              <boxGeometry args={[0.8 - s * 0.12, 0.1, 0.55]} />
              <meshStandardMaterial
                color="#0a0f1e"
                emissive="#4cc3ff"
                emissiveIntensity={0.12 + s * 0.06}
                roughness={0.5}
                metalness={0.5}
              />
            </mesh>
          ))}
          <Html center position={[0, 0.55, 0]} distanceFactor={9} className="pointer-events-none">
            <div className="text-[10px] font-semibold tracking-[0.2em] text-ink2 whitespace-nowrap">
              NODE 0{i + 1}
            </div>
          </Html>
        </group>
      ))}

      {VMS.map((vm, i) => (
        <group key={`vm-${i}`} position={vm.pos}>
          <mesh>
            <boxGeometry args={[0.72, 0.42, 0.08]} />
            <meshStandardMaterial
              color="#0d1526"
              emissive="#4cc3ff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
              roughness={0.2}
              metalness={0.4}
            />
          </mesh>
          <Html center position={[0, 0, 0.1]} distanceFactor={9} className="pointer-events-none">
            <div className="text-[9px] font-mono text-ink whitespace-nowrap">{vm.label}</div>
          </Html>
        </group>
      ))}

      <DataParticles count={120} color="#4cc3ff" area={[6, 4, 4]} speed={0.18} />
      <CameraRig intensity={0.5} />
    </>
  );
}
