"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
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
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_70%_at_22%_62%,rgba(14,12,10,0.55)_0%,rgba(14,12,10,0.28)_40%,rgba(14,12,10,0)_75%)]"
      />

      {/* Soft bottom fade into the next section — no hard seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:max-w-[90rem] md:pb-28">
        <div className="max-w-3xl md:max-w-[56%]">
          <Reveal>
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.4em] text-whisper">
              {eyebrow}
            </p>
          </Reveal>
          <h1 className="font-display text-[3.5rem] leading-[0.96] tracking-[-0.02em] md:text-[clamp(4rem,7.5vw,8rem)]">
            <Reveal as="span" className="block">
              {title.line1}
            </Reveal>
            <Reveal delay={0.08} as="span" className="block font-serif italic text-violet-soft">
              {title.line2}
            </Reveal>
            <Reveal delay={0.16} as="span" className="block">
              {title.line3}
            </Reveal>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-lg text-whisper md:text-xl">{sub}</p>
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
