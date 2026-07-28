"use client";

import {
  ArrowLeft,
  ChatCircleText,
  HeartStraight,
  Images,
  PhoneCall,
  VideoCamera,
} from "@phosphor-icons/react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { LetterReveal } from "../memories/LetterReveal";
import { MemoryGallery } from "../memories/MemoryGallery";
import { MemoryModal } from "../memories/MemoryModal";
import { MemoryVideo } from "../memories/MemoryVideo";

type StageProps = {
  onReturnToMap: () => void;
  onComplete: () => void;
};

type PhoneEntry = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  kind: "call" | "messages" | "screenshots" | "videocall" | "letter";
  lines?: string[];
};

const phoneEntries: PhoneEntry[] = [
  {
    id: "call",
    label: "Cuộc gọi",
    eyebrow: "Cuộc gọi",
    title: "Những cuộc gọi trong những ngày hồi phục",
    kind: "call",
    lines: [
      "Buổi tối trong căn phòng lặng hơn bình thường. Điện thoại là thứ duy nhất còn sáng.",
      "Anh nhớ giọng Cún qua chiếc loa nhỏ, dịu hơn mọi thứ ngoài kia một chút.",
      "Chỉ cần nghe thấy Cún, anh đã thấy dễ chịu hơn và cơn đau không còn.",
    ],
  },
  {
    id: "messages",
    label: "Tin nhắn vui",
    eyebrow: "Tin nhắn",
    title: "Vài tin nhắn làm anh cười",
    kind: "messages",
    lines: [
      "Tay anh sao rồi?",
      "Đau quá à ước gì có người chăm ngay bây giờ, Nhớ Cún quá đi.",
      "Thôi đi 1 tháng sau khỏi em đi rồi em đưua anh đi chơi.",
    ],
  },
  {
    id: "screenshots",
    label: "Ảnh lưu lại",
    eyebrow: "Album",
    title: "Những điều hai người đã lưu lại",
    kind: "screenshots",
  },
  {
    id: "videocall",
    label: "Video call",
    eyebrow: "Video",
    title: "Kỉ niệm cùng em vui vẻ và trò chuyện thâu đêm",
    kind: "videocall",
  },
  {
    id: "distance",
    label: "Điều chưa nói",
    eyebrow: "Lời kể",
    title: "Điều anh đã không nói lúc đó",
    kind: "letter",
    lines: [
      "Anh có buồn, vì đã mong được gặp em và đã đôi lần gây áp lực lên em trong thời gian bị thương .",
      "Anh cảm ơn Cún nheiefu đã luôn ở bên anh những lúc như thế nhẫn nhịn và chiều anh.",
      "Anh nhớ rất rõ nhưng điều mà làm tuy không phải đến thăm nhưgn mà sự ân cần chia sẻ giải tỏa cùng anh lo lắng cho anh.",
    ],
  },
];

function EntryGlyph({ kind }: { kind: PhoneEntry["kind"] }) {
  const iconProps = { size: 18, weight: "fill" as const };

  if (kind === "call") return <PhoneCall {...iconProps} />;
  if (kind === "messages") return <ChatCircleText {...iconProps} />;
  if (kind === "screenshots") return <Images {...iconProps} />;
  if (kind === "videocall") return <VideoCamera {...iconProps} />;
  return <HeartStraight {...iconProps} />;
}

export function StageFiveRecovery({ onReturnToMap, onComplete }: StageProps) {
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasOpenedGift, setHasOpenedGift] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeEntry = useMemo(() => phoneEntries.find((entry) => entry.id === activeId) ?? null, [activeId]);
  const openedCount = openedIds.length;
  const isBagAvailable = openedCount === phoneEntries.length;

  function openEntry(id: string) {
    setActiveId(id);
    setOpenedIds((current) => (current.includes(id) ? current : [...current, id]));
  }

  return (
    <section
      className={`recovery-scene${isBagAvailable ? " is-bag-ready" : ""}${hasOpenedGift ? " is-warmed" : ""}`}
      aria-label="Biến cố, khoảng cách và những cuộc gọi"
    >
      <div className="recovery-media" aria-hidden="true">
        <Image
          src="/images/stage-5/two-rooms-call-v1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="recovery-image"
        />
      </div>
      <div className="recovery-wash" aria-hidden="true" />
      <div className="scene-grain" aria-hidden="true" />
      <div className="scene-vignette" aria-hidden="true" />

      <button type="button" className="scene-back" onClick={onReturnToMap}>
        <ArrowLeft size={16} weight="bold" />
        Quay lại bản đồ
      </button>

      <header className="recovery-header">
        <p className="scene-eyebrow">Khoảng cách</p>
        <h1 className="scene-title">Hai căn phòng, một cuộc gọi</h1>
        <p className="scene-lede">
          Có những ngày mọi thứ đều khó hơn. Nhưng mỗi tối, vẫn đều dều chúng ta vẫn luôn ở bên nhau.
        </p>
      </header>

      <div className="recovery-call-bridge" aria-hidden="true">
        <span className="recovery-phone-mark recovery-phone-mark-left">
          <PhoneCall size={20} weight="fill" />
          <i />
          <i />
        </span>
        <span className="recovery-connection">
          <i />
          <i />
          <i />
        </span>
        <span className="recovery-phone-mark recovery-phone-mark-right">
          <PhoneCall size={20} weight="fill" />
          <i />
          <i />
        </span>
      </div>

      <section className="recovery-call-console" aria-label="Những kỷ niệm qua điện thoại">
        <div className="recovery-live-call">
          <span className="recovery-live-icon" aria-hidden="true">
            <PhoneCall size={18} weight="fill" />
          </span>
          <span className="recovery-live-copy">
            <strong>Đang gọi</strong>
            <small>Hai đầu dây vẫn ở đây</small>
          </span>
          <span className="recovery-wave" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>

        <p className="recovery-memory-prompt">Chạm vào từng dấu chấm để mở lại một cuộc trò chuyện.</p>
        <ul className="recovery-entry-list">
          {phoneEntries.map((entry, index) => {
            const isOpened = openedIds.includes(entry.id);

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  className={`recovery-entry${isOpened ? " is-opened" : ""}`}
                  onClick={() => openEntry(entry.id)}
                  aria-label={`${entry.label}${isOpened ? ", đã mở" : ", chưa mở"}`}
                >
                  <span className="recovery-entry-dot">{index + 1}</span>
                  <span className="recovery-entry-icon" aria-hidden="true">
                    <EntryGlyph kind={entry.kind} />
                  </span>
                  <span className="recovery-entry-copy">
                    <strong>{entry.label}</strong>
                    <small>{isOpened ? "Đã mở" : "Mở kỷ niệm"}</small>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="scene-progress" role="status" aria-live="polite">
          <span className="scene-progress-track">
            <span className="scene-progress-fill" style={{ width: `${(openedCount / phoneEntries.length) * 100}%` }} />
          </span>
          {openedCount} / {phoneEntries.length}
        </div>
      </section>

      {isBagAvailable && (
        <motion.div
          className="recovery-bag-area"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          {!hasOpenedGift ? (
            <button type="button" className="recovery-bag-button" onClick={() => setHasOpenedGift(true)}>
              <span className="recovery-bag-icon" aria-hidden="true" />
              Em đến, và mang theo một túi đồ ăn
            </button>
          ) : (
            <div className="recovery-bag-note">
              <LetterReveal
                lines={[
                  "Dù không xuất hiện theo cách anh đã mong đợi, Cún vẫn đến với sự quan tâm của mình. Chỉ vậy thôi cũng khiến trái tim anh luôn rung động và cố gắng làm mọi thứ vì em.",
                ]}
              />
              <button type="button" className="scene-cta" onClick={onComplete}>
                Tiếp tục hành trình
              </button>
            </div>
          )}
        </motion.div>
      )}

      <MemoryModal
        isOpen={activeEntry !== null}
        onClose={() => setActiveId(null)}
        eyebrow={activeEntry?.eyebrow}
        title={activeEntry?.title ?? ""}
        tone="tone-recovery"
      >
        {activeEntry?.kind === "screenshots" && <MemoryGallery stage={5} photos={[1, 2, 3, 4]} label="Ảnh lưu lại của hai người" />}
        {activeEntry?.kind === "videocall" && <MemoryVideo stage={5} />}
        {activeEntry?.kind === "messages" && <LetterReveal lines={activeEntry.lines ?? []} variant="hand" />}
        {(activeEntry?.kind === "call" || activeEntry?.kind === "letter") && <LetterReveal lines={activeEntry.lines ?? []} />}
      </MemoryModal>
    </section>
  );
}