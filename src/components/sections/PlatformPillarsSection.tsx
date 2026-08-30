"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLATFORM_PILLARS } from "@/data/platformData";
import { getIcon } from "@/lib/icons";

export default function PlatformPillarsSection() {
  return (
    <section id="platform-overview" className="py-20 md:py-28 bg-white border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-eyebrow mb-2">Platform</p>
          <h2 className="section-title">One platform. Run anywhere.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PLATFORM_PILLARS.map((pillar) => {
            const Icon = getIcon(pillar.icon);
            return (
              <Link
                key={pillar.id}
                href={pillar.href}
                className="group flex flex-col items-start rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-6 hover:border-[var(--border-strong)] transition-colors"
              >
                <Icon className="w-6 h-6 text-[var(--text)] mb-4" strokeWidth={1.5} />
                <h3 className="text-base font-semibold mb-2">{pillar.title}</h3>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] group-hover:gap-2 transition-all mt-auto">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
