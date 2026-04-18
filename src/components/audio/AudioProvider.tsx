"use client";

import React, { createContext, useContext, useRef, useState, useCallback, ReactNode } from "react";

export type AudioState = {
  isUnmuted: boolean;
  setUnmuted: (v: boolean) => void;
  getContext: () => AudioContext | null;
  masterGain: () => GainNode | null;
};

const AudioContext_ = createContext<AudioState | null>(null);

const MASTER_GAIN_UNMUTED = 0.08;
const MASTER_GAIN_MUTED = 0;
const RAMP_DURATION = 0.06; // seconds for mute/unmute crossfade

export function AudioProvider({ children }: { children: ReactNode }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const [isUnmuted, setIsUnmuted] = useState(false);

  const getContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new window.AudioContext();
      const gain = ctxRef.current.createGain();
      gain.gain.setValueAtTime(MASTER_GAIN_MUTED, ctxRef.current.currentTime);
      gain.connect(ctxRef.current.destination);
      masterGainRef.current = gain;
    }
    return ctxRef.current;
  }, []);

  const masterGain = useCallback((): GainNode | null => {
    // Ensure context + gain node exist before returning
    getContext();
    return masterGainRef.current;
  }, [getContext]);

  const setUnmuted = useCallback((v: boolean) => {
    setIsUnmuted(v);
    const ctx = getContext();
    const gain = masterGainRef.current;
    if (!ctx || !gain) return;

    if (v) {
      // Resume suspended context (required after browser autoplay policy)
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => undefined);
      }
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(MASTER_GAIN_UNMUTED, now + RAMP_DURATION);
    } else {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(MASTER_GAIN_MUTED, now + RAMP_DURATION);
    }
  }, [getContext]);

  const value: AudioState = { isUnmuted, setUnmuted, getContext, masterGain };

  return (
    <AudioContext_.Provider value={value}>
      {children}
    </AudioContext_.Provider>
  );
}

export function useAudioContext(): AudioState {
  const ctx = useContext(AudioContext_);
  if (!ctx) {
    throw new Error("useAudioContext must be used inside <AudioProvider>");
  }
  return ctx;
}
