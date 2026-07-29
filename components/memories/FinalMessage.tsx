"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { finalMessageLines } from "../../data/journey";
import { LetterReveal } from "./LetterReveal";

type FinalMessageProps = {
  onRestart: () => void;
};

/**
 * The closing letter. Paragraphs arrive one at a time and the final line plus the
 * replay button only appear once everything has been said.
 */
export function FinalMessage({ onRestart }: FinalMessageProps) {
  const reduceMotion = useReducedMotion();
  const [hasFinished, setHasFinished] = useState(reduceMotion ?? false);

  useEffect(() => {
    // Scheduling even the reduced-motion completion avoids a synchronous render cascade.
    const total = reduceMotion ? 0 : finalMessageLines.length * 620 + 900;
    const timer = window.setTimeout(() => setHasFinished(true), total);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <section className="final-message" aria-label="Lời chúc cuối">
      <div className="final-message-inner">
        <LetterReveal lines={finalMessageLines} className="final-message-lines" />

        {hasFinished && (
          <motion.div
            className="final-message-close"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="final-signature">Happy Birthday, Cún iuu-My love.</p>
            <button type="button" className="scene-cta" onClick={onRestart}>
              Xem lại hành trình của chúng ta
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
