import { PageNav } from "@/components/PageNav";
import { getProjectTheme } from "@/lib/theme";
import { SITE } from "@/lib/site";
import type { CaseStudy } from "@/lib/case-studies";
import { ProjectAccent } from "./ProjectAccent";
import { CaseHero } from "./CaseHero";
import { CaseOverview } from "./CaseOverview";
import { CaseNarrative } from "./CaseNarrative";
import { CaseJudgment } from "./CaseJudgment";
import { CaseImpact } from "./CaseImpact";
import { CaseGallery } from "./CaseGallery";
import { CaseNext } from "./CaseNext";
import { CaseFilmstrip } from "./CaseFilmstrip";
import { Contact } from "@/components/sections/Contact";

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
          background: "var(--accent)",
        } as React.CSSProperties
      }
    >
      {theme && <ProjectAccent accent={theme.accent} />}
      <PageNav rightLabel="Contact" rightHref={`mailto:${SITE.socials.email}`} tone="light" />

      <main id="main-content" tabIndex={-1}>
        <CaseHero study={study} />
        {/* Cream content block — rounded top corners, inset to clear the PageFrame
            boundary so the arc is fully visible rather than clipped by the 10px gap. */}
        <div className="mx-[10px] overflow-hidden rounded-t-[2rem]">
          <CaseOverview study={study} />
          {study.body.map((block, i) => (
            <CaseNarrative key={i} block={block} />
          ))}
          {study.gallery && study.gallery.length > 0 && (
            <CaseGallery items={study.gallery} columns={study.galleryColumns} />
          )}
          <CaseJudgment study={study} />
          <CaseImpact study={study} />
          {study.filmstrip && study.filmstrip.length > 0 && (
            <CaseFilmstrip images={study.filmstrip} />
          )}
        </div>
        {study.next && <CaseNext next={study.next} />}
        <Contact dark />
      </main>
    </div>
  );
}
