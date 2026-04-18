import { Reveal } from "./Reveal";

type Props = {
  name: string;
  tagline: string;
  description: string;
  platform: string;
  kind: string;
  status: "Shipped" | "In development" | "Private beta" | "Concept";
  index: number;
};

const statusTone: Record<Props["status"], string> = {
  Shipped: "bg-positive/20 text-positive",
  "In development": "bg-ember/20 text-ember",
  "Private beta": "bg-soul/20 text-soul",
  Concept: "bg-whisper/15 text-whisper",
};

export function AppCard({ name, tagline, description, platform, kind, status, index }: Props) {
  return (
    <Reveal
      as="article"
      delay={index * 0.08}
      className="group grid grid-cols-12 gap-6 border-t border-rule py-10"
    >
      <div className="col-span-12 md:col-span-2">
        <p className="font-mono text-xs text-whisper">0{index + 1}</p>
      </div>
      <div className="col-span-12 md:col-span-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[status]}`}>
            {status}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-whisper">
            {kind} · {platform}
          </span>
        </div>
        <h3 className="font-display text-4xl tracking-tight md:text-5xl">{name}</h3>
        <p className="mt-3 font-display italic text-xl text-ember md:text-2xl">{tagline}</p>
        <p className="mt-6 max-w-prose text-base text-whisper md:text-lg">{description}</p>
      </div>
    </Reveal>
  );
}
