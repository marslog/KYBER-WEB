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
  "log พรบ คอมพิวเตอร์",
  "log พ.ร.บ. คอมพิวเตอร์",
  "ระบบเก็บ log พรบ คอมพิวเตอร์",
  "เครื่องเก็บ log พรบ คอมพิวเตอร์",
  "log server พรบ คอมพิวเตอร์",
  "โปรแกรมเก็บ log พรบ คอมพิวเตอร์",
  "เก็บ log 90 วัน",
  "มาตรฐานการเก็บ log พรบ คอมพิวเตอร์ 2564",
  "พรบ คอมพิวเตอร์ มาตรา 26",
  "Computer Crime Act log compliance Thailand",
] as const;

export const DEFAULT_KEYWORDS = [
  "KYBER",
  "KYBER HCI",
  "Kyber HCI",
  "HCI",
  "hyper-converged infrastructure",
  "cost-effective hypervisor",
  "VMware alternative",
  "VMware alternative Thailand",
  "ระบบ HCI",
  "ทางเลือก VMware",
  "ลดค่าลิขสิทธิ์ VMware",
  "hyperconverged infrastructure Thailand",
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
    "KYBER HCI",
    "Kyber HCI",
    "hyper-converged infrastructure",
    "hyperconverged infrastructure Thailand",
    "enterprise hypervisor",
    "software-defined storage",
    "VMware alternative",
    "ระบบ HCI",
    "cost-effective hypervisor",
    "KSAN storage",
    "Ceph HCI",
    "x86 HCI cluster",
  ],
  ksv: [
    "enterprise hypervisor",
    "KSV",
    "cost-effective hypervisor",
    "VMware alternative",
    "server virtualization",
    "OVA import",
    "VMDK migration",
    "live VM migration",
    "ทางเลือก VMware",
    "ลดค่าลิขสิทธิ์ VMware",
    "Broadcom VMware alternative",
  ],
  ksan: [
    "software-defined storage",
    "KSAN",
    "distributed storage mesh",
    "Ceph storage",
    "NVMe storage pool",
    "SDS Thailand",
    "hyper-converged storage",
  ],
  management: [
    "KYBER Management",
    "enterprise control plane",
    "multi-cluster management",
    "VM orchestration",
    "single pane of glass",
  ],
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
    "log พรบ คอมพิวเตอร์",
    "ระบบเก็บ log พรบ คอมพิวเตอร์",
    "เครื่องเก็บ log พรบ คอมพิวเตอร์",
    "เก็บ log 90 วัน",
    "พรบ คอมพิวเตอร์ มาตรา 26",
    "Computer Crime Act log compliance",
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
    "log พรบ คอมพิวเตอร์",
    "ระบบเก็บ log พรบ คอมพิวเตอร์",
    "เครื่องเก็บ log พรบ คอมพิวเตอร์",
    "log server พรบ คอมพิวเตอร์",
    "เก็บ log 90 วัน",
    "มาตรฐานการเก็บ log พรบ คอมพิวเตอร์ 2564",
  ],
  siem: [
    "SIEM",
    "log management",
    "syslog",
    "centralized log",
    "security analytics",
    "security log management",
    "on-premise SIEM",
    "log พรบ คอมพิวเตอร์",
    "ระบบเก็บ log พรบ คอมพิวเตอร์",
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
    "log พรบ คอมพิวเตอร์",
    "ระบบเก็บ log พรบ คอมพิวเตอร์",
    "เครื่องเก็บ log พรบ คอมพิวเตอร์",
    "เก็บ log 90 วัน",
    "พรบ คอมพิวเตอร์ มาตรา 26",
    "มาตรฐานการเก็บ log พรบ คอมพิวเตอร์ 2564",
  ],
  "enterprise-hci": [
    "HCI",
    "hyper-converged infrastructure",
    "KYBER HCI",
    "Kyber HCI",
    "enterprise hypervisor",
    "hardware freedom",
    "x86 server cluster",
    "ระบบ HCI",
    "cost-effective hypervisor",
  ],
  "virtualization-modernization": [
    "enterprise hypervisor",
    "HCI",
    "VMware migration",
    "virtualization modernization",
    "cost-effective hypervisor",
    "Kyber HCI",
    "KSV",
    "ทางเลือก VMware",
  ],
  "vmware-migration": [
    "VMware migration",
    "hypervisor migration",
    "KSV",
    "HCI",
    "VMware alternative",
    "cost-effective hypervisor",
    "ลดค่าลิขสิทธิ์ VMware",
    "OVA import",
    "VMDK to KSV",
    "zero downtime cutover",
  ],
};

export const PRODUCT_SEO_TITLES: Record<string, string> = {
  hci: "KYBER HCI — Next-Gen Hyper-Converged Infrastructure on Standard x86 | KYBER",
  ksv: "KSV Hypervisor — Cost-Effective Hypervisor & VMware Alternative | KYBER",
  ksan: "KSAN — Software-Defined Distributed Storage Mesh | KYBER",
  management: "KYBER Management — Unified Enterprise Control Plane | KYBER",
  marsloq: "MARSLOQ — Enterprise Log Management & ระบบเก็บ Log พ.ร.บ. คอมพิวเตอร์ | KYBER",
  "log-management": "Log Management Software — ระบบเก็บ Log พ.ร.บ. คอมพิวเตอร์ 90 วัน | MARSLOQ by KYBER",
  siem: "On-Premise SIEM & Log Management — MARSLOQ | KYBER",
};

export const PRODUCT_SEO_DESCRIPTIONS: Record<string, string> = {
  hci:
    "เปลี่ยนดาต้าเซ็นเตอร์สู่ Hyper-Converged Infrastructure (HCI) ด้วย KYBER HCI รวม Compute, Hypervisor KSV และ KSAN Storage บน x86 Server อิสระ ไม่ผูกขาดฮาร์ดแวร์ ลดต้นทุน TCO 60%",
  ksv:
    "ทางเลือกทดแทน VMware ด้วย KYBER KSV: Enterprise Hypervisor ประสิทธิภาพสูง รองรับ Live Migration, นำเข้า OVA/OVF/VMDK ได้ทันที โดยไม่มีค่าลิขสิทธิ์แอบแฝงและไม่มีขั้นต่ำ Core โหด",
  ksan:
    "KSAN Software-Defined Distributed Storage รวม NVMe, SSD, และ HDD เป็น Storage Mesh ประสิทธิภาพสูง มีระบบ Self-Healing และ Inline Deduplication สำหรับ KYBER HCI",
  management:
    "KYBER Management คอนโซลควบคุมและบริหารจัดการ Multi-Cluster, Virtual Machines, Telemetry และ Role-Based Access Control แบบ Single-Pane-of-Glass",
  marsloq:
    "MARSLOQ: ระบบ Centralized Log Management และระบบเก็บ Log พ.ร.บ. คอมพิวเตอร์ 90 วัน รองรับ Syslog Ingestion, SNMP, OpenSearch และ On-Premise Thai LLM สำหรับองค์กรในไทย",
  "log-management":
    "ระบบเก็บ Log ตาม พ.ร.บ. คอมพิวเตอร์ มาตรา 26 และประกาศกระทรวง ดีอี 2564 ด้วย MARSLOQ: รองรับ Syslog, NTP Sync, Hashing ป้องกันการแก้ไข และค้นหาเร็วด้วย OpenSearch บน On-Premise 100%",
  siem:
    "On-premise SIEM and log management with MARSLOQ: correlate security logs, detect anomalies, and meet Thai Computer Crime Act log retention compliance without cloud data leaks.",
};

export const SOLUTION_SEO_TITLES: Record<string, string> = {
  "secops-log-management": "ระบบเก็บ Log พ.ร.บ. คอมพิวเตอร์ 2564 & SecOps — MARSLOQ | KYBER",
  "enterprise-hci": "Enterprise HCI Modernization — Hyper-Converged บน x86 มาตรฐาน | KYBER",
  "vmware-migration": "VMware Migration Solution — ย้ายสู่ KYBER KSV ไร้ Downtime | KYBER",
  "virtualization-modernization": "Virtualization Modernization — ทางเลือกทดแทน VMware ลด TCO 60% | KYBER",
};

export const SOLUTION_SEO_DESCRIPTIONS: Record<string, string> = {
  "secops-log-management":
    "โซลูชันระบบจัดเก็บ Log ตาม พ.ร.บ. คอมพิวเตอร์ มาตรา 26 และประกาศกระทรวง ดีอี 2564 ด้วย MARSLOQ บน On-Premise: รองรับ Syslog จาก Firewall/Switch/Server, NTP Sync, Hashing ป้องกันแก้ไข และ OpenSearch",
  "enterprise-hci":
    "เปลี่ยนผ่านสู่ Enterprise Hyper-Converged Infrastructure (HCI) ด้วย KYBER: ปลดล็อกอิสระฮาร์ดแวร์ x86 (Dell, HPE, Lenovo, Cisco) พร้อมระบบ 2-Node + Witness HA และ Ceph SDS",
  "vmware-migration":
    "โซลูชันย้ายระบบจาก VMware สู่ KYBER KSV Hypervisor แบบไร้ Downtime ลดค่าใช้จ่าย License ได้สูงสุด 60% รองรับไฟล์ OVA, OVF, VMDK ตรง และปลอดภัยด้วย Instant Snapshots",
  "virtualization-modernization":
    "ยกระดับโครงสร้าง Virtualization ด้วย Cost-Effective Hypervisor KSV และ KYBER HCI ตัดภาระค่า License Broadcom/VMware ที่เพิ่มขึ้น พร้อมประสิทธิภาพระดับ Enterprise",
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function googleSiteVerification(): Metadata["verification"] | undefined {
  const token =
    process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
    "4ySpTVxyemejclvK2Md-2STLKx9VQyN0i3kYCV5JAzU";
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
    telephone: "+66-99-105-3888",
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
