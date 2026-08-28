"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsBanner from "@/components/StatsBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />

      {/* Products */}
      <section id="products" className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* MARSLOG Section */}
        <ProductSection
          id="marslog"
          name="MARSLOG"
          tagline="AIOps Platform"
          description="Enterprise Log & Monitor + AI Operation. Centralized log management with proactive AI-driven anomaly detection, real-time monitoring, and intelligent alerting."
          logo="/assets/marslogs-logo.png"
          logoAlt="MARSLOGS AIOps"
          color="#22a5f7"
          gradient="from-blue-500 to-cyan-500"
          features={[
            { icon: "🤖", title: "AI Operations", desc: "AIOps-driven anomaly detection and predictive analytics" },
            { icon: "📊", title: "Log Management", desc: "Centralized collection, indexing, and correlation" },
            { icon: "🚨", title: "Real-time Alerting", desc: "Intelligent threshold-based alerting" },
            { icon: "🔍", title: "Anomaly Detection", desc: "ML-powered behavior and pattern analysis" },
            { icon: "📈", title: "Behavior Analysis", desc: "User and entity behavior analytics (UEBA)" },
            { icon: "📋", title: "Compliance Audit", desc: "SOX, HIPAA, and custom compliance reporting" },
          ]}
          stats={[
            { value: "10M+", label: "Events/s" },
            { value: "99.99%", label: "Uptime" },
            { value: "500+", label: "Deployers" },
          ]}
        />

        {/* KYBER HCI Section */}
        <ProductSection
          id="kyber-hci"
          name="KYBER HCI"
          tagline="Hyper-Converged Infrastructure"
          description="Next-generation HCI providing software-defined compute, storage, and networking. Scalable from 2-node clusters to enterprise deployments."
          logo="/assets/kyber-icon.png"
          logoAlt="KYBER HCI"
          color="#60a5fa"
          gradient="from-blue-500 to-indigo-500"
          reversed
          features={[
            { icon: "💾", title: "SD Storage", desc: "Software-defined storage with dedup & compression" },
            { icon: "🖥️", title: "Compute Orchestration", desc: "Kubernetes-native VM and container management" },
            { icon: "🔀", title: "Virtual Networking", desc: "SDN with micro-segmentation and load balancing" },
            { icon: "🏗️", title: "Cluster Management", desc: "Unified management and monitoring dashboard" },
            { icon: "📦", title: "Data Compression", desc: "In-line deduplication with smart tiering" },
            { icon: "🔄", title: "Disaster Recovery", desc: "Site-to-site replication and backup integration" },
          ]}
          stats={[
            { value: "2N+", label: "Node Support" },
            { value: "10GbE", label: "Minimum" },
            { value: "99.9%", label: "Availability" },
          ]}
        />
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Stats */}
      <StatsBanner />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Features */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
