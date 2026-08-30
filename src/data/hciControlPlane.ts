/**
 * KYBER HCI control-plane / hybrid architecture diagram content.
 * Structured data — rendered dynamically by HciControlPlaneDiagram.
 * Adapted from a hybrid cloud management-plane reference to KYBER's own
 * capabilities (see KYBER_HCI_PRESENTATION in presentationContent.ts).
 */

export interface ControlPlaneGroup {
  label: string;
  icon: string;
  items: string[];
}

export interface EdgeCluster {
  /** number of stacked rack units drawn for this on-prem node group */
  racks: number;
  /** workload glyphs shown above the rack (vm | k8s | storage) */
  workloads: Array<"vm" | "k8s" | "storage">;
}

export interface HciControlPlaneContent {
  eyebrow: string;
  heading: string;
  intro: string;
  operators: { label: string; icon: string };
  tools: { title: string; icon: string; items: string[] };
  controlPlane: { title: string; icon: string; quadrants: ControlPlaneGroup[] };
  serviceGroups: ControlPlaneGroup[];
  fabric: { label: string; icon: string };
  edge: {
    label: string;
    note: string;
    clusters: EdgeCluster[];
  };
}

export const HCI_CONTROL_PLANE: HciControlPlaneContent = {
  eyebrow: "Architecture",
  heading: "One control plane, from datacenter to edge",
  intro:
    "Operators reach every KYBER-enabled node through a single control plane — the same access, inventory, automation, and governance whether workloads run in the core datacenter or at the edge.",
  operators: { label: "KYBER Operators", icon: "UserCog" },
  tools: {
    title: "Tools & experiences",
    icon: "SquareTerminal",
    items: ["Console", "Shell", "CLI", "REST API", "SDK", "Marketplace"],
  },
  controlPlane: {
    title: "KYBER Control Plane",
    icon: "Layers",
    quadrants: [
      {
        label: "Access & security",
        icon: "ShieldCheck",
        items: ["RBAC", "Locks", "Tenants"],
      },
      {
        label: "Organization & inventory",
        icon: "LayoutGrid",
        items: ["Search", "Groups", "Tags"],
      },
      {
        label: "Environments & automation",
        icon: "Workflow",
        items: ["Templates", "Extensions"],
      },
      {
        label: "Governance & compliance",
        icon: "ClipboardCheck",
        items: ["Logs", "Policy", "Audit"],
      },
    ],
  },
  serviceGroups: [
    {
      label: "KYBER HCI",
      icon: "Server",
      items: ["Compute", "SDS Storage", "Networking"],
    },
    {
      label: "App & data services",
      icon: "Database",
      items: ["Kubernetes", "Databases", "Object store", "Functions"],
    },
    {
      label: "Management services",
      icon: "Gauge",
      items: ["Monitor", "Update", "Backup & DR", "Ransomware Guard"],
    },
  ],
  fabric: {
    label: "KYBER-enabled nodes, Kubernetes, apps & data services",
    icon: "Network",
  },
  edge: {
    label: "Edge / On-premises location",
    note: "Runs on any x86 hardware — deploy in the core datacenter or at the edge.",
    clusters: [
      { racks: 2, workloads: ["vm", "k8s"] },
      { racks: 4, workloads: ["vm", "vm", "k8s", "storage"] },
      { racks: 4, workloads: ["vm", "k8s", "k8s", "storage"] },
      { racks: 2, workloads: ["vm", "storage"] },
    ],
  },
};
