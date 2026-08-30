export interface ProductScreenshot {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface ProductScreenshotGroup {
  id: string;
  product: string;
  portal: string;
  tagline: string;
  description: string;
  screenshots: ProductScreenshot[];
}

const MARSLOQ_SHOTS: ProductScreenshot[] = [
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    description:
      "Live system overview with 5,400+ events, CPU/memory gauges, severity distribution, vendor sources, and top host analytics.",
    image: "/assets/screenshots/marsloq-admin-dashboard.png",
    category: "Dashboard",
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "Real-time telemetry with severity distribution, vendor sources, and top host analytics.",
    image: "/assets/marsloq/marslog-8885/02-dashboard.png",
    category: "Analytics",
  },
  {
    id: "infrastructure-overview",
    title: "Infrastructure Overview",
    description:
      "Resource map, bandwidth trends, device health indicators, and active alert correlation.",
    image: "/assets/marsloq/marslog-8885/03-infrastructure.png",
    category: "Monitoring",
  },
  {
    id: "device-monitoring",
    title: "Device Monitoring",
    description:
      "Infrastructure overview with service map, firewall load gauges, interface status, and top host utilization.",
    image: "/assets/screenshots/marsloq-device-monitoring.png",
    category: "Devices",
  },
  {
    id: "risk-summary",
    title: "Risk Summary Report",
    description:
      "Enterprise security risk index, incident trends, and event-to-case conversion analytics.",
    image: "/assets/screenshots/marsloq-risk-summary.png",
    category: "Security",
  },
  {
    id: "executive-details",
    title: "Executive Details",
    description:
      "High-level event statistics, threat level assessment, and operational recommendations.",
    image: "/assets/screenshots/marsloq-executive-details.png",
    category: "Reporting",
  },
  {
    id: "threat-intelligence",
    title: "Threat Intelligence",
    description:
      "OWASP risk assessment, UEBA entity behavior analysis, and source IP intelligence.",
    image: "/assets/screenshots/marsloq-threat-intelligence.png",
    category: "SIEM",
  },
  {
    id: "file-share-activity",
    title: "File Share Activity",
    description:
      "Windows file share audit trail with user actions, paths, and access results.",
    image: "/assets/screenshots/marsloq-file-share-activity.png",
    category: "Logs",
  },
  {
    id: "source-ip-activity",
    title: "Source IP Activity",
    description:
      "Detailed source IP analysis with allowed, denied, and critical event breakdowns.",
    image: "/assets/screenshots/marsloq-source-ip-activity.png",
    category: "Analysis",
  },
  {
    id: "index-management",
    title: "Index Management",
    description:
      "OpenSearch index lifecycle management with pattern filtering and storage overview.",
    image: "/assets/screenshots/marsloq-index-management.png",
    category: "Storage",
  },
  {
    id: "agent-download",
    title: "Agent Download",
    description:
      "Deploy log collection agents across Linux, Windows, and network devices.",
    image: "/assets/marsloq/marslog-8885/04-agent-download.png",
    category: "Collection",
  },
  {
    id: "custom-report",
    title: "Custom Report",
    description:
      "Generate tailored daily canvas reports with severity breakdowns, host analytics, and source or destination IP trends.",
    image: "/assets/screenshots/marsloq-custom-report.png",
    category: "Reports",
  },
];

const KYBER_HCI_SHOTS: ProductScreenshot[] = [
  {
    id: "cluster-dashboard",
    title: "Cluster Dashboard",
    description:
      "Real-time cluster health with node status, resource gauges, VM inventory, and subsystem monitoring.",
    image: "/assets/marsloq/marslog-8110/02-dashboard.png",
    category: "Dashboard",
  },
  {
    id: "virtual-machines",
    title: "Virtual Machines",
    description:
      "Complete VM lifecycle management across kyber1, Kyber2, and witness nodes.",
    image: "/assets/marsloq/marslog-8110/04-virtual-machines.png",
    category: "Compute",
  },
  {
    id: "vm-migration-console",
    title: "VM Migration Console",
    description:
      "Agent-based migration wizard with connect, discover, sync, cutover, and validate steps.",
    image: "/assets/screenshots/kyber-vm-migration.png",
    category: "Migration",
  },
  {
    id: "vm-migration-wizard",
    title: "Migration Wizard",
    description:
      "Step-by-step VMware-to-KYBER migration with agent installation and VM selection.",
    image: "/assets/screenshots/kyber-vm-migration-wizard.png",
    category: "Migration",
  },
  {
    id: "vm-migration-module",
    title: "VM Migration Module",
    description:
      "OVA/OVF/VMDK import and live migration orchestration within KYBER Management.",
    image: "/assets/marsloq/marslog-8110/05-vm-migration.png",
    category: "Migration",
  },
  {
    id: "cluster-management",
    title: "Cluster Management",
    description:
      "Multi-node cluster orchestration with HA configuration and witness node management.",
    image: "/assets/marsloq/marslog-8110/09-cluster-management.png",
    category: "Cluster",
  },
  {
    id: "kyber-hci-overview",
    title: "KYBER HCI Overview",
    description:
      "End-to-end hyper-converged platform combining compute, storage, networking, and backup.",
    image: "/assets/marsloq/marslog-8110/10-kyber-hci.png",
    category: "Platform",
  },
  {
    id: "node-kyber1",
    title: "Node: kyber1",
    description: "Individual node monitoring and resource allocation view.",
    image: "/assets/marsloq/marslog-8110/06-kyber1.png",
    category: "Nodes",
  },
  {
    id: "node-kyber2",
    title: "Node: Kyber2",
    description: "Compute node status with temperature and NVMe health metrics.",
    image: "/assets/marsloq/marslog-8110/07-kyber2.png",
    category: "Nodes",
  },
];

export const MARSLOQ_SCREENSHOT_GROUPS: ProductScreenshotGroup[] = [
  {
    id: "marsloq-observability",
    product: "MARSLOQ",
    portal: "Log & Observability Platform",
    tagline: "Intelligent log analytics and infrastructure monitoring",
    description:
      "Enterprise log aggregation, OpenSearch analytics, SIEM correlation, and AI-assisted operations — from a single unified console.",
    screenshots: MARSLOQ_SHOTS,
  },
  {
    id: "kyber-hci-console",
    product: "KYBER HCI",
    portal: "Unified Management Console",
    tagline: "Hyper-converged infrastructure control plane",
    description:
      "Full-stack HCI management for virtual machines, cluster nodes, storage pools, migration, and backup.",
    screenshots: KYBER_HCI_SHOTS,
  },
];

export const MARSLOQ_HERO_IMAGE = "/assets/screenshots/marsloq-hero-showcase.jpg";
export const KYBER_HCI_HERO_IMAGE = "/assets/screenshots/kyber-hci-hero-showcase.jpg";
export const HERO_PRODUCT_IMAGE = KYBER_HCI_HERO_IMAGE;
export const FEATURED_ANNOUNCEMENT_IMAGE = "/assets/screenshots/marsloq-ai-operations-hero.jpg";
export const MARSLOQ_LOG_APPLIANCE_IMAGE = "/assets/screenshots/marsloq-edge-studio.jpg";
export const MARSLOQ_EDGE_IMAGE = "/assets/screenshots/marsloq-edge-studio-v2.png";
export const MARSLOQ_ENTERPRISE_IMAGE = "/assets/screenshots/marsloq-enterprise-studio-v2.png";
export const APPLIANCE_SHOWCASE_ASPECT = "16/9";

export const MARSLOQ_LOG_APPLIANCE = {
  eyebrow: "Hardware",
  title: "MARSLOQ Log Appliances",
  description: "Edge and enterprise appliances for on-premise log management, syslog ingestion, and centralized logging.",
  models: [
    {
      name: "MARSLOQ Edge",
      formFactor: "Compact Appliance",
      image: MARSLOQ_EDGE_IMAGE,
      description:
        "Branch and edge deployments with log ingestion, Grok parsing, agent collection, and forwarding to a central MARSLOQ cluster.",
    },
    {
      name: "MARSLOQ Enterprise",
      formFactor: "1U Rack-Mount Server",
      image: MARSLOQ_ENTERPRISE_IMAGE,
      description:
        "Data center appliance with SNMP/ICMP monitoring, 120+ device templates, AI Analyzer, MarsloqViewer, and external archive to USB, NFS, FTP, or AWS.",
    },
  ],
  highlights: [
    "Log Automation",
    "Network Monitor",
    "AI Security",
    "Local AI Chat",
  ],
  metrics: [
    { value: "2", label: "Appliance tiers" },
    { value: "On-prem", label: "Log intelligence" },
    { value: "120+", label: "SNMP templates" },
  ],
  bullets: [
    "Edge appliances forward to a central MARSLOQ cluster",
    "Enterprise tier includes AI Analyzer and MarsloqViewer",
    "Archive to USB, NFS, FTP, or AWS without cloud lock-in",
  ],
};
