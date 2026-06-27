# MaKonnect — Handoff & Orientation

> **One line:** *"Hear from — and reach — someone who got where you're trying to go."*
> MaKonnect is a mentorship-and-connection webapp for the Makomborero / MakoZim family — alumni, current students, staff, and donors — with a student resources hub and structured fundraising campaigns. Mentorship is the point; the directory, resources, and giving are how it's delivered.

This document is the **front door** to the project. It exists so we can hand a **repo + live URL + deployable artifact** to four audiences at once. Pick your lane below.

| You are a… | Go to | What you'll get |
|---|---|---|
| 👩‍💻 **Collaborator / developer** | [§A](#a--for-collaborators--developers) | Stack, local setup, how to contribute, access tiers |
| 🏫 **MakoZim staff** | [§B](#b--for-makozim-staff--brand--data-requests) | What we need from you (brand assets, data, sign-offs) |
| ⚖️ **Legal / regulator / compliance** | [§C](#c--for-legal--regulators--compliance) | Our safeguarding, privacy, and money-handling posture |
| 🤝 **Stakeholder / donor / leadership** | [§D](#d--for-stakeholders-donors--leadership) | The vision, status, and what we're asking for |

**Companion documents (read in this order):**
1. `PROJECT_DESCRIPTION.md` — the full plan (vision, features, safeguarding, stack, phases).
2. `TASK_LIST.md` — the non-coding work, blockers, and risk register.
3. `HANDOFF.md` — this file (how to engage, per audience).

---

## Project status (be honest about where we are)

| Artifact | Status |
|---|---|
| Vision & full plan (`PROJECT_DESCRIPTION.md`) | ✅ Done, pressure-tested twice |
| Non-coding task list & risk register (`TASK_LIST.md`) | ✅ Done |
| Tech stack decision | ✅ Decided — Next.js + TypeScript + Supabase + Tailwind on Vercel |
| Brand palette | ✅ Locked (hex values below); logo + fonts ⏳ pending from MakoZim |
| Repo | ⏳ Initial commit (this is Phase −2) |
| Live URL (deployable artifact) | ⏳ First slice: a searchable **directory + profiles on _synthetic_ data** |
| Real student/alumni data | ⛔ Not yet — released by MakoZim **only at the deployment phase** |
| Donations / payments | ⛔ Deferred — sequenced last, gated on legal + processor decisions |

> **What "the deployable artifact" is right now:** a live, deployed v1 slice running on **synthetic (fake) data** — enough to show the look, the core "find an alum" loop, and that the pipeline works end-to-end. **No real minors' data is involved at this stage**, by design.

---

## A — For collaborators & developers

### What you're building toward
A mentorship-first network. v1 is deliberately small: **claim-based onboarding + profiles + searchable directory + a static, offline-readable Resources Hub.** Everything heavier (mentorship threads, feed, donations) comes in later phases. See `PROJECT_DESCRIPTION.md` §3 and §5.

### The stack (decided — don't relitigate)
| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Backend / DB / Auth | Supabase (Postgres + Auth + Row-Level Security) |
| Styling | Tailwind CSS |
| Hosting / CI/CD | Vercel (preview deploy per PR) |
| Offline | PWA + service worker (cache-first **reads** only) |

**Why these:** boring, maximally documented, free tiers fit a nonprofit, and Supabase RLS gives us the restricted data-access tier without custom auth scaffolding.

### Brand tokens (use these, not raw hex, at call sites)
| Token | Hex |
|---|---|
| `--color-primary` / accent | `#BAC132` (olive-green) |
| `--color-secondary` | `#805522` (brown) |
| `--color-gold` | `#E3862F` |
| `--color-tint` | `#D6BEAD` (beige) |
| `--color-bg` | `#F8F9EB` (cream) |
| `--color-text` | `#1F2124` (softened near-black) |

### Local setup (first-builder / Phase −2)
```bash
# 1. Scaffold (first builder only — already done once the repo exists)
npx create-next-app@latest makonnect --typescript --tailwind --app

# 2. Install + configure Supabase client
npm install @supabase/supabase-js

# 3. Environment — copy the template, fill from the org secret store (never commit real keys)
cp .env.example .env.local

# 4. Run
npm run dev      # http://localhost:3000
```

### `.env.example` (committed; real values live in the org secret store, NOT the repo)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# Server-only secrets (never prefixed NEXT_PUBLIC_):
SUPABASE_SERVICE_ROLE_KEY=
```

### Suggested repo layout
```
makonnect/
├─ app/                 # Next.js App Router routes
│  ├─ directory/        # searchable member directory (v1 core)
│  ├─ profile/[id]/     # member profile + timeline
│  └─ resources/        # static, offline-readable hub
├─ components/          # shared UI (cards, avatars, timeline…)
├─ lib/                 # supabase client, helpers
├─ data/seed/           # SYNTHETIC alumni — the only data used in dev
├─ public/              # PWA manifest, icons, brand assets
├─ .env.example
├─ PROJECT_DESCRIPTION.md
├─ TASK_LIST.md
├─ HANDOFF.md
└─ README.md
```

### How to contribute (lightweight now, formalised before the first external PR)
- **Day-one reality:** one contributor (David). The heavy governance scaffolding is added *just-in-time*, not now — avoid scaffolding paralysis. Ship the URL first.
- **Once collaborators arrive:** fork/branch → PR → review required before merge → CI (lint, test, secret-scan) must pass. `CONTRIBUTING.md`, `SECURITY.md`, and `CODEOWNERS` land the day before the first external PR.
- **Two access tiers (non-negotiable):**
  - *Code contribution* — open to vetted alumni via PRs, against **synthetic data only**.
  - *Production / real-data / secrets / deploy* — held by a small named trusted set (co-management + DSL). Real minors' data **never** touches dev.
- **Golden rules:** no secrets or real data in the repo; anything touching auth, minors' data, messaging, or payments gets extra review.

### Good first issues (once the repo is up)
Directory search UI · profile page + journey timeline · resources hub list/detail (static) · brand token setup · PWA manifest + offline shell · synthetic seed-data generator.

---

## B — For MakoZim staff — brand & data requests

Thank you — the app is built **around** MakoZim's authority on students, safeguarding, and brand. Here is exactly what we need, and when.

### Needed soon (unblocks the look & launch content)
- [ ] **Logo files** — white and colour versions (SVG/PNG). *Palette is already matched from makomborero.info; we just need the marks.*
- [ ] **Typography / fonts** — the official typeface(s), or confirmation we may pick a close free alternative.
- [ ] **Name sign-off** — confirm "MaKonnect" is approved and doesn't clash with existing branding.
- [ ] **15–30 alumni "advice" pieces** (or permission + intros to gather them) to seed the Resources Hub so it doesn't launch empty — college apps, finances, networking, relationships.

### Needed at the deployment phase (NOT during development)
- [ ] **The alumni/student database** — released by MakoZim staff, in an agreed format. *We build and test entirely on fake data until then; real data is imported only at go-live.*
- [ ] **The "person" data agreement** — which fields exist, who is the source of truth for each, how a member's account claim reconciles with your records.

### Governance & safeguarding confirmations we need from you
- [ ] Who sits on the **co-approval bodies** (staff + Alumni Mentor Committee) that approve registrations/logins.
- [ ] **Appoint the Designated Safeguarding Lead (DSL)** at repo setup.
- [ ] Share MakoZim's **existing child-protection policy + consent forms + data guidelines** — we implement these; we do not write new policy.
- [ ] Confirm the **contact rules** are acceptable: no donor→student messaging; no unsupervised adult→minor DMs; alumni↔student only via staff-auditable mentorship.

> Full list with priorities: `TASK_LIST.md` §1, §3, §5, §7.

---

## C — For legal / regulators / compliance

MaKonnect serves **gifted underprivileged minors**, so child safety and data protection are designed as the **foundation**, not afterthoughts. Summary of our posture; full detail in `PROJECT_DESCRIPTION.md` §2B and §7.

### Safeguarding (conduct)
- Operationalises **MakoZim's existing child-protection policy** — we do not author new policy.
- **No donor→student contact. No unsupervised adult→minor DMs.** Alumni↔student contact only inside supervised, staff-auditable mentorship channels.
- **Age-gating + guardian consent** for under-18s before a profile is visible or messaging is enabled (via MakoZim's consent forms).
- **Audit logging** of who views/searches/messages a minor's profile, reviewable by a named **Designated Safeguarding Lead**.
- One-tap **report/block** everywhere, with a moderation SLA.

### Data protection & privacy
- **Data minimisation** — economic-vulnerability / aid status is **staff-only**, never shown to other members or donors.
- Profiles default to **family-only**; full **export and deletion**; a defined **lifecycle** when a student ages out (archive/anonymise, not orphan).
- Real student data is held only from the deployment phase; all development uses **synthetic data**.
- **Open items we are actively seeking guidance on:** application of Zimbabwe's **Cyber and Data Protection Act** to minors' data (lawful basis, retention, breach notification, compelled disclosure); data hosting jurisdiction.

### Donations & money handling (deferred, gated)
- The donation engine is **sequenced last** and will not go live until: a **confirmed registered legal entity** receives funds; a **named human reconciler**, **immutable audit trail**, and **refund/dispute policy** exist; and a **known payment processor's name is on the receipt** (e.g. Paynow/EcoCash) — **not** "MaKonnect," keeping card/PII out of our system.
- **We are seeking confirmation** that in-app donation handling is compliant for the receiving entity under Zimbabwean nonprofit, payment, and data-protection law, including cross-border (diaspora) flows.

### Engineering posture relevant to risk
- Public repo, but **secrets and real data never live in it**; production/data access restricted to a small named tier; CI secret-scanning; encryption in transit and at rest.

> Specific compliance questions are catalogued in `TASK_LIST.md` §2 and §4.

---

## D — For stakeholders, donors & leadership

### The problem
Makomborero produces gifted alumni scattered across Zimbabwe and the world, and students coming up behind them who need exactly the guidance those alumni already have. Today that knowledge — and fundraising — happens ad-hoc over WhatsApp, which doesn't scale and isn't legible.

### What MaKonnect does
- **Connects** students with alumni who've walked the path (mentorship-first).
- **Preserves & shares** alumni guidance in a resources hub that works on poor connectivity.
- **Modernises giving** — replaces the inefficient WhatsApp donation pipeline with structured, time-bound, transparent campaigns (built carefully, last, and gated on proper financial controls).

### Why it can compound (the upside)
- A verified **mentorship → outcome dataset** no one else can build — powerful for fundraising credibility and grants.
- The **codebase itself is a teaching asset** — a potential "MaKonnect Build Fellowship" where MakoZim's tech students learn by shipping real features, earning public commit history for jobs and scholarships.
- The platform is **forkable** — other Global-South education nonprofits could adopt it, with Makomborero as upstream maintainer.

### Where we are
Plan complete and stress-tested; stack chosen; a live demo on synthetic data is the immediate next step. Built initially by **David (named accountable lead)**, then opened to vetted alumni contributors.

### What we're asking for
- **Leadership/board sign-off** for a public repo, an app holding minors' data, and the donation feature.
- **Confirmation of the legal entity** that will receive donations.
- **Brand assets** and, at deployment, **the alumni/student records** (via MakoZim staff).
- **A small budget line** for year-two hosting/domain (free tiers cover launch; someone must own renewal).
- **Help validating demand** — intros to ~5 students and ~5 alumni for a quick research round.

> Full asks and ownership: `TASK_LIST.md` §0 (blockers) and §11 (near-term order).

---

## How to deploy the artifact (for whoever ships it)

1. Push the repo to GitHub (**public**; confirm no secrets/real data committed).
2. Import the repo into **Vercel** → it builds and gives a live preview URL automatically.
3. Create a **Supabase** project (free tier) → add `NEXT_PUBLIC_SUPABASE_URL` and keys as Vercel environment variables (org-owned account, **not** a personal login).
4. Seed **synthetic** alumni into Supabase (`data/seed/`).
5. Share the Vercel URL. Every future PR gets its own preview deploy for review.

> This produces the shareable live artifact **without** any real data — safe to send to all four audiences above.

---

## Contacts & ownership

| Role | Who | Notes |
|---|---|---|
| Accountable lead / first builder | **David Mukuruva** | Owns the initial build and handoff |
| Designated Safeguarding Lead (DSL) | _TBD_ | Appointed by MakoZim at repo setup |
| Money reconciler | _TBD_ | Required before any donation campaign |
| Co-management — staff | _TBD_ | MakoZim |
| Co-management — Alumni Mentor Committee | _TBD_ | Alumni |

*Org-owned accounts (GitHub org, Vercel, Supabase, domain) — never personal — so nothing is lost if a contributor moves on.*

---

*MaKonnect is built by Makomborero alumni, for the Makomborero family. Boring tech, careful with kids and money, open by default.*
