/**
 * Design tokens — single source of truth for colors, typography, motion.
 * Mirrored by CSS @theme block in src/app/globals.css for Tailwind utilities.
 *
 * To reskin the site, edit this file + the @theme block. Everything cascades.
 */

export const tokens = {
  color: {
    // Core
    ink: "#0A0E1A",        // deep midnight — the void
    paper: "#F5F2EB",      // warm parchment — soft light
    // Accents
    ember: "#E8A861",      // warm gold-amber — candlelight, the soul
    emberSoft: "#E8A86130",// ember with opacity for glows
    soul: "#7B6BDB",       // muted violet — anima
    soulSoft: "#7B6BDB26", // soul tint
    // Structural
    mist: "#151929",       // slightly lifted from ink — card bg
    mistSoft: "#0F131E",   // subtle section background
    rule: "#1F2435",       // hairline divider
    whisper: "#8B8B95",    // muted text
    // Status
    positive: "#7BDBAF",
    warning: "#E8A861",
  },
  font: {
    display: "var(--font-instrument-serif)",
    sans: "var(--font-inter)",
  },
  motion: {
    ease: {
      out:   [0.22, 1, 0.36, 1] as const,
      inOut: [0.65, 0, 0.35, 1] as const,
      smooth:[0.16, 1, 0.3, 1]  as const,
    },
    duration: {
      fast: 0.4,
      base: 0.7,
      slow: 1.2,
      page: 1.8,
    },
  },
  radius: {
    card: "1rem",
    pill: "9999px",
  },
} as const;

export type Tokens = typeof tokens;
