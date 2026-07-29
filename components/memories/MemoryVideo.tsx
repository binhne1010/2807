"use client";

import Image from "next/image";
import { useState, type ComponentPropsWithoutRef } from "react";
import { stageArtwork } from "../../data/journey";
import { StageVideoPlayer } from "./StageVideoPlayer";

type MemoryVideoProps = {
  stage: number;
  className?: string;
  /** Explicit source overrides the per-stage convention (used by the final video). */
  src?: string;
  poster?: string;
  onPlay?: ComponentPropsWithoutRef<"video">["onPlay"];
  onPause?: ComponentPropsWithoutRef<"video">["onPause"];
  onEnded?: ComponentPropsWithoutRef<"video">["onEnded"];
};

/** A memory video starts as it enters view and hands sound back to the journey music when it leaves. */
export function MemoryVideo({ stage, className = "", src, poster, onPlay, onPause, onEnded }: MemoryVideoProps) {
  const [unavailable, setUnavailable] = useState(false);
  const artwork = poster ?? stageArtwork[stage] ?? stageArtwork[1];
  const source = src ?? `/memories/stage-${stage}/video-01.mp4`;

  if (unavailable) {
    return (
      <div className={`memory-video-empty ${className}`.trim()}>
        <Image src={artwork} alt="Khung chờ video kỷ niệm" fill sizes="(max-width: 767px) 92vw, 60vw" />
        <p>Video của hai người sẽ xuất hiện ở đây.</p>
      </div>
    );
  }

  return (
    <StageVideoPlayer
      className={`memory-video ${className}`.trim()}
      poster={artwork}
      source={source}
      onError={() => setUnavailable(true)}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
    >
      Trình duyệt này không hỗ trợ phát video.
    </StageVideoPlayer>
  );
}