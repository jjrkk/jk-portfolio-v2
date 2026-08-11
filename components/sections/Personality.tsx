import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const PHOTOS: { src: string; alt: string; position?: string }[] = [
  { src: "/personality/talk.webp", alt: "Justin speaking at a design talk" },
  { src: "/personality/candid-2.jpg", alt: "Candid" },
  { src: "/personality/jk-whiteboard.webp", alt: "Justin sketching a product flow at the whiteboard" },
  {
    src: "/personality/justin-and-danica.webp",
    alt: "Justin and his wife Danica at a Blue Jays game",
    // Nudged left off dead-center so a stranger's head at the frame's right
    // edge crops out and the two of them sit more centered in the square.
    position: "44% center",
  },
];

export function Personality() {
  return (
    // Surface (white), matching LogoWall — the two bookend sections now
    // share the same base so the top/bottom CaseSectionOpener washes read
    // as true mirrors of each other instead of one popping (over white)
    // and the other going muddy (over a differently-tinted panel).
    <Section tone="surface">
      <Container>
        <Reveal>
          <Eyebrow>Off the clock</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl font-serif text-title text-foreground">
            Vinyl on the turntable, two opinionated cats, and an unreasonable
            love of crunchy autumn leaves.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {PHOTOS.map((p) => (
              <li
                key={p.src}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                  style={p.position ? { objectPosition: p.position } : undefined}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
