import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllResourceSlugs, getResourcePage } from "@/data/resourcesContent";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: `${page.title} — KYBER Resources`,
    description: page.intro,
  };
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const page = getResourcePage(slug);
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

          {page.links && page.links.length > 0 && (
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                Related links
              </h2>
              <ul className="space-y-2">
                {page.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-[var(--brand)] hover:underline"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                      {link.external ? (
                        <ExternalLink className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Start your deployment</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Register your project to receive tailored documentation and architect support.
          </p>
          <Link href="/contact" className="kyber-btn-primary inline-flex items-center gap-2">
            Register project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
