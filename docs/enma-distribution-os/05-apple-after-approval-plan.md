# Apple After-Approval Plan

The user reported Apple approval on 2026-04-26. Treat this as user-reported until App Store Connect access is verified by an agent.

## What Changes Now

The public website no longer needs to keep expanding for Apple enrollment proof. It already has the right legitimacy surfaces:

- company domain
- legal entity
- work email
- phone
- mailing address
- privacy page
- support page
- contact page
- terms page

The next focus is App Store Connect readiness and distribution instrumentation.

## Immediate App Store Connect Tasks

1. Verify Apple Developer Program approval inside App Store Connect.
2. Confirm `ENMA LABS, LLC` team identity and role access.
3. Create or verify the Balsam app record.
4. Confirm bundle ID and SKU.
5. Enter URLs:
   - Privacy Policy URL: `https://enmalabs.com/privacy`
   - Support URL: `https://enmalabs.com/support`
   - Marketing URL: `https://enmalabs.com`
6. Draft Balsam subtitle, description, keywords, promotional text, and copyright.
7. Complete privacy questionnaire from the actual Balsam privacy manifest and app behavior.
8. Prepare screenshots and app preview plan.
9. Prepare review notes that state Balsam is self-guided and not medical treatment, therapy, diagnosis, or emergency support.

## Data to Confirm From Balsam

Before App Store submission, verify from the iOS repo:

- data collected
- data linked to user
- tracking status
- account requirements
- analytics presence
- crash reporting presence
- local storage behavior
- network calls
- AI or cloud features
- health data or HealthKit usage
- emergency/safety language

Known earlier signal:

- The Balsam privacy manifest was observed as local-first and non-tracking in prior work.
- This must be rechecked before final App Store privacy answers.

## App Store Metadata Pack

Create these as Directus records once Directus exists. Until then, keep them in a reviewable markdown packet:

- app name
- subtitle
- promotional text
- description
- keywords
- categories
- age rating rationale
- support URL
- privacy URL
- review notes
- screenshot captions
- release notes

## App Store Review Monitoring

After release:

- `asc-mcp` reads review status, sales, and reviews for agent summaries.
- `ZReviewTender` routes reviews to Slack, Plane, Directus, or weekly reports.
- One-star and two-star reviews become Plane issues if they describe real defects.
- Feature requests become Directus feedback records or LogChimp items.
- Sensitive replies require human approval.

## What Not To Add

Do not add HIPAA language unless the app truly becomes a covered healthcare service.

Do not imply Balsam is therapy, diagnosis, treatment, crisis support, or medical advice.

Do not create fake enterprise posture. The voice should stay plain, direct, and careful.
