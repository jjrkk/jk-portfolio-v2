import type { Metadata } from "next";
import {
  Container,
  Section,
  Eyebrow,
  ArrowLink,
  TwoColumn,
  MetaList,
} from "@/components/ui";
import { PROJECT_THEMES, SITE_ACCENT } from "@/lib/theme";

// Internal design-system reference. Kept out of search + the sitemap.
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const TYPE_SPECIMENS = [
  { token: "text-display", font: "font-serif", sample: "Builds with AI", note: "Hero / case-study heroes · → 144px" },
  { token: "text-display-sm", font: "font-serif", sample: "Selected work", note: "Large section titles · → 80px" },
  { token: "text-title", font: "font-serif", sample: "How I worked with AI", note: "Serif section titles" },
  { token: "text-heading", font: "font-sans", sample: "Decision & trade-offs", note: "Sans subheads" },
  { token: "text-body-lg", font: "font-sans", sample: "A refined clinical operating system — premium, calm, clinically credible.", note: "Lead paragraphs" },
  { token: "text-body", font: "font-sans", sample: "The redesign was the first concrete step in shifting from a point solution to a platform.", note: "Body copy" },
  { token: "text-caption", font: "font-sans", sample: "Dashboard — before / after", note: "Captions, metadata values" },
];

const COLOR_TOKENS = [
  { name: "background", hex: "#f7f5f2", note: "Warm off-white canvas" },
  { name: "surface", hex: "#ffffff", note: "Light stages for work" },
  { name: "foreground", hex: "#15130f", note: "Near-black ink" },
  { name: "muted", hex: "#57544e", note: "Secondary text (AA)" },
  { name: "faint", hex: "#8a8780", note: "Labels / tertiary" },
  { name: "border", hex: "#e4e0d9", note: "Hairline structure" },
  { name: "accent", hex: "#a8237a", note: "Site brand · violet-magenta" },
];

const META_DEMO = [
  { label: "Role", value: "Product Design Lead — direction, design-system architecture, hands-on prototype build" },
  { label: "Users", value: "Embryologists, lab directors, clinical & internal admin roles" },
  { label: "Methods", value: "Design-system architecture, research synthesis, high-fidelity prototyping, human–AI build workflow" },
  { label: "Subject", value: "AI healthtech / clinical SaaS / regulated medical UI" },
  { label: "Timeframe", value: "2025–2026" },
];

function Row({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-t border-border py-8 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-3">
        <code className="font-mono text-caption text-faint">{label}</code>
      </div>
      <div className="lg:col-span-9">{children}</div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main>
      <Container>
        <Section className="pb-12">
          <Eyebrow>Design System</Eyebrow>
          <h1 className="mt-6 font-serif text-display-sm">
            Parts kit & tokens
          </h1>
          <p className="mt-6 max-w-xl font-sans text-body-lg text-muted">
            The Phase&nbsp;1 foundation — type scale, color tokens, and the tiny
            consistent parts kit every later phase is built from. Restraint is
            why it reads as expensive.
          </p>
        </Section>

        {/* Type scale */}
        <Section className="py-12">
          <Eyebrow className="mb-10">Type scale</Eyebrow>
          {TYPE_SPECIMENS.map((s) => (
            <Row key={s.token} label={s.token}>
              <p className={`${s.font} ${s.token.replace("text-", "text-")} text-foreground`}>
                <span className={`${s.font}`}>{s.sample}</span>
              </p>
              <p className="mt-3 font-mono text-caption text-faint">{s.note}</p>
            </Row>
          ))}
        </Section>

        {/* Color */}
        <Section className="py-12">
          <Eyebrow className="mb-10">Color tokens</Eyebrow>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {COLOR_TOKENS.map((c) => (
              <div key={c.name} className="bg-surface p-5">
                <div
                  className="h-20 w-full rounded-md border border-border"
                  style={{ background: c.hex }}
                />
                <p className="mt-4 font-mono text-caption text-foreground">
                  --{c.name}
                </p>
                <p className="font-mono text-caption text-faint">{c.hex}</p>
                <p className="mt-1 font-sans text-caption text-muted">{c.note}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Per-project accents (scroll-theming palette) */}
        <Section className="py-12">
          <Eyebrow className="mb-3">Per-project accents</Eyebrow>
          <p className="mb-10 max-w-xl font-sans text-body text-muted">
            Direction A — branded &amp; harmonized. Each work panel themes the
            background, title, and links toward its accent as you scroll; the
            light tint is the panel background, keeping screenshots brightest.
          </p>
          <div className="flex flex-col gap-3">
            {PROJECT_THEMES.map((t) => (
              <div
                key={t.slug}
                className="flex items-center gap-5 rounded-lg px-5 py-4"
                style={{ background: t.panelBg }}
              >
                <span
                  className="h-8 w-8 shrink-0 rounded-full"
                  style={{ background: t.accent }}
                />
                <div className="flex-1">
                  <p className="font-sans text-body font-medium" style={{ color: t.accent }}>
                    {t.label}
                  </p>
                  <p className="font-mono text-caption" style={{ color: t.accent }}>
                    {t.slug}
                  </p>
                </div>
                <code className="font-mono text-caption" style={{ color: t.accent }}>
                  {t.accent}
                </code>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-5 rounded-lg border border-border px-5 py-4">
              <span
                className="h-8 w-8 shrink-0 rounded-full"
                style={{ background: SITE_ACCENT }}
              />
              <div className="flex-1">
                <p className="font-sans text-body font-medium text-foreground">
                  Site brand accent
                </p>
                <p className="font-mono text-caption text-faint">
                  the violet-magenta home color
                </p>
              </div>
              <code className="font-mono text-caption text-muted">{SITE_ACCENT}</code>
            </div>
          </div>
        </Section>

        {/* Parts kit */}
        <Section className="py-12">
          <Eyebrow className="mb-10">Parts kit</Eyebrow>

          <Row label="<Eyebrow>">
            <div className="flex flex-col gap-4">
              <Eyebrow>Selected work</Eyebrow>
              <Eyebrow mark={false}>No mark variant</Eyebrow>
            </div>
          </Row>

          <Row label="<ArrowLink>">
            <div className="flex flex-wrap items-center gap-10">
              <ArrowLink href="/about">View case study</ArrowLink>
              <ArrowLink href="https://example.com">Live prototype</ArrowLink>
              <ArrowLink href="#" direction="down">Scroll to work</ArrowLink>
            </div>
          </Row>

          <Row label="<TwoColumn> + <MetaList>">
            <TwoColumn
              narrative={
                <div>
                  <Eyebrow>Background</Eyebrow>
                  <h3 className="mt-5 font-serif text-title">
                    Modernizing a clinical AI platform
                  </h3>
                  <p className="mt-5 font-sans text-body text-muted">
                    This wasn&rsquo;t a cosmetic refresh. The business was
                    evolving from a per-report point solution into a sticky,
                    multi-role SaaS intelligence platform — and the redesign was
                    the first concrete step in that shift.
                  </p>
                  <div className="mt-8">
                    <ArrowLink href="#">Read the full case study</ArrowLink>
                  </div>
                </div>
              }
              aside={<MetaList items={META_DEMO} />}
            />
          </Row>
        </Section>
      </Container>
    </main>
  );
}
