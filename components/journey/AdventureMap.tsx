"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";
import { journeyStages } from "../../data/journey";
import type { JourneyState } from "../../hooks/useJourneyState";
import { CoupleCharacters } from "./CoupleCharacters";
import { JourneyProgress } from "./JourneyProgress";
import { MapNode } from "./MapNode";
import { MapPath } from "./MapPath";
import { MapWorld } from "./MapWorld";
import { StageReveal } from "./StageReveal";

type AdventureMapProps = {
  state: JourneyState;
  hasFinishedJourney: boolean;
  onReturnToCafe: () => void;
  onBeginStageTravel: (stage: number) => boolean;
  onArriveAtStage: (stage: number) => void;
};

export function AdventureMap({
  state,
  hasFinishedJourney,
  onReturnToCafe,
  onBeginStageTravel,
  onArriveAtStage,
}: AdventureMapProps) {
  /** Which stage the couple is walking towards. Null while standing still. */
  const [travellingTo, setTravellingTo] = useState<number | null>(null);
  /** The stage whose photograph is currently opening over the map. */
  const [revealStage, setRevealStage] = useState<number | null>(null);

  /** Where the couple stands: the furthest stage already reached. */
  const standingAt = state.completedStages.length > 0 ? Math.max(...state.completedStages) : 1;

  function getStatus(stage: number) {
    if (travellingTo === stage) return "active" as const;
    if (state.completedStages.includes(stage)) return "completed" as const;
    if (stage === state.currentStage) return "available" as const;
    return "locked" as const;
  }

  function beginStage(stage: number) {
    const hasStarted = onBeginStageTravel(stage);
    if (hasStarted) setTravellingTo(stage);
    return hasStarted;
  }

  /** The walk ends at the node; the stage photograph then opens out of it. */
  function handleArrival() {
    if (travellingTo === null) return;
    setRevealStage(travellingTo);
  }

  function handleRevealDone() {
    if (revealStage === null) return;
    const arrived = revealStage;
    setRevealStage(null);
    setTravellingTo(null);
    onArriveAtStage(arrived);
  }

  const travellingStage = travellingTo ? journeyStages[travellingTo - 1] : undefined;
  const nextStage = journeyStages[state.currentStage - 1];

  return (
    <section className="adventure-map" aria-label="Bản đồ hành trình">
      <div className="sr-status" role="status" aria-live="polite">
        {travellingStage
          ? `Hai người đang đi đến ${travellingStage.title}.`
          : hasFinishedJourney
            ? "Đã đi hết tám chặng. Có thể mở lại bất kỳ chặng nào."
            : `Chặng ${nextStage?.title ?? ""} đang sẵn sàng.`}
      </div>

      <header className="map-header">
        <button type="button" className="return-button" onClick={onReturnToCafe}>
          <ArrowLeft size={15} weight="bold" />
          Trở lại thuở ban đầu
        </button>
        <div className="map-introduction">
          <p>Những ký ức của chúng ta</p>
          <h1>Hành trình của chúng ta</h1>
          <span className="map-subtitle">Tám chặng, một con đường để cùng nhớ lại.</span>
        </div>
        <JourneyProgress currentStage={state.currentStage} completedStages={state.completedStages} />
      </header>

      <div className="map-window">
        <div className="map-viewport">
          <div className="map-canvas">
            <div className="map-paper" aria-hidden="true" />
            <MapWorld completedStages={state.completedStages} currentStage={state.currentStage} />
            <div className="map-tint" aria-hidden="true" />
            <MapPath completedStages={state.completedStages} travellingSegment={travellingTo ? travellingTo - 1 : null} />
            <CoupleCharacters fromStage={standingAt} toStage={travellingTo} onArrival={handleArrival} />
            {journeyStages.map((stage) => (
              <MapNode
                key={stage.id}
                stage={stage}
                status={getStatus(stage.order)}
                isSelected={travellingTo === stage.order || state.currentStage === stage.order}
                isReplayable={hasFinishedJourney}
                onSelect={beginStage}
              />
            ))}
          </div>
        </div>
      </div>

      {revealStage !== null && journeyStages[revealStage - 1] && (
        <StageReveal
          stage={revealStage}
          x={journeyStages[revealStage - 1].position.x}
          y={journeyStages[revealStage - 1].position.y}
          title={journeyStages[revealStage - 1].title}
          subtitle={journeyStages[revealStage - 1].subtitle}
          onDone={handleRevealDone}
        />
      )}

      <p className="map-guidance">
        {travellingStage
          ? `Đang đi đến ${travellingStage.title}…`
          : hasFinishedJourney
            ? "Chọn bất kỳ chặng nào để đọc lại."
            : `Chọn ${nextStage?.title ?? "chặng tiếp theo"} để đi tiếp.`}
      </p>
    </section>
  );
}
