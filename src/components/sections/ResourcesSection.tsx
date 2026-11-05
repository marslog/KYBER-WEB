"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { RESOURCE_CARDS, RESOURCES_SECTION } from "@/data/platformData";
import Reveal from "@/components/motion/Reveal";
import {
  staggerContainer,
  staggerItem,
  staggerItemReduced,
} from "@/lib/motion";

export default function ResourcesSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="resources" className="section-shell bg-white border-b border-[var(--border)] enterprise-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <p className="enterprise-section-kicker mb-3">{RESOURCES_SECTION.eyebrow}</p>
            <h2 className="section-title">{RESOURCES_SECTION.title}</h2>
            <p className="section-subtitle mt-3">{RESOURCES_SECTION.subtitle}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href={RESOURCES_SECTION.viewAllHref}
              className="kyber-link inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:underline shrink-0"
            >
              {RESOURCES_SECTION.viewAllLabel}
              <ArrowRight className="kyber-arrow w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-32px" }}
        >
          {RESOURCE_CARDS.map((resource) => (
            <motion.div
              key={resource.id}
              variants={reducedMotion ? staggerItemReduced : staggerItem}
            >
              <Link
                href={resource.href}
                className="resource-card group bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--brand)] hover:shadow-[0_12px_32px_rgba(0,87,184,0.08)] transition-all duration-300 block h-full relative"
              >
                {/* Brand accent line on hover */}
                <span
                  className="absolute inset-x-0 top-0 h-0.5 bg-[var(--brand)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  aria-hidden
                />
                {resource.image ? (
                  <div className="resource-card__image relative h-36 border-b border-[var(--border)] bg-[var(--bg-muted)] overflow-hidden">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="flex h-36 items-center justify-center border-b border-[var(--border)] bg-[var(--bg-muted)]">
                    <FileText className="w-8 h-8 text-[var(--text-muted)]" strokeWidth={1.25} aria-hidden="true" />
                  </div>
                )}
                <div className="p-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                      {resource.type}
                    </p>
                    <h3 className="text-sm font-semibold leading-snug group-hover:text-[var(--brand)] transition-colors duration-200">{resource.title}</h3>
                  </div>
                  <ArrowRight className="kyber-arrow w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] shrink-0 transition-colors duration-200" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
