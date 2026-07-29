import {
  fullRoute,
  mobileFullRoute,
  mobileRouteSegments,
  routeSegments,
  segmentId,
  type JourneyLayout,
} from "./journey-route";

type MapPathProps = {
  /** Stages already finished. Their legs stay lit. */
  completedStages: number[];
  /** The leg currently being walked, if any. */
  travellingSegment: number | null;
  layout?: JourneyLayout;
};

export function MapPath({ completedStages, travellingSegment, layout = "desktop" }: MapPathProps) {
  const route = layout === "mobile" ? mobileFullRoute : fullRoute;
  const segments = layout === "mobile" ? mobileRouteSegments : routeSegments;

  return (
    <svg className="map-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path className="map-path-base" d={route} vectorEffect="non-scaling-stroke" />

      {segments.map((segment, index) => {
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