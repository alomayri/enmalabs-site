/**
 * All site copy. Edit here; the rest of the site reflects changes.
 *
 * Voice: a person wrote this, not a brand. Keep it that way.
 * إنماء (Arabic: to grow) + anima (Jung: the inner self).
 *
 * Alchemical frame: each project in this lab corresponds to one operation
 * of the magnum opus — the classical map of psychic transformation that Jung
 * spent the last thirty years of his life reading carefully.
 */

export const site = {
  name: "Enma Labs",
  tagline: "A workshop for inner software.",
  url: "https://enmalabs.com",
  contactEmail: "hello@enmalabs.com",
};

export const hero = {
  eyebrow: "A lab for inner work",
  title: {
    line1: "Software for the parts",
    line2: "of becoming", // italic serif
    line3: "that most software ignores.",
  },
  sub:
    "I'm one person. The name comes from two words — إنماء, Arabic for growing, and anima, Jung's word for the inner life. They're saying the same thing. " +
    "Each app I make here is built for a specific kind of inner operation. Balsam is the first. There will be others.",
};

export const manifesto = {
  eyebrow: "Why this exists",
  heading: {
    lead: "Jung spent thirty years",
    accent1: "reading alchemists.",
    middle: "I spent a few years wondering",
    accent2: "why the apps felt hollow.",
    trail: "",
  },
  paragraphs: [
    "He wasn't being mystical. He was using alchemy as a map — the medieval operations of the magnum opus as a way of naming what happens when a person changes from the inside. Nigredo, the blackening. Albedo, the clarifying. Rubedo, the integration. He thought they described something real about how psyches actually move.",
    "I kept building apps and kept running into the same problem. The tools didn't seem to know what they were for. They tracked things. They gamified things. They pushed notifications. They made money by making you stay longer. None of them seemed designed for the operation I was in the middle of.",
    "So this lab exists to try the other direction. Every project starts with a specific alchemical operation — a specific kind of transformation — and is shaped around helping a person do that work, not around getting them to come back tomorrow.",
    "It's a bit embarrassing to write out this plainly. But I'd rather say it plainly than hide it behind product language.",
  ],
};

// THE WORK — the lab's projects, each mapped to one alchemical operation.
// Balsam is in active development. The others are forming.
export const projects = [
  {
    index: "I",
    name: "Balsam",
    operation: "Dissolutio",
    phase: "Nigredo",
    sigil: "Alembic",
    platform: "iOS",
    kind: "For the work of inner healing",
    description:
      "An iPhone companion for the weeks you need a thing that doesn't make the weeks worse. It remembers where you left off, and it doesn't ask you to rate your mood on a ten-point scale.",
    status: "In development" as const,
  },
  {
    index: "II",
    name: "— (in formation)",
    operation: "Calcinatio",
    phase: "Nigredo",
    sigil: "Sulfur",
    platform: "macOS",
    kind: "For burning the noise away",
    description:
      "This one is still forming. The intent: what happens when a tool treats attention as something to protect, not harvest. I'll say more when there's more to say.",
    status: "Forming" as const,
  },
  {
    index: "III",
    name: "— (in formation)",
    operation: "Coagulatio",
    phase: "Citrinitas",
    sigil: "Salt",
    platform: "iOS",
    kind: "For consolidating what remains",
    description:
      "This one shows up later. The intent: helping a person hold on to what they've actually learned about themselves, instead of losing it to the next week.",
    status: "Forming" as const,
  },
  {
    index: "IV",
    name: "— (further out)",
    operation: "Conjunctio",
    phase: "Rubedo",
    sigil: "Rebis",
    platform: "iOS + macOS",
    kind: "For the integration of opposites",
    description:
      "Further out. This one might not happen for a long time. But it's where the lab is pointed.",
    status: "Distant" as const,
  },
] as const;

// JOURNAL — essays and notes, not marketing.
export const writing = [
  {
    slug: "why-alchemy",
    date: "2026-04-18",
    category: "Note",
    title: "Why I'm framing this in alchemy, when I know how it sounds.",
    excerpt:
      "Jung spent the last thirty years of his life reading alchemical texts. That part of his work is the part most people skip, and the part I can't.",
  },
  {
    slug: "one-app-is-not-enough",
    date: "2026-04-10",
    category: "Note",
    title: "Balsam is one tool. There have to be more.",
    excerpt:
      "No single app can do the whole of inner work. That's the premise the lab starts from.",
  },
  {
    slug: "slow-is-the-point",
    date: "2026-03-22",
    category: "Note",
    title: "Slow is the point, not the apology.",
    excerpt:
      "I've been building at a pace that would get a VC-funded founder fired. That is a feature of the lab, not a bug.",
  },
];

export const closingCta = {
  eyebrow: "Before you go",
  title: "Stay close.",
  sub: "I'll write when Balsam has a beta, and when the next project has a name. Not before.",
};

export const nav = [
  { label: "Why", href: "#manifesto" },
  { label: "The Work", href: "#work" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "X / Twitter", href: "https://x.com/enmalabs" },
  { label: "GitHub", href: "https://github.com/enmalabs" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enmalabs" },
];
