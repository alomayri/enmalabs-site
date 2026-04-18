"use client";

import Link from "next/link";
import { useReducedMotion, motion } from "framer-motion";
import { controls, cx, layout, motion as motionSystem, surfaces, typography } from "@/lib/design-system";

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
  lead?: string;
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

export function WritingFeed({ id, eyebrow, heading, lead, entries }: WritingFeedProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id={id}
      className="relative border-t border-rule bg-mist-soft/25"
    >
      <div className={cx(layout.reading, layout.sectionSpace)}>
        <p className={typography.eyebrow}>{eyebrow}</p>
        <h2 className={cx("mt-6", typography.displayTitle)}>{heading}</h2>
        {lead ? <p className={typography.sectionLead}>{lead}</p> : null}

        <div className="mt-16">
          {entries.map((entry, i) => (
            <motion.article
              key={entry.slug}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionSystem.listViewport}
              transition={{
                duration: motionSystem.reveal.duration,
                delay: i * motionSystem.staggerStep,
                ease: motionSystem.reveal.ease,
              }}
              className={cx(
                "grid gap-4 border-t border-rule py-8 md:grid-cols-[1fr_3fr] md:py-10",
                surfaces.notebookCard,
                layout.panelPad,
              )}
            >
              <div className={cx("flex flex-col gap-1 text-xs", typography.meta)}>
                <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                <span className="text-whisper/70">{entry.category}</span>
              </div>

              <div>
                <h3 className={typography.journalTitle}>{entry.title}</h3>
                <p className={cx("mt-4 max-w-prose", typography.body)}>{entry.excerpt}</p>
                <Link
                  href={`/journal/${entry.slug}`}
                  className={cx("mt-5 inline-flex", controls.footerLink, typography.meta)}
                >
                  Open note
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
