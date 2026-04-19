"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import {
  controls,
  cx,
  gradients,
  layout,
  motion as motionSystem,
  scene,
  typography,
} from "@/lib/design-system";
import { HeroSceneClient } from "@/components/HeroSceneClient";
import { Reveal } from "@/components/Reveal";

type HeroSectionProps = {
  eyebrow: string;
  title: { line1: string; line2: string; line3: string };
  sub: string;
};

export function HeroSection({ eyebrow, title, sub }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {reducedMotion ? (
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,12,10,0.12), rgba(14,12,10,0.3)), url('/hero-reference.png')",
            contain: "strict",
          }}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ contain: "strict" }}
        >
          <HeroSceneClient progress={scrollYProgress} />
        </div>
      )}

      {/* Light radial wash under the text column — the painting already carries
          deep ink on the left, so this is a legibility lift, not a curtain. */}
      <div
        aria-hidden
        className={cx("pointer-events-none absolute inset-0 z-[1]", gradients.heroTextWash)}
      />

      {!reducedMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[-6%] top-[11%] z-[1] h-[58vh] w-[44vw] bg-[radial-gradient(circle,rgba(241,201,138,0.18)_0%,rgba(241,201,138,0.08)_22%,rgba(241,201,138,0.02)_42%,transparent_66%)] blur-2xl"
            animate={{
              opacity: [...scene.heroAtmosphere.auraOpacity],
              scale: [...scene.heroAtmosphere.auraScale],
              x: [...scene.heroAtmosphere.auraX],
              y: [...scene.heroAtmosphere.auraY],
            }}
            transition={{
              duration: motionSystem.heroAura.duration,
              ease: motionSystem.heroAura.ease,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[7%] top-[22%] z-[1] h-[26vh] w-[18vw] rounded-full bg-[radial-gradient(circle,rgba(241,201,138,0.14)_0%,rgba(241,201,138,0.06)_24%,transparent_62%)] blur-3xl"
            animate={{
              opacity: [...scene.heroAtmosphere.flickerOpacity],
              scale: [...scene.heroAtmosphere.flickerScale],
            }}
            transition={{
              duration: 4.4,
              ease: motionSystem.heroAura.ease,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </>
      )}

      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24",
          gradients.heroBottomFade,
        )}
      />

      <div
        className={cx(
          layout.page,
          layout.heroShell,
        )}
      >
        <div className={layout.heroCopy}>
          <Reveal>
            <p className={cx("mb-8", typography.eyebrow)}>{eyebrow}</p>
          </Reveal>
          <h1 className={typography.heroTitle}>
            <Reveal as="span" className="block">
              {title.line1}
            </Reveal>
            <Reveal delay={0.08} as="span" className="block italic">
              {title.line2}
            </Reveal>
            <Reveal delay={0.16} as="span" className="block">
              {title.line3}
            </Reveal>
          </h1>
          <Reveal delay={0.3}>
            <p className={cx("mt-10 max-w-2xl", typography.bodyLarge)}>{sub}</p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#waitlist" className={controls.primaryButton}>
                Join waitlist
              </a>
              <a href="#manifesto" className={controls.secondaryButton}>
                Why this exists
              </a>
            </div>
          </Reveal>
          {!reducedMotion && (
            <motion.div
              aria-hidden
              className="mt-14 flex items-center gap-3 text-whisper/72"
              animate={{ y: [0, 8, 0], opacity: [0.55, 0.9, 0.55] }}
              transition={{
                duration: motionSystem.scrollCue.duration,
                ease: motionSystem.scrollCue.ease,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em]">
                Scroll
              </span>
              <span className="h-px w-14 bg-gradient-to-r from-violet-soft/70 to-transparent" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
