/**
 * All site copy. Edit here; the rest of the site reflects changes.
 *
 * Voice: a person wrote this, not a brand. Keep it that way.
 * إنماء (Arabic: to grow) + anima (Jung: the inner self).
 */

export const site = {
  name: "Enma Labs",
  tagline: "Software, slowly.",
  url: "https://enmalabs.com",
  contactEmail: "hello@enmalabs.com",
};

export const hero = {
  eyebrow: "A software lab",
  title: {
    line1: "We make software",
    line2: "that remembers",
    line3: "there's a person there.",
  },
  sub:
    "It's a small lab. We work on iOS and macOS. " +
    "Balsam is the first app we're putting out — it's for the kind of night where you want something on your phone that doesn't make you feel worse. " +
    "Whatever comes after that will take a while.",
  cta: "Join the waitlist",
};

export const manifesto = {
  eyebrow: "Why this exists",
  heading: {
    lead: "The best software probably",
    accent1: "makes you",
    middle: "use your phone a",
    accent2: "little less",
    trail: ".",
  },
  paragraphs: [
    "The name is a bit indulgent but it's honest. Anima is Jung's word for the inner part of a person. إنماء is Arabic for growing. They're saying roughly the same thing, which is: becoming a little more yourself. That's what we want software to be good at, and mostly it isn't.",
    "So we're trying to see if a small app can go the other way — if it can be the thing you open when the day was a lot, and close ten minutes later feeling slightly more like a person. That's the whole goal. It's a bit embarrassing to write out, but there it is.",
    "Practically, that means we ship less than we could, we're okay with it, and if you're looking for a company that's growing fast, this isn't one.",
  ],
};

export const balsamSection = {
  eyebrow: "The first one",
  heading: "What Balsam actually is.",
};

export const chaptersSection = {
  eyebrow: "About us",
  headingLead: "A few things",
  headingAccent: "we keep learning",
  headingTrail: ".",
};

export const apps = [
  {
    name: "Balsam",
    platform: "iOS",
    kind: "Healing",
    tagline: "For the late-night parts of getting better.",
    description:
      "An iPhone app for the weeks you'd rather have a companion than another feed. " +
      "It remembers where you left off. It doesn't ask you to rate your mood on a scale of one to ten, " +
      "and it doesn't want you there for eight hours a day.",
    status: "In development" as const,
  },
];

export const balsamStory = {
  eyebrow: "An evening on Balsam",
  beats: [
    {
      cue: "Late evening",
      text: "The day had more edges than you had hands.",
    },
    {
      cue: "9:12",
      text: "You sat down. The room was quieter than it was an hour ago.",
    },
    {
      cue: "9:13",
      text: "You opened Balsam. It started where you left off. No 'welcome back.'",
    },
    {
      cue: "9:52",
      text: "Forty minutes went by. You didn't check your phone.",
    },
    {
      cue: "Tomorrow",
      text: "It will remember enough that you don't start over.",
    },
  ],
};

export const chapters = [
  {
    index: "01",
    title: "Why we started",
    body:
      "I kept using apps that felt like nobody really cared if they were any good. " +
      "I wanted to see what happened if somebody did.",
  },
  {
    index: "02",
    title: "How we work",
    body:
      "Code on Macs, ship to iPhones. We read a lot about attention and the inner life, some of it useful. " +
      "Most of the ideas actually come from noticing what other software does poorly, " +
      "and wishing it didn't.",
  },
  {
    index: "03",
    title: "What to expect from us",
    body:
      "No newsletter cadence. If you get an email from us, it's because something real exists. " +
      "Otherwise assume we're busy making it.",
  },
];

export const closingCta = {
  eyebrow: "Before you go",
  title: "Leave us your email.",
  sub: "We'll write to you when Balsam has a beta to try, and not really before that.",
};

export const nav = [
  { label: "Why", href: "#manifesto" },
  { label: "Balsam", href: "#apps" },
  { label: "About", href: "#chapters" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "X / Twitter", href: "https://x.com/enmalabs" },
  { label: "GitHub", href: "https://github.com/enmalabs" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enmalabs" },
];
