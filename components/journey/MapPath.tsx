import { fullRoute, routeSegments, segmentId } from "./journey-route";

type MapPathProps = {
  /** Stages already finished — their legs stay lit. */
  completedStages: number[];
  /** The leg currently being walked, if any. */
  travellingSegment: number | null;
};

export function MapPath({ completedStages, travellingSegment }: MapPathProps) {
  return (
    <svg className="map-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {/* The faint full road, always visible so the shape of the journey stays readable. */}
      <path className="map-path-base" d={fullRoute} vectorEffect="non-scaling-stroke" />

      {routeSegments.map((segment, index) => {
        const segmentNumber = index + 1;
        const isCompleted = completedStages.includes(segmentNumber);
        const isDrawing = travellingSegment === segmentNumber;

        return (
          <path
            key={segmentNumber}
            id={segmentId(segmentNumber)}
            className={`map-path-leg${isCompleted ? " is-completed" : ""}${isDrawing ? " is-drawing" : ""}`}
            d={segment}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
