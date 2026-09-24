/**
 * Comprehensive Knowledge Base for KYBER & MARSLOQ AI Customer Support
 * Bilingual: Thai (ไทย) and English (EN)
 */

export interface KnowledgeTopic {
  id: string;
  keywordsTh: string[];
  keywordsEn: string[];
  titleTh: string;
  titleEn: string;
  answerTh: string;
  answerEn: string;
  relatedLinks?: { label: string; href: string }[];
  suggestedActions?: { labelTh: string; labelEn: string; queryTh: string; queryEn: string }[];
}

export const KYBER_KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: "what-is-kyber-hci",
    keywordsTh: [
      "hci", "hyper-converged", "kyber คือ", "คืออะไร", "โครงสร้างพื้นฐาน", "สถาปัตยกรรม", "hyperconverged",
      "ระบบรวมศูนย์", "จุดเด่น", "ทำอะไรได้บ้าง"
    ],
    keywordsEn: [
      "what is kyber", "hci", "hyper-converged", "hyperconverged", "overview", "infrastructure", "architecture",
      "platform", "features", "capabilities"
    ],
    titleTh: "KYBER HCI คืออะไร",
    titleEn: "What is KYBER HCI?",
    answerTh: `**KYBER HCI (Hyper-Converged Infrastructure)** คือ แพลตฟอร์มโครงสร้างพื้นฐานไอทีแบบรวมศูนย์ระดับองค์กร ที่ออกแบบและพัฒนาโดยทีมวิศวกรไทย รวมเอา 3 องค์ประกอบหลักไว้ในระบบเดียว:

1. **KSV (Compute & Virtualization)**: ระบบบริหารจัดการ Virtual Machine ประสิทธิภาพสูงบน KVM Hypervisor
2. **KSAN (Software-Defined Storage)**: ระบบสตอเรจแบบกระจายศูนย์ (Distributed Storage) ประสิทธิภาพสูง ไม่ต้องพึ่งพา SAN Storage ภายนอก
3. **KNET & KSEC (Software-Defined Networking & Security)**: ระบบเครือข่ายเสมือนพร้อม Microsegmentation และ Firewall ในตัว

✨ **จุดเด่นสำคัญ:**
- ลดค่าใช้จ่ายด้าน License ลงได้สูงสุดถึง 60-70% เมื่อเทียบกับโซลูชันต่างประเทศ
- ดูแลและสนับสนุนโดยทีมงานผู้เชี่ยวชาญในไทยตลอด 24 ชั่วโมง
- รองรับการทำ Backup, Disaster Recovery (Active-Active) และ High Availability (HA) ในตัว`,
    answerEn: `**KYBER HCI (Hyper-Converged Infrastructure)** is an enterprise-grade converged IT infrastructure platform engineered in Thailand, unifying compute, storage, networking, and security into a single cohesive solution:

1. **KSV (Compute & Virtualization)**: High-performance hypervisor built on enterprise KVM.
2. **KSAN (Software-Defined Storage)**: Resilient distributed storage eliminating costly external SAN arrays.
3. **KNET & KSEC (SDN & Microsegmentation)**: Built-in virtual networking and granular zero-trust security.

✨ **Key Highlights:**
- Drastically reduces TCO and licensing fees by up to 60-70% compared to legacy stacks.
- 100% local engineering and 24/7 direct enterprise support based in Thailand.
- Built-in live snapshot, CDP backup, HA clustering, and multi-site active-active disaster recovery.`,
    relatedLinks: [
      { label: "KYBER HCI Details", href: "/products/hci" },
      { label: "Architecture Overview", href: "/resources/architecture" },
    ],
    suggestedActions: [
      { labelTh: "เปรียบเทียบกับ VMware", labelEn: "Compare with VMware", queryTh: "เปรียบเทียบ KYBER กับ VMware", queryEn: "Compare KYBER with VMware" },
      { labelTh: "MARSLOQ Log คืออะไร", labelEn: "What is MARSLOQ?", queryTh: "MARSLOQ คืออะไร", queryEn: "What is MARSLOQ?" }
    ]
  },
  {
    id: "vmware-migration",
    keywordsTh: [
      "vmware", "migration", "ย้าย", "ไมเกรต", "broadcom", "แทน vmware", "ทางเลือก vmware", "v2v", "เปลี่ยน vmware",
      "license vmware", "แพง"
    ],
    keywordsEn: [
      "vmware", "migration", "migrate", "broadcom", "vmware alternative", "v2v", "convert vm", "esxi"
    ],
    titleTh: "การย้ายระบบจาก VMware มา KYBER (VMware Alternative)",
    titleEn: "VMware Alternative & Seamless Migration",
    answerTh: `เนื่องจากนโยบายการคิดค่าลิขสิทธิ์ใหม่ของ VMware/Broadcom ทำให้หลายองค์กรมีต้นทุนสูงขึ้น **KYBER** จึงเป็นทางเลือกทดแทนที่สมบูรณ์แบบ:

🚀 **เครื่องมือ KYBER V2V Converter ในตัว:**
- ย้าย Virtual Machine จาก VMware ESXi/vCenter มายัง KYBER ได้อย่างราบรื่นแบบ Live Migration
- Minimal Downtime (แทบไม่มีช่วงเวลาสะดุด)
- รองรับทั้ง Windows Server และ Linux OS ทุกเวอร์ชันหลัก

💰 **ความคุ้มค่า:**
- คิดค่าบริการ License อย่างโปร่งใส ไม่ปรับขึ้นราคาแบบก้าวกระโดด
- ช่วยประหยัดงบประมาณด้านไอทีได้มหาศาล พร้อมทีมวิศวกรช่วยประกบหน้างาน`,
    answerEn: `With recent changes to VMware licensing models, **KYBER** provides a seamless, high-performance, and cost-effective alternative for enterprise workloads:

🚀 **Built-in Automated V2V Migration Tool:**
- Seamlessly migrates VMs directly from VMware ESXi / vCenter to KYBER HCI.
- Near-zero downtime with delta synchronization.
- Full compatibility with all major Windows Server and Linux operating systems.

💰 **TCO & Financial Benefits:**
- Transparent, predictable licensing with no sudden price hikes.
- Eliminates multi-vendor finger-pointing with unified support from infrastructure to hypervisor.`,
    relatedLinks: [
      { label: "VMware Migration Guide", href: "/solutions/vmware-migration" },
      { label: "Virtualization Modernization", href: "/solutions/virtualization-modernization" }
    ],
    suggestedActions: [
      { labelTh: "ขอคำปรึกษาการย้ายระบบ", labelEn: "Consult Migration Team", queryTh: "ติดต่อขอคำปรึกษาย้ายระบบ VMware", queryEn: "Consult on VMware migration" }
    ]
  },
  {
    id: "marsloq-overview",
    keywordsTh: [
      "marsloq", "log", "logging", "พรบ", "พ.ร.บ.", "pdpa", "computer crime", "จัดเก็บ log", "syslog", "siem",
      "กฎหมาย", "จัดเก็บ 90 วัน"
    ],
    keywordsEn: [
      "marsloq", "log", "logging", "syslog", "siem", "compliance", "pdpa", "computer crime act", "retention",
      "observability", "audit"
    ],
    titleTh: "MARSLOQ ระบบจัดเก็บและวิเคราะห์ Log อัจฉริยะ",
    titleEn: "MARSLOQ Intelligent Log & Observability Platform",
    answerTh: `**MARSLOQ** คือ แพลตฟอร์มบริหารจัดการ Log และ Observability ครบวงจร ที่ตอบโจทย์ข้อกำหนดทางกฎหมายของประเทศไทย:

🛡️ **สอดคล้องตามมาตรฐานกฎหมายไทย:**
- **พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ (Computer Crime Act)**: จัดเก็บ Log ครบถ้วนตามมาตรฐานความปลอดภัย พร้อม Timestamp และ Hash ตรวจสอบความถูกต้อง (Integrity verification)
- **พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)**: รองรับการ Masking ข้อมูลอ่อนไหว และระบบ Role-Based Access Control

⚡ **ฟีเจอร์เด่น:**
- รองรับ Syslog, SNMP, API, NetFlow จากอุปกรณ์เครือข่าย, Server และ Cloud ได้หลายหมื่น EPS (Events Per Second)
- ค้นหาข้อมูลแบบ Full-Text Search ความเร็วสูงในระดับวินาที
- ทำ Real-Time Alerting ผ่าน LINE, Telegram, Email, Webhook`,
    answerEn: `**MARSLOQ** is an enterprise log management, SIEM, and observability platform specifically engineered for high-throughput security event collection and compliance:

🛡️ **Thailand Regulatory Compliance:**
- **Thailand Computer Crime Act (พ.ร.บ. คอมพิวเตอร์)**: Verifiable log retention with cryptographic hashing, non-repudiation, and audit trails.
- **Personal Data Protection Act (PDPA)**: Automated PII data masking, role-based access control (RBAC), and access logging.

⚡ **Core Capabilities:**
- Ingests tens of thousands of Events Per Second (EPS) from firewalls, routers, switches, servers, and cloud environments.
- Lightning-fast sub-second full-text query across terabytes of historical logs.
- Automated real-time alerts via Email, Webhook, LINE Notify, and Telegram.`,
    relatedLinks: [
      { label: "MARSLOQ Platform", href: "/products/marsloq" },
      { label: "Security & Compliance", href: "/security" }
    ]
  },
  {
    id: "pricing-and-quote",
    keywordsTh: [
      "ราคา", "ราคาเท่าไหร่", "ใบเสนอราคา", "ขอราคา", "quotation", "สั่งซื้อ", "คิดราคายังไง", "cost", "price", "budget"
    ],
    keywordsEn: [
      "price", "pricing", "cost", "quote", "quotation", "how much", "license fee", "order", "buy"
    ],
    titleTh: "ราคาและขั้นตอนการขอใบเสนอราคา (Quotation)",
    titleEn: "Pricing and Quotations",
    answerTh: `KYBER คิดราคาตามขนาดความต้องการขององค์กร (Sizing) เพื่อให้เกิดความคุ้มค่าสูงสุด:

📌 **การคำนวณราคาประเมินจาก:**
1. จำนวน Node หรือ Server (เริ่มต้นคลัสเตอร์ขนาดเล็กเพียง 3 Nodes สำหรับ HA)
2. จำนวน CPU Cores และ RAM รวมที่ต้องการใช้งาน
3. ความจุ Storage (Usable Storage) และประเภทไดรฟ์ (NVMe / SSD)
4. อุปกรณ์ที่ต้องการส่ง Log เข้าสู่ MARSLOQ (EPS requirement)

📞 **ท่านสามารถขอใบเสนอราคาหรือ Proof of Concept (PoC) ได้ทันที:**
- กรอกแบบฟอร์มในหน้า [ติดต่อเรา](/contact)
- โทรด่วน: **099-105-3888** หรือ **064-642-3617**
- อีเมล: **supawat@kyber-it.com**`,
    answerEn: `KYBER offers flexible, transparent enterprise pricing tailored to your organization's exact workload requirements:

📌 **Sizing & Quotation factors:**
1. Number of compute nodes (clusters start from 3 nodes for full enterprise HA)
2. Aggregate CPU cores and RAM allocations
3. Usable storage volume and performance tier (NVMe / Enterprise SSD)
4. Target ingestion volume for MARSLOQ (Events Per Second / EPS)

📞 **Request a Quote or Free Proof of Concept (PoC):**
- Submit your request directly at our [Contact Page](/contact)
- Call our direct line: **+6699-105-3888** or **+6664-642-3617**
- Email: **supawat@kyber-it.com**`,
    relatedLinks: [
      { label: "Contact Sales Form", href: "/contact" },
      { label: "Register Project", href: "/register" }
    ]
  },
  {
    id: "contact-support",
    keywordsTh: [
      "ติดต่อ", "เบอร์โทร", "อีเมล", "ที่อยู่", "แผนที่", "ฝ่ายขาย", "ซัพพอร์ต", "support", "call", "phone", "email", "office", "เวลาทำการ"
    ],
    keywordsEn: [
      "contact", "phone", "email", "address", "support", "call", "sales", "office hours", "location"
    ],
    titleTh: "ข้อมูลติดต่อและทีมงาน KYBER",
    titleEn: "Contact KYBER Team & Support",
    answerTh: `ท่านสามารถติดต่อทีมงาน **KYBER Technology** ได้ตามช่องทางดังต่อไปนี้:

🏢 **ที่อยู่สำนักงาน:**
บริษัท ไคเบอร์ เทคโนโลยี จำกัด  
79/125 หมู่ที่ 10 ต.บางแม่นาง อ.บางใหญ่ จ.นนทบุรี 11140 (ประเทศไทย)

📞 **โทรศัพท์:**
- สายหลัก: **099-105-3888**
- ฝ่ายติดตั้งและดูแลระบบ: **064-642-3617**

✉️ **อีเมล:**
- **supawat@kyber-it.com**

🕒 **เวลาทำการ:**
- จันทร์ - ศุกร์: 09:00 - 18:00 น. (สำหรับบริการบำรุงรักษาฉุกเฉิน 24/7 ตามสัญญา SLA)`,
    answerEn: `You can reach the **KYBER Technology** team through the following channels:

🏢 **Headquarters:**
KYBER Technology Co., Ltd.  
79/125 Moo 10, Bang Ma Nang, Bang Yai, Nonthaburi 11140, Thailand

📞 **Direct Lines:**
- Main: **+66 99-105-3888**
- Installation & Deployment: **+66 64-642-3617**

✉️ **Email:**
- **supawat@kyber-it.com**

🕒 **Office Hours:**
- Monday - Friday: 09:00 - 18:00 (ICT). 24/7 emergency response available under enterprise SLA contracts.`,
    relatedLinks: [
      { label: "View Contact Page", href: "/contact" }
    ]
  },
  {
    id: "backup-and-dr",
    keywordsTh: [
      "backup", "dr", "disaster recovery", "สำรองข้อมูล", "กู้คืน", "snapshot", "cdp", "active-active", "ransomware"
    ],
    keywordsEn: [
      "backup", "dr", "disaster recovery", "snapshot", "cdp", "replication", "active-active", "ransomware defense"
    ],
    titleTh: "ระบบ Backup, Snapshot และ Disaster Recovery",
    titleEn: "Backup, Snapshot & Disaster Recovery",
    answerTh: `KYBER ออกแบบให้มีระบบปกป้องข้อมูลในตัว โดยไม่ต้องจัดซื้อซอฟต์แวร์สำรองข้อมูลแยกต่างหาก:

🔒 **การปกป้องข้อมูลระดับองค์กร:**
- **Instant Snapshot**: บันทึกสถานะ VM ได้ในเสี้ยววินาทีโดยไม่กระทบ IOPS
- **Continuous Data Protection (CDP)**: กู้คืนข้อมูลย้อนหลังตามจุดเวลาที่ต้องการ เพื่อป้องกันการโจมตีจาก Ransomware
- **Active-Active / Async Replication**: ส่งข้อมูลข้าม Data Center เพื่อทำ Disaster Recovery (DR Site) อัตโนมัติเมื่อเกิดเหตุฉุกเฉิน`,
    answerEn: `KYBER integrates enterprise-grade data protection directly into the infrastructure fabric without requiring expensive 3rd-party backup appliances:

🔒 **Enterprise Resiliency Capabilities:**
- **Instant Snapshots**: Granular VM state captures executed in milliseconds with zero IO degradation.
- **Continuous Data Protection (CDP)**: Point-in-time rollbacks providing rapid recovery from ransomware encryption events.
- **Active-Active & Asynchronous Replication**: Cross-site replication for automated, zero-data-loss failover to disaster recovery sites.`,
    relatedLinks: [
      { label: "Explore Solutions", href: "/solutions/virtualization-modernization" }
    ]
  },
  {
    id: "hardware-specs",
    keywordsTh: [
      "hardware", "server", "สเปค", "เซิร์ฟเวอร์", "ฮาร์ดแวร์", "แบรนด์", "dell", "hpe", "lenovo", "cisco", "supermicro"
    ],
    keywordsEn: [
      "hardware", "server", "spec", "specs", "appliance", "compatibility", "hpe", "dell", "lenovo", "supermicro"
    ],
    titleTh: "สเปกฮาร์ดแวร์และเซิร์ฟเวอร์ที่รองรับ",
    titleEn: "Hardware Compatibility & Specifications",
    answerTh: `KYBER เป็นแพลตฟอร์มแบบ **Software-Defined** ที่รองรับเซิร์ฟเวอร์มาตรฐาน x86 ทุกแบรนด์ชั้นนำ:

🖥️ **ฮาร์ดแวร์ที่รองรับ:**
- Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Supermicro, Cisco UCS
- CPU: Intel Xeon Scalable หรือ AMD EPYC
- Memory: แนะนำ DDR4 / DDR5 ECC Registered
- Storage: NVMe PCIe Gen 4/5, SAS/SATA Enterprise SSD
- Network: 10GbE / 25GbE SFP28 ขึ้นไปสำหรับ Cluster Interconnect

💡 *มีจำหน่ายทั้งแบบ Software License ใช้งานบนเครื่องเดิมของลูกค้า หรือแบบ Turnkey Appliance พร้อมเซิร์ฟเวอร์ที่ประกอบและทดสอบสมบูรณ์จากโรงงาน*`,
    answerEn: `KYBER is a hardware-agnostic **Software-Defined Platform** compatible with standard enterprise x86 hardware:

🖥️ **Validated Architectures:**
- Leading servers: Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Supermicro, Cisco UCS.
- Processors: Intel Xeon Scalable or AMD EPYC generations.
- Storage media: Direct-attached NVMe PCIe Gen4/Gen5 and enterprise SAS/SATA SSDs.
- Interconnect: Dual-port 10GbE / 25GbE SFP28 redundant links for cluster backend fabric.

💡 *Available as pure software licenses for your existing hardware or as pre-configured, factory-tuned turnkey appliances.*`,
    relatedLinks: [
      { label: "Architecture Specifications", href: "/resources/architecture" },
      { label: "Documentation", href: "/resources/docs" }
    ]
  }
];

/**
 * Intelligent Thai & English Keyword / Semantic Matcher
 */
export function queryKnowledgeBase(query: string, preferredLang: "th" | "en" | "auto" = "auto"): {
  matchedTopic: KnowledgeTopic | null;
  detectedLang: "th" | "en";
  confidence: number;
} {
  const cleanQuery = query.toLowerCase().trim();
  
  // Detect language if auto
  const containsThai = /[\u0E00-\u0E7F]/.test(query);
  const detectedLang: "th" | "en" = preferredLang === "auto" 
    ? (containsThai ? "th" : "en") 
    : preferredLang;

  let bestMatch: KnowledgeTopic | null = null;
  let highestScore = 0;

  for (const topic of KYBER_KNOWLEDGE_TOPICS) {
    let score = 0;

    // Check Thai keywords
    for (const kw of topic.keywordsTh) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        score += 2.5;
      }
    }

    // Check English keywords
    for (const kw of topic.keywordsEn) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        score += 2.5;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  return {
    matchedTopic: highestScore >= 2.0 ? bestMatch : null,
    detectedLang,
    confidence: highestScore
  };
}

/**
 * Default fallback answer when question is outside predefined topics
 */
export function getFallbackResponse(query: string, lang: "th" | "en"): string {
  if (lang === "th") {
    return `ขอบคุณที่ติดต่อสอบถาม **KYBER AI Support** ครับ 🤖

เกี่ยวกับการสอบถาม: *"${query}"*
เพื่อให้ท่านได้รับข้อมูลทางเทคนิคที่ละเอียดและตรงกับความต้องการขององค์กรมากที่สุด ผมขอแนะนำช่องทางดังต่อไปนี้ครับ:

1. **โทรศัพท์สายด่วน:** [099-105-3888](tel:+66991053888) หรือ [064-642-3617](tel:+66646423617) (ทีมวิศวกรพร้อมตอบคำถาม)
2. **อีเมล:** [supawat@kyber-it.com](mailto:supawat@kyber-it.com)
3. **กรอกฟอร์มออนไลน์:** ท่านสามารถส่งรายละเอียดความต้องการได้ที่หน้า [ติดต่อเรา](/contact) เพื่อให้ทีมงานติดต่อกลับพร้อมเอกสารนำเสนอ

ท่านสามารถคลิกเลือกหัวข้อที่สนใจด้านล่าง หรือพิมพ์คำถามใหม่ได้ตลอดเวลาครับ!`;
  }

  return `Thank you for contacting **KYBER AI Support**! 🤖

Regarding your inquiry: *"${query}"*
To provide you with tailored technical recommendations and custom sizing for your infrastructure, our engineering architects are ready to assist you:

1. **Direct Hotline:** [+66 99-105-3888](tel:+66991053888) or [+66 64-642-3617](tel:+66646423617)
2. **Direct Email:** [supawat@kyber-it.com](mailto:supawat@kyber-it.com)
3. **Online Inquiry:** Feel free to submit your requirements via our [Contact Page](/contact) for a rapid response.

You can also click any of the suggestion chips below or ask another question!`;
}
