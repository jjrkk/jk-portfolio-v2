import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// DRAFT copy + interim photos (the cats/music shots from the old site aren't in
// the repo — swap in when available).
const PHOTOS = [
  { src: "/personality/talk.png", alt: "Justin speaking at a design talk" },
  { src: "/personality/jk-whiteboard.png", alt: "Justin sketching at the whiteboard" },
  { src: "/personality/candid-1.jpg", alt: "Candid" },
  { src: "/personality/candid-2.jpg", alt: "Candid" },
];

export function Personality() {
  return (
    <Section>
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
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
