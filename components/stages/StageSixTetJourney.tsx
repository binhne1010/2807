"use client";

import { ArrowLeft, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { stageArtwork } from "../../data/journey";
import { MemoryImage } from "../memories/MemoryImage";
import { MemoryVideo } from "../memories/MemoryVideo";
import { StageVideoPlayer } from "../memories/StageVideoPlayer";

type StageProps = { onReturnToMap: () => void; onComplete: () => void };
type BookPageId = "tet" | "journeys" | "video" | "pin";
type BookPage = { id: BookPageId; eyebrow: string; title: string; photos?: number[] };

const bookPages: BookPage[] = [
  { id: "tet", eyebrow: "Trang 01 - 02", title: "Album Tết", photos: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: "journeys", eyebrow: "Trang 03 - 04", title: "Những chuyến đi", photos: [9, 10, 11, 12, 13, 14, 15, 16] },
  { id: "video", eyebrow: "Trang 05", title: "Ánh đèn đầu năm" },
  { id: "pin", eyebrow: "Trang cuối", title: "Dấu ghim còn lại" },
];

const roads = [
  { id: "understood", title: "Chỉ muốn được hiểu", description: "Có những lúc cả hai chỉ mong đối phương nghe mình thêm một chút. Đã cãi vã đã giận hờn tất cả chỉ để muốn vun đắp một tình yêu thật bình yên " },
  { id: "understand", title: "Học cách hiểu nhau", description: "Chậm hơn, khó hơn, nhưng là vẫn là cách để mình để mình đi tiếp sửa đổi sao cho pù hợp vs nhau. chấp nhận phàn không hoàn hảo của đối phương" },
];

function PhotoPreview({ photo, onClose }: { photo: number; onClose: () => void }) {
  return <motion.div className="tet-code-photo-preview" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}><button type="button" onClick={onClose}>Quay lại trang sổ</button><MemoryImage stage={6} photo={photo} alt={`Kỷ niệm số ${photo}`} sizes="(max-width: 767px) 90vw, 900px" priority /></motion.div>;
}

function PhotoCard({ photo, index, onSelect }: { photo: number; index: number; onSelect: (photo: number) => void }) {
  return <motion.button type="button" className={`tet-code-photo-card card-${index + 1}`} onClick={() => onSelect(photo)} aria-label={`Xem lớn ảnh kỷ niệm ${index + 1}`} initial={{ opacity: 0, y: 18, rotate: index % 2 ? 2 : -2 }} animate={{ opacity: 1, y: 0, rotate: index % 2 ? 1.2 : -1.1 }} transition={{ delay: 0.11 + index * 0.055, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}><MemoryImage stage={6} photo={photo} alt={`Kỷ niệm ${index + 1}`} sizes="(max-width: 767px) 20vw, 185px" priority={index < 4} /><span aria-hidden="true" /></motion.button>;
}

function PhotoSpread({ page, onSelect }: { page: BookPage; onSelect: (photo: number) => void }) {
  const photos = page.photos ?? [];
  return <div className="tet-code-spread tet-code-photo-spread"><section className="tet-code-paper tet-code-paper-left"><div className="tet-code-paper-kicker">{page.id === "tet" ? "Những ngày đầu năm" : "Từ những con đường đã đi"}</div><div className="tet-code-photo-grid">{photos.slice(0, 4).map((photo, index) => <PhotoCard key={photo} photo={photo} index={index} onSelect={onSelect} />)}</div></section><div className="tet-code-spine" aria-hidden="true"><i /><i /><i /><i /><i /></div><section className="tet-code-paper tet-code-paper-right"><div className="tet-code-paper-kicker">{page.id === "tet" ? "Cùng nhau giữ lại" : "Càng đi càng gần"}</div><div className="tet-code-photo-grid">{photos.slice(4, 8).map((photo, index) => <PhotoCard key={photo} photo={photo} index={index + 4} onSelect={onSelect} />)}</div></section></div>;
}

function VideoSpread() {
  return <div className="tet-code-spread tet-code-video-spread"><section className="tet-code-paper tet-code-paper-left"><div className="tet-code-film-frame"><MemoryVideo stage={6} /></div><p className="tet-code-film-caption">Một đoạn phim để nghe lại tiếng cười của hai đứa.</p></section><div className="tet-code-spine" aria-hidden="true"><i /><i /><i /><i /><i /></div><section className="tet-code-paper tet-code-paper-right tet-code-letter-page"><p className="tet-code-paper-kicker">Đèn lồng</p><h2>Một đoạn phim ở giữa những ngày đầu năm.</h2><p>Có những khoảnh khắc không cần kể lại, chỉ cần bấm phát là mọi cảm giác quay về.</p><span className="tet-code-pressed-flower" aria-hidden="true" /></section></div>;
}

function PinSpread({ onOpen }: { onOpen: () => void }) {
  return <div className="tet-code-spread tet-code-pin-spread"><section className="tet-code-paper tet-code-paper-left tet-code-pin-page"><button type="button" className="tet-code-pin-button" onClick={onOpen}><span className="tet-code-pin-seal" aria-hidden="true"><i /></span><strong>Dấu ghim</strong><small>Chạm để mở trang cuối</small></button></section><div className="tet-code-spine" aria-hidden="true"><i /><i /><i /><i /><i /></div><section className="tet-code-paper tet-code-paper-right tet-code-letter-page"><p className="tet-code-paper-kicker">Điều muốn nói</p><h2>Có một điều cuối cùng anh muốn hỏi em.</h2><p>Dù có những ngày vui, vẫn có những điều cần cả hai cùng lắng nghe.</p><span className="tet-code-ink-line" aria-hidden="true" /><span className="tet-code-pressed-flower" aria-hidden="true" /></section></div>;
}

export function StageSixTetJourney({ onReturnToMap, onComplete }: StageProps) {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isDecisionVisible, setIsDecisionVisible] = useState(false);
  const [chosenRoad, setChosenRoad] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const currentPage = bookPages[pageIndex] ?? bookPages[0];
  const chosenRoadData = roads.find((road) => road.id === chosenRoad);

  function nextPage() { setPageIndex((current) => Math.min(bookPages.length - 1, current + 1)); }
  function previousPage() { setPageIndex((current) => Math.max(0, current - 1)); }

  return (
    <section className={`tet-scene tet-codebook-scene${isBookOpen ? " is-book-open" : ""}${isDecisionVisible ? " is-decision" : ""}${chosenRoad ? " is-chosen" : ""}`} aria-label="Cuốn sổ kỷ niệm mùa xuân">
      <div className="tet-sky" aria-hidden="true" /><div className="tet-blossoms" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <span key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>
      {isDecisionVisible && <div className="tet-decision-video" aria-label="Video kỷ niệm trước câu hỏi"><StageVideoPlayer loop poster={stageArtwork[6]} source="/memories/stage-6/decision-video.mp4">Trình duyệt này không hỗ trợ phát video.</StageVideoPlayer><span className="tet-decision-video-wash" aria-hidden="true" /></div>}
      <div className="scene-grain" aria-hidden="true" /><div className="scene-vignette" aria-hidden="true" />
      <button type="button" className="scene-back" onClick={onReturnToMap}><ArrowLeft size={16} weight="bold" />Quay lại bản đồ</button>

      {!isBookOpen && !isDecisionVisible && <motion.section className="tet-code-cover-stage" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}><header><p className="scene-eyebrow">Tết và chuyến đi mới</p><h1>Cuốn sổ của hai đứa</h1><p>Những ngày đầu năm, những chuyến đi và một điều còn lại.</p></header><motion.button type="button" className="tet-code-cover" onClick={() => setIsBookOpen(true)} whileHover={reduceMotion ? undefined : { y: -8, rotate: -0.5 }} whileTap={{ scale: 0.985 }} aria-label="Mở cuốn sổ kỷ niệm"><span className="tet-code-cover-ribbon" aria-hidden="true" /><span className="tet-code-cover-ornament" aria-hidden="true">✦</span><strong>Kỷ niệm của chúng ta</strong><small>Chạm để mở</small></motion.button></motion.section>}

      {isBookOpen && !isDecisionVisible && <section className="tet-code-reader" aria-label="Đọc cuốn sổ kỷ niệm"><header className="tet-code-reader-heading"><p>{currentPage.eyebrow}</p><h1>{currentPage.title}</h1></header><AnimatePresence mode="wait">{selectedPhoto !== null ? <PhotoPreview key={`photo-${selectedPhoto}`} photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} /> : <motion.div key={currentPage.id} className="tet-code-page-turn" initial={reduceMotion ? false : { opacity: 0, rotateY: -18, x: 26 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: 16, x: -26 }} transition={{ duration: reduceMotion ? 0.12 : 0.54, ease: [0.22, 1, 0.36, 1] }}>{currentPage.photos ? <PhotoSpread page={currentPage} onSelect={setSelectedPhoto} /> : currentPage.id === "video" ? <VideoSpread /> : <PinSpread onOpen={() => setIsDecisionVisible(true)} />}</motion.div>}</AnimatePresence>{selectedPhoto === null && <nav className="tet-code-reader-controls" aria-label="Lật trang"><button type="button" onClick={previousPage} disabled={pageIndex === 0}><CaretLeft size={18} weight="bold" />Trang trước</button><span>{pageIndex + 1} / {bookPages.length}</span><button type="button" onClick={nextPage} disabled={pageIndex === bookPages.length - 1}>Trang sau<CaretRight size={18} weight="bold" /></button></nav>}</section>}

      <AnimatePresence mode="wait">
        {isDecisionVisible && !chosenRoad && <motion.section key="question" className="tet-decision" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.14 : 0.86, ease: [0.22, 1, 0.36, 1] }}><p className="scene-eyebrow">Sau những ngày rất vui</p><h1>Hai đứa có thể hiểu và chấp nhận nhau không?</h1><div className="tet-road-choices">{roads.map((road) => <button key={road.id} type="button" className="tet-road-choice" onClick={() => setChosenRoad(road.id)}><span>{road.title}</span><small>{road.description}</small></button>)}</div></motion.section>}
        {isDecisionVisible && chosenRoad && <motion.section key="subtitle" className="tet-decision-subtitle" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.14 : 0.72, ease: [0.22, 1, 0.36, 1] }}><p className="tet-decision-chosen">{chosenRoadData?.title}</p><p className="tet-decision-copy">Tình yêu không phải lúc nào cũng là tìm được một người giống mình. Đôi khi, đó là học cách hiểu và chấp nhận một người khác mình.</p><p className="tet-decision-copy tet-decision-copy-secondary">Cảm ơn em vì dù có những lúc rất khó khăn, em vẫn chọn ở lại.</p><button type="button" className="tet-decision-next" onClick={onComplete}>Đi chặng tiếp theo <CaretRight size={18} weight="bold" /></button></motion.section>}      </AnimatePresence>
    </section>
  );
}