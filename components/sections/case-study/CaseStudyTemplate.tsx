import { PageNav } from "@/components/PageNav";
import { getProjectTheme } from "@/lib/theme";
import { SITE } from "@/lib/site";
import type { CaseStudy } from "@/lib/case-studies";
import { ProjectAccent } from "./ProjectAccent";
import { CaseHero } from "./CaseHero";
import { CaseSectionOpener } from "./CaseSectionOpener";
import { CaseOverview } from "./CaseOverview";
import { CaseNarrative } from "./CaseNarrative";
import { CaseAIWorkflow } from "./CaseAIWorkflow";
import { CaseDesignSystem } from "./CaseDesignSystem";
import { CaseJudgment } from "./CaseJudgment";
import { CaseImpact } from "./CaseImpact";
import { CaseGallery } from "./CaseGallery";
import { CaseNext } from "./CaseNext";
import { CaseFilmstrip } from "./CaseFilmstrip";
import { Contact } from "@/components/sections/Contact";
import { FooterReveal } from "@/components/ui/FooterReveal";

/**
 * The repeatable case-study template (Phase 3). Every /work/<slug> renders
 * through this: accent hero → overview (narrative + meta) → narrative beats →
 * judgment / trade-offs → impact → next study → contact.
 *
 * Theming: the project accent is set inline on the wrapper (SSR, no flash) so
 * all content uses it, and ProjectAccent mirrors it onto documentElement for
 * the fixed PageFrame. Both restore to brand when navigating away.
 */
export function CaseStudyTemplate({ study }: { study: CaseStudy }) {
  const theme = getProjectTheme(study.slug);

  return (
    <div
      style={
        {
          "--accent": theme?.accent,
          "--panel-bg": theme?.panelBg,
          ...(theme?.accentContrast && { "--accent-contrast": theme.accentContrast }),
          background: "var(--accent)",
        } as React.CSSProperties
      }
    >
      {theme && <ProjectAccent accent={theme.accent} accentContrast={theme.accentContrast} />}
      <PageNav rightLabel="Contact" rightHref="#contact" tone="light" />

      <main id="main-content" tabIndex={-1}>
        {/* Hero + content group. This wrapper BOUNDS the hero's sticky range:
            the hero stays pinned only while this block is in view, then releases
            and scrolls away with it — so it never bleeds over the footer at the
            bottom. (Same pattern the landing carousel uses.) The hero is pinned
            to this wrapper's bottom edge = the cream's bottom edge, so the cream
            always covers it and it can't poke out below. */}
        <div className="relative">
          {/* Hero — sticky underlay; cream (z-[2]) slides over it on the way down */}
          <div className="sticky top-0 z-[1]">
            <CaseHero study={study} />
          </div>

          {/* Sentinel for PageNav tone switch: zero-height marker at the hero/content
              boundary. When this scrolls above the nav (rootMargin shifts the trigger
              to the nav's own height), PageNav flips from white-on-accent to dark+backdrop. */}
          <div aria-hidden data-nav-sentinel className="pointer-events-none h-0" />

          {/* Cream content — highest z-index; slides over the hero and peels to reveal footer */}
          <div className="relative z-[2]">
            {/* Rounded top corners, inset to clear the PageFrame boundary */}
            <div className="relative mx-[12px] overflow-hidden rounded-t-[2rem]">
              <CaseSectionOpener />
              <CaseOverview study={study} />
              {study.body.map((block, i) => (
                <CaseNarrative key={i} block={block} />
              ))}
              {/* Flagship-only sections (FF Cloud): the AI workflow + live design
                  system, rendered between the narrative beats and the gallery. */}
              {study.aiWorkflow && (
                <CaseAIWorkflow data={study.aiWorkflow} liveLink={study.liveLink} slug={study.slug} />
              )}
              {study.designSystem && <CaseDesignSystem data={study.designSystem} />}
              {study.gallery && study.gallery.length > 0 && (
                <CaseGallery items={study.gallery} columns={study.galleryColumns} />
              )}
              <CaseJudgment study={study} />
              <CaseImpact study={study} />
              {study.filmstrip && study.filmstrip.length > 0 && (
                <CaseFilmstrip images={study.filmstrip} />
              )}
            </div>
            {study.next && <CaseNext next={study.next} currentSlug={study.slug} />}
          </div>
        </div>

        {/* Footer — sticky underlay at bottom; content peels away to reveal it */}
        <FooterReveal>
          <Contact dark />
        </FooterReveal>
      </main>
    </div>
  );
}
