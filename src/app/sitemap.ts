import type { MetadataRoute } from "next";
import { getAllCompanySlugs } from "@/data/pageContent";
import { getAllResourceSlugs } from "@/data/resourcesContent";
import { ALL_PRODUCTS } from "@/data/platformData";
import { NAV_STRUCTURE } from "@/data/platformData";
import { absoluteUrl } from "@/lib/siteSeo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/security"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/resources"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const products: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
    url: absoluteUrl(product.href),
    lastModified: now,
    changeFrequency: "monthly",
    priority: product.href.includes("/hci") || product.href.includes("/marsloq") ? 0.9 : 0.7,
  }));

  const logManagementAlias: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/products/log-management"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/products/siem"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const solutions: MetadataRoute.Sitemap = NAV_STRUCTURE.solutions.map((solution) => ({
    url: absoluteUrl(solution.href),
    lastModified: now,
    changeFrequency: "monthly",
    priority: solution.href.includes("secops-log-management") ? 0.9 : 0.75,
  }));

  const resources: MetadataRoute.Sitemap = getAllResourceSlugs().map((slug) => ({
    url: absoluteUrl(`/resources/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const company: MetadataRoute.Sitemap = getAllCompanySlugs().map((slug) => ({
    url: absoluteUrl(`/company/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...products, ...logManagementAlias, ...solutions, ...resources, ...company];
}
