export interface Product {
  id: string;
  name: string;
  code?: string;
  category: "Infrastructure" | "Security" | "Observability" | "Data Protection" | "Platform";
  tagline: string;
  description: string;
  capabilities: string[];
  accent: string;
  visualType: "hci" | "observability" | "security" | "generic";
  position: [number, number, number];
  href: string;
}

export const products: Product[] = [
  {
    id: "kyber-hci",
    name: "KYBER HCI",
    code: "HCI",
    category: "Infrastructure",
    tagline: "The Future of Hyper-Converged Infrastructure",
    description:
      "Unified HCI platform for modern data centers — enterprise hypervisor, networking, software-defined storage, cluster HA, security, and backup on standard x86 servers.",
    capabilities: [
      "Home Dashboard & Utilization Metrics",
      "VMware / Hyper-V / XenServer / Proxmox Migration",
      "Physical NIC & Role Assignment",
      "Ceph Software-Defined Storage",
      "Multi-Node Cluster HA",
      "Microsegmentation & Virtual Firewall",
    ],
    accent: "#0066ff",
    visualType: "hci",
    position: [-2.7, -1.1, 0],
    href: "/products/hci",
  },
  {
    id: "ksv",
    name: "KSV",
    code: "KSV",
    category: "Infrastructure",
    tagline: "KYBER Server Virtualization Hypervisor",
    description:
      "Enterprise hypervisor optimized for high-density virtual machine workloads, zero-downtime live migration, and instant OVA/OVF/VMDK workload importing.",
    capabilities: [
      "Low-Overhead Hypervisor Engine",
      "Native OVA / OVF / VMDK Support",
      "Live VM Migration",
      "Instant Snapshots & Clones",
      "HTML5 / VNC VM Console",
      "NUMA & Memory Tuning",
    ],
    accent: "#38bdf8",
    visualType: "generic",
    position: [-1.8, 0, 0.5],
    href: "/products/ksv",
  },
  {
    id: "ksan",
    name: "KSAN",
    code: "KSAN",
    category: "Infrastructure",
    tagline: "Software-Defined Distributed Storage",
    description:
      "Resilient distributed storage mesh aggregating local NVMe, SSD, and HDD drives across server nodes with automated tiering and self-healing data placement.",
    capabilities: [
      "Distributed NVMe Pool",
      "Self-Healing Mesh",
      "Block & File Access",
      "Inline Deduplication",
      "Zero-Single-Point-Of-Failure",
      "Hardware Agnostic Storage",
    ],
    accent: "#0284c7",
    visualType: "generic",
    position: [-3.5, 0.5, -0.5],
    href: "/products/ksan",
  },
  {
    id: "kyber-management",
    name: "KYBER Management",
    code: "KM",
    category: "Platform",
    tagline: "Unified Enterprise Control Plane",
    description:
      "Single-pane-of-glass management console providing real-time telemetry, cluster health metrics, VM orchestration, role-based access control, and REST automation.",
    capabilities: [
      "Multi-Cluster Management",
      "Real-Time Telemetry & Health",
      "VM Provisioning & Console",
      "Role-Based Access Control (RBAC)",
      "Capacity Planning & Forecasting",
      "RESTful API & Automation CLI",
    ],
    accent: "#6366f1",
    visualType: "generic",
    position: [0, 0, 1.2],
    href: "/products/management",
  },
  {
    id: "krg",
    name: "KRG Guard",
    code: "KRG",
    category: "Security",
    tagline: "KYBER Ransomware Guard",
    description:
      "Continuous threat monitoring and behavioral protection layer surrounding KYBER infrastructure and virtual workloads to detect, isolate, and recover from attacks.",
    capabilities: [
      "Behavioral Ransomware Detection",
      "Threat Quarantine & Isolation",
      "Immutable Air-Gapped Snapshots",
      "Security Event Correlation",
      "Instant Clean Snapshot Recovery",
      "Workload Integrity Audits",
    ],
    accent: "#8b5cf6",
    visualType: "security",
    position: [2.7, -1.1, 0],
    href: "/products/krg",
  },
  {
    id: "marsloq",
    name: "MARSLOQ",
    code: "MSL",
    category: "Observability",
    tagline: "Log Automation, Monitoring & Local AI",
    description:
      "Centralized log management with syslog ingestion, SNMP/ICMP monitoring, AI security analytics, and an on-premise Thai LLM assistant — built for regulated enterprises.",
    capabilities: [
      "Log Automation & Grok Tools",
      "120+ Device Monitoring Templates",
      "AI Analyzer & ISM Policy",
      "Mini AI Local Chatbot (Thai LLM)",
      "APM & Network Discovery",
      "Report Center & External Archive",
    ],
    accent: "#14b8a6",
    visualType: "observability",
    position: [0, 1.5, -0.4],
    href: "/products/marsloq",
  },
  {
    id: "backup-dr",
    name: "KYBER Protection",
    code: "BKP",
    category: "Data Protection",
    tagline: "Backup & Multi-Site Disaster Recovery",
    description:
      "Automated snapshot scheduling, cross-cluster asynchronous replication, and 1-click failover orchestration ensuring enterprise business continuity.",
    capabilities: [
      "Automated Snapshot Policies",
      "Cross-Site Asynchronous DR",
      "1-Click Failover Orchestration",
      "Granular VM & File Restore",
      "Bandwidth Throttling",
      "Immutable Recovery Points",
    ],
    accent: "#ec4899",
    visualType: "generic",
    position: [1.8, -2, 0],
    href: "/products/backup-dr",
  },
  {
    id: "ai-ops",
    name: "KYBER AI Ops",
    code: "AIOps",
    category: "Observability",
    tagline: "AI-Assisted Operations & Intelligence",
    description:
      "Embedded AI engine analyzing infrastructure telemetry, log streams, and security alerts to provide natural language insights and automated troubleshooting.",
    capabilities: [
      "Natural Language Log Queries",
      "Automated Root Cause Analysis",
      "Predictive Capacity Forecasting",
      "Alert Noise Deduplication",
      "Guided Incident Playbooks",
    ],
    accent: "#f59e0b",
    visualType: "generic",
    position: [0, -1.5, 0],
    href: "/products/ai-ops",
  },
];

export interface EcosystemFlow {
  from: string;
  to: string;
  label: string;
}

export const flows: EcosystemFlow[] = [
  { from: "kyber-hci", to: "marsloq", label: "Infrastructure events flow into MARSLOQ for observability" },
  { from: "kyber-hci", to: "krg", label: "Workloads guarded continuously by KRG security layer" },
  { from: "marsloq", to: "krg", label: "Correlated observability signals strengthen threat intelligence" },
  { from: "kyber-management", to: "kyber-hci", label: "Single control plane commands cluster operations" },
];

export const managementMetrics = [
  { label: "Cluster Nodes", value: "8 Active" },
  { label: "Virtual Machines", value: "142 Running" },
  { label: "CPU Usage", value: "34%" },
  { label: "Memory Usage", value: "58%" },
  { label: "Storage Mesh", value: "128 TB" },
  { label: "Log Streams", value: "4.2M / day" },
  { label: "Active Alerts", value: "0 Critical" },
  { label: "KRG Shield", value: "Protected" },
];
