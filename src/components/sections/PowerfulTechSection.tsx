"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as LucideNS from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ENTERPRISE_HARDWARE_APPLIANCE } from "@/data/marsloqScreenshots";
import { getIcon } from "@/lib/icons";

const L = LucideNS as unknown as Record<string, LucideIcon>;
const CheckIcon = L.Check;

const HIGHLIGHT_ICONS: Record<string, string> = {
  "HCI Clustering": "Server",
  "Storage Mesh": "HardDrive",
  "Log Automation": "Activity",
  "AI Security": "ShieldCheck",
  "Network Monitor": "Network",
  "Local AI Chat": "MessageCircle",
};

export default function PowerfulTechSection() {
  const appliance = ENTERPRISE_HARDWARE_APPLIANCE;

  return (
    <section
      id="why-kyber"
      data-product="hardware"
      className="hardware-showcase section-shell border-b border-[var(--border)] enterprise-section"
    >
      <div className="hardware-showcase__atmosphere" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-[1]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="hardware-showcase__visuals">
            <div className="hardware-showcase__ambient" aria-hidden />
            {appliance.models.map((model, index) => (
              <motion.figure
                key={model.name}
                className="hardware-showcase__item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <div className="hardware-showcase__stage">
                  <span
                    className={`hardware-showcase__badge ${
                      model.badgeTone === "kyber"
                        ? "hardware-showcase__badge--kyber"
                        : "hardware-showcase__badge--marsloq"
                    }`}
                  >
                    {model.formFactor}
                  </span>
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    quality={100}
                    unoptimized
                    className="hardware-showcase__image"
                    sizes="(max-width: 1024px) 90vw, 480px"
                    priority={index === 0}
                  />
                </div>
                <figcaption className="hardware-showcase__caption">{model.name}</figcaption>
              </motion.figure>
            ))}
          </div>

          <motion.div
            className="hardware-showcase__copy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div>
              <p className="enterprise-section-kicker mb-3">{appliance.eyebrow}</p>
              <h2 className="hardware-showcase__title">{appliance.title}</h2>
              <p className="hardware-showcase__lede">{appliance.description}</p>
            </div>

            {appliance.metrics && (
              <ul className="hardware-showcase__metrics" aria-label="Appliance highlights">
                {appliance.metrics.map((metric) => (
                  <li key={metric.label} className="hardware-showcase__metric">
                    <span className="hardware-showcase__metric-value">{metric.value}</span>
                    <span className="hardware-showcase__metric-label">{metric.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <ul className="hardware-showcase__chips" aria-label="Built-in capabilities">
              {appliance.highlights.map((label) => {
                const Icon = getIcon(HIGHLIGHT_ICONS[label] ?? "Activity");
                return (
                  <li key={label} className="hardware-showcase__chip">
                    <Icon className="hardware-showcase__chip-icon" strokeWidth={1.5} aria-hidden />
                    {label}
                  </li>
                );
              })}
            </ul>

            <div className="hardware-showcase__tiles">
              {appliance.models.map((model) => (
                <div key={model.name} className="hardware-showcase__tile">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="hardware-showcase__tile-title">{model.name}</h3>
                    <span
                      className={`text-[0.62rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        model.badgeTone === "kyber"
                          ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                          : "bg-[var(--marsloq-accent-soft)] text-[var(--marsloq-accent)]"
                      }`}
                    >
                      {model.formFactor}
                    </span>
                  </div>
                  <p className="hardware-showcase__tile-desc">{model.description}</p>
                </div>
              ))}
            </div>

            {appliance.bullets && (
              <ul className="hardware-showcase__bullets">
                {appliance.bullets.map((bullet) => (
                  <li key={bullet}>
                    <CheckIcon className="hardware-showcase__bullet-icon" strokeWidth={2} aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            <div className="hardware-showcase__actions flex flex-wrap gap-3">
              <Link href="/products/hci" className="kyber-btn-primary gap-2">
                Explore KYBER HCI
                <ArrowRight className="kyber-arrow w-4 h-4" />
              </Link>
              <Link href="/products/marsloq" className="kyber-btn-secondary gap-2">
                Explore MARSLOQ
                <ArrowRight className="kyber-arrow w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

