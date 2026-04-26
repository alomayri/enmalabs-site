# Client Lifecycle

This is the end-to-end path for a person moving through EnmaWeb.

## Lifecycle Stages

| Stage | Meaning | Primary System |
| --- | --- | --- |
| Visitor | Anonymous site visitor | PostHog |
| Subscriber | Joined newsletter or waitlist | Directus, Mautic, Listmonk |
| Beta Candidate | Interested in a specific app beta | Directus |
| Beta User | Invited or admitted into beta | Directus, Better Auth, TestFlight/App Store |
| Active User | Uses an app | PostHog, app telemetry if allowed |
| Customer | Has an active entitlement or subscription | Postgres, Lago or StoreKit mirror |
| Support Contact | Has requested help | Directus, Plane, Discourse |
| Advocate | Gives useful feedback, shares, or refers | Twenty, Directus |
| Churned | Cancels or stops engaging | Lago/StoreKit mirror, PostHog, Mautic |

## Core Records

### Person

Fields:

- `id`
- `email`
- `name`
- `auth_user_id`
- `created_at`
- `country`
- `timezone`
- `source`
- `consent_status`
- `deleted_at`

### Organization

Use for future B2B clients.

Fields:

- `id`
- `name`
- `domain`
- `billing_email`
- `owner_person_id`
- `plan`
- `status`

### App Interest

Fields:

- `id`
- `person_id`
- `app_id`
- `interest_source`
- `waitlist_status`
- `beta_status`
- `priority_score`
- `notes`

### Entitlement

Fields:

- `id`
- `person_id`
- `organization_id`
- `app_id`
- `source`
- `source_record_id`
- `status`
- `plan`
- `starts_at`
- `renews_at`
- `ends_at`

`source` can be:

- `apple_iap`
- `lago`
- `manual_grant`
- `beta`
- `promo`

### Preference

Fields:

- `id`
- `person_id`
- `newsletter_opt_in`
- `product_updates_opt_in`
- `beta_invites_opt_in`
- `support_email_opt_in`
- `preferred_language`

## Automation Rules

Allowed without human approval:

- create internal person record after waitlist submission
- add person to non-public lifecycle segment
- send transactional confirmation email
- record support request
- record unsubscribe
- update analytics traits

Requires human approval:

- beta invite batch
- marketing newsletter
- lifecycle campaign launch
- public testimonial use
- manual entitlement grant outside beta policy
- account deletion exception

## Privacy Rules

The client lifecycle must respect:

- explicit opt-in for newsletters
- unsubscribe in every marketing email
- clear support contact path
- deletion and correction requests
- no fake medical or therapy claims
- no sensitive health-data collection unless the app actually adds it and privacy policy changes first
