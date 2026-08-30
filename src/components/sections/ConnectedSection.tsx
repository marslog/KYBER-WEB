"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import GlassCard from "@/components/ui/GlassCard";
import {
  CentralizedIcon,
  HypervisorIcon,
  ObservabilityIcon,
  SecurityShieldIcon,
  type EcosystemIconComponent,
} from "@/components/icons/EcosystemIcons";

const NODE_LAYOUT: Record<
  string,
  { x: number; y: number; icon: EcosystemIconComponent; label: string }
> = {
  core: { x: 50, y: 15, icon: CentralizedIcon, label: "KYBER PLATFORM" },
  "kyber-hci": { x: 19, y: 54, icon: HypervisorIcon, label: "KYBER HCI" },
  marsloq: { x: 50, y: 54, icon: ObservabilityIcon, label: "MARSLOQ" },
  krg: { x: 81, y: 54, icon: SecurityShieldIcon, label: "KRG GUARD" },
  "kyber-management": { x: 50, y: 89, icon: CentralizedIcon, label: "KYBER MANAGEMENT" },
};

const SVG_POS: Record<string, { x: number; y: number }> = {
  core: { x: 400, y: 70 },
  "kyber-hci": { x: 150, y: 250 },
  marsloq: { x: 400, y: 250 },
  krg: { x: 650, y: 250 },
  "kyber-management": { x: 400, y: 410 },
};

function nodeColor(id: string) {
  if (id === "core" || id === "kyber-management") return "#111111";
  return products.find((p) => p.id === id)?.accent ?? "#525252";
}

function EcosystemNode({ id }: { id: string }) {
  const node = NODE_LAYOUT[id];
  if (!node) return null;

  const color = nodeColor(id);
  const Icon = node.icon;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <div
        className="flex items-center gap-2.5 rounded-lg border bg-white px-3 py-2 shadow-sm min-w-[148px]"
        style={{ borderColor: color }}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: `${color}14`, color }}
        >
          <Icon size={18} />
        </div>
        <span
          className="text-[10px] font-semibold leading-tight tracking-wide"
          style={{ color }}
        >
          {node.label}
        </span>
      </div>
    </div>
  );
}

export default function ConnectedSection() {
  const displayNodes = ["kyber-hci", "marsloq", "krg", "kyber-management"];
  const allNodes = ["core", ...displayNodes];

  return (
    <section id="connected" className="relative py-24 md:py-32 bg-[var(--bg-subtle)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-eyebrow mb-2">Ecosystem</p>
          <h2 className="section-title">Everything Connected.</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard className="max-w-4xl mx-auto p-4 md:p-8 bg-white border border-[var(--border)] shadow-sm">
            <div className="relative w-full aspect-[800/460]">
              <svg
                viewBox="0 0 800 460"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-hidden
              >
                {displayNodes.map((id) => (
                  <line
                    key={`core-${id}`}
                    x1={SVG_POS.core.x}
                    y1={SVG_POS.core.y}
                    x2={SVG_POS[id]?.x ?? 400}
                    y2={SVG_POS[id]?.y ?? 250}
                    stroke="rgba(17,17,17,0.15)"
                    strokeWidth="1.5"
                  />
                ))}
                {displayNodes.map((id) => (
                  <line
                    key={`mgmt-${id}`}
                    x1={SVG_POS["kyber-management"].x}
                    y1={SVG_POS["kyber-management"].y}
                    x2={SVG_POS[id]?.x ?? 400}
                    y2={SVG_POS[id]?.y ?? 250}
                    stroke="rgba(82,82,82,0.12)"
                    strokeWidth="1.5"
                  />
                ))}
                <path
                  d="M150 250 C 280 330, 520 330, 650 250"
                  fill="none"
                  stroke="rgba(82,82,82,0.15)"
                  strokeWidth="1.5"
                />

                <circle r="3" fill="#111111" className="flow-dot" style={{ offsetPath: "path('M150 250 L400 250')" }} />
                <circle r="3" fill="#525252" className="flow-dot" style={{ offsetPath: "path('M150 250 C 280 330, 520 330, 650 250')", animationDelay: "0.8s" }} />
                <circle r="3" fill="#737373" className="flow-dot" style={{ offsetPath: "path('M400 250 L400 410')", animationDelay: "1.6s" }} />
                <circle r="3" fill="#111111" className="flow-dot" style={{ offsetPath: "path('M400 70 L150 250')", animationDelay: "2.2s" }} />
              </svg>

              {allNodes.map((id) => (
                <EcosystemNode key={id} id={id} />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
