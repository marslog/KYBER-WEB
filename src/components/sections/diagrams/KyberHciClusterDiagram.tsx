"use client";

import * as LucideNS from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HCI_CLUSTER as C } from "@/data/hciCluster";

const L = LucideNS as unknown as Record<string, LucideIcon>;

function Glyph({ name, className }: { name: string; className?: string }) {
  const Cmp = L[name] ?? L.Server;
  return <Cmp className={className} strokeWidth={1.5} aria-hidden />;
}

export default function KyberHciClusterDiagram() {
  return (
    <div className="khci" data-product="kyber-hci">
      <div className="khci__cloud">
        <Glyph name={C.cloud.icon} className="khci__cloud-icon" />
        <span>{C.cloud.label}</span>
      </div>

      <span className="khci__stem" aria-hidden />

      <div className="khci__title">
        <span className="khci__title-main">{C.cluster.title}</span>
        <span className="khci__title-sub">{C.cluster.subtitle}</span>
      </div>

      <div className="khci__cluster">
        <div className="khci__node">
          <span className="khci__node-name">{C.nodes[0].name}</span>
          <div className="khci__layers">
            {C.nodes[0].layers.map((layer) => (
              <div className="khci__layer" key={layer.label}>
                <Glyph name={layer.icon} className="khci__layer-icon" />
                <span>{layer.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="khci__spine" role="note" aria-label={`${C.witness.label} — ${C.witness.note}`}>
          <span className="khci__connector khci__connector--left" aria-hidden />
          <div className="khci__witness">
            <Glyph name={C.witness.icon} className="khci__witness-icon" />
            <span className="khci__witness-label">{C.witness.label}</span>
            <span className="khci__witness-note">{C.witness.note}</span>
          </div>
          <span className="khci__connector khci__connector--right" aria-hidden />
        </div>

        <div className="khci__node">
          <span className="khci__node-name">{C.nodes[1].name}</span>
          <div className="khci__layers">
            {C.nodes[1].layers.map((layer) => (
              <div className="khci__layer" key={layer.label}>
                <Glyph name={layer.icon} className="khci__layer-icon" />
                <span>{layer.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="khci__repl-bar" aria-hidden>
        <span className="khci__repl-arm" />
        <span className="khci__link khci__link--repl">{C.replication}</span>
        <span className="khci__repl-arm" />
      </div>

      <p className="khci__failover">{C.failover}</p>

      <div className="khci__storage">
        <span className="khci__storage-label">{C.storage.label}</span>
        <div className="khci__disks">
          {C.storage.disks.map((disk, i) => (
            <span
              key={i}
              className={`khci__disk khci__disk--${disk}`}
              title={disk.toUpperCase()}
            >
              {disk.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="khci__services">
        {C.sharedServices.map((service) => (
          <span className="khci__service" key={service.label}>
            <Glyph name={service.icon} className="khci__service-icon" />
            {service.label}
          </span>
        ))}
      </div>
    </div>
  );
}
