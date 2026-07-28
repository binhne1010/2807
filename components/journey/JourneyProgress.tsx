import { TOTAL_STAGES } from "../../hooks/useJourneyState";

type JourneyProgressProps = {
  currentStage: number;
  completedStages: number[];
};

export function JourneyProgress({ currentStage, completedStages }: JourneyProgressProps) {
  const completed = completedStages.length;
  const percent = Math.round((completed / TOTAL_STAGES) * 100);

  return (
    <aside className="journey-progress" aria-label="Tiến trình hành trình">
      <p>Hành trình</p>
      <strong>
        {completed}
        <span>/ {TOTAL_STAGES}</span>
      </strong>
      <span className="journey-progress-bar" aria-hidden="true">
        <span style={{ width: `${percent}%` }} />
      </span>
      <span>{completed === TOTAL_STAGES ? "Đã đi hết hành trình" : `Đang mở chặng ${currentStage}`}</span>
    </aside>
  );
}
