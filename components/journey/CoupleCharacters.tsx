"use client";

import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { getStagePosition, pointOnSegment, type JourneyLayout } from "./journey-route";

type CoupleCharactersProps = {
  /** Where the couple currently stands. */
  fromStage: number;
  /** Where they are heading, or null when standing still. */
  toStage: number | null;
  onArrival: () => void;
  layout?: JourneyLayout;
};

export function CoupleCharacters({ fromStage, toStage, onArrival, layout = "desktop" }: CoupleCharactersProps) {
  const walkerRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const walker = walkerRef.current;
    if (!walker) return;

    const origin = getStagePosition(fromStage, layout);
    const place = (x: number, y: number) => {
      walker.style.left = `${x}%`;
      walker.style.top = `${y}%`;
    };

    if (toStage === null) {
      place(origin.x, origin.y);
      return;
    }

    const target = getStagePosition(toStage, layout);
    if (reduceMotion) {
      place(target.x, target.y);
      const timer = window.setTimeout(() => onArrival(), 400);
      return () => window.clearTimeout(timer);
    }

    const isForwardLeg = toStage === fromStage + 1;
    const context = gsap.context(() => {
      if (isForwardLeg) {
        const progress = { t: 0 };
        place(origin.x, origin.y);
        gsap.to(progress, {
          t: 1,
          duration: layout === "mobile" ? 1.6 : 4.4,
          ease: "power1.inOut",
          onUpdate: () => {
            const point = pointOnSegment(fromStage, progress.t, layout);
            place(point.x, point.y);
          },
          onComplete: () => onArrival(),
        });
      } else {
        const position = { x: origin.x, y: origin.y };
        gsap.to(position, {
          x: target.x,
          y: target.y,
          duration: layout === "mobile" ? 1.2 : 3.2,
          ease: "power2.inOut",
          onUpdate: () => place(position.x, position.y),
          onComplete: () => onArrival(),
        });
      }

      gsap.to(figureRef.current, { y: -3, duration: 0.58, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });

    return () => context.revert();
  }, [fromStage, toStage, reduceMotion, layout, onArrival]);

  const firstPosition = getStagePosition(1, layout);

  return (
    <div
      ref={walkerRef}
      className={`map-walker${toStage !== null ? " is-walking" : ""}`}
      style={{ left: `${firstPosition.x}%`, top: `${firstPosition.y}%` }}
      aria-hidden="true"
    >
      <div ref={figureRef} className="map-walker-figure">
        <svg viewBox="-16 -22 32 34" className="couple-figures">
          <ellipse className="couple-shadow" cx="0" cy="10" rx="13" ry="2.6" />
          <circle cx="-5" cy="-15" r="4.2" />
          <path d="M-9.4 -9 Q-5 -12.4 -0.6 -9 L0.4 9 L-10.4 9 Z" />
          <circle cx="5" cy="-16" r="4.2" />
          <path d="M0.6 -9 Q5 -12.6 9.4 -9 L10.4 9 L-0.4 9 Z" />
        </svg>
      </div>
    </div>
  );
}