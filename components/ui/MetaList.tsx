import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

export type MetaItem = { label: string; value: React.ReactNode };

/** Parts-kit primitive: the case-study metadata list — the existing meta-row
 *  (Role / Users / Methods / Subject / Timeframe) relaid out vertically as a
 *  semantic <dl>, each row separated by a hairline rule. Lives in the aside of
 *  a <TwoColumn>. */
export function MetaList({
  items,
  className,
}: {
  items: MetaItem[];
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <div key={item.label} className="border-t border-border py-4 first:border-t-0 first:pt-0">
          <dt>
            <Eyebrow mark={false} className="text-faint">
              {item.label}
            </Eyebrow>
          </dt>
          <dd className="mt-2 font-sans text-body text-foreground">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
