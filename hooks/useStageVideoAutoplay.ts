"use client";

import { useCallback, useEffect, useRef } from "react";

export const STAGE_VIDEO_AUDIO_START = "journey:stage-video-audible";
export const STAGE_VIDEO_AUDIO_STOP = "journey:stage-video-silent";

function tellJourney(eventName: string) {
  window.dispatchEvent(new Event(eventName));
}

/** Plays a visible memory video and coordinates its sound with the background track. */
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
    if (!video) return;
    video.pause();
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
      // A browser may refuse unmuted autoplay until a user gesture. In that
      // case the memory still starts muted and the background track keeps playing.
      video.muted = true;
      try {
        await video.play();
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
        if (entry.isIntersecting && entry.intersectionRatio >= 0.56) {
          void playVideo();
        } else {
          stopVideo();
        }
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