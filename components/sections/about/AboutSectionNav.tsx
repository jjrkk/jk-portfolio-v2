"use client";

import { Container } from "@/components/ui/Container";
import { scrollToId } from "@/lib/scroll";

/** Nav labels are curated separately from each section's own Eyebrow text —
 *  they don't have to match 1:1 (e.g. "In their words" on the page reads as
 *  "Street cred" here). "Off the clock" and "Contact" are deliberately
 *  left out — asides/closing, not destinations worth a link. */
const LINKS = [
  { id: "process", label: "Process" },
  { id: "recommendations", label: "Street cred" },
  { id: "clients", label: "Clients & recognition" },
  { id: "at-work", label: "At work" },
  { id: "experience", label: "Experience" },
];

/**
 * A one-time jump-in nav, not a persistent sub-header — appears once,
 * directly under the hero, then scrolls away with the rest of the page like
 * everything else. This is a skim-once portfolio page, not a reference doc
 * people jump around in repeatedly, so a sticky scroll-spy nav would be more
 * chrome than the page needs (CLAUDE.md: don't over-build).
 *
 * Desktop only (lg:) — on mobile this competed with the hero right above it
 * for attention in a way that didn't earn its keep; the sections are still
 * reachable by scrolling, same as any other page.
 */
export function AboutSectionNav() {
  return (
    <nav aria-label="Jump to section" className="hidden lg:block">
      <Container>
        <ul
          className="flex items-center gap-x-6 overflow-x-auto py-7 font-mono text-eyebrow uppercase tracking-[0.12em] text-muted [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {LINKS.map((l, i) => (
            <li key={l.id} className="flex shrink-0 items-center gap-x-6">
              {i > 0 && (
                <span aria-hidden className="text-faint">
                  ·
                </span>
              )}
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(l.id);
                }}
                className="whitespace-nowrap transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
