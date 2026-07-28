"use client";

import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { journeyStages } from "../../data/journey";
import { pointOnSegment } from "./journey-route";

type CoupleCharactersProps = {
  /** Where the couple currently stands. */
  fromStage: number;
  /** Where they are heading, or null when standing still. */
  toStage: number | null;
  onArrival: () => void;
};

export function CoupleCharacters({ fromStage, toStage, onArrival }: CoupleCharactersProps) {
  const walkerRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  // Kept in a ref so a new callback identity never restarts the walk mid-animation.
  const arrivalRef = useRef(onArrival);
  arrivalRef.current = onArrival;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const walker = walkerRef.current;
    if (!walker) return;

    const origin = journeyStages[fromStage - 1]?.position ?? journeyStages[0].position;

    const place = (x: number, y: number) => {
      walker.style.left = `${x}%`;
      walker.style.top = `${y}%`;
    };

    // Standing still: sit exactly on the current node.
    if (toStage === null) {
      place(origin.x, origin.y);
      return;
    }

    const target = journeyStages[toStage - 1]?.position ?? origin;

    // Reduced motion replaces the walk with a short move (spec §25).
    if (reduceMotion) {
      place(target.x, target.y);
      const timer = window.setTimeout(() => arrivalRef.current(), 400);
      return () => window.clearTimeout(timer);
    }

    const isForwardLeg = toStage === fromStage + 1;

    const context = gsap.context(() => {
      // Walking forward traces the drawn leg; the couple and the road therefore use
      // the same percentage coordinates and stay locked together at any aspect ratio.
      if (isForwardLeg) {
        const progress = { t: 0 };
        place(origin.x, origin.y);

        gsap.to(progress, {
          t: 1,
          duration: 4.4,
          ease: "power1.inOut",
          onUpdate: () => {
            const point = pointOnSegment(fromStage, progress.t);
            place(point.x, point.y);
          },
          onComplete: () => arrivalRef.current(),
        });
      } else {
        // Revisiting an earlier stage moves straight there.
        const position = { x: origin.x, y: origin.y };
        gsap.to(position, {
          x: target.x,
          y: target.y,
          duration: 3.2,
          ease: "power2.inOut",
          onUpdate: () => place(position.x, position.y),
          onComplete: () => arrivalRef.current(),
        });
      }

      // The bob is a separate element so it never fights the walk for position.
      gsap.to(figureRef.current, { y: -3, duration: 0.58, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });

    return () => context.revert();
  }, [fromStage, toStage, reduceMotion]);

  return (
    <div
      ref={walkerRef}
      className={`map-walker${toStage !== null ? " is-walking" : ""}`}
      style={{ left: `${journeyStages[0].position.x}%`, top: `${journeyStages[0].position.y}%` }}
      aria-hidden="true"
    >
      <div ref={figureRef} className="map-walker-figure">
        {/* Small against the landscape and seen from behind (spec §9). */}
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
