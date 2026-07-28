"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BACKGROUND_MUSIC_REQUEST } from "./YouTubeBackgroundMusic";

type IntroCafeSceneProps = {
  onOpenMap: () => void;
};

export function IntroCafeScene({ onOpenMap }: IntroCafeSceneProps) {
  const [isOpening, setIsOpening] = useState(false);
  const reduceMotion = useReducedMotion();

  function handleOpenMap() {
    if (isOpening) return;
    window.dispatchEvent(new Event(BACKGROUND_MUSIC_REQUEST));
    setIsOpening(true);
    window.setTimeout(onOpenMap, reduceMotion ? 80 : 1480);
  }

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: reduceMotion ? 0.1 : 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section className={`intro-cafe ${isOpening ? "is-opening" : ""}`} aria-label="Quán cà phê nơi câu chuyện bắt đầu">
      <Image
        className="cafe-image"
        src="/images/cafe-garden.png"
        alt="Quán cà phê sân vườn truyền thống với bàn gỗ dành cho hai người"
        fill
        priority
        sizes="100vw"
      />
      <div className="cafe-scrim" aria-hidden="true" />
      <div className="cafe-sunlight" aria-hidden="true" />
      <div className="cafe-leaf-shadow leaf-shadow-one" aria-hidden="true" />
      <div className="cafe-leaf-shadow leaf-shadow-two" aria-hidden="true" />
      <div className="cafe-steam steam-left" aria-hidden="true" />
      <div className="cafe-steam steam-right" aria-hidden="true" />
      <div className="map-glow" aria-hidden="true" />

      <motion.div className="cafe-content" animate={isOpening ? { opacity: 0, y: -14 } : { opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <motion.p className="scene-date" {...reveal(1.05)}>28.07.2026</motion.p>
        <motion.h1 {...reveal(0.55)}>Chào mừng em.</motion.h1>
        <motion.p className="scene-intro" {...reveal(0.82)}>Thạch Mộc là nơi câu chuyện của chúng ta bắt đầu.</motion.p>
        <motion.p className="scene-letter" {...reveal(1.28)}>Trước khi mở món quà sinh nhật, em hãy cùng anh đi lại hành trình của chúng ta nhé.</motion.p>
        <motion.button
          type="button"
          className="open-map-button"
          onClick={handleOpenMap}
          disabled={isOpening}
          aria-label="Mở bản đồ hành trình"
          {...reveal(1.62)}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          {isOpening ? "Bản đồ đang mở" : "Mở bản đồ hành trình"}
        </motion.button>
      </motion.div>
    </section>
  );
}