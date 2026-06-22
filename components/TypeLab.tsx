"use client";

/**
 * TYPE LAB — floating font-pairing switcher (local dev only).
 *
 * Repoints the two root type vars live, so every page (landing / About / case
 * studies) reflects the swap instantly. "Baseline" clears the override → falls
 * back to the locked Fraunces / Geist from globals.css. Persists to localStorage.
 *
 * Renders nothing in a production build. Throwaway — see app/fonts.experiment.ts.
 */
import { useEffect, useState } from "react";
import { EXPERIMENT_FONTS, type FontKind } from "@/lib/font-lab";

// Each kind may need to override MORE than one CSS var, because the site's
// Tailwind v4 utilities don't all read the same token:
//  - `.font-serif` reads --font-serif (Fraunces' own var), so display = that.
//  - `.font-sans` compiles to var(--font-geist-sans) (the @theme token inlines
//    `--font-sans: var(--font-geist-sans)`), while `body {}` and any literal
//    `var(--font-sans)` read --font-sans. Override BOTH so every body consumer
//    follows the swap.
//  - `.font-mono` (eyebrows / nav / labels) reads var(--font-geist-mono), same
//    pattern as sans — override both --font-geist-mono and --font-mono.
const TARGETS: Record<FontKind, string[]> = {
  display: ["--font-serif"],
  body: ["--font-geist-sans", "--font-sans"],
  label: ["--font-geist-mono", "--font-mono"],
};
const STORAGE_KEY: Record<FontKind, string> = {
  display: "fontlab.display",
  body: "fontlab.body",
  label: "fontlab.label",
};
const BASELINE = "__baseline__";

// Working pairing the lab opens on. Bump STORAGE_VERSION whenever these change
// so the new defaults override any previously-persisted selection on next load;
// manual changes after that still persist until the next version bump.
const DEFAULTS: Record<FontKind, string> = {
  display: "pangaia",
  body: "object",
  label: "supply-mono",
};
const STORAGE_VERSION = "2";
const VERSION_KEY = "fontlab.version";

function apply(kind: FontKind, id: string) {
  const root = document.documentElement;
  const targets = TARGETS[kind];
  if (id === BASELINE) {
    targets.forEach((t) => root.style.removeProperty(t));
    return;
  }
  const face = EXPERIMENT_FONTS.find((f) => f.id === id);
  if (face) targets.forEach((t) => root.style.setProperty(t, `var(${face.variable})`));
}

function Selector({
  kind,
  label,
  value,
  onChange,
}: {
  kind: FontKind;
  label: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const options = EXPERIMENT_FONTS.filter((f) => f.kind === kind);
  const baselineLabel =
    kind === "display"
      ? "Fraunces (current)"
      : kind === "body"
        ? "Geist (current)"
        : "Geist Mono (current)";
  return (
    <label className="flex items-center gap-2">
      <span className="w-14 text-[10px] uppercase tracking-[0.14em] opacity-60">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 rounded bg-black/5 px-2 py-1 text-[12px] outline-none"
      >
        <option value={BASELINE}>{baselineLabel}</option>
        {options.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const KINDS: FontKind[] = ["display", "body", "label"];

export default function TypeLab() {
  const [choice, setChoice] = useState<Record<FontKind, string>>(DEFAULTS);
  const [open, setOpen] = useState(true);

  // Restore persisted choices on mount; reset to DEFAULTS when the version bumps.
  useEffect(() => {
    if (localStorage.getItem(VERSION_KEY) !== STORAGE_VERSION) {
      for (const kind of KINDS) localStorage.setItem(STORAGE_KEY[kind], DEFAULTS[kind]);
      localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    }
    const restored = {} as Record<FontKind, string>;
    for (const kind of KINDS) {
      const id = localStorage.getItem(STORAGE_KEY[kind]) ?? DEFAULTS[kind];
      restored[kind] = id;
      apply(kind, id);
    }
    setChoice(restored);
  }, []);

  function update(kind: FontKind, id: string) {
    setChoice((c) => ({ ...c, [kind]: id }));
    localStorage.setItem(STORAGE_KEY[kind], id);
    apply(kind, id);
  }

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      className="fixed bottom-3 left-3 z-[9999] font-mono text-foreground"
      style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
    >
      {open ? (
        <div className="w-64 rounded-lg border border-black/10 bg-white/85 p-3 shadow-lg backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              Type Lab
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[11px] opacity-50 hover:opacity-100"
              aria-label="Collapse Type Lab"
            >
              ✕
            </button>
          </div>
          {EXPERIMENT_FONTS.length === 0 ? (
            <p className="text-[11px] leading-snug opacity-60">
              Drop variable .woff2 files into
              <code className="mx-1 rounded bg-black/5 px-1">
                assets/fonts/experiment/
              </code>
              then ask Claude to wire them.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <Selector kind="display" label="Display" value={choice.display} onChange={(id) => update("display", id)} />
              <Selector kind="body" label="Body" value={choice.body} onChange={(id) => update("body", id)} />
              <Selector kind="label" label="Labels" value={choice.label} onChange={(id) => update("label", id)} />
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg border border-black/10 bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] shadow-lg backdrop-blur hover:bg-white"
        >
          Type Lab
        </button>
      )}
    </div>
  );
}
