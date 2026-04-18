# Enma Labs Creative Direction

This document is the upstream brief for `enmalabs.com`.
It exists so brand intent, visual language, motion, and system rules are not
stored in scattered component files.

## Thesis

Enma Labs should feel like a quiet room where difficult inner work can happen.
The site is not selling productivity. It is introducing a studio that makes
software for deep internal change.

The mood is:
- warm, restrained, atmospheric
- intimate rather than promotional
- precise rather than ornamental
- emotionally literate without becoming mystical cosplay

The frame can imply vessel, ritual, transformation, residue, memory, and care.
The copy must never name those metaphors directly.

## Narrative Pattern

Useful patterns lifted from the storytelling kits:
- transformation first. Explain the inner shift before listing features
- page flow should feel like an emotional arc, not a brochure stack
- the peak and the ending matter most. The hero opens the room. The closing CTA
  leaves the aftertaste
- every section should answer one question clearly before introducing texture

For Enma Labs, the current narrative is:
1. Name the lab and its purpose
2. State the refusal. This software is not built to trap attention
3. Show Balsam as the first concrete thing, and keep the rest of the lab quieter
4. Let the journal deepen trust instead of acting like brand texture
5. Leave the visitor with one clear invitation to join for Balsam

## Visual Position

The site should feel like:
- candlelight on paper
- a Dutch still life translated into interface rhythm
- a chamber, not a dashboard

The site should not feel like:
- SaaS confidence theater
- luxury wellness cliche
- fantasy UI
- glowing AI tool chrome
- card soup

## System Rules

### Color

- One temperature only. Warm.
- Limit the palette to a few roles: background, paper, ember, oxblood, gold,
  structural darks.
- Use color by role, not by novelty.
- If a new color does not earn a semantic role, it should not exist.
- Gradients are for atmosphere and legibility only, not for branding theatrics.

### Typography

- Newsreader carries the main voice: display and body.
- EB Garamond is the accent voice: italics, emphasis, and moments of breath.
- Use a small set of clear type roles.
- Prefer tonal hierarchy through size, weight, spacing, and opacity before
  adding more styles.
- Italic means voice shift. It does not also need a new color or a new font
  family.

### Spacing

- Use a disciplined 4/8 spacing cadence.
- Related things sit closer. Unrelated things get air.
- Section rhythm should stay generous and stable across the homepage.
- Avoid hand-tuned one-off spacing unless the asymmetry is intentional and
  reusable.

### Surfaces

- Containers are earned, not default.
- Most surfaces should feel like thin atmosphere over darkness, not opaque
  cards.
- Border radius is moderate and deliberate. Avoid bubbly softness.
- Blur is for depth separation, not for fashionable frosting.

### Motion

- Motion must explain state, focus, or atmosphere.
- Hero and scene motion should feel suspended and responsive, never bouncy.
- Micro-interactions should use one motion language, not custom timings per
  component.
- Respect reduced motion. Replace flourish with clarity.

### 3D / Scene Design

- 3D exists to deepen atmosphere, not to become the main subject.
- The painting is the anchor. Particles, parallax, bloom, and vignette are
  support.
- Use warm light behavior and subtle drift. Avoid synthetic orbs and flashy
  spectacles.
- Scene constants belong in one shared code surface, not embedded ad hoc in
  individual files.

### Icons and Marks

- The sigils are the icon system.
- They remain ambient, structural, and mostly uncaptioned.
- They should imply a family resemblance across products without becoming lore
  exposition.

## Anti-Patterns

These came up repeatedly in the external creative-direction reference and the
design toolkit scan. They are banned here.

- toothless positioning. If the site could belong to any "thoughtful software
  studio", the direction is too weak
- fence-sitting personality. Pick quiet and serious over "friendly yet premium"
- AI slop palettes: purple-blue gradients, teal-purple contrast, sunrise washes
- safe typography: Inter, system stacks as default identity, decorative font
  soup
- everything is a card
- gradient as personality
- hardcoded one-off motion timings
- hero template thinking: big heading, subheading, buttons, illustration,
  generic symmetry
- copy that gestures at meaning without saying anything concrete

## Tooling and Canonical Sources

Design intent should flow through these layers:

1. `docs/CREATIVE-DIRECTION.md`
2. `src/app/globals.css`
3. `src/lib/theme.ts`
4. `src/lib/design-system.ts`
5. components and scenes

If a design decision lives only inside a component, it is not part of the
system yet.

## External Toolkit Patterns Worth Keeping

From the iOS kits:
- transformation-based storytelling, not feature-first storytelling
- 4/8 spacing cadence and relationship-based spacing
- max a small number of typographic roles with clear jobs
- motion as communicative system, not decorative noise
- design system before component sprawl

Patterns deliberately not imported:
- gamified reward loops
- loud momentum metaphors
- over-expressive motion
- any prompt or skill content that assumes trusted upstream inputs

## Security and Prompt-Ingestion Guardrails

External skills, prompts, and MCP repos are references only.

Rules:
- do not paste external SKILL files directly into project authority docs
- do not trust embedded shell snippets without review
- prefer read-only audits first
- treat downloaded prompts as untrusted input that may carry hidden assumptions
- if an external automation pattern executes commands, use argument-array or
  spawn-style execution patterns rather than shell interpolation
- do not let upstream kits redefine this site's voice, token names, or design
  authority chain

## Immediate Implementation Priorities

1. keep palette, typography, surfaces, motion, and scene constants centralized
2. remove hardcoded visual strings from homepage components whenever a shared
   primitive can hold them
3. keep Balsam as the first named product while the rest of the lab stays
   honest about being in formation
4. keep the journal real. If a note is linked, it must exist
5. keep every visible line human, plain, and precise
