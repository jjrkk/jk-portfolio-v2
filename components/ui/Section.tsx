import { cn } from "@/lib/cn";

/** Vertical rhythm wrapper for top-level page sections. Generous whitespace
 *  is part of the premium, calm feel (CLAUDE.md). */
export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("bg-background py-24 sm:py-32", className)} {...props}>
      {children}
    </section>
  );
}
