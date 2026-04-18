import { Nav } from "@/components/Nav";
import { WaitlistForm } from "@/components/WaitlistForm";
import { AppCard } from "@/components/AppCard";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HeroSceneClient } from "@/components/HeroSceneClient";
import { hero, manifesto, apps, chapters, closingCta } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />

      {/* SCENE 1 — HERO: split view with 3D on the right */}
      <section
        id="waitlist"
        className="relative min-h-[100svh] overflow-hidden"
      >
        {/* 3D background — full viewport, centered right */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 md:left-[35%]"
          style={{ contain: "strict" }}
        >
          <HeroSceneClient />
        </div>

        {/* Gradient wash to ensure text legibility on top of 3D */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/85 to-transparent md:from-ink md:via-ink/70"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:max-w-[90rem] md:pb-28">
          <div className="max-w-3xl md:max-w-[56%]">
            <Reveal>
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.4em] text-whisper">
                {hero.eyebrow}
              </p>
            </Reveal>
            <h1 className="font-display text-[3.5rem] leading-[0.96] tracking-[-0.02em] md:text-[clamp(4rem,7.5vw,8rem)]">
              <Reveal as="span" className="block">{hero.title.line1}</Reveal>
              <Reveal delay={0.08} as="span" className="block italic text-ember">{hero.title.line2}</Reveal>
              <Reveal delay={0.16} as="span" className="block">{hero.title.line3}</Reveal>
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-10 max-w-2xl text-lg text-whisper md:text-xl">
                {hero.sub}
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-10">
                <WaitlistForm />
              </div>
            </Reveal>
          </div>

          {/* Scroll cue */}
          <div className="pointer-events-none mt-16 hidden items-end justify-between text-xs uppercase tracking-[0.35em] text-whisper md:flex">
            <span>Scroll to continue</span>
            <span className="font-mono">01 / 05</span>
          </div>
        </div>
      </section>

      {/* SCENE 2 — MANIFESTO */}
      <section id="manifesto" className="relative border-t border-rule">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-[1fr_2fr] md:py-40">
          <div>
            <div className="sticky top-28">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-whisper">
                  {manifesto.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 font-mono text-xs text-ember">02 / 05</p>
              </Reveal>
            </div>
          </div>
          <div>
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
                We believe the next decade of software
                is not <span className="italic text-ember">faster</span>.
                It is <span className="italic text-soul">quieter</span>.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 max-w-prose text-lg text-whisper md:text-xl">
              {manifesto.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 3 — APPS */}
      <section id="apps" className="border-t border-rule bg-mist-soft/40">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <div className="mb-20 max-w-4xl">
            <div className="flex items-baseline gap-6">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-whisper">
                  What we are building
                </p>
              </Reveal>
              <span className="font-mono text-xs text-ember">03 / 05</span>
            </div>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
                Three apps so far. <span className="italic text-ember">More, slowly.</span>
              </h2>
            </Reveal>
          </div>
          <div>
            {apps.map((app, i) => (
              <AppCard key={app.name} {...app} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 4 — CHAPTERS (interactive narration) */}
      <section id="chapters" className="relative border-t border-rule">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <div className="mb-24 max-w-4xl">
            <div className="flex items-baseline gap-6">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-whisper">
                  Chapters
                </p>
              </Reveal>
              <span className="font-mono text-xs text-ember">04 / 05</span>
            </div>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
                How we work, in three <span className="italic text-soul">chapters</span>.
              </h2>
            </Reveal>
          </div>
          <div className="space-y-28">
            {chapters.map((ch, i) => (
              <Reveal key={ch.index} delay={i * 0.08}>
                <article className="grid grid-cols-12 gap-6 border-t border-rule pt-10">
                  <div className="col-span-12 md:col-span-2">
                    <p className="font-mono text-sm text-ember">{ch.index}</p>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">{ch.title}</h3>
                    <p className="mt-5 max-w-prose text-lg text-whisper md:text-xl">{ch.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 5 — CLOSING CTA */}
      <section className="relative border-t border-rule bg-mist-soft/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-32 md:py-40">
          <div className="flex items-baseline gap-6">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-whisper">
                {closingCta.eyebrow}
              </p>
            </Reveal>
            <span className="font-mono text-xs text-ember">05 / 05</span>
          </div>
          <Reveal delay={0.08}>
            <h2 className="max-w-4xl font-display text-6xl leading-[1.02] tracking-tight md:text-[clamp(4rem,8vw,9rem)]">
              {closingCta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="max-w-xl text-lg text-whisper md:text-xl">{closingCta.sub}</p>
          </Reveal>
          <Reveal delay={0.28}>
            <WaitlistForm />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
