"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SceneTransitionProps = {
  /** Cinematic entries are used when moving into a stage; soft ones for the map. */
  variant?: "stage" | "map";
  children: ReactNode;
};

/**
 * Shared enter/exit treatment so every scene change feels like the same camera
 * rather than eight different animations.
 */
export function SceneTransition({ variant = "stage", children }: SceneTransitionProps) {
  const reduceMotion = useReducedMotion();
  const enterScale = variant === "map" ? 1.06 : 1.035;

  return (
    <motion.div
      className="scene-layer"
      initial={reduceMotion ? false : { opacity: 0, scale: enterScale, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, filter: "blur(6px)" }}
      transition={{ duration: reduceMotion ? 0.2 : 1.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
