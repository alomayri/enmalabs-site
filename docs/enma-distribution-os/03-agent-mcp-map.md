# Agent and MCP Map

This file defines how Codex, Claude, and future agents should operate the distribution system.

## Native or Strong MCP Fit

| System | Agent Control Path | Allowed Agent Actions |
| --- | --- | --- |
| Activepieces | Native MCP and pieces | Draft flows, inspect runs, prepare approval queues, trigger approved workflows. |
| PostHog | Official MCP | Query funnels, inspect events, summarize experiments, draft insight reports. |
| Discourse | Official MCP server | Summarize threads, draft replies, classify feedback, find recurring issues. |
| Directus | API, flows, and MCP direction | Read/write content drafts, campaign records, app metadata, and approval states. |
| asc-mcp | App Store Connect MCP | Read app status, reviews, sales reports, metadata checks, and preflight results. |

## API or Webhook Wrapper Needed

| System | Wrapper Shape | First Wrapper |
| --- | --- | --- |
| Postiz | REST/API wrapper | Create draft post, list channels, schedule approved post, fetch analytics. |
| Mautic | API wrapper or Activepieces piece | Create/update contact, add segment, start campaign. |
| Listmonk | API wrapper | Create campaign draft, sync list, fetch campaign metrics. |
| Twenty | API wrapper | Create contact, update relationship stage, log outreach. |
| Plane | API wrapper | Create issue, update launch milestone, link review to backlog. |
| LogChimp | API wrapper | Create feedback item, update status, summarize votes. |
| ZReviewTender | Webhook output | Route reviews into Directus, Plane, and weekly reports. |
| RespectASO | CLI wrapper | Run keyword scan, export keyword table, attach to ASO draft. |
| asactl | CLI wrapper | Validate, plan, and only apply after approval. |
| aso-connect-cli | CLI wrapper | Pull metadata, draft metadata updates, never mutate without approval. |

## Agent Roles

### Research Agent

Finds competitor examples, keyword opportunities, channel trends, audience language, communities, and search surfaces.

Outputs:

- research brief
- source list
- campaign angles
- risks and claims to avoid

### Editorial Agent

Turns approved angles into posts, journal drafts, emails, release notes, and App Store metadata drafts.

Outputs:

- Directus content assets
- Mautic email drafts
- Postiz post drafts
- App Store metadata drafts

### Creative Agent

Creates scripts, storyboard notes, video prompts, screenshots, and render briefs.

Outputs:

- OpenMontage briefs
- OpenShorts briefs
- Remotion template data
- media review queue

### Performance Agent

Reads PostHog, Postiz, Mautic, Apple Search Ads, App Store Connect, and review data.

Outputs:

- weekly performance report
- next experiment proposal
- budget recommendation
- stop/scale recommendation

### Operator Agent

Maintains Directus records, Activepieces workflows, Plane launch tasks, and approval queues.

Outputs:

- execution status
- blocked items
- monthly approval packet
- audit log

## Approval Rules

Agents may:

- draft content
- create internal records
- prepare schedules
- generate creative options
- run analysis
- recommend budget moves
- prepare App Store metadata

Agents may not do without human approval:

- publish public content
- launch or increase ad spend
- mutate App Store metadata
- reply publicly to sensitive reviews
- change legal, privacy, support, or terms pages
- send bulk email
- apply Apple Search Ads plans
