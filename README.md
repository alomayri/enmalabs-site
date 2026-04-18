# Enma Labs

`enmalabs.com` is the public site for Enma Labs.

It is the front door for a one-person lab making software for inner work, with
**Balsam** as the first concrete product and a small public journal documenting
the work around it.

## What this repo contains

- the homepage at `/`
- real journal entries at `/journal/[slug]`
- the Balsam waitlist form UI
- the shared visual system and creative-direction docs that govern the site

## Canonical sources

Read these first:

1. `AGENTS.md`
2. `docs/CREATIVE-DIRECTION.md`
3. `src/lib/content.ts`
4. `src/app/globals.css`
5. `src/lib/theme.ts`
6. `src/lib/design-system.ts`

## Commands

```bash
npm run dev
npm run lint
npm run build
vercel --prod --yes
```

## Notes

- `src/app/api/waitlist/route.ts` is intentionally left alone unless the waitlist
  provider itself is being changed.
- `public/hero-reference.png` is the canonical hero image.
- If you change palette or type roles, update both `globals.css` and `theme.ts`.
