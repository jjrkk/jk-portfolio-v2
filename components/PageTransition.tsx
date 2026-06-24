"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Page-enter fade. Wraps inner page content (not the nav or <main> itself) so
 * the accent canvas is always instant — the surface is continuous — while the
 * content blooms in over it. Pure opacity: no y-translate, so sticky children
 * aren't affected by a transform on a parent. Reduced-motion → instant.
 */
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
