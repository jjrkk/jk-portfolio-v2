/**
 * Case-study section opener/closer — a restrained accent flourish washing
 * over the top or bottom edge of the cream content surface.
 *
 * Variant #2 (accent gradient ledge, overlay): the accent washes in from the
 * card's edge and dissolves toward the interior. Rendered as an ABSOLUTE
 * overlay so it takes no layout height — the wash co-exists with the content
 * at that edge (text shows through the faint tail) instead of pushing it.
 *
 * `position="top"` (default) mirrors the boundary above the card — e.g. the
 * wall-colored hero handing off into the cream. `position="bottom"` mirrors
 * the same idea in reverse, for the boundary where the cream hands back off
 * to a wall-colored surface below (e.g. About's card → Contact) — same color
 * logic, gradient direction and edge flipped, so the two bookend each other.
 *
 * Requires a `relative` parent. pointer-events-none so it never blocks the
 * content beneath. Accent-themed via `var(--accent)` by default — each
 * case-study page's own project color, unchanged; pass `color` to override
 * (About uses this to wash cool instead of brand fuchsia, matching the
 * landing intro's cool-card treatment). Static (a colour wash).
 *
 * Reusable: drop into the case-study template as the first (or last) child of
 * the cream wrapper; no per-project content needed.
 */
export function CaseSectionOpener({
  color = "var(--accent)",
  position = "top",
}: {
  color?: string;
  position?: "top" | "bottom";
}) {
  const isBottom = position === "bottom";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-10 h-[clamp(180px,26vh,340px)] ${
        isBottom ? "bottom-0" : "top-0"
      }`}
      style={{
        background: `linear-gradient(to ${isBottom ? "top" : "bottom"}, ${color}, transparent 100%)`,
        opacity: 0.16,
      }}
    />
  );
}
