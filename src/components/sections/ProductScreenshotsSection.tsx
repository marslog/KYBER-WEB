"use client";

import { useState } from "react";
import Image from "next/image";
import { MARSLOQ_SCREENSHOT_GROUPS } from "@/data/marsloqScreenshots";
import DashboardScreenshot from "@/components/ui/DashboardScreenshot";

export default function ProductScreenshotsSection() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeShot, setActiveShot] = useState(0);

  const group = MARSLOQ_SCREENSHOT_GROUPS[activeGroup];
  const shot = group.screenshots[activeShot];

  return (
    <section id="product-screenshots" className="py-24 md:py-32 bg-[var(--bg-subtle)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="section-eyebrow mb-3">Product Interface</p>
          <h2 className="section-title mb-4">Built for enterprise operations</h2>
          <p className="section-subtitle">
            Real interfaces from the MARSLOQ observability platform and KYBER HCI management console.
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          {MARSLOQ_SCREENSHOT_GROUPS.map((g, i) => (
            <button
              key={g.id}
              onClick={() => { setActiveGroup(i); setActiveShot(0); }}
              className={`px-5 py-2.5 text-sm font-medium rounded-md transition-colors ${
                activeGroup === i
                  ? "bg-[var(--text)] text-white"
                  : "bg-white text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-strong)]"
              }`}
            >
              {g.product}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2">
              {group.portal}
            </p>
            <h3 className="text-xl font-semibold mb-2">{group.product}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{group.description}</p>

            <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
              {group.screenshots.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveShot(i)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors border ${
                    activeShot === i
                      ? "bg-white border-[var(--border-strong)] shadow-sm"
                      : "border-transparent hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{s.title}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{s.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            {shot.id === "admin-dashboard" || shot.id === "analytics-dashboard" ? (
              <DashboardScreenshot src={shot.image} alt={`${group.product} - ${shot.title}`} />
            ) : (
              <div className="screenshot-frame">
                <div className="px-4 py-3 border-b border-[var(--border)] bg-white flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{shot.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{group.product} · {shot.category}</p>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    {activeShot + 1} / {group.screenshots.length}
                  </span>
                </div>
                <div className="relative aspect-[16/10] bg-[var(--bg-muted)]">
                  <Image
                    src={shot.image}
                    alt={`${group.product} - ${shot.title}`}
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                <div className="px-4 py-3 border-t border-[var(--border)] bg-white">
                  <p className="text-sm text-[var(--text-secondary)]">{shot.description}</p>
                </div>
              </div>
            )}
            {(shot.id === "admin-dashboard" || shot.id === "analytics-dashboard") && (
              <p className="mt-4 text-sm text-[var(--text-secondary)]">{shot.description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
