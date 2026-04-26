# Source Register

This file records the research basis for the Enma Distribution OS.

## Primary Sources Checked

### Control Plane and CMS

- Directus API: https://directus.io/docs/api
- Directus API usage: https://directus.io/docs/getting-started/use-the-api
- Directus flows: https://directus.io/docs/api/flows
- Payload REST API: https://payloadcms.com/docs/rest-api/overview
- Payload GraphQL API: https://payloadcms.com/docs/graphql/overview

### Automation and MCP

- Activepieces repository: https://github.com/activepieces/activepieces
- Activepieces MCP: https://activepieces.com/mcp
- Activepieces Postiz piece: https://github.com/activepieces/activepieces/pull/12272
- Activepieces Mautic piece: https://github.com/activepieces/activepieces/pull/1283
- n8n MCP community server: https://github.com/RPGMais/mcp-n8n
- n8n MCP agent: https://github.com/anatolykoptev/n8n-mcp-agent

### Analytics and Community

- PostHog MCP docs: https://posthog.com/docs/model-context-protocol
- PostHog MCP repository: https://github.com/posthog/mcp
- Discourse MCP: https://github.com/discourse/discourse-mcp
- PostHog repository: https://github.com/PostHog/posthog
- LogChimp repository: https://github.com/logchimp/logchimp

### Social Publishing

- Postiz app: https://github.com/gitroomhq/postiz-app
- Postiz agent: https://github.com/gitroomhq/postiz-agent
- Mixpost: https://github.com/inovector/mixpost

### Email and Lifecycle

- Mautic repository: https://github.com/mautic/mautic
- Mautic organization: https://github.com/mautic
- Listmonk repository: https://github.com/knadh/listmonk
- Listmonk site: https://listmonk.app/

### CRM and Planning

- Twenty CRM: https://github.com/twentyhq/twenty
- Plane: https://github.com/makeplane/plane

### App Store and ASO

- App Store Connect MCP: https://github.com/pofky/appstore-connect-mcp
- RespectASO: https://github.com/respectlytics/respectaso
- AppAgent: https://github.com/ngo275/app-agent
- asactl: https://github.com/robaerd/asactl
- aso-connect-cli: https://github.com/pboudoin/aso-connect-cli
- ZReviewTender: https://github.com/ZhgChgLi/ZReviewTender

### Video Automation

- OpenMontage: https://github.com/calesthio/OpenMontage
- OpenShorts: https://github.com/mutonby/openshorts
- Claude Video Kit: https://github.com/runesleo/claude-video-kit
- ReelForge: https://github.com/pedro199288/reelforge

## Research Judgment

The strongest current open-source stack is not a single project. It is a composable control plane:

- Directus for truth
- Activepieces for motion
- PostHog for learning
- Postiz for outward publishing
- Mautic/Listmonk for lifecycle
- Discourse/Twenty/Plane for relationship and operational memory
- App Store tools for platform growth
- OpenMontage/OpenShorts for short-form creative

## Things To Recheck Before Implementation

- Exact licenses and commercial restrictions for Directus, Activepieces, PostHog, Twenty, OpenMontage, and AppAgent.
- Whether Directus MCP is stable enough for production agent operations.
- Whether `asc-mcp` is mature enough for write operations or should stay read-only.
- Whether Postiz supports every target platform needed for Enma accounts.
- Whether TikTok and Reddit publishing require official app approvals or platform-specific limitations.
- Whether Mautic alone can cover newsletter needs before adding Listmonk.
