"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { PlatformStackLayer, PresentationFeature } from "@/data/presentationContent";
import { getIcon } from "@/lib/icons";

export default function IsometricPlatformStack({
  productId,
  caption,
  layers,
  features,
}: {
  productId: string;
  caption: string;
  layers: PlatformStackLayer[];
  features: PresentationFeature[];
}) {
  const floatingIcons = features.slice(0, 5);

  return (
    <div
      className={`platform-arch platform-arch--${productId === "marsloq" ? "marsloq" : "hci"}`}
      data-product={productId}
      aria-label={`${caption} architecture stack`}
    >
      <div className="platform-arch__bg-pattern" aria-hidden />
      <div className="platform-arch__glow platform-arch__glow--left" aria-hidden />
      <div className="platform-arch__glow platform-arch__glow--right" aria-hidden />

      <p className="platform-arch__caption">{caption}</p>

      <div className="iso-stack-scene">
        <svg className="iso-stack-scene__cables" viewBox="0 0 120 280" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <linearGradient id={`iso-cable-${productId}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M 24 260 C 24 200 20 140 28 80 C 32 50 40 30 60 20"
            fill="none"
            stroke={`url(#iso-cable-${productId})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 96 260 C 96 210 100 150 88 90 C 84 55 72 35 60 20"
            fill="none"
            stroke={`url(#iso-cable-${productId})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="60" cy="18" r="4" fill="currentColor" opacity="0.35" />
        </svg>

        {floatingIcons.length > 0 && (
          <motion.div
            className="iso-stack-scene__floaters"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            {floatingIcons.map((feature) => {
              const Icon = getIcon(feature.icon);
              return (
                <span key={feature.id} className="iso-stack-scene__floater" title={feature.title}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden />
                </span>
              );
            })}
          </motion.div>
        )}

        <div className="iso-stack">
          {layers.map((layer, index) => {
            const Icon = getIcon(layer.icon);
            const isBase = index === 0;

            return (
              <motion.div
                key={layer.id}
                className={`iso-stack__layer ${isBase ? "iso-stack__layer--base" : ""}`}
                style={{ "--layer-i": index } as CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="iso-stack__slab">
                  <div className="iso-stack__slab-top" aria-hidden />
                  <div className="iso-stack__slab-side" aria-hidden />
                  <div className="iso-stack__slab-front">
                    <span className="iso-stack__icon" aria-hidden>
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </span>
                    <span className="iso-stack__copy">
                      <strong>{layer.label}</strong>
                      <em>{layer.subtitle}</em>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ul className="platform-arch__features">
        {features.slice(0, 4).map((feature, index) => {
          const Icon = getIcon(feature.icon);
          return (
            <motion.li
              key={feature.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.06 }}
              className="platform-arch__feature"
            >
              <span className="platform-arch__feature-icon" aria-hidden>
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
              </span>
              <span className="platform-arch__feature-text">
                <strong>{feature.title}</strong>
                <em>{feature.description}</em>
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
