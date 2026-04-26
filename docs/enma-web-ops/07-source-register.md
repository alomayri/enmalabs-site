# Source Register

This register records the research basis for the EnmaWeb client, waitlist, newsletter, and subscription plan.

## Existing Repo Evidence

- Current waitlist endpoint: `src/app/api/waitlist/route.ts`
- Current dependency: `LOOPS_API_KEY` and `https://app.loops.so/api/v1/contacts/create`
- Current public pages: `/privacy`, `/support`, `/contact`, `/terms`

## Open-Source Systems

### Identity

- Better Auth: https://github.com/better-auth/better-auth

### Content and Control Plane

- Directus API: https://directus.io/docs/api
- Directus flows: https://directus.io/docs/api/flows

### Email

- Mautic: https://github.com/mautic/mautic
- Listmonk: https://github.com/knadh/listmonk
- Listmonk site: https://listmonk.app/

### Publishing

- Postiz app: https://github.com/gitroomhq/postiz-app
- Postiz agent: https://github.com/gitroomhq/postiz-agent
- Postiz docs: https://github.com/gitroomhq/postiz-docs

### Analytics

- PostHog: https://github.com/PostHog/posthog
- PostHog MCP: https://posthog.com/docs/model-context-protocol

### CRM and Roadmap

- Twenty: https://github.com/twentyhq/twenty
- Plane: https://github.com/makeplane/plane

### Billing and Subscriptions

- Lago: https://github.com/getlago/lago
- Lago front: https://github.com/getlago/lago-front
- OpenMeter: https://github.com/openmeterio/openmeter
- Kill Bill: https://github.com/killbill/killbill
- Meteroid: https://github.com/meteroid-oss/meteroid

### Apple Platform

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines
- App Store Server Notifications: https://developer.apple.com/documentation/appstoreservernotifications
- Enabling App Store Server Notifications: https://developer.apple.com/documentation/storekit/in-app_purchase/subscriptions_and_offers/enabling_server-to-server_notifications/

## Research Judgment

For EnmaWeb, use open-source systems for the control plane, data model, lifecycle, analytics, CRM, planning, and web billing logic.

Treat Apple IAP and payment processors as unavoidable external rails, not as the system of record.

## Recheck Before Implementation

- Better Auth adapter choice for the current Next.js version.
- Whether Directus should share the app database or use a separate database with controlled sync.
- Mautic/Listmonk deliverability setup, including domain authentication.
- Exact Postiz platform coverage in the chosen deployment mode.
- Lago license and deployment burden.
- Whether Balsam needs subscriptions at first release or only beta access.
- App Store Server Notification version and endpoint requirements before implementing.
