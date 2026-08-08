import { cn } from "@/lib/cn";

/** Luminous 1px edge — a gradient-border ring (bright top-left, fading to a
 *  soft shadow bottom-right) masked to show only the border itself. Drop into
 *  any `relative`-positioned, rounded container as an absolute overlay; pass
 *  `radius` to match the parent's own corner radius. */
export function SpecularBorder({ radius = "rounded-[1rem]" }: { radius?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[25]", radius)}
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.04) 45%, rgba(0,0,0,0.10) 100%) border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "destination-out",
        maskComposite: "exclude",
      }}
    />
  );
}
