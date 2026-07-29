"use client";

import { useCallback, useMemo, useState } from "react";

export const TOTAL_STAGES = 8;

export type JourneyState = {
  currentStage: number;
  completedStages: number[];
  activeScene: number | null;
  isMoving: boolean;
  isTransitioning: boolean;
  musicEnabled: boolean;
  hasStarted: boolean;
};

const initialState: JourneyState = {
  currentStage: 1,
  completedStages: [],
  activeScene: null,
  isMoving: false,
  isTransitioning: false,
  musicEnabled: false,
  hasStarted: false,
};

export function useJourneyState() {
  const [state, setState] = useState<JourneyState>(initialState);

  const hasFinishedJourney = state.completedStages.length >= TOTAL_STAGES;

  /** A stage opens when it is the current one, or when the whole journey is done and it was visited. */
  const isStageAvailable = useCallback(
    (stage: number) => stage === state.currentStage || state.completedStages.includes(stage),
    [state.completedStages, state.currentStage],
  );

  const openMap = useCallback(() => {
    setState((current) => ({ ...current, hasStarted: true, musicEnabled: true, isTransitioning: false }));
  }, []);

  const returnToCafe = useCallback(() => {
    setState((current) => ({ ...current, hasStarted: false, activeScene: null, isMoving: false, musicEnabled: false }));
  }, []);

  const returnToMap = useCallback(() => {
    setState((current) => ({ ...current, activeScene: null, isMoving: false, isTransitioning: false }));
  }, []);

  const beginStageTravel = useCallback(
    (stage: number) => {
      if (state.isMoving || state.isTransitioning) return false;
      if (!isStageAvailable(stage)) return false;
      setState((current) => ({ ...current, activeScene: null, isMoving: true, isTransitioning: true }));
      return true;
    },
    [isStageAvailable, state.isMoving, state.isTransitioning],
  );

  const arriveAtStage = useCallback((stage: number) => {
    setState((current) => ({ ...current, activeScene: stage, isMoving: false, isTransitioning: false }));
  }, []);

  const completeStage = useCallback((stage: number) => {
    setState((current) => {
      const completedStages = current.completedStages.includes(stage)
        ? current.completedStages
        : [...current.completedStages, stage];

      return {
        ...current,
        completedStages,
        currentStage: Math.min(TOTAL_STAGES, Math.max(current.currentStage, stage + 1)),
        activeScene: null,
        isMoving: false,
        isTransitioning: false,
      };
    });
  }, []);

  /** Replay from the very beginning without losing which stages were unlocked. */
  const restartJourney = useCallback(() => {
    setState((current) => ({ ...current, activeScene: null, hasStarted: true, isMoving: false, isTransitioning: false }));
  }, []);

  const setMusicEnabled = useCallback((musicEnabled: boolean) => {
    setState((current) => ({ ...current, musicEnabled }));
  }, []);

  return useMemo(
    () => ({
      state,
      hasFinishedJourney,
      isStageAvailable,
      openMap,
      returnToCafe,
      returnToMap,
      beginStageTravel,
      arriveAtStage,
      completeStage,
      restartJourney,
      setMusicEnabled,
    }),
    [
      arriveAtStage,
      beginStageTravel,
      completeStage,
      hasFinishedJourney,
      isStageAvailable,
      openMap,
      restartJourney,
      returnToCafe,
      returnToMap,
      setMusicEnabled,
      state,
    ],
  );
}
