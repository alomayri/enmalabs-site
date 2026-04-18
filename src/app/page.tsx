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

      {/* SCENE 1 — HERO with 3D + waitlist */}
      <section id="waitlist" className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32 md:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <HeroSceneClient />
        </div>
        <div className="relative z-10 max-w-4xl">
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-whisper">
              {hero.eyebrow}
            </p>
          </Reveal>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            <Reveal delay={0.1} as="span" className="block">{hero.title.line1}</Reveal>
            <Reveal delay={0.2} as="span" className="block italic text-ember">{hero.title.line2}</Reveal>
            <Reveal delay={0.3} as="span" className="block">{hero.title.line3}</Reveal>
          </h1>
          <Reveal delay={0.45}>
            <p className="mt-8 max-w-2xl text-lg text-whisper md:text-xl">{hero.sub}</p>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="mt-10">
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SCENE 2 — MANIFESTO */}
      <section id="manifesto" className="relative border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-[1fr_2fr]">
          <div>
            <Reveal>
              <p className="sticky top-28 font-mono text-xs uppercase tracking-[0.35em] text-whisper">
                {manifesto.eyebrow}
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">
                We believe the next decade of software is not <span className="italic text-ember">faster</span>.
                It is <span className="italic text-soul">quieter</span>.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 max-w-prose text-lg text-whisper md:text-xl">
              {manifesto.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 3 — APPS */}
      <section id="apps" className="border-t border-rule bg-mist-soft/40">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="mb-16 max-w-3xl">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-whisper">
                What we are building
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">
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

      {/* SCENE 4 — INTERACTIVE NARRATION (three chapters) */}
      <section id="chapters" className="relative border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-whisper">Chapters</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-20 max-w-3xl font-display text-4xl leading-tight tracking-tight md:text-6xl">
              How we work, in three <span className="italic text-soul">chapters</span>.
            </h2>
          </Reveal>
          <div className="space-y-24">
            {chapters.map((ch, i) => (
              <Reveal key={ch.index} delay={i * 0.1}>
                <article className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-2">
                    <p className="font-mono text-sm text-ember">{ch.index}</p>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="font-display text-3xl tracking-tight md:text-4xl">{ch.title}</h3>
                    <p className="mt-4 max-w-prose text-lg text-whisper md:text-xl">{ch.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 5 — CLOSING CTA */}
      <section className="relative border-t border-rule bg-mist-soft/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-whisper">
              {closingCta.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="max-w-3xl font-display text-5xl leading-tight tracking-tight md:text-7xl">
              {closingCta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-xl text-lg text-whisper">{closingCta.sub}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <WaitlistForm />
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
