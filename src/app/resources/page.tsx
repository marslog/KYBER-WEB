import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { NAV_STRUCTURE, RESOURCES_SECTION } from "@/data/platformData";

export const metadata: Metadata = {
  title: "Resources — KYBER",
  description: RESOURCES_SECTION.subtitle,
};

export default function ResourcesHubPage() {
  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />

      <section className="pt-28 pb-14 md:pt-36 md:pb-16 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-3">{RESOURCES_SECTION.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl">
            {RESOURCES_SECTION.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-5 max-w-2xl">
            {RESOURCES_SECTION.subtitle}
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NAV_STRUCTURE.resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group rounded-xl border border-[var(--border)] bg-white p-6 hover:border-[var(--brand)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)] transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-muted)] text-[var(--brand)]">
                    <FileText className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand)] transition-colors shrink-0 mt-1" />
                </div>
                <h2 className="text-base font-semibold mb-2">{resource.title}</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {resource.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Need tailored documentation?</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Request a quotation and our architects will share materials matched to your deployment.
          </p>
          <Link href="/contact#get-a-quote" className="kyber-btn-primary inline-flex items-center gap-2">
            Get a quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
