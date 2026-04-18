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
  readonly status: "Active" | "In notes" | "Distant";
};

export type OpusGridProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  lead?: string;
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
  featured = false,
}: {
  project: Project;
  cardIndex: number;
  reduce: boolean;
  featured?: boolean;
}) {
  const SigilComponent = sigilMap[project.sigil as SigilName] ?? Ouroboros;
  const colorClassName = projectTintClass(project.tint);

  return (
    <motion.article
      className={cx(
        "flex h-full flex-col gap-6",
        featured ? layout.panelPadLarge : layout.panelPad,
        featured ? surfaces.quietPanel : surfaces.card,
      )}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionSystem.cardViewport}
      transition={{
        duration: motionSystem.reveal.duration,
        delay: cardIndex * motionSystem.staggerStep,
        ease: motionSystem.reveal.ease,
      }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <div className="flex items-start justify-between">
        <div className={cx(colorClassName, "opacity-80")}>
          <SigilComponent size={featured ? 56 : 44} />
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-whisper/70">
          {project.index}
        </span>
      </div>

      <div>
        {project.name ? (
          <>
            <h3 className={typography.namedProject}>{project.name}</h3>
            <p className={cx(featured ? "mt-4 text-2xl" : "mt-4 text-xl", typography.italicVoice)}>
              {project.kind}
            </p>
          </>
        ) : (
          <h3 className={typography.unnamedProject}>{project.kind}</h3>
        )}
        <p className={cx("mt-6 max-w-prose", featured ? typography.body : typography.bodySoft)}>
          {project.description}
        </p>
      </div>

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

export function OpusGrid({ id, eyebrow, heading, lead, projects }: OpusGridProps) {
  const reduce = useReducedMotion() ?? false;
  const [featuredProject, ...rest] = projects;

  return (
    <section id={id} className="relative border-t border-rule">
      <div className={cx(layout.page, layout.sectionSpace)}>
        <p className={typography.eyebrow}>{eyebrow}</p>
        <h2 className={cx("mt-6", typography.displayTitle)}>{heading}</h2>
        {lead ? <p className={typography.sectionLead}>{lead}</p> : null}

        <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          {featuredProject ? (
            <ProjectCard
              key={featuredProject.index}
              project={featuredProject}
              cardIndex={0}
              reduce={reduce}
              featured
            />
          ) : null}

          <div className="grid gap-4">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.index}
                project={project}
                cardIndex={i + 1}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
