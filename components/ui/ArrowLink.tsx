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
  const isExternal = external ?? (!!href && /^https?:\/\//.test(href));

  const arrow = isExternal ? (
    <svg
      aria-hidden
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M2.5 2.5H1C0.723858 2.5 0.5 2.72386 0.5 3V10C0.5 10.2761 0.723858 10.5 1 10.5H8C8.27614 10.5 8.5 10.2761 8.5 10V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M5.5 0.5H10.5M10.5 0.5V5.5M10.5 0.5L4.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
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
