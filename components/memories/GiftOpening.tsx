"use client";

import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { MemoryImage } from "./MemoryImage";

type GiftOpeningProps = { onOpened: () => void; };

const ringStages = [1, 2, 3, 4, 5, 6, 7];

export function GiftOpening({ onOpened }: GiftOpeningProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion) {
      root.classList.add("is-revealed");
      onOpened();
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: onOpened });
      timeline
        .to(".gift-box", { x: -3, duration: 0.09, repeat: 3, yoyo: true, ease: "sine.inOut" }, 0.2)
        .to(".gift-box", { x: 0, duration: 0.2, ease: "power2.out" })
        .to(".gift-ribbon-bow", { scale: 0.44, opacity: 0, duration: 0.65, ease: "power2.inOut" }, 0.78)
        .to(".gift-ribbon-band", { scaleX: 0, opacity: 0, duration: 0.72, ease: "power2.inOut" }, 0.94)
        .to(".gift-lid", { y: -102, rotate: -8, opacity: 0, duration: 1.25, ease: "power3.out" }, 1.42)
        .fromTo(".gift-light", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.45, ease: "power2.out" }, 1.78)
        .call(() => root.classList.add("is-revealed"), [], 2.08)
        .to(".gift-stage", { scale: 1.025, duration: 1.15, ease: "power2.inOut" }, 3.35);
    }, root);

    return () => context.revert();
  }, [onOpened, reduceMotion]);

  return (
    <div ref={rootRef} className="gift-opening" role="status" aria-live="polite">
      <p className="sr-status">Món quà đang được mở.</p>
      <div className="gift-stage">
        <div className="gift-light" aria-hidden="true" />
        <div className="gift-ring" aria-hidden="true">
          {ringStages.map((stage, index) => (
            <div key={stage} className="gift-ring-photo" style={{ "--photo-delay": `${index * 0.14}s` } as React.CSSProperties}>
              <MemoryImage stage={stage} photo={1} alt="" sizes="(max-width: 767px) 22vw, 10vw" />
            </div>
          ))}
        </div>
        <div className="gift-box" aria-hidden="true">
          <span className="gift-lid" />
          <span className="gift-body" />
          <span className="gift-ribbon-band" />
          <span className="gift-ribbon-bow" />
        </div>
      </div>
    </div>
  );
}