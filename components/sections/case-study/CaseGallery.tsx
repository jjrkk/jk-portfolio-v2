import { Reveal } from "@/components/ui/Reveal";
import type { CaseGalleryItem } from "@/lib/case-studies";

/**
 * A 2-column image grid — lets the work breathe visually between the narrative
 * beats and the Judgment section. Same white-card treatment as CaseFigure but
 * side-by-side, suited to individual product / detail shots.
 *
 * Sits between body beats and Judgment in CaseStudyTemplate. Only renders when
 * study.gallery is present and non-empty.
 */
export function CaseGallery({
  items,
  columns = 2,
}: {
  items: CaseGalleryItem[];
  columns?: 2 | 3;
}) {
  const gridCols =
    columns === 3
      ? "grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
      : "grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6";

  return (
    <section className="bg-background pb-16 pt-4 sm:pb-20 sm:pt-6">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className={`grid ${gridCols}`}>
          {items.map((item, i) => (
            <Reveal key={i} delay={0.06 * i} className={item.colSpan2 ? "sm:col-span-2" : undefined}>
              <figure className={item.colSpan2 ? "sm:max-w-[50%] sm:mx-auto" : undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full rounded-xl shadow-[0_4px_32px_-4px_rgba(21,19,15,0.16)]"
                />
                {item.caption && (
                  <figcaption className="mt-3 font-sans text-caption text-faint">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
