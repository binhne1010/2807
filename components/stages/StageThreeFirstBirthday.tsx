"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { LetterReveal } from "../memories/LetterReveal";
import { MemoryGallery } from "../memories/MemoryGallery";
import { MemoryImage } from "../memories/MemoryImage";
import { MemoryModal } from "../memories/MemoryModal";
import { MemoryVideo } from "../memories/MemoryVideo";

type StageProps = {
  onReturnToMap: () => void;
  onComplete: () => void;
};

type RoomObject = {
  id: string;
  label: string;
  hint: string;
  title: string;
  eyebrow: string;
  kind: "letter" | "album" | "video" | "window" | "talk" | "note";
  lines?: string[];
};

const roomObjects: RoomObject[] = [
  {
    id: "gift",
    label: "Hộp quà",
    hint: "Một món quà nhỏ trên bàn",
    title: "Hộp quà của buổi tối hôm ấy",
    eyebrow: "Kỷ niệm",
    kind: "letter",
    lines: [
      "Anh không nhớ mình đã gói nó có đẹp không. Anh chỉ nhớ lúc em mở ra, em đã rất vui và cũng thử chiếc váy đó cho anh xem",
      "Có lẽ điều đáng giữ lại không phải món quà, mà là cảm giác được ngồi cạnh em trong căn phòng ấy. Nơi mà mình được sống trọn vẹn với tình yêu của hai đứa",
    ],
  },
  {
    id: "frames",
    label: "Khung ảnh",
    hint: "Những bức hình trên tường",
    title: "Những bức ảnh trên tường",
    eyebrow: "Album",
    kind: "album",
  },
  {
    id: "window",
    label: "Ánh sáng ngoài cửa sổ",
    hint: "Một vòng dạo sau bữa tối",
    title: "Vòng dạo sau bữa tối",
    eyebrow: "Ngoài cửa sổ",
    kind: "window",
    lines: [
      "trước khi ăn, Anh và Cún ra ngoài đi một vòng. Cùng đi dạo vui chơi nói chuyện mua đồ uống rồi nghịch những trò chơi ở đó khoảng thời gian đó thực sự rất quý giá với anh  ",
      "sau đó là hơi ấm bên nồi lẩu. từ từ thưởng thức nói chuyện vui vẻ chụp cùng nhau những tấm hình, Cún đáng yêu trong bộ quần áo của anh cùng thư giãn vs nhau đên tận khuya",
      "Kỉ niệm đó anh không bao giừo quên khảong thời gian và bình yên vui vẻ tình yêu đong đầy quên đi những cãi vã trước đó",
    ],
  },
  {
    id: "tv",
    label: "Màn hình nhỏ",
    hint: "Một đoạn video còn giữ lại",
    title: "Đoạn video của buổi tối",
    eyebrow: "Video",
    kind: "video",
  },
  {
    id: "sofa",
    label: "Góc sofa",
    hint: "Một đoạn nói chuyện bình thường",
    title: "Một đoạn nói chuyện trên sofa",
    eyebrow: "Hội thoại",
    kind: "talk",
    lines: [
      "Năm sau mình vẫn làm như này chứ?",
      "Thôi lần sau em khộng đi kiểu này nữa đâu",
      "Thôi mà anh biết em ngại, cứ tin anh anh muốn bọn mình thật hạnh phúc",
    ],
  },
  {
    id: "note",
    label: "Lời nhắn",
    hint: "Tờ giấy để lại trên bàn",
    title: "Lời nhắn để lại trên bàn",
    eyebrow: "Lời nhắn",
    kind: "note",
    lines: [
      "Ngày hôm đó cũng có lúc hai người không vui.",
      "Anh không muốn kể lại nó như một ngày hoàn hảo, vì nó không phải vậy.",
      "Đã có xích mích nhưng mọi thứ đều được nói ra và giải quyết để rồi mình đã thật vui vs không gian riêng của mình",
    ],
  },
];

export function StageThreeFirstBirthday({ onReturnToMap, onComplete }: StageProps) {
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const activeObject = useMemo(() => roomObjects.find((item) => item.id === activeId) ?? null, [activeId]);
  const isComplete = openedIds.length === roomObjects.length;

  function openObject(id: string) {
    setActiveId(id);
    setOpenedIds((current) => (current.includes(id) ? current : [...current, id]));
  }

  return (
    <section className={`birthday-room${isComplete ? " is-complete" : ""}`} aria-label="Sinh nhật đầu tiên bên nhau">
      <Image
        className="room-interior"
        src="/images/stage-3/birthday-room-interior-v1.png"
        alt="Căn phòng nhỏ trong buổi tối sinh nhật"
        fill
        priority
        sizes="100vw"
      />
      <div className="room-wash" aria-hidden="true" />
      <div className="room-window-light" aria-hidden="true" />
      <div className="room-dust" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <div className="scene-grain" aria-hidden="true" />
      <div className="scene-vignette" aria-hidden="true" />

      <button type="button" className="scene-back" onClick={onReturnToMap}>
        <ArrowLeft size={16} weight="bold" />
        Quay lại bản đồ
      </button>

      <header className="room-header">
        <p className="scene-eyebrow">Sinh nhật đầu tiên bên nhau</p>
        <h1 className="scene-title">Một căn phòng chỉ có hai người</h1>
        <p className="scene-lede">
          Đó là lần đầu tiên anh được đón sinh nhật cùng em. Không phải mọi khoảnh khắc đều hoàn hảo, nhưng anh vẫn nhớ ngày hôm ấy là kỉ niệm không thể nào phai mờ
        </p>
      </header>

      <div className="room-objects" aria-label="Các ký ức trong căn phòng">
        {roomObjects.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`room-object room-object-${item.id}${openedIds.includes(item.id) ? " is-opened" : ""}`}
            onClick={() => openObject(item.id)}
            aria-label={`${item.label}. ${item.hint}`}
          >
            <span className="room-object-dot" aria-hidden="true" />
            <span className="room-object-copy" aria-hidden="true">{item.label}</span>
          </button>
        ))}
      </div>

      {isComplete && (
        <motion.div
          className="room-complete"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Căn phòng vẫn yên như vậy, nhưng kỷ niệm đã sáng hơn một chút.</p>
          <button type="button" className="scene-cta" onClick={onComplete}>Rời khỏi căn phòng</button>
        </motion.div>
      )}

      <MemoryModal
        isOpen={activeObject !== null}
        onClose={() => setActiveId(null)}
        eyebrow={activeObject?.eyebrow}
        title={activeObject?.title ?? ""}
        tone="tone-birthday"
      >
        {activeObject?.kind === "album" && <MemoryGallery stage={3} photos={[1, 2, 3, 4]} label="Ảnh sinh nhật đầu tiên" />}
        {activeObject?.kind === "video" && <MemoryVideo stage={3} />}
        {activeObject?.kind === "window" && (
          <div className="stage-three-window-memory">
            <MemoryVideo stage={3} />
            <div className="stage-three-window-note">
              <LetterReveal lines={activeObject.lines ?? []} />
              <div className="stage-three-window-photos" aria-label="Những ảnh sau buổi tối hôm ấy">
                <MemoryImage stage={3} photo={5} alt="Kỷ niệm sau bữa tối" sizes="(max-width: 767px) 44vw, 11rem" />
                <MemoryImage stage={3} photo={6} alt="Khoảnh khắc đi dạo cùng nhau" sizes="(max-width: 767px) 44vw, 11rem" />
                <MemoryImage stage={3} photo={7} alt="Một góc phố buổi tối" sizes="(max-width: 767px) 44vw, 11rem" />
              </div>
            </div>
          </div>
        )}
        {activeObject?.kind === "talk" && <LetterReveal lines={activeObject.lines ?? []} variant="hand" />}
        {(activeObject?.kind === "letter" || activeObject?.kind === "note") && <LetterReveal lines={activeObject.lines ?? []} />}
      </MemoryModal>
    </section>
  );
}