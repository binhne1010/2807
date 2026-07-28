"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StageVideoPlayer } from "../memories/StageVideoPlayer";

type MocChauSceneProps = {
  onReturnToMap: () => void;
  onComplete: () => void;
};

type PersonalPhotoProps = {
  index: number;
  className?: string;
  alt: string;
  framed?: boolean;
};

function PersonalPhoto({ index, className = "", alt, framed = false }: PersonalPhotoProps) {
  const [fallback, setFallback] = useState(false);
  const photo = (
    <Image
      src={fallback ? "/images/memory-moc-chau-film.png" : `/memories/stage-1/photo-${String(index).padStart(2, "0")}.jpg`}
      alt={fallback ? "Đồi chè Mộc Châu trong sương" : alt}
      fill
      sizes="(max-width: 767px) 52vw, 19vw"
      onError={() => setFallback(true)}
    />
  );

  return (
    <figure className={className}>
      {framed ? <span className="memory-photo-image">{photo}</span> : photo}
    </figure>
  );
}

function MemoryVideo() {
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) {
    return (
      <div className="moc-video-template">
        <Image src="/images/memory-moc-chau-film.png" alt="Khung chờ video kỷ niệm" fill sizes="100vw" />
        <p>Video của hai bạn sẽ xuất hiện ở đây.</p>
      </div>
    );
  }

  return (
    <StageVideoPlayer
      className="moc-video-player"
      poster="/images/memory-moc-chau-film.png"
      source="/memories/stage-1/video-01.mp4"
      onError={() => setUnavailable(true)}
    >
      Trình duyệt này không hỗ trợ phát video.
    </StageVideoPlayer>
  );
}
export function MocChauScene({ onReturnToMap, onComplete }: MocChauSceneProps) {
  const storyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const story = storyRef.current;
    if (!story || reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".moc-scroll-panel", story);

      panels.forEach((panel, index) => {
        if (index === 0) return;

        const previousPanel = panels[index - 1];
        gsap.set([previousPanel, panel], { transformPerspective: 1600, backfaceVisibility: "hidden" });

        gsap.fromTo(
          panel,
          { autoAlpha: 0.1, yPercent: 8, rotateX: -11, scale: 0.985, transformOrigin: "50% 0%" },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            scale: 1,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: panel,
              scroller: story,
              start: "top 94%",
              end: "top 16%",
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          },
        );

        gsap.to(previousPanel, {
          autoAlpha: 0.38,
          yPercent: -4,
          rotateX: 7,
          scale: 0.985,
          transformOrigin: "50% 100%",
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: panel,
            scroller: story,
            start: "top 78%",
            end: "top 12%",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
      });
    }, story);

    return () => context.revert();
  }, [reduceMotion]);
  return (
    <section ref={storyRef} className="moc-chau-scene moc-scroll-story" aria-label="Những ngày đầu">
      <Image className="moc-chau-background" src="/images/memory-moc-chau-film.png" alt="Đồi chè Mộc Châu trong sương sớm" fill priority sizes="100vw" />
      <div className="moc-chau-scrim" aria-hidden="true" />
      <div className="moc-love-atmosphere" aria-hidden="true">
        <span className="moc-love-heart heart-one" />
        <span className="moc-love-heart heart-two" />
        <span className="moc-love-heart heart-three" />
        <span className="moc-love-heart heart-four" />
        <span className="moc-love-heart heart-five" />
        <span className="moc-love-spark spark-one" />
        <span className="moc-love-spark spark-two" />
        <span className="moc-love-spark spark-three" />
      </div>
      <button type="button" className="moc-story-back" onClick={onReturnToMap}>Quay lại bản đồ</button>

      <section className="moc-scroll-panel moc-scroll-photos" aria-label="Những hình ảnh ban đầu">
        <header className="moc-scroll-heading">
          <p>Những kỷ niệm đầu tiên</p>
          <h1>Những ngày đầu</h1>
          <span>Từ những câu chuyện đầu tiên đến những chuyến đi cùng nhau.</span>
        </header>
        <div className="moc-photo-rail" aria-label="Dải ảnh treo">
          <div className="moc-rail-line" aria-hidden="true" />
          <div className="moc-rail-lights" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          <div className="moc-rail-flowers" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="moc-rail-petals" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="moc-photo-strip">
            {Array.from({ length: 5 }, (_, index) => (
              <PersonalPhoto key={index + 1} index={index + 1} alt={`Ảnh kỷ niệm những ngày đầu ${index + 1}`} className={`memory-hanging-photo rail-photo rail-photo-${index + 1}`} framed />
            ))}
          </div>
        </div>
      </section>

      <section className="moc-scroll-panel moc-scroll-video" aria-label="Video kỷ niệm">
        <div className="moc-video-copy">
          <p>Video kỷ niệm</p>
          <h2>Những khoảnh khắc đã từng rất gần</h2>
        </div>
        <MemoryVideo />
        <div className="moc-video-love-icons" aria-hidden="true">
          <span className="moc-video-heart video-heart-one" />
          <span className="moc-video-heart video-heart-two" />
          <span className="moc-video-heart video-heart-three" />
          <span className="moc-video-spark video-spark-one" />
          <span className="moc-video-spark video-spark-two" />
        </div>
      </section>

      <section className="moc-scroll-panel moc-scroll-letter" aria-label="Lời nhắn">
        <div className="moc-notebook">
          <div className="moc-notebook-page moc-notebook-copy">
            <p className="moc-letter-eyebrow">Đôi lời cho những ngày đầu</p>
            <h2>Điều anh muốn giữ lại</h2>
            <p>Những ngày đầu của chúng ta không phải lúc nào cũng có điều gì thật đặc biệt.</p>
            <p>Nhưng chính một cuộc hẹn, một bức ảnh hay một chuyến đi đã khiến anh vẫn muốn nhớ về chúng thật lâu.</p>
            <p>Mộc Châu là một phần đẹp trong những kỷ niệm ấy. Điều đáng nhớ nhất vẫn là em đã ở đó.</p>
            <button type="button" className="moc-next-stage" onClick={onComplete}>Mở chặng tiếp theo</button>
          </div>
          <div className="moc-notebook-page moc-notebook-photos" aria-label="Một vài bức ảnh kỷ niệm">
            <PersonalPhoto index={6} alt="Ảnh kỷ niệm gắn trong cuốn sổ" className="notebook-photo notebook-photo-one" />
            <PersonalPhoto index={7} alt="Ảnh kỷ niệm gắn trong cuốn sổ" className="notebook-photo notebook-photo-two" />
            <PersonalPhoto index={8} alt="Ảnh kỷ niệm gắn trong cuốn sổ" className="notebook-photo notebook-photo-three" />
          </div>
        </div>
      </section>
    </section>
  );
}