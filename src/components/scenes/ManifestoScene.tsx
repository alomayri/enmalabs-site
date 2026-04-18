"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cx, gradients, layout, motion as motionSystem, typography } from "@/lib/design-system";

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

export function ManifestoScene({ eyebrow, heading, paragraphs }: ManifestoSceneProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section id="manifesto" className="relative overflow-hidden border-t border-rule bg-ink">
      <div
        aria-hidden
        className={cx("pointer-events-none absolute inset-0", gradients.manifestoAura)}
      />

      <div className={cx(layout.reading, layout.sectionSpace, "relative")}>
        <p className={cx("mb-8", typography.eyebrow)}>{eyebrow}</p>
        <div className="max-w-4xl">
          <h2 className={typography.manifestoTitle}>
            {heading.lead}
            <span className="italic font-light"> {heading.accent1}</span>
            {heading.middle}
            <span className="italic font-light"> {heading.accent2}</span>
            {heading.trail}
          </h2>

          <div className="mt-10 max-w-3xl space-y-7">
            {paragraphs.map((para, i) => (
              <motion.p
                key={para}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={motionSystem.listViewport}
                transition={{
                  duration: motionSystem.reveal.duration,
                  delay: i * motionSystem.staggerStep,
                  ease: motionSystem.reveal.ease,
                }}
                className={typography.body}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
