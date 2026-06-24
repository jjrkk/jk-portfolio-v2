import type { Metadata } from "next";
import { AccentReset } from "@/components/AccentReset";
import { PageNav } from "@/components/PageNav";
import { PageTransition } from "@/components/PageTransition";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStatement } from "@/components/sections/about/AboutStatement";
import { CaseSectionOpener } from "@/components/sections/case-study/CaseSectionOpener";
import { AtWork } from "@/components/sections/about/AtWork";
import { ExperienceTimeline } from "@/components/sections/about/ExperienceTimeline";
import { LogoWall } from "@/components/sections/LogoWall";
import { Personality } from "@/components/sections/Personality";
import { Contact } from "@/components/sections/Contact";
import { FooterReveal } from "@/components/ui/FooterReveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: SITE.description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${SITE.url}/about`,
    title: `About — ${SITE.name}`,
    description: SITE.description,
  },
};

// About: split hero → big statement → "at work" philosophy → experience
// timeline → clients & recognition → off-the-clock → contact. The page frame
// holds the brand accent here (no carousel to drive per-project theming).
export default function AboutPage() {
  return (
    <>
      <AccentReset />
      <PageNav rightLabel="Contact" rightHref="#contact" tone="light" />
      <main id="main-content" tabIndex={-1} style={{ background: "var(--accent)" }}>
        <PageTransition>
          {/* Same sticky-underlay pattern as the case-study template:
              the hero is pinned on the accent canvas; the cream content slides
              over it as the user scrolls. The sentinel triggers the nav tone
              switch from white-on-accent to dark ink. */}
          <div className="relative">
            <div className="sticky top-0 z-[1]">
              <AboutHero />
            </div>

            {/* Sentinel: nav flips from white → dark when this crosses the nav bar */}
            <div aria-hidden data-nav-sentinel className="pointer-events-none h-0" />

            <div className="relative z-[2] mx-[12px] overflow-hidden rounded-t-[2rem] rounded-b-[2rem] bg-background">
              <CaseSectionOpener />
              <AboutStatement />
              <LogoWall />
              <AtWork />
              <ExperienceTimeline />
              <Personality />
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
