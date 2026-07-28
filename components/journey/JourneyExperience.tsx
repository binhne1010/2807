"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";


import { STAGE_VIDEO_AUDIO_START, STAGE_VIDEO_AUDIO_STOP } from "../../hooks/useStageVideoAutoplay";
import { useJourneyState } from "../../hooks/useJourneyState";
import { StageEightBirthdayField } from "../stages/StageEightBirthdayField";
import { StageFiveRecovery } from "../stages/StageFiveRecovery";
import { StageFourWinterConflict } from "../stages/StageFourWinterConflict";
import { StageSevenSilentFire } from "../stages/StageSevenSilentFire";
import { StageSixTetJourney } from "../stages/StageSixTetJourney";
import { StageThreeFirstBirthday } from "../stages/StageThreeFirstBirthday";
import { AdventureMap } from "./AdventureMap";
import { IntroCafeScene } from "./IntroCafeScene";
import { MocChauScene } from "./MocChauScene";
import { MusicControl } from "./MusicControl";
import { SceneTransition } from "./SceneTransition";
import { SummerScene } from "./SummerScene";
import { BACKGROUND_MUSIC_REQUEST, BACKGROUND_MUSIC_STOP, YouTubeBackgroundMusic } from "./YouTubeBackgroundMusic";

export function JourneyExperience() {
  const [isVideoAudible, setIsVideoAudible] = useState(false);
  const {
    state,
    hasFinishedJourney,
    openMap,
    returnToCafe,
    returnToMap,
    beginStageTravel,
    arriveAtStage,
    completeStage,
    restartJourney,
    setMusicEnabled,
  } = useJourneyState();

  useEffect(() => {
    const pauseBackground = () => setIsVideoAudible(true);
    const resumeBackground = () => setIsVideoAudible(false);
    window.addEventListener(STAGE_VIDEO_AUDIO_START, pauseBackground);
    window.addEventListener(STAGE_VIDEO_AUDIO_STOP, resumeBackground);
    return () => {
      window.removeEventListener(STAGE_VIDEO_AUDIO_START, pauseBackground);
      window.removeEventListener(STAGE_VIDEO_AUDIO_STOP, resumeBackground);
    };
  }, []);

  function toggleMusic() {
    const willEnableMusic = !state.musicEnabled;
    setMusicEnabled(willEnableMusic);
    window.dispatchEvent(new Event(willEnableMusic ? BACKGROUND_MUSIC_REQUEST : BACKGROUND_MUSIC_STOP));
  }
  /** Each stage returns to the map or unlocks the next one. */
  function renderStage(stage: number): ReactNode {
    const stageProps = {
      onReturnToMap: returnToMap,
      onComplete: () => completeStage(stage),
    };

    switch (stage) {
      case 1:
        return <MocChauScene {...stageProps} />;
      case 2:
        return <SummerScene {...stageProps} />;
      case 3:
        return <StageThreeFirstBirthday {...stageProps} />;
      case 4:
        return <StageFourWinterConflict {...stageProps} />;
      case 5:
        return <StageFiveRecovery {...stageProps} />;
      case 6:
        return <StageSixTetJourney {...stageProps} />;
      case 7:
        return <StageSevenSilentFire {...stageProps} />;
      case 8:
        return (
          <StageEightBirthdayField
            onReturnToMap={returnToMap}
            onRestart={restartJourney}
            onDuckMusic={() => undefined}
          />
        );
      default:
        return null;
    }
  }

  return (
    <main className="journey-root">
      <YouTubeBackgroundMusic isEnabled={state.musicEnabled} isSuspended={isVideoAudible} />
      <AnimatePresence mode="wait">
        {!state.hasStarted ? (
          <SceneTransition key="cafe" variant="map">
            <IntroCafeScene onOpenMap={openMap} />
          </SceneTransition>
        ) : state.activeScene !== null ? (
          <SceneTransition key={`stage-${state.activeScene}`}>{renderStage(state.activeScene)}</SceneTransition>
        ) : (
          <SceneTransition key="map" variant="map">
            <AdventureMap
              state={state}
              hasFinishedJourney={hasFinishedJourney}
              onReturnToCafe={returnToCafe}
              onBeginStageTravel={beginStageTravel}
              onArriveAtStage={arriveAtStage}
            />
          </SceneTransition>
        )}
      </AnimatePresence>

      {/* The music toggle stays reachable from every scene (spec §23). */}
      {state.hasStarted && (
        <MusicControl isEnabled={state.musicEnabled} onToggle={toggleMusic} />
      )}
    </main>
  );
}
