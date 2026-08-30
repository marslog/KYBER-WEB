"use client";

import Link from "next/link";
import { WHY_KYBER_PILLARS } from "@/data/platformData";
import { getIcon } from "@/lib/icons";

export default function HeroFeatureCards() {
  return (
    <section className="bg-[var(--bg-subtle)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-lg overflow-hidden">
          {WHY_KYBER_PILLARS.map((pillar) => {
            const Icon = getIcon(pillar.icon);
            return (
              <div key={pillar.id} className="bg-white p-6 lg:p-8">
                <Icon className="w-5 h-5 text-[var(--text)] mb-4" strokeWidth={1.5} />
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  {pillar.subtitle}
                </p>
                <h3 className="text-base font-semibold mb-2">{pillar.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
