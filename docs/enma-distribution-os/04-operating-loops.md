# Operating Loops

The system should feel like a monthly operating rhythm, not a pile of dashboards.

## Monthly Content Approval Loop

1. Directus holds campaign goals, app priorities, current audience, and content inventory.
2. Research Agent drafts channel opportunities and angles.
3. Editorial Agent drafts one month of blog posts, channel variants, emails, journal notes, and launch assets.
4. Creative Agent prepares video and image briefs.
5. Human reviews one monthly packet.
6. Approved channel variants move to Postiz, approved emails move to Mautic/Listmonk, and approved media briefs move to creative production.
7. Activepieces schedules and watches execution.

Exit evidence:

- approved content calendar
- approved campaign budget
- approved creative queue
- approved blog and channel variants
- scheduled posts
- email drafts ready or scheduled

## Weekly Performance Loop

1. Performance Agent pulls PostHog funnels, Postiz results, Mautic/Listmonk sends, review deltas, App Store metrics, and community signals.
2. Agent labels every campaign as `scale`, `hold`, `fix`, or `stop`.
3. Operator Agent creates Plane tasks for product or site follow-up.
4. Human approves budget changes and public pivots.

Exit evidence:

- weekly performance memo
- top three learnings
- next three experiments
- stopped campaigns
- approved scale moves

## App Store Loop

1. RespectASO scans keywords and competitors.
2. AppAgent or aso-connect-cli drafts metadata options.
3. asc-mcp checks App Store Connect state, build state, review state, and metadata completeness.
4. Human approves metadata changes.
5. App Store tooling prepares update or change request.
6. ZReviewTender and asc-mcp monitor reviews after release.

Exit evidence:

- ASO keyword table
- metadata draft
- App Store Connect preflight
- review response queue
- product feedback issues in Plane

## Video Creative Loop

1. Directus campaign creates a `video_brief`.
2. Creative Agent writes script, hook, scenes, captions, and source assets.
3. OpenMontage or OpenShorts generates candidates.
4. Human approves or rejects.
5. Approved clips move to Postiz with UTM links.
6. PostHog and Postiz report performance.

Exit evidence:

- source brief
- rendered candidates
- approval decision
- published platform links
- performance summary

## Community Loop

1. Discourse receives community discussion and support conversations.
2. Agents summarize recurring themes.
3. Twenty stores important relationships.
4. Plane receives real product issues or feature requests.
5. Directus stores public-facing insights or journal opportunities.

Exit evidence:

- top recurring questions
- roadmap-linked feedback
- relationship updates
- public note candidates

## Paid Acquisition Loop

1. Campaign has a clear objective and budget cap in Directus.
2. Search Ads config lives in Git through `asactl` when Apple Search Ads begins.
3. Performance Agent reads PostHog, App Store metrics, and Apple Ads results.
4. Agent recommends spend movement.
5. Human approves any budget mutation.

Exit evidence:

- approved budget cap
- campaign config
- PostHog conversion view
- plan before apply
- weekly budget decision
