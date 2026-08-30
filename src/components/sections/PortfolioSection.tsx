"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CASE_STUDIES, CASE_STUDY_CATEGORIES } from "@/data/platformData";

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((p) => p.category === activeCategory);

  return (
    <section id="case-studies" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0066ff]">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a1f44] mt-3">
            KYBER in Action
          </h2>
          <p className="text-[#5b6b82] mt-4 text-base">
            Real-world deployments across infrastructure modernization, ransomware resilience, and
            intelligent observability.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CASE_STUDY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[#0066ff] text-white shadow-lg shadow-[#0066ff]/25"
                  : "bg-white text-[#5b6b82] hover:text-[#0a1f44] border border-[#e2e8f0] hover:border-[#0066ff]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-[#0066ff]/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl group block"
            >
              <div className="h-48 relative overflow-hidden border-b border-[#e2e8f0]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[11px] font-bold text-[#0066ff] border border-[#0066ff]/25">
                  {p.product}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0a1f44]/80 text-[11px] font-bold text-white">
                  {p.category}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-[#0a1f44] group-hover:text-[#0066ff] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#5b6b82] leading-relaxed">{p.description}</p>
                <div className="pt-3 flex items-center gap-2 text-xs font-bold text-[#0066ff]">
                  <span>VIEW CASE STUDY</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
