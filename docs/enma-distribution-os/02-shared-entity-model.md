# Shared Entity Model

This is the first data model for the Enma Distribution OS. It should start in Directus and Postgres, then flow into Activepieces, PostHog, Postiz, Mautic, Twenty, Plane, and App Store tooling.

## Core Entities

### App

Represents one Enma product.

Fields:

- `id`
- `name`
- `slug`
- `status`
- `platforms`
- `app_store_id`
- `bundle_id`
- `primary_offer`
- `stage`
- `owner`
- `public_url`
- `support_url`
- `privacy_url`
- `posthog_project_key`

### Audience

Represents a target segment.

Fields:

- `id`
- `name`
- `app_id`
- `job_to_be_done`
- `pain`
- `desired_state`
- `channels`
- `objections`
- `proof_needed`

### Campaign

Represents a coordinated public push.

Fields:

- `id`
- `name`
- `app_id`
- `objective`
- `start_date`
- `end_date`
- `budget_cap`
- `approval_status`
- `owner`
- `measurement_window_days`
- `success_metric`

### Content Asset

Represents a reusable source object, not just a post.

Fields:

- `id`
- `campaign_id`
- `app_id`
- `format`
- `angle`
- `source_text`
- `visual_brief`
- `script`
- `status`
- `approval_status`
- `canonical_url`
- `created_by`
- `reviewed_by`

### Post

Represents a platform-specific publication.

Fields:

- `id`
- `content_asset_id`
- `platform`
- `channel_account`
- `copy`
- `media_asset_id`
- `scheduled_at`
- `published_at`
- `postiz_id`
- `utm_url`
- `status`
- `metrics_snapshot`

### Experiment

Represents a measured test.

Fields:

- `id`
- `app_id`
- `campaign_id`
- `hypothesis`
- `variant_a`
- `variant_b`
- `primary_metric`
- `guardrail_metric`
- `posthog_link`
- `start_date`
- `end_date`
- `result`
- `decision`

### App Store Metadata Draft

Represents planned App Store metadata before App Store Connect mutation.

Fields:

- `id`
- `app_id`
- `locale`
- `subtitle`
- `promotional_text`
- `description`
- `keywords`
- `whats_new`
- `screenshot_set`
- `approval_status`
- `asc_version_id`

### Review

Represents App Store or Play Store review intake.

Fields:

- `id`
- `app_id`
- `store`
- `rating`
- `territory`
- `body`
- `reviewer_alias`
- `received_at`
- `sentiment`
- `theme`
- `linked_plane_issue`
- `response_status`

### Contact

Represents a person or organization.

Fields:

- `id`
- `email`
- `name`
- `source`
- `role`
- `apps_interested`
- `lifecycle_stage`
- `crm_owner`
- `twenty_id`
- `mautic_id`

## Data Ownership

| Data | Primary Owner | Mirrors |
| --- | --- | --- |
| App catalog | Directus | Plane, PostHog |
| Content calendar | Directus | Postiz, Mautic |
| Contact identity | Better Auth / Postgres | Twenty, Mautic, PostHog |
| Product analytics | PostHog | Directus weekly snapshots |
| Community posts | Discourse | Directus summary records |
| Roadmap and issues | Plane | Directus app status rollups |
| Reviews | ZReviewTender / asc-mcp | Plane, Directus |
| ASO drafts | Directus | App Store Connect tools |

## Rule

Directus stores the editorial and operational truth. Specialist tools execute or measure, then report back.
