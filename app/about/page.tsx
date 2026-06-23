import type { Metadata } from "next";
import { AccentReset } from "@/components/AccentReset";
import { PageNav } from "@/components/PageNav";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStatement } from "@/components/sections/about/AboutStatement";
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
      <PageNav rightLabel="Contact" rightHref={`mailto:${SITE.socials.email}`} />
      <main id="main-content" tabIndex={-1} style={{ background: "var(--accent)" }}>
        {/* mx-[10px] matches the PageFrame inset so the accent base canvas peeks
            on the sides; rounded-b-[2rem] gives the rounded corner as the sticky
            footer reveals beneath — same pattern as the case-study template. */}
        <div className="relative z-[1] mx-[10px] overflow-hidden rounded-b-[2rem] bg-background">
          <AboutHero />
          <AboutStatement />
          <AtWork />
          <ExperienceTimeline />
          <LogoWall />
          <Personality />
        </div>
        <FooterReveal>
          <Contact dark />
        </FooterReveal>
      </main>
    </>
  );
}
