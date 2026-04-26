# EnmaWeb Operations

This directory is the handover surface for EnmaWeb: the shared web, account, client, waitlist, newsletter, subscription, and app-portfolio layer under Enma Labs.

EnmaWeb is not only the marketing site. It is the future operating layer for all Enma apps:

- public website
- blog and journal
- login and account identity
- waitlist and beta access
- newsletter and lifecycle email
- customer and client records
- app subscriptions and entitlements
- support and feedback
- portfolio tracking for Balsam and the other apps

## Current Decision

Use an open-source-first stack:

- `Better Auth` for web login and sessions.
- `Postgres` as the shared customer and entitlement database.
- `Directus` as the operator control plane for apps, clients, waitlists, content, and metadata.
- `Mautic` for lifecycle marketing and automation.
- `Listmonk` for simpler newsletters and editorial sends.
- `Postiz` for cross-platform publishing.
- `PostHog` for product and website analytics.
- `Twenty` for CRM.
- `Plane` for roadmap and launch work.
- `Lago` as the first-choice open-source billing layer for web/B2B subscriptions.
- `OpenMeter` if usage metering becomes important.
- `Kill Bill` only if subscription complexity becomes enterprise-grade.

## Platform Exception

For iOS digital subscriptions, Apple in-app purchase and StoreKit are platform requirements. The Enma side should still keep the entitlement mirror, client state, support history, analytics, and lifecycle logic in open-source systems.

## Read Order

1. [00-current-state.md](00-current-state.md)
2. [01-target-architecture.md](01-target-architecture.md)
3. [02-client-lifecycle.md](02-client-lifecycle.md)
4. [03-waitlist-newsletter.md](03-waitlist-newsletter.md)
5. [04-subscriptions-billing.md](04-subscriptions-billing.md)
6. [05-app-portfolio-organization.md](05-app-portfolio-organization.md)
7. [06-implementation-plan.md](06-implementation-plan.md)
8. [07-source-register.md](07-source-register.md)

## Boundary With Distribution OS

`docs/enma-distribution-os/` owns campaign, content, channel publishing, App Store growth, ads, creative, and performance loops.

`docs/enma-web-ops/` owns client identity, access, waitlists, newsletters, support, subscriptions, entitlements, and the app portfolio model.

The two systems meet at Directus, Postgres, PostHog, and Activepieces.
