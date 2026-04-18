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
  tagline: "Software for inner work.",
  url: "https://enmalabs.com",
  contactEmail: "hello@enmalabs.com",
};

export const hero = {
  eyebrow: "Enma Labs",
  title: {
    line1: "Software for the parts",
    line2: "of inner work",
    line3: "that most software mishandles.",
  },
  sub:
    "Enma Labs is where I make software for inner work. Balsam is the first " +
    "release and the reason to join the list. The rest of the lab stays quiet " +
    "until there is something real to show.",
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
    "Most software is tuned for return. It learns the habit, rewards the loop, and keeps asking for one more visit.",
    "That logic breaks when the work is private. Grief, repair, steadiness, and attention do not need a product pushing back at them.",
    "Enma Labs exists to make smaller tools for those moments. Balsam is the first. Anything else will stay in outline until it earns a name.",
    "I would rather release one useful thing slowly than publish a confident roadmap too early.",
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
    status: "Active" as const,
  },
  {
    index: "II",
    name: "",
    tint: "warm",
    sigil: "Sulfur",
    platform: "macOS",
    kind: "For clearing the noise",
    description:
      "Still in notes. A desktop tool for protecting attention instead of farming it.",
    status: "In notes" as const,
  },
  {
    index: "III",
    name: "",
    tint: "gold",
    sigil: "Salt",
    platform: "iOS",
    kind: "For keeping what changed",
    description:
      "Still in notes. A quieter companion for holding onto what you learned after the hard part passes.",
    status: "In notes" as const,
  },
  {
    index: "IV",
    name: "",
    tint: "ember",
    sigil: "Rebis",
    platform: "iOS + macOS",
    kind: "For work that spans devices",
    description:
      "Further out. One system for the things that only make sense together.",
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
    body: [
      "The more software I use, the more I pay attention to what it refuses to ask of me.",
      "Good tools leave a surprising amount of space untouched. They do not ask for a streak, a score, or another quick check-in so the system can feel alive. They let the person stay the subject.",
      "That has become part of the test for Enma Labs. If a feature makes the product feel busier than the person using it, it does not belong.",
    ],
  },
  {
    slug: "one-tool-is-not-enough",
    date: "2026-04-10",
    category: "Note",
    title: "Balsam is one tool. There have to be more.",
    excerpt:
      "No single app can do the whole of inner work. That's the premise the lab starts from.",
    body: [
      "Balsam can be specific because it is only trying to help with one kind of weight.",
      "That is the whole point of the lab. Inner work changes shape from season to season, and the software should be allowed to do the same instead of stretching one product until it becomes vague.",
      "So the ambition here is not a platform. It is a family of smaller tools that each know what they are for.",
    ],
  },
  {
    slug: "slow-is-the-point",
    date: "2026-03-22",
    category: "Note",
    title: "Slow is the point, not the apology.",
    excerpt:
      "I've been building at a pace that would get a VC-funded founder fired. That's a feature of the lab, not a bug.",
    body: [
      "This work has been slow because it is trying not to inherit the speed of the systems it argues with.",
      "There is a version of this site where every future product already has a polished name, a perfect card, and a promise I cannot yet keep. That version would be easier to ship and less honest to stand behind.",
      "I would rather let the lab look unfinished than let it pretend certainty it has not earned.",
    ],
  },
];

export const closingCta = {
  eyebrow: "Join for Balsam",
  title: "Get the beta note.",
  sub:
    "The list is for Balsam first. If another Enma Labs tool becomes real, you'll hear when it has shape, not before.",
};

export const nav = [
  { label: "Why", href: "#manifesto" },
  { label: "Balsam", href: "#work" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "X / Twitter", href: "https://x.com/enmalabs" },
  { label: "GitHub", href: "https://github.com/enmalabs" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enmalabs" },
];
