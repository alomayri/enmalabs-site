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
import {
  cx,
  layout,
  motion as motionSystem,
  projectStatusClass,
  projectTintClass,
  surfaces,
  typography,
} from "@/lib/design-system";

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
  const colorClassName = projectTintClass(project.tint);

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
      className={cx(
        "group relative flex flex-col gap-6 p-8 md:p-10 [transform-style:preserve-3d] will-change-transform",
        surfaces.card,
      )}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionSystem.cardViewport}
      transition={{
        duration: motionSystem.reveal.duration,
        delay: cardIndex * 0.05,
        ease: motionSystem.reveal.ease,
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
        <div className={cx(colorClassName, "opacity-80")}>
          <SigilComponent size={52} />
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-whisper/70">
          {project.index}
        </span>
      </div>

      {/* Body — when a project has no name yet, the italic `kind` becomes
          the title, sized up. Avoids the lazy "— (in formation)" placeholder. */}
      <div>
        {project.name ? (
          <>
            <h3 className={typography.namedProject}>{project.name}</h3>
            <p className={cx("mt-4 text-xl", typography.italicVoice)}>{project.kind}</p>
          </>
        ) : (
          <h3 className={typography.unnamedProject}>{project.kind}</h3>
        )}
        <p className={cx("mt-6 max-w-prose", typography.bodySoft)}>{project.description}</p>
      </div>

      {/* Meta row */}
      <div className="mt-auto flex items-center justify-between border-t border-rule pt-5">
        <span className={typography.meta}>{project.platform}</span>
        <span className={projectStatusClass(project.status)}>
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
      <div className={cx(layout.page, layout.sectionSpace)}>
        <p className={typography.eyebrow}>{eyebrow}</p>
        <h2 className={cx("mt-6", typography.displayTitle)}>{heading}</h2>
        <p className={typography.sectionLead}>Four tools. Each for a different kind of weight.</p>

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
