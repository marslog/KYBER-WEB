import { ALL_PRODUCTS, NAV_STRUCTURE, type SubProduct } from "@/data/platformData";
import {
  KYBER_HCI_PRESENTATION,
  MARSLOQ_PRESENTATION,
  type PresentationFeature,
} from "@/data/presentationContent";

export interface ProductPageData extends SubProduct {
  slug: string;
  category: string;
  logo?: string;
  logoAlt?: string;
  image: string;
  imageAlt: string;
  imageAspect: string;
  features: PresentationFeature[];
  licensing?: string[];
}

const SLUG_ALIASES: Record<string, string> = {
  backup: "backup-dr",
  "disaster-recovery": "backup-dr",
  migration: "hci",
  "ransomware-protection": "krg",
  "security-monitoring": "krg",
  "log-management": "marsloq",
  siem: "marsloq",
  "ai-operations": "ai-ops",
};

const PRODUCT_IMAGES: Record<string, { image: string; imageAlt: string; imageAspect: string }> = {
  hci: {
    image: KYBER_HCI_PRESENTATION.image,
    imageAlt: KYBER_HCI_PRESENTATION.imageAlt,
    imageAspect: KYBER_HCI_PRESENTATION.imageAspect,
  },
  marsloq: {
    image: MARSLOQ_PRESENTATION.image,
    imageAlt: MARSLOQ_PRESENTATION.imageAlt,
    imageAspect: MARSLOQ_PRESENTATION.imageAspect,
  },
  ksv: {
    image: "/assets/marsloq/marslog-8110/04-virtual-machines.png",
    imageAlt: "KSV virtual machine management",
    imageAspect: "1440/900",
  },
  ksan: {
    image: "/assets/screenshots/kyber-hci-dashboard.png",
    imageAlt: "KSAN software-defined storage",
    imageAspect: "1440/1065",
  },
  management: {
    image: "/assets/screenshots/kyber-hci-dashboard.png",
    imageAlt: "KYBER Management console",
    imageAspect: "1440/1065",
  },
  krg: {
    image: "/assets/screenshots/marsloq-threat-intelligence.png",
    imageAlt: "KRG security monitoring",
    imageAspect: "16/10",
  },
  "backup-dr": {
    image: "/assets/marsloq/marslog-8110/05-vm-migration.png",
    imageAlt: "KYBER backup and disaster recovery",
    imageAspect: "1440/900",
  },
  "ai-ops": {
    image: "/assets/screenshots/marsloq-ai-operations-hero.jpg",
    imageAlt: "KYBER AI operations",
    imageAspect: "16/10",
  },
};

function slugFromHref(href: string): string {
  return href.replace("/products/", "");
}

function findNavCategory(slug: string): string {
  for (const group of NAV_STRUCTURE.products) {
    for (const item of group.items) {
      if (slugFromHref(item.href) === slug) {
        return group.category;
      }
    }
  }
  return "Platform";
}

function capabilitiesToFeatures(capabilities: string[]): PresentationFeature[] {
  return capabilities.map((title, index) => ({
    id: `cap-${index}`,
    title,
    icon: "CheckCircle2",
    description: "",
  }));
}

function resolveCanonicalSlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

function findProduct(canonicalSlug: string): SubProduct | undefined {
  return ALL_PRODUCTS.find((product) => slugFromHref(product.href) === canonicalSlug);
}

export function getAllProductSlugs(): string[] {
  const base = ALL_PRODUCTS.map((product) => slugFromHref(product.href));
  const aliases = Object.keys(SLUG_ALIASES);
  return [...new Set([...base, ...aliases])];
}

export function getProductBySlug(slug: string): ProductPageData | undefined {
  const canonicalSlug = resolveCanonicalSlug(slug);
  const product = findProduct(canonicalSlug);
  if (!product) return undefined;

  const presentation =
    canonicalSlug === "hci"
      ? KYBER_HCI_PRESENTATION
      : canonicalSlug === "marsloq"
        ? MARSLOQ_PRESENTATION
        : null;

  const images = PRODUCT_IMAGES[canonicalSlug] ?? {
    image: "/assets/screenshots/kyber-hci-dashboard.png",
    imageAlt: product.name,
    imageAspect: "1440/1065",
  };

  return {
    ...product,
    slug,
    category: presentation?.eyebrow ?? findNavCategory(slug),
    logo: presentation?.logo,
    logoAlt: presentation?.logoAlt,
    image: images.image,
    imageAlt: images.imageAlt,
    imageAspect: images.imageAspect,
    features: presentation?.features ?? capabilitiesToFeatures(product.capabilities.slice(0, 8)),
    licensing: presentation?.licensing,
    description: presentation?.summary ?? product.description,
    tagline: presentation?.tagline ?? product.tagline,
  };
}
