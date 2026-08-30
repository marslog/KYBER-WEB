"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  KYBER_HCI_PRESENTATION,
  MARSLOQ_PRESENTATION,
} from "@/data/presentationContent";
import ProductShowcaseCard from "@/components/sections/ProductShowcaseCard";

const PRODUCTS = [
  { product: KYBER_HCI_PRESENTATION, href: "/products/hci", reversed: false },
  { product: MARSLOQ_PRESENTATION, href: "/products/marsloq", reversed: true },
];

const PLATFORM_PILLARS = [
  { label: "Hyper-converged", tone: "hci" as const },
  { label: "Observability", tone: "marsloq" as const },
  { label: "On-premise first", tone: "neutral" as const },
];

export default function ProductHighlightsSection() {
  return (
    <section id="product-highlights" className="platform-showcase">
      <div className="platform-showcase__header section-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="platform-showcase__intro"
        >
          <p className="enterprise-section-kicker enterprise-section-kicker--center mb-3">Platform</p>
          <h2 className="platform-showcase__title">
            <span>Enterprise infrastructure.</span>
            <span>&amp; observability.</span>
          </h2>
          <p className="platform-showcase__lede">
            Two platforms, one vision — unified digital infrastructure for every workload.
          </p>
          <ul className="platform-showcase__pillars" aria-label="Platform capabilities">
            {PLATFORM_PILLARS.map((pillar) => (
              <li
                key={pillar.label}
                className={`platform-showcase__pillar platform-showcase__pillar--${pillar.tone}`}
              >
                <span className="platform-showcase__pillar-dot" aria-hidden />
                {pillar.label}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="platform-showcase__bridge" aria-hidden>
          <span className="platform-showcase__bridge-node platform-showcase__bridge-node--hci" />
          <span className="platform-showcase__bridge-line" />
          <span className="platform-showcase__bridge-node platform-showcase__bridge-node--marsloq" />
        </div>
      </div>

      <div className="platform-showcase__products">
        {PRODUCTS.map(({ product, href, reversed }, index) => (
          <Fragment key={product.id}>
            {index > 0 && (
              <div className="platform-showcase__row-divider" aria-hidden>
                <span className="platform-showcase__row-divider-line" />
                <span className="platform-showcase__row-divider-label">Unified digital stack</span>
                <span className="platform-showcase__row-divider-line" />
              </div>
            )}
            <ProductShowcaseCard
              product={product}
              href={href}
              index={index}
              reversed={reversed}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
