"use client";

import { motion, useReducedMotion } from "framer-motion";
import { finalVideoSrc } from "../../data/journey";
import { MemoryVideo } from "./MemoryVideo";

type FinalVideoProps = {
  /** Called after the video finishes (or is skipped) so the letter can appear. */
  onFinished: () => void;
  /** Duck the background music while the recording plays (spec §18). */
  onPlayStateChange: (isPlaying: boolean) => void;
};

/** The preceding gift CTA is the user gesture; the recording starts as soon as this view opens. */
export function FinalVideo({ onFinished, onPlayStateChange }: FinalVideoProps) {
  const reduceMotion = useReducedMotion();

  function handleEnded() {
    onPlayStateChange(false);
    // Hold on the last frame briefly before the letter takes over (spec §18).
    window.setTimeout(onFinished, 800);
  }

  return (
    <div className="final-video is-playing">
      <motion.div
        className="final-video-frame"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.15 : 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <MemoryVideo
          stage={8}
          src={finalVideoSrc}
          className="final-video-player"
          onPlay={() => onPlayStateChange(true)}
          onPause={() => onPlayStateChange(false)}
          onEnded={handleEnded}
        />
        <button type="button" className="final-video-skip" onClick={handleEnded}>
          Đọc lời chúc cuối
        </button>
      </motion.div>
    </div>
  );
}