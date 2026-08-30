export interface SecurityPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SecurityStandard {
  label: string;
  note: string;
}

export const SECURITY_CONTENT = {
  eyebrow: "Security & Compliance",
  title: "Trust engineered into every layer",
  intro:
    "KYBER is built for regulated, on-premise enterprises. Your data stays on your hardware, protected by defense-in-depth controls from the hypervisor to the AI layer.",
  pillars: [
    {
      id: "encryption",
      title: "Encryption everywhere",
      description:
        "Data is encrypted in transit and at rest with industry-standard AES-256 across storage pools and replication links.",
      icon: "Lock",
    },
    {
      id: "zero-trust",
      title: "Zero-trust access & RBAC",
      description:
        "Granular role-based access control, microsegmentation, and continuous authentication limit every workload to least privilege.",
      icon: "ShieldCheck",
    },
    {
      id: "data-residency",
      title: "On-premise data residency",
      description:
        "Fully on-prem deployment — including the Thai LLM assistant — keeps sensitive data inside your network and jurisdiction.",
      icon: "Server",
    },
    {
      id: "ransomware",
      title: "Ransomware defense (KRG)",
      description:
        "Behavioral detection, immutable air-gapped snapshots, and sub-minute clean recovery protect against modern threats.",
      icon: "ShieldAlert",
    },
    {
      id: "audit",
      title: "Audit trails & monitoring",
      description:
        "Every action is logged and correlated in MARSLOQ for full forensic visibility and security event analysis.",
      icon: "Activity",
    },
    {
      id: "resilience",
      title: "Backup & disaster recovery",
      description:
        "Policy-driven snapshots, cross-site replication, and flexible RPO/RTO keep the business running through any incident.",
      icon: "Layers",
    },
  ] as SecurityPillar[],
  standards: [
    { label: "ISO 27001", note: "Aligned information security management practices" },
    { label: "SOC 2", note: "Security, availability & confidentiality controls" },
    { label: "Thai PDPA", note: "Personal data protection compliance support" },
    { label: "Digital Law", note: "Thailand Digital Law logging & retention support" },
  ] as SecurityStandard[],
};

export interface CompanyPage {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  highlights?: { label: string; value: string }[];
}

export const COMPANY_PAGES: CompanyPage[] = [
  {
    slug: "about",
    eyebrow: "About KYBER",
    title: "Simplifying modern enterprise infrastructure",
    intro:
      "KYBER unifies hyper-converged infrastructure, data protection, security, and intelligent observability into one platform — engineered to run on any hardware, on your terms.",
    sections: [
      {
        heading: "Our mission",
        body: "We believe enterprises should own their infrastructure without paying a premium for lock-in. KYBER decouples powerful software from proprietary hardware so teams can modernize on the servers they already trust.",
      },
      {
        heading: "Built for on-premise",
        body: "From distributed storage to a privacy-first Thai LLM, every KYBER component is designed to keep data inside your network — critical for regulated industries and the Thai public sector.",
      },
      {
        heading: "One platform, one vision",
        body: "KYBER HCI, KRG, and MARSLOQ are designed to work together, giving operators a single, coherent control plane instead of a patchwork of disconnected tools.",
      },
    ],
    highlights: [
      { label: "Products in the platform", value: "6+" },
      { label: "Hardware lock-in", value: "0" },
      { label: "Deployment model", value: "On-prem" },
    ],
  },
  {
    slug: "technology",
    eyebrow: "Technology Philosophy",
    title: "Open, unconstrained, high-performance",
    intro:
      "Our engineering principles keep KYBER fast, flexible, and free of proprietary constraints — so your infrastructure scales with your business, not your vendor's roadmap.",
    sections: [
      {
        heading: "Hardware freedom",
        body: "Run KYBER on standard x86 servers from any vendor. Reuse existing fleets and eliminate unnecessary hardware refresh cycles.",
      },
      {
        heading: "Software-defined everything",
        body: "Compute, storage, and networking are all software-defined, giving you elastic scale and self-healing resilience across clustered nodes.",
      },
      {
        heading: "Intelligence at the core",
        body: "MARSLOQ and AI-assisted operations turn raw telemetry into actionable insight, reducing alert fatigue and mean-time-to-resolution.",
      },
    ],
  },
  {
    slug: "partners",
    eyebrow: "Ecosystem Partners",
    title: "A hardware & technology alliance",
    intro:
      "KYBER works with leading server, storage, and networking vendors so you can build validated, high-performance deployments on the hardware you prefer.",
    sections: [
      {
        heading: "Hardware alliances",
        body: "Validated designs across Dell, HPE, Lenovo, and Cisco platforms with NVMe/SSD/HDD tiering and 10/25/100GbE networking.",
      },
      {
        heading: "Become a partner",
        body: "Resellers, integrators, and technology partners can join the KYBER ecosystem to deliver unified infrastructure to their customers.",
      },
    ],
  },
  {
    slug: "careers",
    eyebrow: "Careers",
    title: "Build the future of enterprise platforms",
    intro:
      "We're a team of infrastructure and AI engineers building the platform that powers modern, sovereign data centers. Join us.",
    sections: [
      {
        heading: "Why KYBER",
        body: "Work on hard problems in virtualization, distributed storage, security, and applied AI — with real enterprise impact.",
      },
      {
        heading: "Open roles",
        body: "We're always looking for platform, backend, and solutions engineers. Reach out through our contact page to start a conversation.",
      },
    ],
  },
];

export function getCompanyPage(slug: string): CompanyPage | undefined {
  return COMPANY_PAGES.find((p) => p.slug === slug);
}

export function getAllCompanySlugs(): string[] {
  return COMPANY_PAGES.map((p) => p.slug);
}
