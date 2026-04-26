# Implementation Plan

This plan moves EnmaWeb from a public site with a SaaS waitlist into an open-source-first client operating layer.

## Phase 0: Documentation and Authority

Status: in progress.

Tasks:

- Create `docs/enma-web-ops/`.
- Document current waitlist dependency on Loops.
- Document target open-source stack.
- Document client lifecycle, waitlist/newsletter, subscriptions, and portfolio model.
- Link EnmaWeb docs from `AGENTS.md`.

Exit criteria:

- docs committed and pushed
- build passes
- next implementation scope is clear

## Phase 1: Data Model and Local API

Goal:

Replace the Loops-first waitlist endpoint with an Enma-owned data model.

Tasks:

- Add Postgres.
- Add Better Auth foundation.
- Define tables for person, app, app interest, preference, waitlist entry, entitlement, subscription, and email event.
- Update `/api/waitlist` to write to Enma-owned storage first.
- Keep Loops export/import only as migration reference.

Exit criteria:

- waitlist submission persists in Enma-owned database
- duplicate email handling works
- consent text version is stored
- dev and production paths are documented

## Phase 2: Directus Control Plane

Goal:

Give Enma an operator UI for clients, waitlists, app records, content, and support state.

Tasks:

- Deploy Directus connected to the shared Postgres or a controlled schema.
- Create collections for the entity model.
- Add roles for admin, editor, support, and agent service account.
- Create app catalog records for Balsam and future apps.
- Add dashboards for waitlist, beta cohorts, and subscriptions.

Exit criteria:

- Directus shows Balsam waitlist and app interest records
- service account can write drafts but not publish irreversible changes
- fields match docs

## Phase 3: Newsletter and Lifecycle

Goal:

Move email into open-source systems.

Tasks:

- Deploy Mautic.
- Deploy Listmonk if needed for editorial sends.
- Sync Directus/Postgres people and preferences into Mautic/Listmonk.
- Create beta invite sequence.
- Create monthly newsletter draft flow.
- Add unsubscribe handling.

Exit criteria:

- transactional confirmation works
- newsletter draft can be approved and sent
- unsubscribes are honored
- support-only contacts do not enter marketing segments

## Phase 4: Subscriptions and Entitlements

Goal:

Create one entitlement model across iOS and web.

Tasks:

- Implement entitlement mirror in Postgres.
- For iOS, connect StoreKit and App Store Server Notifications.
- For web/B2B, evaluate Lago first.
- Add OpenMeter only if usage metering is needed.
- Add admin visibility in Directus.

Exit criteria:

- one user can have beta access, Apple IAP entitlement, or web subscription in the same model
- support can see entitlement state
- agents can summarize mismatches but cannot grant access

## Phase 5: Full EnmaWeb Portfolio

Goal:

Make EnmaWeb work for all four apps.

Tasks:

- Add records for all four apps.
- Create per-app waitlist and beta cohorts.
- Create app-specific newsletter segments.
- Create app-specific support categories.
- Create portfolio dashboard.
- Link Plane projects to app records.

Exit criteria:

- every app has status, audience, waitlist, roadmap, content, and entitlement model
- Enma can answer what is happening per app without searching chat history
