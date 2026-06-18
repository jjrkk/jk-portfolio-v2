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
      <main id="main-content" tabIndex={-1}>
        <AboutHero />
        <AboutStatement />
        <AtWork />
        <ExperienceTimeline />
        <LogoWall />
        <Personality />
        <Contact />
      </main>
    </>
  );
}
