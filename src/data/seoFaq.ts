export interface SeoFaqItem {
  question: string;
  answer: string;
}

/** FAQ content for log-management rich results and on-page SEO. */
export const LOG_MANAGEMENT_FAQ: SeoFaqItem[] = [
  {
    question: "What is enterprise log management?",
    answer:
      "Enterprise log management collects, parses, indexes, and searches logs from servers, network devices, applications, and security tools in one platform. MARSLOQ by KYBER provides on-premise centralized log management with syslog ingestion, Grok parsing, and OpenSearch analytics.",
  },
  {
    question: "Does MARSLOQ support syslog and centralized logging?",
    answer:
      "Yes. MARSLOQ ingests syslog, SNMP, ICMP, and agent-based telemetry from KYBER HCI clusters, switches, firewalls, and operating systems. Logs are normalized, indexed, and searchable from a single console without sending data off-site.",
  },
  {
    question: "Is KYBER log management suitable for regulated industries in Thailand?",
    answer:
      "MARSLOQ is designed for on-premise deployment with PDPA-aligned data handling, audit trails, and Digital Law retention guidance. Sensitive logs and AI-assisted analysis stay inside your network perimeter.",
  },
  {
    question: "How does MARSLOQ compare to cloud SIEM for log analytics?",
    answer:
      "MARSLOQ delivers SIEM-style correlation, alerting, and AI log analysis on your own infrastructure. Organizations gain centralized log management and security analytics without egressing telemetry to public cloud vendors.",
  },
];
