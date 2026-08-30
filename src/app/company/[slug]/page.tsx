import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllCompanySlugs, getCompanyPage } from "@/data/pageContent";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCompanySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCompanyPage(slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: `${page.title} — KYBER`,
    description: page.intro,
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const page = getCompanyPage(slug);
  if (!page) notFound();

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />

      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-3">{page.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl">
            {page.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mt-5 max-w-2xl">
            {page.intro}
          </p>

          {page.highlights && (
            <div className="mt-8 flex flex-wrap gap-8">
              {page.highlights.map((h) => (
                <div key={h.label}>
                  <div className="text-2xl font-semibold" style={{ color: "var(--brand)" }}>
                    {h.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{h.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-shell bg-[var(--bg-subtle)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4">
            {page.sections.map((section) => (
              <div
                key={section.heading}
                className="rounded-xl border border-[var(--border)] bg-white p-6"
              >
                <h2 className="text-lg font-semibold mb-2">{section.heading}</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Let&apos;s talk</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Reach out to the KYBER team — we&apos;d love to hear from you.
          </p>
          <Link href="/contact" className="kyber-btn-primary inline-flex items-center gap-2">
            Contact us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
