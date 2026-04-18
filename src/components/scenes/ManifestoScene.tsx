"use client";

import { useRef } from "react";
import type { ReactElement } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

export type ManifestoSceneProps = {
  eyebrow: string;
  heading: {
    lead: string;
    accent1: string;
    middle: string;
    accent2: string;
    trail: string;
  };
  paragraphs: string[];
};

interface WordProps {
  word: string;
  scrollYProgress: MotionValue<number>;
  startProgress: number;
  endProgress: number;
}

function RevealWord({ word, scrollYProgress, startProgress, endProgress }: WordProps) {
  const opacity = useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);
  const y = useTransform(scrollYProgress, [startProgress, endProgress], [8, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block", marginRight: "0.28em" }}
    >
      {word}
    </motion.span>
  );
}

export function ManifestoScene({ eyebrow, heading, paragraphs }: ManifestoSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const glyphOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.18, 0.1, 0.05]);
  const glyphScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.15]);
  const glyphRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const glyphX = useTransform(scrollYProgress, [0, 1], [0, -60]);

  if (reducedMotion) {
    return (
      <section id="manifesto" className="border-b border-rule py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.42em] text-whisper">
            {eyebrow}
          </p>
          <h2 className="font-display font-light text-5xl leading-[0.98] tracking-[-0.02em] text-paper md:text-[clamp(2.75rem,4.5vw,4.25rem)]">
            {heading.lead}
            <span className="italic font-light"> {heading.accent1}</span>
            {heading.middle}
            <span className="italic font-light"> {heading.accent2}</span>
            {heading.trail}
          </h2>
          <div className="mt-10 max-w-prose space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-whisper">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const revealStart = 0.15;
  const revealRange = 0.4;

  const totalWords = paragraphs.reduce(
    (sum, para) => sum + para.split(/\s+/).filter(Boolean).length,
    0,
  );
  const N = totalWords || 1;

  const paraElements: ReactElement[][] = paragraphs.map(() => []);
  let globalIdx = 0;

  paragraphs.forEach((para, paraIdx) => {
    const words = para.split(/\s+/).filter(Boolean);
    words.forEach((word) => {
      const i = globalIdx;
      const t = i / N;
      const start = revealStart + t * revealRange;
      const end = start + 0.1;
      paraElements[paraIdx].push(
        <RevealWord
          key={`${paraIdx}-${i}`}
          word={word}
          scrollYProgress={scrollYProgress}
          startProgress={start}
          endProgress={end}
        />,
      );
      globalIdx++;
    });
  });

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative border-t border-rule"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(212,145,61,0.12),transparent_55%)]"
        />

        <motion.div
          aria-hidden
          style={{
            opacity: glyphOpacity,
            scale: glyphScale,
            rotate: glyphRotate,
            x: glyphX,
            filter: "blur(0.5px) drop-shadow(0 0 80px rgba(241,201,138,0.35))",
          }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center font-display text-violet-soft/60 [direction:rtl] [font-size:min(72vh,56vw)] leading-none select-none"
        >
          إنماء
        </motion.div>

        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <p className="mb-10 font-mono text-xs uppercase tracking-[0.42em] text-whisper">
              {eyebrow}
            </p>

            <h2 className="font-display font-light text-5xl leading-[0.98] tracking-[-0.02em] text-paper md:text-[clamp(2.75rem,4.5vw,4.25rem)]">
              {heading.lead}
              <span className="italic font-light"> {heading.accent1}</span>
              {heading.middle}
              <span className="italic font-light"> {heading.accent2}</span>
              {heading.trail}
            </h2>

            <div className="mt-10 max-w-prose space-y-6">
              {paraElements.map((words, i) => (
                <p key={i} className="text-whisper leading-relaxed">
                  {words}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
