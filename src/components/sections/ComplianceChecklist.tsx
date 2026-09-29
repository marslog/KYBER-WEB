"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ShieldAlert, FileText, ArrowRight } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  lawRef: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "ntp-sync",
    category: "Time Synchronization",
    title: "1. การเทียบเวลาระบบกับเวลาอ้างอิงสากล (NTP Synchronization)",
    description:
      "อุปกรณ์เครือข่ายและเซิร์ฟเวอร์ทุกเครื่องต้องเทียบเวลากับ Time Server ที่น่าเชื่อถือ โดยมีความคลาดเคลื่อนไม่เกิน 10 มิลลิวินาที ตามประกาศกระทรวง ดีอี พ.ศ. 2564",
    lawRef: "ประกาศกระทรวงฯ ข้อ 6 (1)",
  },
  {
    id: "log-integrity",
    category: "Data Integrity",
    title: "2. การรักษาความถูกต้องครบถ้วนของข้อมูล (Log Integrity & Non-Repudiation)",
    description:
      "ข้อมูล Log ที่จัดเก็บต้องไม่สามารถถูกแก้ไข ดัดแปลง หรือลบทำลายได้ มีการทำ Hashing (เช่น SHA-256) หรือ Digital Signature เพื่อใช้เป็นพยานหลักฐานในชั้นศาล",
    lawRef: "พ.ร.บ. มาตรา 26 วรรคหนึ่ง",
  },
  {
    id: "retention-90",
    category: "Retention Period",
    title: "3. ระยะเวลาการจัดเก็บไม่น้อยกว่า 90 วัน (และขยายได้ถึง 2 ปี)",
    description:
      "ต้องเก็บบันทึกข้อมูลจราจรคอมพิวเตอร์ย้อนหลังอย่างน้อย 90 วัน นับแต่วันที่ข้อมูลเข้าสู่ระบบ และพร้อมขยายเวลาจัดเก็บได้ถึง 2 ปี เมื่อมีคำสั่งเฉพาะคราวจากพนักงานเจ้าหน้าที่",
    lawRef: "พ.ร.บ. มาตรา 26",
  },
  {
    id: "user-id",
    category: "Identification",
    title: "4. การระบุตัวตนและสาวถึงตัวผู้ใช้งานจริงได้ (User Identification)",
    description:
      "สามารถระบุตัวบุคคลผู้ใช้บริการได้จริง โดยมีการจับคู่ระหว่าง Username, IP Address, Port Number, MAC Address และเวลาใช้งาน (เช่น Active Directory, RADIUS, DHCP Lease, Wi-Fi Hotspot)",
    lawRef: "ประกาศกระทรวงฯ ข้อ 7",
  },
  {
    id: "network-traffic",
    category: "Network Perimeter",
    title: "5. บันทึกข้อมูลจราจรของระบบเครือข่ายและระบบความปลอดภัย (Firewall & Network Logs)",
    description:
      "จัดเก็บ Log จาก Firewall, NAT Translation, VPN Gateway, Router, Core Switch และ Web Proxy ครอบคลุม IP ต้นทาง ปลายทาง พอร์ต และโปรโตคอล",
    lawRef: "ประกาศกระทรวงฯ ข้อ 8",
  },
  {
    id: "admin-audit",
    category: "Access Control",
    title: "6. การควบคุมสิทธิ์และการบันทึก Audit Trail ของผู้ดูแลระบบ",
    description:
      "จำกัดสิทธิ์การเข้าถึงระบบ Log ตามหลัก Least Privilege มีการแยกหน้าที่ (Separation of Duties) และเก็บบันทึกประวัติการเข้าถึง (Audit Log) ของผู้ดูแลระบบทุกคน",
    lawRef: "ประกาศกระทรวงฯ ข้อ 6 (4)",
  },
  {
    id: "pdpa-residency",
    category: "Data Residency & PDPA",
    title: "7. การคุ้มครองข้อมูลส่วนบุคคลและการจัดเก็บบน On-Premise",
    description:
      "ข้อมูลจราจรที่มีข้อมูลส่วนบุคคลระบุตัวตน ต้องมีมาตรการรักษาความมั่นคงปลอดภัยไซเบอร์และไม่ส่งข้อมูลออกนอกเขตอำนาจโดยไม่ได้รับการยินยอม สอดคล้องตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)",
    lawRef: "พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
  },
];

export default function ComplianceChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>(["ntp-sync", "retention-90"]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scorePercentage = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 my-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[var(--border)] gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--brand)] uppercase tracking-wider block mb-1">
            Self-Audit Checklist
          </span>
          <h3 className="text-xl font-bold text-[var(--text)]">
            Checklist ประเมินความพร้อมระบบ Log ตามประกาศกระทรวง ดีอี พ.ศ. 2564
          </h3>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[var(--border)] rounded-lg hover:border-[var(--brand)] text-[var(--text-secondary)] transition-colors self-start sm:self-auto"
        >
          <FileText className="w-3.5 h-3.5" /> พิมพ์แบบประเมิน
        </button>
      </div>

      {/* Score Meter */}
      <div className="my-6 p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {scorePercentage === 100 ? (
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
          ) : (
            <ShieldAlert className="w-8 h-8 text-amber-500 shrink-0" />
          )}
          <div>
            <div className="text-sm font-semibold text-[var(--text)]">
              ระดับความพร้อมขององค์กร: {scorePercentage}% ({checkedIds.length} จาก {CHECKLIST_ITEMS.length} ข้อ)
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              {scorePercentage === 100
                ? "ยอดเยี่ยม! ระบบของคุณมีความพร้อมสอดคล้องตามเกณฑ์กฎหมายครบทุกมิติ"
                : "มีข้อกำหนดสำคัญที่ยังขาดอยู่ ซึ่งอาจมีความเสี่ยงถูกปรับตามมาตรา 26 (สูงสุด 500,000 บาท)"}
            </p>
          </div>
        </div>
        <div className="w-full sm:w-48 bg-gray-200 rounded-full h-3 overflow-hidden shrink-0">
          <div
            className={`h-full transition-all duration-300 ${
              scorePercentage >= 80 ? "bg-emerald-500" : scorePercentage >= 50 ? "bg-amber-500" : "bg-red-500"
            }`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-4">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isChecked
                  ? "border-emerald-300 bg-emerald-50/30"
                  : "border-[var(--border)] bg-[var(--bg-subtle)] hover:border-gray-300"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <div className="w-5 h-5 rounded border border-gray-400 bg-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className={`text-sm font-semibold ${isChecked ? "text-emerald-950" : "text-[var(--text)]"}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-[var(--text-muted)]">
                    {item.lawRef}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {scorePercentage < 100 && (
        <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-900">
          <span>ต้องการผู้เชี่ยวชาญช่วยตรวจสอบระบบหรือติดตั้ง MARSLOQ เพื่อให้ผ่านเกณฑ์ 100%?</span>
          <Link
            href="/contact#contact-form"
            className="kyber-btn-primary text-xs py-2 px-3 shrink-0 gap-1.5"
          >
            ปรึกษาทีมวิศวกร KYBER <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
