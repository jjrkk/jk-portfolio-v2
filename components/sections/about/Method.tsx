"use client";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { METHOD_STAGES } from "@/lib/method";
import { WORK } from "@/lib/work";

/**
 * "Range" — the spectrum-of-tactics section (CLAUDE.md About IA addition).
 * One quiet list, five rows — same restrained grammar as AtWork's point list
 * (hairline rule, sans row title, one line of support) rather than a second,
 * heavier taxonomy. Each row opens with a small icon tile instead of pure
 * text — a hand-drawn glyph for the stage, tinted with that row's curated
 * color (lib/method.ts's `color` field — mostly the linked case's own
 * accent, spaced for max separation between rows; see that file for why
 * build-launch breaks from its case's color). Any AI-specific tactic still
 * renders lit in brand accent inline, a second, distinct signal from the
 * per-stage tile color.
 */
export function Method() {
  return (
    <Section tone="surface">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Range</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-display-sm font-semibold text-foreground">
              Design strategy as a spectrum of tactics.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-sans text-body-lg text-muted">
              Fifteen-plus years across strategy, research, definition, UI, and
              build — with AI now the newest layer, woven through every stage
              rather than bolted onto one.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14">
          {METHOD_STAGES.map((s, i) => {
            const proof = s.proof[0];
            const stageColor = s.color;
            const Icon = STAGE_ICONS[s.id] ?? BarsIcon;
            return (
              <Reveal as="li" key={s.id} delay={Math.min(i * 0.04, 0.2)}>
                <div
                  id={s.id}
                  className="flex scroll-mt-28 items-start gap-5 border-t border-border py-6 sm:gap-6"
                >
                  <div
                    aria-hidden
                    className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border sm:h-14 sm:w-14"
                    style={{
                      color: stageColor,
                      background: `color-mix(in srgb, ${stageColor} 14%, var(--surface))`,
                      borderColor: `color-mix(in srgb, ${stageColor} 22%, transparent)`,
                    }}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                      {s.stage}
                    </span>
                    <h3 className="mt-2 font-sans text-heading font-medium text-foreground">
                      {s.claim}
                    </h3>
                    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] uppercase tracking-[0.05em] text-muted">
                      {s.tactics.map((t, ti) => (
                        <span key={t.label} className="inline-flex items-center gap-2">
                          {ti > 0 && (
                            <span aria-hidden className="text-faint">
                              ·
                            </span>
                          )}
                          <span className={cn((t.ai || t.emphasis) && "text-accent")}>{t.label}</span>
                        </span>
                      ))}
                      <span aria-hidden className="text-faint">
                        ·
                      </span>
                      <ArrowLink href={`/work/${proof.slug}/`}>{proof.title}</ArrowLink>
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={0.1} className="border-t border-border pt-8">
          <ArrowLink
            href="/"
            onClick={() => {
              // Land straight on the first project slide, not the carousel's
              // own intro — Work.tsx's carousel already restores to a given
              // slug via this same sessionStorage key (see initialSlideIndex
              // and the return-restore effect there); suppressing SmoothScroll's
              // route-change reset lets that pre-paint restore actually stick.
              try {
                sessionStorage.setItem("jk-return-slug", WORK[0].slug);
                (window as unknown as { __jkSuppressScrollReset?: boolean }).__jkSuppressScrollReset = true;
              } catch {}
            }}
          >
            See it in the work
          </ArrowLink>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Small hand-drawn glyphs (24x24, stroke-only) — same construction as
 *  ArrowLink's arrow icons rather than a generic icon-library import, so
 *  they sit in the site's own bespoke-SVG house style. One per stage. */
type IconProps = { className?: string };

function BarsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="18" x2="6" y2="13" />
      <line x1="12" y1="18" x2="12" y2="9" />
      <line x1="18" y1="18" x2="18" y2="5" />
    </svg>
  );
}

function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6" />
      <line x1="15" y1="15" x2="19.5" y2="19.5" />
    </svg>
  );
}

function ClipboardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <rect x="9" y="2.5" width="6" height="3" rx="1" />
      <line x1="9" y1="11.5" x2="15" y2="11.5" />
      <line x1="9" y1="15.5" x2="15" y2="15.5" />
    </svg>
  );
}

function PencilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l0.8-3.8L15.2 5.8a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L7.8 19.2 4 20z" />
      <line x1="13.6" y1="7.4" x2="16.6" y2="10.4" />
    </svg>
  );
}

function RocketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c2 2.2 2.6 5.7 1.8 9.2L12 14l-1.8-1.8C9.4 8.7 10 5.2 12 3z" />
      <circle cx="12" cy="8.6" r="1.1" />
      <path d="M9.3 12.2L7 14l0.7-2.7" />
      <path d="M14.7 12.2L17 14l-0.7-2.7" />
      <line x1="10.9" y1="14.3" x2="10.2" y2="17.5" />
      <line x1="13.1" y1="14.3" x2="13.8" y2="17.5" />
    </svg>
  );
}

const STAGE_ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  strategy: BarsIcon,
  discovery: SearchIcon,
  definition: ClipboardIcon,
  "ux-ui": PencilIcon,
  "build-launch": RocketIcon,
};
