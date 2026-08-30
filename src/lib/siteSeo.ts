import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.kyber-it.com";

export const SITE_NAME = "KYBER";

export const DEFAULT_KEYWORDS = [
  "KYBER",
  "KYBER HCI",
  "HCI",
  "hyper-converged infrastructure",
  "enterprise hypervisor",
  "KSV hypervisor",
  "VMware migration",
  "MARSLOQ",
  "syslog",
  "centralized log",
  "centralized log management",
  "log management",
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
    "syslog",
    "centralized log",
    "centralized logging",
    "log management",
    "SNMP monitoring",
    "on-premise SIEM",
  ],
  "log-management": ["syslog", "centralized log", "log ingestion", "OpenSearch"],
  siem: ["syslog", "centralized log", "security analytics", "SIEM"],
};

export const SOLUTION_KEYWORDS: Record<string, string[]> = {
  "secops-log-management": ["syslog", "centralized log", "security operations", "log analytics"],
  "enterprise-hci": ["HCI", "hyper-converged infrastructure", "enterprise hypervisor"],
  "virtualization-modernization": ["enterprise hypervisor", "HCI", "VMware migration"],
  "vmware-migration": ["hypervisor migration", "KSV", "HCI"],
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata(options: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(options.path ?? "/");
  const keywords = [...DEFAULT_KEYWORDS, ...(options.keywords ?? [])];

  return {
    title: options.title,
    description: options.description,
    keywords: [...new Set(keywords)],
    alternates: { canonical },
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
  title: "KYBER — HCI, Enterprise Hypervisor & Centralized Syslog (MARSLOQ)",
  description:
    "KYBER delivers hyper-converged infrastructure (HCI), an enterprise hypervisor (KSV), and MARSLOQ for syslog ingestion and centralized log management — on-premise, on any x86 hardware.",
  path: "/",
});

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KYBER Technology Co., Ltd.",
  url: SITE_URL,
  logo: absoluteUrl("/assets/kyber-logo-main.png"),
  description:
    "Enterprise HCI, hypervisor, and centralized syslog observability platform engineered in Thailand.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "TH",
    addressLocality: "Nonthaburi",
  },
  sameAs: ["https://www.kyber-it.com"],
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: ROOT_METADATA.description,
  publisher: { "@type": "Organization", name: "KYBER Technology Co., Ltd." },
};
