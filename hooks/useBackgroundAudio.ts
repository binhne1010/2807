"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FULL_VOLUME = 0.32;
const DUCKED_VOLUME = 0.05;

/** Linear volume ramp, used for both crossfades and ducking. */
function fadeTo(audio: HTMLAudioElement, target: number, duration: number, onDone?: () => void) {
  const from = audio.volume;
  const start = performance.now();

  function step(now: number) {
    const progress = Math.min(1, (now - start) / duration);
    audio.volume = Math.max(0, Math.min(1, from + (target - from) * progress));
    if (progress < 1) requestAnimationFrame(step);
    else onDone?.();
  }

  requestAnimationFrame(step);
}

/**
 * One track at a time, swapped per stage with a crossfade.
 * Nothing plays until the journey has been started by the user (spec §23).
 */
export function useBackgroundAudio(src: string | null, shouldPlay: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const isEnabledRef = useRef(false);
  isEnabledRef.current = isEnabled;

  // The user's start gesture enables sound; after that each stage swaps its track.
  useEffect(() => {
    if (shouldPlay) setIsEnabled(true);
  }, [shouldPlay]);

  useEffect(() => {
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;
    audio.loop = true;
    audio.preload = "auto";

    if (!src || !isEnabled) {
      audio.pause();
      return;
    }

    const nextSrc = new URL(src, window.location.origin).href;

    const startTrack = () => {
      audio.src = nextSrc;
      audio.volume = 0;
      // A missing file must never break the journey — it simply stays silent.
      void audio
        .play()
        .then(() => fadeTo(audio, FULL_VOLUME, 900))
        .catch(() => undefined);
    };

    if (audio.src && audio.src !== nextSrc && !audio.paused) {
      fadeTo(audio, 0, 600, startTrack);
    } else if (audio.src !== nextSrc) {
      startTrack();
    } else if (audio.paused) {
      void audio.play().then(() => fadeTo(audio, FULL_VOLUME, 700)).catch(() => undefined);
    }
  }, [src, isEnabled]);

  // Never play into an empty room.
  useEffect(() => {
    function handleVisibility() {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) audio.pause();
      else if (isEnabledRef.current && audio.src) void audio.play().catch(() => undefined);
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(() => {
    setIsEnabled((current) => !current);
  }, []);

  /** Fade down while the birthday video speaks (spec §18). */
  const duck = useCallback((shouldDuck: boolean) => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    fadeTo(audio, shouldDuck ? DUCKED_VOLUME : FULL_VOLUME, 800);
  }, []);

  return { isEnabled, toggle, duck };
}
