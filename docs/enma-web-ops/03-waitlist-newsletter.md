# Waitlist and Newsletter

## Current State

The current waitlist API sends emails to Loops when `LOOPS_API_KEY` exists.

Target state is open-source-first:

- Directus and Postgres store the canonical waitlist record.
- Mautic handles lifecycle sequences.
- Listmonk handles newsletters and editorial sends.
- Activepieces syncs approved state changes between systems.

## Waitlist Flow

1. Visitor submits email on `enmalabs.com`.
2. API validates email.
3. API writes or upserts `Person`.
4. API writes `App Interest` for Balsam or Enma general list.
5. API writes `Preference`.
6. Activepieces syncs person to Mautic and/or Listmonk.
7. Transactional confirmation is sent.
8. PostHog records waitlist conversion with UTM source.

## Waitlist Types

| Type | Use |
| --- | --- |
| Enma general | People interested in the lab as a whole. |
| Balsam beta | People interested in the first product beta. |
| App-specific | Future app-specific lists. |
| Editorial | People who want journal/newsletter updates. |
| Support/contact | People who wrote for support, not marketing. |

## Newsletter Flow

1. Editorial idea starts in Directus.
2. Newsletter draft is created in Listmonk or Mautic.
3. Segment is selected from Directus/Mautic.
4. Human approves final send.
5. Newsletter sends.
6. Opens, clicks, unsubscribes, and bounces are reported back.
7. Learning note is stored in Directus.

## Mautic vs Listmonk

Use Mautic for:

- beta invite journeys
- onboarding sequences
- re-engagement
- segmentation
- lifecycle scoring
- behavior-triggered campaigns

Use Listmonk for:

- monthly letters
- founder notes
- release notes
- simple product announcements
- lower-maintenance newsletter sends

## Required Fields

### Waitlist Entry

- `person_id`
- `app_id`
- `list_type`
- `source_url`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `status`
- `created_at`
- `consent_text_version`

### Email Event

- `person_id`
- `provider`
- `campaign_id`
- `event_type`
- `event_at`
- `metadata`

## Migration From Loops

1. Export Loops contacts.
2. Normalize emails and consent state.
3. Import into Directus/Postgres as `Person`, `Preference`, and `App Interest`.
4. Import newsletter subscribers into Listmonk.
5. Import lifecycle contacts into Mautic.
6. Run duplicate check before sending anything.
7. Switch `/api/waitlist` from Loops to the EnmaWeb API.
8. Keep Loops read-only for 30 days.
9. Retire `LOOPS_API_KEY`.

## Agent Rules

Agents may:

- draft newsletter issues
- create campaign drafts
- segment draft audiences
- summarize performance
- recommend beta invite batches

Agents may not:

- send newsletters without approval
- change consent state without evidence
- add people to marketing lists from support-only contact
- ignore unsubscribes
- import contacts without a provenance file
