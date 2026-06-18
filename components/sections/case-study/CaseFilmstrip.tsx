"use client";

export type FilmstripImage = { src: string; alt: string };

/**
 * Auto-scrolling horizontal filmstrip — sits between Impact and the Next panel
 * as a cinematic outro. Shows the full breadth of product shots at a relaxed
 * pace; pauses on hover so the reader can linger on a detail.
 *
 * Images are duplicated so the CSS marquee loops seamlessly.
 */
export function CaseFilmstrip({ images }: { images: FilmstripImage[] }) {
  const doubled = [...images, ...images];

  return (
    <section className="overflow-hidden bg-background py-16 sm:py-20">
      <div
        className="flex items-center gap-4 sm:gap-5"
        style={{
          width: "max-content",
          animation: "case-filmstrip 60s linear infinite",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        {doubled.map((img, i) => (
          <div key={i} className="h-[260px] flex-none sm:h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-auto rounded-xl shadow-[0_4px_28px_-4px_rgba(21,19,15,0.13)]"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
