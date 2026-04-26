# Subscriptions and Billing

## Principle

The business logic should be open-source and owned by Enma.

Payment rails and platform purchase rails are exceptions:

- iOS digital goods and subscriptions generally use Apple in-app purchase.
- Card and bank payments require an external payment processor.

The EnmaWeb system should still own the customer record, entitlement mirror, support context, analytics, and lifecycle state.

## Tool Decision

Use `Lago` first for web and B2B billing.

Use `OpenMeter` if usage-based metering, credits, AI costs, API usage, or feature quotas become central.

Use `Kill Bill` only if subscription complexity becomes enterprise-grade.

## Why Lago First

Lago is an open-source Stripe Billing alternative and supports subscription-based and usage-based billing. It is a better first fit than Kill Bill because it is lighter and closer to modern product-led SaaS workflows.

## Why OpenMeter Later

OpenMeter is strong when Enma needs:

- usage meters
- entitlements
- quotas
- prepaid credits
- customer usage dashboards
- AI/API cost tracking

That is likely useful for future B2B or AI-heavy products, but it may be too much for Balsam's first release.

## Why Kill Bill Not First

Kill Bill is mature and powerful, but heavier. Keep it as the enterprise option if Enma later needs complex payment routing, multi-subscription bundles, invoices, account hierarchies, or advanced billing plugins.

## iOS Subscription Flow

For Balsam and other iOS apps:

1. App uses StoreKit for digital purchases.
2. Apple processes the purchase.
3. App Store Server Notifications report subscription changes.
4. Enma backend verifies and records entitlement mirror.
5. Postgres stores entitlement state.
6. Directus shows support/operator view.
7. PostHog records activation and conversion events without collecting more personal data than needed.
8. Mautic/Listmonk lifecycle rules respect entitlement and consent state.

## Web or B2B Subscription Flow

For non-iOS or B2B web subscriptions:

1. Plan is defined in Lago.
2. Customer exists in Postgres and Directus.
3. Checkout uses selected external payment processor.
4. Lago records subscription and invoice state.
5. Entitlement mirror is written to Postgres.
6. Directus shows operator state.
7. PostHog tracks conversion and retention.
8. Mautic handles lifecycle emails.

## Entitlement States

- `trialing`
- `active`
- `grace_period`
- `past_due`
- `canceled`
- `expired`
- `refunded`
- `beta_grant`
- `manual_grant`

## Required Records

### Plan

- `id`
- `app_id`
- `name`
- `source`
- `billing_period`
- `price`
- `currency`
- `features`
- `status`

### Subscription

- `id`
- `person_id`
- `organization_id`
- `app_id`
- `source`
- `source_record_id`
- `plan_id`
- `status`
- `started_at`
- `renews_at`
- `ended_at`

### Invoice

- `id`
- `source`
- `source_record_id`
- `person_id`
- `organization_id`
- `amount`
- `currency`
- `status`
- `issued_at`
- `paid_at`

## Agent Rules

Agents may:

- summarize revenue
- detect churn risk
- draft winback campaigns
- prepare pricing experiments
- reconcile entitlement mismatches
- create billing support notes

Agents may not:

- change plan pricing
- grant paid access
- refund users
- cancel subscriptions
- apply Apple Search Ads spend changes
- send billing-related bulk emails without approval
