/**
 * TYPE LAB — pure registry data (safe for client + server).
 *
 * Kept free of `next/font` imports on purpose: the <TypeLab> switcher is a
 * client component, and next/font/local may only be evaluated in server
 * components. So the font DECLARATIONS live in app/fonts.experiment.ts (server),
 * and this file holds just the plain list both sides share. The `variable`
 * strings here must match the declarations there.
 *
 * ⚠️  THROWAWAY: delete with the rest of the Type Lab once a pairing is chosen.
 */
export type FontKind = "display" | "body" | "label";

export interface FontCandidate {
  id: string; // stable key (localStorage + dropdown value)
  label: string; // shown in the switcher
  kind: FontKind; // which dropdown it belongs to
  variable: string; // the CSS var its className defines
}

export const EXPERIMENT_FONTS: FontCandidate[] = [
  { id: "editorial", label: "Editorial Old", kind: "display", variable: "--font-editorial" },
  { id: "fragment", label: "Fragment (Serif)", kind: "display", variable: "--font-fragment" },
  { id: "woodland", label: "Woodland", kind: "display", variable: "--font-woodland" },
  { id: "pangaia", label: "Pangaia", kind: "display", variable: "--font-pangaia" },
  { id: "hatton", label: "Hatton", kind: "display", variable: "--font-hatton" },
  { id: "neue-york", label: "Neue York", kind: "display", variable: "--font-neue-york" },
  { id: "palma", label: "Palma", kind: "display", variable: "--font-palma" },
  { id: "object", label: "Object Sans", kind: "body", variable: "--font-object" },
  { id: "montreal", label: "Neue Montreal", kind: "body", variable: "--font-montreal" },
  { id: "montreal-mono", label: "Neue Montreal Mono", kind: "label", variable: "--font-montreal-mono" },
  { id: "fraktion-mono", label: "Fraktion Mono", kind: "label", variable: "--font-fraktion-mono" },
  { id: "supply-mono", label: "Supply Mono", kind: "label", variable: "--font-supply-mono" },
  { id: "model-mono", label: "Model Mono", kind: "label", variable: "--font-model-mono" },
];
