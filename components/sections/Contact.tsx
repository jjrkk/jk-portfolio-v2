import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

const RESUME_URL =
  "https://drive.google.com/open?id=1h0HfLLc7f9PIux_H52rgf-qihaPk7JNu&usp=drive_fs";

/** Brand fuchsia hardcoded so the dark footer is always on-brand regardless
 *  of where the scroll-driven --accent is sitting at the time it's revealed. */
const FUCHSIA = "#D7355D";

export function Contact({ dark }: { dark?: boolean }) {
  if (dark) {
    return (
      <footer id="contact" style={{ background: "var(--accent, #D7355D)" }} className="pb-12 pt-24 sm:pt-32">
        <Container>
          <Eyebrow mark={false} className="text-white/50">
            Contact
          </Eyebrow>

          <h2 className="mt-7 max-w-[16ch] font-serif text-display-sm font-semibold text-white">
            Let&rsquo;s build something.
          </h2>

          <p className="mt-7 max-w-xl font-sans text-body-lg text-white/70">
            Open to Lead, Staff, and Director product-design roles — and
            AI-first teams where designing and building live in the same person.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-white px-6 py-3 font-mono text-caption uppercase tracking-[0.12em] text-[#D7355D] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_12px_26px_-10px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-100 active:duration-100"
            >
              Résumé
              <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <ArrowLink
              href={SITE.socials.linkedin}
              external
              className="text-white/80 hover:text-white"
            >
              LinkedIn
            </ArrowLink>

            <EmailCopyButton email={SITE.socials.email} dark />
          </div>

          <div className="mt-24 flex flex-col gap-2 border-t border-white/20 pt-8 font-mono text-eyebrow uppercase text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>{SITE.name}</span>
            <span>Built with agentic AI · {new Date().getFullYear()}</span>
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
            Open to Lead, Staff, and Director product-design roles — and
            AI-first teams where designing and building live in the same person.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Primary CTA — résumé */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-accent px-6 py-3 font-mono text-caption uppercase tracking-[0.12em] text-accent-contrast shadow-[0_2px_10px_-4px_rgba(21,19,15,0.22)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_12px_26px_-10px_var(--accent)] active:translate-y-0 active:scale-100 active:duration-100"
            >
              Résumé
              <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <ArrowLink href={SITE.socials.linkedin} external>LinkedIn</ArrowLink>

            <EmailCopyButton email={SITE.socials.email} />
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col gap-2 border-t border-border pt-8 font-mono text-eyebrow uppercase text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>{SITE.name}</span>
          <span>Built with agentic AI · {new Date().getFullYear()}</span>
        </div>
      </Container>
    </footer>
  );
}
