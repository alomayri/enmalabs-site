# Rollout Plan

This plan moves from useful and small to fully agent-operated.

## Phase 0: Handover and Baseline

Goal:

Create one documented plan and one source of truth for the distribution system.

Tasks:

- Keep this directory as the distribution authority.
- Document the chosen stack.
- Confirm Apple approval in App Store Connect.
- Recheck Balsam privacy behavior before App Store privacy answers.
- Create the first App Store Connect metadata packet.

Exit criteria:

- docs are committed
- Balsam App Store metadata draft exists
- App Store Connect status is verified
- privacy questionnaire draft exists

## Phase 1: Minimum Useful System

Goal:

Get one app, one content calendar, one analytics loop, and one approval loop working.

Install or configure:

- Directus
- Postgres
- Activepieces
- PostHog
- Postiz

Tasks:

- Create Directus app catalog with Balsam as the first app.
- Create campaign, content asset, post, experiment, and metadata collections.
- Connect site waitlist events to PostHog.
- Create Postiz draft workflow from Directus approved posts.
- Create monthly approval packet flow in Activepieces.

Exit criteria:

- one month of Balsam content can be drafted, approved, scheduled, and measured
- no public publish happens without approval
- PostHog can show waitlist conversion by source

## Phase 2: App Store Operating Layer

Goal:

Make App Store operations visible and repeatable.

Install or configure:

- asc-mcp
- RespectASO
- ZReviewTender
- AppAgent or aso-connect-cli
- asactl when Apple Search Ads begins

Tasks:

- Pull App Store Connect status through agent tools.
- Run first ASO keyword scan.
- Draft metadata variants.
- Prepare Apple Search Ads YAML only after the first campaign goal is clear.
- Route reviews into Plane and weekly reports.

Exit criteria:

- App Store status can be checked by agent
- reviews flow into the operating system
- ASO draft is tied to measurement

## Phase 3: Lifecycle and Community

Goal:

Turn waitlist and user attention into durable relationships.

Install or configure:

- Mautic
- Listmonk if needed
- Discourse
- Twenty
- Plane

Tasks:

- Sync waitlist and beta contacts into Twenty and Mautic.
- Build Balsam beta invite sequence.
- Create support/community categories in Discourse.
- Link feedback to Plane and Directus.
- Create weekly relationship report.

Exit criteria:

- beta users have lifecycle state
- support and community feedback becomes product work
- relationships are not trapped in inboxes

## Phase 4: Creative and Paid Growth

Goal:

Build a repeatable creative factory and start mathematically controlled spend.

Install or configure:

- OpenMontage
- OpenShorts
- Remotion templates
- Apple Search Ads through asactl

Tasks:

- Create video templates for Balsam.
- Produce weekly candidate clips.
- Run approved clips through Postiz.
- Start small Apple Search Ads experiments.
- Review `plan` before every ad mutation.

Exit criteria:

- creative output has a source brief, render, approval, publish link, and metric result
- budget movement is evidence-based and human-approved

## Phase 5: Four-App Scale

Goal:

Generalize the operating system to all four Enma apps.

Tasks:

- Add app records for all four projects.
- Define app-specific audiences, offers, channels, and metrics.
- Create shared campaign templates.
- Create portfolio dashboard.
- Create monthly Enma operating review.

Exit criteria:

- every app has current status, audience, roadmap, content backlog, and measurement view
- agents can explain what to do next per app with evidence
