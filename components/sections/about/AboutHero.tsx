"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { RESUME_URL, RESUME_DOWNLOAD_FILENAME } from "@/components/sections/Contact";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
import { track } from "@/lib/analytics";

export function AboutHero() {
  return (
    <header
      className="relative isolate pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44"
      style={{ background: "var(--wall)", color: "var(--wall-ink)" }}
    >
      <Container>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/portrait.webp"
                alt="Justin Kirkey"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="font-serif text-display-sm font-semibold leading-[1.02]"
                  style={{ color: "var(--wall-ink)", fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}>
                I design digital products for healthcare, high-stakes, and
                AI-first teams — and{" "}
                <span style={{ color: "var(--accent)" }}>build them</span> with
                agentic AI.
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl font-sans text-body-lg text-muted">
                15+ years leading product design across healthcare and other
                high-stakes, regulated industries. Open to Principal / Staff or
                Design Director roles for meaningful work on AI-first teams.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-eyebrow uppercase tracking-[0.14em]">
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("linkedin_click", { location: "about_hero" })}
                  className="text-muted transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={RESUME_URL}
                  download={RESUME_DOWNLOAD_FILENAME}
                  onClick={() => track("resume_click", { location: "about_hero" })}
                  className="text-muted transition-colors hover:text-accent"
                >
                  Résumé
                </a>
                <EmailCopyButton
                  email={SITE.socials.email}
                  location="about_hero"
                  className="font-mono text-eyebrow tracking-[0.14em] text-muted hover:text-accent"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </header>
  );
}
