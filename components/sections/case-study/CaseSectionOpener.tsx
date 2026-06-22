/**
 * Case-study section opener — a restrained accent flourish over the top of the
 * cream content surface.
 *
 * Variant #2 (accent gradient ledge, overlay): the project accent washes down
 * from the top of the cream and dissolves into it. Rendered as an ABSOLUTE
 * overlay so it takes no layout height — the wash co-exists with the top of the
 * overview (text shows through the faint tail) instead of pushing content down.
 *
 * Requires a `relative` parent. pointer-events-none so it never blocks the
 * content beneath. Accent-themed via `var(--accent)`; static (a colour wash).
 *
 * Reusable: drop into the case-study template as the first child of the cream
 * wrapper; no per-project content needed.
 */
export function CaseSectionOpener() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(180px,26vh,340px)]"
      style={{
        background: "linear-gradient(to bottom, var(--accent), transparent 100%)",
        opacity: 0.16,
      }}
    />
  );
}
