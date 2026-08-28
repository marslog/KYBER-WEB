"use client";

const stats = [
  { value: "10M+", label: "Events Per Second" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "24/7", label: "Support Coverage" },
];

export default function StatsBanner() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-sm text-gray-400 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
