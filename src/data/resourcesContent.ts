export interface ResourcePage {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  links?: { label: string; href: string; external?: boolean }[];
}

export const RESOURCE_PAGES: ResourcePage[] = [
  {
    slug: "docs",
    eyebrow: "Documentation",
    title: "Technical documentation",
    intro:
      "Architecture guides, deployment runbooks, and API references for KYBER HCI, KSV, KSAN, KRG, and MARSLOQ.",
    sections: [
      {
        heading: "Platform overview",
        body:
          "Start with the KYBER platform architecture — how compute, storage, security, and observability layers integrate across a single management plane.",
      },
      {
        heading: "Deployment guides",
        body:
          "Step-by-step instructions for HCI cluster formation, witness configuration, storage pool setup, and MARSLOQ log pipeline integration.",
      },
      {
        heading: "Operations & troubleshooting",
        body:
          "Runbooks for cluster health checks, VM migration, snapshot policies, and common MARSLOQ ingestion issues.",
      },
    ],
    links: [
      { label: "KYBER HCI product page", href: "/products/hci" },
      { label: "MARSLOQ product page", href: "/products/marsloq" },
      { label: "Register a project", href: "/contact" },
    ],
  },
  {
    slug: "architecture",
    eyebrow: "Architecture Center",
    title: "Reference architectures",
    intro:
      "Validated deployment patterns for enterprise HCI, multi-site DR, and integrated observability with MARSLOQ.",
    sections: [
      {
        heading: "2-node + witness HCI",
        body:
          "High-availability cluster design for branch offices and mid-size data centers using standard x86 hardware with a dedicated witness node.",
      },
      {
        heading: "Multi-site disaster recovery",
        body:
          "Cross-site replication, RPO/RTO planning, and failover workflows using KYBER backup and DR capabilities.",
      },
      {
        heading: "Observability integration",
        body:
          "Connect workload, network, and security telemetry into MARSLOQ for unified search, alerting, and AI-assisted analysis.",
      },
    ],
    links: [
      { label: "Enterprise HCI solution", href: "/solutions/enterprise-hci" },
      { label: "Security Operations & Logs", href: "/solutions/secops-log-management" },
    ],
  },
  {
    slug: "datasheets",
    eyebrow: "Datasheets",
    title: "Product datasheets",
    intro:
      "Technical specifications, capacity planning notes, and feature matrices for KYBER platform components.",
    sections: [
      {
        heading: "KYBER HCI & KSV",
        body:
          "Hypervisor capabilities, cluster sizing guidance, supported hardware profiles, and migration compatibility (OVA/OVF/VMDK).",
      },
      {
        heading: "KRG & data protection",
        body:
          "Ransomware detection behavior, immutable snapshot policies, backup schedules, and recovery time objectives.",
      },
      {
        heading: "MARSLOQ",
        body:
          "Log ingestion throughput, retention tiers, OpenSearch integration, SNMP/ICMP monitoring, and on-prem AI assistant specifications.",
      },
    ],
    links: [
      { label: "Request datasheet access", href: "/contact" },
      { label: "MARSLOQ Log Appliances", href: "/products/marsloq" },
    ],
  },
  {
    slug: "kb",
    eyebrow: "Knowledge Base",
    title: "Knowledge base",
    intro:
      "Best practices, how-to articles, and troubleshooting guides for KYBER administrators and security teams.",
    sections: [
      {
        heading: "Getting started",
        body:
          "Initial cluster setup, management console orientation, and first VM deployment on KSV.",
      },
      {
        heading: "Security & compliance",
        body:
          "RBAC configuration, audit logging in MARSLOQ, PDPA-aligned data handling, and Digital Law retention guidance.",
      },
      {
        heading: "Performance tuning",
        body:
          "Storage pool optimization, network bonding, and MARSLOQ index lifecycle management.",
      },
    ],
    links: [
      { label: "Security & Compliance", href: "/security" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
  {
    slug: "downloads",
    eyebrow: "Downloads",
    title: "Downloads & firmware",
    intro:
      "KYBER OS images, management tools, MARSLOQ agents, and firmware packages for supported hardware.",
    sections: [
      {
        heading: "KYBER OS & hypervisor",
        body:
          "ISO images and upgrade bundles for KYBER HCI nodes and KSV hypervisor components.",
      },
      {
        heading: "MARSLOQ agents",
        body:
          "Log forwarders, SNMP collectors, and integration packages for common enterprise systems.",
      },
      {
        heading: "Licensing & access",
        body:
          "Download access is provided to registered customers and partners. Register your project to request credentials and release channels.",
      },
    ],
    links: [
      { label: "Register for download access", href: "/contact" },
      { label: "Talk to an architect", href: "/contact" },
    ],
  },
  {
    slug: "faq",
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    intro:
      "Common technical and commercial questions about KYBER HCI, MARSLOQ, licensing, and deployment.",
    sections: [
      {
        heading: "Hardware & licensing",
        body:
          "KYBER runs on standard x86 servers without proprietary appliance lock-in. Licensing is based on your deployment scale and product mix — contact us for a tailored quote.",
      },
      {
        heading: "VMware migration",
        body:
          "KSV supports importing OVA, OVF, and VMDK workloads. Many customers migrate without a full hardware refresh.",
      },
      {
        heading: "Data residency & AI",
        body:
          "MARSLOQ and the Thai LLM assistant are designed for on-premise deployment so sensitive data never leaves your network.",
      },
      {
        heading: "Support & services",
        body:
          "KYBER provides installation support, architecture reviews, and ongoing platform guidance. Register your project to start the conversation.",
      },
    ],
    links: [
      { label: "VMware Migration solution", href: "/solutions/vmware-migration" },
      { label: "Register your project", href: "/contact" },
    ],
  },
];

export function getAllResourceSlugs(): string[] {
  return RESOURCE_PAGES.map((page) => page.slug);
}

export function getResourcePage(slug: string): ResourcePage | undefined {
  return RESOURCE_PAGES.find((page) => page.slug === slug);
}
