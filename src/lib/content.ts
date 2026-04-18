/**
 * All site copy. Edit here; the rest of the site reflects changes.
 *
 * Voice rules:
 * - A person wrote this, not a brand.
 * - The opener of any paragraph is the actual thought, not setup for it.
 * - No em dashes. Use periods, commas, or sentence breaks. Em dashes are
 *   a known LLM tell, and they read as borrowed authority.
 * - Forbidden phrases: seamless, empower, leverage, streamline, crafted,
 *   transformative, meaningful, curated, thoughtful, delightful, intuitive,
 *   holistic, "we believe", "it's worth noting".
 *
 * Naming: إنماء (Arabic: to grow) plus anima (Latin: soul). Two words
 * for the same thing. The lab's internal map stays internal.
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
    line2: "of becoming",
    line3: "that most software ignores.",
  },
  sub:
    "I'm one person. The name comes from two words. إنماء is Arabic for growing. " +
    "Anima is Latin for soul. They point at the same thing. Each app in the lab " +
    "is built for a specific kind of inner work. Balsam is the first. " +
    "There will be others.",
};

export const manifesto = {
  eyebrow: "Why this exists",
  heading: {
    lead: "Most apps are built",
    accent1: "to keep you inside them.",
    middle: " These are built",
    accent2: "to help you leave.",
    trail: "",
  },
  paragraphs: [
    "Most software knows exactly what it's doing. It tracks. It gamifies. It sends notifications at the moment you're least likely to ignore them. The business model assumes your attention is the unit of value, and shapes the product to extract it.",
    "That's fine for some kinds of work. Not the kind I'm interested in. The quiet operations a person runs on themselves during a difficult year don't respond well to tools that want something from them.",
    "So the lab exists to try the other direction. Each project starts from a specific inner operation, a particular weight someone is carrying, and is shaped around that work. Not around what makes them open the app tomorrow.",
    "It's an embarrassingly small thing to say out loud. I'd rather say it plainly than dress it up in product language.",
  ],
};

// Projects. Unnamed projects have `name: ""` and the `kind` becomes the
// primary identifier. The `tint` field is neutral color metadata only.
export const projects = [
  {
    index: "I",
    name: "Balsam",
    tint: "warm",
    sigil: "Alembic",
    platform: "iOS",
    kind: "For the work of inner healing",
    description:
      "An iPhone companion for the weeks you need a thing that doesn't make the weeks worse. It remembers where you left off, and it doesn't ask you to rate your mood on a ten-point scale.",
    status: "In development" as const,
  },
  {
    index: "II",
    name: "",
    tint: "warm",
    sigil: "Sulfur",
    platform: "macOS",
    kind: "For burning the noise away",
    description:
      "Still forming. The intent: what happens when a tool treats attention as something to protect, not harvest. More when there's more to say.",
    status: "Forming" as const,
  },
  {
    index: "III",
    name: "",
    tint: "gold",
    sigil: "Salt",
    platform: "iOS",
    kind: "For holding what you've learned",
    description:
      "This one comes later. The intent: helping a person keep what they've actually learned about themselves, instead of losing it to the next week.",
    status: "Forming" as const,
  },
  {
    index: "IV",
    name: "",
    tint: "ember",
    sigil: "Rebis",
    platform: "iOS + macOS",
    kind: "For the parts that only make sense together",
    description:
      "Further out. This one might not happen for a long time. But it's where the lab is pointed.",
    status: "Distant" as const,
  },
] as const;

// Journal. Not marketing. Length signals weight: note, reflection, essay.
export const writing = [
  {
    slug: "what-the-tools-dont-do",
    date: "2026-04-18",
    category: "Note",
    title: "What the tools don't do.",
    excerpt:
      "Every app I've admired this year has a quiet list of things it refuses to do. I'm noticing the refusals more than the features.",
  },
  {
    slug: "one-tool-is-not-enough",
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
      "I've been building at a pace that would get a VC-funded founder fired. That's a feature of the lab, not a bug.",
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
