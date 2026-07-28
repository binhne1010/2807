export type MemoryMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
  date?: string;
};

export type JourneyStage = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  period?: string;
  description: string[];
  theme: string;
  status: "locked" | "available" | "active" | "completed";
  position: { x: number; y: number };
  camera: { x: number; y: number; scale: number };
  media: MemoryMedia[];
  messages: string[];
};

/** Twelve photo slots plus one video slot per stage. Missing files fall back to artwork. */
const stageMedia = (stage: number): MemoryMedia[] => [
  ...Array.from({ length: 12 }, (_, index) => ({
    id: `stage-${stage}-photo-${String(index + 1).padStart(2, "0")}`,
    type: "image" as const,
    src: `/memories/stage-${stage}/photo-${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `Kỷ niệm chặng ${stage}, ảnh ${index + 1}`,
  })),
  {
    id: `stage-${stage}-video-01`,
    type: "video",
    src: `/memories/stage-${stage}/video-01.mp4`,
    alt: `Video kỷ niệm chặng ${stage}`,
  },
];

type StageSeed = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  theme: string;
  position: { x: number; y: number };
  camera: { x: number; y: number; scale: number };
  description: string[];
  messages: string[];
};

/* MapCamera centres each node automatically from `position`; camera.x/y are optional
   percentage nudges on top of that, and `scale` is the zoom for the stage. */
const stageSeed: StageSeed[] = [
  {
    id: "moc-chau",
    title: "Những ngày đầu",
    subtitle: "Từ những lần gặp đầu tiên đến Mộc Châu",
    period: "27.01.2025",
    theme: "stage-1",
    position: { x: 17, y: 68 },
    camera: { x: 0, y: 0, scale: 1.22 },
    description: [
      "Những kỷ niệm đầu tiên, những bức ảnh đầu tiên và chuyến đi đầu tiên của hai người.",
      "Mộc Châu mùa lạnh, đồi chè, sương mỏng và một chuyến đi anh vẫn nhớ như một khoảng thời gian rất ấm.",
    ],
    messages: [
      "Chuyến đi đầu tiên của chúng ta là vào những ngày trời lạnh. Nhưng có lẽ vì có em, anh lại nhớ về nó như một khoảng thời gian rất ấm áp.",
    ],
  },
  {
    id: "summer",
    title: "Mùa hè bình yên",
    subtitle: "Những ngày đơn giản mà vui",
    period: "Mùa hè 2025",
    theme: "stage-2",
    position: { x: 31, y: 46 },
    camera: { x: 0, y: 0, scale: 1.2 },
    description: [
      "Đi chơi, xem phim, đi ăn, đi dạo và dành thời gian ở bên nhau.",
      "Quãng thời gian vui vẻ và bình yên nhất, khi không cần điều gì quá đặc biệt.",
    ],
    messages: [
      "Có một khoảng thời gian, tình yêu của chúng ta thật đơn giản. Chỉ cần gặp nhau, đi đâu đó, xem một bộ phim hoặc cùng ngồi cạnh nhau là đã đủ vui.",
    ],
  },
  {
    id: "first-birthday",
    title: "Sinh nhật đầu tiên",
    subtitle: "Một căn phòng ấm và gần gũi",
    period: "Sinh nhật đầu tiên bên nhau",
    theme: "stage-3",
    position: { x: 44, y: 61 },
    camera: { x: 0, y: 0, scale: 1.24 },
    description: [
      "Lần đầu tiên anh được đón sinh nhật cùng em, trong một không gian riêng tư và gần gũi.",
      "Dù đã có những cãi vã nhỏ, cả hai vẫn có một ngày vui vẻ bên nhau.",
    ],
    messages: [
      "Đó là lần đầu tiên anh được đón sinh nhật cùng em. Không phải mọi khoảnh khắc đều hoàn hảo, nhưng anh vẫn nhớ ngày hôm ấy như một ngày rất gần gũi và ấm áp.",
    ],
  },
  {
    id: "winter",
    title: "Mùa đông",
    subtitle: "Những khoảng cách bắt đầu xuất hiện",
    period: "Mùa đông",
    theme: "stage-4",
    position: { x: 58, y: 38 },
    camera: { x: 0, y: 0, scale: 1.18 },
    description: [
      "Mùa đông bắt đầu, và giữa hai người xuất hiện nhiều cãi vã cùng những điều chưa hiểu được nhau.",
      "Hai người đi chơi ít hơn, nhưng vẫn lựa chọn ở bên nhau.",
    ],
    messages: [
      "Chúng ta bắt đầu có những điều không hiểu được nhau. Có những cuộc nói chuyện không đi đến đâu. Nhưng giữa những ngày lạnh nhất, cả hai vẫn chọn chưa rời đi.",
    ],
  },
  {
    id: "recovery",
    title: "Biến cố và những ngày call video",
    subtitle: "Khoảng cách, những cuộc gọi và sự quan tâm",
    period: "Sinh nhật online",
    theme: "stage-5",
    position: { x: 68, y: 57 },
    camera: { x: 0, y: 0, scale: 1.2 },
    description: [
      "Anh gặp biến cố và bị gãy tay. Hai người xa nhau về khoảng cách, nhưng vẫn trò chuyện qua điện thoại.",
      "Cuối cùng em vẫn đến, mang theo đồ ăn và cùng anh đón một sinh nhật online.",
    ],
    messages: [
      "Dù em không xuất hiện theo cách anh đã mong đợi, anh vẫn nhớ khoảnh khắc em đến và mang theo sự quan tâm của mình.",
    ],
  },
  {
    id: "tet",
    title: "Tết và chuyến đi mới",
    subtitle: "Niềm vui, rồi học cách hiểu nhau",
    period: "Tết",
    theme: "stage-6",
    position: { x: 77, y: 30 },
    camera: { x: 0, y: 0, scale: 1.18 },
    description: [
      "Hai người bắt đầu đón Tết cùng nhau và có thêm một chuyến du lịch mới.",
      "Đầu giai đoạn rất vui, nhưng về cuối lại là một câu hỏi lớn: hai người có thể thấu hiểu và chấp nhận nhau hay không.",
    ],
    messages: [
      "Tình yêu không phải lúc nào cũng là tìm được một người giống mình. Đôi khi, đó là học cách hiểu và chấp nhận một người khác mình.",
      "Cảm ơn em vì dù có những lúc rất khó khăn, em vẫn chọn ở lại.",
    ],
  },
  {
    id: "silent-fire",
    title: "Đốm lửa",
    subtitle: "Im lặng, suy tư và điều chưa từng tắt",
    period: "Một tháng im lặng",
    theme: "stage-7",
    position: { x: 85, y: 62 },
    camera: { x: 0, y: 0, scale: 1.22 },
    description: [
      "Hai người xa cách dần. Những cuộc cãi vã không có hồi kết, và đỉnh điểm là một tháng im lặng.",
      "Một không gian tối, hai người ngồi cách nhau, và ở giữa vẫn còn một đốm lửa nhỏ chưa tắt.",
    ],
    messages: [
      "Có những khoảng lặng khiến hai người xa nhau. Nhưng trong anh, vẫn còn một điều chưa từng thật sự tắt.",
    ],
  },
  {
    id: "birthday-field",
    title: "Sinh Nhật Cún",
    subtitle: "Bình yên, chân thành và hy vọng",
    period: "Sinh nhật của em",
    theme: "stage-8",
    position: { x: 93, y: 42 },
    camera: { x: 0, y: 0, scale: 1.2 },
    description: [
      "Chặng cuối cùng, và là ngày sinh nhật của em.",
      "Một cánh đồng hoa, một con đường nhỏ, và một món quà đặt ở cuối con đường.",
    ],
    messages: [
      "Cảm ơn em vì đã cùng anh đi qua toàn bộ hành trình này.",
      "Có những điều anh muốn nói bằng chính giọng nói của mình.",
    ],
  },
];

export const journeyStages: JourneyStage[] = stageSeed.map((seed, index) => ({
  ...seed,
  order: index + 1,
  status: index === 0 ? "available" : "locked",
  media: stageMedia(index + 1),
}));

/** Closing letter, revealed one paragraph at a time (spec §19). */
export const finalMessageLines: string[] = [
  "Chúc mừng sinh nhật Cún 28/07/2026",
  "Cảm ơn Cún đã xuất hiện trong cuộc đời anh .",
  "Cảm ơn Cún những ngày vui vẻ, những chuyến đi, những khoảnh khắc bình thường và cả những lần chúng ta vẫn chọn ở lại.",
  "Anh xin lỗi vì những lúc anh chưa biết cách lắng nghe, vì những lời nói chưa thực hiện và hành động đã làm em tổn thương.",
  "Anh không mong món quà này có thể xóa đi những điều đã xảy ra. Anh chỉ mong nó giúp Cún hiểu rằng anh thật lòng trân trọng những gì chúng ta đã có.",
  "Anh chúc Cún tuổi mới luôn bình an, vui vẻ luôn nở nụ cười trên môi vì lúc đó lúc Cún xinh nhất",
  "Cảm ơn Cún vì đã cùng anh đi qua cả một hành trình. Mình nói chuyện với nhau nha",
  "Một câu nói nhỏ: 'Cún ơi anh không chịu nổi nữa rồi, anh xin lỗi Cún Cún trở về NHÀ với Anh nha'"
  
];

export const finalVideoSrc = "/memories/final/birthday-video.mp4";

/** Artwork used whenever a personal photo or video has not been added yet. */
export const stageArtwork: Record<number, string> = {
  1: "/images/memory-moc-chau-film.png",
  2: "/images/memory-flower-field-film.png",
  3: "/images/memory-birthday-film.png",
  4: "/images/memory-birthday-film.png",
  5: "/images/memory-birthday-film.png",
  6: "/images/memory-moc-chau-film.png",
  7: "/images/memory-birthday-film.png",
  8: "/images/memory-flower-field-film.png",
};

export const journeyStartDate = "27.01.2025";

/**
 * Each chapter has its own song, dropped in as /public/memories/stage-N/music.mp3.
 * A missing file simply plays nothing. The intro and the map use the shared ambience.
 */
export const stageMusicSrc = (stage: number) => `/memories/stage-${stage}/music.mp3`;

export const ambienceSrc = "/memories/final/ambience.mp3";
