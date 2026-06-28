# MaKonnect Project Description

This webapp is intended to be a self-contained platform for connecting Makomborero alumni with each other and the broader Makomborero family (donors, staff, stakeholders, etc ...). Furthermore, it should have a current students tab where they can access a myriad of resources such as blogs / advice from alumni on College Applications, Finances, Networking, and Relationships. If possible this app should be executable offline such that it serves students who might not have internet access regularly. The inspiration is from LinkedIn and ogconnect.co.zw (https://www.ogconnect.co.zw/home). Access screenshots of OGConnect at '/Users/davidmukuruva/Desktop/Academics/Screenshots/Screenshot 2026-06-27 at 08.38.34.png' '/Users/davidmukuruva/Desktop/Academics/Screenshots/Screenshot 2026-06-27 at 08.39.42.png' '/Users/davidmukuruva/Desktop/Academics/Screenshots/Screenshot 2026-06-27 at 08.40.40.png' '/Users/davidmukuruva/Desktop/Academics/Screenshots/Screenshot 2026-06-27 at 08.39.48.png' '/Users/davidmukuruva/Desktop/Academics/Screenshots/Screenshot 2026-06-27 at 08.42.02.png' '/Users/davidmukuruva/Desktop/Academics/Screenshots/Screenshot 2026-06-27 at 08.42.56.png' '/Users/davidmukuruva/Desktop/Academics/Screenshots/Screenshot 2026-06-27 at 08.42.25.png'. The design feel should be of https://www.aleph-nought.com with the Makomborero Zimbabwe color scheme / palette.

---

## 1. Vision & Goals

**One-line reason to open it:** *"Hear from — and reach — someone who got where you're trying to go."* MaKonnect is mentorship/connection first; the directory, resources, and giving are how that promise is delivered, not the promise itself (§2A.8).

MaKonnect is the digital "family hub" for the Makomborero community. It exists to:

- **Keep the family connected** — alumni, current students, staff, donors, and stakeholders in one searchable network even as members scatter across Zimbabwe and the world.
- **Pass knowledge down** — let alumni who have already navigated college applications, scholarships, finances, networking, and life abroad mentor the students coming up behind them.
- **Tell the Makomborero story** — surface member journeys, milestones, and the organisation's impact to strengthen identity and attract/retain donor support.
- **Modernise alumni giving** — replace the current ad-hoc WhatsApp donation pipeline with structured, time-bound, automated donation campaigns (see §3.12 / §4.4). This is a primary motivator, not a nice-to-have.
- **Work where the internet doesn't** — degrade gracefully so a student on intermittent data in Zimbabwe still gets the resources they need.

> **Confirmed direction (June 2026):** This **is** a webapp (the first-principles "should it exist?" challenge is resolved — yes). Development has **pre-approval** from Makomborero. It will be **co-managed** (see §1A) and **built by multiple Makomborero alumni over time** (see §7). The safety/safeguarding framework in §2B is part of the approved pitch.

### 1A. Co-Management & Approval Model (governance)

MaKonnect is **jointly governed by two bodies**, and the app's roles/permissions are built around this from day one:

- **Makomborero staff** — the organisation's authority on students, safeguarding, and official content.
- **Alumni Mentor Committee** — alumni who run mentorship, vet alumni, and co-own the network.

Together they **co-approve registrations and logins** (no one joins unilaterally), moderate content, and steward campaigns. Implement this as a **dual-approval / shared admin model**: a registration is approved when the required approver(s) from each side sign off (configurable — e.g. either-side for low-risk alumni, staff-required for anything involving a minor). The **Designated Safeguarding Lead** (§2B) is appointed from this group once the app is built and the repo is set up.

### Audience segments (drive roles & permissions)
| Segment | Primary needs |
|---|---|
| **Current students** | Resources, mentorship, advice blogs, events, low-data access |
| **Alumni** | Reconnect, mentor, post stories, network, job/opportunity sharing |
| **Staff** | Manage members, moderate content, broadcast announcements |
| **Donors / stakeholders** | See *aggregate* impact, follow consented stories, give |
| **Diaspora alumni** | (Sub-segment, but treat as distinct) richest mentors, employer-referrers, and donor class — design for time-zone-spread, intermittent engagement |
| **Parents / guardians** | Consent for minors, follow their student (with consent), evangelise, future donors |
| **Bad actors** | (Adversarial "user") — not served, but *designed against*: see §2B and the §6A edge-case matrix |

---

## 2. Design System (do this first)

The look should feel like **aleph-nought.com** — clean, modern, generous whitespace, restrained typography, subtle motion — rendered in the **Makomborero brand palette**.

**Confirmed brand palette** (pulled from makomborero.info's live theme — Elementor global colors; verify against official brand assets if any exist):

| Role | Hex | Notes |
|---|---|---|
| Primary / Accent | `#BAC132` | Makomborero olive-green |
| Secondary | `#805522` | warm brown (most-used brand color on the site) |
| Tertiary accent | `#E3862F` | gold / burnt orange |
| Soft tint | `#D6BEAD` | warm beige/tan (cards, fills) |
| Background | `#F8F9EB` | cream / off-white |
| Text | `#000000` | black (use a softened near-black, e.g. `#1F2124`, for body) |

- **Tokens:** encode the palette above as design tokens (CSS variables / Tailwind theme) so theming and a possible dark mode are trivial. Map them to semantic names (`--color-primary`, `--color-surface`, etc.) rather than raw hex at call sites.
- **Component library:** buttons, cards, avatars, tabs, modals, chips/tags, timeline, empty states, skeleton loaders.
- **Responsive-first & mobile-first:** most students are on phones; design for small screens before desktop.
- **Accessibility:** WCAG AA contrast, keyboard navigation, alt text, reduced-motion support.
- **Low-data mode:** a toggle that swaps images for placeholders, defers media, and trims payloads.

---

## 2-Tech. Chosen Tech Stack (decided — stop deliberating, start building)

The plan had no stack; that was the real Monday-morning blocker. Decision, optimised for *solo-alum-first, volunteer-friendly, offline-capable, near-zero budget*:

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | One language front-to-back; the most-documented stack on earth, so volunteer alumni can actually onboard. Static export covers the offline-readable Resources Hub trivially. |
| Backend / DB / Auth | **Supabase (Postgres)** | Auth, Postgres, and **row-level security give the "restricted production-access tier" for free** instead of custom scaffolding. |
| Styling | **Tailwind CSS** | Fast, tokens map cleanly to the brand palette above. |
| Hosting / CI/CD | **Vercel** | CI/CD, preview deploys per PR, and a live URL out of the box; free tier fits a nonprofit. |
| PWA / offline | Next PWA + service worker | Cache-first reads of the Resources Hub (read-only per §3.10). |

> **Principle: boring, maintainable, well-documented over clever.** The next cohort of alumni must be able to pick this up. Don't hand-build infrastructure Supabase/Vercel already give you. *(Recurring-cost ownership once free tiers cap is an open item — see §7/§8.)*

---

## 2A. Reality Check & Guiding Constraints (read before building anything)

This plan was pressure-tested by an adversarial review. Five conclusions override everything below:

1. **The original "MVP" was a 5-year roadmap.** A solo/small team ships ~10% of a feature list this size in a quarter. The scope in §3 is now split into a genuinely shippable **v1** (§3) and **deferred** work (§4 / §6). Resist re-promoting deferred items.
2. **Cold-start is the #1 product risk, not engineering.** A directory and feed over a few hundred strong-tie people is dead air unless it is **pre-seeded**. Before launch, the org must import existing alumni/student records and seed the Resources Hub. No seeding → dead app, regardless of code quality.
3. **The differentiator is knowledge + reach, not "a social network."** The durable value is *an alum's college-application writeup reaching a student who then gets in* — not daily active users. Build for that outcome. WhatsApp/SMS is the reach layer students already live in; treat it as a first-class distribution channel, not an afterthought.
4. **Safeguarding is the foundation, not a moderation feature.** See §2B. This is the risk that can end the nonprofit. It is designed *before* any student-facing surface ships.
5. **One sentence, one hook.** Every screen must serve a clear answer to *"what is this FOR?"* and there must be a named **recurring hook** (the reason a user opens it again Tuesday). Current candidate hook: **"new opportunity / new guide / a mentor replied."** Avoid four overlapping ways to post the same thing (feed + forum + groups + spotlights).

### Round-2 pressure-test (after the plan was refined) — five more overriding conclusions

6. **The builder gap is now the #1 risk.** "Multiple volunteer alumni over time" is a *governance model, not a builder* — and to an outsider, "over time" reads as "never." There must be **one named, accountable first builder** (David) with committed hours who owns the unglamorous 80% (data import, auth, reconciliation, CI). Without that, the likely outcome is an enthusiastic initial commit then drift — leaving a half-built system *that touches minors' data and money* in a public repo with no maintainer. That is **worse than not building** — it's a live liability with MakoZim's name on it.
7. **Ship a real URL before any collaboration scaffolding.** CI gates, contributor tiers, and `CODEOWNERS` for a one-person day-one repo is ceremony. Build a working slice **solo** first; add the safety backbone the day before the first external PR. The failure mode to avoid is **scaffolding paralysis** — polishing infra while nothing ships, so no collaborator ever sees a live thing to get excited about.
8. **The irreducible core is mentorship/connection, not the directory or donations.** The real one-line reason to open MaKonnect: *"talk to / hear from someone who got where you're trying to go."* The directory + profiles is the right **first build**, but it is the *on-ramp to mentorship*, not the point. Frame and sequence it that way or it's plumbing for a value loop no one scoped. (Structured mentorship sits in Phase 2 — fine to build second, but v1's framing/copy must point at it.)
9. **Donations is the highest-risk, lowest-trust feature — defer and de-risk it.** It's bolted onto an unproven app. Before any campaign goes live it needs: a **confirmed registered legal entity** that receives the funds, a **named human reconciler**, an **immutable audit trail**, a **refund/dispute policy**, and a **known payment processor whose name is on the receipt** (Paynow/EcoCash/Stripe — *not* "MaKonnect"). "Provider-agnostic" must not become a stall that means nothing ships — pick Zimbabwe's real rail concretely (see §3.12). The old WhatsApp pipeline was inefficient but **legible** (a person you could ask); don't replace legible-but-slow with automated-but-unaccountable.
10. **Validate demand before building much more.** No user research exists yet; the plan risks building inside-out. Do one lightweight round (a handful of students + alumni) to confirm the mentorship hook *before* expanding past the v1 slice. Also unmeasured and load-bearing: **MakoZim staff capacity** (in real hours), **recurring hosting-cost ownership** once free tiers lapse, and **key-person risk on David** (bus-factor/succession). See §7–§8.

---

## 2B. Safeguarding, Privacy & Trust (FOUNDATIONAL — build first)

Makomborero serves **gifted underprivileged minors**. The platform puts adult alumni, staff, and donors in contact with them and stores data that signals economic vulnerability, location, and aid status. This section is non-negotiable and precedes all feature work.

> **Anchored to MakoZim's existing frameworks (confirmed).** MaKonnect does **not** invent its own safeguarding regime — it **inherits and operationalises MakoZim's**: MakoZim already has a **child-protection policy**, **consent forms**, and **data-handling guidelines**. The app implements those (consent capture, contact rules, data jurisdiction) rather than authoring new policy. **Real data requests / imports happen during the deployment phase**, released by MakoZim staff (see §3.1, §5). Until then, build against synthetic data only.

### Child protection
- **Named Designated Safeguarding Lead (DSL)** — a real human at the org accountable for child protection, with an escalation path. The app links to a written child-protection policy.
- **Age-gating & guardian consent** — capture date of birth; for under-18s, require verified guardian/staff consent before a profile is visible or messaging is enabled.
- **No open adult→minor DMs.** Donors **cannot** message students at all. Alumni↔student contact only happens inside **supervised, opt-in mentorship channels** (staff can audit; never private 1:1 by default for minors). Default to staff-mediated.
- **Audit logging** — record who viewed/searched/messaged which minor's profile; reviewable by the DSL.
- **Reporting & blocking** — one-tap "report" and "block" on every profile, post, and message, routed to a moderator with an SLA.

### Donor–student power dynamics
- Donors see **aggregated, anonymised impact only** (cohort outcomes, stories with consent) — never a browsable roster of the specific children they fund. Students are not inventory.
- Student "success stories" are **opt-in, consented, and revocable**, and can be anonymised.

### Data privacy & dignity
- **Data minimisation** — collect aid/financial status only if essential; never expose it to other members. Economic-vulnerability fields are staff-only.
- **Permanent-profile risk** — a poverty-linked public profile can follow a student for life. Profiles default to **family-only**, support full **export and deletion**, and have a defined lifecycle when a student ages out or leaves (archive/anonymise, not orphan).
- **Hosting & jurisdiction** — decide where data lives, under which law (Zimbabwe Data Protection Act / GDPR-style), and who can be legally compelled to hand it over. Encrypt at rest and in transit.
- **Shared-device safety** — many students use shared phones. Explicit logout, short sessions, "this isn't me" account guard, and never auto-syncing one person's queued drafts to another's session.

### Content liability
- Alumni-authored **finance and relationships** advice carries real risk to minors. All resource content is **staff-reviewed before publish**, carries clear disclaimers ("guidance, not professional/financial/legal advice"), and has a correction/takedown path.

---

## 3. Hardcore (Core / v1) Features

The genuinely shippable v1 — *invite-only accounts + profiles + searchable directory + a static, offline-readable Resources Hub*. This delivers real value in weeks ("find any alum, read the guides") and validates demand before heavier features. Everything here assumes §2B is already in place.

> **Frame v1 as the on-ramp to mentorship (§2A.8).** The directory and profiles are the *first build*, but the reason-to-open is connection: *"hear from / reach someone who got where you're trying to go."* v1 copy, profile design ("open to mentoring," "ask me about…"), and the empty states should all point toward the mentorship loop that lands in Phase 2 — otherwise v1 is plumbing for a value nobody scoped. The directory is **how**, mentorship is **why**.

> **Demo scope update (2026-06-27).** To show the full *interconnectivity* story to stakeholders, the live demo now **illustrates** two features ahead of their real build — on synthetic data, without reversing the safeguarding sequencing below:
> - **Alum↔alum connection** — the directory and profiles now frame *peer networking* (an "open to…" intent signal and a non-functional **Connect** control), not only alum→student mentorship. Real connecting/messaging still lands in **Phase 2** behind auth (§3.3).
> - **Alumni-directed giving** — a **demo-only campaign UI** (campaign cards, progress, and a **link-out** to a named processor) showcases §3.12. **No money moves in-app**; real capture/reconciliation stays gated on the legal entity, named reconciler, and regulatory checks (§3.12, §7). On the next-meeting triage list.
>
> Minors are unaffected by both: still family-only, never in the directory, and **never named in a campaign** (beneficiaries are aggregate cohorts only).

### 3.1 Accounts, Identity & Roles
- Email/phone sign-up & login; password reset. Phone-first (many students lack reliable email).
- **Role-based access** (student, alumni, staff/admin, donor) gating navigation and permissions. Roles are assigned, never self-selected.
- **Invite, verification & co-approval (per §1A):** registrations and logins are **approved by the co-management bodies** — Makomborero staff and the Alumni Mentor Committee. Onboarding is **claim-based against pre-seeded records** — the existing **MakoZim-managed alumni/student database** is the source of truth; **only MakoZim staff can release it, and that release/import happens during the deployment phase** (not during early dev — build against synthetic data). A member "claims" their pre-made profile via a one-time link/code, with an **approval queue** the co-managers action. This avoids both the lone-busy-staffer bottleneck and open-invite randos.
  - Dual-approval is **configurable by risk**: alumni claims can be approved by either body; **anything involving a minor requires staff sign-off**.
- Identity verification: claim-code tied to the imported record + committee/staff spot-check; flagged mismatches and out-of-import sign-ups go to the approval queue.
- Basic profile bootstrap on first login (name, cohort/year, status, **date of birth for age-gating** per §2B).

### 3.2 Member Profiles
- Rich profile: photo, cohort/class year, current location, current role/company or school, "About me," contact preferences.
- **Journey timeline** (à la OGConnect) — education and work history rendered as a horizontal/vertical timeline with date ranges and institutions.
- Skills/interests tags and what they're "open to" (mentoring, hiring, collaborating).
- Privacy controls per field (public to family / connections only / hidden).

### 3.3 Directory & Search ("Find Members") — *v1*
- Searchable, filterable directory by name, cohort/year, location, industry, school, skills.
- **Connection requests** between adult members (alumni/staff/donor). **Messaging is gated by §2B:** no donor→student or unsupervised adult→minor DMs. Adult↔adult messaging is fine; student-involved contact only via supervised mentorship channels.
- Directory respects per-field privacy and excludes economic-vulnerability fields entirely.
- "Suggested connections" / "New members" modules. *Caveat:* over a few hundred people these are thin — don't over-build ranking; a good filter beats an algorithm at this scale.

### 3.4 Home Feed & Posts — *DEFERRED past v1 (cold-start risk)*
> An empty feed over a few hundred people reads as "abandoned" and is the fastest way to kill perceived value. **Do not ship a feed until there is content velocity.** When introduced, a single posting surface — not feed + forum + groups + spotlights as four redundant ways to post.
- Activity feed: posts, stories, milestones (new member joined, new job, achievements).
- **Compose post / "share a story"** with text + image; character limit indicator.
- Reactions and comments; filter the feed by type.
- Replace the v1 "home" with a **digest of new guides + new opportunities + upcoming events** (editorially seeded, never empty) instead of a user-generated feed.

### 3.5 Student Resources Hub (signature feature) — *v1, the core differentiator*
The reason the app exists. Curated, categorised, **staff-reviewed** guidance content:
- Categories: **College Applications, Finances, Networking, Relationships** (extensible). Finance/relationship content carries disclaimers + review per §2B.
- Articles/blogs authored by alumni & staff, with author attribution and tags.
- Searchable, bookmarkable, **shareable to WhatsApp** (reach layer — see §2A.3); each guide has a clean shareable link/card.
- **Offline-readable** — static content cached first; highest offline priority.
- **Anti-cold-start:** seed 15–30 strong guides *before launch* by interviewing alumni (see oral-history intake, §4.1). An empty hub is as dead as an empty feed.

### 3.6 Mentorship / Careers — *DEFERRED to v2; when built, supervised by default*
- Alumni opt in to mentor with structured "how can I help?" categories (CV review, interview prep, career guidance, industry-specific, relocation, returning to work, starting a business).
- Students **request mentors**; mentors accept/decline. **All student-involved threads are staff-auditable, not private 1:1 by default** (§2B).
- Instrument the introduction → outcome data from day one even if the matching UI is manual at first — this graph is the long-term asset (see §4.2 / §7).

### 3.7 Groups (Cohorts & Interest) — *DEFERRED past v1*
- **Class/cohort groups** ("Class of 20XX") and interest groups; group-scoped posts/photos; join/leave; discovery.
- Same cold-start caveat as the feed — only valuable once there's a posting population.

### 3.8 Events — *v1-lite (read-only list)*
- Upcoming events list + detail pages (reunions, webinars, fundraisers, info sessions). RSVP and `.ics` export.
- v1 can be a simple staff-maintained list (no user-created events) to stay shippable.

### 3.9 News & Announcements — *v1-lite*
- Org news + staff broadcast announcements (this is the editorially-seeded "home" content that keeps the app from looking empty).
- In-app notifications for the few v1 events (claim confirmed, new guide published, mentor reply).

### 3.10 Offline Capability — *v1, but READ-ONLY caching only*
> The council's hard call: **do not build offline write-queue + sync-on-reconnect for v1.** Last-write-wins silently corrupts data and shared-device sync can post to the wrong account. That's distributed-systems work that will eat the whole timeline.
- **PWA**: installable, service worker, offline app shell.
- **Cache-first reads** of the Resources Hub and the user's own profile — the genuinely offline-valuable content.
- **Writes require connectivity and fail gracefully** ("You're offline — we'll let you post when you're back"). No silent queue.
- Visible offline indicator + **low-data mode** toggle (defer images, trim payloads). This is the real Zimbabwe differentiator — keep it visible, not buried.
- **Shared-device safety** (§2B): explicit logout, short sessions, no cross-session draft bleed.

### 3.11 Admin, Moderation & Safeguarding Tools — *v1*
- Admin dashboard: manage members, run the **import/claim seeding**, assign roles.
- **Safeguarding console:** review reports/blocks with an SLA, view the minor-profile access audit log, approve/publish resource content, manage consent records. (This is §2B made operational — not optional.)
- Content moderation (remove/flag posts when those surfaces exist); author/editor tools for Resources, News, Events.

### 3.12 Donation Campaign Engine — *core motivator (not deferred), phased build*

Replaces the existing **inefficient WhatsApp alumni giving pipeline** with structured, automated, time-bound campaigns. A primary reason the app exists — but the round-2 council flagged it as the **highest-risk, lowest-trust** feature, bolted onto an unproven app. So: **it is sequenced LAST, and the trust/accountability scaffolding below is a precondition, not a follow-up.**

**Preconditions before ANY campaign goes live (non-negotiable, per §2A.9):**
- **A confirmed registered legal entity** that legally receives the funds (which org, its registration, tax-receipting, cross-border donor flows). *This is a leadership decision that gates the whole feature — see §8.*
- **A named human reconciler** accountable for the money, an **immutable audit trail**, and a written **refund/dispute policy**.
- **The payment processor's name is on the receipt** (Paynow / EcoCash / Stripe) — *not* "MaKonnect." Donors trust a known processor, not a volunteer-built app. This also keeps card/PII handling out of our system.
- **Regulatory check** — is in-app donation handling compliant for the receiving entity under Zimbabwean nonprofit, payment, and **data-protection (Cyber & Data Protection Act)** law? Confirm before launch.

**Feature shape:**
- **Campaigns with timelines & goals** — staff/committee create a campaign (purpose, target, start/end date, beneficiary cohort *in aggregate*, not named minors per §2B). Live progress bar, contributor count, deadline. **Define the miss-target behaviour up front** (e.g. funds still applied to the cause / rolled over / refunded) — don't leave it implicit.
- **Automation — the actual win over WhatsApp:** auto payment capture + reconciliation (no manual "did you send it?"), receipts/confirmations, recurring/pledge support, **auto-generated reporting** (ties into the §7 fundraising flywheel). *But note (First-Principles):* WhatsApp giving is partly inefficient because giving runs on **relationship and a human thank-you** — automate the admin, but keep the personal touch (the vouch, the follow-up, the gratitude) or you trade warm-but-slow for efficient-but-ignored.
- **Pick the rail concretely, don't hide behind "provider-agnostic."** Build a thin provider interface, but **integrate one real Zimbabwe rail (Paynow/EcoCash) first** — an abstraction over zero implementations ships nothing. Provider *choice* is the collaborators'/stakeholders' call; "we'll abstract it" is not a substitute for shipping one.
- **Build phasing:** until the above exists, the app shows clean **campaign UI in-app but links out** to the processor for money movement (Phase 4); in-app capture comes only once a rail + reconciler + legal entity are in place (Phase 5).
- **Trust & transparency:** per-campaign records of what was raised and where it went; audit every transaction; reconcile to the campaign.

---

## 4. Nice-to-Have Features (Beyond MVP)

Sequenced roughly by value-to-effort once the core ships.

### 4.1 Community & Engagement
- **Member spotlights** — auto-rotating "Profile of the week" (OGConnect "OG Profiles" equivalent).
- **Photo galleries** organised by reunions, cohorts, events, "celebrations."
- **Into the Archives** — historical photos, founding story, milestones of the organisation.
- **Forum** — threaded long-form discussion separate from the fast feed.
- **Chairman's / Director's letters** — recurring leadership column.
- **Alumni oral-history intake** — a structured "tell your story" prompt at onboarding that *doubles as Resources Hub seed content and anti-cold-start fuel*. Capture stories before goodwill and memory go cold; this is the cheapest way to fill an empty hub.
- Reactions beyond "like"; @mentions; hashtags.

### 4.2 Mentorship & Career (deeper)
- **Job & opportunity board** — alumni post roles, internships, scholarships.
- **Business directory** — alumni-owned businesses (support-the-family commerce).
- Structured mentorship programs with goals, check-ins, and progress tracking.
- Office-hours / availability booking for mentors.
- Ask-an-alum Q&A board (public questions, alumni answers — builds the resource library organically).

### 4.3 Student Success Tools
- **College application tracker** — deadlines, requirements checklist, status per school.
- **Scholarship & opportunity database** with deadline reminders.
- Essay/personal-statement feedback exchange (student submits → alumni reviews).
- Resource learning paths (ordered reading for "applying to US colleges," "managing first stipend," etc.).
- Downloadable resource packs (PDF) for fully-offline study.

### 4.4 Donor & Stakeholder Features
- **Impact dashboard — aggregate & anonymised only** (students supported, placements, consented stories). Donors **never** get a browsable roster of the specific children they fund (§2B); they can follow a *cohort's* aggregate progress, not an individual minor's.
- Donor recognition wall (opt-in).
- In-app **donations / giving** — **promoted to a core feature; see §3.12 Donation Campaign Engine.** It replaces the inefficient WhatsApp giving pipeline with automated, time-bound campaigns. Payment rails (EcoCash + international) are phased: campaign structure & reporting can ship early; in-app money movement comes once rails are integrated.
- Newsletter / digest generation from recent stories and news (auto-assembled from the impact data — see §7 fundraising flywheel).

### 4.5 Communication & Notifications
- Email / SMS / WhatsApp notifications (SMS & WhatsApp matter most for Zimbabwe reach).
- Real-time chat (typing indicators, read receipts) upgrading the basic messaging.
- Group announcements & broadcast lists.
- Weekly digest email summarising feed, events, and new opportunities.

### 4.6 Platform & Power Features
- **Native-feeling mobile** via PWA install prompts; optional later wrapper (Capacitor) for app stores.
- **Multilingual** — English + Shona (and Ndebele) for accessibility.
- Global search across people, posts, resources, events.
- Analytics for admins (engagement, resource usage, mentorship match rates).
- **Data export & backup**; GDPR-style data controls.
- AI assist: smart connection suggestions, resource recommendations, draft-a-post / summarise-a-thread, "find me a mentor in X."
- SSO (Google) for low-friction sign-in where connectivity allows.

---

## 5. Suggested Build Phases (re-sequenced after pressure-test)

> The old plan front-loaded the feed and back-loaded safeguarding. Reversed below. Ship the smallest thing that delivers the core outcome, with protection built in first. **Round-2 change: a solo "ship a live URL" step now comes before any collaboration scaffolding, and a user-research step gates expansion past v1.**

0. **Phase −2 — Ship a URL solo (this week, David alone):** `npx create-next-app` → push initial commit → connect Vercel → **a live URL with one synthetic profile + a working directory search page**. Stack per §2-Tech. Goal: beat *scaffolding paralysis* (§2A.7) and have something real to show collaborators. **No CI gates / contributor tiers / CODEOWNERS yet** — that's ceremony for a one-person repo.
1. **Phase −1 — Validate + minimal scaffolding:** **One lightweight user-research round** — talk to ~5 students + ~5 alumni to confirm the *mentorship* hook (§2A.8, §2A.10) before building more. In parallel, add the safety backbone **just-in-time** — `CONTRIBUTING.md` + `SECURITY.md` + `CODEOWNERS` + branch protection + CI (lint/test/secret-scan) the day before the **first external PR**. Confirm co-management approvers, the **restricted production-access tier**, and **appoint the DSL**. Map to MakoZim's existing child-protection & consent policy (don't re-author). *Real-data import is NOT here — deployment phase only; all dev on synthetic data.*
1. **Phase 0 — Foundations + Safeguarding:** design tokens, auth (phone-first), roles, age-gating + consent model, profile data model with privacy/lifecycle, audit logging, PWA read-only shell.
2. **Phase 1 — Knowledge + Directory (the real v1):** claim-based onboarding, profiles + timeline, searchable directory, **static offline-readable Resources Hub seeded with 15–30 guides**, low-data mode, WhatsApp share, safeguarding console, staff-maintained events/news. (Built/tested on **synthetic data**.)
   - **Deployment gate (the real-data step):** before public launch, MakoZim staff **release and import the real alumni/student database** into production via the restricted access tier (§7), under MakoZim's consent/data guidelines (§2B). This is the first time real minors' data touches the system — it gates go-live, and *Ship & validate* happens after it.
3. **Phase 2 — Connection (only if v1 shows demand):** adult↔adult connections/messaging, supervised mentorship with outcome instrumentation, editorially-seeded digest "home."
4. **Phase 3 — Community:** feed/posting (single surface), groups, spotlights, galleries, archives, forum, notifications — *gated on content velocity existing*.
5. **Phase 4 — Sustainability & scale:** **donation campaign structure + reporting (§3.12)** with link-out for money movement, aggregate donor impact dashboard, job board, business directory, weekly digest.
6. **Phase 5 — Growth/heavy:** **in-app payment rails for §3.12** (provider chosen by collaborators/stakeholders — EcoCash + intl.), SMS/WhatsApp notifications, multilingual (Shona/Ndebele), real-time chat, AI assist.

---

## 6. Reality on Scope & Effort

Honest sizing of items the original plan buried as "MVP" — each is **weeks-to-months on its own** and was de-scoped above accordingly:

| Feature | Hidden cost | v1 decision |
|---|---|---|
| Offline write-queue + sync | Distributed-systems work; LWW corrupts data | **Cut.** Read-only caching; writes need connectivity |
| In-app giving (§3.12) | EcoCash/intl. rails, PCI, reconciliation, legal | **Core feature, phased.** Ship campaign structure + reporting early; link out for money movement until rails integrated, then bring in-app |
| Real-time chat | WebSocket infra; polling fine for hundreds | **Defer.** Async messaging only |
| Multilingual | i18n cheap; *quality translation + upkeep* is a forever-tax | **Defer.** Ship English first |
| Mentorship matching | Matching algo is over-engineering at this scale | **Defer.** Manual intro + instrument the data |
| Feed/forum/groups | Worthless empty (cold-start); 4 redundant post surfaces | **Defer + consolidate** to one surface later |

---

## 6A. Edge-Case & Failure-Mode Matrix (by user type)

The pressure-test's core deliverable — what breaks, per actor, and the mitigation.

### Student (often a minor, on a shared phone, intermittent data)
- Shared device → another student's session still open → posts as them / sees their data. *Mitigation: short sessions, explicit logout, "not me?" guard, no cross-session draft bleed.*
- Loses connectivity mid-action → expects it saved. *Mitigation: writes fail loudly, never silently queue.*
- Profile reveals poverty/aid status → bullying now, reputational harm for life. *Mitigation: vulnerability fields staff-only; family-only default; deletable.*
- Receives DM from an adult stranger. *Mitigation: no unsupervised adult→minor contact (§2B).*
- Ages out / leaves → orphaned permanent profile. *Mitigation: defined offboarding archive/anonymise lifecycle.*
- Low digital literacy / can't find the one thing they came for. *Mitigation: one clear job per screen; not a maze behind minimalism.*

### Alumni / Diaspora
- Busy; has LinkedIn + WhatsApp already → never returns. *Mitigation: a real recurring hook + WhatsApp-native sharing, not "another network."*
- Time-zone spread → real-time features useless. *Mitigation: async-first.*
- Posts well-meaning but wrong financial/relationship advice. *Mitigation: staff review + disclaimers.*
- Impersonator claims to be an alum. *Mitigation: claim-code against seeded records + staff spot-check.*

### Staff / Admin
- Single overloaded staffer is the bottleneck for invites, moderation, content review → everything stalls. *Mitigation: claim-based onboarding removes the invite bottleneck; clear DSL ownership; realistic moderation SLA.*
- No one to seed content → empty app. *Mitigation: Phase −1 seeding is a launch gate.*

### Donor / Stakeholder
- Wants to see "their" specific student → pressure, favouritism, dignity harm. *Mitigation: aggregate/anonymised impact only.*
- Expects giving in-app; interim link-out feels disjointed. *Mitigation: clean campaign UI in-app even while money movement links out; bring fully in-app per §3.12.*
- Gives to a campaign but can't see where it went → erodes trust. *Mitigation: per-campaign transparency + auto-reporting (§3.12).*

### Bad actor (designed against, not served)
- Predator using profiles + DMs to target minors. *Mitigation: the entire §2B safeguarding model.*
- Scraper harvesting a directory of identified vulnerable minors. *Mitigation: auth-gated directory, rate-limiting, no vulnerability fields exposed, audit logs.*
- Data breach / legal compulsion exposing minors' status + location. *Mitigation: data minimisation, encryption, deliberate hosting jurisdiction, retention/deletion policy.*
- Spam/harassment in any open surface. *Mitigation: report/block with SLA before those surfaces open.*

---

## 7. Governance, Sustainability & the Long Game

The council flagged that **no one owns the long term** — the biggest silent killer after cold-start. The chosen model addresses this but introduces its own risks.

### Named accountability (the round-2 #1 fix)
- **One accountable first builder: David.** "Volunteers over time" is governance, not a builder — someone must own the unglamorous 80% (data import, auth, reconciliation, CI) with committed hours. Name it, or the project drifts into an abandoned child-data liability (§2A.6).
- **Key-person / bus-factor on David.** He is the single point of failure until others are genuinely contributing. Mitigate early: everything documented, credentials in a shared (org-owned) secret store not a personal account, and a written "if David is unavailable" handover note. The org — not any individual — owns the repo, the domain, the data, and the Vercel/Supabase accounts.
- **Named money reconciler** before any campaign (§3.12) — accountability for funds is a person, not a feature.

### Legal & regulatory reality (newly surfaced — not settled by "safeguarding policy")
"Anchored to MakoZim's child-protection policy" governs *conduct*; it does **not** settle these, which are open and load-bearing:
- **Which registered legal entity** receives donations, and its tax/receipting/cross-border-flow obligations (gates §3.12).
- **Data-protection law** — Zimbabwe's **Cyber and Data Protection Act** (and donor-country law) applied to minors' data: lawful basis, retention, breach notification, who can compel disclosure. Distinct from safeguarding conduct.
- **Board / leadership sign-off** on a public repo and an app holding minors' data, and liability/insurance for same.
- **Recurring cost ownership** — who pays and renews the domain, Supabase, and Vercel when free tiers cap or lapse (year-two problem nobody owns yet).

### Development model: multiple alumni contributors over time
The project starts with David's **initial commit, then invites collaborators** — built by a rotating set of Makomborero alumni. This is the right answer to long-term bus factor *once it's real*, but day one it's a team of one; a child-data system built by many volunteer hands needs guardrails (added **just-in-time**, per §2A.7 — not before the first external PR):

- **Repo posture — public, by decision.** The repo **is public** (open-source ethos, easier alumni collaboration). The trade-off: *no security through obscurity* — threat-model accordingly. **Secrets, keys, payment credentials, and any real data never live in the repo** (env/secret manager from commit #1; a pre-commit secret scanner; branch protection on `main`).
- **Contributor vetting & production-access tiering (the key control).** Public *code contribution* is open to vetted alumni via PRs, but **production and real-student-data access is a restricted pipeline held by a small named set of individuals** (co-management bodies + DSL). Concretely: anyone can open a PR; only the small trusted tier can merge to `main`, hold env secrets, deploy, or touch the production DB / real imports. Everyone else works against **synthetic/seed data** in staging — never real minors' data in dev.
- **CI/CD pipeline (a stated goal).** Set up CI/CD from early on: on every PR run lint, tests, a **secret scanner**, and dependency/security checks; require green CI + review before merge; automated deploy to staging, and **gated/manual promotion to production** restricted to the trusted tier. This makes the public-many-contributors model safe and is the backbone of the access tiering above.
- **Code review as a safeguarding control.** Require PR review before merge — especially for anything touching auth, minors' data, messaging, or payments. A `CONTRIBUTING.md` + `SECURITY.md` + `CODEOWNERS` + a short safeguarding-aware review checklist exist **before** collaborators are invited.
- **Continuity.** Onboarding/handover docs, an architecture decision log, and "boring, maintainable tech over clever" so the next cohort of alumni can pick it up. Document everything.
- **Who pays in year three?** Define hosting/maintenance funding before launch, not after. Favour low-cost, low-ops hosting with CDN reach into Zimbabwe.
- **Data lifecycle & ownership.** The *org* owns the data, not the builder. Export, retention, and deletion are first-class (and a safeguarding requirement, not just a nicety).
- **Accessibility** beyond connectivity — screen readers, low-literacy, low-end Android devices.

**The long-game upside (keep buildable, don't build yet).** The compounding asset is the **mentorship → introduction → outcome graph**: a verified dataset no competitor can backfill. Instrument it from day one even while the UI is manual. That same data powers the two self-funding flywheels: (1) **Resources Hub as a public good** — open the hub (gate the network) so alumni-authored guidance becomes the front door for *every* Zimbabwean student and the top-of-funnel for future scholars; (2) **aggregate donor-impact reporting** as an auto-generated fundraising engine. Don't monetise children — monetise the *institution's verified outcomes*, in aggregate, with consent.

**Two more upsides the round-2 council surfaced (reframe at near-zero cost, build later):**
- **The repo is a CS apprenticeship, not just a logistics choice.** Makomborero produces gifted tech students; a live, CI/CD-backed codebase is something they can *learn on*. Brand it — a **"MaKonnect Build Fellowship"**: cohorts ship real features mentored by alumni engineers, earn public commit history for jobs/scholarships, and train the next cohort. That turns the build model from a *risk* (volunteer drift) into a *program* with its own purpose and a story donors fund — and it directly feeds the builder-accountability gap (§2A.6) with a structured pipeline of contributors. *(Caveat from the Contrarian: a Fellowship of rotating cohorts still needs the single accountable maintainer holding the pager — apprenticeship complements named ownership, it doesn't replace it.)*
- **Fork-as-template.** Alumni-network + time-bound campaigns + resources hub is a *generic* education-nonprofit stack. Writing the README as a **fork-me template** with a config/branding layer from day one (near-zero cost) lets other African / Global-South orgs adopt it later, with Makomborero as upstream maintainer — reputation, civic-tech grants, and an adopter network flow back. The consented longitudinal outcomes dataset is also genuinely grant- and research-grade.

---

## 8. Open Questions

### Resolved (June 2026)
- ✅ **Webapp confirmed** — first-principles "should it exist / WhatsApp-instead" challenge answered: yes, a webapp.
- ✅ **Pre-approval secured** for development from Makomborero.
- ✅ **Governance = co-management** by Makomborero staff + Alumni Mentor Committee, who co-approve registrations/logins (§1A).
- ✅ **Development model** = multiple alumni contributors over time; initial commit then invite collaborators (§7).
- ✅ **Designated Safeguarding Lead** = appointed from the co-management group once the app is built and the repo is set up.
- ✅ **In-app giving = core feature** (time-bound automated campaigns replacing the WhatsApp pipeline), built in phases (§3.12).
- ✅ **Offline scope** = read-only caching for v1 (§3.10).
- ✅ **Brand palette** = pulled from makomborero.info (§2): primary/accent `#BAC132`, secondary `#805522`, gold `#E3862F`, beige `#D6BEAD`, cream `#F8F9EB`, black text.
- ✅ **Alumni/student database exists**, MakoZim-managed; **only MakoZim staff release it**, and the import is a **deployment-phase** activity (§3.1, §5).
- ✅ **Hosting jurisdiction, applicable law & consent model** = handled through **MakoZim's existing consent forms & data guidelines** (§2B) — app implements, doesn't author.
- ✅ **Child-protection policy** = already exists at MakoZim; data requests done during deployment phase (§2B).
- ✅ **Payment provider** = deferred to the **collaborator team + stakeholders** (§3.12); build provider-agnostic.
- ✅ **Repo = public**, with a restricted **production/data-access tier** for a small named set and a **CI/CD pipeline** as the safety backbone (§7).
- ✅ **Tech stack chosen** (round 2): Next.js + TypeScript + Supabase + Tailwind on Vercel (§2-Tech).
- ✅ **First builder named** = David, with a solo "ship a live URL" step before collaborators (§2A.6–7, §5).

### Still to confirm (before / during build)
**Now blocking the donation engine (§3.12) — leadership decisions, not code:**
- **Which registered legal entity receives donations** (+ its tax/receipting/cross-border obligations). *Gates all of §3.12.*
- **Regulatory compliance** of in-app donations + minors' data under Zimbabwe's **Cyber & Data Protection Act**, nonprofit, and payment law (distinct from the safeguarding *conduct* policy).
- **Named money reconciler** + refund/dispute policy + the chosen first payment rail (Paynow/EcoCash).

**Sustainability & validation:**
- **Recurring cost ownership** — who pays/renews domain + Supabase + Vercel when free tiers cap; org-owned (not personal) accounts.
- **User-research / pilot** before expanding past v1 — confirm the mentorship hook with ~5 students + ~5 alumni (§5 Phase −1).
- **MakoZim staff capacity in real hours** for seeding, moderation, approvals, reconciliation (everything assumes bandwidth nobody has measured).
- **Key-person / handover plan for David** (bus-factor) until contributors are genuinely active.

**Still outstanding from before:**
- Logo assets + typography (palette set; fonts/logo files needed from MakoZim).
- Exact membership of the **trusted production-access tier** and the **DSL** (named at repo setup).
- The deployment-phase **data-request/import process** with MakoZim (format, fields, handover security).
