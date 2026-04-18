# Postponed Work — enmalabs-site

Things intentionally deferred. Each has a clear acceptance criterion and the
exact command / URL to pick up from when ready.

---

## 1. Transfer repo to `EnmaLabs` GitHub organization

**Status:** blocked on GitHub org permissions.
**Why deferred:** `alomayri` user account is not a member of the `EnmaLabs` org.
GitHub returned `422 Validation Failed` on transfer attempt.

**To resume:**

1. From an `EnmaLabs` org owner/admin account, go to
   <https://github.com/orgs/EnmaLabs/people>
2. Click **Invite member** → `alomayri` → role **Owner**
3. `alomayri` accepts the invitation (email or
   <https://github.com/orgs/EnmaLabs/invitation>)
4. Retry the transfer:
   ```bash
   gh api -X POST repos/alomayri/enmalabs-site/transfer \
     -f new_owner=EnmaLabs
   ```
5. Update local git remote:
   ```bash
   git remote set-url origin https://github.com/EnmaLabs/enmalabs-site.git
   ```

**Current repo location:** <https://github.com/alomayri/enmalabs-site>
(public, already holds the redesign + polish commits)

---

## 2. Connect GitHub → Vercel for auto-deploy on push

**Status:** blocked on Vercel ↔ GitHub OAuth connection.
**Why deferred:** the Vercel user account does not have a GitHub login
connection. Vercel CLI returned `400: You need to add a Login Connection to
your GitHub account first`.

**To resume:**

1. Go to <https://vercel.com/account/login-connections>
2. Click **Add** next to GitHub → authorize the Vercel app
3. (Optional) Install the Vercel GitHub App on the `EnmaLabs` org (after
   step 1 above is done) so the connection has access to the transferred
   repo: <https://github.com/apps/vercel>
4. From this project directory, run:
   ```bash
   vercel git connect https://github.com/EnmaLabs/enmalabs-site
   ```
5. Verify: push a trivial commit — Vercel should auto-build a preview.

**Order matters:** connect GitHub→Vercel *first*, then transfer the repo.
That way the Vercel connection picks up the new ownership automatically.

---

## 3. Wire the waitlist form to a real email provider

**Status:** scaffolded; currently in `dev-log` mode (POST returns 200 and
logs to server console, nothing persisted).
**Why deferred:** user said "Loops skip, we will do this [later]".

**To resume:**

1. Create Loops.so account → <https://app.loops.so>
2. Dashboard → Settings → API → create API key
3. Create Audience → copy audience ID
4. Add to `.env.local`:
   ```
   LOOPS_API_KEY=...
   ```
   and for Vercel:
   ```bash
   vercel env add LOOPS_API_KEY production
   ```
5. Redeploy. The `/api/waitlist` route auto-switches from dev-log to Loops
   when `LOOPS_API_KEY` is set — zero code change needed.

**Alternative providers:** Resend (simpler, transactional-focused),
Supabase (own the list in Postgres), Google Sheet webhook (free, small
volume). Swap the fetch target in `src/app/api/waitlist/route.ts`.

---

## 4. Replace placeholder 3D hero with fal.ai-generated asset

**Status:** placeholder icosahedron with iridescent material + orbital
halo. Visually coherent, but a generic solid shape.
**Why deferred:** need to design the actual motif first.

**To resume:**

1. Generate candidate 3D assets via <https://fal.ai> (text-to-3D models
   like `fal-ai/zero123`, `fal-ai/triposr`, or GLB outputs from 3D gen)
2. Export as `.glb`, drop in `public/models/enma-motif.glb`
3. In `src/components/HeroScene.tsx`, replace the `<Soul />` mesh with:
   ```tsx
   import { useGLTF } from "@react-three/drei";
   function Soul() {
     const { scene } = useGLTF("/models/enma-motif.glb");
     return <primitive object={scene} />;
   }
   ```
4. Remove the placeholder icosahedron + torus ring.

**Design direction to test:** the brand is "anima + إنماء" (soul + growth).
Candidates worth generating: a growing seedling, a folded paper crane, a
single drop suspended mid-fall, an abstract organic form that looks
half-grown. Avoid globes, spheres, and anything that reads "corporate
tech."

---

## 5. Add interactive narration audio (stretch goal)

**Status:** not started. Site has scroll-linked visual narration but no
audio layer.
**Why deferred:** text-first UX validates the copy direction before
committing to voice recordings.

**To resume:**

1. Record short voice-over clips (30-90 seconds each) for the 3 chapters.
2. Use ElevenLabs, PlayHT, or record human voice.
3. Host clips on Vercel Blob or public/audio.
4. Add a subtle `<button>` to the hero: **Listen to the story**. On click,
   starts sequential playback with per-chapter auto-advance and a
   minimal progress indicator.
5. Consider Web Audio API for crossfades between chapters.

---

## 6. Add the lab's actual case studies / past work

**Status:** site has three apps (Balsam, Balsam Studio, Journeys) but no
completed-project case studies.
**Why deferred:** until we've shipped something publicly, there's nothing
to case-study.

**To resume when first app ships:**
- Add `src/lib/caseStudies.ts` with project entries
- Add a new section between Apps and Chapters in `page.tsx`
- Content pattern: one hero line + one result number + one paragraph +
  one outbound link to the live project or App Store listing.
