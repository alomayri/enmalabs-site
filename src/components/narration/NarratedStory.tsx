"use client";

import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Beat = { cue?: string; text: string };

type BeatCardProps = {
  beat: Beat;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
};

/**
 * One scene beat. Its opacity / position / blur are driven by a 1/total slice
 * of the parent section's scroll progress. Appears softly, holds, softens out.
 */
function BeatCard({ beat, index, total, progress, reduce }: BeatCardProps) {
  const step = 1 / total;
  const start = index * step;
  const enter = start + step * 0.15;
  const hold = start + step * 0.7;
  const exit = start + step * 0.95;

  const opacity = useTransform(progress, [start, enter, hold, exit], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, enter, exit], [36, 0, -24]);
  const blurPx = useTransform(progress, [start, enter, hold, exit], [12, 0, 0, 10]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  if (reduce) {
    return (
      <article className="border-t border-rule py-10">
        {beat.cue && (
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-ember">
            {beat.cue}
          </p>
        )}
        <p className="mt-4 max-w-3xl font-display text-3xl leading-[1.15] tracking-tight text-paper md:text-5xl">
          {beat.text}
        </p>
      </article>
    );
  }

  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-start gap-5 px-6 md:px-10"
      style={{ opacity, y, filter, willChange: "opacity, transform, filter" }}
    >
      {beat.cue && (
        <p className="font-mono text-xs uppercase tracking-[0.38em] text-ember">
          {beat.cue}
        </p>
      )}
      <p className="max-w-4xl font-display text-[2.4rem] leading-[1.04] tracking-[-0.02em] text-paper md:text-[clamp(3.5rem,6.2vw,6.2rem)]">
        {beat.text}
      </p>
    </motion.div>
  );
}

/**
 * Narrated scroll section. Pins one viewport-height stage while the section
 * itself is tall enough to drive through N beats at a readable pace.
 * Falls back to a plain stacked layout when the user prefers reduced motion.
 */
export function NarratedStory({
  eyebrow,
  beats,
}: {
  eyebrow?: string;
  beats: Beat[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-6 py-28">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
              {eyebrow}
            </p>
          )}
          <div className="mt-8 space-y-4">
            {beats.map((b, i) => (
              <BeatCard
                key={i}
                beat={b}
                index={i}
                total={beats.length}
                progress={scrollYProgress}
                reduce
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative border-b border-rule"
      style={{ height: `${beats.length * 80}vh` }}
      aria-label={eyebrow ?? "Narrated story"}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* Soft ember halo behind the text — ties the story to the hero motif */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,138,74,0.10),transparent_55%)]"
        />

        <div className="relative mx-auto flex h-full max-w-6xl items-center">
          {eyebrow && (
            <p className="absolute left-6 top-10 font-mono text-xs uppercase tracking-[0.42em] text-whisper md:left-10">
              {eyebrow}
            </p>
          )}
          {beats.map((beat, i) => (
            <BeatCard
              key={i}
              beat={beat}
              index={i}
              total={beats.length}
              progress={scrollYProgress}
              reduce={false}
            />
          ))}

          {/* Scrubber at the bottom — progress across beats */}
          <div
            aria-hidden
            className="absolute inset-x-6 bottom-12 flex gap-1.5 md:inset-x-10"
          >
            {beats.map((_, i) => (
              <Scrubber
                key={i}
                index={i}
                total={beats.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Scrubber({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  const width = useTransform(progress, [start, end], ["0%", "100%"]);
  return (
    <div className="h-px flex-1 overflow-hidden bg-rule">
      <motion.div style={{ width }} className="h-full origin-left bg-ember" />
    </div>
  );
}
