import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductPageContent from "@/components/sections/ProductPageContent";
import StructuredData from "@/components/seo/StructuredData";
import { getAllProductSlugs, getProductBySlug } from "@/lib/productCatalog";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structuredData";
import {
  createPageMetadata,
  PRODUCT_KEYWORDS,
  PRODUCT_SEO_DESCRIPTIONS,
  PRODUCT_SEO_TITLES,
} from "@/lib/siteSeo";
import { LOG_MANAGEMENT_FAQ } from "@/data/seoFaq";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const LOG_PRODUCT_SLUGS = new Set(["marsloq", "log-management", "siem"]);

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return createPageMetadata({
    title: PRODUCT_SEO_TITLES[slug] ?? `${product.name} — KYBER`,
    description: PRODUCT_SEO_DESCRIPTIONS[slug] ?? product.description,
    path: `/products/${slug}`,
    keywords: PRODUCT_KEYWORDS[slug] ?? PRODUCT_KEYWORDS[product.slug] ?? [],
  });
}

function productStructuredData(slug: string, product: NonNullable<ReturnType<typeof getProductBySlug>>) {
  const path = `/products/${slug}`;
  const base: Record<string, unknown>[] = [
    buildWebPageJsonLd({
      name: PRODUCT_SEO_TITLES[slug] ?? product.name,
      description: PRODUCT_SEO_DESCRIPTIONS[slug] ?? product.description,
      path,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products/hci" },
      { name: product.name, path },
    ]),
  ];

  if (LOG_PRODUCT_SLUGS.has(slug)) {
    base.push(
      buildSoftwareApplicationJsonLd({
        name: slug === "log-management" ? "KYBER Log Management (MARSLOQ)" : "MARSLOQ",
        description: PRODUCT_SEO_DESCRIPTIONS[slug] ?? product.description,
        url: path,
        applicationCategory: "BusinessApplication",
      }),
      buildFaqJsonLd(LOG_MANAGEMENT_FAQ),
    );
  }

  return base;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <StructuredData data={productStructuredData(slug, product)} />
      <Navbar />
      <ProductPageContent product={product} />
      <Footer />
    </main>
  );
}
