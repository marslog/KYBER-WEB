/**
 * KYBER HCI cluster diagram content for the homepage Platform row.
 * KYBER's real 2 Node + Witness architecture, expressed as structured data
 * and rendered dynamically by KyberHciClusterDiagram (on-brand, no stock art).
 */

export interface HciNodeLayer {
  label: string;
  icon: string;
}

export interface HciClusterContent {
  cloud: { label: string; icon: string };
  cluster: { title: string; subtitle: string };
  nodes: { name: string; layers: HciNodeLayer[] }[];
  witness: { label: string; note: string; icon: string };
  replication: string;
  failover: string;
  storage: { label: string; disks: Array<"ssd" | "hdd"> };
  sharedServices: { label: string; icon: string }[];
}

export const HCI_CLUSTER: HciClusterContent = {
  cloud: { label: "Hybrid cloud", icon: "Cloud" },
  cluster: { title: "KYBER HCI Cluster", subtitle: "2 Node + Witness" },
  nodes: [
    {
      name: "Node 1",
      layers: [
        { label: "User & app VMs", icon: "Box" },
        { label: "KYBER Hypervisor", icon: "Layers" },
        { label: "SDS storage · replica", icon: "HardDrive" },
      ],
    },
    {
      name: "Node 2",
      layers: [
        { label: "User & app VMs", icon: "Box" },
        { label: "KYBER Hypervisor", icon: "Layers" },
        { label: "SDS storage · replica", icon: "HardDrive" },
      ],
    },
  ],
  witness: { label: "Witness", note: "Quorum", icon: "ShieldCheck" },
  replication: "Synchronous replication",
  failover: "Automatic failover",
  storage: {
    label: "Distributed storage",
    disks: ["ssd", "ssd", "hdd", "hdd", "hdd"],
  },
  sharedServices: [
    { label: "Backup & DR", icon: "RefreshCw" },
    { label: "Monitoring", icon: "Activity" },
    { label: "Ransomware Guard", icon: "ShieldCheck" },
    { label: "VM Migration", icon: "Network" },
  ],
};
