import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.kyber-it.com";

export const SITE_NAME = "KYBER";

export const LOG_MANAGEMENT_KEYWORDS = [
  "log management",
  "enterprise log management",
  "centralized log management",
  "centralized logging",
  "centralized log",
  "log aggregation",
  "log analytics",
  "security log management",
  "infrastructure logs",
  "syslog",
  "syslog server",
  "syslog ingestion",
  "log ingestion",
  "log monitoring",
  "log search",
  "OpenSearch logs",
  "on-premise log management",
  "SIEM",
  "security information and event management",
] as const;

export const DEFAULT_KEYWORDS = [
  "KYBER",
  "KYBER HCI",
  "HCI",
  "hyper-converged infrastructure",
  "enterprise hypervisor",
  "KSV hypervisor",
  "VMware migration",
  "MARSLOQ",
  ...LOG_MANAGEMENT_KEYWORDS,
  "on-premise observability",
  "enterprise infrastructure Thailand",
] as const;

export const PRODUCT_KEYWORDS: Record<string, string[]> = {
  hci: [
    "HCI",
    "hyper-converged infrastructure",
    "enterprise hypervisor",
    "software-defined storage",
    "VMware alternative",
  ],
  ksv: ["enterprise hypervisor", "KSV", "server virtualization", "OVA import"],
  marsloq: [
    "log management",
    "enterprise log management",
    "centralized log management",
    "syslog",
    "centralized log",
    "centralized logging",
    "log aggregation",
    "log analytics",
    "security log management",
    "SNMP monitoring",
    "on-premise SIEM",
    "OpenSearch",
  ],
  "log-management": [
    "log management",
    "log management software",
    "enterprise log management",
    "centralized log management",
    "syslog management",
    "log ingestion",
    "log monitoring platform",
    "OpenSearch",
    "on-premise logging",
  ],
  siem: [
    "SIEM",
    "log management",
    "syslog",
    "centralized log",
    "security analytics",
    "security log management",
    "on-premise SIEM",
  ],
};

export const SOLUTION_KEYWORDS: Record<string, string[]> = {
  "secops-log-management": [
    "log management",
    "enterprise log management",
    "centralized log management",
    "syslog",
    "centralized log",
    "security operations",
    "log analytics",
    "security log management",
    "SecOps",
    "SIEM",
  ],
  "enterprise-hci": ["HCI", "hyper-converged infrastructure", "enterprise hypervisor"],
  "virtualization-modernization": ["enterprise hypervisor", "HCI", "VMware migration"],
  "vmware-migration": ["hypervisor migration", "KSV", "HCI"],
};

export const PRODUCT_SEO_TITLES: Record<string, string> = {
  marsloq: "MARSLOQ — Enterprise Log Management & Syslog Platform | KYBER",
  "log-management": "Log Management Software — MARSLOQ by KYBER",
  siem: "On-Premise SIEM & Log Management — MARSLOQ | KYBER",
};

export const PRODUCT_SEO_DESCRIPTIONS: Record<string, string> = {
  marsloq:
    "MARSLOQ delivers enterprise log management with syslog ingestion, centralized logging, SNMP monitoring, AI security analytics, and on-premise Thai LLM — built for regulated enterprises.",
  "log-management":
    "KYBER Log Management powered by MARSLOQ: ingest syslog and infrastructure logs, parse with Grok, search with OpenSearch, and investigate incidents with AI — fully on-premise.",
  siem:
    "On-premise SIEM and log management with MARSLOQ: correlate security logs, detect anomalies, and investigate threats without sending telemetry to the cloud.",
};

export const SOLUTION_SEO_TITLES: Record<string, string> = {
  "secops-log-management": "Enterprise Log Management & SecOps — MARSLOQ | KYBER",
};

export const SOLUTION_SEO_DESCRIPTIONS: Record<string, string> = {
  "secops-log-management":
    "Centralize infrastructure and security logs with MARSLOQ. Enterprise log management, syslog ingestion, OpenSearch analytics, and AI-assisted SecOps — on your own hardware.",
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function googleSiteVerification(): Metadata["verification"] | undefined {
  const token = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  if (!token) return undefined;
  return { google: token };
}

export function createPageMetadata(options: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(options.path ?? "/");
  const keywords = [...new Set([...DEFAULT_KEYWORDS, ...(options.keywords ?? [])])];

  return {
    title: options.title,
    description: options.description,
    keywords,
    alternates: { canonical },
    verification: googleSiteVerification(),
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export const ROOT_METADATA = createPageMetadata({
  title: "KYBER — Enterprise Log Management, HCI & Hypervisor (MARSLOQ)",
  description:
    "KYBER delivers enterprise log management with MARSLOQ — syslog ingestion, centralized logging, and AI log analytics — plus HCI and an enterprise hypervisor (KSV), all on-premise on any x86 hardware.",
  path: "/",
});

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KYBER Technology Co., Ltd.",
  url: SITE_URL,
  logo: absoluteUrl("/assets/kyber-logo-main.png"),
  description:
    "Enterprise log management, HCI, hypervisor, and centralized syslog observability platform engineered in Thailand.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "TH",
    addressLocality: "Nonthaburi",
    addressRegion: "Nonthaburi",
    postalCode: "11140",
    streetAddress: "79/125 Moo 10, Bang Ma Nang, Bang Yai",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+66-99-153-888",
    contactType: "sales",
    email: "supawat@kyber-it.com",
    areaServed: "TH",
    availableLanguage: ["English", "Thai"],
  },
  sameAs: [SITE_URL, "https://www.kyber-it.com"],
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: ROOT_METADATA.description,
  inLanguage: "en",
  publisher: { "@type": "Organization", name: "KYBER Technology Co., Ltd." },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/resources?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const MARSLOQ_SOFTWARE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MARSLOQ",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Log Management",
  operatingSystem: "Linux, Windows Server",
  description:
    "Enterprise log management platform with syslog ingestion, centralized logging, OpenSearch analytics, and AI-assisted security operations.",
  url: absoluteUrl("/products/marsloq"),
  offers: {
    "@type": "Offer",
    url: absoluteUrl("/contact#contact-form"),
    availability: "https://schema.org/InStock",
  },
  provider: {
    "@type": "Organization",
    name: "KYBER Technology Co., Ltd.",
    url: SITE_URL,
  },
  featureList: [
    "Syslog ingestion",
    "Centralized log management",
    "Grok log parsing",
    "OpenSearch indexing",
    "SNMP and ICMP monitoring",
    "AI log analytics",
    "On-premise deployment",
  ],
};
