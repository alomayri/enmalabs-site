"use client";

import { useEffect, useRef } from "react";
import { useAudioContext } from "./AudioProvider";

export type AmbientParams = {
  frequency: number;   // Hz base (e.g. 120 for low drone, 220 for higher scene)
  detune?: number;     // cents offset for second oscillator, default 8
  filterCutoff?: number; // Hz low-pass cutoff, default 600
  gain?: number;       // local gain multiplied into master, default 1
  active?: boolean;    // if false, no oscillators are created; default true
};

const FADE_IN_DURATION = 2.5;  // seconds
const FADE_OUT_DURATION = 1.2; // seconds
const FILTER_Q = 0.8;

export function useAmbient({
  frequency,
  detune = 8,
  filterCutoff = 600,
  gain = 1,
  active = true,
}: AmbientParams): void {
  const { getContext, masterGain } = useAudioContext();
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;

    const ctx = getContext();
    const master = masterGain();

    if (!ctx || !master) return;

    // Build signal chain:
    // [osc1, osc2] → filter (lowpass) → localGain → masterGain → destination

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(filterCutoff, ctx.currentTime);
    filter.Q.setValueAtTime(FILTER_Q, ctx.currentTime);

    const localGain = ctx.createGain();
    localGain.gain.setValueAtTime(0, ctx.currentTime);

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(frequency, ctx.currentTime);

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc2.detune.setValueAtTime(detune, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(localGain);
    localGain.connect(master);

    osc1.start();
    osc2.start();

    // Fade in
    const now = ctx.currentTime;
    localGain.gain.linearRampToValueAtTime(gain, now + FADE_IN_DURATION);

    return () => {
      // Cancel any pending stop from a previous cleanup cycle
      if (stopTimerRef.current !== null) {
        clearTimeout(stopTimerRef.current);
      }

      // Fade out
      const fadeStart = ctx.currentTime;
      localGain.gain.cancelScheduledValues(fadeStart);
      localGain.gain.setValueAtTime(localGain.gain.value, fadeStart);
      localGain.gain.linearRampToValueAtTime(0, fadeStart + FADE_OUT_DURATION);

      // Stop oscillators after fade completes
      const stopDelay = (FADE_OUT_DURATION + 0.05) * 1000;
      stopTimerRef.current = setTimeout(() => {
        stopTimerRef.current = null;
        try {
          osc1.stop();
          osc2.stop();
          osc1.disconnect();
          osc2.disconnect();
          filter.disconnect();
          localGain.disconnect();
        } catch {
          // Ignore errors if AudioContext is already closed
        }
      }, stopDelay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, detune, filterCutoff, gain, active]);
}
