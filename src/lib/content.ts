/**
 * All site copy. Edit here; the rest of the site reflects changes.
 *
 * Voice: technology with soul. Poetic, unhurried, specific.
 * Arabic root: إنماء (to develop, to grow). Latin: anima (soul).
 */

export const site = {
  name: "Balsam",
  tagline: "A quieter way to listen.",
  url: "https://enmalabs.com",
  contactEmail: "hello@enmalabs.com",
};

export const hero = {
  eyebrow: "A listening app for focus and healing",
  title: {
    line1: "Music that meets",
    line2: "your mind where it is,",
    line3: "then helps it settle.",
  },
  sub:
    "Balsam is a quiet app for focus, rest, and inner steadiness. " +
    "It remembers what helps, suggests what fits the moment, and stays gentle enough to live with every day.",
  cta: "Join the waitlist",
};

export const manifesto = {
  eyebrow: "Why Balsam exists",
  title: "Some listening apps chase attention. Balsam is built to give it back.",
  paragraphs: [
    "It starts with a simple belief: sound can do more than fill silence. It can help the body unclench, help attention return, and make a difficult hour more workable.",
    "So Balsam learns with care. Recommendation memory notices the sessions you come back to, the states you reach for, and the combinations that actually help.",
    "The interface stays quiet on purpose. Listening history, presets, and suggestions are there when you want them, but nothing competes with the act of settling in.",
  ],
};

export const apps = [
  {
    name: "Balsam",
    platform: "iOS",
    kind: "Focus and healing",
    tagline: "A calm music player that remembers what helps.",
    description:
      "Built around recommendation memory, binaural presets, listening history, and mental-state-aware suggestions. " +
      "Balsam feels less like browsing a catalog and more like returning to a place that already knows your rhythm.",
    status: "In development" as const,
  },
];

export const chapters = [
  {
    index: "01",
    title: "Healing without spectacle",
    body:
      "Balsam is for the moments when you need help focusing, softening, sleeping, or getting through the noise without another noisy product in your face.",
  },
  {
    index: "02",
    title: "Memory that serves you",
    body:
      "The app keeps track of listening history and recommendation snapshots so your next session can begin from something real, not from zero.",
  },
  {
    index: "03",
    title: "Presets with a purpose",
    body:
      "Binaural presets and state-based suggestions are there for focus, relaxation, meditation, and sleep, all presented through an interface that stays quiet enough to trust.",
  },
];

export const closingCta = {
  eyebrow: "When Balsam is ready, you will hear from us",
  title: "Join the waitlist.",
  sub: "Occasional updates about Balsam. No hype. Unsubscribe in one click.",
};

/**
 * Balsam Story — a narrated scene sequence that scrolls.
 * One concrete evening. Five beats. Each beat fades in as the user scrolls,
 * holds, then softens out as the next arrives. No AI platitudes — just
 * specific, small moments that add up to the feeling of the product.
 */
export const balsamStory = {
  eyebrow: "An evening with Balsam",
  beats: [
    {
      cue: "9:12 PM",
      text: "You finally sit down. The kids are asleep. The house is quieter than it was an hour ago.",
    },
    {
      cue: "9:13",
      text: "You open Balsam. It starts from where you left off last night.",
    },
    {
      cue: "9:14",
      text: "One album. One room. No feed asking you to pick something else.",
    },
    {
      cue: "9:52",
      text: "Forty minutes later you notice you haven't opened your phone once.",
    },
    {
      cue: "Tomorrow",
      text: "It will be waiting. In the same place.",
    },
  ],
};

export const nav = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Balsam", href: "#apps" },
  { label: "Chapters", href: "#chapters" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "X / Twitter", href: "https://x.com/enmalabs" },
  { label: "GitHub", href: "https://github.com/enmalabs" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enmalabs" },
];
