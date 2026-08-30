"use client";

import * as LucideNS from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MARSLOQ_OBSERVABILITY as C } from "@/data/marsloqObservability";

const L = LucideNS as unknown as Record<string, LucideIcon>;

function Glyph({ name, className }: { name: string; className?: string }) {
  const Cmp = L[name] ?? L.Activity;
  return <Cmp className={className} strokeWidth={1.5} aria-hidden />;
}

export default function MarsloqObservabilityDiagram() {
  return (
    <div className="mqobs" data-product="marsloq">
      <div className="mqobs__ingress">
        <Glyph name={C.ingress.icon} className="mqobs__ingress-icon" />
        <span>{C.ingress.label}</span>
      </div>

      <span className="mqobs__stem" aria-hidden />

      <div className="mqobs__title">
        <span className="mqobs__title-main">{C.platform.title}</span>
        <span className="mqobs__title-sub">{C.platform.subtitle}</span>
      </div>

      <div className="mqobs__cluster">
        <div className="mqobs__node">
          <span className="mqobs__node-name">{C.nodes[0].name}</span>
          <div className="mqobs__layers">
            {C.nodes[0].layers.map((layer) => (
              <div className="mqobs__layer" key={layer.label}>
                <Glyph name={layer.icon} className="mqobs__layer-icon" />
                <span>{layer.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mqobs__spine" role="note" aria-label={`${C.hub.label} — ${C.hub.note}`}>
          <span className="mqobs__connector mqobs__connector--left" aria-hidden />
          <div className="mqobs__hub">
            <Glyph name={C.hub.icon} className="mqobs__hub-icon" />
            <span className="mqobs__hub-label">{C.hub.label}</span>
            <span className="mqobs__hub-note">{C.hub.note}</span>
          </div>
          <span className="mqobs__connector mqobs__connector--right" aria-hidden />
        </div>

        <div className="mqobs__node">
          <span className="mqobs__node-name">{C.nodes[1].name}</span>
          <div className="mqobs__layers">
            {C.nodes[1].layers.map((layer) => (
              <div className="mqobs__layer" key={layer.label}>
                <Glyph name={layer.icon} className="mqobs__layer-icon" />
                <span>{layer.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mqobs__pipeline-bar" aria-hidden>
        <span className="mqobs__pipeline-arm" />
        <span className="mqobs__link mqobs__link--pipeline">{C.pipeline}</span>
        <span className="mqobs__pipeline-arm" />
      </div>

      <p className="mqobs__privacy">{C.privacy}</p>

      <div className="mqobs__storage">
        <span className="mqobs__storage-label">{C.storage.label}</span>
        <div className="mqobs__tiers">
          {C.storage.tiers.map((tier, i) => (
            <span
              key={i}
              className={`mqobs__tier mqobs__tier--${tier.variant}`}
              title={tier.label}
            >
              {tier.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mqobs__services">
        {C.sharedServices.map((service) => (
          <span className="mqobs__service" key={service.label}>
            <Glyph name={service.icon} className="mqobs__service-icon" />
            {service.label}
          </span>
        ))}
      </div>
    </div>
  );
}
