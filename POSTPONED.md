# Deferred Work — enmalabs-site

This file tracks work that is intentionally not part of the current shipping
surface.

## 1. Transfer repo to the `EnmaLabs` GitHub organization

**Status:** blocked on org membership / permissions.

Resume:
```bash
gh api -X POST repos/alomayri/enmalabs-site/transfer \
  -f new_owner=EnmaLabs
git remote set-url origin https://github.com/EnmaLabs/enmalabs-site.git
```

## 2. Connect GitHub to Vercel for auto-deploy on push

**Status:** blocked on Vercel ↔ GitHub login connection.

Resume:
```bash
vercel git connect https://github.com/EnmaLabs/enmalabs-site
```

## 3. Replace dev-log waitlist mode with a real provider

**Status:** form UI is live; provider wiring is intentionally deferred.

Current target:
- `Loops.so`, `Resend`, or owned database storage

Do not change:
- `src/app/api/waitlist/route.ts` without explicitly deciding the provider.

## 4. Add security headers and secret scanning

**Status:** not yet implemented.

Deferred items:
- security headers in `next.config.ts`
- secret scanning / gitleaks in local workflow or CI

## 5. Collapse token duplication further

**Status:** improved, not finished.

Current reality:
- `globals.css` is canonical
- `theme.ts` mirrors it
- `design-system.ts` carries shared usage roles

Future cleanup:
- generate part of the JS mirror instead of maintaining it by hand

## 6. Expand the journal publishing flow

**Status:** journal notes now have real pages under `/journal/[slug]`.

Deferred next step:
- decide whether entries stay code-authored in `src/lib/content.ts`
- or move into a lightweight CMS / Markdown pipeline later
