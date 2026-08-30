"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as LucideNS from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PresentationProduct } from "@/data/presentationContent";
import PlatformArchitectureDiagram from "@/components/sections/PlatformArchitectureDiagram";
import { getIcon } from "@/lib/icons";

const L = LucideNS as unknown as Record<string, LucideIcon>;
const CheckIcon = L.Check;

export default function ProductShowcaseCard({
  product,
  href,
  index = 0,
  reversed = false,
}: {
  product: PresentationProduct;
  href: string;
  index?: number;
  reversed?: boolean;
}) {
  const rich = Boolean(product.showcaseHighlights?.length);

  return (
    <motion.article
      data-product={product.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`platform-product-row group ${reversed ? "platform-product-row--reversed" : ""} ${rich ? "platform-product-row--rich" : ""}`}
    >
      <div className="platform-product-row__media">
        <div className="platform-product-row__ambient" aria-hidden />
        <div className={`platform-product-row__frame platform-product-row__frame--${product.id}`}>
          <PlatformArchitectureDiagram product={product} />
        </div>
      </div>

      <div className="platform-product-row__content">
        <div className="platform-product-row__content-inner">
          <div className="platform-product-row__brand">
            <div className="platform-product-row__logo-wrap">
              <Image
                src={product.logo}
                alt={product.logoAlt}
                width={Math.round(product.logoHeight * 0.55)}
                height={product.logoHeight}
                unoptimized
                className="platform-product-row__logo"
              />
            </div>
            <div className="platform-product-row__brand-meta">
              <p className="enterprise-section-kicker">{product.eyebrow}</p>
              <h3 className="platform-product-row__headline">{product.name}</h3>
            </div>
          </div>

          <p className="platform-product-row__tagline">{product.tagline}</p>

          <div className="platform-product-row__copy">
            <p>{product.summary}</p>
            {product.lead && <p className="platform-product-row__copy-lead">{product.lead}</p>}
          </div>

          {rich && product.showcaseMetrics && (
            <ul className="platform-product-row__metrics" aria-label="Platform highlights">
              {product.showcaseMetrics.map((metric) => (
                <li key={metric.label} className="platform-product-row__metric">
                  <span className="platform-product-row__metric-value">{metric.value}</span>
                  <span className="platform-product-row__metric-label">{metric.label}</span>
                </li>
              ))}
            </ul>
          )}

          {rich && product.showcaseHighlights && (
            <ul className="platform-product-row__highlights">
              {product.showcaseHighlights.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <li key={item.id} className="platform-product-row__highlight">
                    <span className="platform-product-row__highlight-icon" aria-hidden>
                      <Icon strokeWidth={1.5} />
                    </span>
                    <div className="platform-product-row__highlight-body">
                      <span className="platform-product-row__highlight-title">{item.title}</span>
                      <span className="platform-product-row__highlight-desc">{item.description}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {rich && product.showcaseBullets && (
            <ul className="platform-product-row__bullets">
              {product.showcaseBullets.map((bullet) => (
                <li key={bullet}>
                  <CheckIcon className="platform-product-row__bullet-icon" strokeWidth={2} aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          <div className="platform-product-row__actions">
            <Link href={href} className="kyber-btn-primary gap-2">
              Explore {product.name}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {product.licensing && (
              <div className="platform-product-row__tiers">
                {product.licensing.map((tier) => (
                  <span key={tier} className="kyber-pill">
                    {tier}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
