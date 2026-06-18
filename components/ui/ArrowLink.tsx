import Link from "next/link";
import { cn } from "@/lib/cn";

/** Parts-kit primitive (grammar #5): the all-caps arrow link. Internal links
 *  use next/link; external are detected and get safe rel/target; pass `onClick`
 *  (without an href) to render an action button instead. The arrow nudges on
 *  hover — restrained motion. */
export function ArrowLink({
  href,
  onClick,
  children,
  external,
  direction = "right",
  className,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  external?: boolean;
  direction?: "right" | "down";
  className?: string;
}) {
  const classes = cn(
    "group inline-flex cursor-pointer items-center gap-2 font-sans text-caption font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent",
    className,
  );
  const arrow = (
    <span
      aria-hidden
      className={cn(
        "transition-transform duration-300 ease-out",
        direction === "right"
          ? "group-hover:translate-x-1"
          : "group-hover:translate-y-1",
      )}
    >
      {direction === "right" ? "→" : "↓"}
    </span>
  );

  if (onClick && !href) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
        {arrow}
      </button>
    );
  }

  const isExternal = external ?? (!!href && /^https?:\/\//.test(href));
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href ?? "#"} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
