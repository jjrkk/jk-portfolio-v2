import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// Typographic interim (no logo SVGs in the repo yet). Swap each name for a
// brand wordmark SVG when Justin exports them. Names are from the prior site's
// logo wall — DRAFT, confirm before launch.
const CLIENTS = [
  "Future Fertility",
  "Synaptive Medical",
  "Metrolinx",
  "ExperiencePoint",
  "Accenture",
  "Ford",
  "Medtronic",
  "TD",
  "Movember",
  "UHN",
  "Jeep",
  "Publicis Sapient",
];

const RECOGNITION = [
  "ADPList Mentor",
  "Service Design Network — speaker",
  "Certified — AI in the UX Design Process",
];

export function LogoWall() {
  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <Eyebrow>Selected clients &amp; employers</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-12 grid grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
            {CLIENTS.map((c) => (
              <li
                key={c}
                className="font-serif text-heading text-foreground/70"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-border pt-10">
            <Eyebrow mark={false} className="text-faint">
              Recognition
            </Eyebrow>
            <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
              {RECOGNITION.map((r) => (
                <li key={r} className="font-sans text-body text-muted">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
