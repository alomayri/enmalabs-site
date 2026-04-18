"use client";

import { useEffect, useRef } from "react";
import { useAudioContext } from "./AudioProvider";

// The ambient bed is a single fal.ai-generated loop served from /public/audio/.
// Sources: `.opus` for Chromium/Firefox, `.m4a` (AAC) for Safari. An <audio>
// element handles streaming + looping; MediaElementAudioSourceNode pipes it
// into the AudioProvider's masterGain so a single mute controls everything.

const FADE_IN = 2.5;  // seconds
const FADE_OUT = 1.2;

export function AmbientBed() {
  const { isUnmuted, getContext, masterGain } = useAudioContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const localGainRef = useRef<GainNode | null>(null);
  const pauseTimerRef = useRef<number | null>(null);

  // Wire the <audio> element into the Web Audio graph once the user unmutes.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const ctx = getContext();
    const master = masterGain();
    if (!ctx || !master) return;

    if (!sourceRef.current) {
      sourceRef.current = ctx.createMediaElementSource(el);
      const localGain = ctx.createGain();
      localGain.gain.setValueAtTime(0, ctx.currentTime);
      sourceRef.current.connect(localGain);
      localGain.connect(master);
      localGainRef.current = localGain;
    }

    const localGain = localGainRef.current;
    if (!localGain) return;

    if (pauseTimerRef.current !== null) {
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    if (isUnmuted) {
      void el.play().catch(() => undefined);
      const now = ctx.currentTime;
      localGain.gain.cancelScheduledValues(now);
      localGain.gain.setValueAtTime(localGain.gain.value, now);
      localGain.gain.linearRampToValueAtTime(1, now + FADE_IN);
    } else {
      const now = ctx.currentTime;
      localGain.gain.cancelScheduledValues(now);
      localGain.gain.setValueAtTime(localGain.gain.value, now);
      localGain.gain.linearRampToValueAtTime(0, now + FADE_OUT);
      pauseTimerRef.current = window.setTimeout(() => {
        el.pause();
      }, FADE_OUT * 1000);
    }

    return () => {
      if (pauseTimerRef.current !== null) {
        window.clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }
    };
  }, [isUnmuted, getContext, masterGain]);

  return (
    <audio
      ref={audioRef}
      loop
      playsInline
      preload="none"
      crossOrigin="anonymous"
      aria-hidden
      tabIndex={-1}
    >
      <source src="/audio/ambient.opus" type="audio/ogg; codecs=opus" />
      <source src="/audio/ambient.m4a" type="audio/mp4" />
    </audio>
  );
}
