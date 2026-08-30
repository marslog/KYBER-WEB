export interface SubProduct {
  id: string;
  name: string;
  code?: string;
  badge?: string;
  tagline: string;
  description: string;
  capabilities: string[];
  href: string;
}

export interface ProductCategoryGroup {
  category: string;
  title: string;
  description: string;
  accentColor: string;
  products: SubProduct[];
}

export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  href: string;
  journeySteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  outcomes: string[];
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  color: string;
  accentHex: string;
  items: string[];
  details: string;
}

export interface WhyKyberPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export const KYBER_CLIENT_LOGOS_IMAGE = "/assets/screenshots/kyber-client-logos.jpg";
export const KYBER_REF_TITLE = "KYBER Ref";
export const KYBER_HCI_CLUSTER_IMAGE = "/assets/screenshots/kyber-hci-cluster-3d.png";

export const NAV_STRUCTURE = {
  products: [
    {
      category: "Infrastructure",
      items: [
        { name: "KYBER HCI", code: "HCI", desc: "Unified compute, network, storage & security", href: "/products/hci" },
        { name: "KSV", code: "KSV", desc: "KYBER Server Virtualization", href: "/products/ksv" },
        { name: "KSAN", code: "KSAN", desc: "Software-defined distributed storage", href: "/products/ksan" },
        { name: "KYBER Management", code: "KM", desc: "Unified enterprise control plane", href: "/products/management" },
      ],
    },
    {
      category: "Data Protection",
      items: [
        { name: "Backup & Recovery", code: "BKP", desc: "Automated VM & data protection", href: "/products/backup" },
        { name: "Disaster Recovery", code: "DR", desc: "Multi-site failover & business continuity", href: "/products/disaster-recovery" },
        { name: "Migration Engine", code: "MIG", desc: "Zero-friction VM import & transition", href: "/products/migration" },
      ],
    },
    {
      category: "Security",
      items: [
        { name: "KRG Guard", code: "KRG", desc: "KYBER Ransomware Guard layer", href: "/products/krg" },
        { name: "Ransomware Protection", code: "RP", desc: "Behavioral threat detection & isolation", href: "/products/ransomware-protection" },
        { name: "Security Monitoring", code: "SM", desc: "Workload integrity & audit trails", href: "/products/security-monitoring" },
      ],
    },
    {
      category: "Observability",
      items: [
        { name: "MARSLOQ", code: "MSL", desc: "Log automation, monitoring & local AI", href: "/products/marsloq" },
        { name: "Log Management", code: "LM", desc: "High-velocity grok parsing & search", href: "/products/log-management" },
        { name: "SIEM & Security", code: "SIEM", desc: "Security events & threat intelligence", href: "/products/siem" },
        { name: "AI Operations", code: "AIOps", desc: "AI-assisted troubleshooting & insights", href: "/products/ai-operations" },
      ],
    },
  ],
  solutions: [
    { title: "Virtualization Modernization", desc: "Replace expensive legacy hypervisors without hardware lock-in", href: "/solutions/virtualization-modernization" },
    { title: "VMware Migration", desc: "Import OVA/OVF/VMDK workloads directly to KYBER KSV", href: "/solutions/vmware-migration" },
    { title: "Enterprise HCI", desc: "Consolidate compute and storage into a high-availability cluster", href: "/solutions/enterprise-hci" },
    { title: "Ransomware Resilience", desc: "Proactive behavioral protection and immutable backup recovery", href: "/solutions/ransomware-resilience" },
    { title: "Security Operations & Logs", desc: "Centralize log streams into MARSLOQ with OpenSearch analytics", href: "/solutions/secops-log-management" },
    { title: "Legacy Hardware Modernization", desc: "Reuse existing x86 servers and eliminate unnecessary hardware cycles", href: "/solutions/legacy-hardware-modernization" },
  ],
  resources: [
    { title: "Documentation", desc: "Technical guides, API reference, & architecture docs", href: "/resources/docs" },
    { title: "Architecture Center", desc: "Validated reference designs & deployment patterns", href: "/resources/architecture" },
    { title: "Product Datasheets", desc: "Detailed technical specification sheets", href: "/resources/datasheets" },
    { title: "Knowledge Base", desc: "Best practices & troubleshooting articles", href: "/resources/kb" },
    { title: "Downloads & Firmware", desc: "KYBER OS ISOs, tools, and agent packages", href: "/resources/downloads" },
    { title: "FAQ", desc: "Frequently asked technical and commercial questions", href: "/resources/faq" },
  ],
  company: [
    { title: "About KYBER", desc: "Our mission to simplify modern enterprise infrastructure", href: "/company/about" },
    { title: "Technology Philosophy", desc: "Open, unconstrained, high-performance infrastructure design", href: "/company/technology" },
    { title: "Ecosystem Partners", desc: "Hardware and technology alliance network", href: "/company/partners" },
    { title: "Careers", desc: "Join our team building the future of enterprise platforms", href: "/company/careers" },
    { title: "Security & Compliance", desc: "Encryption, data residency & ransomware defense", href: "/security" },
    { title: "Contact Us", desc: "Speak with KYBER platform architects & sales engineers", href: "/contact" },
  ],
};

export const ALL_PRODUCTS: SubProduct[] = [
  {
    id: "kyber-hci",
    name: "KYBER HCI",
    code: "HCI",
    badge: "Core Infrastructure",
    tagline: "The Future of Hyper-Converged Infrastructure",
    description:
      "Unified platform for modern data center management — compute, networking, software-defined storage, cluster nodes, built-in security, and backup & DR in one console.",
    capabilities: [
      "Home Dashboard — Cluster, VM & Backup Overview",
      "Multi-Platform Migration (VMware, Hyper-V, XenServer, Proxmox, KVM)",
      "Agent-Based & Agentless Migration Modes",
      "Physical NIC Management (Static/DHCP, up to 10 GbE)",
      "Software-Defined Storage with Ceph Integration",
      "Resilient Multi-Node Cluster Management",
      "Microsegmentation & Built-in Virtual Firewall",
      "Policy-Driven Backup & DR with Flexible RPO",
      "RBAC, Licensing & System Administration",
    ],
    href: "/products/hci",
  },
  {
    id: "ksv",
    name: "KSV",
    code: "KSV",
    badge: "Virtualization Engine",
    tagline: "KYBER Server Virtualization",
    description:
      "Enterprise hypervisor engine designed for ultra-low latency VM execution, seamless live migration, dynamic snapshotting, and native import of OVA/OVF/VMDK packages.",
    capabilities: [
      "High-Performance KVM Hypervisor Engine",
      "OVA / OVF / VMDK Native Support",
      "Live VM Migration without Downtime",
      "Instant Snapshotting & Restores",
      "Virtual Machine Lifecycle Management",
      "VM Console (HTML5 / VNC)",
      "VLAN & Software-Defined Networking",
      "Host Memory Overcommit & NUMA Optimization",
    ],
    href: "/products/ksv",
  },
  {
    id: "ksan",
    name: "KSAN",
    code: "KSAN",
    badge: "Distributed Storage",
    tagline: "KYBER Software-Defined Storage",
    description:
      "Scalable distributed storage architecture combining NVMe, SSD, and HDD pooling across nodes with self-healing replication, inline deduplication, and zero single points of failure.",
    capabilities: [
      "Software-Defined Storage Pool",
      "NVMe & SSD Tiering",
      "Self-Healing Distributed Mesh",
      "Block & Object Storage Access",
      "Zero-Downtime Expansion",
      "Inline Data Reduction & Thin Provisioning",
      "Erasure Coding & Dynamic Replication",
      "Hardware-Agnostic Disk Aggregation",
    ],
    href: "/products/ksan",
  },
  {
    id: "kyber-management",
    name: "KYBER Management",
    code: "KM",
    badge: "Control Plane",
    tagline: "Single-Pane-of-Glass Enterprise Management",
    description:
      "Unified management console providing comprehensive visibility and command over all KYBER clusters, storage pools, virtual workloads, network policies, and system health.",
    capabilities: [
      "Single Console for Multi-Cluster Management",
      "Real-Time Telemetry & Performance Gauges",
      "VM Deployment & Inventory Control",
      "Hardware Diagnostics & Alerting",
      "Role-Based Access Control (RBAC)",
      "RESTful API & Automation CLI",
      "Capacity Planning & Forecasting",
      "Audit Trail & Event Logging",
    ],
    href: "/products/management",
  },
  {
    id: "krg",
    name: "KYBER Ransomware Guard (KRG)",
    code: "KRG",
    badge: "Security Ecosystem",
    tagline: "Proactive Infrastructure & Workload Security Shield",
    description:
      "Continuous threat monitoring and behavioral detection layer surrounding KYBER virtual machines and storage pools, preventing unauthorized data encryption and payload execution.",
    capabilities: [
      "Behavioral Ransomware Detection",
      "Real-Time File System Anomaly Monitoring",
      "Immutable Air-Gapped Snapshot Locks",
      "Workload Threat Quarantine",
      "Zero-Trust VM Micro-Segmentation",
      "Security Event Correlation",
      "Instant Clean Snapshot Recovery",
      "Compliance & Forensic Reporting",
    ],
    href: "/products/krg",
  },
  {
    id: "marsloq",
    name: "MARSLOQ",
    code: "MSL",
    badge: "Observability Platform",
    tagline: "Log Automation, Monitoring & Local AI",
    description:
      "Enterprise log automation, network monitoring, AI security analytics, and a privacy-first localized Thai LLM chatbot — with Digital Law compliance support.",
    capabilities: [
      "Automated Log Ingestion, Normalization & Indexing",
      "Grok Tools & MARSLOQ Viewer",
      "ICMP, PING, SNMP, HTTP(S) Network Monitoring",
      "120+ Device Source Templates & Network Discovery",
      "APM Application Performance Monitoring",
      "AI Analyzer & Fast-Cache Pre-Aggregation",
      "Mini AI Local Chatbot (Thai LLM, Offline)",
      "ISM Policy, Alerts & Report Center",
      "Archive to USB, NFS, FTP & AWS Cloud Storage",
    ],
    href: "/products/marsloq",
  },
  {
    id: "backup-dr",
    name: "KYBER Backup & DR",
    code: "BKP/DR",
    badge: "Data Protection",
    tagline: "Enterprise Backup & Multi-Site Disaster Recovery",
    description:
      "Integrated data protection solution offering continuous snapshot scheduling, cross-cluster replication, and automated disaster recovery orchestration with minimal RPO/RTO.",
    capabilities: [
      "Automated Snapshot Policy Scheduling",
      "Asynchronous Cross-Site Replication",
      "1-Click Failover & Orchestration",
      "Granular File & VM-Level Restores",
      "Bandwidth-Throttled Replication Links",
      "Immutable Backup Repositories",
      "DR Readiness Testing Drills",
      "Cross-Platform Migration Support",
    ],
    href: "/products/backup-dr",
  },
  {
    id: "ai-ops",
    name: "KYBER AI Operations",
    code: "AIOps",
    badge: "Intelligence Layer",
    tagline: "Turn Infrastructure Data into Actionable Intelligence",
    description:
      "AI-driven assistant embedded across KYBER and MARSLOQ to automatically analyze infrastructure bottlenecks, explain complex log cascades, and recommend proactive fixes.",
    capabilities: [
      "Natural Language Log & Metric Queries",
      "Automated Incident Root Cause Analysis",
      "Predictive Disk & RAM Exhaustion Forecasts",
      "Anomaly Detection across Cluster Telemetry",
      "Security Incident Summary Generation",
      "Smart Troubleshooting Recommendations",
      "Noise Reduction & Alert Deduplication",
      "Guided Remediation Playbooks",
    ],
    href: "/products/ai-ops",
  },
];

export const SOLUTIONS_JOURNEYS: SolutionItem[] = [
  {
    id: "modernize-virtualization",
    title: "Virtualization Modernization",
    tagline: "Transition from expensive legacy hypervisors to high-performance KYBER KSV",
    description:
      "Eliminate skyrocketing hypervisor licensing costs while maintaining enterprise-grade performance, high availability, and operational simplicity.",
    iconName: "Cpu",
    href: "/solutions/virtualization-modernization",
    journeySteps: [
      { step: "01", title: "Assessment", desc: "Discover existing VM inventory and map compute/storage resource demands." },
      { step: "02", title: "Direct Import", desc: "Use KYBER VM Import to ingest OVA, OVF, and VMDK workloads without conversion friction." },
      { step: "03", title: "Validation", desc: "Run side-by-side performance benchmarks on KYBER KSV hypervisor." },
      { step: "04", title: "Cutover", desc: "Execute zero-downtime cutover with automated snapshot protection." },
    ],
    outcomes: [
      "Up to 60% TCO reduction in hypervisor licensing",
      "Zero vendor lock-in with hardware flexibility",
      "Unified VM & cluster management in one console",
    ],
  },
  {
    id: "ransomware-resilience",
    title: "Ransomware Protection & Recovery",
    tagline: "End-to-end security shield from behavioral detection to immutable recovery",
    description:
      "Defend your critical virtual machines against modern ransomware with KRG continuous monitoring and instant clean snapshot restore capabilities.",
    iconName: "ShieldAlert",
    href: "/solutions/ransomware-resilience",
    journeySteps: [
      { step: "01", title: "Shield Activation", desc: "Deploy KRG protection layer across KYBER HCI cluster nodes." },
      { step: "02", title: "Behavioral Monitor", desc: "Detect abnormal encryption patterns and unauthorized I/O spikes." },
      { step: "03", title: "Automated Quarantine", desc: "Isolate compromised VMs and lock immutable snapshot reserves." },
      { step: "04", title: "Instant Clean Recovery", desc: "Roll back affected virtual disks to uncorrupted state in seconds." },
    ],
    outcomes: [
      "Sub-minute recovery time objective (RTO)",
      "Immutable snapshot storage resistant to deletion",
      "Continuous threat intelligence integrated into MARSLOQ",
    ],
  },
  {
    id: "intelligent-observability",
    title: "Modernize Infrastructure Operations",
    tagline: "Stream all cluster, network, and security telemetry into MARSLOQ AI intelligence",
    description:
      "Eliminate operational blind spots by aggregating infrastructure logs, system metrics, and security signals into one real-time observability platform.",
    iconName: "Activity",
    href: "/solutions/secops-log-management",
    journeySteps: [
      { step: "01", title: "Log Harvest", desc: "Collect logs from KYBER HCI, network switches, and OS agents." },
      { step: "02", title: "Parse & Normalize", desc: "MARSLOQ applies Grok parsers to structure unstructured data instantly." },
      { step: "03", title: "OpenSearch Indexing", desc: "Perform sub-second queries across multi-terabyte log streams." },
      { step: "04", title: "AI Troubleshooting", desc: "Ask MARSLOQ AI to pinpoint root cause and recommend resolutions." },
    ],
    outcomes: [
      "10x faster mean-time-to-resolution (MTTR)",
      "Unified log search and SIEM security correlation",
      "AI-driven predictive anomaly detection",
    ],
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "hardware",
    name: "01. Hardware Freedom Layer",
    title: "Run KYBER on Your Preferred Hardware",
    subtitle: "Hardware Freedom & Flexibility",
    color: "from-blue-500/20 to-blue-600/5",
    accentHex: "#3b82f6",
    items: ["Standard x86 Servers", "Dell / HPE / Lenovo / Cisco", "NVMe / SSD / HDD Storage", "10/25/100GbE Networking"],
    details:
      "KYBER decoupled software from hardware. Reuse your existing server fleet or deploy on standard off-the-shelf x86 hardware without proprietary appliance restrictions.",
  },
  {
    id: "infrastructure",
    name: "02. KYBER HCI Core Layer",
    title: "Unified Compute, Virtualization & Storage",
    subtitle: "KSV + KSAN Hyperconverged Engine",
    color: "from-cyan-500/20 to-cyan-600/5",
    accentHex: "#06b6d4",
    items: ["KSV Hypervisor", "KSAN Distributed Storage", "Cluster HA & Dynamic Balancing", "OVA/OVF/VMDK Import"],
    details:
      "The foundation of KYBER: high-efficiency hypervisor and self-healing software-defined storage running seamlessly across clustered nodes.",
  },
  {
    id: "management",
    name: "03. Single Control Plane Layer",
    title: "KYBER Enterprise Management Console",
    subtitle: "Unified Operations & Control",
    color: "from-indigo-500/20 to-indigo-600/5",
    accentHex: "#6366f1",
    items: ["Single Pane of Glass UI", "RBAC & Multitenancy", "Capacity Planning", "REST APIs & Automation"],
    details:
      "Control your entire infrastructure ecosystem from a single responsive Web console with comprehensive telemetry, RBAC, and automation APIs.",
  },
  {
    id: "protection",
    name: "04. Protection & Resilience Layer",
    title: "Data Protection & Ransomware Shield",
    subtitle: "KYBER Backup, DR & KRG Security",
    color: "from-purple-500/20 to-purple-600/5",
    accentHex: "#a855f7",
    items: ["KRG Behavioral Shield", "Immutable Snapshots", "Cross-Site Replication", "Instant VM Recovery"],
    details:
      "Continuous protection surrounding every virtual workload with behavioral threat detection and immutable point-in-time recovery points.",
  },
  {
    id: "observability",
    name: "05. Intelligence Observability Layer",
    title: "MARSLOQ Log & Metric Intelligence",
    subtitle: "Observability, Grok & OpenSearch",
    color: "from-emerald-500/20 to-emerald-600/5",
    accentHex: "#10b981",
    items: ["High-Speed Log Engine", "Grok Parser & Normalizer", "SIEM Event Correlation", "Interface Telemetry"],
    details:
      "MARSLOQ gathers logs, events, metrics, and security signals from infrastructure components into a centralized search and analytics engine.",
  },
  {
    id: "ai-intelligence",
    name: "06. AI Operations Layer",
    title: "AI-Assisted Operations & Guidance",
    subtitle: "Predictive Analytics & AI Troubleshooting",
    color: "from-sky-500/20 to-sky-600/5",
    accentHex: "#0284c7",
    items: ["Natural Language Queries", "Root Cause Analysis", "Anomaly Isolation", "Guided Remediation"],
    details:
      "AI intelligence sits atop the entire platform to correlate events, reduce alert fatigue, and provide natural language insights to IT teams.",
  },
];

export const WHY_KYBER_PILLARS: WhyKyberPillar[] = [
  {
    id: "hci-unified",
    title: "Unified HCI Console",
    subtitle: "One Dashboard",
    description:
      "Monitor clusters, virtual machines, backups, alerts, and CPU/memory/storage utilization from a single home dashboard.",
    icon: "Monitor",
  },
  {
    id: "migration",
    title: "Multi-Platform Migration",
    subtitle: "VMware to KYBER",
    description:
      "Migrate from VMware ESXi, Hyper-V, XenServer, Proxmox, or KVM with agent-based or agentless modes and zero-downtime focus.",
    icon: "RefreshCw",
  },
  {
    id: "sds",
    title: "Software-Defined Storage",
    subtitle: "Ceph & Hardware Freedom",
    description:
      "Hardware-agnostic SDS with automated provisioning and native Ceph integration for high-availability virtual storage.",
    icon: "Database",
  },
  {
    id: "log-automation",
    title: "Log Automation",
    subtitle: "MARSLOQ Ingestion",
    description:
      "Automated log ingestion, Grok normalization, and instant indexing for rapid enterprise search and archival.",
    icon: "Activity",
  },
  {
    id: "network-monitor",
    title: "Network Monitoring",
    subtitle: "120+ Device Templates",
    description:
      "ICMP, SNMP, HTTP(S), network discovery, and APM monitoring with 120+ pre-built device source templates.",
    icon: "Network",
  },
  {
    id: "local-ai",
    title: "Local AI Chatbot",
    subtitle: "Thai LLM On-Premise",
    description:
      "Privacy-first localized Thai LLM for offline natural language log queries — no cloud dependency for sensitive data.",
    icon: "MessageCircle",
  },
];

export const OUTCOME_STATEMENTS = [
  {
    title: "Reduce Infrastructure Complexity",
    desc: "Consolidate fragmented hypervisors, SAN storage, backup tools, and log analyzers into one unified KYBER ecosystem.",
    impact: "Unified Ecosystem",
  },
  {
    title: "Modernize Virtualization Without Lock-In",
    desc: "Deploy KSV enterprise hypervisor on existing hardware, avoiding aggressive hypervisor price increases and hardware refresh mandates.",
    impact: "Hardware Freedom",
  },
  {
    title: "Protect Workloads Against Ransomware",
    desc: "Combine KRG threat monitoring with immutable snapshots for near-zero downtime recovery from security incidents.",
    impact: "Near-Zero Downtime",
  },
  {
    title: "Accelerate IT Operations with MARSLOQ AI",
    desc: "Stream cluster logs into MARSLOQ OpenSearch engine with natural language AI troubleshooting for rapid incident resolution.",
    impact: "Sub-Second Search",
  },
];

export interface HeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface FeaturedAnnouncement {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  accentColor: string;
}

export interface PlatformPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface PlatformStat {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface CustomerStory {
  id: string;
  title: string;
  headline: string;
  description: string;
  metric: string;
  metricLabel: string;
  industry: string;
  image: string;
  href: string;
}

export interface ResourceCard {
  id: string;
  title: string;
  description: string;
  type: string;
  href: string;
  image?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export interface GetStartedCta {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  product: string;
}

export const HERO_CONTENT: HeroContent = {
  badge: "KYBER HCI & MARSLOQ",
  headline: "The Future of",
  headlineAccent: "Hyper-Converged Infrastructure.",
  subheadline: "Unified infrastructure and log intelligence — on any hardware.",
  primaryCta: { label: "Explore Products", href: "#product-highlights" },
  secondaryCta: { label: "MARSLOQ", href: "/products/marsloq" },
};

export const FEATURED_ANNOUNCEMENT: FeaturedAnnouncement = {
  eyebrow: "MARSLOQ",
  title: "Log, Monitor & AI — On-Premise",
  description: "",
  cta: { label: "Discover MARSLOQ", href: "/products/marsloq" },
  accentColor: "#14b8a6",
};

export const PLATFORM_PILLARS: PlatformPillar[] = [
  {
    id: "complexity",
    title: "Reduced Complexity",
    description: "",
    icon: "Layers",
    href: "/products/hci",
  },
  {
    id: "security",
    title: "Enhanced Security",
    description: "",
    icon: "ShieldCheck",
    href: "/products/krg",
  },
  {
    id: "future-proof",
    title: "Future-Proof Scale",
    description: "",
    icon: "RefreshCw",
    href: "/solutions/vmware-migration",
  },
];

export const PLATFORM_STATS: PlatformStat[] = [
  {
    value: "99.999%",
    label: "Cluster Availability",
    description: "KYBER HCI high-availability architecture",
    icon: "Server",
  },
  {
    value: "60%",
    label: "TCO Reduction",
    description: "Average savings vs. legacy hypervisor licensing",
    icon: "TrendingDown",
  },
  {
    value: "4.2M+",
    label: "Logs / Day",
    description: "MARSLOQ high-velocity log ingestion capacity",
    icon: "Activity",
  },
  {
    value: "<1 min",
    label: "Recovery RTO",
    description: "KRG + immutable snapshot instant restore",
    icon: "ShieldCheck",
  },
];

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    id: "fintech-hci",
    title: "Regional Bank Modernizes Core Infrastructure",
    headline: "60% TCO Cut with Zero-Downtime VMware Migration",
    description:
      "A leading financial institution migrated 200+ VMs from VMware to KYBER KSV on existing Dell x86 servers, eliminating hypervisor licensing costs while achieving 99.999% cluster availability.",
    metric: "60%",
    metricLabel: "TCO Reduction",
    industry: "Financial Services",
    image: "/assets/proj-datacenter.jpg",
    href: "/solutions/vmware-migration",
  },
  {
    id: "healthcare-krg",
    title: "Healthcare Provider Strengthens Ransomware Resilience",
    headline: "Sub-Minute Recovery from Ransomware Attack Simulation",
    description:
      "A hospital network deployed KRG Guard across KYBER HCI clusters with immutable air-gapped snapshots, passing DR drills with sub-minute RTO and zero data loss.",
    metric: "<1 min",
    metricLabel: "Recovery RTO",
    industry: "Healthcare",
    image: "/assets/proj-zerotrust.jpg",
    href: "/solutions/ransomware-resilience",
  },
  {
    id: "logistics-marsloq",
    title: "Logistics Enterprise Unifies Security Operations",
    headline: "10x Faster MTTR with MARSLOQ AI Log Analysis",
    description:
      "A global logistics operator centralized infrastructure logs from 50+ KYBER nodes into MARSLOQ, reducing mean-time-to-resolution from hours to minutes with AI-assisted troubleshooting.",
    metric: "10x",
    metricLabel: "Faster MTTR",
    industry: "Logistics",
    image: "/assets/proj-cloud.jpg",
    href: "/solutions/secops-log-management",
  },
  {
    id: "government-hci",
    title: "Government Agency Deploys Sovereign Private Cloud",
    headline: "Hardware Freedom on Standard x86 Servers",
    description:
      "A government agency built a sovereign private cloud on KYBER HCI using locally sourced x86 hardware, achieving full data sovereignty without vendor appliance lock-in.",
    metric: "100%",
    metricLabel: "Data Sovereignty",
    industry: "Government",
    image: "/assets/proj-compliance.jpg",
    href: "/solutions/enterprise-hci",
  },
];

export const RESOURCES_SECTION = {
  eyebrow: "Resources",
  title: "Guides for KYBER HCI & MARSLOQ",
  subtitle:
    "Reference architectures, migration playbooks, and product documentation to plan, deploy, and operate on standard x86 hardware — on your terms.",
  viewAllLabel: "View all resources",
  viewAllHref: "/resources",
} as const;

export const RESOURCE_CARDS: ResourceCard[] = [
  {
    id: "hci-guide",
    title: "Enterprise HCI Deployment Guide",
    description: "Consolidate compute, virtualization, and storage with KYBER HCI on any x86 server.",
    type: "Guide",
    href: "/resources/docs",
    image: "/assets/marsloq/marslog-8110/02-dashboard.png",
  },
  {
    id: "marsloq-ops",
    title: "MARSLOQ Observability & Log Operations",
    description: "Centralize logs, monitor infrastructure, and run on-premise AI-assisted analysis.",
    type: "Guide",
    href: "/resources/kb",
    image: "/assets/screenshots/marsloq-admin-dashboard.png",
  },
  {
    id: "vmware-migration",
    title: "VMware Migration Playbook",
    description: "Import OVA, OVF, and VMDK workloads to KSV without a mandatory hardware refresh.",
    type: "Playbook",
    href: "/solutions/vmware-migration",
    image: "/assets/screenshots/kyber-vm-migration.png",
  },
  {
    id: "architecture-ref",
    title: "Reference Architecture & Validated Designs",
    description: "HCI cluster patterns, multi-site DR, and MARSLOQ pipeline integration.",
    type: "Architecture",
    href: "/resources/architecture",
    image: "/assets/screenshots/marsloq-risk-summary.png",
  },
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "platform-demo",
    title: "KYBER Platform Live Demo",
    description: "See KYBER HCI, KRG, and MARSLOQ in action with a tailored live demonstration.",
    cta: "Book a Demo",
    href: "/contact",
  },
  {
    id: "test-drive",
    title: "KYBER Test Drive",
    description: "Hands-on experience with KYBER Management console and KSV hypervisor — no setup required.",
    cta: "Start Now",
    href: "/resources/downloads",
  },
  {
    id: "webinars",
    title: "Technical Webinars On Demand",
    description: "Expert sessions on HCI deployment, ransomware resilience, and MARSLOQ log analytics.",
    cta: "Watch Now",
    href: "/resources/docs",
  },
];

export const GET_STARTED_CTAS: GetStartedCta[] = [
  {
    id: "demo",
    title: "Book a Live Demo",
    description: "We'll guide you through a live demo tailored to your infrastructure and security requirements.",
    cta: "Book a Demo",
    href: "/contact",
    icon: "Play",
  },
  {
    id: "test-drive",
    title: "Take KYBER for a Test Drive",
    description: "Experience KYBER HCI, Management console, and MARSLOQ observability in a guided sandbox.",
    cta: "Start Now",
    href: "/resources/downloads",
    icon: "Rocket",
  },
  {
    id: "contact",
    title: "Talk to Our Architects",
    description: "Start a conversation with KYBER platform architects about your modernization roadmap.",
    cta: "Let's Talk",
    href: "/contact",
    icon: "MessageCircle",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "hci-migration",
    title: "Enterprise HCI & VMware Migration",
    category: "Infrastructure",
    description: "200+ VM migration from VMware to KYBER KSV with 60% TCO reduction on existing Dell hardware.",
    image: "/assets/proj-datacenter.jpg",
    href: "/solutions/vmware-migration",
    product: "KYBER HCI",
  },
  {
    id: "krg-shield",
    title: "Ransomware Resilience Architecture",
    category: "Security",
    description: "KRG behavioral detection and immutable snapshot recovery for healthcare critical workloads.",
    image: "/assets/proj-zerotrust.jpg",
    href: "/solutions/ransomware-resilience",
    product: "KRG Guard",
  },
  {
    id: "marsloq-secops",
    title: "Unified Security Operations Center",
    category: "Observability",
    description: "MARSLOQ SIEM correlation and AI log chatbot reducing MTTR by 10x across 50+ cluster nodes.",
    image: "/assets/proj-cloud.jpg",
    href: "/solutions/secops-log-management",
    product: "MARSLOQ",
  },
  {
    id: "ai-ops",
    title: "AI-Assisted Infrastructure Operations",
    category: "AI Operations",
    description: "KYBER AI Ops predictive forecasting and natural language troubleshooting for enterprise NOC teams.",
    image: "/assets/proj-ai.jpg",
    href: "/products/ai-ops",
    product: "KYBER AI Ops",
  },
  {
    id: "backup-dr",
    title: "Multi-Site Disaster Recovery",
    category: "Data Protection",
    description: "Cross-site asynchronous replication with 1-click failover orchestration achieving sub-minute RTO.",
    image: "/assets/proj-testing.jpg",
    href: "/products/backup-dr",
    product: "KYBER Protection",
  },
  {
    id: "sovereign-cloud",
    title: "Sovereign Private Cloud Deployment",
    category: "Infrastructure",
    description: "Government-grade private cloud on standard x86 with full data sovereignty and hardware freedom.",
    image: "/assets/proj-compliance.jpg",
    href: "/solutions/enterprise-hci",
    product: "KYBER HCI",
  },
];

export const CASE_STUDY_CATEGORIES = [
  "All",
  "Infrastructure",
  "Security",
  "Observability",
  "AI Operations",
  "Data Protection",
];

export const TESTIMONIALS = [
  {
    quote:
      "KYBER HCI eliminated our VMware licensing burden entirely. We migrated 200+ VMs to KSV on existing hardware with zero downtime and cut infrastructure TCO by 60%.",
    author: "Robert Chen",
    role: "CTO, Nexus Financial Group",
    rating: 5,
    photo: "/assets/team-cto.jpg",
    product: "KYBER HCI & KSV",
  },
  {
    quote:
      "KRG Guard detected a ransomware simulation within seconds and restored our critical VMs from immutable snapshots in under a minute. This is the protection layer we needed.",
    author: "Sarah Jenkins",
    role: "Head of Infrastructure, Apex Healthcare",
    rating: 5,
    photo: "/assets/team-infra.jpg",
    product: "KRG Guard",
  },
  {
    quote:
      "MARSLOQ transformed our operations. AI-assisted log analysis reduced our mean-time-to-resolution by 10x across our entire KYBER cluster fleet.",
    author: "Marcus Vance",
    role: "VP of Engineering, DataScale Logistics",
    rating: 5,
    photo: "/assets/team-vp.jpg",
    product: "MARSLOQ",
  },
];

export const COMPANY_INFO = {
  legalName: "KYBER Technology Co., Ltd.",
  legalNameTh: "บริษัท ไคเบอร์ เทคโนโลยี จำกัด",
  phone: "099-153-888",
  phoneTel: "+6699153888",
  phoneSecondary: "064-642-3617",
  phoneSecondaryTel: "+66646423617",
  installationPhone: "064-642-3617",
  installationPhoneTel: "+66646423617",
  registrationEmail: "supawat@kyber-it.com",
  supportEmail: "supawat@kyber-it.com",
  website: "www.kyber-it.com",
  websiteUrl: "https://www.kyber-it.com",
  address:
    "79/125 หมู่ที่ 10 ตำบลบางแม่นาง อำเภอบางใหญ่ จังหวัดนนทบุรี 11140",
  addressEn:
    "79/125 Moo 10, Bang Ma Nang, Bang Yai, Nonthaburi 11140, Thailand",
  country: "Thailand",
  countryTh: "ประเทศไทย",
  originLabel: "Engineered & made in Thailand",
  originLabelTh: "ผลิตภัณฑ์จากประเทศไทย",
  thailandFlagSrc: "/assets/brand/thailand-flag.svg",
  taxId: "0125569011951",
  hours: "Mon - Fri: 09:00 - 18:00 (ICT)",
  tagline:
    "KYBER delivers hyper-converged infrastructure, ransomware defense, and intelligent observability — one unified platform for the modern enterprise.",
};

export const FOOTER_LEGAL_LINKS = [
  { label: "Security & Compliance", href: "/security" },
  { label: "Contact", href: "/contact" },
  { label: "Documentation", href: "/resources/docs" },
] as const;
