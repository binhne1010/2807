"use client";

import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

type MusicControlProps = {
  isEnabled: boolean;
  onToggle: () => void;
};

/** Corner toggle, always reachable so the music can be turned off (spec §25). */
export function MusicControl({ isEnabled, onToggle }: MusicControlProps) {
  return (
    <button
      type="button"
      className={`music-control${isEnabled ? " is-on" : ""}`}
      onClick={onToggle}
      aria-label={isEnabled ? "Tắt nhạc nền" : "Bật nhạc nền"}
      aria-pressed={isEnabled}
    >
      {isEnabled ? <SpeakerHigh size={18} weight="fill" /> : <SpeakerSlash size={18} weight="fill" />}
      <span>{isEnabled ? "Tắt nhạc" : "Bật nhạc"}</span>
    </button>
  );
}
