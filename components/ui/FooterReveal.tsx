/**
 * Footer reveal — sticky underlay pattern.
 *
 * The footer sits at z-0, sticky to the viewport bottom. The content above it
 * (wrapped at a higher z-index by the page) renders on top and scrolls away to
 * progressively uncover the footer. The footer never moves; the content above
 * "raises" off it as the user scrolls. No JS needed.
 *
 * IMPORTANT: any persistent `sticky top-0` hero above this must be bounded by a
 * sized wrapper (not left sticky for the whole page), or it will stay pinned at
 * the top and bleed over this footer at the bottom. The landing carousel and the
 * case-study template both bound their sticky hero for exactly this reason.
 */
export function FooterReveal({ children }: { children: React.ReactNode }) {
  return <div className="sticky bottom-0 z-0">{children}</div>;
}
