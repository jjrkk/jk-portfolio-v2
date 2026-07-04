"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Cycles through `words` on a timer, crossfading with a soft blur + vertical
 *  drift (matches the easing Reveal/PageTransition already use). Reduced-motion
 *  freezes on the first word — no interval, no animation. */
export function RotatingWord({
  words,
  intervalMs = 3800,
  className,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduce, words, intervalMs]);

  if (reduce) {
    return <span className={cn("italic", className)}>{words[0]}</span>;
  }

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block italic"
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
