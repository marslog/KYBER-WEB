"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FLOAT_CARDS = [
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
  const sceneRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [14, -14]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="platform-showcase"
      className="platform-3d-banner relative overflow-hidden border-b border-[var(--border)] pt-28 md:pt-32"
      aria-label="KYBER platform showcase"
    >
      <div className="platform-3d-banner__bg" aria-hidden />

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
              Unified infrastructure and log intelligence — on any hardware.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="#product-highlights" className="kyber-btn-primary gap-2">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products/marsloq" className="kyber-btn-on-dark">
                MARSLOQ
              </Link>
            </div>
          </motion.div>

          <div
            ref={sceneRef}
            className="platform-3d-banner__scene relative h-[340px] sm:h-[420px] lg:h-[500px] xl:h-[540px]"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="platform-3d-banner__grid-floor" aria-hidden />

            <motion.div
              className="platform-3d-banner__stage absolute inset-0 flex items-center justify-center"
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
            >
              {FLOAT_CARDS.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 40, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: card.delay }}
                  className={`platform-3d-banner__card platform-3d-banner__card--${card.id}`}
                  style={{ zIndex: index === 0 ? 2 : 1, ["--card-accent" as string]: card.accent }}
                >
                  <div className="platform-3d-banner__card-inner">
                    <div className="platform-3d-banner__card-chrome">
                      <span className="platform-3d-banner__dot" />
                      <span className="platform-3d-banner__dot" />
                      <span className="platform-3d-banner__dot" />
                      <span className="platform-3d-banner__card-label">{card.label}</span>
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

              <motion.div
                className="platform-3d-banner__orb platform-3d-banner__orb--blue"
                animate={{ y: [0, -16, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <motion.div
                className="platform-3d-banner__orb platform-3d-banner__orb--amber"
                animate={{ y: [0, 12, 0], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                aria-hidden
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
