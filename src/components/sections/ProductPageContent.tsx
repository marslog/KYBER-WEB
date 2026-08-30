import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ArrowRight } from "lucide-react";
import type { ProductPageData } from "@/lib/productCatalog";
import { getIcon } from "@/lib/icons";
import HciControlPlaneDiagram from "@/components/sections/diagrams/HciControlPlaneDiagram";
import { HCI_CONTROL_PLANE } from "@/data/hciControlPlane";

export default function ProductPageContent({ product }: { product: ProductPageData }) {
  const themeKey = product.logo?.includes("marsloq")
    ? "marsloq"
    : product.logo?.includes("kyber-hci")
      ? "kyber-hci"
      : undefined;

  return (
    <div data-product={themeKey}>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#product-highlights"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to platform
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div className="flex items-start gap-4 mb-4">
                {product.logo && (
                  <div className="shrink-0 rounded-lg bg-white/50 p-2">
                    <Image
                      src={product.logo}
                      alt={product.logoAlt ?? product.name}
                      width={120}
                      height={80}
                      unoptimized
                      className="h-14 sm:h-16 w-auto object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="section-eyebrow mb-2">{product.category}</p>
                  {product.badge && (
                    <span className="inline-block text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)] mb-3">
                      {product.badge}
                    </span>
                  )}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                    {product.name}
                  </h1>
                </div>
              </div>
              <p className="text-lg text-[var(--text-secondary)] mb-4">{product.tagline}</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                {product.description}
              </p>

              {product.licensing && (
                <div className="flex flex-wrap gap-2 mt-6">
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
            </div>

            <div className="screenshot-frame">
              <div
                className="relative w-full bg-[#f7f7f5]/50"
                style={{ aspectRatio: product.imageAspect.replace("/", " / ") }}
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-6">Capabilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {product.features.map((feature) => {
              const Icon = getIcon(feature.icon);
              return (
                <div
                  key={feature.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 hover:border-[var(--product-accent)] transition-colors"
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color: "var(--product-accent)" }} />
                  <span className="text-sm font-medium text-[var(--text)] leading-snug">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>

          {product.capabilities.length > product.features.length && (
            <ul className="mt-8 grid sm:grid-cols-2 gap-2">
              {product.capabilities.slice(product.features.length).map((item) => (
                <li key={item} className="text-sm text-[var(--text-secondary)] flex gap-2">
                  <span className="text-[var(--text-muted)]">—</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {themeKey === "kyber-hci" && (
        <section className="py-16 md:py-24 bg-white border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-eyebrow mb-3">{HCI_CONTROL_PLANE.eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight max-w-2xl">
              {HCI_CONTROL_PLANE.heading}
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {HCI_CONTROL_PLANE.intro}
            </p>
            <div className="mt-10">
              <HciControlPlaneDiagram />
            </div>
          </div>
        </section>
      )}

      <section id="project-registration" className="py-16 md:py-20 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">See {product.name} in action</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Register your project for a live demonstration tailored to your infrastructure.
          </p>
          <Link href="/contact" className="kyber-btn-primary inline-flex items-center gap-2">
            Register project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
