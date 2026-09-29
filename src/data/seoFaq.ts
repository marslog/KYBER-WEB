export interface SeoFaqItem {
  question: string;
  answer: string;
}

/** FAQ content for log-management rich results and on-page SEO. */
export const LOG_MANAGEMENT_FAQ: SeoFaqItem[] = [
  {
    question: "Log ตาม พ.ร.บ. คอมพิวเตอร์ ต้องเก็บไว้อย่างน้อยกี่วัน?",
    answer:
      "ตาม พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550 และฉบับแก้ไขเพิ่มเติม มาตรา 26 กำหนดให้ผู้ให้บริการต้องเก็บรักษาข้อมูลจราจรทางคอมพิวเตอร์ (Log files) ไว้ไม่น้อยกว่า 90 วัน นับแต่วันที่ข้อมูลเข้าสู่ระบบ และในกรณีจำเป็นเฉพาะราย เจ้าพนักงานอาจมีคำสั่งให้เก็บรักษาไว้ไม่เกิน 2 ปี MARSLOQ รองรับการตั้งค่านโยบาย Retention แบ่งระดับ Hot/Warm/Cold Storage เพื่อให้สอดคล้องตามเกณฑ์กฎหมายอย่างมีประสิทธิภาพ",
  },
  {
    question: "ข้อมูลจราจรทางคอมพิวเตอร์ (Log) ที่ต้องจัดเก็บตามประกาศกระทรวง ดีอี 2564 มีอะไรบ้าง?",
    answer:
      "ตามประกาศกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (พ.ศ. 2564) ครอบคลุมข้อมูลที่สามารถระบุตัวตนและกิจกรรมของผู้ใช้งาน ได้แก่ ข้อมูลการพิสูจน์ตัวตน (User Authentication & Access Log), ข้อมูลการรับส่งเครือข่าย (Firewall, NAT Session, VPN, Proxy), ข้อมูลจากอุปกรณ์เครือข่าย (Core Switch, Router, Wireless Controller/WiFi Hotspot), ข้อมูลการจ่าย IP (DHCP Lease) และ System/Server Log โดยต้องระบุ วัน เวลา แหล่งกำเนิด ต้นทาง ปลายทาง และพอร์ตได้อย่างถูกต้อง",
  },
  {
    question: "หากองค์กรหรือผู้ให้บริการไม่จัดเก็บ Log ตาม พ.ร.บ. คอมพิวเตอร์ มีบทลงโทษอย่างไร?",
    answer:
      "ผู้ให้บริการที่ไม่ปฏิบัติตามมาตรา 26 ต้องระวางโทษปรับไม่เกิน 500,000 บาท นอกจากนี้ หากเกิดเหตุการณ์บุกรุก ละเมิด หรือโจมตีทางไซเบอร์ องค์กรที่ไม่มี Log ที่ถูกต้องสมบูรณ์จะไม่สามารถใช้เป็นพยานหลักฐานในการดำเนินคดีหรือพิสูจน์ความรับผิดชอบได้",
  },
  {
    question: "มาตรฐานทางเทคนิคของระบบจัดเก็บ Log ที่ถูกต้องตามกฎหมายต้องมีอะไรบ้าง?",
    answer:
      "ระบบต้องมีคุณสมบัติหลัก 4 ประการ: 1) การเทียบเวลาตรงกับเวลาสากล (NTP Synchronization) ไม่คลาดเคลื่อนเกิน 10 มิลลิวินาที 2) การรักษาความถูกต้องครบถ้วนและไม่ถูกแก้ไขเปลี่ยนแปลง (Data Integrity & Non-Repudiation) ด้วยการเข้ารหัสหรือทำ Hashing (เช่น SHA-256) 3) การระบุและสาวถึงตัวผู้ใช้งานจริงได้ (User Identification) 4) การควบคุมการเข้าถึงระบบ Log (Access Control) และมี Audit Trail บันทึกการเข้าใช้งานของผู้ดูแลระบบ",
  },
  {
    question: "MARSLOQ by KYBER ตอบโจทย์ระบบเก็บ Log พ.ร.บ. คอมพิวเตอร์ อย่างไร?",
    answer:
      "MARSLOQ เป็นระบบ On-Premise Centralized Log Management สำหรับองค์กรในไทย รองรับ Syslog Ingestion จากอุปกรณ์เครือข่ายทุกค่าย (Firewall, Switch, Server, VPN, Wi-Fi) มี Grok Parsing จัดโครงสร้างข้อมูล ค้นหาข้อมูลย้อนหลังได้รวดเร็วด้วย OpenSearch จัดเก็บข้อมูล 90 วัน ถึง 2 ปีแบบ Hot/Warm/Cold มี AI Security วิเคราะห์ความผิดปกติ และติดตั้งแบบ On-Premise 100% ทำให้ข้อมูลไม่รั่วไหลออกนอกประเทศ สอดคล้องทั้ง พ.ร.บ. คอมพิวเตอร์ และ PDPA",
  },
  {
    question: "What is enterprise log management with MARSLOQ?",
    answer:
      "Enterprise log management collects, parses, indexes, and searches logs from servers, network devices, applications, and security tools in one platform. MARSLOQ by KYBER provides on-premise centralized log management with syslog ingestion, Grok parsing, OpenSearch analytics, and compliance-ready retention policies.",
  },
  {
    question: "Does MARSLOQ support syslog and centralized logging for compliance audits?",
    answer:
      "Yes. MARSLOQ ingests syslog, SNMP, ICMP, and agent-based telemetry from KYBER HCI clusters, switches, firewalls, and operating systems. Logs are normalized, indexed, tamper-verified, and searchable from a single on-premise console for full regulatory compliance and audit readiness.",
  },
];

/** FAQ content for KYBER HCI, cost-effective hypervisor (KSV), and VMware migration. */
export const HCI_VIRTUALIZATION_FAQ: SeoFaqItem[] = [
  {
    question: "Why is KYBER KSV considered a cost-effective enterprise hypervisor and VMware alternative?",
    answer:
      "Following Broadcom's VMware acquisition and subscription price increases, organizations face 3x to 12x higher licensing costs. KYBER KSV offers an enterprise-grade hypervisor with low CPU overhead, live VM migration, instant snapshots, and direct OVA/OVF/VMDK workload importing without expensive per-core minimums or mandatory software bundle lock-in — delivering up to 60% TCO reduction.",
  },
  {
    question: "What is KYBER HCI and how does it compare to traditional 3-tier SAN architecture or Nutanix?",
    answer:
      "KYBER HCI converges enterprise compute (KSV Hypervisor), resilient software-defined storage (KSAN Storage Mesh), cluster HA, and security into standard x86 servers. Unlike traditional 3-tier architecture that requires expensive FC/iSCSI SAN arrays, or proprietary appliances from Nutanix/VxRail, KYBER decouples software from hardware, eliminating proprietary vendor lock-in and simplifying management under a single control plane.",
  },
  {
    question: "Can KYBER HCI run on existing Dell, HPE, Lenovo, or Cisco x86 servers?",
    answer:
      "Yes. With KYBER's Hardware Freedom layer, you can run KYBER HCI on standard off-the-shelf x86 servers from Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Cisco UCS, and Supermicro. Organizations can repurpose existing server fleets and standard NVMe/SSD drives rather than being forced into costly hardware refresh cycles.",
  },
  {
    question: "How does migration from VMware to KYBER KSV work?",
    answer:
      "Migration is straightforward through a 4-step guided path: 1) Assessment to inventory VM resource requirements 2) Direct Import of VMware OVA, OVF, and VMDK virtual disks directly without intermediate format conversions 3) Side-by-side performance validation on KSV 4) Automated zero-downtime cutover backed by instant snapshot rollbacks.",
  },
  {
    question: "What are the capabilities of KSAN Software-Defined Storage in KYBER HCI?",
    answer:
      "KSAN aggregates local NVMe, SSD, and HDD drives across server nodes into a high-performance distributed storage mesh with Ceph-powered resilience, automated tiering, self-healing data placement, inline deduplication, and zero-single-point-of-failure high availability.",
  },
  {
    question: "KYBER HCI เหมาะกับองค์กรในไทยที่ต้องการลดค่าใช้จ่าย License VMware อย่างไร?",
    answer:
      "KYBER HCI และ KSV Hypervisor พัฒนาขึ้นมาเพื่อตอบโจทย์องค์กรไทยที่ต้องการทางเลือกแทน VMware โดยสามารถนำเข้า Image VM เดิม (VMDK/OVA) มาเปิดใช้งานได้ทันที มีฟังก์ชัน Live Migration ย้าย VM ข้ามเครื่องโดยไม่สะดุด มีระบบ Snapshot และ High Availability ในตัว พร้อมทีมวิศวกรผู้เชี่ยวชาญดูแลในประเทศไทย ช่วยประหยัดงบประมาณ IT ได้สูงสุด 60%",
  },
];

