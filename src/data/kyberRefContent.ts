export interface KyberRefMetric {
  value: string;
  label: string;
}

export const KYBER_REF_CONTENT = {
  eyebrow: "Trusted by",
  subtitle:
    "Organizations across healthcare, industry, and enterprise run mission-critical workloads on KYBER — from hospital networks to manufacturing and national infrastructure.",
  metrics: [
    { value: "12+", label: "Reference customers" },
    { value: "3", label: "Key industries" },
    { value: "TH", label: "Nationwide deployments" },
  ] satisfies KyberRefMetric[],
  pillars: [
    { label: "Healthcare", tone: "health" as const },
    { label: "Industry", tone: "industry" as const },
    { label: "Enterprise", tone: "enterprise" as const },
  ],
};
