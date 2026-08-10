"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { WALL_LIGHT } from "@/lib/theme";
import { cn } from "@/lib/cn";

// Single source of truth for the résumé link (used by Contact, Work, AboutHero).
// Self-hosted static file — swap public/resume/justin-kirkey-resume.pdf to update.
export const RESUME_URL = "/resume/justin-kirkey-resume.pdf";
export const RESUME_DOWNLOAD_FILENAME = "Justin Kirkey - Resume.pdf";

export function Contact({ dark, variant = "brand" }: { dark?: boolean; variant?: "brand" | "accent" }) {
  if (dark) {
    // "dark" = self-contained footer (own explicit background, for the sticky
    // FooterReveal pattern) rather than "sits in the surrounding light flow"
    // (the plain variant below).
    //
    // `variant` picks which surface it's a self-contained footer FOR:
    //  - "brand" (landing, About): background pinned to WALL_LIGHT rather than
    //    the live --wall so it's always on-brand regardless of where the
    //    scroll-driven wall/accent happens to be sitting at reveal time.
    //  - "accent" (case studies): the page's whole canvas is a fixed
    //    `var(--accent)` fill (set once, not scroll-driven, unlike the
    //    landing) — so the footer should just continue that same fill rather
    //    than sit on it as a mismatched light card. Text/CTAs flip to
    //    `--accent-contrast`, mirroring CaseHero's accent-on-accent treatment.
    const onAccent = variant === "accent";
    return (
      <footer
        id="contact"
        style={{ background: onAccent ? "var(--accent)" : WALL_LIGHT }}
        className="pb-12 pt-24 sm:pt-32"
      >
        <Container>
          <Eyebrow mark={false} className={onAccent ? "text-[color:var(--accent-contrast)]/70" : "text-faint"}>
            Contact
          </Eyebrow>

          <h2
            className="mt-7 max-w-[16ch] font-serif text-display-sm font-semibold"
            style={{ color: onAccent ? "var(--accent-contrast)" : "var(--accent)" }}
          >
            Let&rsquo;s build something.
          </h2>

          <p
            className={cn(
              "mt-7 max-w-xl font-sans text-body-lg",
              onAccent ? "text-[color:var(--accent-contrast)]/85" : "text-muted",
            )}
          >
            Open to Principal / Staff / Lead or Design Director roles doing
            meaningful work on AI-first teams.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={RESUME_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              onClick={() => track("resume_click", { location: "contact_footer" })}
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full px-6 py-3 font-mono text-caption uppercase tracking-[0.12em] shadow-[0_2px_10px_-4px_rgba(21,19,15,0.22)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-100 active:duration-100"
              style={
                onAccent
                  ? { background: "var(--accent-contrast)", color: "var(--accent)" }
                  : { background: "var(--accent)", color: "var(--accent-contrast)" }
              }
            >
              Résumé
              <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <ArrowLink
              href={SITE.socials.linkedin}
              external
              onClick={() => track("linkedin_click", { location: "contact_footer" })}
              className={onAccent ? "text-[color:var(--accent-contrast)]/80 hover:text-[color:var(--accent-contrast)]" : undefined}
            >
              LinkedIn
            </ArrowLink>

            <EmailCopyButton email={SITE.socials.email} dark={onAccent} />
          </div>

          <div
            className={cn(
              "mt-24 flex flex-col gap-2 border-t pt-8 font-mono text-eyebrow uppercase sm:flex-row sm:items-center sm:justify-between",
              onAccent ? "border-[color:var(--accent-contrast)]/20 text-[color:var(--accent-contrast)]/60" : "border-border text-faint",
            )}
          >
            <span>{SITE.name}</span>
            <span>
              Built with{" "}
              <span className={onAccent ? "text-[color:var(--accent-contrast)]" : "text-foreground"}>good vibes</span>,{" "}
              <span className={onAccent ? "text-[color:var(--accent-contrast)]" : "text-foreground"}>curiosity</span> &{" "}
              <span className={onAccent ? "text-[color:var(--accent-contrast)]" : "text-foreground"}>agentic AI</span> ·{" "}
              {new Date().getFullYear()}
            </span>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="pb-12 pt-24 sm:pt-32">
      <Container>
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-7 max-w-[16ch] font-serif text-display-sm font-semibold text-accent">
            Let&rsquo;s build something.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-xl font-sans text-body-lg text-muted">
            Open to Principal / Staff / Lead or Design Director roles doing
            meaningful work on AI-first teams.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Primary CTA — résumé */}
            <a
              href={RESUME_URL}
              download={RESUME_DOWNLOAD_FILENAME}
              onClick={() => track("resume_click", { location: "contact_footer" })}
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-accent px-6 py-3 font-mono text-caption uppercase tracking-[0.12em] text-accent-contrast shadow-[0_2px_10px_-4px_rgba(21,19,15,0.22)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_12px_26px_-10px_var(--accent)] active:translate-y-0 active:scale-100 active:duration-100"
            >
              Résumé
              <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <ArrowLink href={SITE.socials.linkedin} external onClick={() => track("linkedin_click", { location: "contact_footer" })}>LinkedIn</ArrowLink>

            <EmailCopyButton email={SITE.socials.email} />
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col gap-2 border-t border-border pt-8 font-mono text-eyebrow uppercase text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>{SITE.name}</span>
          <span>
            Built with <span className="text-foreground">good vibes</span>,{" "}
            <span className="text-foreground">curiosity</span> &{" "}
            <span className="text-foreground">agentic AI</span> · {new Date().getFullYear()}
          </span>
        </div>
      </Container>
    </footer>
  );
}
