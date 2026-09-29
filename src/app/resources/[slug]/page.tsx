import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortalAccessPanel from "@/components/sections/PortalAccessPanel";
import FaqAccordion from "@/components/sections/FaqAccordion";
import ComplianceChecklist from "@/components/sections/ComplianceChecklist";
import LogSizingCalculator from "@/components/sections/LogSizingCalculator";
import StructuredData from "@/components/seo/StructuredData";
import { getAllResourceSlugs, getResourcePage } from "@/data/resourcesContent";
import { LOG_MANAGEMENT_FAQ } from "@/data/seoFaq";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structuredData";

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

  const complianceKeywords =
    slug === "computer-act-log-compliance"
      ? [
          "log พรบ คอมพิวเตอร์",
          "ระบบเก็บ log พรบ คอมพิวเตอร์",
          "เครื่องเก็บ log พรบ คอมพิวเตอร์",
          "log server พรบ คอมพิวเตอร์",
          "เก็บ log 90 วัน",
          "มาตรฐานการเก็บ log พรบ คอมพิวเตอร์ 2564",
          "พรบ คอมพิวเตอร์ มาตรา 26",
          "Computer Crime Act log compliance Thailand",
        ]
      : undefined;

  return {
    title: `${page.title} — KYBER Resources`,
    description: page.intro,
    keywords: complianceKeywords,
  };
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) notFound();

  const structuredData: Record<string, unknown>[] = [
    buildWebPageJsonLd({
      name: page.title,
      description: page.intro,
      path: `/resources/${slug}`,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources" },
      { name: page.title, path: `/resources/${slug}` },
    ]),
  ];

  if (slug === "computer-act-log-compliance") {
    structuredData.push(buildFaqJsonLd(LOG_MANAGEMENT_FAQ));
  }

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <StructuredData data={structuredData} />
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

          {slug === "computer-act-log-compliance" && (
            <div className="mt-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
              <div>
                <span className="font-semibold text-[var(--text)]">ผู้จัดทำและตรวจทาน: </span>
                KYBER Cybersecurity & Infrastructure Architecture Team (CISA, CISSP Certified)
              </div>
              <div className="text-[var(--text-muted)]">
                อัปเดตล่าสุด: ประกาศกระทรวง ดีอี 13 ส.ค. 2564
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-shell bg-[var(--bg-subtle)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {slug === "kb" && (
            <div className="mb-8">
              <PortalAccessPanel />
            </div>
          )}

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

          {slug === "computer-act-log-compliance" && (
            <ComplianceChecklist />
          )}

          {page.links && page.links.length > 0 && (
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                Related links & Legal References
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

      {slug === "computer-act-log-compliance" && (
        <LogSizingCalculator />
      )}

      {slug === "computer-act-log-compliance" && (
        <FaqAccordion
          items={LOG_MANAGEMENT_FAQ}
          title="คำถามที่พบบ่อยเกี่ยวกับข้อกำหนด Log พ.ร.บ. คอมพิวเตอร์"
          eyebrow="Compliance FAQ"
          subtitle="คำตอบสำหรับคำถามที่ผู้บริหารไอทีและผู้ดูแลระบบสอบถามบ่อยที่สุดเกี่ยวกับมาตรา 26 และระบบ MARSLOQ"
        />
      )}

      <section className="section-shell bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Start your deployment</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Request a quotation to receive tailored documentation and architect support.
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
