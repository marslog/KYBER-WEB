"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/data/platformData";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-[var(--bg-subtle)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="section-eyebrow mb-3">Testimonials</p>
          <h2 className="section-title">Trusted by enterprise teams</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="bg-white border border-[var(--border)] rounded-lg p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{t.product}</span>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--bg-muted)]">
                  <Image src={t.photo} alt={t.author} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-medium">{t.author}</div>
                  <div className="text-xs text-[var(--text-muted)]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
