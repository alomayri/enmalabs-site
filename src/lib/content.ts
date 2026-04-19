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
    "Enma Labs is a small software studio for inner work. " +
    "Balsam is the first product. The journal keeps the notes while the " +
    "rest of the lab is still taking shape.",
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
    "It's a small thing to say out loud. I'd rather say it plainly than dress it up in product language.",
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

export const balsamPreview = {
  eyebrow: "A small evening with Balsam",
  heading: "Try the rhythm before the app exists in your hand.",
  lead:
    "This is not the finished product. It is a small interactive study of how Balsam should feel when a tired person opens it at night.",
  helper: "Tap the moments. The phone changes with them.",
  moments: [
    {
      time: "9:12 PM",
      label: "Arrive",
      title: "You open the app and it resumes the room instead of starting over.",
      body:
        "No feed. No shove toward discovery. The session begins from where you left it, as if the lamp was already lit.",
      screenTitle: "Resume last session",
      screenMeta: "Last night, unfinished.",
      accent: "Continue where you left off",
      queue: [
        { label: "Resume the same sequence", state: "Ready" },
        { label: "Saved for tonight", state: "Queued" },
        { label: "Return to this tomorrow", state: "Saved" },
      ],
      noteLabel: "Listening memory",
      note: "The app keeps the shape of the evening so you do not have to build it again.",
    },
    {
      time: "9:16 PM",
      label: "Hold",
      title: "The queue feels like a gentle decision, not another management task.",
      body:
        "You can move one thing higher, let another wait, and keep the mood intact. Nothing on screen behaves like it needs your urgency.",
      screenTitle: "Queue for tonight",
      screenMeta: "Held with the mood intact.",
      accent: "A few things, in order",
      queue: [
        { label: "Start where you are already settled", state: "Ready" },
        { label: "One thing to deepen the room", state: "Queued" },
        { label: "One thing for after", state: "Later" },
      ],
      noteLabel: "Queue note",
      note: "The queue behaves like a soft intention, not a task list asking to be cleared.",
    },
    {
      time: "9:47 PM",
      label: "Settle",
      title: "The player starts to disappear once the listening has taken over.",
      body:
        "The controls stay near. The light stays low. The app remembers that the point is not to keep interacting with it.",
      screenTitle: "Session mode",
      screenMeta: "Low light. No interruption.",
      accent: "The screen gives way",
      queue: [
        { label: "Minimal controls still within reach", state: "Live" },
        { label: "No feed interrupting the mood", state: "Quiet" },
        { label: "Keep the room steady", state: "On" },
      ],
      noteLabel: "Session note",
      note: "The interface keeps enough shape to be useful, then stops trying to be the main event.",
    },
    {
      time: "Tomorrow",
      label: "Return",
      title: "When you come back, the residue is still there.",
      body:
        "A useful player remembers what soothed you, what held, and what should be waiting again. Memory should feel like care, not surveillance.",
      screenTitle: "Return path",
      screenMeta: "Saved for the next difficult evening.",
      accent: "What helped is still here",
      queue: [
        { label: "What soothed you last time", state: "Saved" },
        { label: "What you meant to return to", state: "Waiting" },
        { label: "What can stay quiet for now", state: "Paused" },
      ],
      noteLabel: "Return note",
      note: "The app notices what mattered and leaves it where you can find it again without effort.",
    },
  ],
} as const;

export const closingCta = {
  eyebrow: "Before you go",
  title: "Stay close.",
  sub:
    "The list is for Balsam first. I'll write when the beta is ready, and if another part of the lab earns a name. Not before.",
};

export const company = {
  summary:
    "Enma Labs is a small software studio building tools for inner work. Balsam is the first product in development.",
  legalEntity: "ENMA LABS, LLC",
  supportEmail: "hello@enmalabs.com",
  supportPhone: "(567) 221-9984",
  mailingAddress: [
    "131 Continental Dr Ste 305",
    "Newark, Delaware 19713-4324",
    "United States",
  ],
  responseWindow: "I usually reply within a few business days.",
  supportNote:
    "Write if you need help with Balsam, want to say hello, have an idea that would make the experience gentler, or need a plain answer about the company or the work.",
};

export const contactPage = {
  title: "Contact Enma Labs",
  lead:
    "Email is still the clearest way into the lab. Write if you need help with Balsam, want to recommend a feature, want to say hello, or need a human answer about the work.",
};

export const supportPage = {
  title: "Support",
  lead:
    "Support is handled directly by email right now. Write if Balsam breaks, if something in the app feels off, or if you want to say what would make the experience calmer, clearer, or more useful.",
  sections: [
    {
      heading: "For Balsam beta support",
      points: [
        "Describe what you were trying to do.",
        "Say what happened instead, and whether you can reproduce it.",
        "Include your device model, iOS version, and app build if you have it.",
        "If the issue involves playback or history, mention the last thing you remember doing before it broke.",
      ],
    },
    {
      heading: "For feedback and feature requests",
      points: [
        "Say what part of the experience felt heavy, unclear, or missing.",
        "If a feature almost works, describe what would make it click for you.",
        "If you want to say hello or tell me how the app met you, that belongs here too.",
      ],
    },
    {
      heading: "For general and company questions",
      points: [
        "Use the same address for press, partnerships, product questions, and App Store support matters.",
        "If you are writing about enrollment, legal identity, company details, or verification, say that plainly in the subject line.",
      ],
    },
    {
      heading: "What Balsam is and is not",
      points: [
        "Balsam is a self-guided app for inner work. It is not medical care, therapy, or crisis response.",
        "Support replies are not live-monitored, and they are not the right channel for emergencies or urgent mental health needs.",
        "If you are in immediate danger or need urgent care, contact local emergency services or a licensed professional where you are.",
      ],
    },
  ],
};

export const termsPage = {
  title: "Terms of Use",
  lead:
    "These terms describe the basic shape of the relationship between you, the site, and the pre-release versions of Balsam. They are written plainly on purpose.",
  updated: "April 19, 2026",
  facts: [
    { label: "Company", value: "ENMA LABS, LLC" },
    { label: "Applies to", value: "enmalabs.com, the waitlist, and Balsam pre-release access" },
    { label: "Contact", value: "hello@enmalabs.com · (567) 221-9984" },
  ],
  sections: [
    {
      heading: "What these terms cover",
      body: [
        "These terms apply to your use of enmalabs.com, your communication with Enma Labs through the site, and any pre-release or beta access to Balsam that Enma Labs chooses to provide.",
        "If a later public release of Balsam requires product-specific terms, those terms may sit alongside these rather than replacing them entirely.",
      ],
    },
    {
      heading: "What Enma Labs is providing",
      body: [
        "The site exists to describe the lab, collect waitlist interest, publish notes, and provide support and contact information.",
        "Pre-release access to Balsam, when offered, is offered as a developing product that may change, break, pause, or disappear while the work is still being shaped.",
      ],
    },
    {
      heading: "Boundaries of the product",
      body: [
        "Balsam is a tool for reflection and inner work. It is not medical treatment, psychotherapy, diagnosis, or emergency support.",
        "Nothing on the site or in the app should be taken as a substitute for care from a licensed clinician or emergency service.",
        "If you are in crisis, believe you may harm yourself or someone else, or need urgent support, do not wait for the app or an email reply. Contact local emergency services or a qualified professional where you are.",
      ],
    },
    {
      heading: "Accounts, access, and beta participation",
      body: [
        "Joining the waitlist does not guarantee access to a beta, a public release, or a particular timeline.",
        "If Enma Labs grants you pre-release access, that access may be limited, suspended, or revoked if the build becomes unstable, the program changes, or the testing needs change.",
      ],
    },
    {
      heading: "Your use of the site and app",
      body: [
        "Use the site and any pre-release software lawfully and in good faith. Do not try to interfere with the service, bypass reasonable restrictions, or use the work in a way that harms others.",
        "If you send feedback, bug reports, or feature ideas, Enma Labs may use that input to improve the work without owing compensation for the suggestion.",
      ],
    },
    {
      heading: "Content, ownership, and availability",
      body: [
        "The site, app, writing, design, and related materials remain the property of ENMA LABS, LLC unless a different owner is explicitly stated.",
        "Enma Labs may update, pause, or remove parts of the site or beta software at any time, especially while the work is still in development.",
      ],
    },
    {
      heading: "Warranty and liability",
      body: [
        "The site and any pre-release software are provided as they are, without promises that they will be uninterrupted, error-free, or fit for every situation.",
        "To the extent allowed by law, ENMA LABS, LLC is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the site or pre-release software.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If these terms change, the date at the top of the page will change with them.",
        "Material changes will appear here before Enma Labs relies on them.",
      ],
    },
  ],
};

export const privacyPage = {
  title: "Privacy Policy",
  lead:
    "This page covers enmalabs.com, the waitlist, and pre-release communication around Balsam. If the shipped app handles data differently, this policy will be updated before release.",
  updated: "April 19, 2026",
  facts: [
    { label: "Applies to", value: "enmalabs.com and Balsam pre-release communication" },
    { label: "Controller", value: "ENMA LABS, LLC" },
    { label: "Legal entity", value: "ENMA LABS, LLC" },
    { label: "Address", value: "131 Continental Dr Ste 305, Newark, Delaware 19713-4324, United States" },
    { label: "Contact", value: "hello@enmalabs.com · (567) 221-9984" },
  ],
  sections: [
    {
      heading: "What this policy covers",
      body: [
        "This policy covers the Enma Labs website, the waitlist, support communication, and pre-release communication around Balsam.",
        "It does not try to describe data handling for a shipped Balsam app that is not live yet. If the released app collects, stores, or transmits anything beyond what is described here, this policy will be updated before that release.",
      ],
    },
    {
      heading: "What Enma Labs collects",
      body: [
        "If you join the waitlist, Enma Labs collects the email address you submit so I can send product updates about Balsam and occasional studio notes.",
        "If you write for support or contact, Enma Labs receives the information you choose to send, which may include your name, email address, device details, app build information, or a description of the issue.",
        "The site and its infrastructure may also receive standard technical request data such as IP address, browser information, and request logs used to operate, secure, and troubleshoot the service.",
      ],
    },
    {
      heading: "How that information is used",
      body: [
        "Waitlist information is used to send product updates, beta invitations, and related support communication.",
        "Support information is used to answer your question, reproduce bugs, improve the product, and keep a record of what was resolved.",
        "Enma Labs does not sell personal information and does not use the waitlist for third-party advertising.",
      ],
    },
    {
      heading: "Third-party services and processors",
      body: [
        "Some information is processed by third-party services used to run the site and communication around it. Those services act on behalf of Enma Labs rather than buying the information for their own marketing use.",
        "As of this version, that can include website hosting and email or waitlist infrastructure. If those providers change in a way that materially changes what happens to your information, this policy will be updated.",
      ],
    },
    {
      heading: "Retention",
      body: [
        "Waitlist information is kept for as long as it is needed to run the waitlist, send updates, manage beta access, and maintain a basic record of who asked to hear from the lab.",
        "Support messages may be kept for as long as they are useful to resolve issues, understand product history, or meet legal and operational obligations.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You can unsubscribe from email updates at any time using the unsubscribe link in the email, when available, or by writing to hello@enmalabs.com.",
        "You can request access to, correction of, or deletion of the personal information Enma Labs holds about you by email.",
      ],
    },
    {
      heading: "What Enma Labs does not do",
      body: [
        "Enma Labs is not in the business of building ad profiles, selling mailing lists, or turning support messages into a secondary product.",
        "If that ever changes in a meaningful way, this page will have to change first.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "If this policy changes, the date at the top of the page will change with it.",
        "Material changes will be reflected here before they are relied on in the product or the site.",
      ],
    },
  ],
};

export const nav = [
  { label: "Why", href: "#manifesto" },
  { label: "The Work", href: "#work" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "/contact" },
];

export const companyLinks = [
  { label: "Support", href: "/support" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "X / Twitter", href: "https://x.com/enmalabs" },
  { label: "GitHub", href: "https://github.com/enmalabs" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enmalabs" },
];
