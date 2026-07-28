"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { finalVideoSrc } from "../../data/journey";
import { MemoryVideo } from "./MemoryVideo";

type FinalVideoProps = {
  /** Called after the video finishes (or is skipped) so the letter can appear. */
  onFinished: () => void;
  /** Duck the background music while the recording plays (spec §18). */
  onPlayStateChange: (isPlaying: boolean) => void;
};

/**
 * The video never autoplays. Once it is playing the surrounding controls step back
 * and nothing navigates away on its own.
 */
export function FinalVideo({ onFinished, onPlayStateChange }: FinalVideoProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  function startVideo() {
    setHasStarted(true);
    onPlayStateChange(true);
    // Give the element a frame to mount before asking it to play.
    requestAnimationFrame(() => {
      wrapperRef.current?.querySelector("video")?.play().catch(() => undefined);
    });
  }

  function handleEnded() {
    onPlayStateChange(false);
    // Hold on the last frame briefly before the letter takes over (spec §18).
    window.setTimeout(onFinished, 800);
  }

  return (
    <div className={`final-video${hasStarted ? " is-playing" : ""}`}>
      {!hasStarted ? (
        <motion.div
          className="final-video-invite"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="scene-eyebrow">Món quà của anh</p>
          <h2 className="scene-title">Có vài điều anh muốn tự mình nói với em.</h2>
          <button type="button" className="scene-cta" onClick={startVideo}>
            Xem video
          </button>
        </motion.div>
      ) : (
        <motion.div
          ref={wrapperRef}
          className="final-video-frame"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.15 : 1, ease: [0.22, 1, 0.36, 1] }}
          onEnded={handleEnded}
        >
          <MemoryVideo stage={8} src={finalVideoSrc} className="final-video-player" />
          <button type="button" className="final-video-skip" onClick={handleEnded}>
            Đọc lời chúc cuối
          </button>
        </motion.div>
      )}
    </div>
  );
}
