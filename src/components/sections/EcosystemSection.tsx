"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-24 md:py-32 bg-[var(--bg-subtle)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="section-eyebrow mb-3">Ecosystem</p>
          <h2 className="section-title mb-4">Connected by design</h2>
          <p className="section-subtitle">
            Every KYBER product works as part of one platform — infrastructure, observability, and security unified.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white border border-[var(--border)] rounded-lg p-6 hover:border-[var(--border-strong)] transition-colors"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2">{p.category}</p>
              <h3 className="text-base font-semibold mb-1">{p.name}</h3>
              <p className="text-xs text-[var(--text-muted)] mb-3">{p.tagline}</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">{p.description}</p>
              <Link href={p.href} className="inline-flex items-center gap-1 text-xs font-medium hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
