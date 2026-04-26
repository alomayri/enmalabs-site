# Stack Map

## Locked Core

| Layer | Tool | Role | Why |
| --- | --- | --- | --- |
| Identity | Better Auth | Shared login, sessions, beta identity | Best fit for open-source Next.js auth. |
| Database | Postgres | Shared relational substrate | Every tool can integrate with it. |
| Control plane | Directus | Content, data, assets, app catalog, campaigns | Strong API surface, flows, and agent-control posture. |
| Automation | Activepieces | Workflows, approvals, integrations, agent tools | Strong MCP and piece model. |
| Publishing | Postiz | Social scheduling, channel variants, and analytics | Strongest open-source social publishing candidate. |
| Analytics | PostHog | Funnels, events, feature flags, experiments, surveys | Most complete open-source product analytics layer. |
| Lifecycle | Mautic | Segments, campaigns, lifecycle journeys | Mature open-source marketing automation. |
| Newsletter | Listmonk | Lightweight newsletters and bulk sends | Faster and simpler than Mautic for editorial mail. |
| Community | Discourse | Owned community and knowledge base | Durable, searchable, open-source community layer. |
| CRM | Twenty | Contacts, press, partners, beta relationships | Open-source CRM with modern object model. |
| Planning | Plane | Roadmaps, launches, portfolio tracking | Open-source Linear/Jira-style operating layer. |

## App Store Lane

| Tool | Role | Notes |
| --- | --- | --- |
| asc-mcp | Agent access to App Store Connect status, reviews, sales, and metadata checks | Newer and more agent-native than CLI-only options. Verify maturity before relying on it for writes. |
| RespectASO | Private ASO keyword research | Useful for keyword discovery without SaaS lock-in. |
| AppAgent | AI-first ASO and release workflow | Promising, but should be tested on one app first. |
| asactl | Apple Search Ads as code | Strong concept. Currently focused on Search Results campaigns. |
| aso-connect-cli | App Store Connect and Apple Search Ads CLI | Useful for metadata and review operations. |
| ZReviewTender | App Store and Play review monitoring | Good for routing reviews into workflows. |

## Creative Production Lane

| Tool | Role | Notes |
| --- | --- | --- |
| OpenMontage | Agentic video production using research, scripts, assets, editing, and Remotion | Best candidate for polished, programmable short-form video experiments. |
| OpenShorts | Self-hosted AI shorts and UGC-style video platform | Strong for TikTok/Reels/Shorts style formats. |
| Remotion | Deterministic video rendering from React | Use for brand templates that need repeatability. |
| FFmpeg | Encoding, composition, format conversion | Low-level media workhorse. |

## Optional Later Additions

| Tool | Use When |
| --- | --- |
| GrowthBook | Use if experiments outgrow PostHog's experiment layer. |
| Umami | Use only if a very lightweight privacy-first web analytics layer is needed. |
| n8n | Use if Activepieces cannot cover a specific connector or workflow. |
| Payload | Use if Enma later wants the CMS to live inside the Next.js repo instead of a separate control plane. |

## Content Management Decision

Directus is the content brain. It should hold blog posts, journal notes, editorial briefs, campaign records, channel variants, media assets, App Store metadata drafts, and learning notes.

Postiz is the publishing outlet. It should connect to X, TikTok, Instagram, Pinterest, YouTube, Reddit, LinkedIn, Threads, Medium, Dev.to, Hashnode, WordPress, Bluesky, Mastodon, Discord, Telegram, Slack, and Listmonk where Enma decides to operate.

Activepieces bridges the two: approved Directus channel variants become Postiz drafts, never automatic public posts unless a later phase explicitly approves that behavior.

## Decision Notes

Directus beats Payload for this project because agent control, APIs, flows, and an external operator UI matter more than Next.js-native elegance.

Activepieces beats n8n for this project because MCP and agent-operable pieces are first-class in the current direction.

PostHog stays because analytics, feature flags, surveys, experiments, and funnels should not become five separate systems.

Mautic and Listmonk are not duplicates. Mautic is the lifecycle brain. Listmonk is the simpler editorial sender.
