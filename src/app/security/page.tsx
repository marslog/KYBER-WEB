import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SECURITY_CONTENT } from "@/data/pageContent";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Security & Compliance — KYBER",
  description: SECURITY_CONTENT.intro,
};

export default function SecurityPage() {
  const { eyebrow, title, intro, pillars, standards } = SECURITY_CONTENT;

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />

      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-3">{eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-5 max-w-2xl">
            {intro}
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--bg-subtle)] border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar) => {
              const Icon = getIcon(pillar.icon);
              return (
                <div
                  key={pillar.id}
                  className="rounded-xl border border-[var(--border)] bg-white p-6 hover:border-[var(--brand)] hover:shadow-[0_8px_28px_rgba(16,24,40,0.06)] transition-all"
                >
                  <div className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-soft)] p-2.5 mb-4">
                    <Icon className="w-5 h-5" style={{ color: "var(--brand)" }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-3">Standards & alignment</p>
          <h2 className="section-title mb-8">Compliance you can build on</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {standards.map((standard) => (
              <div
                key={standard.label}
                className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5"
              >
                <span className="kyber-pill kyber-pill--accent shrink-0">{standard.label}</span>
                <span className="text-sm text-[var(--text-secondary)] leading-snug">
                  {standard.note}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            Alignment reflects KYBER platform capabilities and design practices; certification
            status varies by deployment.
          </p>
        </div>
      </section>

      <section id="get-a-quote" className="section-shell bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Discuss your security requirements</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Request a quotation or schedule a callback to discuss compliance, data residency, and ransomware resilience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact#get-a-quote" className="kyber-btn-primary inline-flex items-center gap-2">
              Get a quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact#request-callback"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium hover:border-[var(--brand)] transition-colors"
            >
              Request callback
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
