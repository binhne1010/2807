"use client";

import Image from "next/image";
import { Heart, Sparkle } from "@phosphor-icons/react";
import { useState } from "react";
import { MemoryModal } from "../memories/MemoryModal";
import { StageVideoPlayer } from "../memories/StageVideoPlayer";

type SummerSceneProps = {
  onReturnToMap: () => void;
  onComplete: () => void;
};

type SummerMoment = {
  id: string;
  title: string;
  description: string;
  photo: number;
  kind: "image" | "video";
  fallback: string;
};

const summerMoments: SummerMoment[] = [
  { id: "cinema", title: "AEON và bọn mình", description: "làm trò con bò chụp ảnh cùng nhau khi ra về", photo: 1, kind: "video", fallback: "/images/memory-birthday-film.png" },
  { id: "bench", title: "Ghế đá", description: "Sân vận động - valentine, anh tặng món quà cất công chuẩn bị cho người mình yêu nhất", photo: 2, kind: "image", fallback: "/images/memory-flower-field-film.png" },
  { id: "food", title: "cắt tóc đi villa", description: "Ẻm muốn cắt tóc đi villa, anh dẫn em đi cắt để có ảnh đẹp về khoe anh", photo: 3, kind: "image", fallback: "/images/memory-birthday-film.png" },
  { id: "camera", title: "đáng yêu", description: "Chụp trộm vì quá dễ thương với chiếc bờm", photo: 4, kind: "image", fallback: "/images/memory-flower-field-film.png" },
  { id: "ice-cream", title: "Cây kem xinh nhất", description: "Xinh nhất khi mặc bộ quần áo anh chọn cho bé =", photo: 5, kind: "image", fallback: "/images/memory-moc-chau-film.png" },
  { id: "stroll", title: "Ăn tối cùng nhau", description: "Đi ăn đồ hàn cùng nhau chụp được dầy ảnh siêu đẹp và đáng yêu", photo: 6, kind: "image", fallback: "/images/memory-flower-field-film.png" },
  { id: "cafe", title: "Hợp tác với anh", description: "Nũng nịu đáng yêu với anh khi anh muốn Cún tạo dáng đáng yêu", photo: 7, kind: "image", fallback: "/images/memory-birthday-film.png" },
  { id: "sunset", title: "photobooth", description: "Khoảnh khắc bức ảnh kỉ niệm đẹp nhất ra đời", photo: 8, kind: "image", fallback: "/images/memory-moc-chau-film.png" },
];

function SummerImage({ moment, className = "", sizes = "(max-width: 767px) 30vw, 19vw" }: { moment: SummerMoment; className?: string; sizes?: string }) {
  const [fallback, setFallback] = useState(false);

  return (
    <Image
      className={className}
      src={fallback ? moment.fallback : `/memories/stage-2/photo-${String(moment.photo).padStart(2, "0")}.jpg`}
      alt={fallback ? moment.title : `Ảnh kỷ niệm ${moment.title.toLowerCase()}`}
      fill
      sizes={sizes}
      onError={() => setFallback(true)}
    />
  );
}

function SummerVideo({ moment }: { moment: SummerMoment }) {
  const [fallback, setFallback] = useState(false);

  if (fallback) {
    return <SummerImage moment={moment} className="summer-panel-fallback" />;
  }

  return (
    <StageVideoPlayer
      className="summer-video"
      poster={moment.fallback}
      source="/memories/stage-2/video-01.mp4"
      onError={() => setFallback(true)}
    >
      Trình duyệt này không hỗ trợ phát video.
    </StageVideoPlayer>
  );
}
export function SummerScene({ onReturnToMap, onComplete }: SummerSceneProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeMoment = summerMoments.find((moment) => moment.id === activeId) ?? null;

  return (
    <section className="summer-scene" aria-label="Mùa hè bình yên">
      <Image className="summer-background" src="/images/memory-flower-field-film.png" alt="Không gian mùa hè đầy nắng" fill priority sizes="100vw" />
      <div className="summer-scrim" aria-hidden="true" />
      <div className="summer-sun" aria-hidden="true" />
      <div className="summer-clouds" aria-hidden="true"><span /><span /><span /></div>
      <div className="summer-leaves" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="summer-love-atmosphere" aria-hidden="true">
        <Heart className="summer-love-icon love-heart-one" weight="fill" />
        <Heart className="summer-love-icon love-heart-two" weight="fill" />
        <Heart className="summer-love-icon love-heart-three" weight="fill" />
        <Heart className="summer-love-icon love-heart-four" weight="fill" />
        <Sparkle className="summer-love-icon love-spark-one" weight="fill" />
        <Sparkle className="summer-love-icon love-spark-two" weight="fill" />
        <Sparkle className="summer-love-icon love-spark-three" weight="fill" />
      </div>

      <button type="button" className="summer-back" onClick={onReturnToMap}>Quay lại bản đồ</button>

      <header className="summer-heading">
        <p>Mùa hè bình yên</p>
        <h1>Những ngày rất đỗi bình thường</h1>
        <span>Đi chơi, xem phim, ăn một món ngon và dành thời gian ở cạnh nhau.</span>
      </header>

      <div className="summer-memory-map" aria-label="Những điểm dừng của mùa hè">
        {summerMoments.map((moment) => (
          <button
            key={moment.id}
            type="button"
            className={`summer-moment summer-${moment.id}${activeId === moment.id ? " is-active" : ""}`}
            onClick={() => setActiveId(moment.id)}
            aria-label={`Mở kỷ niệm ${moment.title}`}
            aria-pressed={activeId === moment.id}
          >
            <SummerImage moment={moment} />
            <span>{moment.title}</span>
          </button>
        ))}
      </div>

      {/* One shared centred modal, the same pattern every other stage uses. */}
      <MemoryModal
        isOpen={activeMoment !== null}
        onClose={() => setActiveId(null)}
        eyebrow={activeMoment?.title}
        title={activeMoment?.description ?? ""}
        tone="tone-summer"
      >
        <div className="summer-panel-media">
          {activeMoment?.kind === "video" ? (
            <SummerVideo moment={activeMoment} />
          ) : (
            activeMoment && <SummerImage moment={activeMoment} sizes="(max-width: 767px) 100vw, 920px" />
          )}
        </div>
        <button type="button" className="scene-cta summer-complete" onClick={onComplete}>
          Khép lại ngày hè
        </button>
      </MemoryModal>

    </section>
  );
}
