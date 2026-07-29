"use client";

import { useCallback, useEffect, useRef } from "react";

export const STAGE_VIDEO_AUDIO_START = "journey:stage-video-audible";
export const STAGE_VIDEO_AUDIO_STOP = "journey:stage-video-silent";

function tellJourney(eventName: string) {
  window.dispatchEvent(new Event(eventName));
}

/** Plays a visible memory video and only ducks the background track while that video is truly audible. */
export function useStageVideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const syncAudio = useCallback(() => {
    const video = videoRef.current;
    if (video && !video.paused && !video.muted) {
      tellJourney(STAGE_VIDEO_AUDIO_START);
      return;
    }
    tellJourney(STAGE_VIDEO_AUDIO_STOP);
  }, []);

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    video?.pause();
    // Always emit the stop signal, including when an exiting scene already removed its video node.
    tellJourney(STAGE_VIDEO_AUDIO_STOP);
  }, []);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    try {
      await video.play();
      syncAudio();
    } catch {
      // If audible autoplay is blocked, play muted and immediately release the background music.
      video.muted = true;
      try {
        await video.play();
        tellJourney(STAGE_VIDEO_AUDIO_STOP);
      } catch {
        tellJourney(STAGE_VIDEO_AUDIO_STOP);
      }
    }
  }, [syncAudio]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.56) void playVideo();
        else stopVideo();
      },
      { threshold: [0, 0.56] },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      stopVideo();
    };
  }, [playVideo, stopVideo]);

  return {
    videoRef,
    onPlay: syncAudio,
    onPause: () => tellJourney(STAGE_VIDEO_AUDIO_STOP),
    onEnded: () => tellJourney(STAGE_VIDEO_AUDIO_STOP),
    onVolumeChange: syncAudio,
  };
}