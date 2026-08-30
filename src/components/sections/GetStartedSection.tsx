"use client";

import Link from "next/link";
import { GET_STARTED_CTAS, UPCOMING_EVENTS } from "@/data/platformData";
import { getIcon } from "@/lib/icons";

export default function GetStartedSection() {
  return (
    <section className="py-24 bg-white border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="section-eyebrow mb-3">Get started</p>
          <h2 className="section-title">Begin your evaluation</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-lg overflow-hidden mb-16">
          {GET_STARTED_CTAS.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.id} className="bg-white p-8">
                <Icon className="w-5 h-5 mb-5 text-[var(--text)]" strokeWidth={1.5} />
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">{item.description}</p>
                <Link href={item.href} className="text-sm font-medium underline underline-offset-4">{item.cta}</Link>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {UPCOMING_EVENTS.map((event) => (
            <div key={event.id} className="p-6 border border-[var(--border)] rounded-lg">
              <h4 className="font-semibold text-sm mb-2">{event.title}</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{event.description}</p>
              <Link href={event.href} className="text-sm font-medium">{event.cta} →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
