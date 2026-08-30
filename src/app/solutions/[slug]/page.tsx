import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionPageContent from "@/components/sections/SolutionPageContent";
import StructuredData from "@/components/seo/StructuredData";
import { getAllSolutionSlugs, getSolutionBySlug } from "@/lib/solutionsCatalog";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structuredData";
import { LOG_MANAGEMENT_FAQ } from "@/data/seoFaq";
import {
  createPageMetadata,
  SOLUTION_KEYWORDS,
  SOLUTION_SEO_DESCRIPTIONS,
  SOLUTION_SEO_TITLES,
} from "@/lib/siteSeo";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return { title: "Solution Not Found" };

  return createPageMetadata({
    title: SOLUTION_SEO_TITLES[slug] ?? `${solution.title} — KYBER Solutions`,
    description: SOLUTION_SEO_DESCRIPTIONS[slug] ?? solution.description,
    path: `/solutions/${slug}`,
    keywords: SOLUTION_KEYWORDS[slug] ?? [],
  });
}

function solutionStructuredData(slug: string, solution: NonNullable<ReturnType<typeof getSolutionBySlug>>) {
  const path = `/solutions/${slug}`;
  const base: Record<string, unknown>[] = [
    buildWebPageJsonLd({
      name: solution.title,
      description: SOLUTION_SEO_DESCRIPTIONS[slug] ?? solution.description,
      path,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Solutions", path: "/solutions/enterprise-hci" },
      { name: solution.title, path },
    ]),
  ];

  if (slug === "secops-log-management") {
    base.push(
      buildSoftwareApplicationJsonLd({
        name: "MARSLOQ Log Management",
        description: SOLUTION_SEO_DESCRIPTIONS[slug] ?? solution.description,
        url: "/products/log-management",
      }),
      buildFaqJsonLd(LOG_MANAGEMENT_FAQ),
    );
  }

  return base;
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <StructuredData data={solutionStructuredData(slug, solution)} />
      <Navbar />
      <SolutionPageContent solution={solution} />
      <Footer />
    </main>
  );
}
