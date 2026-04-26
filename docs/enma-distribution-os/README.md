# Enma Distribution OS

This directory is the handover surface for the Enma Labs distribution system.

The goal is one shared growth and operations layer for all four Enma apps, not four separate marketing stacks. The system should help agents draft, measure, schedule, analyze, and improve distribution work while keeping humans in the approval seat for monthly content, budget changes, public messaging, and anything that can affect reputation.

## Current Decision

Use an open-source-first, agent-operable stack:

- `Better Auth` for shared login and beta identity.
- `Postgres` as the shared data substrate.
- `Directus` as the source of truth and operator control plane.
- `Activepieces` as the automation and agent workflow layer.
- `Postiz` as the multi-platform publishing layer.
- `PostHog` as analytics, experiments, surveys, and feature flags.
- `Mautic` as lifecycle automation.
- `Listmonk` as a lightweight newsletter and campaign sender if Mautic feels heavy.
- `Discourse` as owned community.
- `Twenty` as CRM for beta users, press, partners, and relationships.
- `Plane` as portfolio and roadmap tracking across the four apps.
- `ZReviewTender`, `asc-mcp`, `RespectASO`, `AppAgent`, `asactl`, and `aso-connect-cli` as the App Store operating lane.
- `OpenMontage` and `OpenShorts` as the video automation bench.

## Approval Posture

The user reported Apple approval on 2026-04-26. Codex has not verified this inside App Store Connect.

That changes the next plan: stop optimizing the public website for enrollment proof and move into App Store Connect readiness, beta acquisition, release operations, ASO, review monitoring, and distribution instrumentation.

## Read Order

1. [00-context-and-principles.md](00-context-and-principles.md)
2. [01-stack-map.md](01-stack-map.md)
3. [02-shared-entity-model.md](02-shared-entity-model.md)
4. [03-agent-mcp-map.md](03-agent-mcp-map.md)
5. [04-operating-loops.md](04-operating-loops.md)
6. [05-apple-after-approval-plan.md](05-apple-after-approval-plan.md)
7. [06-rollout-plan.md](06-rollout-plan.md)
8. [07-source-register.md](07-source-register.md)

## Non-Negotiables

- Agents may create drafts, run analysis, prepare schedules, and produce recommendations.
- Humans approve monthly calendars, budget increases, ad launches, production publishing, App Store metadata changes, and public claims.
- Every artifact belongs to one app, one campaign, one channel, and one measurement loop.
- Distribution work must feed learning back into the product and roadmap, not just create more posts.
- The stack should be replaceable by parts. No single tool becomes the whole system.
