# Content Management and Publishing

This is the publishing architecture for Enma Labs. It keeps blogs, social posts, newsletters, videos, and App Store copy connected to one source of truth.

## Decision

Use `Directus` as the canonical content management system and `Postiz` as the centralized platform publisher.

Directus is where Enma decides what exists.

Postiz is where approved channel-specific versions get scheduled, published, and measured.

## Why This Matters

Without this split, the same idea becomes scattered across:

- website blog drafts
- X posts
- TikTok scripts
- Instagram captions
- Pinterest pins
- YouTube descriptions
- newsletter drafts
- App Store promotional copy
- launch notes

The distribution system should preserve lineage. A reader should be able to trace every public post back to the original campaign, app, audience, and source idea.

## Canonical Flow

1. `Idea` enters Directus.
2. `Editorial Brief` defines the audience, app, promise, channel intent, and proof.
3. `Longform Draft` becomes a blog or journal post when needed.
4. `Channel Variants` are generated for each platform.
5. Human approves the monthly package.
6. Approved variants move to Postiz as drafts or scheduled posts.
7. Postiz publishes to connected platforms.
8. Postiz, PostHog, Mautic/Listmonk, and App Store tools report performance.
9. The result is written back to Directus as learning.

## Directus Collections

### Content Idea

Fields:

- `id`
- `title`
- `app_id`
- `audience_id`
- `source`
- `raw_note`
- `angle`
- `status`
- `priority`
- `created_by`

### Editorial Brief

Fields:

- `id`
- `idea_id`
- `campaign_id`
- `app_id`
- `primary_audience`
- `reader_state_before`
- `reader_state_after`
- `proof`
- `claim_boundaries`
- `channels`
- `approval_status`

### Blog Post

Fields:

- `id`
- `brief_id`
- `slug`
- `title`
- `excerpt`
- `body`
- `seo_title`
- `seo_description`
- `canonical_url`
- `status`
- `published_at`
- `related_app_id`

### Channel Variant

Fields:

- `id`
- `brief_id`
- `platform`
- `format`
- `copy`
- `hook`
- `media_requirements`
- `utm_url`
- `postiz_integration_id`
- `postiz_post_id`
- `status`
- `scheduled_at`
- `published_at`
- `metrics_snapshot`

### Media Asset

Fields:

- `id`
- `brief_id`
- `asset_type`
- `source`
- `file_url`
- `alt_text`
- `caption`
- `rights_status`
- `approved_for_platforms`

## Platform Map

Postiz should be the first central publishing layer for:

- X
- LinkedIn
- Reddit
- Instagram
- Facebook Page
- Threads
- YouTube
- TikTok
- Pinterest
- Medium
- Dev.to
- Hashnode
- WordPress
- Bluesky
- Mastodon
- Discord
- Slack
- Telegram
- Listmonk

Treat platform support as verified at setup time, not assumed forever. Every connected account should have:

- integration id
- owner
- authentication state
- allowed formats
- character limits
- media limits
- review requirement
- posting frequency cap

## Blog Strategy

The blog or journal should stay in Enma's voice. It should not become an SEO mill.

Use it for:

- founder notes
- product philosophy
- release notes that deserve a story
- App Store support explanations
- deep product essays
- search pages that answer real user questions

Do not use it for:

- thin keyword pages
- generic productivity advice
- medical claims
- fake thought leadership
- content that cannot be connected to a real app, user need, or product belief

## Monthly Content Package

Each month should produce one approval packet:

- 1 to 2 longform pieces
- 8 to 20 social posts
- 2 to 4 short-form video briefs
- 1 newsletter or waitlist update
- 1 App Store or ASO learning note if relevant
- channel-specific variants for each approved idea

Nothing moves from Directus into Postiz as scheduled public content until the package is approved.

## Agent Rules

Agents may:

- draft ideas
- create blog outlines
- create channel variants
- prepare Postiz drafts
- attach UTM links
- summarize performance
- recommend which ideas should become longform

Agents may not do without human approval:

- publish blog posts
- schedule public posts
- send newsletters
- post to TikTok, Instagram, X, Reddit, YouTube, or Pinterest
- change platform account credentials
- change legal, support, terms, or privacy content

## First Implementation Slice

Start with one tiny working version:

- Directus collections for `Content Idea`, `Editorial Brief`, `Blog Post`, `Channel Variant`, and `Media Asset`.
- Postiz connected to X, Instagram, TikTok, YouTube, Pinterest, Reddit, and LinkedIn.
- Activepieces flow: approved Directus channel variant creates a Postiz draft.
- PostHog UTMs attached to every outbound link.
- Weekly report writes results back to Directus.

