/**
 * Design tokens — JS mirror of the CSS @theme block in src/app/globals.css.
 *
 * To reskin the site, edit globals.css FIRST (that's where Tailwind reads from),
 * then resync this file. Any divergence is a bug.
 */

export const tokens = {
  color: {
    // Core — candlelight palette. Warm, not cool.
    ink: "#0E0C0A",         // warm deep near-black
    paper: "#F5EDDB",       // aged cream paper
    // Accents (all warm)
    ember: "#E8A861",       // warm gold-amber — candlelight
    emberSoft: "#E8A86130",
    soul: "#8A3C24",        // deep oxblood / clay
    soulSoft: "#8A3C2426",
    violet: "#D4913D",      // primary WARM AMBER (legacy name)
    violetSoft: "#F1C98A",  // pale gold glow (legacy name)
    // Structural (warm dark surfaces)
    mist: "#1A1612",
    mistSoft: "#221C17",
    rule: "#3D3329",
    whisper: "#8F8270",
    // Status — warm only. No cool tones.
    glow: "#E8C87A",        // pale warm gold — "alive"
  },
  font: {
    display: "var(--font-eb-garamond)",
    serif: "var(--font-eb-garamond)",
    sans: "var(--font-inter)",
  },
  motion: {
    ease: {
      out:    [0.22, 1, 0.36, 1] as const,
      inOut:  [0.65, 0, 0.35, 1] as const,
      smooth: [0.16, 1, 0.3, 1]  as const,
    },
    duration: {
      fast: 0.35,
      base: 0.6,
      slow: 1.0,
      page: 1.6,
    },
  },
  radius: {
    card: "1.5rem",
    pill: "9999px",
  },
} as const;

export type Tokens = typeof tokens;
