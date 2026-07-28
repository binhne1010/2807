"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FinalMessage } from "../memories/FinalMessage";
import { FinalVideo } from "../memories/FinalVideo";
import { GiftOpening } from "../memories/GiftOpening";

type StageProps = {
  onReturnToMap: () => void;
  onRestart: () => void;
  onDuckMusic: (shouldDuck: boolean) => void;
};

type Phase = "field" | "gift" | "video" | "letter";

export function StageEightBirthdayField({ onReturnToMap, onRestart, onDuckMusic }: StageProps) {
  const [phase, setPhase] = useState<Phase>("field");
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const reduceMotion = useReducedMotion();
  const petalState = phase === "field" ? "is-drifting" : phase === "gift" ? "is-slowing" : "is-still";

  return (
    <section className={`field-scene phase-${phase} ${petalState}`} aria-label="Sinh nhật, lời chúc và lời xin lỗi">
      <div className="field-sky" aria-hidden="true" />
      <div className="field-sun" aria-hidden="true" />
      <div className="field-hills" aria-hidden="true"><span /><span /><span /></div>
      <div className="field-tree" aria-hidden="true" />
      <div className="field-path" aria-hidden="true" />
      <div className="field-flowers" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
      <div className="field-petals" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
      <div className="field-fireflies" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => <span key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
      <div className="field-seats" aria-hidden="true"><span /><span /></div>
      <div className="scene-grain" aria-hidden="true" />

      {phase === "field" && (
        <button type="button" className="scene-back" onClick={onReturnToMap}>
          <ArrowLeft size={16} weight="bold" />
          Quay lại bản đồ
        </button>
      )}

      <AnimatePresence mode="wait">
        {phase === "field" && (
          <motion.div key="field" className="field-invite" initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: reduceMotion ? 0.15 : 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <p className="scene-eyebrow">Chặng cuối cùng</p>
            <h1 className="scene-title field-title">Chúc mừng sinh nhật em.</h1>
            <p className="scene-lede">Cảm ơn em vì đã cùng anh đi qua toàn bộ hành trình này.</p>
            <p className="scene-lede">Có những điều anh muốn nói bằng chính giọng nói của mình.</p>
            <button type="button" className="scene-cta field-cta" onClick={() => setPhase("gift")}>Mở món quà của anh</button>
          </motion.div>
        )}

        {phase === "gift" && (
          <motion.div key="gift" className="field-gift-layer" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <GiftOpening onOpened={() => setIsGiftOpened(true)} />
            {isGiftOpened && (
              <motion.button
                type="button"
                className="scene-cta gift-video-cta"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setPhase("video")}
              >
                Xem video của anh
              </motion.button>
            )}
          </motion.div>
        )}

        {phase === "video" && (
          <motion.div key="video" className="field-video-layer" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.15 : 1.1 }}>
            <FinalVideo onFinished={() => setPhase("letter")} onPlayStateChange={onDuckMusic} />
          </motion.div>
        )}

        {phase === "letter" && (
          <motion.div key="letter" className="field-letter-layer" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0.15 : 1.4 }}>
            <FinalMessage onRestart={onRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}