# What we need from everyone — approvals, questions & concerns

Everything that needs a **decision, sign-off, or answer from someone other than the programmers** — routed by who we're consulting. This is the agenda the **project lead** takes into the WhatsApp group and meetings. Coding work is separate ([DEV_TASKBOARD.md](./DEV_TASKBOARD.md)).

*As of 2026-06-27. Living doc — tick items as they resolve; new ones get added.*

**Legend:** 🔴 launch-blocking · 🟠 needed before its feature · 🟢 ongoing · `[ ]` open · `[~]` in progress · `[x]` done · 🛡 safeguarding-sensitive. Section refs (§) point into [PROJECT_DESCRIPTION.md](../PROJECT_DESCRIPTION.md).

---

## 🚧 Top blockers — nothing real ships until these clear

- [ ] 🔴 **Board / leadership sign-off** for: a **public repo**, an app **holding minors' data**, and the **donation feature**. *(MakoZim leadership + Alumni Mentor Committee)*
- [ ] 🔴 **Confirm David** as the named, accountable first builder with committed weekly hours. *(§2A.6 — the single biggest risk is "no one writes line one.")*
- [ ] 🔴 **Identify the registered legal entity** that receives donations (org, registration number, tax status). *Gates the entire donation engine (F18).* — *MakoZim leadership*
- [ ] 🔴 **Appoint the Designated Safeguarding Lead (DSL)** — a real, named person with an escalation path, at repo setup. 🛡
- [ ] 🔴 **Name the money reconciler** accountable for donor funds (must exist before any campaign). 🛡

---

## 1 · MakoZim leadership / board — approvals

- [ ] 🔴 The three sign-offs above (public repo · minors'-data app · donations).
- [ ] 🔴 Confirm the **legal recipient entity** for donations + its tax/receipting and cross-border (diaspora) obligations.
- [ ] 🟠 **Budget line** for year-two hosting + domain renewal once free tiers cap — and confirm **org-owned accounts**, not personal logins. *(§7/§8)*
- [ ] 🟠 Approve **transfer of the repo and all accounts to a Makomborero org** (GitHub, Vercel, Supabase, domain, secret store).
- [ ] 🟢 Repo **open-source licence** choice (e.g. MIT/AGPL) — interacts with the "fork-me template" ambition.

## 2 · MakoZim staff — assets, data & safeguarding

**Needed soon (unblocks look & content):**
- [ ] 🟠 **Logo files** (white + colour, SVG/PNG). *Palette already matched from makomborero.info.*
- [ ] 🟠 **Typography / fonts** — official typeface(s) or confirmation we may pick a close free alternative.
- [ ] 🟢 **Name sign-off** — confirm "MaKonnect" is approved and doesn't clash with existing branding.
- [ ] 🟠 **15–30 alumni "advice" pieces** (or permission + intros to gather them) to seed the Resources Hub — college apps, finances, networking, relationships.
- [ ] 🟠 Assign a **content/seeding owner** (Resources Hub launch content + ongoing curation).

**Safeguarding & governance (we implement MakoZim's policy — we don't author it):** 🛡
- [ ] 🔴 Share MakoZim's **written child-protection policy**, **consent forms**, and **data-handling guidelines** — we map each app behaviour to them.
- [ ] 🔴 Confirm the **contact-rule model** is acceptable: **no donor→student messaging; no unsupervised adult→minor DMs;** alumni↔student only via staff-auditable mentorship.
- [ ] 🔴 Name the **co-approval bodies** (which staff + which Alumni Mentor Committee members approve registrations/logins) and the **dual-approval rules** (either-body for alumni; **staff required for anything involving a minor**).
- [ ] 🟠 Name the **restricted production / real-data access tier** — the small set allowed to touch prod, secrets, and real imports.
- [ ] 🟠 Agree the **audit-log review cadence** (who reviews who-viewed/messaged-which-minor, how often) and the **report/block escalation path + SLA**; assign a **moderation owner**.
- [ ] 🟠 Confirm **economic-vulnerability / aid fields are staff-only**, never exposed to members or donors. *(Already enforced in code — needs your written sign-off.)*
- [ ] 🟠 Agree the **profile lifecycle** when a student ages out/leaves (archive/anonymise, not orphan).

**Data (deployment phase only — NOT during dev):**
- [ ] 🔴 Agree the alumni/student **database is released only at the deployment phase**, by MakoZim staff. 🛡
- [ ] 🟠 Define the **"person" data contract** — which fields exist, who is authoritative for each, how a claim reconciles with the record — and the **export format + secure handover** method.

## 3 · Alumni Mentor Committee

- [ ] 🔴 Confirm **membership** of the committee that co-approves registrations and vets alumni claims.
- [ ] 🟠 Agree the **contributor vetting** process for alumni who want to write code (who may open PRs vs. merge/deploy/touch data).
- [ ] 🟢 Decide who **arbitrates technical disagreements** among volunteers (a lead maintainer / steering call).

## 4 · Code collaborators

- [ ] 🟠 Acknowledge the **working agreements** in [DEV_TASKBOARD.md](./DEV_TASKBOARD.md) (synthetic-data rule, PR/review flow, read AGENTS.md).
- [ ] 🟢 **Payment provider** choice (Paynow / EcoCash) for F18 — collaborators + stakeholders call it; build provider-agnostic until then.

## 5 · Non-technical staff / testers

- [ ] 🟠 Identify **who tests** each release and how they report bugs (a WhatsApp thread or a simple shared sheet).
- [ ] 🟠 Recruit a small **pilot cohort** of friendly testers for the first live v1.
- [ ] 🟢 Testers: what to exercise is in [FEATURE_SPECS.md](./FEATURE_SPECS.md) — anything marked ✅/🚧. Focus areas: directory search, profile gating for minors, offline reads on a real phone.

## 6 · Validation / user research (gates building past v1)

- [ ] 🔴 Run **one lightweight research round**: ~5 students + ~5 alumni — confirm the **mentorship hook** is real and they'd use it. *(§2A.10)*
- [ ] 🟠 Confirm the one-line hook resonates with both audiences; sanity-check the community **asked for this** (not built inside-out).

## 7 · Legal / compliance — open questions 🛡

> "Anchored to MakoZim's child-protection policy" governs *conduct*; it does **not** settle these. Confirm with someone who knows Zimbabwean law.

- [ ] 🔴 **Data-protection** — apply Zimbabwe's **Cyber & Data Protection Act** to minors' data: lawful basis, retention, breach-notification duty, who can legally compel disclosure; data **hosting jurisdiction**.
- [ ] 🔴 **Donation/payment regulatory check** — is in-app donation handling lawful for the receiving entity under ZW nonprofit + payment regulation, including cross-border donor flows?
- [ ] 🟠 **Tax & receipting** rules (what the receipt says, who issues it). Confirm the **processor's name is on the receipt**, not "MaKonnect."
- [ ] 🟠 **Liability & insurance** for an app holding minors' data + a public repo.
- [ ] 🟢 **Terms of Service + Privacy Policy** (plain-language, consistent with MakoZim's guidelines).
- [ ] 🟠 **Refund / dispute policy** + the money-reconciliation process (who, how often, against what ledger); define **campaign miss-target behaviour** up front (applied / rolled over / refunded).

## 8 · Sustainability & continuity

- [ ] 🔴 Decide **who pays and renews** domain + Supabase + Vercel when free tiers cap — org-owned accounts. *(§7/§8)*
- [ ] 🟠 Write the **"if David is unavailable" handover note** (bus-factor): accounts, credential location, deploy steps.
- [ ] 🟠 Confirm **hosting reach into Zimbabwe** (latency/CDN) is acceptable; agree a **backup & retention** routine and owner.
- [ ] 🟢 Plan a **wind-down / data-disposal** procedure if the project ever stops — orphaned child-data is a liability.
- [ ] 🟢 Measure **realistic MakoZim staff capacity** in hours/week — everything assumes bandwidth nobody has counted.

---

## Risk & concern register (watch-list)

| # | Risk | Why it matters | Mitigation |
|---|---|---|---|
| R1 | **Builder drift** — keen commit, then abandonment | A half-built app touching minors' data + money in a public repo is *worse than nothing* | Named first builder (§0); Build Fellowship pipeline (§7) |
| R2 | **Scaffolding paralysis** | Polishing infra, never shipping | Ship a live URL first ([D1](./DEV_TASKBOARD.md)) |
| R3 | **Donation accountability gap** | A disputed gift with no one able to say where money is = scandal | §7 preconditions; named reconciler |
| R4 | **Legal/compliance unresolved** | Could make donations or data handling unlawful | §1, §7 above |
| R5 | **Low adoption** — "another login" | Empty network dies | Mentorship framing; user research (§6) |
| R6 | **Key-person risk on David** | Single point of failure early | Handover note + org-owned accounts (§8) |
| R7 | **Cold-start** — empty directory/hub | Looks abandoned in month one | Pre-seed data + 15–30 guides ([D4](./DEV_TASKBOARD.md)) |
| R8 | **Free-tier lapse / cost surprise** | Service dies or bill lands on a person | §8 cost ownership |
| R9 | **Trust erosion** if donors can't trace money | Poverty-serving nonprofit lives on donor trust | Known processor on receipt + per-campaign transparency |
| R10 | **Volunteer code inconsistency** | Drift around auth/payments/minors' data | Review-as-control + just-in-time governance ([D3](./DEV_TASKBOARD.md)) |

## Suggested near-term order
1. Lock the **top blockers** — sign-offs, legal entity, DSL, reconciler, first builder.
2. Start the **data conversation** with MakoZim (source of truth, schema, deployment-phase release).
3. Run the **user-research** round (§6).
4. Resolve **legal/compliance** (§7) in parallel — it gates donations, which are last anyway.
5. Gather **brand assets** (§2).
6. Everything else proceeds alongside the build.
