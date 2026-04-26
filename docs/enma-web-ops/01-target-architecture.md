# Target Architecture

## EnmaWeb Definition

EnmaWeb is the shared web and client layer for Enma Labs.

It should support Balsam first, then the other apps without creating separate account, waitlist, newsletter, support, or subscription systems per app.

## Core Systems

| Layer | Tool | Role |
| --- | --- | --- |
| Identity | Better Auth | Login, sessions, account linking, beta access identity. |
| Database | Postgres | Durable client, app, entitlement, subscription, waitlist, and preference records. |
| Control plane | Directus | Operator UI and source of truth for client/app records. |
| Automation | Activepieces | Human-approved workflows, syncs, lifecycle triggers, agent actions. |
| Email lifecycle | Mautic | Segmentation, journeys, beta invites, lifecycle automation. |
| Newsletter | Listmonk | Editorial newsletters and simpler broadcast campaigns. |
| Analytics | PostHog | Waitlist funnel, activation, feature use, retention, experiments. |
| CRM | Twenty | Press, partners, beta users, high-touch contacts. |
| Roadmap | Plane | App roadmap, support issues, launch tasks, product feedback. |
| Billing | Lago | Web and B2B subscription billing when not using Apple IAP. |
| Metering | OpenMeter | Usage metering if an app later charges by usage, credits, API calls, or AI cost. |

## Source of Truth

Postgres is the persistence layer.

Directus is the human/operator source of truth.

Specialist systems execute:

- Mautic sends lifecycle automations.
- Listmonk sends newsletters.
- Lago bills web/B2B customers.
- StoreKit handles iOS digital purchases.
- PostHog measures behavior.
- Plane tracks work.
- Twenty tracks relationships.

## Account Model

One Enma account can have:

- multiple app interests
- multiple app installs
- multiple beta statuses
- multiple subscriptions or entitlements
- newsletter preferences
- support requests
- community identity
- privacy/export/deletion requests

## App Model

Each app under EnmaWeb gets:

- app record
- public page
- support scope
- waitlist/beta status
- App Store metadata pack
- subscription model
- lifecycle sequences
- analytics project or namespace
- roadmap/Plane project

## Authority Rule

Every client-facing decision should answer:

- Which app does this belong to?
- Which person or organization does it affect?
- Which system owns the record?
- Which automation is allowed to act on it?
- What requires human approval?
