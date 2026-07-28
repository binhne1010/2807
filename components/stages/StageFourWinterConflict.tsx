"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { MemoryGallery } from "../memories/MemoryGallery";
import { MemoryVideo } from "../memories/MemoryVideo";
import { MemoryModal } from "../memories/MemoryModal";

type StageProps = {
  onReturnToMap: () => void;
  onComplete: () => void;
};

type ConversationFragment = {
  id: string;
  spoken: string;
  unsaid: string;
  resolves: boolean;
};

const conversations: ConversationFragment[] = [
  {
    id: "busy",
    spoken: "Dạo này mình nhắn tin ít hơn.",
    unsaid: "Anh chỉ đang sợ mình không còn quan trọng nữa.",
    resolves: true,
  },
  {
    id: "fine",
    spoken: "Không có gì đâu, em ổn mà.",
    unsaid: "Em đang mệt, nhưng em không biết bắt đầu kể từ đâu.",
    resolves: true,
  },
  {
    id: "late",
    spoken: "Anh không thấy mệt à yêu nhau và mệt mỏi vậy?",
    unsaid: "Anh không biết cách nói rồi làm em hiểu lầm anh, anh muốn mình nói chuyện với nhau",
    resolves: false,
  },
  {
    id: "space",
    spoken: "Anh về đi em không muốn gặp rồi mà",
    unsaid: "Sao anh cứ bắt em làm nhưng điều em không muốn thế",
    resolves: true,
  },
  {
    id: "unsaid",
    spoken: "Anh biết em luôn im lặng rồi suy nghĩ một mình",
    unsaid: "Anh biết Cún luôn muốn bình tĩnh rồi mới nói chuyện, còn anh thực sự chỉ lo lắng sợ em nghĩ nhiều hiểu làm nên muốn giải quyết vs em .",
    resolves: false,
  },
];

const warmMemoryLines = [
  "Có những ngày mình đã mệt vì không hiểu nhau.",
  "Nhưng cũng có rất nhiều ngày rất bình thường mà vẫn vui, vì chỉ cần được ở cạnh nhau.",
  "Những bức ảnh này là để nhớ rằng tình yêu của chúng ta không chỉ có những cơn mưa.",
];

export function StageFourWinterConflict({ onReturnToMap, onComplete }: StageProps) {
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isWarmMemoryOpen, setIsWarmMemoryOpen] = useState(false);
  const [hasSeenWarmMemory, setHasSeenWarmMemory] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeConversation = useMemo(() => conversations.find((conversation) => conversation.id === activeId) ?? null, [activeId]);
  const allConversationsOpened = openedIds.length === conversations.length;
  const isComplete = allConversationsOpened && hasSeenWarmMemory;

  function openConversation(id: string) {
    setOpenedIds((current) => (current.includes(id) ? current : [...current, id]));
    setActiveId(id);
  }

  function openWarmMemory() {
    setHasSeenWarmMemory(true);
    setIsWarmMemoryOpen(true);
  }

  return (
    <section className={`winter-scene${isComplete ? " is-complete" : ""}`} aria-label="Mùa đông và những điều chưa nói hết">
      <div className="winter-media" aria-hidden="true">
        <Image
          className="winter-image"
          src="/images/stage-4/winter-bridge-rain-v1.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="winter-wash" aria-hidden="true" />
      <button type="button" className="winter-photo-memory" onClick={openWarmMemory} aria-label="Mở ảnh và video kỷ niệm"></button>
      <p className="winter-umbrella-hint" aria-hidden="true">Chạm vào chiếc ô hồng để mở những kỷ niệm.</p>

      <div className="winter-drizzle" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} style={{ "--i": index } as React.CSSProperties} />
        ))}
      </div>
      <div className="winter-mist" aria-hidden="true" />
      <div className="scene-grain" aria-hidden="true" />
      <div className="scene-vignette" aria-hidden="true" />

      <button type="button" className="scene-back" onClick={onReturnToMap}>
        <ArrowLeft size={16} weight="bold" />
        Quay lại bản đồ
      </button>

      <header className="winter-header">
        <p className="scene-eyebrow">Mùa đông</p>
        <h1 className="scene-title">Những điều chưa nói hết</h1>
        <p className="scene-lede">
          Có những ngày trời rất lạnh, cả hai đều mệt vì chưa hiểu nhau. Nhưng chúng ta vẫn chưa chọn rời đi.
        </p>
        <p className="winter-status" aria-live="polite">Đã lắng nghe {openedIds.length} điều.</p>
      </header>

      <section className="winter-conversations" aria-label="Những mẩu hội thoại còn dang dở">
        <p className="winter-instruction">Chạm vào từng câu để nghe điều còn lại phía sau.</p>
        <div className="winter-phrases" role="list">
          {conversations.map((conversation, index) => {
            const isOpened = openedIds.includes(conversation.id);
            return (
              <button
                key={conversation.id}
                type="button"
                role="listitem"
                className={`winter-phrase${isOpened ? " is-opened" : ""}${conversation.resolves ? "" : " is-unresolved"}`}
                style={{ "--phrase-index": index } as React.CSSProperties}
                onClick={() => openConversation(conversation.id)}
                aria-label={`${conversation.spoken}. ${isOpened ? "Đã mở điều chưa nói." : "Mở điều chưa nói."}`}
              >
                <span>{conversation.spoken}</span>
              </button>
            );
          })}
        </div>
      </section>


      {isComplete && (
        <motion.div
          className="winter-complete"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Không phải điều gì cũng được nói trọn vẹn. Nhưng tình yêu của anh và em vẫn luôn thắp lên hi vọng cho bọn mình, sưởi ấm bọn mình.</p>
          <button type="button" className="scene-cta" onClick={onComplete}>
            Cùng bước tiếp
          </button>
        </motion.div>
      )}

      <MemoryModal
        isOpen={Boolean(activeConversation)}
        onClose={() => setActiveId(null)}
        eyebrow="Điều còn lại phía sau"
        title={activeConversation?.spoken ?? ""}
        tone="tone-winter"
      >
        {activeConversation && (
          <div className="winter-dialogue">
            <p>{activeConversation.unsaid}</p>
            {!activeConversation.resolves && <span>Không phải mọi điều đều có câu trả lời ngay lúc ấy.</span>}
          </div>
        )}
      </MemoryModal>

      <MemoryModal
        isOpen={isWarmMemoryOpen}
        onClose={() => setIsWarmMemoryOpen(false)}
        eyebrow="Những ngày vẫn vui"
        title="Có những điều rất đáng nhớ"
        tone="tone-winter winter-memory-modal"
      >
        <div className="winter-memory-letter">
          {warmMemoryLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <MemoryVideo stage={4} />
        <MemoryGallery stage={4} photos={[1, 2, 3, 4, 5, 6, 7, 8]} label="Những kỷ niệm ấm áp của chúng ta" />
      </MemoryModal>
    </section>
  );
}