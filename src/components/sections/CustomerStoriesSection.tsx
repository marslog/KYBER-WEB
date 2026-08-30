"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CUSTOMER_STORIES } from "@/data/platformData";

export default function CustomerStoriesSection() {
  const [active, setActive] = useState(0);
  const story = CUSTOMER_STORIES[active];
  const prev = () => setActive((a) => (a === 0 ? CUSTOMER_STORIES.length - 1 : a - 1));
  const next = () => setActive((a) => (a === CUSTOMER_STORIES.length - 1 ? 0 : a + 1));

  return (
    <section id="customer-stories" className="py-24 bg-white border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-eyebrow mb-3">Customer stories</p>
            <h2 className="section-title">Proven at scale</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} aria-label="Previous" className="w-9 h-9 border border-[var(--border)] rounded-md flex items-center justify-center hover:border-[var(--border-strong)]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} aria-label="Next" className="w-9 h-9 border border-[var(--border)] rounded-md flex items-center justify-center hover:border-[var(--border-strong)]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="screenshot-frame">
            <div className="relative aspect-[4/3]">
              <Image src={story.image} alt={story.title} fill className="object-cover" sizes="50vw" />
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{story.industry}</p>
            <h3 className="text-2xl font-semibold leading-snug">{story.headline}</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">{story.description}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">{story.metric}</span>
              <span className="text-sm text-[var(--text-muted)]">{story.metricLabel}</span>
            </div>
            <Link href={story.href} className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
              Read case study <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
