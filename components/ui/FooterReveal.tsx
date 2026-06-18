/**
 * Footer reveal — sticky underlay pattern.
 *
 * The footer sits at z-0, sticky to the viewport bottom. Everything above it
 * uses `relative z-[1]`, so the content renders on top of the footer and
 * scrolls away to progressively uncover it. The footer itself never moves;
 * the card above it "raises" off it as the user scrolls. No JS needed.
 */
export function FooterReveal({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 z-0">
      {children}
    </div>
  );
}
