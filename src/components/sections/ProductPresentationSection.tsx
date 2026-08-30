"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  KYBER_HCI_PRESENTATION,
  MARSLOQ_PRESENTATION,
} from "@/data/presentationContent";
import { getIcon } from "@/lib/icons";

export default function ProductPresentationSection() {
  return (
    <section id="product-highlights" className="py-20 md:py-28 bg-white border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <ProductBlock product={KYBER_HCI_PRESENTATION} href="/products/hci" />
        <ProductBlock product={MARSLOQ_PRESENTATION} href="/products/marsloq" reversed />
      </div>
    </section>
  );
}

function ProductBlock({
  product,
  href,
  reversed = false,
}: {
  product: typeof KYBER_HCI_PRESENTATION;
  href: string;
  reversed?: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      <div className={reversed ? "lg:order-2" : ""}>
        <p className="section-eyebrow mb-2">{product.eyebrow}</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{product.name}</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">{product.summary}</p>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
          {product.features.map((feature) => {
            const Icon = getIcon(feature.icon);
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-3 text-center"
                title={feature.title}
              >
                <Icon className="w-5 h-5 text-[var(--text)]" strokeWidth={1.5} />
                <span className="text-[10px] font-medium leading-tight text-[var(--text-secondary)]">
                  {feature.title}
                </span>
              </div>
            );
          })}
        </div>

        {product.licensing && (
          <div className="flex flex-wrap gap-2 mb-6">
            {product.licensing.map((tier) => (
              <span
                key={tier}
                className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
              >
                {tier}
              </span>
            ))}
          </div>
        )}

        <Link href={href} className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
          Explore <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className={`screenshot-frame ${reversed ? "lg:order-1" : ""}`}>
        <div className="relative aspect-[16/10] bg-[var(--bg-subtle)]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
