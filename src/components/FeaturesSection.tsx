"use client";

const features = [
  {
    icon: "🔒",
    title: "Security First",
    desc: "Enterprise-grade encryption and compliance certifications including ISO 27001.",
    color: "#22d3ee",
  },
  {
    icon: "⚡",
    title: "High Performance",
    desc: "Process millions of events per second with real-time analytics and AI-powered insights.",
    color: "#60a5fa",
  },
  {
    icon: "🤖",
    title: "AI Operations",
    desc: "AIOps-driven anomaly detection, predictive analytics, and automated incident response.",
    color: "#a78bfa",
  },
  {
    icon: "☁️",
    title: "Cloud Ready",
    desc: "Deploy on-premise, hybrid cloud, or fully managed cloud with Kubernetes-native architecture.",
    color: "#f472b6",
  },
  {
    icon: "🌐",
    title: "Scalable Infrastructure",
    desc: "Hyper-converged infrastructure that scales seamlessly from 2 nodes to enterprise clusters.",
    color: "#34d399",
  },
  {
    icon: "📊",
    title: "Unified Monitoring",
    desc: "Single pane of glass for logs, metrics, and traces with intelligent correlation and alerting.",
    color: "#fb923c",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Key Features
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Enterprise-Grade
            </span>
            <br />
            <span className="text-white">Capabilities</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our products are built to handle the most demanding enterprise workloads
            with reliability and performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${f.color}10, transparent 70%)`,
                }}
              />
              <div className="relative">
                <span
                  className="text-4xl mb-4 block"
                  style={{ color: f.color }}
                >
                  {f.icon}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
