"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SHOWCASE_CARDS = [
  {
    id: "hci",
    label: "KYBER HCI",
    accent: "var(--kyber-accent)",
    image: "/assets/screenshots/kyber-hci-hero-showcase.jpg",
    delay: 0,
  },
  {
    id: "marsloq",
    label: "MARSLOQ",
    accent: "var(--marsloq-accent)",
    image: "/assets/screenshots/marsloq-hero-showcase.jpg",
    delay: 0.15,
  },
];

export default function PlatformShowcaseBanner() {
  return (
    <section
      id="platform-showcase"
      className="platform-showcase-banner relative overflow-hidden border-b border-[var(--border)] pt-28 md:pt-32"
      aria-label="KYBER platform showcase"
    >
      <div className="platform-showcase-banner__bg" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="relative z-10 max-w-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4">
              KYBER HCI & MARSLOQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] text-white">
              The Future of{" "}
              <span className="text-[var(--brand-light)]">Hyper-Converged</span> Infrastructure.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--text-muted-on-dark)] leading-relaxed max-w-md">
              Enterprise HCI plus centralized log management — ingest syslog and infrastructure logs on any hardware.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="#product-highlights" className="kyber-btn-primary gap-2">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products/log-management" className="kyber-btn-on-dark">
                Log Management
              </Link>
            </div>
          </motion.div>

          <div className="platform-showcase-banner__media relative h-[340px] sm:h-[420px] lg:h-[500px] xl:h-[540px]">
            {SHOWCASE_CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: card.delay }}
                className={`platform-showcase-banner__card platform-showcase-banner__card--${card.id}`}
                style={{ zIndex: index === 0 ? 2 : 1, ["--card-accent" as string]: card.accent }}
              >
                <div className="platform-showcase-banner__card-inner">
                  <div className="platform-showcase-banner__card-chrome">
                    <span className="platform-showcase-banner__dot" />
                    <span className="platform-showcase-banner__dot" />
                    <span className="platform-showcase-banner__dot" />
                    <span className="platform-showcase-banner__card-label">{card.label}</span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      unoptimized
                      className="showcase-media-sharpen object-cover object-center"
                      sizes="(max-width: 1024px) 75vw, 420px"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
