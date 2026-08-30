"use client";

import { useState } from "react";
import { managementMetrics } from "@/data/products";
import { Server, Activity, ShieldCheck, RefreshCw, Terminal, Play } from "lucide-react";

export default function ManagementSection() {
  const [cpu, setCpu] = useState(42);
  const [memory, setMemory] = useState(61);
  const [logs, setLogs] = useState([
    "[INFO] KYBER HCI Cluster Node-01 operational (Latency: 0.4ms)",
    "[SECURITY] KRG Zero-Trust behavioral engine active",
    "[OBSERVE] MARSLOQ normalized 1.4M events/sec",
  ]);
  const [simulating, setSimulating] = useState(false);

  const triggerSimulation = () => {
    setSimulating(true);
    const newCpu = Math.floor(Math.random() * 30) + 40;
    const newMem = Math.floor(Math.random() * 20) + 55;
    setCpu(newCpu);
    setMemory(newMem);
    setLogs((prev) => [
      `[SIMULATION] Workload spike generated. CPU: ${newCpu}%, RAM: ${newMem}%`,
      ...prev.slice(0, 3),
    ]);
    setTimeout(() => setSimulating(false), 800);
  };

  return (
    <section id="management" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0057d9]">
            UNIFIED CONTROL PLANE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a1f44] mt-3 font-outfit">
            One View. Your Entire Infrastructure.
          </h2>
          <p className="text-[#5b6b82] mt-4 text-base font-sans">
            KYBER Management brings compute, storage, logs, and security intelligence into a single unified operational dashboard.
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="max-w-5xl mx-auto bg-[#0a1f44] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4d94ff]/15 border border-[#4d94ff]/30 flex items-center justify-center text-[#4d94ff]">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-outfit">
                  KYBER Unified Console
                </h3>
                <span className="text-xs text-gray-400">Cluster Status: Production Node Alpha</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Cluster Healthy
              </div>
              <button
                onClick={triggerSimulation}
                disabled={simulating}
                className="technit-btn-primary px-4 py-2 text-xs font-bold flex items-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simulating ? "animate-spin" : ""}`} />
                <span>Simulate Traffic</span>
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {managementMetrics.map((m) => {
              let displayVal = m.value;
              if (m.label === "CPU") displayVal = `${cpu}%`;
              if (m.label === "Memory") displayVal = `${memory}%`;

              return (
                <div
                  key={m.label}
                  className="bg-white/5 border border-white/10 p-5 rounded-xl text-center space-y-1 hover:border-[#4d94ff] transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#4d94ff] font-outfit">
                    {displayVal}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {m.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Telemetry Log Console */}
          <div className="bg-black/30 border border-white/10 rounded-xl p-5 font-mono text-xs text-gray-300 space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-gray-400 uppercase font-sans">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#4d94ff]" />
                <span>Live Telemetry Stream</span>
              </div>
              <span>Real-Time Log Ingestion</span>
            </div>
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#4d94ff]">&gt;</span>
                <span className={log.includes("SIMULATION") ? "text-amber-400" : "text-gray-300"}>
                  {log}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

