/**
 * MARSLOQ observability pipeline diagram content for the homepage Platform row.
 */

export interface ObservabilityLayer {
  label: string;
  icon: string;
}

export interface MarsloqObservabilityContent {
  ingress: { label: string; icon: string };
  platform: { title: string; subtitle: string };
  nodes: { name: string; layers: ObservabilityLayer[] }[];
  hub: { label: string; note: string; icon: string };
  pipeline: string;
  privacy: string;
  storage: { label: string; tiers: Array<{ label: string; variant: "hot" | "warm" | "cold" }> };
  sharedServices: { label: string; icon: string }[];
}

export const MARSLOQ_OBSERVABILITY: MarsloqObservabilityContent = {
  ingress: { label: "On-premise telemetry", icon: "Activity" },
  platform: { title: "MARSLOQ Platform", subtitle: "Centralized observability" },
  nodes: [
    {
      name: "Sources",
      layers: [
        { label: "Log agents", icon: "Activity" },
        { label: "Syslog & APIs", icon: "Network" },
        { label: "SNMP devices", icon: "Monitor" },
      ],
    },
    {
      name: "Search",
      layers: [
        { label: "OpenSearch", icon: "Database" },
        { label: "Indexing", icon: "Layers" },
        { label: "Retention", icon: "HardDrive" },
      ],
    },
  ],
  hub: { label: "Ingestion", note: "Grok", icon: "RefreshCw" },
  pipeline: "Real-time indexing & correlation",
  privacy: "Data never leaves your network",
  storage: {
    label: "Retention tiers",
    tiers: [
      { label: "HOT", variant: "hot" },
      { label: "HOT", variant: "hot" },
      { label: "WARM", variant: "warm" },
      { label: "COLD", variant: "cold" },
      { label: "COLD", variant: "cold" },
    ],
  },
  sharedServices: [
    { label: "AI Security", icon: "ShieldCheck" },
    { label: "Thai LLM", icon: "MessageCircle" },
    { label: "Dashboards", icon: "Monitor" },
    { label: "Alerts", icon: "Eye" },
  ],
};
