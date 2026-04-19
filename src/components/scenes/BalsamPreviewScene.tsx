"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  controls,
  cx,
  layout,
  motion as motionSystem,
  scene,
  surfaces,
  typography,
} from "@/lib/design-system";

export type PreviewMoment = {
  time: string;
  label: string;
  title: string;
  body: string;
  screenTitle: string;
  screenMeta: string;
  accent: string;
  queue: readonly { label: string; state: string }[];
  noteLabel: string;
  note: string;
};

export type BalsamPreviewSceneProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  lead: string;
  helper: string;
  moments: readonly PreviewMoment[];
};

function PhoneScreen({
  moment,
  reducedMotion,
}: {
  moment: PreviewMoment;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative flex h-full flex-col bg-[linear-gradient(180deg,rgba(26,22,18,0.98)_0%,rgba(14,12,10,0.98)_100%)] px-5 pb-5 pt-4 text-paper">
      <div className="mb-4 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.3em] text-whisper/80">
        <span>{moment.time}</span>
        <span>Balsam</span>
      </div>

      <div className="rounded-[1.6rem] border border-rule/70 bg-mist/55 p-4 shadow-[0_12px_40px_rgba(14,12,10,0.42)]">
        <div
          aria-hidden
          className="aspect-[1.08] rounded-[1.2rem] border border-rule/60 bg-[radial-gradient(circle_at_30%_28%,rgba(241,201,138,0.36),transparent_34%),radial-gradient(circle_at_70%_72%,rgba(138,60,36,0.34),transparent_38%),linear-gradient(180deg,rgba(47,35,26,0.92)_0%,rgba(17,14,12,0.98)_100%)]"
        />
        <div className="mt-4">
          <p className="font-display text-2xl leading-none text-paper">{moment.screenTitle}</p>
          <p className="mt-2 text-sm text-whisper">{moment.screenMeta}</p>
        </div>
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-rule/70 bg-mist/35 p-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-violet-soft/80">
          {moment.accent}
        </p>
        <div className="mt-4 space-y-3">
          {moment.queue.map((item, index) => (
            <motion.div
              key={`${item.label}-${item.state}`}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0.15 : 0.32,
                delay: reducedMotion ? 0 : index * 0.06,
                ease: motionSystem.reveal.ease,
              }}
              className={cx(
                "flex items-center justify-between rounded-[1rem] border border-rule/60 px-3 py-2.5 text-sm",
                index === 0 ? "bg-violet-soft/10 text-paper" : "bg-ink/35 text-whisper",
              )}
            >
              <span>{item.label}</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em]">{item.state}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0.15 : 0.34,
          delay: reducedMotion ? 0 : 0.18,
          ease: motionSystem.reveal.ease,
        }}
        className="mt-auto rounded-[1.5rem] border border-rule/60 bg-[color:rgba(241,201,138,0.06)] px-4 py-3.5"
      >
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-whisper/80">
          {moment.noteLabel}
        </p>
        <p className="mt-2 text-sm leading-6 text-paper/88">{moment.note}</p>
      </motion.div>
    </div>
  );
}

export function BalsamPreviewScene({
  id,
  eyebrow,
  heading,
  lead,
  helper,
  moments,
}: BalsamPreviewSceneProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [deviceTilt, setDeviceTilt] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || moments.length <= 1 || isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % moments.length);
    }, scene.preview.autoplayMs);

    return () => window.clearInterval(interval);
  }, [isPaused, moments.length, reducedMotion]);

  const activeMoment = moments[activeIndex];
  const progressWidth = useMemo(
    () => `${((activeIndex + 1) / Math.max(moments.length, 1)) * 100}%`,
    [activeIndex, moments.length],
  );

  return (
    <section id={id} className="relative overflow-hidden border-t border-rule bg-mist-soft/18">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_68%_32%,rgba(241,201,138,0.12),transparent_34%),radial-gradient(ellipse_at_34%_78%,rgba(138,60,36,0.12),transparent_40%)]"
      />
      <div className={cx(layout.page, layout.sectionSpace, "relative")}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
          <div className="max-w-2xl">
            <p className={typography.eyebrow}>{eyebrow}</p>
            <h2 className={cx("mt-6", typography.displayTitle)}>{heading}</h2>
            <p className={typography.sectionLead}>{lead}</p>
            <p className="mt-8 text-sm text-whisper/82">{helper}</p>

            <div className="mt-10 space-y-3">
              {moments.map((moment, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={`${moment.time}-${moment.label}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    onPointerEnter={() => setIsPaused(true)}
                    onPointerLeave={() => setIsPaused(false)}
                    className={cx(
                      controls.previewTab,
                      isActive && "border-violet-soft/50 bg-violet-soft/10",
                    )}
                    whileHover={reducedMotion ? undefined : { x: 4 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.995 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-violet-soft/85">
                          {moment.time}
                        </p>
                        <h3 className="mt-3 font-display text-2xl leading-tight text-paper">
                          {moment.title}
                        </h3>
                        <p className="mt-3 max-w-prose text-sm leading-7 text-whisper">
                          {moment.body}
                        </p>
                      </div>
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-whisper/70">
                        {moment.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={motionSystem.cardViewport}
            transition={{ duration: 0.7, ease: motionSystem.reveal.ease }}
            className="mx-auto w-full max-w-[27rem]"
            onPointerMove={(event) => {
              if (reducedMotion) return;
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
              const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
              setDeviceTilt({
                x: -y * scene.preview.tiltX,
                y: x * scene.preview.tiltY,
              });
            }}
            onPointerEnter={() => setIsPaused(true)}
            onPointerLeave={() => {
              setDeviceTilt({ x: 0, y: 0 });
              setIsPaused(false);
            }}
          >
            <motion.div
              className={cx("relative p-3", surfaces.deviceShell)}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      rotateX: deviceTilt.x,
                      rotateY: deviceTilt.y,
                      y: [0, -scene.preview.floatY, 0],
                    }
              }
              transition={{
                rotateX: { duration: 0.35, ease: motionSystem.reveal.ease },
                rotateY: { duration: 0.35, ease: motionSystem.reveal.ease },
                y: {
                  duration: scene.preview.floatDuration,
                  ease: motionSystem.slowBreath.ease,
                  repeat: Number.POSITIVE_INFINITY,
                },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[18%] top-3 z-20 h-6 rounded-full bg-ink/95"
              />
              {!reducedMotion && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-10 h-40 rounded-full blur-3xl"
                  style={{ background: scene.previewGlow }}
                  animate={{
                    opacity: [...scene.preview.glowOpacity],
                    scale: [...scene.preview.glowScale],
                  }}
                  transition={{
                    duration: scene.preview.floatDuration,
                    ease: motionSystem.slowBreath.ease,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              )}
              <div className={cx("relative h-[40rem] p-2", surfaces.deviceScreen)}>
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-4 z-10 h-px rounded-full bg-rule/70"
                >
                  <motion.div
                    className="h-full rounded-full bg-violet-soft/75"
                    animate={{ width: progressWidth }}
                    transition={{
                      duration: reducedMotion ? 0.2 : 0.55,
                      ease: motionSystem.reveal.ease,
                    }}
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMoment.time}
                    initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
                    transition={{ duration: 0.45, ease: motionSystem.reveal.ease }}
                    className="h-full"
                  >
                    <PhoneScreen moment={activeMoment} reducedMotion={reducedMotion} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
