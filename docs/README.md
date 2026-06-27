# MaKonnect — Team Packet

The working documents for the **people building, approving, and testing** MaKonnect. If the root [PROJECT_DESCRIPTION.md](../PROJECT_DESCRIPTION.md) is *what we're building and why*, this folder is *who does what next, what's blocking us, and how far along we are.*

These are **living documents** — they change as the project moves. Treat any status here as "true as of the date at the top of each file," not final.

## Coordination (decided, June 2026)

- A **project lead** is in place; the lead owns the agenda in [CONSULT.md](./CONSULT.md) and runs the meetings.
- Day-to-day communication runs through a **WhatsApp group** — suggested threads: `#general` (announcements), `#dev` (collaborators + GitHub notifications), `#testing`.
- **The rule:** *WhatsApp moves fast and is disposable; these docs are the durable record.* Anything decided in chat that matters gets written down here the same day.
- **GitHub** stays the technical source of truth (issues, PRs, the commit history) — non-technical staff never need to touch it; it's summarised up into a short written update at the meeting cadence.
- **Guardrails:** org-owned accounts (never personal); **no minors' data or PII** in WhatsApp, GitHub, or these docs — they discuss features and *synthetic* data only.

## Pick your lane

| You are a… | Read |
|---|---|
| 👩‍💻 **Code collaborator / programmer** | [DEV_TASKBOARD.md](./DEV_TASKBOARD.md) → [TECH_INFRASTRUCTURE.md](./TECH_INFRASTRUCTURE.md) → [FEATURE_SPECS.md](./FEATURE_SPECS.md) |
| 🏫 **MakoZim staff / project lead / board** | [CONSULT.md](./CONSULT.md) → this progress bar |
| 🧪 **Non-technical / tester / content** | [CONSULT.md §5](./CONSULT.md) → [FEATURE_SPECS.md](./FEATURE_SPECS.md) (what to test) |
| 🤝 **Stakeholder / donor** | this progress bar → [CONSULT.md §1](./CONSULT.md) |

New to the project? Start at the root [README.md](../README.md), then [PROJECT_DESCRIPTION.md](../PROJECT_DESCRIPTION.md).

## What's in this folder

| Doc | Purpose | Owner |
|---|---|---|
| [TECH_INFRASTRUCTURE.md](./TECH_INFRASTRUCTURE.md) | The stack, accounts, environments, CI — what's wired vs pending | Lead builder |
| [FEATURE_SPECS.md](./FEATURE_SPECS.md) | Living per-feature spec + status (edited as we build) | Lead builder + collaborators |
| [DEV_TASKBOARD.md](./DEV_TASKBOARD.md) | Ready-to-pick coding tasks with acceptance criteria | Lead builder |
| [CONSULT.md](./CONSULT.md) | Approvals, questions, concerns & the risk register — routed by audience | Project lead |

Coding work lives in [DEV_TASKBOARD.md](./DEV_TASKBOARD.md); everything needing a non-programmer's decision or answer lives in [CONSULT.md](./CONSULT.md). They don't overlap on purpose.

---

## Progress bar — current state → final state

*As of 2026-06-27. Two horizons: the **near-term demo milestone** (a live, shareable slice on synthetic data) and the **full platform** (the whole §5 roadmap). We're close on the first, early on the second — and that's the plan.*

**Near-term: live v1 demo slice (synthetic data)**
```
█████████████████░░░  ~85%
```
Built and **deployed live** at **[makonnect.vercel.app](https://makonnect.vercel.app)** (public). Remaining: fix the deploy pipeline (production is stale; the branch alias is auth-walled) + transfer to org-owned accounts. See "Immediate next" below.

**Full platform (entire §5 roadmap)**
```
██░░░░░░░░░░░░░░░░░░░  ~12%
```
The hard, high-value phases (auth, real data, mentorship, donations) haven't started — by design; they're gated on the approvals and governance in [CONSULT.md](./CONSULT.md), not on code.

### By phase (maps to [PROJECT_DESCRIPTION §5](../PROJECT_DESCRIPTION.md#5-suggested-build-phases-re-sequenced-after-pressure-test))

| Phase | What it is | Status |
|---|---|---|
| **−2 · Ship a URL solo** | Working slice + live URL | 🚧 `██████████████████░░` Live & public at `makonnect.vercel.app`; **prod stale + branch alias auth-walled** — fix [D1](./DEV_TASKBOARD.md) |
| **−1 · Validate + scaffolding** | User research; CI; CONTRIBUTING/SECURITY/CODEOWNERS; appoint DSL & approvers | 🚧 `██████░░░░░░░░░░░░░░` CI + tests done; research, governance docs & appointments pending |
| **0 · Foundations + safeguarding** | Design tokens, auth, roles, age-gating/consent, audit log, PWA shell | 🚧 `███████░░░░░░░░░░░░░` Tokens + PWA + safeguarding *data model* done; **auth/roles/consent not started** |
| **1 · Knowledge + directory (real v1)** | Claim onboarding, profiles+timeline, directory, Resources Hub, safeguarding console; then real-data import | 🚧 `█████████░░░░░░░░░░░` Directory/profiles/resources/PWA built on synthetic data; onboarding, admin/console & real-data import pending |
| **2 · Connection** | Adult↔adult messaging, supervised mentorship, digest home | ⏳ `░░░░░░░░░░░░░░░░░░░░` Not started (gated on v1 demand) |
| **3 · Community** | Feed, groups, spotlights, forum, notifications | ⏳ `░░░░░░░░░░░░░░░░░░░░` Not started (gated on content velocity) |
| **4 · Sustainability** | Donation campaign structure + reporting (link-out), donor impact | ⛔ `░░░░░░░░░░░░░░░░░░░░` Blocked on legal entity + approvals |
| **5 · Growth/heavy** | In-app payment rails, SMS/WhatsApp, multilingual, AI assist | ⛔ `░░░░░░░░░░░░░░░░░░░░` Not started |

**Legend:** ✅ done · 🚧 in progress · ⏳ not started · ⛔ blocked on a non-code decision

### What's actually built today (synthetic data, no DB, no secrets)
Home + hero · searchable/filterable **directory** · **profiles** with journey timeline · **Resources Hub** (list + article) · **PWA** (manifest + cache-first service worker) · safeguarding enforced in the type/data layer (minors are family-only and never directory-visible; no aid fields in the public model) · unit tests (data integrity + safeguarding) + Playwright e2e (directory, resources, safeguarding, navigation, mobile) · CI workflow. Detail per feature: [FEATURE_SPECS.md](./FEATURE_SPECS.md).

### Immediate next (unblocks the demo)
1. **Fix the live deployment** — production is stale and the shared `-git-main-` URL is auth-walled; standardise on the public `makonnect.vercel.app` — [DEV_TASKBOARD → D1](./DEV_TASKBOARD.md).
2. **Transfer repo + accounts to a Makomborero org** — [CONSULT §1](./CONSULT.md).
3. **Appoint the DSL and the co-approval bodies** — [CONSULT §2](./CONSULT.md).
4. **Run the user-research round** (~5 students + ~5 alumni) — gates building past v1 ([CONSULT §6](./CONSULT.md)).

> Keep this bar honest. When a phase moves, update it here *and* the status in [FEATURE_SPECS.md](./FEATURE_SPECS.md) — same day.

---

## Contacts & ownership

| Role | Who | Notes |
|---|---|---|
| Project lead | **Acquired** — coordinates via WhatsApp | Owns the [CONSULT.md](./CONSULT.md) agenda + meetings |
| Accountable lead / first builder | **David Mukuruva** | Owns the initial build and handoff |
| Designated Safeguarding Lead (DSL) | _TBD_ | Appointed by MakoZim at repo setup |
| Money reconciler | _TBD_ | Required before any donation campaign |
| Co-management — staff | _TBD_ | MakoZim |
| Co-management — Alumni Mentor Committee | _TBD_ | Alumni |

*Org-owned accounts (GitHub org, Vercel, Supabase, domain) — never personal — so nothing is lost if a contributor moves on.*
