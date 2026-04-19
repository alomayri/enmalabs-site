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
  compactSectionSpace: "py-24 md:py-32",
  sectionBorder: "border-t border-rule",
  heroShell:
    "relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:pb-28",
  heroCopy: "max-w-3xl md:max-w-[54%]",
  panelPad: "p-8 md:p-10",
  panelPadLarge: "p-10 md:p-14",
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
  ctaTitle:
    "font-display font-light text-4xl leading-tight tracking-[-0.02em] text-paper md:text-[clamp(3rem,5.5vw,5.5rem)]",
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
  journalTitle: "font-display text-2xl leading-tight text-paper md:text-3xl",
} as const;

export const surfaces = {
  navCapsule:
    "rounded-full border border-rule bg-ink/50 px-2 py-1.5 shadow-[0_4px_32px_rgba(14,12,10,0.4)] backdrop-blur-xl",
  card:
    "rounded-[var(--radius-card)] border border-rule bg-mist/40 backdrop-blur-xl transition-colors hover:bg-mist-soft",
  quietPanel:
    "rounded-[var(--radius-panel)] border border-rule bg-mist/30 backdrop-blur-xl shadow-[0_20px_80px_rgba(212,145,61,0.18)]",
  footerPanel:
    "rounded-[var(--radius-card)] border border-rule/80 bg-mist/20 backdrop-blur-xl",
  notebookCard:
    "rounded-[var(--radius-card)] border border-rule bg-mist/24 backdrop-blur-xl transition-colors hover:bg-mist/40",
  deviceShell:
    "rounded-[2.4rem] border border-rule bg-[#120f0d]/88 shadow-[0_28px_120px_rgba(14,12,10,0.76)]",
  deviceScreen:
    "overflow-hidden rounded-[2rem] border border-rule/70 bg-[linear-gradient(180deg,rgba(26,22,18,0.98)_0%,rgba(14,12,10,0.98)_100%)]",
} as const;

export const controls = {
  navLink:
    "inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm text-whisper transition-colors hover:bg-mist hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
  secondaryButton:
    "inline-flex min-h-11 items-center justify-center rounded-full border border-rule bg-ink/50 px-4 py-2 text-sm text-paper backdrop-blur-xl transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
  primaryButton:
    "inline-flex min-h-12 items-center justify-center rounded-full bg-violet px-6 py-3 text-base font-medium text-ink shadow-[0_8px_32px_rgba(212,145,61,0.38)] transition hover:bg-violet-soft disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
  pillButton:
    "inline-flex min-h-11 items-center justify-center rounded-full bg-violet px-4 py-2 text-sm font-medium text-ink shadow-[0_6px_24px_rgba(212,145,61,0.32)] transition hover:bg-violet-soft active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
  input:
    "min-h-12 flex-1 rounded-full border border-rule bg-ink/60 px-5 py-3 text-base text-paper placeholder:text-whisper backdrop-blur-xl transition focus:border-violet-soft focus:bg-mist-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-60",
  footerLink:
    "text-paper transition hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
  iconButton:
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-rule bg-ink/60 px-4 py-2 text-whisper backdrop-blur-xl transition hover:text-paper hover:shadow-[0_0_24px_rgba(241,201,138,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
  previewTab:
    "w-full rounded-[1.6rem] border border-rule/70 bg-mist/45 px-4 py-4 text-left transition hover:bg-mist-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
  skipLink:
    "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-violet-soft focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink",
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
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  slowBreath: {
    duration: 7.5,
    ease: "easeInOut" as const,
  },
  heroAura: {
    duration: 7.5,
    ease: "easeInOut" as const,
  },
  scrollCue: {
    duration: 3.4,
    ease: "easeInOut" as const,
  },
  staggerStep: 0.05,
  cardViewport: { once: true, margin: "-10% 0px -10% 0px" } as const,
  listViewport: { once: true, margin: "-20% 0px -10% 0px" } as const,
} as const;

export const scene = {
  heroBackground: tokens.color.ink,
  dust: tokens.color.violetSoft,
  particleField: tokens.color.violetSoft,
  particleCore: "#F5D98B",
  heroBloom: {
    intensity: 0.22,
    threshold: 0.72,
    smoothing: 0.25,
    vignetteOffset: 0.35,
    vignetteDarkness: 0.45,
  },
  heroAtmosphere: {
    pointerX: 0.18,
    pointerY: 0.12,
    driftX: 0.02,
    driftY: 0.035,
    rotateX: 0.02,
    rotateY: 0.035,
    driftScale: 0.008,
    scaleEnd: 1.08,
    auraOpacity: [0.34, 0.52, 0.4, 0.48] as const,
    auraScale: [1, 1.03, 0.995, 1.02] as const,
    auraX: [0, 10, -6, 0] as const,
    auraY: [0, -8, 6, 0] as const,
    flickerOpacity: [0.1, 0.16, 0.12, 0.18, 0.11] as const,
    flickerScale: [1, 1.04, 0.98, 1.02, 1] as const,
  },
  closingField: tokens.color.violetSoft,
  closingLantern: "#F6DDA0",
  closingCore: "#E3AE66",
  previewGlow: "rgba(241,201,138,0.18)",
  preview: {
    autoplayMs: 4200,
    tiltX: 7,
    tiltY: 10,
    floatY: 10,
    floatDuration: 6.8,
    glowOpacity: [0.14, 0.24, 0.16] as const,
    glowScale: [0.98, 1.03, 1] as const,
    progressDuration: 4.2,
  },
  closing: {
    stageHeight: "185vh",
    particleCount: 540,
    emberCount: 18,
    textRevealStart: 0.08,
    textRevealEnd: 0.22,
    panelLift: 18,
    fieldRotationStep: 0.0009,
    convergenceStart: 0.18,
    convergenceEnd: 0.82,
  },
  closingBloom: {
    intensity: 0.4,
    threshold: 0.74,
    smoothing: 0.22,
    vignetteOffset: 0.28,
    vignetteDarkness: 0.52,
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
