# App Portfolio Organization

EnmaWeb sits above Balsam and the other apps.

The rule is one EnmaWeb layer, many app surfaces.

## Portfolio Model

### Enma Labs

Owns:

- legal entity
- domain
- support surfaces
- account system
- privacy and terms
- client database
- newsletter and lifecycle systems
- portfolio dashboard

### EnmaWeb

Operates:

- public site
- login
- waitlists
- blog/journal
- content management
- support portal
- subscription and entitlement mirror
- app catalog

### Apps

Each app owns:

- product code
- App Store record
- app-specific support scope
- app-specific analytics namespace
- roadmap
- release notes
- beta cohorts
- subscription product ids

## App Records

Create an `App` record for each product:

- Balsam
- App II
- App III
- App IV

Until the other apps are named, use stable internal slugs:

- `balsam`
- `app-ii`
- `app-iii`
- `app-iv`

## Folder and Documentation Organization

Use this repo structure:

- `docs/enma-soul-system/` for brand, narrative, visual language, and interaction soul.
- `docs/enma-distribution-os/` for growth, campaigns, channels, publishing, creative, ads, and App Store growth.
- `docs/enma-web-ops/` for clients, accounts, waitlists, newsletters, subscriptions, support, and app portfolio operations.

Do not scatter EnmaWeb planning across README notes, chat summaries, or one-off files.

## App-Specific Records

Each app should eventually have:

- app profile
- audience profile
- App Store metadata
- privacy notes
- support scope
- subscription/entitlement model
- content angles
- launch checklist
- analytics events
- roadmap

## Shared vs App-Specific

Shared:

- identity
- client records
- waitlist schema
- newsletter infrastructure
- payment/billing infrastructure
- support/contact surfaces
- analytics conventions
- content management
- publishing pipeline

App-specific:

- product copy
- screenshots
- App Store metadata
- subscription product ids
- onboarding
- analytics event names
- support categories
- roadmap items
