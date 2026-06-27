# MaKonnect — Non-Coding Task List

The human, organisational, legal, and governance work that underpins MaKonnect. **None of this is code** — but most of it *gates* code, and the project's real vulnerabilities live here, not in the codebase. Companion to `PROJECT_DESCRIPTION.md` (section refs below point into it).

**Legend** — Priority: 🔴 launch-blocking · 🟠 important, before relevant feature · 🟢 ongoing/nice-to-have. Status: `[ ]` todo · `[~]` in progress · `[x]` done · `[?]` needs a decision-maker.

---

## 0. Top blockers (nothing real ships until these clear)

- [ ] 🔴 **Confirm David as the named, accountable first builder** with committed weekly hours. *(§2A.6 — the single biggest risk is "no one writes line one.")*
- [?] 🔴 **Identify the registered legal entity that will receive donations.** Which org, registration number, tax status. *Gates the entire donation engine (§3.12).* — Owner: MakoZim leadership.
- [?] 🔴 **Get explicit leadership/board sign-off** for: a public repo, an app holding minors' data, and the donation feature. — Owner: MakoZim leadership + Alumni Mentor Committee.
- [ ] 🔴 **Appoint the Designated Safeguarding Lead (DSL)** — a real, named person with an escalation path, decided at repo setup. *(§2B)*
- [ ] 🔴 **Name the money reconciler** accountable for donor funds (must exist before any campaign). *(§3.12, §7)*

---

## 1. People, roles & accountability

- [ ] 🔴 Confirm membership of the **co-management approval bodies**: which MakoZim staff + which Alumni Mentor Committee members approve registrations/logins. *(§1A)*
- [ ] 🔴 Define the **dual-approval rules** in writing: who can approve an alumni claim (either body) vs. what requires staff sign-off (anything involving a minor). *(§1A, §3.1)*
- [ ] 🟠 Name the **restricted production / real-data access tier** — the small set of individuals allowed to touch prod, secrets, and real imports. *(§7)*
- [ ] 🟠 Assign a **content/seeding owner** responsible for the Resources Hub launch content and ongoing curation. *(§3.5, §5)*
- [ ] 🟠 Assign a **moderation owner** with a realistic response SLA for reports/blocks. *(§2B, §3.11)*
- [ ] 🟠 Write a **"if David is unavailable" handover note** (bus-factor mitigation) — accounts, credentials location, deploy steps. *(§7)*
- [ ] 🟢 Decide who **arbitrates technical disagreements** among volunteer contributors (a lead maintainer / steering call).
- [ ] 🟢 Measure **realistic MakoZim staff capacity in hours/week** — everything assumes bandwidth nobody has counted yet. *(§8)*

---

## 2. Legal, regulatory & compliance (separate from safeguarding conduct)

> "Anchored to MakoZim's child-protection policy" governs *behaviour*. It does **not** settle the items below — these are open and load-bearing. *(§7, §8)*

- [?] 🔴 **Data-protection compliance** — apply Zimbabwe's **Cyber and Data Protection Act** to minors' data: lawful basis, retention periods, breach-notification duty, and who can legally compel disclosure. Confirm with someone who knows ZW law.
- [?] 🔴 **Donation/payment regulatory check** — is in-app donation handling lawful for the receiving entity under ZW nonprofit + payment regulations? Cross-border donor flows (diaspora) too.
- [ ] 🟠 **Tax & receipting** rules for donations (what receipt must say, who issues it, donor tax treatment).
- [ ] 🟠 **Liability & insurance** for an app holding minors' data + a public repo — confirm the org's exposure and whether cover is needed.
- [ ] 🟠 **Define data jurisdiction** — where servers/data physically live and under whose law (decided with the stack/hosting choice).
- [ ] 🟢 **Terms of Service + Privacy Policy** drafted for the app (plain-language, consistent with MakoZim's guidelines).
- [ ] 🟢 Decide repo **open-source licence** (e.g. MIT/AGPL) — interacts with the "fork-me template" ambition. *(§7)*

---

## 3. Safeguarding & child protection (operational checklist)

> Implement MakoZim's **existing** policy/forms — do not author new policy. *(§2B)*

- [ ] 🔴 Obtain MakoZim's **written child-protection policy** and map each app behaviour to it.
- [ ] 🔴 Obtain MakoZim's **consent forms & data-handling guidelines**; confirm how guardian consent for under-18s is captured and recorded.
- [ ] 🔴 Confirm the **contact-rule model** is acceptable to MakoZim: no donor→student messaging; no unsupervised adult→minor DMs; alumni↔student only via staff-auditable mentorship channels.
- [ ] 🟠 Agree the **audit-log review cadence** — who (DSL) reviews who-viewed/messaged-which-minor, and how often.
- [ ] 🟠 Agree the **report/block escalation path** and response SLA.
- [ ] 🟠 Define the **profile lifecycle** policy: what happens to a student's data/profile when they age out or leave (archive/anonymise, not orphan).
- [ ] 🟠 Confirm **economic-vulnerability/aid fields are staff-only** and never exposed in the directory or to donors — sign-off from MakoZim.
- [ ] 🟢 Write a short **safeguarding-aware code-review checklist** for contributors (the human policy behind the technical control).

---

## 4. Donations & financial trust (before any campaign goes live)

> The highest-risk, lowest-trust feature. Sequenced last on purpose. *(§3.12, §2A.9)*

- [?] 🔴 Confirm the **legal recipient entity** (see §0) — without it, nothing here proceeds.
- [ ] 🔴 Choose the **first real payment rail** concretely (Paynow / EcoCash) — don't hide behind "provider-agnostic." Provider *choice* is the stakeholders' call. *(§3.12)*
- [ ] 🔴 Ensure the **processor's name is on the receipt**, not "MaKonnect" (keeps card/PII out of our system and earns donor trust).
- [ ] 🔴 Write the **refund / dispute policy** and the **money-reconciliation process** (who reconciles, how often, against what ledger).
- [ ] 🟠 Define **campaign miss-target behaviour** up front: are funds still applied to the cause / rolled over / refunded? Put it in campaign copy.
- [ ] 🟠 Decide how the **human relationship** in giving is preserved (the vouch, follow-up, thank-you) so automation doesn't make it efficient-but-ignored. *(First-Principles note, §3.12)*
- [ ] 🟢 Document the **current WhatsApp giving pipeline** before replacing it — what exactly is inefficient, so the new flow actually fixes it (and isn't just different).

---

## 5. Data sourcing, seeding & verification

- [?] 🔴 **Request the alumni/student database** from MakoZim staff (the source of truth) — agree it's released **only at the deployment phase**, not in dev. *(§3.1, §5)*
- [ ] 🟠 Agree the **export format, fields, and secure handover method** for that data. *(§8)*
- [ ] 🟠 Define the **"person" data contract / schema** with MakoZim: which fields exist, who is authoritative for each, how an alum's claim reconciles with the record. *(First-Principles: the real first artifact)*
- [ ] 🟠 Prepare **synthetic seed data** (≈30 fake alumni) for all dev/staging — real minors' data never touches dev. *(§5)*
- [ ] 🟠 Commission/curate the **15–30 launch Resources Hub guides** (anti-cold-start) — interview alumni; capture stories before they go cold. *(§3.5, §4.1)*
- [ ] 🟢 Plan the **claim-code distribution** — how members receive their one-time claim link/code at launch.

---

## 6. Validation & user research (before expanding past v1)

- [ ] 🔴 Run **one lightweight research round**: ~5 students + ~5 alumni — confirm the **mentorship hook** is real and they'd actually use it. *(§2A.10, §5 Phase −1)*
- [ ] 🟠 Validate the **one-line reason to open it** ("hear from/reach someone who got where you're trying to go") resonates with both audiences.
- [ ] 🟠 Sanity-check that the community **asked for this** — not building inside-out. Capture what they'd actually want first.
- [ ] 🟢 Recruit a small **pilot cohort** for the first live v1 (friendly testers who'll forgive rough edges and give feedback).

---

## 7. Brand & content assets

- [ ] 🟠 Obtain official **logo files** (white + colour) from MakoZim. *(palette already locked — §2)*
- [ ] 🟠 Confirm **typography / fonts** (none recoverable from the website markup yet). *(§2, §8)*
- [ ] 🟢 Confirm the **name & wordmark** ("MaKonnect") is approved by MakoZim and not in conflict with existing branding.
- [ ] 🟢 Gather **photography / imagery** rights for any student/alumni images used (consent overlaps with §3).

---

## 8. Sustainability & operations (the "year three" problem)

- [?] 🔴 Decide **who pays and renews** the domain, Supabase, and Vercel when free tiers cap/lapse — and confirm **org-owned accounts**, not David's personal logins. *(§7, §8)*
- [ ] 🟠 Define a **long-term maintenance & hosting funding** line (before launch, not after).
- [ ] 🟠 Confirm **hosting reach into Zimbabwe** is acceptable (latency/CDN) under the chosen stack.
- [ ] 🟢 Agree a **data backup & retention** routine and who owns it.
- [ ] 🟢 Plan a **wind-down / data-disposal procedure** if the project ever stops — orphaned child-data is a liability, not a dormant repo.

---

## 9. Contributor governance (non-code parts of the open-source model)

- [ ] 🟠 Draft `CONTRIBUTING.md`, `SECURITY.md`, `CODEOWNERS` content (the *policy*, added just-in-time before the first external PR — not day one). *(§2A.7, §7)*
- [ ] 🟠 Define the **contributor vetting process** — who may open PRs vs. who may merge/deploy/touch real data.
- [ ] 🟠 Set the rule: **secrets / keys / real data never in the repo** (org secret store; pre-commit secret scanning as policy).
- [ ] 🟢 Decide whether to brand the build as a **"MaKonnect Build Fellowship"** (CS apprenticeship for students) — and who would run it. *(§7 upside)*
- [ ] 🟢 Decide whether to position the README as a **fork-me template** for other Global-South nonprofits from day one. *(§7 upside)*

---

## 10. Risk & concern register (watch-list — not all actionable yet)

| # | Risk / concern | Why it matters | Mitigation lives in |
|---|---|---|---|
| R1 | **Builder drift** — enthusiastic commit, then abandonment | A half-built app touching minors' data + money in a public repo is *worse than nothing* | Named first builder (§0, §2A.6); Fellowship pipeline (§7) |
| R2 | **Scaffolding paralysis** | Polishing infra, never shipping; collaborators lose interest | Ship a live URL first (§5 Phase −2) |
| R3 | **Donation accountability gap** | A missed target or disputed gift with no one able to say where money is = scandal | §4 preconditions; named reconciler |
| R4 | **Legal entity / compliance unresolved** | Could make donations or data handling unlawful | §0, §2 |
| R5 | **Low adoption** — "another login" | Busy alumni won't return; empty network dies | Mentorship framing (§6); user research |
| R6 | **Key-person risk on David** | Single point of failure early on | Handover note + org-owned accounts (§1, §8) |
| R7 | **Cold-start** — empty directory/hub | Looks abandoned in month one | Pre-seed data + 15–30 guides (§5) |
| R8 | **Free-tier lapse / cost surprise** | Service dies or bill lands on a person | §8 cost ownership |
| R9 | **Trust erosion** if donors can't trace money | Poverty-serving nonprofit lives on donor trust | Known processor on receipt + per-campaign transparency (§4) |
| R10 | **Volunteer code inconsistency** | Many hands → drift, fragility around auth/payments/minors' data | Review-as-control + just-in-time governance (§9) |

---

## 11. Suggested near-term order (non-code)

1. Lock **§0 blockers** — first builder, legal entity, leadership sign-off, DSL, reconciler.
2. Start **§5 data conversation** with MakoZim (source of truth, schema, deployment-phase release).
3. Run **§6 user research** to confirm the mentorship hook.
4. Resolve **§2 legal/regulatory** questions in parallel (they gate donations, which are last anyway).
5. Gather **§7 brand assets**.
6. Everything else proceeds alongside the build.

> Keep this list alive — re-run a pressure-test when major assumptions change, and move items between "blocking," "in progress," and "done."
