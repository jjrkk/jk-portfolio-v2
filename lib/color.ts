/** Linear-interpolate two #rrggbb hex colors. t in [0,1]. */
export function hexLerp(a: string, b: string, t: number): string {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * t);
  const r = mix(pa[0], pb[0]);
  const g = mix(pa[1], pb[1]);
  const bl = mix(pa[2], pb[2]);
  return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
