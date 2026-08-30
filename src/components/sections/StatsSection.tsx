"use client";

import { PLATFORM_STATS } from "@/data/platformData";
import { getIcon } from "@/lib/icons";

export default function StatsSection() {
  return (
    <section className="py-20 bg-white border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-lg overflow-hidden">
          {PLATFORM_STATS.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.label} className="bg-white p-8 text-center">
                <Icon className="w-5 h-5 mx-auto mb-4 text-[var(--text-muted)]" strokeWidth={1.5} />
                <div className="text-3xl font-semibold tracking-tight mb-1">{item.value}</div>
                <div className="text-sm font-medium mb-1">{item.label}</div>
                <p className="text-xs text-[var(--text-muted)]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
