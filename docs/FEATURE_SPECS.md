# Feature Specifications

**Living document — edited continuously as the project progresses.** Each feature has a *spec* (what it should do) and a *status* (where it is). When you build or change a feature, update its row here in the same PR. This is also the **tester's map**: anything marked ✅ or 🚧 is fair game to test.

*As of 2026-06-27. Specs derive from [PROJECT_DESCRIPTION §2B–§4](../PROJECT_DESCRIPTION.md); this file tracks them at the slice level so the team has one status surface instead of re-reading the 45-page plan.*

**Status:** ✅ built (synthetic data) · 🚧 partial · ⏳ planned · ⛔ blocked on a decision
**Safeguarding flag (🛡):** anything touching minors' data, auth, messaging, or money — gets extra review per [PROJECT_DESCRIPTION §2B](../PROJECT_DESCRIPTION.md#2b-safeguarding-privacy--trust-foundational--build-first).

---

## At a glance

| # | Feature | Status | Phase | 🛡 |
|---|---|---|---|---|
| F1 | Design system & brand tokens | ✅ | 0 | |
| F2 | Home / landing | ✅ | 1 | |
| F3 | Directory & search | ✅ | 1 | |
| F4 | Member profiles + journey timeline | ✅ | 1 | |
| F5 | Resources Hub (read) | ✅ | 1 | |
| F6 | PWA / offline reads | ✅ | 0–1 | |
| F7 | Safeguarding model (data layer) | ✅ | 0 | 🛡 |
| F8 | Synthetic seed data | ✅ | −2 | |
| F9 | Accounts, claim-onboarding & co-approval | ⏳ | 0–1 | 🛡 |
| F10 | Roles & permissions | ⏳ | 0 | 🛡 |
| F11 | Age-gating & guardian consent | ⏳ | 0 | 🛡 |
| F12 | Admin + safeguarding console | ⏳ | 1 | 🛡 |
| F13 | Events & News (staff-maintained) | ⏳ | 1 | |
| F14 | Connections & adult↔adult messaging | ⏳ | 2 | 🛡 |
| F15 | Supervised mentorship + outcome data | ⏳ | 2 | 🛡 |
| F16 | Digest "home" (editorial) | ⏳ | 2 | |
| F17 | Feed / community / groups | ⏳ | 3 | |
| F18 | Donation campaign engine | ⛔ | 4–5 | 🛡 |
| F19 | Donor impact dashboard (aggregate) | ⏳ | 4 | 🛡 |
| F20 | Real-data import | ⛔ | 1 gate | 🛡 |
| F21 | Alum↔alum connection demo (open-to + Connect CTA) | ✅ | 1 | 🛡 |
| F22 | Campaigns demo UI (link-out giving) | ✅ | 4 | 🛡 |

---

## Built (✅) — testable now, on synthetic data

### F1 · Design system & brand tokens
Brand palette as CSS/Tailwind tokens (olive `#BAC132`, brown `#805522`, gold `#E3862F`, beige tint, cream bg), semantic names at call sites, rounded "Friendly" aesthetic, CSS-only motion, mobile-first. **Status:** built. **Test:** colours/spacing consistent; respects reduced-motion; readable on a phone.

### F2 · Home / landing
Hero with the one-line hook ("Hear from — and reach — someone who got where you're trying to go"), primary CTAs into the directory and resources, avatar cluster from synthetic members. **Test:** hero renders; "Find an alum" CTA → directory; active nav reflects section. *(Covered by `e2e/navigation.spec.ts`.)*

### F3 · Directory & search
Searchable, filterable list of directory-visible members. Free-text search (name, headline, location, fields), field filter, "offers mentorship" filter, **"open to" connection-intent filter** (F21), clear-filters control. The header frames a peer network (connect · mentor · get mentored), not only mentorship. **Test:** search narrows results; mentorship & open-to filters work; clearing restores the list; a card opens its profile. *(Covered by `e2e/directory.spec.ts`.)* 🛡 **Minors never appear here** — see F7.

### F4 · Member profiles + journey timeline
Per-member page: bio, role, cohort, location, fields, mentorship flags, an "open to…" line + a (disabled, Phase-2) **Connect** control for adults (F21), and a vertical journey timeline. Static-rendered per id. **Test:** every member id resolves; timeline renders; an adult shows Connect/mentorship controls; a minor's profile shows the family-only gate (F7) and **no Connect/Give**, not open contact.

### F5 · Resources Hub (read)
List of alumni guides across College Apps / Finances / Networking / Relationships; each opens a static, offline-readable article (title, author, read-time, body) with a **share-to-WhatsApp** button (the reach layer, §2A.3). Currently **5 seed guides**. **Test:** a card opens its full article; categories render. *(Covered by `e2e/resources.spec.ts`.)* ⏳ **Not yet:** bookmarking, staff-review workflow, the 15–30 launch guides.

### F6 · PWA / offline reads
Web manifest + installable; **network-first** service worker (fresh online, cached pages offline) + a **visible offline indicator**. **Reads only** — no offline write-queue in v1 (deliberate, [§3.10](../PROJECT_DESCRIPTION.md#310-offline-capability--v1-but-read-only-caching-only)). 🛡 **Privacy-scoped cache:** only learning content (Resources Hub) + app chrome + build assets may persist on-device; the **directory, profiles (incl. minors) and campaigns are network-only and never written to disk** ([public/offline-cache-policy.js](../public/offline-cache-policy.js), locked by `tests/offline-privacy.test.ts`). ⏳ **Not yet:** low-data-mode toggle.

### F7 · Safeguarding model (data layer) 🛡
The foundational safety guarantees, enforced in the type/data layer so they can't be bypassed by the UI:
- Minors (`isMinor`) are **family-only** and **never** returned to the public directory.
- Economic-vulnerability / aid status is **not modelled** into the public types at all (staff-only, lands behind Supabase RLS later).
- A student profile is still individually fetchable (gated), so it isn't orphaned — but it is **never persisted to the device cache** (F6 privacy policy), so it can't linger on a shared phone.

**Test:** the unit + e2e safeguarding suites are the spec — `tests/safeguarding.test.ts` and `e2e/safeguarding.spec.ts`. Any change that lets a minor surface in the directory must fail CI.

### F8 · Synthetic seed data
~15 members (12 alumni, 2 student-minors, 1 staff) + 9 resources + 4 campaigns, in `data/seed/`. The only data in dev — kept varied (fields, locations, cohorts, intents) to fight cold-start (R7) so the demo looks alive. ⏳ **Grow toward** ~30 members + 15–30 guides at launch.

### F21 · Alum↔alum connection demo 🛡
Reframes the network as peer-to-peer, not only alum→student. Adults carry an `openTo` intent set (Mentoring / Hiring / Collaborating / Investing / Reconnecting) shown as chips on cards and profiles, a directory **"open to" filter**, and a **disabled "Connect" control** (labelled Phase 2 — illustrative, like the mentorship CTA). **Adult↔adult only:** minors carry no intents and show **no Connect** control. **Test:** the open-to filter narrows results; an alum profile shows Connect; a minor profile shows neither Connect nor Give. *(Covered by `e2e/connection.spec.ts`.)*

### F22 · Campaigns demo UI (link-out giving) 🛡
A `/campaigns` list + `/campaigns/[slug]` detail showcasing §3.12 **without moving money**: campaign cards with a CSS progress bar, raised/goal, contributor count, deadline, organiser, **aggregate** beneficiary cohort, and a stated miss-target rule. The "Give" button is an **external link-out** to a named processor (Paynow/EcoCash) — the processor's name is on the receipt, not "MaKonnect," and no card/PII enters our system. A clear demo disclaimer says no real money moves. 🛡 **No campaign names or targets a minor** — beneficiaries are aggregate cohorts only (enforced by a safeguarding test). **Test:** list → detail opens; Give is an external link (asserted, not navigated). *(Covered by `e2e/campaigns.spec.ts` + `tests/campaigns.test.ts`.)*

---

## Planned / blocked — spec only, not built

> These are written so a collaborator can pick one up. Detail and sequencing live in [PROJECT_DESCRIPTION §3–§5](../PROJECT_DESCRIPTION.md#3-hardcore-core--v1-features); pickable tasks live in [DEV_TASKBOARD.md](./DEV_TASKBOARD.md).

- **F9 · Accounts, claim-onboarding & co-approval** 🛡 — phone-first sign-up; **claim** a pre-seeded profile via a one-time code; dual-approval queue (either body for alumni; **staff required for anything involving a minor**). *Blocked-by: approvers named (F-gate), Supabase Auth.*
- **F10 · Roles & permissions** 🛡 — student/alumni/staff/donor, assigned (never self-selected), gating navigation and data via RLS.
- **F11 · Age-gating & guardian consent** 🛡 — capture DOB; under-18s need verified guardian/staff consent before a profile is visible or messaging is enabled, using **MakoZim's existing consent forms**.
- **F12 · Admin + safeguarding console** 🛡 — manage members, run import/claim seeding, review reports/blocks (SLA), view the minor-profile access **audit log**, approve/publish resource content.
- **F13 · Events & News** — staff-maintained read-only lists (the editorially-seeded "home" content that keeps the app from looking empty).
- **F14 · Connections & adult↔adult messaging** 🛡 — the *real* (auth-gated, Phase 2) version of F21: adult↔adult only; **no donor→student, no unsupervised adult→minor** contact. F21 is the demo placeholder.
- **F15 · Supervised mentorship + outcome data** 🛡 — students request mentors; all student-involved threads staff-auditable, not private 1:1; instrument intro→outcome from day one (the long-term dataset).
- **F16 · Digest "home"** — new guides + opportunities + events; replaces a user-generated feed in early phases.
- **F17 · Feed / community / groups** — single posting surface, gated on content velocity (cold-start risk).
- **F18 · Donation campaign engine** ⛔ — the *real* (money-moving) version of F22: automated capture + reconciliation, recurring/pledges, auto-reporting. **Blocked on:** legal entity, named reconciler, regulatory check, board sign-off ([CONSULT.md](./CONSULT.md)). F22 is the demo placeholder (link-out only).
- **F19 · Donor impact dashboard** 🛡 — **aggregate & anonymised only**; donors never get a browsable roster of specific children.
- **F20 · Real-data import** ⛔ 🛡 — the **deployment gate**: MakoZim staff release and import real records into production via the restricted tier. First time real minors' data touches the system; everything before it runs on synthetic data.

---

*When you finish a feature: flip its status, move it up to "Built," note test coverage, and update the [progress bar](./README.md).*
