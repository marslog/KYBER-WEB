/** Content sourced from KYBER-HCI.pptx and MARSLOQ Presentation TON.pptx */

export interface PlatformStackLayer {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
}

export interface PresentationFeature {
  id: string;
  title: string;
  icon: string;
  description: string;
  bullets?: string[];
}

export interface ShowcaseMetric {
  value: string;
  label: string;
}

export interface ShowcaseHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ShowcaseUiSlide {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
}

export type ShowcaseViewId = "architecture" | "ui" | "video";

export const PLATFORM_SHOWCASE_VIEWS: {
  id: ShowcaseViewId;
  label: string;
}[] = [
  { id: "architecture", label: "Diagram" },
  { id: "ui", label: "Interface" },
  { id: "video", label: "Demo" },
];

export interface PresentationProduct {
  id: string;
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  lead?: string;
  logo: string;
  logoAlt: string;
  logoHeight: number;
  image: string;
  imageAlt: string;
  video?: string;
  videoPoster?: string;
  videoAspect?: string;
  imageAspect: string;
  imageObjectPosition?: string;
  features: PresentationFeature[];
  licensing?: string[];
  stackLayers: PlatformStackLayer[];
  architectureDiagram?: string;
  architectureDiagramAlt?: string;
  showcaseMetrics?: ShowcaseMetric[];
  showcaseHighlights?: ShowcaseHighlight[];
  showcaseBullets?: string[];
  showcaseUiSlides?: ShowcaseUiSlide[];
}

export const PRODUCT_SHOWCASE_IMAGE_ASPECT = "1440/1065";
export const PRODUCT_HERO_SHOWCASE_ASPECT = "16/9";
export const PRODUCT_HERO_SHOWCASE_WIDTH = 1440;
export const PRODUCT_HERO_SHOWCASE_HEIGHT = 810;

export const KYBER_HCI_PRESENTATION: PresentationProduct = {
  id: "kyber-hci",
  name: "KYBER HCI",
  eyebrow: "Infrastructure",
  tagline: "The future of hyper-converged infrastructure",
  summary:
    "Enterprise HCI with an integrated hypervisor — compute, storage, networking, security, and backup in one console. Scale node by node on standard x86 without separate silos for storage or virtualization.",
  lead: "Deploy on any x86 hardware from Dell, HPE, Lenovo, or Cisco. Operate with enterprise-grade control, synchronous replication, and automatic failover from day one.",
  logo: "/assets/logos/kyber-hci-logo.png",
  logoAlt: "KYBER HCI logo",
  logoHeight: 96,
  image: "/assets/screenshots/kyber-hci-hero-showcase.jpg",
  imageAlt: "KYBER HCI — hyper-converged infrastructure platform",
  video: "/assets/videos/kyber-hci-migrate.web.mp4",
  videoPoster: "/assets/screenshots/kyber-hci-hero-showcase.jpg",
  videoAspect: "1920/956",
  imageAspect: PRODUCT_HERO_SHOWCASE_ASPECT,
  imageObjectPosition: "center center",
  architectureDiagram: "/assets/diagrams/kyber-hci-scvm-architecture.png",
  architectureDiagramAlt:
    "KYBER HCI architecture — clustered nodes with Storage Controller VMs (SCVM), active RAID controllers, hypervisor pass-through, VM I/O, failover + fallback, and hybrid cloud connection to AWS and Azure",
  features: [
    { id: "nodes", title: "Cluster Nodes", icon: "Server", description: "Multi-node HA with capacity, health, and performance metrics built in.", bullets: [] },
    { id: "storage", title: "SDS Storage", icon: "Database", description: "Ceph-based distributed storage that scales with every node you add.", bullets: [] },
    { id: "networking", title: "Networking", icon: "Network", description: "Physical NICs, VLANs, and software-defined networking in a single stack.", bullets: [] },
    { id: "migration", title: "VM Migration", icon: "RefreshCw", description: "Import workloads from VMware, Hyper-V, and other platforms without friction.", bullets: [] },
    { id: "security", title: "Security", icon: "ShieldCheck", description: "Microsegmentation and virtual firewall policies across your cluster.", bullets: [] },
    { id: "backup", title: "Backup & DR", icon: "Layers", description: "Policy-driven snapshots and disaster recovery you can trust.", bullets: [] },
    { id: "dashboard", title: "Dashboard", icon: "Monitor", description: "Cluster health, VMs, and backup status in one real-time view.", bullets: [] },
    { id: "admin", title: "RBAC & Admin", icon: "Settings", description: "Role-based access, licensing, and administration from one pane.", bullets: [] },
  ],
  licensing: ["Starter Pack", "Enterprise Scale"],
  showcaseMetrics: [
    { value: "2 + 1", label: "Node + witness HA" },
    { value: "Any x86", label: "Hardware freedom" },
    { value: "1 console", label: "Unified operations" },
  ],
  showcaseHighlights: [
    {
      id: "nodes",
      title: "Cluster HA",
      description: "Multi-node health, capacity, and performance in real time.",
      icon: "Server",
    },
    {
      id: "storage",
      title: "SDS storage",
      description: "Ceph-based distributed storage that grows with every node.",
      icon: "Database",
    },
    {
      id: "security",
      title: "Built-in security",
      description: "Microsegmentation, virtual firewall, and Ransomware Guard.",
      icon: "ShieldCheck",
    },
    {
      id: "backup",
      title: "Backup & DR",
      description: "Policy-driven snapshots and disaster recovery you control.",
      icon: "Layers",
    },
  ],
  showcaseBullets: [
    "Synchronous replication with automatic failover",
    "Migrate VMs from VMware, Hyper-V, and KVM",
    "RBAC, licensing, and cluster admin from one pane",
  ],
  showcaseUiSlides: [
    {
      id: "dashboard",
      title: "Cluster dashboard",
      image: "/assets/screenshots/kyber-hci-dashboard.png",
      imageAlt: "KYBER HCI cluster dashboard with health, VMs, and storage metrics",
      width: 1440,
      height: 1065,
    },
    {
      id: "migration",
      title: "VM migration wizard",
      image: "/assets/screenshots/kyber-vm-migration-wizard.png",
      imageAlt: "KYBER HCI VM migration wizard importing workloads",
      width: 1594,
      height: 801,
    },
    {
      id: "console",
      title: "Management console",
      image: "/assets/screenshots/kyber-hci-hero-showcase.jpg",
      imageAlt: "KYBER HCI unified management console",
      width: 1440,
      height: 810,
    },
  ],
  stackLayers: [
    {
      id: "hardware",
      label: "Hardware Freedom",
      subtitle: "Standard x86 — Dell, HPE, Lenovo, Cisco",
      icon: "Server",
    },
    {
      id: "core",
      label: "KSV + KSAN",
      subtitle: "Hypervisor & software-defined storage",
      icon: "Database",
    },
    {
      id: "protection",
      label: "Security & Backup",
      subtitle: "Microsegmentation, KRG, snapshots & DR",
      icon: "ShieldCheck",
    },
    {
      id: "workloads",
      label: "Workloads",
      subtitle: "VMs, migration & unified console",
      icon: "Monitor",
    },
  ],
};

export const MARSLOQ_PRESENTATION: PresentationProduct = {
  id: "marsloq",
  name: "MARSLOQ",
  eyebrow: "Observability",
  tagline: "Next-generation centralized log management",
  summary:
    "Enterprise log management with syslog ingestion, centralized logging, network monitoring, AI security analytics, and on-premise Thai LLM — ingest, parse, index, and investigate logs without sending data off-site.",
  lead: "Grok parsing pipelines, OpenSearch-backed search, and 120+ SNMP templates ship ready to deploy. Investigate faster with AI that never leaves your network.",
  logo: "/assets/logos/marsloq-logo.png",
  logoAlt: "MARSLOQ logo",
  logoHeight: 96,
  image: "/assets/screenshots/marsloq-hero-showcase.jpg",
  imageAlt: "MARSLOQ — AI-powered log analysis and monitoring",
  video: "/assets/videos/marsloq-dashboard.web.mp4",
  videoPoster: "/assets/screenshots/marsloq-hero-showcase.jpg",
  videoAspect: "1920/944",
  imageAspect: PRODUCT_HERO_SHOWCASE_ASPECT,
  imageObjectPosition: "center center",
  features: [
    { id: "log-automation", title: "Log Automation", icon: "Activity", description: "Grok parsing, ingestion pipelines, and automated log workflows at scale.", bullets: [] },
    { id: "monitoring", title: "Network Monitor", icon: "Network", description: "SNMP and ICMP monitoring with 120+ ready-to-use device templates.", bullets: [] },
    { id: "ai-security", title: "AI Security", icon: "ShieldCheck", description: "AI-driven threat detection and ISM policy analysis in real time.", bullets: [] },
    { id: "local-ai", title: "Local AI Chat", icon: "MessageCircle", description: "Privacy-first Thai LLM assistant that never leaves your network.", bullets: [] },
  ],
  licensing: ["Log Analyzer", "Standard", "Advance"],
  showcaseMetrics: [
    { value: "120+", label: "SNMP templates" },
    { value: "On-prem", label: "Data stays local" },
    { value: "1 console", label: "Unified observability" },
  ],
  showcaseHighlights: [
    {
      id: "log-automation",
      title: "Log automation",
      description: "Grok parsing and ingestion pipelines at enterprise scale.",
      icon: "Activity",
    },
    {
      id: "monitoring",
      title: "Network monitor",
      description: "SNMP and ICMP with 120+ ready device templates.",
      icon: "Network",
    },
    {
      id: "ai-security",
      title: "AI security",
      description: "Threat detection and ISM policy analysis in real time.",
      icon: "ShieldCheck",
    },
    {
      id: "local-ai",
      title: "Local AI chat",
      description: "Privacy-first Thai LLM that never leaves your network.",
      icon: "MessageCircle",
    },
  ],
  showcaseBullets: [
    "OpenSearch indexing with hot, warm, and cold retention",
    "AI-driven alerting and correlation in real time",
    "Fully on-premise — no cloud dependency required",
  ],
  showcaseUiSlides: [
    {
      id: "admin-dashboard",
      title: "Admin dashboard",
      image: "/assets/screenshots/marsloq-admin-dashboard.png",
      imageAlt: "MARSLOQ admin dashboard with live events and severity analytics",
      width: 1440,
      height: 1065,
    },
    {
      id: "log-search",
      title: "Log search",
      image: "/assets/screenshots/marsloq-log-search.png",
      imageAlt: "MARSLOQ centralized log search interface",
      width: 1440,
      height: 668,
    },
    {
      id: "threat-intel",
      title: "Threat intelligence",
      image: "/assets/screenshots/marsloq-threat-intelligence.png",
      imageAlt: "MARSLOQ security risk index and incident trends",
      width: 976,
      height: 662,
    },
    {
      id: "device-monitoring",
      title: "Device monitoring",
      image: "/assets/screenshots/marsloq-device-monitoring.png",
      imageAlt: "MARSLOQ SNMP device monitoring and interface history",
      width: 1870,
      height: 946,
    },
  ],
  stackLayers: [
    {
      id: "sources",
      label: "Log Sources",
      subtitle: "Agents, syslog, SNMP & device telemetry",
      icon: "Activity",
    },
    {
      id: "ingestion",
      label: "Ingestion & Parsing",
      subtitle: "Grok pipelines & normalization at scale",
      icon: "Network",
    },
    {
      id: "engine",
      label: "OpenSearch Engine",
      subtitle: "Indexing, search & long-term retention",
      icon: "Database",
    },
    {
      id: "intelligence",
      label: "Intelligence",
      subtitle: "AI security, Thai LLM & dashboards",
      icon: "Sparkles",
    },
  ],
};

export const MARSLOQ_FEATURE_CHIPS = MARSLOQ_PRESENTATION.features;

export const APPLIANCE_HIGHLIGHTS = [
  { label: "Log Automation", icon: "Activity" },
  { label: "Network Monitor", icon: "Network" },
  { label: "AI Security", icon: "ShieldCheck" },
  { label: "Local AI Chat", icon: "MessageCircle" },
];
