import { NAV_STRUCTURE, SOLUTIONS_JOURNEYS, type SolutionItem } from "@/data/platformData";

export interface SolutionPageData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName?: string;
  journeySteps?: SolutionItem["journeySteps"];
  outcomes?: string[];
}

function slugFromHref(href: string): string {
  return href.replace("/solutions/", "");
}

export function getAllSolutionSlugs(): string[] {
  return NAV_STRUCTURE.solutions.map((s) => slugFromHref(s.href));
}

export function getSolutionBySlug(slug: string): SolutionPageData | undefined {
  const nav = NAV_STRUCTURE.solutions.find((s) => slugFromHref(s.href) === slug);
  if (!nav) return undefined;

  const journey = SOLUTIONS_JOURNEYS.find((j) => slugFromHref(j.href) === slug);

  return {
    slug,
    title: journey?.title ?? nav.title,
    tagline: journey?.tagline ?? nav.desc,
    description: journey?.description ?? nav.desc,
    iconName: journey?.iconName,
    journeySteps: journey?.journeySteps,
    outcomes: journey?.outcomes,
  };
}
