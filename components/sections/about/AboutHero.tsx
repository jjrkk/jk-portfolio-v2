"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { HeroImageTilt } from "@/components/sections/case-study/HeroImageTilt";
import { RESUME_URL } from "@/components/sections/Contact";

/**
 * About hero — portrait + serif greeting + intro + socials.
 * Sits on the accent base canvas (fuchsia) as a sticky underlay, with the
 * cream content sections scrolling over it. Mirrors the case-study hero
 * pattern: white text on accent, portrait wrapped in HeroImageTilt for the
 * scroll-rotation parallax.
 */
export function AboutHero() {
  return (
    <header
      className="relative isolate pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44"
      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
    >
      <Container>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Portrait with scroll-rotation parallax */}
          <Reveal className="lg:col-span-5">
            <HeroImageTilt scrollRange={800} maxDeg={-20}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/portrait.webp"
                alt="Justin Kirkey"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </HeroImageTilt>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="font-serif text-display font-semibold leading-[0.92]"
                  style={{ color: "var(--accent-contrast)" }}>
                Hi, I&rsquo;m
                <br />
                <span style={{ color: "var(--accent-contrast)", opacity: 0.75 }}>Justin.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl font-sans text-body-lg"
                 style={{ color: "var(--accent-contrast)", opacity: 0.8 }}>
                I&rsquo;m a product design leader based in Toronto — 15+ years
                across healthcare and other high-stakes, regulated products, and
                a hands-on builder who ships with agentic AI. Open to Lead,
                Staff, and Director roles, and AI-first teams.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-eyebrow uppercase tracking-[0.14em]">
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-100"
                  style={{ color: "var(--accent-contrast)", opacity: 0.7 }}
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${SITE.socials.email}`}
                  className="transition-opacity hover:opacity-100"
                  style={{ color: "var(--accent-contrast)", opacity: 0.7 }}
                >
                  Email
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-100"
                  style={{ color: "var(--accent-contrast)", opacity: 0.7 }}
                >
                  Résumé
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </header>
  );
}
