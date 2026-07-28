"use client";

import { MemoryImage } from "./MemoryImage";

type MemoryGalleryProps = {
  stage: number;
  /** Photo indices to show, matching photo-NN.jpg in the stage folder. */
  photos: number[];
  label: string;
};

/** Horizontally swipeable strip on mobile, tidy grid on desktop (spec §24). */
export function MemoryGallery({ stage, photos, label }: MemoryGalleryProps) {
  return (
    <div className="memory-gallery" role="group" aria-label={label}>
      {photos.map((photo, index) => (
        <figure key={photo} className="memory-gallery-item" style={{ "--item-delay": `${index * 45}ms` } as React.CSSProperties}>
          <MemoryImage
            stage={stage}
            photo={photo}
            alt={`${label}, ảnh ${index + 1}`}
            sizes="(max-width: 767px) 62vw, 22vw"
          />
        </figure>
      ))}
    </div>
  );
}
