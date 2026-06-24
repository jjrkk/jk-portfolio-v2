import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { CaseStudy } from "@/lib/case-studies";
import { HeroImageTilt } from "./HeroImageTilt";

/**
 * Case-study hero (grammar #4): accent-color stage with a clean, left-aligned
 * stack — eyebrow → title → subtitle → hero image, all anchored to the same
 * gutter. The image sits below the title (no overlap) and tips into the page on
 * scroll via <HeroImageTilt> for premium depth as the cream content rises over
 * the pinned hero.
 *
 * The <h1> stays server-rendered here (SEO); only the image is client-side
 * (HeroImageTilt) for the scroll-linked motion.
 */
export function CaseHero({ study }: { study: CaseStudy }) {
  const { eyebrow, title, subtitle, hero, confidential } = study;

  return (
    <header
      className="relative isolate overflow-clip"
      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
    >
      <Container className="pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44">
        <div className="flex items-center gap-4">
          <Eyebrow mark={false} className="text-[color:var(--accent-contrast)]/80">
            {eyebrow}
          </Eyebrow>
          {confidential && (
            <span className="inline-flex items-center rounded-full border border-[color:var(--accent-contrast)]/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--accent-contrast)]/80">
              Confidential
            </span>
          )}
        </div>

        <h1
          className="mt-8 font-serif text-display-sm font-semibold lg:text-hero"
          style={{ color: "var(--accent-contrast)" }}
        >
          {title}
        </h1>

        <p className="mt-6 max-w-2xl font-sans text-body-lg text-[color:var(--accent-contrast)]/85">
          {subtitle}
        </p>

        <div className="mt-10 lg:mt-12">
          <HeroImageTilt morphId={study.slug}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.src} alt={hero.alt} className="aspect-[16/11] w-full object-cover" />
          </HeroImageTilt>
        </div>
      </Container>
    </header>
  );
}
