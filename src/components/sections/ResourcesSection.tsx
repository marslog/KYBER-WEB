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
              <ArrowRight className="kyber-arrow w-4 h-4" />
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
                className="resource-card group bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--brand)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)] transition-all block h-full"
              >
                {resource.image ? (
                  <div className="resource-card__image relative h-32 border-b border-[var(--border)] bg-[var(--bg-muted)]">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover object-top"
                      sizes="25vw"
                    />
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center border-b border-[var(--border)] bg-[var(--bg-muted)]">
                    <FileText className="w-8 h-8 text-[var(--text-muted)]" strokeWidth={1.25} />
                  </div>
                )}
                <div className="p-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      {resource.type}
                    </p>
                    <h3 className="text-sm font-semibold leading-snug">{resource.title}</h3>
                  </div>
                  <ArrowRight className="kyber-arrow w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
