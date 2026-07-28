"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useStageVideoAutoplay } from "../../hooks/useStageVideoAutoplay";

type StageVideoPlayerProps = Omit<ComponentPropsWithoutRef<"video">, "children"> & {
  source: string;
  children?: ReactNode;
};

export function StageVideoPlayer({ source, children, controls = true, playsInline = true, preload = "metadata", onPlay, onPause, onEnded, onVolumeChange, ...props }: StageVideoPlayerProps) {
  const { videoRef, onPlay: syncOnPlay, onPause: syncOnPause, onEnded: syncOnEnded, onVolumeChange: syncOnVolumeChange } = useStageVideoAutoplay();

  return (
    <video
      {...props}
      ref={videoRef}
      controls={controls}
      playsInline={playsInline}
      preload={preload}
      onPlay={(event) => { syncOnPlay(); onPlay?.(event); }}
      onPause={(event) => { syncOnPause(); onPause?.(event); }}
      onEnded={(event) => { syncOnEnded(); onEnded?.(event); }}
      onVolumeChange={(event) => { syncOnVolumeChange(); onVolumeChange?.(event); }}
    >
      <source src={source} type="video/mp4" />
      {children}
    </video>
  );
}