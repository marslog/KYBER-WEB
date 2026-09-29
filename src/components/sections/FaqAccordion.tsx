"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import type { SeoFaqItem } from "@/data/seoFaq";

interface FaqAccordionProps {
  items: SeoFaqItem[];
  title?: string;
  eyebrow?: string;
  subtitle?: string;
}

export default function FaqAccordion({
  items,
  title = "Frequently Asked Questions",
  eyebrow = "FAQ & Compliance",
  subtitle = "คำตอบสำหรับข้อสงสัยที่พบบ่อยเกี่ยวกับการจัดเก็บ Log ตาม พ.ร.บ. คอมพิวเตอร์ และการใช้งานระบบ MARSLOQ",
}: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--border)]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {eyebrow && (
            <p className="section-eyebrow mb-2 inline-flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand)]" />
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={item.question}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] transition-colors duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-[var(--text)] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center bg-white transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[var(--brand-soft)] border-[var(--brand)]" : ""
                    }`}
                  >
                    <ChevronDown
                      className="w-4 h-4 text-[var(--text-secondary)] transition-colors"
                      style={{ color: isOpen ? "var(--brand)" : undefined }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)]/60 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
