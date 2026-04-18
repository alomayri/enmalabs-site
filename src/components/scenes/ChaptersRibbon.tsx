"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Chapter = { index: string; title: string; body: string };

export type ChaptersRibbonProps = {
  eyebrow: string;
  heading: ReactNode;
  chapters: Chapter[];
};

// ─── Progress track pill ──────────────────────────────────────────────────────

function Track({
  i,
  total,
  p,
}: {
  i: number;
  total: number;
  p: MotionValue<number>;
}) {
  const step = 1 / total;
  const w = useTransform(p, [i * step, (i + 1) * step], ["0%", "100%"]);
  return (
    <div className="h-px flex-1 overflow-hidden bg-rule">
      <motion.div style={{ width: w }} className="h-full bg-violet" />
    </div>
  );
}

// ─── Chapter card ─────────────────────────────────────────────────────────────

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <article className="min-w-[80vw] md:min-w-[75vw] flex flex-col justify-end h-[80%] my-auto mx-4 md:mx-6 rounded-3xl border border-rule bg-mist/35 p-8 md:p-12 backdrop-blur-xl shadow-[0_20px_60px_rgba(212,145,61,0.15)]">
      {/* Left typographic anchor */}
      <div className="flex items-start gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-3 pt-1">
          <div className="h-16 w-px bg-rule" />
          <motion.div
            className="w-2 h-2 rounded-full bg-violet-soft shadow-[0_0_16px_rgba(241,201,138,0.65)]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm text-violet-soft">{chapter.index}</p>
          <h3 className="font-display text-4xl md:text-6xl text-paper leading-tight">
            {chapter.title}
          </h3>
          <p className="text-lg text-whisper max-w-prose leading-relaxed">
            {chapter.body}
          </p>
        </div>
      </div>
    </article>
  );
}

// ─── Reduced-motion fallback ──────────────────────────────────────────────────

function StaticLayout({
  eyebrow,
  heading,
  chapters,
}: ChaptersRibbonProps) {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
          {eyebrow}
        </p>
        <h2 className="mt-6 font-display text-5xl md:text-7xl text-paper">
          {heading}
        </h2>
        <div className="mt-16 space-y-16">
          {chapters.map((ch) => (
            <article
              key={ch.index}
              className="grid gap-6 border-t border-rule pt-8 md:grid-cols-[1fr_3fr]"
            >
              <p className="font-mono text-sm text-violet-soft">{ch.index}</p>
              <div>
                <h3 className="font-display text-3xl md:text-5xl">
                  {ch.title}
                </h3>
                <p className="mt-4 text-lg text-whisper max-w-prose">
                  {ch.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ChaptersRibbon({ eyebrow, heading, chapters }: ChaptersRibbonProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Translate the ribbon so the last card aligns to the right edge when
  // scroll reaches 100%. Each card is ~65vw on desktop; with N cards the
  // total ribbon width is N * 65vw. We want to shift left by (N-1) * 65vw,
  // expressed as a percentage of the ribbon container (~N * 65vw wide).
  // "-66%" shifts by roughly (N-1)/N of the ribbon, good for 3 cards (2/3).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  if (prefersReducedMotion) {
    return <StaticLayout eyebrow={eyebrow} heading={heading} chapters={chapters} />;
  }

  return (
    <section
      id="chapters"
      ref={sectionRef}
      style={{ height: "300vh" }}
      className="relative border-t border-rule"
    >
      {/* ── Pinned viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* Ambient radial violet glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,145,61,0.08),transparent_55%)]" />
        {/* Header */}
        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-10 md:pt-16">
          <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl text-paper leading-tight">
            {heading}
          </h2>
        </div>

        {/* ── Horizontal ribbon ── */}
        <div className="mt-8 md:mt-10 overflow-visible">
          <motion.div
            style={{ x }}
            className="flex flex-row will-change-transform"
          >
            {chapters.map((ch) => (
              <ChapterCard key={ch.index} chapter={ch} />
            ))}
          </motion.div>
        </div>

        {/* ── Progress track ── */}
        <div className="absolute bottom-8 left-6 right-6 md:left-10 md:right-10 flex items-center gap-3">
          {chapters.map((ch, i) => (
            <Track key={ch.index} i={i} total={chapters.length} p={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
