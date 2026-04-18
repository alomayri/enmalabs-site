/**
 * All site copy. Edit here; the rest of the site reflects changes.
 *
 * Voice: technology with soul. Poetic, unhurried, specific.
 * Arabic root: إنماء (to develop, to grow). Latin: anima (soul).
 */

export const site = {
  name: "Enma Labs",
  tagline: "Technology with a soul.",
  url: "https://enmalabs.com",
  contactEmail: "hello@enmalabs.com",
};

export const hero = {
  eyebrow: "A creative technology lab",
  title: {
    line1: "We make software",
    line2: "that remembers",
    line3: "there's a person there.",
  },
  sub:
    "A small lab building iOS and macOS apps at the edge of what software can feel like. " +
    "Tools for focus, healing, journey, attention — the parts of a life most apps ignore.",
  cta: "Join the waitlist",
};

export const manifesto = {
  eyebrow: "Why we make what we make",
  title: "We believe the next decade of software is not faster. It is quieter.",
  paragraphs: [
    "Enma comes from two roots. From anima — the soul, the inner self Jung spent his life mapping. " +
      "From إنماء — the Arabic word for growing, developing, bringing something into its fuller form.",
    "Both roots point the same way. Software should help a person become more themselves, not less.",
    "So we build slowly. We ship less. We make the apps we would want to live inside.",
  ],
};

export const apps = [
  {
    name: "Balsam",
    platform: "iOS",
    kind: "Healing",
    tagline: "An inner journey, held in your hand.",
    description:
      "A gentle, guided companion for the long work of becoming okay. " +
      "The app stays out of the way when you need it to, and shows up when you don't.",
    status: "In development" as const,
  },
  {
    name: "Balsam Studio",
    platform: "macOS",
    kind: "Focus",
    tagline: "A player tuned to how the brain actually settles.",
    description:
      "Neuroscience-informed music sequencing — BPM ramping, ADHD-aware selection, " +
      "ultradian rhythms — with a single breathing visual as the only interface worth watching.",
    status: "Private beta" as const,
  },
  {
    name: "Journeys",
    platform: "iOS",
    kind: "Memory",
    tagline: "Every trip, worth writing down.",
    description:
      "A companion for the kind of travel that deserves a second read. " +
      "Build the arc before you leave. Keep the notes as you go. Revisit years later without having to dig.",
    status: "Concept" as const,
  },
];

export const chapters = [
  {
    index: "01",
    title: "The premise",
    body:
      "Every app we make begins with the same question — what would this look like if it were made by someone who cared?",
  },
  {
    index: "02",
    title: "The practice",
    body:
      "We work across iOS, macOS, and the uncomfortable spaces between design, neuroscience, and craft. Some of what we make is for everyone. Some of it is only for the people who find it.",
  },
  {
    index: "03",
    title: "The promise",
    body:
      "You will not hear from us when we do not have anything to say. When we ship something, you will know. Until then, we are in the workshop.",
  },
];

export const closingCta = {
  eyebrow: "When we ship something, you will know",
  title: "Join the waitlist.",
  sub: "Occasional letters. No noise. Unsubscribe in one click.",
};

export const nav = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Apps", href: "#apps" },
  { label: "Chapters", href: "#chapters" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "X / Twitter", href: "https://x.com/enmalabs" },
  { label: "GitHub", href: "https://github.com/enmalabs" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enmalabs" },
];
