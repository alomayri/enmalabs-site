# 04. Visual System

Core rule:
- atmosphere should come from one disciplined system, not from scattered component tricks

Authority chain:

1. `src/app/globals.css` for primitive values
2. `src/lib/theme.ts` for JS token mirror
3. `src/lib/design-system.ts` for semantic roles and component recipes
4. components consume system decisions, they do not invent them

Required layers:

## Primitive
- warm neutral ramp
- amber / glow ramp
- clay / oxblood counter-accent
- spacing steps
- radius steps
- motion durations

## Semantic
- page surface
- section surface
- panel surface
- overlay surface
- input surface
- text primary
- text secondary
- border subtle
- border strong
- focus ring

## Component
- nav capsule
- quiet panel
- device shell
- waitlist field
- journal row
- product card

Typography rules:

- one display family, one serif voice family
- fewer text roles, not more
- measure and spacing should do as much work as styling

Container rules:

- not everything needs a card
- use whitespace and dividers before using borders
- use translucency mostly for chrome, not for every content block

Anti-slop rules:

- no misleading token names long-term
- no cool gradients
- no nested decorative panels
- no ornamental symbols added just to make a section feel “special”
