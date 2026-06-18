import type { MetadataRoute } from "next";
import { SITE, ROUTES } from "@/lib/site";
import { getCaseStudySlugs } from "@/lib/case-studies";

// Required by Next 16 under output: "export" — emit a static sitemap.xml.
export const dynamic = "force-static";

// Generates a static sitemap.xml at build time (works under output: "export").
// Top-level routes from ROUTES + every shipped case study (Phase 3+).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const top = ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
  const caseStudies = getCaseStudySlugs().map((slug) => ({
    url: `${SITE.url}/work/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...top, ...caseStudies];
}
