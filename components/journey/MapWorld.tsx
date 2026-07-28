import { journeyStages } from "../../data/journey";

type MapWorldProps = {
  completedStages: number[];
  currentStage: number;
};

/**
 * The eight regions of the map. Each carries its own landscape motif, and the
 * light shifts across the map: bright and green at the start, cold in the middle,
 * dark near the end, dawn pink at the last stage (spec §8).
 */
export function MapWorld({ completedStages, currentStage }: MapWorldProps) {
  return (
    <div className="map-world" aria-hidden="true">
      {journeyStages.map((stage) => {
        const isCompleted = completedStages.includes(stage.order);
        const isCurrent = stage.order === currentStage && !isCompleted;
        const isLocked = !isCompleted && !isCurrent;

        return (
          <div
            key={stage.id}
            className={`map-region region-${stage.id}${isCompleted ? " is-completed" : ""}${
              isCurrent ? " is-current" : ""
            }${isLocked ? " is-locked" : ""}`}
            style={{ left: `${stage.position.x}%`, top: `${stage.position.y}%` }}
          >
            <span className="region-terrain" />
            <span className="region-motif" />
            {/* Unopened land stays under fog; finished land keeps a small bloom. */}
            <span className="region-fog" />
            <span className="region-bloom" />
          </div>
        );
      })}
    </div>
  );
}
