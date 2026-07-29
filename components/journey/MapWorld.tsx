import { journeyStages } from "../../data/journey";
import { getStagePosition, type JourneyLayout } from "./journey-route";

type MapWorldProps = {
  completedStages: number[];
  currentStage: number;
  layout?: JourneyLayout;
};

export function MapWorld({ completedStages, currentStage, layout = "desktop" }: MapWorldProps) {
  return (
    <div className="map-world" aria-hidden="true">
      {journeyStages.map((stage) => {
        const isCompleted = completedStages.includes(stage.order);
        const isCurrent = stage.order === currentStage && !isCompleted;
        const isLocked = !isCompleted && !isCurrent;
        const position = getStagePosition(stage.order, layout);

        return (
          <div
            key={stage.id}
            className={`map-region region-${stage.id}${isCompleted ? " is-completed" : ""}${
              isCurrent ? " is-current" : ""
            }${isLocked ? " is-locked" : ""}`}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
          >
            <span className="region-terrain" />
            <span className="region-motif" />
            <span className="region-fog" />
            <span className="region-bloom" />
          </div>
        );
      })}
    </div>
  );
}