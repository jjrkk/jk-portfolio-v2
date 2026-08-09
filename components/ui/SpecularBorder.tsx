import { cn } from "@/lib/cn";

/** Luminous 1px edge — a gradient-border ring masked to show only the border
 *  itself. Drop into any `relative`-positioned, rounded container as an
 *  absolute overlay; pass `radius` to match the parent's own corner radius.
 *
 *  Two treatments:
 *  - Default (glass sheen): bright top-left, fading to a soft shadow
 *    bottom-right — reads as directional gloss on individual cards/images.
 *  - `uniform`: an even, bright white ring on all sides plus a soft outer
 *    glow, for a container whose whole silhouette needs to read crisply
 *    against the wall regardless of which edge you're looking at (the
 *    landing's page-card shell). */
export function SpecularBorder({
  radius = "rounded-[1rem]",
  uniform = false,
}: {
  radius?: string;
  uniform?: boolean;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[25]", radius)}
      style={
        uniform
          ? {
              border: "1px solid transparent",
              background: "rgba(255,255,255,0.7) border-box",
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
              boxShadow: "0 0 20px 0 rgba(255,255,255,0.4)",
            }
          : {
              border: "1px solid transparent",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.04) 45%, rgba(0,0,0,0.10) 100%) border-box",
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
            }
      }
    />
  );
}
