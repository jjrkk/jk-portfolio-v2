"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Shared-element ("conduit") page transition.
 *
 * When you click a source element (a landing carousel card), its image is
 * captured into a fixed-position clone that survives the route change, then
 * FLIP-animates into the matching target element (the case-study hero) on the
 * destination page — so the image appears to *travel and expand* into place
 * rather than the page hard-cutting. Reinforces the "surface is continuous"
 * paradigm. Forward only for now; reduced-motion → plain navigation.
 *
 * Architecture: a persistent overlay lives in the root layout (outside the
 * route tree) so it isn't unmounted by navigation. Sources call useMorphBegin();
 * targets register via useMorphTarget(id) — matched by a shared id (the slug).
 */

type Rect = { top: number; left: number; width: number; height: number };
type Active = { id: string; src: string; from: Rect; fromRadius: number } | null;
type TargetInfo = { rect: Rect; radius: number } | null;

type Ctx = {
  active: Active;
  begin: (p: Active & object) => void;
  reportTarget: (id: string, rect: Rect, radius: number) => void;
  registerBackTrigger: (id: string, fn: (() => boolean) | null) => void;
  getBackTrigger: (id: string) => (() => boolean) | null;
};

const MorphCtx = createContext<Ctx | null>(null);

function useMorph() {
  return useContext(MorphCtx);
}

/** Source trigger. Returns a fn to start the morph + navigate. Falls back to
 *  plain router.push under reduced-motion or when no provider is mounted. */
export function useMorphBegin() {
  const ctx = useMorph();
  const router = useRouter();
  return useCallback(
    (p: { id: string; src: string; from: Rect; fromRadius: number; href: string }) => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!ctx || reduce) {
        router.push(p.href);
        return;
      }
      ctx.begin({ id: p.id, src: p.src, from: p.from, fromRadius: p.fromRadius });
      router.push(p.href);
    },
    [ctx, router],
  );
}

/** Target registration on the destination. Attach `ref` to the element the
 *  clone should land on; `hidden` is true while an inbound morph is in flight
 *  (so the clone covers the real element). No-op without a morphId / active morph.
 *
 *  Generic over element type so both a plain `motion.div` wrapper (case-study
 *  hero) and a carousel card's image wrapper can share this primitive.
 *
 *  Tracks the target's live position every frame for the whole morph (not once
 *  on mount) because a target isn't always settled when it mounts — the landing
 *  carousel's spring-positioned cards, in particular, are still moving into
 *  place for the first several frames after a reverse navigation. Two things
 *  matter for a clean landing:
 *   1. The FIRST measurement is deferred to rAF, never taken synchronously in
 *      this layout effect. Child effects run before parent effects, so a sync
 *      read here would capture the card BEFORE the carousel's own layout effect
 *      has jumped it to the destination slide — sending the clone toward a
 *      stale, far-off position (a visible mid-flight excursion). By rAF, the
 *      parent jump has committed.
 *   2. We keep re-reporting every frame (deduped — only when the rect actually
 *      moves) until the morph ends, so the clone always animates toward the
 *      card's CURRENT position and lands exactly where it finally rests. A
 *      fixed frame cap would freeze the target on a still-settling value and
 *      leave the clone to land a few px off, then snap ("up then drop"). */
export function useMorphTarget<T extends HTMLElement = HTMLDivElement>(morphId?: string) {
  const ctx = useMorph();
  const ref = useRef<T | null>(null);
  const active = ctx?.active ?? null;
  const reportTarget = ctx?.reportTarget; // stable (useCallback [] in provider)
  const isTarget = !!morphId && active?.id === morphId;

  useLayoutEffect(() => {
    if (!isTarget || !morphId || !reportTarget) return;
    let raf: ReturnType<typeof requestAnimationFrame>;
    let last: Rect | null = null;
    const measure = () => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        // Dedupe: only report (→ re-render + re-target the clone) when the card
        // has actually moved. Once it settles, the clone finishes its expo-out
        // to a stable target with no further interruptions.
        if (
          !last ||
          Math.abs(r.top - last.top) > 0.5 ||
          Math.abs(r.left - last.left) > 0.5 ||
          Math.abs(r.width - last.width) > 0.5 ||
          Math.abs(r.height - last.height) > 0.5
        ) {
          const radius =
            parseFloat(getComputedStyle(ref.current).borderTopLeftRadius) || 0;
          last = { top: r.top, left: r.left, width: r.width, height: r.height };
          reportTarget(morphId, last, radius);
        }
      }
      raf = requestAnimationFrame(measure);
    };
    // Deferred to rAF (not a sync call) so the parent carousel's scroll/spring
    // jump has committed first — see the note above. Cleanup cancels the loop
    // when the morph ends (isTarget → false).
    raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
    // Depend only on the trigger + the STABLE reportTarget — never the whole
    // ctx object (which is recreated each render → would loop).
  }, [isTarget, morphId, reportTarget]);

  return { ref, hidden: isTarget };
}

/** True while a morph (either direction) is in flight. For a component that
 *  might BOTH originate a morph and later be a valid landing target (the
 *  landing carousel cards, post reverse-conduit) — read this to know once a
 *  cycle has fully resolved (landed or safety-bailed) so target-eligibility
 *  can be retired and a later, unrelated click on the same element can't
 *  self-collide with its own in-flight morph (see WorkStage). */
export function useMorphActive(): boolean {
  const ctx = useMorph();
  return !!ctx?.active;
}

/** Registers a "can this element fly itself back to id's origin?" trigger
 *  (e.g. the case-study hero, keyed by its own slug) so a DIFFERENT component
 *  elsewhere in the tree (PageNav's back link) can attempt it without any
 *  direct prop-passing between them — both just need the shared id. Mirrors
 *  useMorphBegin/useMorphTarget's id-matching, one level up (trigger lookup
 *  rather than a live rect). */
export function useRegisterBackTrigger(id: string | undefined, fn: (() => boolean) | null) {
  const ctx = useMorph();
  const register = ctx?.registerBackTrigger;
  useLayoutEffect(() => {
    if (!id || !register) return;
    register(id, fn);
    return () => register(id, null);
  }, [id, register, fn]);
}

/** Looks up and calls the trigger registered for `id` (if any). Returns
 *  false — meaning "did not begin its own transition, navigate normally" —
 *  when nothing is registered (e.g. the About page, or a hero that's
 *  currently ineligible because it's scrolled/rotated too far). */
export function useMorphBackTrigger() {
  const ctx = useMorph();
  const getBackTrigger = ctx?.getBackTrigger;
  return useCallback(
    (id?: string) => {
      if (!id || !getBackTrigger) return false;
      const fn = getBackTrigger(id);
      return fn ? fn() : false;
    },
    [getBackTrigger],
  );
}

export function MorphProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Active>(null);
  const [target, setTarget] = useState<TargetInfo>(null);
  const bailTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Imperative registry, not state — a trigger being (un)registered shouldn't
  // itself cause a re-render; it's only ever read at click-time.
  const backTriggers = useRef<Map<string, () => boolean>>(new Map());

  const finish = useCallback(() => {
    if (bailTimer.current) clearTimeout(bailTimer.current);
    setActive(null);
    setTarget(null);
  }, []);

  const begin = useCallback<Ctx["begin"]>((p) => {
    setActive(p);
    setTarget(null);
    // Safety: if the destination has no matching target (e.g. an unbuilt route),
    // clear the clone rather than leaving it stranded.
    if (bailTimer.current) clearTimeout(bailTimer.current);
    bailTimer.current = setTimeout(() => {
      setActive(null);
      setTarget(null);
    }, 900);
  }, []);

  const reportTarget = useCallback<Ctx["reportTarget"]>((_id, rect, radius) => {
    if (bailTimer.current) clearTimeout(bailTimer.current);
    setTarget({ rect, radius });
  }, []);

  const registerBackTrigger = useCallback<Ctx["registerBackTrigger"]>((id, fn) => {
    if (fn) backTriggers.current.set(id, fn);
    else backTriggers.current.delete(id);
  }, []);

  const getBackTrigger = useCallback<Ctx["getBackTrigger"]>(
    (id) => backTriggers.current.get(id) ?? null,
    [],
  );

  const ctxValue = useMemo(
    () => ({ active, begin, reportTarget, registerBackTrigger, getBackTrigger }),
    [active, begin, reportTarget, registerBackTrigger, getBackTrigger],
  );

  return (
    <MorphCtx.Provider value={ctxValue}>
      {children}
      {active && (
        <motion.img
          key={active.id}
          src={active.src}
          alt=""
          aria-hidden
          className="pointer-events-none fixed z-[200] object-cover shadow-[0_40px_90px_-40px_rgba(0,0,0,0.5)]"
          initial={{
            top: active.from.top,
            left: active.from.left,
            width: active.from.width,
            height: active.from.height,
            borderRadius: active.fromRadius,
          }}
          animate={
            target
              ? {
                  top: target.rect.top,
                  left: target.rect.left,
                  width: target.rect.width,
                  height: target.rect.height,
                  borderRadius: target.radius,
                }
              : {
                  top: active.from.top,
                  left: active.from.left,
                  width: active.from.width,
                  height: active.from.height,
                  borderRadius: active.fromRadius,
                }
          }
          // Expo-out: travels fast then settles into place. Premium, not bouncy.
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => {
            if (target) finish();
          }}
        />
      )}
    </MorphCtx.Provider>
  );
}
