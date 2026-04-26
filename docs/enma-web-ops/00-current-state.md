# Current State

## Verified In This Repo

The public Enma Labs site is a Next.js app under `/Users/xapath/Downloads/Apps/enmalabs-site`.

The current waitlist API is:

- `src/app/api/waitlist/route.ts`

Current behavior:

- validates email locally
- uses `LOOPS_API_KEY` if present
- sends contacts to `https://app.loops.so/api/v1/contacts/create`
- falls back to console logging in development

That means the current waitlist is not open-source-only. It is operational and simple, but it depends on Loops.

## Current Website Surfaces

The site already has:

- `/`
- `/journal/[slug]`
- `/privacy`
- `/support`
- `/contact`
- `/terms`
- `/api/waitlist`

## Current Gap

The site has a public waitlist, but it does not yet have a shared EnmaWeb client system.

Missing:

- centralized client records
- login/account surface
- beta access status
- app-specific waitlist positions
- newsletter preferences
- subscription and entitlement records
- support history linked to a person
- app ownership and portfolio model
- agent-operable control plane for these records

## Current Direction

Do not add more SaaS dependencies for the EnmaWeb core.

The target is to migrate from `Loops-only waitlist` to:

- `Better Auth` for identity
- `Postgres` for durable records
- `Directus` for operator control
- `Mautic` and `Listmonk` for email
- `Lago` or Apple IAP entitlements for subscriptions
- `PostHog` for behavior and conversion analytics
- `Activepieces` for automation and approvals
