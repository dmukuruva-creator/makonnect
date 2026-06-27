# Dev Task Board — programmer handoff

Ready-to-pick **coding** tasks for collaborators. (Non-coding/governance work and approvals live in [CONSULT.md](./CONSULT.md).) Pick a task, say so in the WhatsApp `#dev` thread, open a PR. *As of 2026-06-27 — living doc.*

## Working agreements (read once)

- **Read [AGENTS.md](../AGENTS.md) before writing code** — this Next.js major has breaking changes vs. older docs.
- **Synthetic data only.** Never put real records or secrets in the repo, dev, or preview. All reads go through [lib/data.ts](../lib/data.ts), not seed imports directly.
- **PR flow:** branch → PR → green CI (`lint`, `typecheck`, `test`) → review → merge. One reviewer required.
- **Safeguarding-flagged (🛡) work** — anything touching auth, minors' data, messaging, or money — gets extra review and must not weaken the [safeguarding tests](../tests/safeguarding.test.ts). A change that lets a minor surface in the directory must fail CI.
- Match the surrounding code's style; add/extend tests for what you build; update [FEATURE_SPECS.md](./FEATURE_SPECS.md) and the [progress bar](./README.md) in the same PR.

## Size key
🟢 small (hours) · 🟡 medium (a day or two) · 🔴 large (multi-day / needs a decision first)

---

## Ready now (unblocked)

### D1 · Fix the live deployment 🟢 — *highest priority*
The app **is** deployed and public at **`https://makonnect.vercel.app`**, but two things are wrong (Vercel dashboard, not code):
- **Production is stale** — it isn't serving the latest `main` (an unknown profile id returns `200` instead of the current code's `404`). Make production auto-deploy from `main`, then redeploy.
- **The branch alias `…-git-main-…` is behind Vercel Authentication** — that's the URL that got shared; it redirects to a login. Stop sharing it; standardise on `makonnect.vercel.app` (or disable Deployment Protection if the branch alias must be shareable).
**Done when:** `makonnect.vercel.app` serves the current `main` (bogus id → 404), is publicly reachable, and every PR still gets a preview deploy.
**Note:** the project sits on a **personal** Vercel/GitHub account — migrating to an org is D2.

### D3 · Phase −1 contributor backbone 🟡 🛡
Add `CONTRIBUTING.md`, `SECURITY.md`, `CODEOWNERS`, branch protection on `main`, and a **secret scanner** + dependency check step in [ci.yml](../.github/workflows/ci.yml).
**Done when:** external PRs require review on safeguarding-sensitive paths; CI fails on a committed secret.
**Do before** the first external PR — not before (avoid scaffolding paralysis).

### D4 · Grow synthetic seed (anti-cold-start) 🟢
Expand `data/seed/` toward ~30 members and 15–30 resource guides so the demo doesn't look empty. Keep the role/minor mix realistic so safeguarding paths stay exercised.
**Done when:** directory and hub feel populated; data-integrity + safeguarding tests still pass.

### D5 · Finish offline UX (F6) 🟡
Add a visible **offline indicator** and a **low-data-mode** toggle (defer images, trim payloads) on top of the existing cache-first service worker.
**Done when:** going offline is visible; low-data mode demonstrably reduces payload; reads still work offline.

### D6 · Resource share + bookmark (F5) 🟢
Per-guide **share-to-WhatsApp** link/card and local **bookmarking**.
**Done when:** a guide produces a clean shareable card; bookmarks persist locally.

---

## Blocked (need a decision or appointment first — see [CONSULT.md](./CONSULT.md))

### D7 · Auth + claim-based onboarding (F9) 🔴 🛡
Supabase Auth (phone-first), claim a pre-seeded profile via one-time code, dual-approval queue (staff required for minors).
**Blocked-by:** co-approval bodies + DSL named; org Supabase project.

### D8 · Roles, permissions & RLS schema (F10) 🔴 🛡
Design the Postgres schema + Row-Level Security for student/alumni/staff/donor tiers and the staff-only fields. Pairs with D7.
**Blocked-by:** the "person" data contract with MakoZim (which fields, who's authoritative).

### D9 · Donation campaign engine (F18) 🔴 🛡
**Do not start.** Blocked on the legal entity, named reconciler, regulatory check, chosen rail, and board sign-off ([CONSULT.md](./CONSULT.md)). Sequenced last by design.

---

## Good first issues
D4 (seed data) · D6 (share/bookmark) · empty-state polish on directory/hub · accessibility pass (focus states, alt text, reduced-motion) · a low-data placeholder image component. Pair these with a test.
