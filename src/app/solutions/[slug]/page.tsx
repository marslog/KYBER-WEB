import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionPageContent from "@/components/sections/SolutionPageContent";
import { getAllSolutionSlugs, getSolutionBySlug } from "@/lib/solutionsCatalog";
import { createPageMetadata, SOLUTION_KEYWORDS } from "@/lib/siteSeo";

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
    title: `${solution.title} — KYBER Solutions`,
    description: solution.description,
    path: `/solutions/${slug}`,
    keywords: SOLUTION_KEYWORDS[slug] ?? [],
  });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar />
      <SolutionPageContent solution={solution} />
      <Footer />
    </main>
  );
}
