"use client";

import { useReducedMotion } from "framer-motion";

type LetterRevealProps = {
  lines: string[];
  /** Handwritten treatment for letters and apologies (spec §5). */
  variant?: "hand" | "body";
  className?: string;
  startDelay?: number;
};

/**
 * Paragraphs appear one after another rather than all at once (spec §19).
 * Reduced motion shows the whole letter immediately.
 */
export function LetterReveal({ lines, variant = "body", className = "", startDelay = 0 }: LetterRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`letter-reveal is-${variant} ${className}`.trim()}>
      {lines.map((line, index) => (
        <p
          key={line.slice(0, 24) + index}
          className={reduceMotion ? undefined : "reveal-line"}
          style={reduceMotion ? undefined : ({ "--reveal-delay": `${startDelay + index * 620}ms` } as React.CSSProperties)}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
