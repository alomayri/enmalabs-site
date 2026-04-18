"use client";

import { useRef } from "react";
import {
  useReducedMotion,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  readonly tint: string;
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

function tintToToken(tint: string): string {
  switch (tint) {
    case "warm":
      return "violet-soft";
    case "pale":
      return "paper";
    case "gold":
      return "violet";
    case "ember":
      return "soul";
    default:
      return "violet-soft";
  }
}

function statusPillClassName(status: Project["status"]): string {
  const base =
    "rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.28em]";
  switch (status) {
    case "In development":
      return `${base} border-violet-soft/40 bg-violet-soft/10 text-violet-soft`;
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
  const SigilComponent = sigilMap[project.sigil as SigilName] ?? Ouroboros;
  const colorToken = tintToToken(project.tint);

  // Pointer-driven tilt — subtle, spring-damped so it never overshoots.
  const cardRef = useRef<HTMLElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springCfg = { stiffness: 140, damping: 18, mass: 0.4 };
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [3.5, -3.5]), springCfg);
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-4.5, 4.5]), springCfg);
  const glowX = useTransform(px, [-0.5, 0.5], [18, 82]);
  const glowY = useTransform(py, [-0.5, 0.5], [18, 82]);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(260px circle at ${x}% ${y}%, rgba(241,201,138,0.10), transparent 65%)`,
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        reduce
          ? undefined
          : { rotateX: rx, rotateY: ry, transformPerspective: 900 }
      }
      className="group relative flex flex-col gap-6 rounded-3xl border border-rule bg-mist/40 p-8 backdrop-blur-xl transition-colors hover:bg-mist-soft md:p-10 [transform-style:preserve-3d] will-change-transform"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.35,
        delay: cardIndex * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Pointer-following warm glow (candlelight that tracks the cursor) */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ background: glowBg }}
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {/* Top row: sigil (ambient, uncaptioned) + roman numeral */}
      <div className="flex items-start justify-between">
        <div className={`text-${colorToken} opacity-80`}>
          <SigilComponent size={52} />
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-whisper/70">
          {project.index}
        </span>
      </div>

      {/* Body */}
      <div>
        <h3 className="font-display text-4xl leading-tight text-paper md:text-5xl">
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
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-whisper">
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
        <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
          {eyebrow}
        </p>
        <h2 className="mt-6 font-display text-5xl leading-tight tracking-tight text-paper md:text-[clamp(3.5rem,6vw,6.2rem)]">
          {heading}
        </h2>
        <p className="mt-4 max-w-xl text-whisper">
          Four tools. Each for a different kind of weight.
        </p>

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
