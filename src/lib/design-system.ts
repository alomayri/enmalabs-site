import { tokens } from "@/lib/theme";

type ClassValue = string | false | null | undefined;

export function cx(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}

type ProjectTint = "warm" | "pale" | "gold" | "ember";
type ProjectStatus = "In development" | "Forming" | "Distant";

export const layout = {
  page: "mx-auto max-w-[90rem] px-6",
  reading: "mx-auto max-w-7xl px-6",
  narrative: "mx-auto w-full max-w-5xl",
  sectionSpace: "py-28 md:py-36",
  sectionBorder: "border-t border-rule",
} as const;

export const typography = {
  brandMark: "font-serif text-lg italic text-paper",
  brandMeta:
    "font-mono text-[0.6rem] uppercase tracking-[0.3em] text-whisper",
  eyebrow: "font-mono text-xs uppercase tracking-[0.42em] text-whisper",
  heroTitle:
    "font-display font-light text-[3.25rem] leading-[0.93] tracking-[-0.025em] md:text-[clamp(3.5rem,6.5vw,7rem)]",
  displayTitle:
    "font-display text-5xl leading-tight tracking-tight text-paper md:text-[clamp(3.5rem,6vw,6.2rem)]",
  manifestoTitle:
    "font-display font-light text-5xl leading-[0.98] tracking-[-0.02em] text-paper md:text-[clamp(2.75rem,4.5vw,4.25rem)]",
  bodyLarge: "text-lg text-whisper md:text-xl",
  body: "leading-relaxed text-whisper",
  bodySoft: "leading-relaxed text-paper/80",
  sectionLead: "mt-4 max-w-xl text-whisper",
  italicVoice: "font-serif italic text-paper/75",
  unnamedProject:
    "font-serif text-3xl font-normal italic leading-tight text-paper/80 md:text-4xl",
  namedProject:
    "font-display text-4xl font-light leading-tight text-paper md:text-5xl",
  meta: "font-mono text-[0.65rem] uppercase tracking-[0.3em] text-whisper",
} as const;

export const surfaces = {
  navCapsule:
    "rounded-full border border-rule bg-ink/50 px-2 py-1.5 shadow-[0_4px_32px_rgba(14,12,10,0.4)] backdrop-blur-xl",
  card:
    "rounded-[1.75rem] border border-rule bg-mist/40 backdrop-blur-xl transition-colors hover:bg-mist-soft",
  quietPanel:
    "rounded-[2rem] border border-rule bg-mist/30 backdrop-blur-xl shadow-[0_20px_80px_rgba(212,145,61,0.18)]",
  footerPanel:
    "rounded-[1.75rem] border border-rule/80 bg-mist/20 backdrop-blur-xl",
} as const;

export const controls = {
  navLink:
    "rounded-full px-4 py-2 text-sm text-whisper transition-colors hover:bg-mist hover:text-paper",
  secondaryButton:
    "rounded-full border border-rule bg-ink/50 px-4 py-2 text-sm text-paper backdrop-blur-xl transition-colors hover:bg-mist",
  primaryButton:
    "rounded-full bg-violet px-6 py-3 text-base font-medium text-paper shadow-[0_8px_32px_rgba(212,145,61,0.45)] transition hover:brightness-110 disabled:opacity-60",
  pillButton:
    "rounded-full bg-violet px-4 py-2 text-sm font-medium text-paper shadow-[0_6px_24px_rgba(212,145,61,0.45)] transition hover:brightness-110 active:brightness-95",
  input:
    "flex-1 rounded-full border border-rule bg-ink/60 px-5 py-3 text-base text-paper placeholder:text-whisper backdrop-blur-xl transition focus:border-violet-soft focus:bg-mist-soft focus:outline-none disabled:opacity-60",
  footerLink: "text-paper transition hover:text-ember",
} as const;

export const gradients = {
  heroTextWash:
    "bg-[radial-gradient(ellipse_55%_70%_at_22%_62%,rgba(14,12,10,0.55)_0%,rgba(14,12,10,0.28)_40%,rgba(14,12,10,0)_75%)]",
  heroBottomFade: "bg-gradient-to-t from-ink to-transparent",
  manifestoAura:
    "bg-[radial-gradient(ellipse_at_30%_50%,rgba(212,145,61,0.12),transparent_55%)]",
} as const;

export const motion = {
  reveal: {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  cardViewport: { once: true, margin: "-10% 0px -10% 0px" } as const,
  listViewport: { once: true, margin: "-20% 0px -10% 0px" } as const,
} as const;

export const scene = {
  heroBackground: tokens.color.ink,
  dust: tokens.color.violetSoft,
  particleField: tokens.color.violetSoft,
  particleCore: "#F5D98B",
  heroBloom: {
    intensity: 0.35,
    threshold: 0.72,
    smoothing: 0.25,
    vignetteOffset: 0.35,
    vignetteDarkness: 0.45,
  },
  closingBloom: {
    intensity: 1.4,
    threshold: 0.3,
    smoothing: 0.5,
    vignetteOffset: 0.3,
    vignetteDarkness: 0.8,
  },
} as const;

export function projectTintClass(tint: ProjectTint | string): string {
  switch (tint) {
    case "warm":
      return "text-violet-soft";
    case "pale":
      return "text-paper";
    case "gold":
      return "text-violet";
    case "ember":
      return "text-soul";
    default:
      return "text-violet-soft";
  }
}

export function projectStatusClass(status: ProjectStatus): string {
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
