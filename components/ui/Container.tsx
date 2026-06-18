import { cn } from "@/lib/cn";

/** Page-width wrapper. One source of truth for max-width + responsive gutters,
 *  so every section aligns to the same editorial measure. */
export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-(--container-page) px-6 sm:px-10 lg:px-16",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
