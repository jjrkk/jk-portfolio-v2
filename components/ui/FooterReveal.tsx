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
    // z-[1] matches the hero's z-index. With equal z-index, DOM order determines
    // painting order — the footer is last in the DOM so it renders on top of the
    // sticky hero when both are visible at the bottom of the page. Cream content
    // at z-[2] still covers both the hero and the footer as intended.
    <div className="sticky bottom-0 z-[1]">
      {children}
    </div>
  );
}
