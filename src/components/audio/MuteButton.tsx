"use client";

import { useAudioContext } from "./AudioProvider";

function SpeakerOnIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Speaker cone */}
      <path
        d="M1.5 4.5H3.5L7 2V12L3.5 9.5H1.5V4.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Sound waves */}
      <path
        d="M9 4.5C9.8 5.2 10.3 6 10.3 7C10.3 8 9.8 8.8 9 9.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10.5 2.8C11.9 3.9 12.7 5.4 12.7 7C12.7 8.6 11.9 10.1 10.5 11.2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Speaker cone */}
      <path
        d="M1.5 4.5H3.5L7 2V12L3.5 9.5H1.5V4.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Slash */}
      <line
        x1="9"
        y1="4.5"
        x2="12.5"
        y2="9.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MuteButton() {
  const { isUnmuted, setUnmuted, getContext } = useAudioContext();

  function handleClick() {
    const next = !isUnmuted;

    if (next) {
      // First unmute — lazily create AudioContext and resume if suspended
      const ctx = getContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => undefined);
      }
    }

    setUnmuted(next);
  }

  const label = isUnmuted ? "Mute ambient audio" : "Unmute ambient audio";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isUnmuted}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-rule bg-ink/60 px-3 py-2 backdrop-blur-xl text-whisper transition hover:text-paper hover:shadow-[0_0_24px_rgba(184,186,255,0.25)]"
    >
      {isUnmuted ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
      <span className="font-mono text-xs uppercase tracking-[0.3em]">
        {isUnmuted ? "SOUND ON" : "SOUND OFF"}
      </span>
    </button>
  );
}
