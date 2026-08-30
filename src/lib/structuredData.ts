import type { SeoFaqItem } from "@/data/seoFaq";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/siteSeo";

export function buildFaqJsonLd(items: SeoFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildSoftwareApplicationJsonLd(options: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.url),
    applicationCategory: options.applicationCategory ?? "BusinessApplication",
    operatingSystem: options.operatingSystem ?? "Linux, Windows Server",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contact#contact-form"),
    },
    provider: {
      "@type": "Organization",
      name: "KYBER Technology Co., Ltd.",
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildWebPageJsonLd(options: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
