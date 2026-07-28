import { journeyStages } from "../../data/journey";

type Point = { x: number; y: number };

/**
 * Converts a Catmull-Rom spline through the stage nodes into cubic bezier segments.
 * This guarantees the drawn road passes exactly through every node, so the walking
 * characters always finish on top of the marker they are heading to.
 */
function toBezierControlPoints(points: Point[], index: number) {
  const previous = points[index - 1] ?? points[index];
  const start = points[index];
  const end = points[index + 1];
  const next = points[index + 2] ?? points[index + 1];

  return {
    start,
    end,
    control1: { x: start.x + (end.x - previous.x) / 6, y: start.y + (end.y - previous.y) / 6 },
    control2: { x: end.x - (next.x - start.x) / 6, y: end.y - (next.y - start.y) / 6 },
  };
}

const nodePoints: Point[] = journeyStages.map((stage) => stage.position);

const round = (value: number) => Math.round(value * 100) / 100;

/** Control points per leg, in the same 0-100 percentage space as the node positions. */
export const routeSegmentPoints = nodePoints
  .slice(0, -1)
  .map((_, index) => toBezierControlPoints(nodePoints, index));

/** One path string per leg of the journey. Segment k joins stage k to stage k+1. */
export const routeSegments: string[] = routeSegmentPoints.map(({ start, end, control1, control2 }) => {
  return `M ${round(start.x)} ${round(start.y)} C ${round(control1.x)} ${round(control1.y)}, ${round(control2.x)} ${round(
    control2.y,
  )}, ${round(end.x)} ${round(end.y)}`;
});

/**
 * Position along a leg at t (0-1), returned as percentages of the map.
 * Used to walk the couple in the same coordinate space the road is drawn in,
 * which an SVG viewBox cannot guarantee once the canvas stops being square.
 */
export function pointOnSegment(segment: number, t: number): Point {
  const points = routeSegmentPoints[segment - 1];
  if (!points) return nodePoints[0];

  const { start, control1, control2, end } = points;
  const inverse = 1 - t;
  const a = inverse * inverse * inverse;
  const b = 3 * inverse * inverse * t;
  const c = 3 * inverse * t * t;
  const d = t * t * t;

  return {
    x: a * start.x + b * control1.x + c * control2.x + d * end.x,
    y: a * start.y + b * control1.y + c * control2.y + d * end.y,
  };
}

/** The full road, used for the faint base line under the progress line. */
export const fullRoute: string = nodePoints
  .slice(0, -1)
  .reduce((path, _, index) => {
    const { start, end, control1, control2 } = toBezierControlPoints(nodePoints, index);
    const head = index === 0 ? `M ${round(start.x)} ${round(start.y)} ` : "";
    return `${path}${head}C ${round(control1.x)} ${round(control1.y)}, ${round(control2.x)} ${round(control2.y)}, ${round(
      end.x,
    )} ${round(end.y)} `;
  }, "")
  .trim();

export const segmentId = (segment: number) => `journey-segment-${segment}`;
