import { cn } from "@/lib/cn";

/** Parts-kit primitive (grammar #5): the two-column narrative/metadata block
 *  used in case studies — wide narrative on the left, a metadata aside on the
 *  right with an editorial gutter between. Stacks on small screens. */
export function TwoColumn({
  narrative,
  aside,
  className,
}: {
  narrative: React.ReactNode;
  aside: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16", className)}>
      <div className="lg:col-span-7">{narrative}</div>
      <aside className="lg:col-span-4 lg:col-start-9">{aside}</aside>
    </div>
  );
}
