# Tech Infrastructure

*As of 2026-06-27. The one place that answers "what runs this, who owns it, and what's actually wired up." For collaborators and for whoever signs off on hosting and accounts. Living doc — update when a dependency, account, or environment changes.*

## Stack (decided — see [PROJECT_DESCRIPTION §2-Tech](../PROJECT_DESCRIPTION.md#2-tech-chosen-tech-stack-decided--stop-deliberating-start-building); don't relitigate)

| Layer | Choice | Version (current) | Why |
|---|---|---|---|
| Framework | Next.js (App Router) + TypeScript | `next@16.2.9`, `typescript@5` | One language end-to-end; the most-documented stack, so volunteer alumni can onboard. |
| UI runtime | React | `react@19.2.4` | — |
| Styling | Tailwind CSS | `tailwindcss@4` (`@tailwindcss/postcss`) | Tokens map cleanly to the brand palette. |
| Backend / DB / Auth | Supabase (Postgres + Auth + RLS) | `@supabase/supabase-js@2.108` | Row-Level Security gives the staff-only / family-only access tiers without custom auth scaffolding. **Wired but unused** until real data. |
| Hosting / CI-CD | Vercel | — | Preview deploy per PR; free tier fits a nonprofit. |
| Offline | PWA + service worker | hand-rolled `public/sw.js` | Cache-first **reads** only (no offline write-queue in v1). |
| Unit tests | Vitest | `vitest@3` | `npm test` |
| E2E tests | Playwright | `@playwright/test@1.61` | `npm run test:e2e` |
| Lint | ESLint (next config) | `eslint@9` | `npm run lint` |

> ⚠️ **Read [AGENTS.md](../AGENTS.md) before writing code.** This Next.js major (16) has breaking changes vs. older training data; check `node_modules/next/dist/docs/` for the current API.

## Repo layout

```
app/                 Next.js App Router routes
  page.tsx           home (hero + CTAs)
  directory/         searchable, filterable member directory
  profile/[id]/      member profile + journey timeline (static-rendered per id)
  resources/         Resources Hub list + [slug] article
components/           shared UI (header, footer, member card, timeline, search client, skeletons)
lib/                  types.ts · data.ts (data-access layer) · supabase.ts (client, unused for now)
data/seed/           SYNTHETIC members + resources — the ONLY data used in dev
public/              PWA manifest + icon + service worker
tests/               Vitest unit tests (data integrity + safeguarding)
e2e/                 Playwright specs (directory, resources, safeguarding, navigation, mobile)
.github/workflows/   ci.yml
docs/                this team packet
```

The **data-access layer** ([lib/data.ts](../lib/data.ts)) is the seam: today it reads from `data/seed/`; at the deployment phase its functions are swapped to query Supabase with RLS, and **call sites don't change**. New data reads should go through it, not import seed files directly.

## Environments

| Environment | Data | Secrets | Who can touch it |
|---|---|---|---|
| **Local dev** | Synthetic seed only | None needed — the demo runs with no DB and no keys | Any collaborator |
| **Preview (Vercel per-PR)** | Synthetic seed | None | Any collaborator (auto on PR) |
| **Staging** | Synthetic seed | Org secret store | Collaborators |
| **Production** | Real records (deployment phase only) | Org secret store | **Restricted tier only** — small named set + DSL |

**Hard rule:** real minors' data and real secrets live **only** in production, held by the restricted tier. They never enter the repo, local dev, preview, or staging. ([PROJECT_DESCRIPTION §7](../PROJECT_DESCRIPTION.md#7-governance-sustainability--the-long-game))

## Local setup

```bash
npm install
cp .env.example .env.local   # leave blank for the synthetic-data demo
npm run dev                  # http://localhost:3000
```

The demo needs **no database or keys**. Useful scripts:

```bash
npm run dev        # local dev server
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # Vitest unit tests
npm run test:e2e   # Playwright E2E
```

## Environment variables

Defined in [.env.example](../.env.example) (committed; real values live in the org secret store, **never** the repo):

```
NEXT_PUBLIC_SUPABASE_URL=          # public, safe to expose
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # public, RLS-protected
SUPABASE_SERVICE_ROLE_KEY=         # SERVER-ONLY — bypasses RLS, never prefix NEXT_PUBLIC_
```

## Live deployment

| URL | Use | Status |
|---|---|---|
| **`https://makonnect.vercel.app`** | The **public, shareable** demo — give this one to staff/collaborators/testers | ✅ public, ⚠️ **currently stale** (see below) |
| `https://makonnect-git-main-…vercel.app` | Vercel's per-branch alias for `main` | ⛔ **behind Vercel Authentication** — not publicly viewable; don't share it |

**Two deployment issues to fix (Vercel dashboard — not code):**
1. **Share the right URL.** The branch alias (`…-git-main-…`) sits behind Vercel **Deployment Protection** and redirects to a Vercel login, so none of the four audiences can open it. The canonical public URL is **`makonnect.vercel.app`** — use that everywhere.
2. **Production is stale.** `makonnect.vercel.app` is not serving the latest `main` (e.g. an unknown profile id returns `200` instead of the `404` the current code produces via `notFound()`). Fix the production deploy so it auto-updates from `main` (check Vercel → Settings → Git production branch + auto-deploy, and Settings → Deployment Protection). Tracked as [DEV_TASKBOARD → D1](./DEV_TASKBOARD.md).

## CI/CD

- **[.github/workflows/ci.yml](../.github/workflows/ci.yml)** runs on PRs.
- **To add before the first external PR** (Phase −1): a secret scanner, dependency/security checks, branch protection on `main`, and `CODEOWNERS` so anything touching auth/minors'-data/payments needs review. Tracked as [DEV_TASKBOARD → D3](./DEV_TASKBOARD.md).
- **Deploy:** auto preview per PR; gated/manual promotion to production restricted to the trusted tier.

## Accounts & ownership (the sustainability backbone)

Everything must be **org-owned, never personal**, so nothing is lost when a contributor moves on.

| Account | Status | Owner |
|---|---|---|
| GitHub repo | ⏳ `github.com/dmukuruva-creator/makonnect` (personal) — **transfer to a Makomborero org** | leadership + lead builder |
| Vercel project | 🚧 deployed & public at `makonnect.vercel.app`, but on a **personal** account + production stale + branch alias auth-walled (see Live deployment) — fix & move to org | restricted tier |
| Supabase project | ⏳ pending — create under an **org** account at the deployment phase | restricted tier |
| Domain | ⏳ pending — org-owned; someone must own year-two renewal | leadership ([CONSULT §8](./CONSULT.md)) |
| Secret store | ⏳ pending — org-owned, not a personal `.env` | restricted tier |

> Who pays/renews the domain, Supabase, and Vercel once free tiers cap is an **open approval** — see [CONSULT §8](./CONSULT.md). Free tiers cover launch; renewal must have a named owner.
