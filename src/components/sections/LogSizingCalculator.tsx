"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, ShieldCheck, CheckCircle2, RefreshCw, Database, Activity } from "lucide-react";

export default function LogSizingCalculator() {
  const [networkDevices, setNetworkDevices] = useState<number>(10);
  const [servers, setServers] = useState<number>(20);
  const [endpoints, setEndpoints] = useState<number>(150);
  const [retentionDays, setRetentionDays] = useState<number>(90);

  // Estimations:
  // Network device avg: 15 events/sec (Firewalls, switches, routers)
  // Server avg: 25 events/sec (AD, web, database, proxy)
  // Endpoint/user avg: 2 events/sec (DHCP, VPN, Wi-Fi auth)
  const totalEps = networkDevices * 15 + servers * 25 + endpoints * 2;
  
  // Avg raw event size ~ 450 bytes
  // Daily raw bytes = EPS * 86,400 seconds * 450 bytes
  const dailyRawGb = (totalEps * 86400 * 450) / (1024 * 1024 * 1024);
  
  // MARSLOQ indexing + compression ratio ~ 50% net storage needed
  const dailyEffectiveGb = dailyRawGb * 0.55;
  const totalStorageGb = dailyEffectiveGb * retentionDays;
  const totalStorageTb = totalStorageGb / 1024;

  // Tiering recommendations:
  // Hot (First 14-30 days on fast NVMe/SSD)
  // Warm (Remaining up to 90 days on SSD/SATA)
  // Cold (Archived & compressed for 90 days to 2 years)
  const hotDays = Math.min(14, retentionDays);
  const warmDays = Math.min(76, Math.max(0, retentionDays - hotDays));
  const coldDays = Math.max(0, retentionDays - hotDays - warmDays);

  const hotStorageTb = (dailyEffectiveGb * hotDays) / 1024;
  const warmStorageTb = (dailyEffectiveGb * warmDays) / 1024;
  const coldStorageTb = ((dailyEffectiveGb * 0.4) * coldDays) / 1024;

  const resetDefaults = () => {
    setNetworkDevices(10);
    setServers(20);
    setEndpoints(150);
    setRetentionDays(90);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[var(--border)]" id="sizing-calculator">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-2 inline-flex items-center gap-1.5 justify-center">
            <Activity className="w-3.5 h-3.5 text-[var(--brand)]" />
            Interactive Sizing Tool
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)]">
            เครื่องมือคำนวณขนาด Storage สำหรับเก็บ Log พ.ร.บ. คอมพิวเตอร์
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            ประเมินปริมาณข้อมูลจราจรทางคอมพิวเตอร์ (EPS), ขนาดพื้นที่จัดเก็บตามเกณฑ์ 90 วัน - 2 ปี และสเปกฮาร์ดแวร์ MARSLOQ ที่เหมาะสมกับองค์กรของคุณ
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Input Controls */}
          <div className="lg:col-span-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <h3 className="text-base font-semibold text-[var(--text)]">กำหนดขนาดระบบขององค์กร</h3>
              <button
                type="button"
                onClick={resetDefaults}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--brand)] flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> ค่าเริ่มต้น
              </button>
            </div>

            {/* Network Devices */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[var(--text)]">
                  อุปกรณ์เครือข่าย (Firewall, Switch, Router, Wi-Fi)
                </label>
                <span className="text-sm font-semibold text-[var(--brand)]">{networkDevices} เครื่อง</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={networkDevices}
                onChange={(e) => setNetworkDevices(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
              />
              <p className="text-[11px] text-[var(--text-muted)] mt-1">ประเมินเฉลี่ย 15 EPS ต่ออุปกรณ์</p>
            </div>

            {/* Servers */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[var(--text)]">
                  เซิร์ฟเวอร์ & Virtual Machines (AD, Web, DB, Mail)
                </label>
                <span className="text-sm font-semibold text-[var(--brand)]">{servers} เครื่อง</span>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                value={servers}
                onChange={(e) => setServers(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
              />
              <p className="text-[11px] text-[var(--text-muted)] mt-1">ประเมินเฉลี่ย 25 EPS ต่อเซิร์ฟเวอร์</p>
            </div>

            {/* Endpoints & Users */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[var(--text)]">
                  จำนวนผู้ใช้งาน / อุปกรณ์ลูกข่าย (Endpoints & Wi-Fi)
                </label>
                <span className="text-sm font-semibold text-[var(--brand)]">{endpoints} ผู้ใช้</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={endpoints}
                onChange={(e) => setEndpoints(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
              />
              <p className="text-[11px] text-[var(--text-muted)] mt-1">ประเมินเฉลี่ย 2 EPS ต่อผู้ใช้ (DHCP, VPN, Web Traffic)</p>
            </div>

            {/* Retention Days */}
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                ระยะเวลาจัดเก็บ Log ที่ต้องการ
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "90 วัน (เกณฑ์ พ.ร.บ.)", days: 90 },
                  { label: "180 วัน", days: 180 },
                  { label: "1 ปี (Audit)", days: 365 },
                  { label: "2 ปี (คำสั่งศาล)", days: 730 },
                ].map((tier) => (
                  <button
                    key={tier.days}
                    type="button"
                    onClick={() => setRetentionDays(tier.days)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                      retentionDays === tier.days
                        ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-sm"
                        : "bg-white border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)]"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-6 rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-semibold text-[var(--text)] mb-6 flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--brand)]" />
              ผลการวิเคราะห์และประมาณการพื้นที่จัดเก็บ
            </h3>

            {/* Top Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                <span className="text-xs text-[var(--text-muted)] block mb-1">ความเร็วรับส่งข้อมูล (Estimated EPS)</span>
                <span className="text-2xl font-bold text-[var(--brand)]">
                  {totalEps.toLocaleString()}
                </span>
                <span className="text-xs text-[var(--text-secondary)] ml-1">events/sec</span>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
                <span className="text-xs text-[var(--text-muted)] block mb-1">ปริมาณข้อมูลต่อวัน (Daily Volume)</span>
                <span className="text-2xl font-bold text-[var(--text)]">
                  {dailyEffectiveGb.toFixed(1)}
                </span>
                <span className="text-xs text-[var(--text-secondary)] ml-1">GB / วัน</span>
              </div>
            </div>

            {/* Total Storage Highlight */}
            <div className="rounded-xl border border-[var(--brand)] bg-[var(--brand-soft)]/20 p-5 mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-[var(--brand)] uppercase tracking-wider">
                  พื้นที่ Storage แนะนำสุทธิ ({retentionDays} วัน)
                </span>
                <span className="text-xs text-[var(--text-muted)]">รวม Index + Parquet Compression</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[var(--brand)]">
                  {totalStorageTb >= 1 ? totalStorageTb.toFixed(2) : totalStorageGb.toFixed(0)}
                </span>
                <span className="text-base font-semibold text-[var(--text)]">
                  {totalStorageTb >= 1 ? "TB" : "GB"}
                </span>
              </div>
            </div>

            {/* Tiering breakdown */}
            <div className="space-y-2.5 mb-6 text-xs text-[var(--text-secondary)]">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Hot Storage (NVMe/SSD 14 วันแรก ค้นหาทันที)
                </span>
                <span className="font-semibold text-[var(--text)]">{hotStorageTb.toFixed(2)} TB</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Warm Storage (SSD/SATA จนครบ 90 วัน)
                </span>
                <span className="font-semibold text-[var(--text)]">{warmStorageTb.toFixed(2)} TB</span>
              </div>
              {coldDays > 0 && (
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Cold Archive (บีบอัดสูง เก็บระยะยาวถึง 2 ปี)
                  </span>
                  <span className="font-semibold text-[var(--text)]">{coldStorageTb.toFixed(2)} TB</span>
                </div>
              )}
            </div>

            {/* Suggested Appliance */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 mb-6">
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-[var(--brand)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[var(--text)]">สเปกฮาร์ดแวร์ MARSLOQ ที่แนะนำ</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {totalEps <= 1500
                      ? "MARSLOQ Compact (4 vCPU, 16GB RAM, 2TB Storage) รองรับระบบขนาดเล็ก-กลาง"
                      : totalEps <= 5000
                      ? "MARSLOQ Enterprise (8 vCPU, 32GB RAM, 6-10TB Storage) สำหรับองค์กรขนาดกลางและสาขา"
                      : "MARSLOQ Clustered Mesh (16+ vCPU, 64GB+ RAM, Ceph Storage Pool) สำหรับองค์กรขนาดใหญ่"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/contact#contact-form?eps=${totalEps}&storage=${totalStorageTb.toFixed(1)}TB&days=${retentionDays}`}
              className="kyber-btn-primary w-full justify-center text-sm py-3 gap-2"
            >
              ขอใบเสนอราคาตามผลคำนวณนี้ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
