"use client";

import { useEffect, useRef } from "react";
import * as LucideNS from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HCI_CONTROL_PLANE as C } from "@/data/hciControlPlane";

/**
 * The installed lucide-react build ships incomplete top-level type exports,
 * so resolve icons through the namespace at runtime (all glyphs exist there)
 * while keeping a typed LucideIcon surface.
 */
const L = LucideNS as unknown as Record<string, LucideIcon>;

const ICONS: Record<string, LucideIcon> = {
  UserCog: L.UserCog,
  SquareTerminal: L.SquareTerminal,
  Layers: L.Layers,
  ShieldCheck: L.ShieldCheck,
  LayoutGrid: L.LayoutGrid,
  Workflow: L.Workflow,
  ClipboardCheck: L.ClipboardCheck,
  Server: L.Server,
  Database: L.Database,
  Gauge: L.Gauge,
  Network: L.Network,
};

const ArrowLeftRight = L.ArrowLeftRight;

const WORKLOAD_ICON: Record<"vm" | "k8s" | "storage", LucideIcon> = {
  vm: L.Box,
  k8s: L.Boxes,
  storage: L.HardDrive,
};

const WORKLOAD_LABEL: Record<"vm" | "k8s" | "storage", string> = {
  vm: "Virtual machine",
  k8s: "Kubernetes",
  storage: "Storage",
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? L.Server;
  return <Cmp className={className} strokeWidth={1.5} aria-hidden />;
}

export default function HciControlPlaneDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="cpd" data-product="kyber-hci">
      {/* Management plane */}
      <div className="cpd__plane">
        <div className="cpd__actor">
          <span className="cpd__actor-badge">
            <Icon name={C.operators.icon} className="cpd__actor-icon" />
          </span>
          <span className="cpd__actor-label">{C.operators.label}</span>
        </div>

        <span className="cpd__link" aria-hidden>
          <ArrowLeftRight className="cpd__link-icon" strokeWidth={1.5} />
        </span>

        <div className="cpd__tools">
          <span className="cpd__tools-head">
            <Icon name={C.tools.icon} className="cpd__tools-icon" />
            {C.tools.title}
          </span>
          <ul className="cpd__tools-list">
            {C.tools.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <span className="cpd__link" aria-hidden>
          <ArrowLeftRight className="cpd__link-icon" strokeWidth={1.5} />
        </span>

        <div className="cpd__stack">
          <div className="cpd__services" role="list">
            {C.serviceGroups.map((group) => (
              <div className="cpd__service" role="listitem" key={group.label}>
                <span className="cpd__service-head">
                  <Icon name={group.icon} className="cpd__service-icon" />
                  {group.label}
                </span>
                <p className="cpd__service-items">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>

          <div className="cpd__manager">
            <div className="cpd__manager-title">
              <Icon name={C.controlPlane.icon} className="cpd__manager-icon" />
              <span>{C.controlPlane.title}</span>
            </div>
            <div className="cpd__quadrants">
              {C.controlPlane.quadrants.map((q) => (
                <div className="cpd__quadrant" key={q.label}>
                  <span className="cpd__quadrant-head">
                    <Icon name={q.icon} className="cpd__quadrant-icon" />
                    {q.label}
                  </span>
                  <p className="cpd__quadrant-items">{q.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cpd__fabric">
            <Icon name={C.fabric.icon} className="cpd__fabric-icon" />
            {C.fabric.label}
          </div>
        </div>
      </div>

      {/* Edge / on-premises */}
      <div className="cpd__edge">
        <span className="cpd__edge-label">{C.edge.label}</span>
        <div className="cpd__edge-grid">
          {C.edge.clusters.map((cluster, ci) => (
            <div className="cpd__node" key={ci}>
              <div className="cpd__workloads">
                {cluster.workloads.map((w, wi) => {
                  const WIcon = WORKLOAD_ICON[w];
                  return (
                    <span className="cpd__workload" key={wi} title={WORKLOAD_LABEL[w]}>
                      <WIcon strokeWidth={1.5} aria-label={WORKLOAD_LABEL[w]} />
                    </span>
                  );
                })}
              </div>
              <div
                className="cpd__rack"
                style={{ ["--racks" as string]: cluster.racks }}
              >
                {Array.from({ length: cluster.racks }).map((_, ri) => (
                  <span className="cpd__rack-unit" key={ri} aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="cpd__edge-note">{C.edge.note}</p>
      </div>
    </div>
  );
}
