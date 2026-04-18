"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { cx, gradients, layout, typography } from "@/lib/design-system";
import { HeroSceneClient } from "@/components/HeroSceneClient";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Reveal } from "@/components/Reveal";

type HeroSectionProps = {
  eyebrow: string;
  title: { line1: string; line2: string; line3: string };
  sub: string;
};

export function HeroSection({ eyebrow, title, sub }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section
      id="waitlist"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ contain: "strict" }}
      >
        <HeroSceneClient progress={scrollYProgress} />
      </div>

      {/* Light radial wash under the text column — the painting already carries
          deep ink on the left, so this is a legibility lift, not a curtain. */}
      <div
        aria-hidden
        className={cx("pointer-events-none absolute inset-0 z-[1]", gradients.heroTextWash)}
      />

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
          "relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:max-w-[90rem] md:pb-28",
        )}
      >
        <div className="max-w-3xl md:max-w-[56%]">
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
            <div className="mt-10">
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
