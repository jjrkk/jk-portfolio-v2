import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Client = { name: string; src: string; multiply?: boolean };

const CLIENTS: Client[] = [
  { name: "Future Fertility",         src: "/experience/logos/ff-wordmark.svg" },
  { name: "Synaptive Medical",        src: "/experience/logos/synaptive-logo.png" },
  { name: "Healthcare Human Factors", src: "/experience/logos/hhf-logo-blue.svg" },
  { name: "ExperiencePoint",          src: "/experience/logos/experiencepoint-logo.svg" },
  { name: "Accenture",               src: "/experience/logos/accenture-logo.svg" },
  { name: "Metrolinx",               src: "/experience/logos/metrolinx-logo.svg" },
  { name: "Ford",                    src: "/experience/logos/ford-logo.svg" },
  { name: "Medtronic",               src: "/experience/logos/medtronic-logo.svg" },
  { name: "TD",                      src: "/experience/logos/td-bank-logo.svg" },
  { name: "Movember",                src: "/experience/logos/movember-logo-black.jpg", multiply: true },
  { name: "UHN",                     src: "/experience/logos/UHN-logo.png" },
  { name: "Jeep",                    src: "/experience/logos/jeep-logo.svg" },
  { name: "Publicis Sapient",        src: "/experience/logos/publicis-sapient-logo.svg" },
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
          <ul className="mt-12 grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {CLIENTS.map((c) => (
              <li key={c.name} className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  className={cn(
                    "h-8 w-auto max-w-full object-contain",
                    "grayscale opacity-50 transition-all duration-500",
                    "hover:grayscale-0 hover:opacity-100",
                    c.multiply && "mix-blend-multiply",
                  )}
                />
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
