"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { MemoryImage } from "../memories/MemoryImage";

type StageProps = {
  onReturnToMap: () => void;
  onComplete: () => void;
};

type Ember = {
  id: string;
  ember: { x: number; y: number };
  tilt: number;
  text: string;
  kind: "words" | "photo";
};

const embers: Ember[] = [
  { id: "listen", ember: { x: 14, y: 30 }, tilt: -3, text: "Anh xin lỗi vì có những lúc chỉ muốn em hiểu cho anh, nhưng lại quên mất rằng em cũng đang cần được lắng nghe.", kind: "words" },
  { id: "heavy", ember: { x: 33, y: 18 }, tilt: 2, text: "Anh xin lỗi vì những lời nói trong lúc nóng giận đã khiến tình yêu của chúng ta trở nên nặng nề.", kind: "words" },
  { id: "honest", ember: { x: 52, y: 26 }, tilt: -1, text: "chưa bao giờ anh phủ nhận những tổn thương. chúng mình vẫn luôn học từ đó là sửa dần cùng nhau và chữa lành cho nhau.", kind: "words" },
  { id: "unsaid", ember: { x: 72, y: 17 }, tilt: 4, text: "Có một tháng cả hai đều im lặng. Anh đã viết rất nhiều tin nhắn rồi xóa đi, có cái gửi có cái không chỉ dể muốn nói vs em một điều là chúng ta vẫn chưa thực sự kết thúc.", kind: "words" },
  { id: "old", ember: { x: 89, y: 36 }, tilt: -4, text: "Một ký ức cũ mà anh vẫn giữ.", kind: "photo" },
  { id: "understood", ember: { x: 62, y: 62 }, tilt: 3, text: "Anh cũng chỉ mong được hiểu. Nhưng anh nhận ra mong điều đó mà không lắng nghe em thì không công bằng. Và xin lỗi vì nhưng lời hứa anh chưua thức hiện.", kind: "words" },
];

const skyMemories = [
  { id: "first-days", src: "/memories/stage-1/photo-01.jpg", className: "memory-one" },
  { id: "summer", src: "/memories/stage-2/photo-01.jpg", className: "memory-two" },
  { id: "tet", src: "/memories/stage-6/photo-01.jpg", className: "memory-three" },
];

export function StageSevenSilentFire({ onReturnToMap, onComplete }: StageProps) {
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const reduceMotion = useReducedMotion();
  const openedCount = openedIds.length;
  const isComplete = openedCount === embers.length;

  return (
    <section className={`fire-scene${isComplete ? " is-brighter" : ""}`} aria-label="Xa cách, im lặng và đốm lửa">
      <div className="fire-sky" aria-hidden="true" />
      <div className="fire-memory-haze" aria-hidden="true">
        {skyMemories.map((memory) => (
          <span
            key={memory.id}
            className={`fire-memory ${memory.className}`}
            style={{ backgroundImage: `linear-gradient(180deg, rgba(25, 29, 39, 0.12), rgba(25, 29, 39, 0.62)), url("${memory.src}")` }}
          />
        ))}
      </div>
      <div className="fire-clouds" aria-hidden="true"><span /><span /></div>
      <div className="fire-horizon" aria-hidden="true" />
      <div className="fire-ground" aria-hidden="true" />

      <div className="fire-flower-path" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} style={{ "--i": index } as React.CSSProperties} />
        ))}
      </div>

      <div className="fire-figures" aria-hidden="true">
        <span className="fire-person fire-person-left">
          <i className="fire-person-head" />
          <i className="fire-person-torso" />
          <i className="fire-person-arm" />
          <i className="fire-person-legs" />
        </span>
        <span className="fire-person fire-person-right">
          <i className="fire-person-head" />
          <i className="fire-person-torso" />
          <i className="fire-person-arm" />
          <i className="fire-person-legs" />
        </span>
      </div>

      <div className="fire-pit" style={{ "--fire-strength": `${0.55 + openedCount * 0.075}` } as React.CSSProperties}>
        <span className="fire-glow" aria-hidden="true" />
        <span className="fire-stones" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
        </span>
        <span className="fire-logs" aria-hidden="true" />
        <span className="fire-flame flame-one" aria-hidden="true" />
        <span className="fire-flame flame-two" aria-hidden="true" />
        <span className="fire-flame flame-three" aria-hidden="true" />
        <span className="fire-sparks" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => <span key={index} style={{ "--i": index } as React.CSSProperties} />)}
        </span>

        {embers.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`fire-ember${openedIds.includes(item.id) ? " is-opened" : ""}`}
            style={{ left: `${item.ember.x}%`, top: `${item.ember.y}%` }}
            onClick={() => setOpenedIds((current) => (current.includes(item.id) ? current : [...current, item.id]))}
            disabled={openedIds.includes(item.id)}
            aria-label={openedIds.includes(item.id) ? "Đốm than đã mở" : "Mở một đốm than trong lửa"}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="scene-grain" aria-hidden="true" />

      <button type="button" className="scene-back" onClick={onReturnToMap}>
        <ArrowLeft size={16} weight="bold" />
        Quay lại bản đồ
      </button>

      <header className="fire-header">
        <p className="scene-eyebrow">Một tháng im lặng</p>
        <h1 className="scene-title">Điều chưa từng thật sự tắt</h1>
        <p className="scene-lede">Chạm vào từng đốm than để đọc những điều anh chưa nói ra được.</p>
        <div className="scene-progress" role="status" aria-live="polite">
          <span className="scene-progress-track">
            <span className="scene-progress-fill" style={{ width: `${(openedCount / embers.length) * 100}%` }} />
          </span>
          {openedCount} / {embers.length} điều đã nói
        </div>
      </header>

      <div className="fire-slips">
        <AnimatePresence>
          {embers.filter((item) => openedIds.includes(item.id)).map((item) => (
            <motion.div
              key={item.id}
              className={`fire-slip${item.kind === "photo" ? " is-photo" : ""}`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 160, scale: 0.88, rotate: item.tilt * 2, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: item.tilt, filter: "blur(0px)" }}
              transition={{ duration: reduceMotion ? 0.2 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.kind === "photo" ? (
                <>
                  <MemoryImage stage={7} photo={1} alt="Một ký ức cũ" sizes="(max-width: 767px) 46vw, 15vw" extension="png" />
                  <p>{item.text}</p>
                </>
              ) : <p>{item.text}</p>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isComplete && (
        <motion.div className="fire-complete" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.15 : 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <p>Có những khoảng lặng khiến anh và em như xa nhau. Nhưng trong anh, vẫn còn một điều chưa từng thật sự tắt.</p>
          <button type="button" className="scene-cta" onClick={onComplete}>Đi theo con đường phía trước</button>
        </motion.div>
      )}
    </section>
  );
}