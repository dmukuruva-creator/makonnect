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

---

## Built (✅) — testable now, on synthetic data

### F1 · Design system & brand tokens
Brand palette as CSS/Tailwind tokens (olive `#BAC132`, brown `#805522`, gold `#E3862F`, beige tint, cream bg), semantic names at call sites, rounded "Friendly" aesthetic, CSS-only motion, mobile-first. **Status:** built. **Test:** colours/spacing consistent; respects reduced-motion; readable on a phone.

### F2 · Home / landing
Hero with the one-line hook ("Hear from — and reach — someone who got where you're trying to go"), primary CTAs into the directory and resources, avatar cluster from synthetic members. **Test:** hero renders; "Find an alum" CTA → directory; active nav reflects section. *(Covered by `e2e/navigation.spec.ts`.)*

### F3 · Directory & search
Searchable, filterable list of directory-visible members. Free-text search (name, headline, location, fields), field filter, "offers mentorship" filter, clear-filters control. **Test:** search narrows results; mentorship filter works; clearing restores the list; a card opens its profile. *(Covered by `e2e/directory.spec.ts`.)* 🛡 **Minors never appear here** — see F7.

### F4 · Member profiles + journey timeline
Per-member page: bio, role, cohort, location, fields, mentorship flags, and a vertical journey timeline. Static-rendered per id. **Test:** every member id resolves; timeline renders; a minor's profile shows the family-only gate (F7), not open contact.

### F5 · Resources Hub (read)
List of alumni guides across College Apps / Finances / Networking / Relationships; each opens a static, offline-readable article (title, author, read-time, body). Currently **5 seed guides**. **Test:** a card opens its full article; categories render. *(Covered by `e2e/resources.spec.ts`.)* ⏳ **Not yet:** bookmarking, WhatsApp share, staff-review workflow, the 15–30 launch guides.

### F6 · PWA / offline reads
Web manifest + installable; cache-first service worker serving the app shell and Resources Hub offline. **Reads only** — no offline write-queue in v1 (deliberate, [§3.10](../PROJECT_DESCRIPTION.md#310-offline-capability--v1-but-read-only-caching-only)). ⏳ **Not yet:** visible offline indicator, low-data-mode toggle.

### F7 · Safeguarding model (data layer) 🛡
The foundational safety guarantees, enforced in the type/data layer so they can't be bypassed by the UI:
- Minors (`isMinor`) are **family-only** and **never** returned to the public directory.
- Economic-vulnerability / aid status is **not modelled** into the public types at all (staff-only, lands behind Supabase RLS later).
- A student profile is still individually fetchable (gated), so it isn't orphaned.

**Test:** the unit + e2e safeguarding suites are the spec — `tests/safeguarding.test.ts` and `e2e/safeguarding.spec.ts`. Any change that lets a minor surface in the directory must fail CI.

### F8 · Synthetic seed data
~9 members (alumni, student-minors, staff) + 5 resources, in `data/seed/`. The only data in dev. ⏳ **Grow toward** ~30 members + 15–30 guides for an anti-cold-start demo.

---

## Planned / blocked — spec only, not built

> These are written so a collaborator can pick one up. Detail and sequencing live in [PROJECT_DESCRIPTION §3–§5](../PROJECT_DESCRIPTION.md#3-hardcore-core--v1-features); pickable tasks live in [DEV_TASKBOARD.md](./DEV_TASKBOARD.md).

- **F9 · Accounts, claim-onboarding & co-approval** 🛡 — phone-first sign-up; **claim** a pre-seeded profile via a one-time code; dual-approval queue (either body for alumni; **staff required for anything involving a minor**). *Blocked-by: approvers named (F-gate), Supabase Auth.*
- **F10 · Roles & permissions** 🛡 — student/alumni/staff/donor, assigned (never self-selected), gating navigation and data via RLS.
- **F11 · Age-gating & guardian consent** 🛡 — capture DOB; under-18s need verified guardian/staff consent before a profile is visible or messaging is enabled, using **MakoZim's existing consent forms**.
- **F12 · Admin + safeguarding console** 🛡 — manage members, run import/claim seeding, review reports/blocks (SLA), view the minor-profile access **audit log**, approve/publish resource content.
- **F13 · Events & News** — staff-maintained read-only lists (the editorially-seeded "home" content that keeps the app from looking empty).
- **F14 · Connections & adult↔adult messaging** 🛡 — adult↔adult only; **no donor→student, no unsupervised adult→minor** contact.
- **F15 · Supervised mentorship + outcome data** 🛡 — students request mentors; all student-involved threads staff-auditable, not private 1:1; instrument intro→outcome from day one (the long-term dataset).
- **F16 · Digest "home"** — new guides + opportunities + events; replaces a user-generated feed in early phases.
- **F17 · Feed / community / groups** — single posting surface, gated on content velocity (cold-start risk).
- **F18 · Donation campaign engine** ⛔ — campaigns with goals/deadlines/progress; processor's name on the receipt (not "MaKonnect"); link-out first, in-app rails later. **Blocked on:** legal entity, named reconciler, regulatory check, board sign-off ([CONSULT.md](./CONSULT.md)).
- **F19 · Donor impact dashboard** 🛡 — **aggregate & anonymised only**; donors never get a browsable roster of specific children.
- **F20 · Real-data import** ⛔ 🛡 — the **deployment gate**: MakoZim staff release and import real records into production via the restricted tier. First time real minors' data touches the system; everything before it runs on synthetic data.

---

*When you finish a feature: flip its status, move it up to "Built," note test coverage, and update the [progress bar](./README.md).*
