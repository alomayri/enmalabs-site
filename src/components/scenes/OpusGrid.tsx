"use client";

import { useReducedMotion, motion } from "framer-motion";
import {
  Ouroboros,
  Alembic,
  Cucurbit,
  Sol,
  Luna,
  Mercurius,
  Sulfur,
  Salt,
  Rebis,
  Heptagram,
} from "@/components/sigils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Project = {
  readonly index: string;
  readonly name: string;
  readonly operation: string;
  readonly phase: string;
  readonly sigil: string;
  readonly platform: string;
  readonly kind: string;
  readonly description: string;
  readonly status: "In development" | "Forming" | "Distant";
};

export type OpusGridProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  projects: readonly Project[];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const sigilMap = {
  Ouroboros,
  Alembic,
  Cucurbit,
  Sol,
  Luna,
  Mercurius,
  Sulfur,
  Salt,
  Rebis,
  Heptagram,
} as const;

type SigilName = keyof typeof sigilMap;

function phaseToToken(phase: string): string {
  switch (phase) {
    case "Nigredo":
      return "rubedo";
    case "Albedo":
      return "albedo";
    case "Citrinitas":
      return "citrinitas";
    case "Rubedo":
      return "rubedo";
    default:
      return "violet-soft";
  }
}

function statusPillClassName(status: Project["status"]): string {
  const base =
    "rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-[0.24em]";
  switch (status) {
    case "In development":
      return `${base} border-positive/40 bg-positive/10 text-positive`;
    case "Forming":
      return `${base} border-rule bg-mist text-whisper`;
    case "Distant":
      return `${base} border-rule/60 bg-mist/50 text-whisper/60`;
  }
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  cardIndex,
  reduce,
}: {
  project: Project;
  cardIndex: number;
  reduce: boolean;
}) {
  const SigilComponent =
    sigilMap[project.sigil as SigilName] ?? Ouroboros;
  const colorToken = phaseToToken(project.phase);

  return (
    <motion.article
      className="group relative flex flex-col gap-6 rounded-3xl border border-rule bg-mist/40 p-8 backdrop-blur-xl transition-colors hover:bg-mist-soft md:p-10"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.8,
        delay: cardIndex * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Top row: sigil + index */}
      <div className="flex items-start justify-between">
        <div className={`text-${colorToken} opacity-90`}>
          <SigilComponent size={56} title={project.operation} />
        </div>
        <div className="text-right">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-whisper">
            Opus {project.index}
          </span>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-whisper/70">
            {project.phase}
          </p>
        </div>
      </div>

      {/* Body */}
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-whisper/80">
          {project.operation}
        </p>
        <h3 className="mt-3 font-display text-4xl leading-tight text-paper md:text-5xl">
          {project.name}
        </h3>
        <p className="mt-4 font-serif italic text-xl text-violet-soft">
          {project.kind}
        </p>
        <p className="mt-6 max-w-prose leading-relaxed text-paper/80">
          {project.description}
        </p>
      </div>

      {/* Meta row */}
      <div className="mt-auto flex items-center justify-between border-t border-rule pt-5">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-whisper">
          {project.platform}
        </span>
        <span className={statusPillClassName(project.status)}>
          {project.status}
        </span>
      </div>
    </motion.article>
  );
}

// ─── OpusGrid ─────────────────────────────────────────────────────────────────

export function OpusGrid({ id, eyebrow, heading, projects }: OpusGridProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id={id} className="relative border-t border-rule">
      <div className="mx-auto max-w-[90rem] px-6 py-28 md:py-36">
        {/* Header */}
        <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
          {eyebrow}
        </p>
        <h2 className="mt-6 font-display text-5xl leading-tight tracking-tight text-paper md:text-[clamp(3.5rem,6vw,6.2rem)]">
          {heading}
        </h2>
        <p className="mt-4 max-w-xl text-whisper">
          Four operations of the magnum opus. One lab.
        </p>

        {/* Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.index}
              project={project}
              cardIndex={i}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
