"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MemoryImage } from "../memories/MemoryImage";

type StageRevealProps = {
  stage: number;
  /** Node position in percent, used as the origin of the iris. */
  x: number;
  y: number;
  title: string;
  subtitle: string;
  onDone: () => void;
};

/**
 * Opens the stage by growing its photograph out of the node it belongs to,
 * instead of moving the whole map behind the viewport.
 */
export function StageReveal({ stage, x, y, title, subtitle, onDone }: StageRevealProps) {
  const reduceMotion = useReducedMotion();
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const timer = window.setTimeout(() => doneRef.current(), reduceMotion ? 260 : 1750);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <motion.div
      className="stage-reveal"
      initial={reduceMotion ? { opacity: 0 } : { clipPath: `circle(0% at ${x}% ${y}%)` }}
      animate={reduceMotion ? { opacity: 1 } : { clipPath: `circle(142% at ${x}% ${y}%)` }}
      transition={{ duration: reduceMotion ? 0.2 : 1.3, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* A slow push-in on the photograph itself, so the reveal feels like a camera move. */}
      <motion.div
        className="stage-reveal-media"
        initial={reduceMotion ? false : { scale: 1.22 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 2.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <MemoryImage stage={stage} photo={1} alt="" sizes="100vw" priority />
      </motion.div>

      <motion.div
        className="stage-reveal-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reduceMotion ? 0.2 : 0.9, delay: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>{subtitle}</p>
        <strong>{title}</strong>
      </motion.div>
    </motion.div>
  );
}
