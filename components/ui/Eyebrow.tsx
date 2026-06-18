import { cn } from "@/lib/cn";

/** Parts-kit primitive (grammar #5): the eyebrow label. All-caps mono, tracked
 *  out, with an optional short accent rule. Pairs above a title or a content
 *  block. Restraint is why it reads as expensive. */
export function Eyebrow({
  className,
  children,
  mark = true,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { mark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-eyebrow uppercase text-muted",
        className,
      )}
      {...props}
    >
      {mark && <span aria-hidden className="h-px w-6 shrink-0 bg-accent" />}
      {children}
    </span>
  );
}
