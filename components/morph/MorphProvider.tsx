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
 *  (so the clone covers the real element). No-op without a morphId / active morph. */
export function useMorphTarget(morphId?: string) {
  const ctx = useMorph();
  const ref = useRef<HTMLDivElement | null>(null);
  const active = ctx?.active ?? null;
  const reportTarget = ctx?.reportTarget; // stable (useCallback [] in provider)
  const isTarget = !!morphId && active?.id === morphId;

  useLayoutEffect(() => {
    if (!isTarget || !morphId || !ref.current || !reportTarget) return;
    const r = ref.current.getBoundingClientRect();
    const radius =
      parseFloat(getComputedStyle(ref.current).borderTopLeftRadius) || 0;
    reportTarget(
      morphId,
      { top: r.top, left: r.left, width: r.width, height: r.height },
      radius,
    );
    // Depend only on the trigger + the STABLE reportTarget — never the whole
    // ctx object (which is recreated each render → would loop).
  }, [isTarget, morphId, reportTarget]);

  return { ref, hidden: isTarget };
}

export function MorphProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Active>(null);
  const [target, setTarget] = useState<TargetInfo>(null);
  const bailTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const ctxValue = useMemo(
    () => ({ active, begin, reportTarget }),
    [active, begin, reportTarget],
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
