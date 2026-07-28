"use client";

import Image from "next/image";
import { useState } from "react";
import { stageArtwork } from "../../data/journey";

type MemoryExtension = "jpg" | "jpeg" | "png" | "webp" | "avif";

const memoryExtensionByStage: Partial<Record<number, MemoryExtension>> = { 7: "png" };

type MemoryImageProps = {
  /** Which stage folder to read from: /memories/stage-{stage}/photo-NN.jpg */
  stage: number;
  photo: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  extension?: MemoryExtension;
};

/**
 * A photo slot that degrades gracefully. Until a real picture is dropped into
 * /public/memories, the stage artwork stands in so the layout never breaks.
 */
export function MemoryImage({ stage, photo, alt, className = "", sizes = "(max-width: 767px) 60vw, 28vw", priority = false, extension = memoryExtensionByStage[stage] ?? "jpg" }: MemoryImageProps) {
  const [useArtwork, setUseArtwork] = useState(false);
  const source = useArtwork
    ? stageArtwork[stage]
    : `/memories/stage-${stage}/photo-${String(photo).padStart(2, "0")}.${extension}`;

  return (
    <span className={`memory-image ${useArtwork ? "is-placeholder" : ""} ${className}`.trim()}>
      <Image src={source} alt={alt} fill sizes={sizes} priority={priority} onError={() => setUseArtwork(true)} />
      {useArtwork && <span className="memory-image-hint" aria-hidden="true">Ảnh sẽ được thêm vào đây</span>}
    </span>
  );
}
