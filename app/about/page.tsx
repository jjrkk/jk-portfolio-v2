import type { Metadata } from "next";
import { AccentReset } from "@/components/AccentReset";
import { PageNav } from "@/components/PageNav";
import { PageTransition } from "@/components/PageTransition";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStatement } from "@/components/sections/about/AboutStatement";
import { CaseSectionOpener } from "@/components/sections/case-study/CaseSectionOpener";
import { SpecularBorder } from "@/components/ui/SpecularBorder";
import { AtWork } from "@/components/sections/about/AtWork";
import { ExperienceTimeline } from "@/components/sections/about/ExperienceTimeline";
import { LogoWall } from "@/components/sections/LogoWall";
import { Personality } from "@/components/sections/Personality";
import { Contact } from "@/components/sections/Contact";
import { FooterReveal } from "@/components/ui/FooterReveal";
import { SITE } from "@/lib/site";
import { INTRO_BLOB } from "@/lib/theme";

export const metadata: Metadata = {
  title: "About",
  description: SITE.description,
  alternates: { canonical: "/about/" },
  openGraph: {
    type: "profile",
    url: `${SITE.url}/about/`,
    title: `About — ${SITE.name}`,
    description: SITE.description,
  },
};

// About: split hero → big statement → "at work" philosophy → experience
// timeline → clients & recognition → off-the-clock → contact. The page frame
// holds the wall here (no carousel to drive per-project theming) — the hero
// sits on the same light wall as the rest of the page now, so the nav can
// use its default dark-ink tone throughout (no scroll-driven flip needed).
export default function AboutPage() {
  return (
    <>
      <AccentReset />
      <PageNav rightLabel="Contact" rightHref="#contact" />
      <main id="main-content" tabIndex={-1} style={{ background: "var(--wall)" }}>
        <PageTransition>
          {/* Same sticky-underlay pattern as the case-study template: the hero
              is pinned on the wall; the cream content slides over it as the
              user scrolls. (The nav tone no longer depends on this boundary —
              both sides are light now — so PageNav ignores this sentinel on
              About; it's left in place only as an unused scroll marker.) */}
          <div className="relative">
            <div className="sticky top-0 z-[1]">
              <AboutHero />
            </div>

            <div aria-hidden data-nav-sentinel className="pointer-events-none h-0" />

            <div className="relative z-[2] mx-[12px] overflow-hidden rounded-t-[2rem] rounded-b-[2rem] bg-background">
              {/* Same uniform luminous edge as the landing's page-card shell —
                  consistent contrast against --wall on every side. */}
              <SpecularBorder uniform radius="rounded-t-[2rem] rounded-b-[2rem]" />
              {/* Cool wash, not brand fuchsia — matches the landing intro's
                  cool-card treatment (INTRO_BLOB = FF Cloud's own accent,
                  reused for palette consistency rather than a new hue). */}
              <CaseSectionOpener color={INTRO_BLOB} />
              <AboutStatement />
              <LogoWall />
              <AtWork />
              <ExperienceTimeline />
              <Personality />
              {/* Mirrors the opener above: the same cool wash bleeding up from
                  the card's bottom edge, bookending the hand-off to Contact's
                  own wall-colored surface below instead of a flat cut. */}
              <CaseSectionOpener color={INTRO_BLOB} position="bottom" />
            </div>
          </div>
          <FooterReveal>
            <Contact dark />
          </FooterReveal>
        </PageTransition>
      </main>
    </>
  );
}
