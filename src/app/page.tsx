import { Nav } from "@/components/Nav";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HeroSceneClient } from "@/components/HeroSceneClient";
import { NarratedStory } from "@/components/narration/NarratedStory";
import { balsamStory } from "@/lib/content";

const rituals = [
  {
    index: "01",
    title: "Start with one album, not a feed.",
    body:
      "Balsam opens like a room already prepared for listening. You arrive to one clear invitation instead of twenty demands for your attention.",
  },
  {
    index: "02",
    title: "Let the queue become a gentle decision.",
    body:
      "Build a night slowly. Hold tracks in sequence. Adjust mood without breaking focus. The interface stays soft enough to disappear once the music starts.",
  },
  {
    index: "03",
    title: "Leave with a memory, not just a log.",
    body:
      "Sessions keep their residue: what played, what lingered, what should return later. Balsam treats listening history as atmosphere, not metrics.",
  },
];

const details = [
  "A cinematic player surface built for long-form listening, not rapid taps.",
  "Queue memory, session continuity, and gentle return paths after the app reopens.",
  "Recommendations shaped to feel editorial and human instead of algorithmically loud.",
  "A calm visual language with low glare, warm contrast, and no gamified reward mechanics.",
];

export default function Home() {
  return (
    <>
      <Nav />

      <section
        id="waitlist"
        className="relative min-h-[100svh] overflow-hidden border-b border-rule bg-ink"
      >
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 z-0 hidden w-[58%] md:block"
          style={{ contain: "strict" }}
        >
          <HeroSceneClient />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(196,140,82,0.18),transparent_34%),linear-gradient(90deg,rgba(11,11,11,0.98)_0%,rgba(11,11,11,0.94)_44%,rgba(11,11,11,0.54)_72%,rgba(11,11,11,0.9)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-6 bottom-10 z-[1] h-px bg-gradient-to-r from-transparent via-rule to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-28 md:pb-24">
          <div className="max-w-3xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
                Balsam / A slower music player
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-4xl font-display text-[3.4rem] leading-[0.94] tracking-[-0.03em] text-paper md:text-[clamp(4.8rem,9vw,8.8rem)]">
                Music deserves a room
                <span className="block italic text-ember">without interruption.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-whisper md:text-xl">
                Balsam is a single-product listening experience for people who want
                their evenings back. No feed. No streaks. No loud growth loops.
                Just a beautifully quiet player built around albums, sequence,
                memory, and mood.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-10 max-w-xl">
                <WaitlistForm />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-rule pt-6 text-sm text-whisper md:flex-row md:items-baseline md:justify-between">
            <Reveal delay={0.38}>
              <p className="max-w-md">
                Made for album nights, late-work focus, and the kind of
                listening that should feel like lighting a lamp.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="md:text-right">A restrained player for devoted ears.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <NarratedStory eyebrow={balsamStory.eyebrow} beats={balsamStory.beats} />

      <section
        id="manifesto"
        className="border-b border-rule bg-[linear-gradient(180deg,rgba(244,240,233,0.04),rgba(244,240,233,0))]"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-28 md:grid-cols-[0.9fr_1.3fr] md:py-36">
          <div className="md:pr-8">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
                Product feel
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-xs text-sm leading-7 text-whisper">
                Balsam is not trying to increase output. It is trying to improve
                the quality of attention around sound.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h2 className="max-w-4xl font-display text-4xl leading-[1.02] tracking-tight text-paper md:text-[clamp(3.8rem,6vw,6.5rem)]">
                A player that feels
                <span className="block italic text-soul">lit from within.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-whisper md:text-xl">
                The interface moves with the patience of a dedicated listening room:
                warm edges, spare controls, and enough texture to feel tactile
                without performing for you. Every screen is designed to lower the
                temperature, not raise it.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                ["Warm contrast", "Soft ember notes against dark paper tones."],
                ["Measured motion", "Slow reveals and calm transitions that never compete with the track."],
                ["Editorial restraint", "Text, spacing, and sequence doing the work instead of novelty gimmicks."],
              ].map(([title, body], index) => (
                <Reveal key={title} delay={0.16 + index * 0.08}>
                  <article className="min-h-full rounded-[2rem] border border-rule bg-mist/30 p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
                      0{index + 1}
                    </p>
                    <h3 className="mt-6 font-display text-2xl tracking-tight text-paper">
                      {title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-whisper">{body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="apps" className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
                Listening rituals
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-paper md:text-7xl">
                Built for the way real
                <span className="block italic text-ember">listening unfolds.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 space-y-8">
            {rituals.map((ritual, index) => (
              <Reveal key={ritual.index} delay={index * 0.08}>
                <article className="grid gap-6 border-t border-rule py-8 md:grid-cols-[160px_1fr_1.1fr] md:py-10">
                  <div className="font-mono text-sm text-ember">{ritual.index}</div>
                  <h3 className="max-w-lg font-display text-3xl leading-tight tracking-tight text-paper md:text-4xl">
                    {ritual.title}
                  </h3>
                  <p className="max-w-xl text-lg leading-8 text-whisper">
                    {ritual.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="chapters" className="border-b border-rule bg-mist-soft/20">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-28 md:grid-cols-[1.05fr_0.95fr] md:py-36">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
                Product details
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[1.02] tracking-tight text-paper md:text-7xl">
                Thoughtful software,
                <span className="block italic text-soul">down to reopen behavior.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-lg leading-8 text-whisper">
                Balsam is being shaped as a durable listening companion. The
                product details are there to preserve continuity, keep the player
                stable, and protect the emotional tone of the session.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {details.map((detail, index) => (
              <Reveal key={detail} delay={0.16 + index * 0.08}>
                <div className="rounded-[2rem] border border-rule bg-mist/35 px-6 py-6">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-ember" />
                    <p className="text-base leading-7 text-paper/92 md:text-lg">
                      {detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(11,11,11,0.16),rgba(11,11,11,0.02))]">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_center,rgba(196,140,82,0.18),transparent_58%)]"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center md:py-36">
          <Reveal>
            <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-paper md:text-[clamp(4rem,7vw,7.25rem)]">
              Join when the mood is right.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-whisper md:text-xl">
              We will send occasional notes as Balsam becomes real. No launch-funnel
              theatrics. Just measured updates for people who want a music player
              with depth, memory, and calm.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mx-auto mt-10 max-w-xl">
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
