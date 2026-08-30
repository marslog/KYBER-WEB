"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { KYBER_REF_TITLE } from "@/data/platformData";
import { KYBER_REF_LOGOS } from "@/data/kyberRefLogos";
import { KYBER_REF_CONTENT } from "@/data/kyberRefContent";

export default function ProductsCategorySection() {
  return (
    <section
      id="kyber-ref"
      className="kyber-ref section-shell bg-white border-b border-[var(--border)] enterprise-section"
    >
      <div className="kyber-ref__atmosphere" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <motion.div
          className="kyber-ref__header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="enterprise-section-kicker mb-3">{KYBER_REF_CONTENT.eyebrow}</p>
          <h2 className="section-title">{KYBER_REF_TITLE}</h2>
          <p className="section-subtitle mt-3 max-w-2xl">{KYBER_REF_CONTENT.subtitle}</p>

          <ul className="kyber-ref__metrics" aria-label="Reference footprint">
            {KYBER_REF_CONTENT.metrics.map((metric) => (
              <li key={metric.label} className="kyber-ref__metric">
                <span className="kyber-ref__metric-value">{metric.value}</span>
                <span className="kyber-ref__metric-label">{metric.label}</span>
              </li>
            ))}
          </ul>

          <ul className="kyber-ref__pillars" aria-label="Industries served">
            {KYBER_REF_CONTENT.pillars.map((pillar) => (
              <li key={pillar.label} className={`kyber-ref__pillar kyber-ref__pillar--${pillar.tone}`}>
                {pillar.label}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="kyber-ref__divider" aria-hidden>
          <span className="kyber-ref__divider-line" />
          <span className="kyber-ref__divider-label">Reference customers</span>
          <span className="kyber-ref__divider-line" />
        </div>

        <div className="kyber-ref__grid">
          {KYBER_REF_LOGOS.map((logo, index) => (
            <motion.div
              key={logo.name}
              className="kyber-ref-tile kyber-ref__tile"
              title={logo.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
            >
              <div className="relative h-16 md:h-[4.5rem] w-full">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 50vw, 220px"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
