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
  heading: {
    lead: "We believe the next decade of software is not",
    accent1: "faster",
    middle: ". It is",
    accent2: "quieter",
    trail: ".",
  },
  paragraphs: [
    "Enma comes from two roots. From anima — the soul, the inner self Jung spent his life mapping. " +
      "From إنماء — the Arabic word for growing, developing, bringing something into its fuller form.",
    "Both roots point the same way. Software should help a person become more themselves, not less.",
    "So we build slowly. We ship less. We make the apps we would want to live inside.",
  ],
};

export const balsamSection = {
  eyebrow: "What we're building first",
  heading: "One app, made with care.",
};

export const chaptersSection = {
  eyebrow: "How we work",
  headingLead: "Three chapters",
  headingAccent: "one workshop",
  headingTrail: ".",
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
];

export const balsamStory = {
  eyebrow: "A quiet scene from Balsam",
  beats: [
    {
      cue: "Late evening",
      text: "The day has more edges than you have hands.",
    },
    {
      cue: "9:12 PM",
      text: "You sit down. The room is quieter than it was an hour ago.",
    },
    {
      cue: "9:13",
      text: "You open Balsam. It begins from where you left off instead of making you start over.",
    },
    {
      cue: "9:52",
      text: "Forty minutes later you notice you have not checked your phone once.",
    },
    {
      cue: "Tomorrow",
      text: "The app remembers enough to make returning easier.",
    },
  ],
};

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
  { label: "What we're building", href: "#apps" },
  { label: "Chapters", href: "#chapters" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "X / Twitter", href: "https://x.com/enmalabs" },
  { label: "GitHub", href: "https://github.com/enmalabs" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enmalabs" },
];
