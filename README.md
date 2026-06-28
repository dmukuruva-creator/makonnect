# MaKonnect

> **Hear from — and reach — someone who got where you're trying to go.**

A mentorship-first webapp for the **Makomborero / MakoZim** family — alumni,
current students, staff and donors — with a student Resources Hub and (later)
structured fundraising campaigns. Mentorship is the point; the directory,
resources and giving are how it's delivered.

This repo is the **deployable artifact**: a live v1 slice running on **synthetic
(fake) data**. It shows the look, the core "find an alum" loop, and that the
pipeline works end-to-end — **with no real minors' data involved, by design.**

> **🔗 Live demo: [makonnect.vercel.app](https://makonnect.vercel.app)** — the public,
> shareable URL. (Vercel's per-branch `…-git-main-…` alias is behind login — don't
> share that one. Deploy status & known issues: [docs/TECH_INFRASTRUCTURE.md](./docs/TECH_INFRASTRUCTURE.md#live-deployment).)

> **New here?** Read **[PROJECT_DESCRIPTION.md](./PROJECT_DESCRIPTION.md)** for the
> full plan (vision, safeguarding, stack, phases). The team's working docs —
> progress bar, tech infrastructure, feature specs, dev task board, and the
> approvals/questions to confirm with everyone — live in **[docs/](./docs/)**;
> start at **[docs/README.md](./docs/README.md)**.

## What's in v1

- **Directory** — searchable, filterable alumni & staff network: connect with peers (an "open to" signal), find or offer mentorship.
- **Profiles** — bio + journey timeline, "open to…" intents, and a (Phase-2) Connect control for adults.
- **Resources Hub** — static, offline-readable alumni advice (college apps, finances, networking, relationships), shareable to WhatsApp.
- **Campaigns** *(demo)* — alumni-directed giving with progress and a link-out to a named processor (Paynow/EcoCash). No real money moves in-app.
- **PWA** — installable, with a web manifest and a network-first service worker (offline reads; no write-queue in v1).

## Safeguarding, built in

MaKonnect serves gifted underprivileged **minors**, so child safety is the
foundation. Already enforced in this slice:

- Students' profiles are **family-only** and never appear in the public directory.
- **No donor→student messaging; no unsupervised adult→minor contact** — mentorship runs through staff-auditable channels.
- **Campaigns name no minors** — beneficiaries are aggregate cohorts only, never an individual child.
- **Economic-vulnerability / aid status is staff-only** — it isn't even modelled into public-facing types.
- **Offline cache is privacy-scoped** — only learning content (the Resources Hub) and app chrome persist on-device; the directory and profiles (incl. minors) are never written to disk, so nothing personal lingers on a shared phone.
- All development uses **synthetic data**; real records are imported by MakoZim staff only at the deployment phase.

## Tech stack (decided — see [docs/TECH_INFRASTRUCTURE.md](./docs/TECH_INFRASTRUCTURE.md))

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Backend / DB / Auth | Supabase (Postgres + Auth + Row-Level Security) |
| Styling | Tailwind CSS |
| Hosting / CI/CD | Vercel (preview deploy per PR) |

## Local setup

```bash
npm install
cp .env.example .env.local   # leave blank for the synthetic-data demo
npm run dev                  # http://localhost:3000
```

The demo needs **no database or keys** — it reads synthetic seed data from
[`data/seed/`](./data/seed). Supabase ([`lib/supabase.ts`](./lib/supabase.ts))
is wired up but unused until real data arrives at the deployment phase.

## Project layout

```
app/                 Next.js App Router routes (home, directory, profile/[id], resources)
components/          shared UI (header, footer, member card, timeline, search)
lib/                 types, data access, supabase client
data/seed/           SYNTHETIC members & resources — the only data used in dev
public/              PWA manifest + icon
```

## Deploy the artifact

1. Push to GitHub (**public**; confirm no secrets / real data committed).
2. Import the repo into **Vercel** → it builds and gives a live preview URL.
3. (Later) Create an org-owned **Supabase** project, add env vars in Vercel, and
   import data — only at the deployment phase, only by MakoZim staff.

Every future PR gets its own Vercel preview deploy for review.

---

*Built by Makomborero alumni, for the Makomborero family. Boring tech, careful
with kids and money, open by default. Forkable by other Global-South education
nonprofits — Makomborero as upstream maintainer.*
