import { cn } from "@/lib/cn";

const TONE_BG = {
  default: "bg-background",
  tinted:  "bg-[var(--background-tinted)]",
  surface: "bg-surface",
} as const;

/** Vertical rhythm wrapper for top-level page sections. Generous whitespace
 *  is part of the premium, calm feel (CLAUDE.md).
 *
 *  `tone` controls the section background:
 *  - "default"  → bg-background (warm off-white, the base canvas)
 *  - "tinted"   → bg-[--background-tinted] (one step darker, adds rhythm)
 *  - "surface"  → bg-surface (white, makes imagery/logos pop)
 */
export function Section({
  className,
  children,
  tone = "default",
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: keyof typeof TONE_BG }) {
  return (
    <section className={cn(TONE_BG[tone], "py-24 sm:py-32", className)} {...props}>
      {children}
    </section>
  );
}
