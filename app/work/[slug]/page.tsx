import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/components/sections/case-study/CaseStudyTemplate";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { SITE } from "@/lib/site";

// Static export: emit one HTML page per case study that has full content.
// Carousel slugs without content yet (Phase 4/5) simply aren't generated.
export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.title} — ${study.eyebrow.split(" · ").pop() ?? "Case study"}`;
  const description = study.subtitle;
  const ogImage = study.social ?? SITE.ogImage;
  return {
    title: study.title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `${SITE.url}/work/${slug}`,
      title,
      description,
      // Next doesn't inherit the root openGraph.images once a child sets its
      // own openGraph block, so restate the per-study card here.
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return <CaseStudyTemplate study={study} />;
}
