/**
 * Footer reveal — full-viewport underlay.
 *
 * relative z-[2] ensures this layer paints over the sticky hero (z-[1]).
 * min-h-screen guarantees the wrapper is always viewport-tall, so the hero
 * can never extend past the wrapper's bottom edge and bleed through.
 * background: var(--accent) fills the transparent gap below the <Contact>
 * element with the same accent colour the contact footer uses, preventing
 * the hero from showing through that area.
 */
export function FooterReveal({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative z-[2] min-h-screen"
      style={{ background: "var(--accent)" }}
    >
      {children}
    </div>
  );
}
