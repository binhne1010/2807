"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_ID = "jB5XcRnTuK0";
const PLAYER_ORIGIN = "https://www.youtube.com";

/** Sent from an explicit user gesture so YouTube may unmute under browser autoplay rules. */
export const BACKGROUND_MUSIC_REQUEST = "journey:request-background-music";
export const BACKGROUND_MUSIC_STOP = "journey:stop-background-music";

type YouTubeBackgroundMusicProps = {
  isEnabled: boolean;
  isSuspended: boolean;
};

export function YouTubeBackgroundMusic({ isEnabled, isSuspended }: YouTubeBackgroundMusicProps) {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);

  const sendCommand = useCallback((func: string, args: unknown[] = []) => {
    playerRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      PLAYER_ORIGIN,
    );
  }, []);

  const playWithSound = useCallback(() => {
    if (!isReady) return;
    sendCommand("setVolume", [32]);
    sendCommand("unMute");
    sendCommand("playVideo");
  }, [isReady, sendCommand]);

  const pauseAndMute = useCallback(() => {
    if (!isReady) return;
    sendCommand("pauseVideo");
    sendCommand("mute");
  }, [isReady, sendCommand]);

  useEffect(() => {
    function handlePlayerMessage(event: MessageEvent) {
      if (event.origin !== PLAYER_ORIGIN || event.source !== playerRef.current?.contentWindow) return;

      try {
        const message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (message?.event === "onReady") setIsReady(true);
      } catch {
        // Ignore unrelated postMessage traffic.
      }
    }

    window.addEventListener("message", handlePlayerMessage);
    return () => window.removeEventListener("message", handlePlayerMessage);
  }, []);

  useEffect(() => {
    const requestMusic = () => playWithSound();
    const stopMusic = () => pauseAndMute();
    window.addEventListener(BACKGROUND_MUSIC_REQUEST, requestMusic);
    window.addEventListener(BACKGROUND_MUSIC_STOP, stopMusic);
    return () => {
      window.removeEventListener(BACKGROUND_MUSIC_REQUEST, requestMusic);
      window.removeEventListener(BACKGROUND_MUSIC_STOP, stopMusic);
    };
  }, [pauseAndMute, playWithSound]);

  useEffect(() => {
    if (!isReady) return;
    if (isEnabled && !isSuspended) {
      playWithSound();
      return;
    }
    pauseAndMute();
  }, [isEnabled, isReady, isSuspended, pauseAndMute, playWithSound]);

  return (
    <iframe
      ref={playerRef}
      title="Nhạc nền Nơi này có anh"
      src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=0&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1&rel=0&enablejsapi=1`}
      allow="autoplay; encrypted-media"
      onLoad={() => window.setTimeout(() => setIsReady(true), 650)}
      tabIndex={-1}
      aria-hidden="true"
      style={{ position: "fixed", width: 200, height: 200, right: -240, bottom: -240, border: 0, opacity: 0, pointerEvents: "none" }}
    />
  );
}