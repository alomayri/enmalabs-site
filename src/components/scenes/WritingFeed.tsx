"use client";

import { useReducedMotion, motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

export type WritingEntry = {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
};

export type WritingFeedProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  entries: readonly WritingEntry[];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── WritingFeed ──────────────────────────────────────────────────────────────

export function WritingFeed({ id, eyebrow, heading, entries }: WritingFeedProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id={id}
      className="relative border-t border-rule bg-mist-soft/25"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        {/* Header */}
        <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
          {eyebrow}
        </p>
        <h2 className="mt-6 font-display text-5xl leading-tight tracking-tight text-paper md:text-[clamp(3.5rem,6vw,6.2rem)]">
          {heading}
        </h2>

        {/* Entry list */}
        <div className="mt-16">
          {entries.map((entry, i) => (
            <motion.a
              key={entry.slug}
              href={`#${entry.slug}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group grid gap-4 border-t border-rule py-8 md:grid-cols-[1fr_3fr] md:py-10"
            >
              {/* Left: date + category */}
              <div className="flex flex-col gap-1 font-mono text-xs uppercase tracking-[0.28em] text-whisper">
                <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                <span className="text-whisper/70">{entry.category}</span>
              </div>

              {/* Right: title + excerpt */}
              <div>
                <h3 className="font-display text-2xl leading-tight text-paper transition-colors group-hover:text-violet md:text-3xl">
                  {entry.title}
                </h3>
                <p className="mt-4 max-w-prose leading-relaxed text-whisper">
                  {entry.excerpt}
                </p>
                <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.28em] text-violet-soft opacity-0 transition-opacity group-hover:opacity-100">
                  Read →
                </span>
              </div>
            </motion.a>
          ))}
          {/* Terminal rule */}
          <div className="border-t border-rule" />
        </div>
      </div>
    </section>
  );
}
