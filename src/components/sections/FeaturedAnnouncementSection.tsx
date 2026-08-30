"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FEATURED_ANNOUNCEMENT } from "@/data/platformData";
import { FEATURED_ANNOUNCEMENT_IMAGE } from "@/data/marsloqScreenshots";
import { MARSLOQ_FEATURE_CHIPS } from "@/data/presentationContent";
import { getIcon } from "@/lib/icons";

export default function FeaturedAnnouncementSection() {
  const item = FEATURED_ANNOUNCEMENT;

  return (
    <section className="py-14 md:py-18 bg-white border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-5">
            <p className="section-eyebrow">{item.eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug">
              {item.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MARSLOQ_FEATURE_CHIPS.map((chip) => {
                const Icon = getIcon(chip.icon);
                return (
                  <div
                    key={chip.id}
                    className="flex flex-col items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-3 text-center"
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium leading-tight text-[var(--text-secondary)]">
                      {chip.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link href={item.cta.href} className="kyber-btn-primary inline-flex items-center gap-2">
              {item.cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="screenshot-frame">
            <div className="relative aspect-[16/10] w-full bg-[#0a0a0a]">
              <Image
                src={FEATURED_ANNOUNCEMENT_IMAGE}
                alt="MARSLOQ platform"
                fill
                priority
                quality={90}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
