export interface ResourcePage {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  links?: { label: string; href: string; external?: boolean }[];
}

export const RESOURCE_PAGES: ResourcePage[] = [
  {
    slug: "docs",
    eyebrow: "Documentation",
    title: "Technical documentation",
    intro:
      "Architecture guides, deployment runbooks, and API references for KYBER HCI, KSV, KSAN, KRG, and MARSLOQ.",
    sections: [
      {
        heading: "Platform overview",
        body:
          "Start with the KYBER platform architecture — how compute, storage, security, and observability layers integrate across a single management plane.",
      },
      {
        heading: "Deployment guides",
        body:
          "Step-by-step instructions for HCI cluster formation, witness configuration, storage pool setup, and MARSLOQ log pipeline integration.",
      },
      {
        heading: "Operations & troubleshooting",
        body:
          "Runbooks for cluster health checks, VM migration, snapshot policies, and common MARSLOQ ingestion issues.",
      },
    ],
    links: [
      { label: "KYBER HCI product page", href: "/products/hci" },
      { label: "MARSLOQ product page", href: "/products/marsloq" },
      { label: "Request a quotation", href: "/contact#get-a-quote" },
    ],
  },
  {
    slug: "architecture",
    eyebrow: "Architecture Center",
    title: "Reference architectures",
    intro:
      "Validated deployment patterns for enterprise HCI, multi-site DR, and integrated observability with MARSLOQ.",
    sections: [
      {
        heading: "2-node + witness HCI",
        body:
          "High-availability cluster design for branch offices and mid-size data centers using standard x86 hardware with a dedicated witness node.",
      },
      {
        heading: "Multi-site disaster recovery",
        body:
          "Cross-site replication, RPO/RTO planning, and failover workflows using KYBER backup and DR capabilities.",
      },
      {
        heading: "Observability integration",
        body:
          "Connect workload, network, and security telemetry into MARSLOQ for unified search, alerting, and AI-assisted analysis.",
      },
    ],
    links: [
      { label: "Enterprise HCI solution", href: "/solutions/enterprise-hci" },
      { label: "Security Operations & Logs", href: "/solutions/secops-log-management" },
    ],
  },
  {
    slug: "datasheets",
    eyebrow: "Datasheets",
    title: "Product datasheets",
    intro:
      "Technical specifications, capacity planning notes, and feature matrices for KYBER platform components.",
    sections: [
      {
        heading: "KYBER HCI & KSV",
        body:
          "Hypervisor capabilities, cluster sizing guidance, supported hardware profiles, and migration compatibility (OVA/OVF/VMDK).",
      },
      {
        heading: "KRG & data protection",
        body:
          "Ransomware detection behavior, immutable snapshot policies, backup schedules, and recovery time objectives.",
      },
      {
        heading: "MARSLOQ",
        body:
          "Log ingestion throughput, retention tiers, OpenSearch integration, SNMP/ICMP monitoring, and on-prem AI assistant specifications.",
      },
    ],
    links: [
      { label: "Request datasheet access", href: "/contact" },
      { label: "MARSLOQ Log Appliances", href: "/products/marsloq" },
    ],
  },
  {
    slug: "kb",
    eyebrow: "Knowledge Base",
    title: "Knowledge base",
    intro:
      "Best practices, how-to articles, and troubleshooting guides for KYBER administrators and security teams.",
    sections: [
      {
        heading: "Getting started",
        body:
          "Initial cluster setup, management console orientation, and first VM deployment on KSV.",
      },
      {
        heading: "Security & compliance",
        body:
          "RBAC configuration, audit logging in MARSLOQ, PDPA-aligned data handling, and Digital Law retention guidance.",
      },
      {
        heading: "Performance tuning",
        body:
          "Storage pool optimization, network bonding, and MARSLOQ index lifecycle management.",
      },
    ],
    links: [
      { label: "Security & Compliance", href: "/security" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
  {
    slug: "downloads",
    eyebrow: "Downloads",
    title: "Downloads & firmware",
    intro:
      "KYBER OS images, management tools, MARSLOQ agents, and firmware packages for supported hardware.",
    sections: [
      {
        heading: "KYBER OS & hypervisor",
        body:
          "ISO images and upgrade bundles for KYBER HCI nodes and KSV hypervisor components.",
      },
      {
        heading: "MARSLOQ agents",
        body:
          "Log forwarders, SNMP collectors, and integration packages for common enterprise systems.",
      },
      {
        heading: "Licensing & access",
        body:
          "Download access is provided to registered customers and partners. Request a quotation to obtain credentials and release channels.",
      },
    ],
    links: [
      { label: "Request download access", href: "/contact#get-a-quote" },
      { label: "Talk to an architect", href: "/contact" },
    ],
  },
  {
    slug: "faq",
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    intro:
      "Common technical and commercial questions about KYBER HCI, MARSLOQ, licensing, and deployment.",
    sections: [
      {
        heading: "Hardware & licensing",
        body:
          "KYBER runs on standard x86 servers without proprietary appliance lock-in. Licensing is based on your deployment scale and product mix — contact us for a tailored quote.",
      },
      {
        heading: "VMware migration",
        body:
          "KSV supports importing OVA, OVF, and VMDK workloads. Many customers migrate without a full hardware refresh.",
      },
      {
        heading: "Data residency & AI",
        body:
          "MARSLOQ and the Thai LLM assistant are designed for on-premise deployment so sensitive data never leaves your network.",
      },
      {
        heading: "Support & services",
        body:
          "KYBER provides installation support, architecture reviews, and ongoing platform guidance. Request a quotation or callback to start the conversation.",
      },
    ],
    links: [
      { label: "VMware Migration solution", href: "/solutions/vmware-migration" },
      { label: "Get a quotation", href: "/contact#get-a-quote" },
    ],
  },
  {
    slug: "computer-act-log-compliance",
    eyebrow: "Compliance & Regulations",
    title: "คู่มือระบบจัดเก็บ Log ตาม พ.ร.บ. คอมพิวเตอร์ 2564 (Computer Crime Act Log Compliance)",
    intro:
      "แนวทางปฏิบัติและข้อกำหนดทางเทคนิคการจัดเก็บข้อมูลจราจรทางคอมพิวเตอร์ตาม พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ มาตรา 26 และประกาศกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม พ.ศ. 2564 ด้วยโซลูชัน MARSLOQ On-Premise Centralized Log Management",
    sections: [
      {
        heading: "1. สรุปหน้าที่ตามกฎหมายและบทลงโทษตามมาตรา 26",
        body:
          "พระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550 และฉบับแก้ไขเพิ่มเติม พ.ศ. 2560 มาตรา 26 บัญญัติให้ผู้ให้บริการ (รวมถึงองค์กรธุรกิจ, สถาบันการศึกษา, โรงแรม, โรงพยาบาล และผู้ให้บริการเครือข่ายอินเทอร์เน็ต) ต้องเก็บรักษาข้อมูลจราจรทางคอมพิวเตอร์ไว้ไม่น้อยกว่า 90 วัน นับแต่วันที่ข้อมูลเข้าสู่ระบบ และในกรณีจำเป็นเฉพาะราย พนักงานเจ้าหน้าที่อาจสั่งให้เก็บรักษาไว้ไม่เกิน 2 ปี หากไม่ปฏิบัติตาม มีโทษปรับทางกฎหมายไม่เกิน 500,000 บาท",
      },
      {
        heading: "2. ข้อมูลจราจรทางคอมพิวเตอร์ (Log) ที่ต้องจัดเก็บตามประกาศกระทรวง ดีอี 2564",
        body:
          "ตามประกาศกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (13 สิงหาคม 2564) องค์กรต้องรวบรวม Log ที่สามารถระบุตัวตนและกิจกรรมของผู้ใช้งานได้อย่างครบถ้วน ได้แก่: 1) User Authentication & Access Log (Active Directory, RADIUS, VPN) 2) Network & Perimeter Traffic (Firewall, NAT Session, Proxy) 3) Network Infrastructure (Core Switch, Router, Wi-Fi Hotspot Controller) 4) IP Assignment (DHCP Lease) และ 5) Critical Server & System Logs โดยต้องระบุเวลา แหล่งกำเนิด ต้นทาง ปลายทาง และหมายเลขพอร์ตได้อย่างชัดเจน",
      },
      {
        heading: "3. มาตรฐานความมั่นคงปลอดภัยและคุณสมบัติทางเทคนิค (NTP, Hash, Non-Repudiation)",
        body:
          "การเก็บ Log ให้มีผลทางกฎหมายและใช้เป็นพยานหลักฐานในชั้นศาลได้ ต้องเป็นไปตามมาตรฐาน มศอ. และประกาศกระทรวงฯ ประกอบด้วย: การเทียบเวลากับเวลาอ้างอิงสากล (NTP Time Synchronization) ให้คลาดเคลื่อนไม่เกิน 10 มิลลิวินาที, การรักษาความถูกต้องครบถ้วน (Data Integrity) โดยมีการทำ Checksum หรือ Digital Signature/Hashing (SHA-256) เพื่อป้องกันและตรวจจับการแก้ไขเปลี่ยนแปลง, การควบคุมสิทธิ์การเข้าถึงอย่างเคร่งครัด (Least Privilege) และการเก็บบันทึก Audit Trail ของผู้ดูแลระบบทุกคน",
      },
      {
        heading: "4. การบริหารสถาปัตยกรรมพื้นที่จัดเก็บ (Hot, Warm, Cold Retention Architecture)",
        body:
          "เพื่อบริหารต้นทุนสตอเรจให้มีประสิทธิภาพ MARSLOQ รองรับการแบ่ง Tier จัดเก็บข้อมูล: Hot Storage (NVMe/SSD สำหรับ Log ล่าสุด 7-30 วันที่ต้องสืบค้นเร็วแบบเสี้ยววินาที), Warm Storage (SSD/SATA สำหรับจัดเก็บต่อเนื่องจนครบ 90 วัน), และ Cold Storage (Archive บีบอัดความจุสูงสำหรับเก็บข้อมูลย้อนหลัง 1-2 ปีตามคำสั่งเจ้าพนักงาน) พร้อมระบบค้นหาอัตโนมัติผ่าน OpenSearch",
      },
      {
        heading: "5. ความสอดคล้องร่วมกันระหว่าง พ.ร.บ. คอมพิวเตอร์ และ PDPA ด้วย MARSLOQ",
        body:
          "MARSLOQ ถูกออกแบบมาเพื่อการติดตั้งแบบ On-Premise 100% ภายในดาต้าเซ็นเตอร์ขององค์กร ข้อมูลการจราจรทางคอมพิวเตอร์และข้อมูลส่วนบุคคลของผู้ใช้งาน (Personal Data) จึงไม่รั่วไหลออกนอกประเทศหรือผู้ให้บริการคลาวด์สาธารณะ พร้อมระบบ Grok Parsing สำหรับแยกแยะฟิลด์ข้อมูล, 120+ Device Templates รองรับอุปกรณ์เครือข่ายทุกยี่ห้อ (Cisco, Fortinet, Palo Alto, MikroTik) และมีผู้ช่วย Mini AI Local Thai LLM สำหรับช่วยวิเคราะห์เหตุการณ์ความปลอดภัยอย่างแม่นยำ",
      },
    ],
    links: [
      { label: "MARSLOQ Log Platform Product Page", href: "/products/marsloq" },
      { label: "Security Operations & Log Management Solution", href: "/solutions/secops-log-management" },
      { label: "ขอใบเสนอราคา / นัดหมายทดสอบระบบ MARSLOQ", href: "/contact#get-a-quote" },
    ],
  },
];

export function getAllResourceSlugs(): string[] {
  return RESOURCE_PAGES.map((page) => page.slug);
}

export function getResourcePage(slug: string): ResourcePage | undefined {
  return RESOURCE_PAGES.find((page) => page.slug === slug);
}
