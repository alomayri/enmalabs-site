"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cx, layout, motion as motionSystem, surfaces, typography } from "@/lib/design-system";

export type ClosingSceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  sub: string;
  children?: React.ReactNode;
};

export function ClosingScene({ id, eyebrow, title, sub, children }: ClosingSceneProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section id={id} className="relative overflow-hidden border-t border-rule">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(241,201,138,0.12),transparent_56%),radial-gradient(ellipse_at_50%_100%,rgba(138,60,36,0.08),transparent_64%)]"
      />
      <div className={cx(layout.narrative, layout.compactSectionSpace, "relative px-6 text-center")}>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={motionSystem.listViewport}
          transition={{ duration: motionSystem.reveal.duration, ease: motionSystem.reveal.ease }}
          className={cx("mx-auto max-w-5xl", layout.panelPadLarge, surfaces.quietPanel)}
        >
          <p className={typography.eyebrow}>{eyebrow}</p>
          <h2 className={cx("mt-6", typography.ctaTitle)}>{title}</h2>
          <p className={cx("mx-auto mt-8 max-w-2xl", typography.bodyLarge)}>{sub}</p>
          {children && <div className="mx-auto mt-10 max-w-xl">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
