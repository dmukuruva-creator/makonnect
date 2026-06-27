# MaKonnect — Communications & Progress-Reporting Plan

> **Purpose:** a proposal for how progress and development are communicated
> between **MakoZim staff** and **collaborators (alumni developers)**, and how we
> stand up an **official channel** for progress reports and coordination.
> Bring this to the project lead / MakoZim leadership for sign-off, then we
> action the checklist at the bottom.
>
> Status: **proposed — awaiting sign-off.** Companion to
> [HANDOFF.md](./HANDOFF.md), [PROJECT_DESCRIPTION.md](./PROJECT_DESCRIPTION.md),
> [TASK_LIST.md](./TASK_LIST.md).

---

## The core principle

**Don't make one tool do two jobs.** We have two audiences with opposite needs,
and the common failure is forcing both into a single app (and the inverse
failure — what MaKonnect itself is replacing — is letting everything live in
scattered WhatsApp messages with no durable record).

| Audience | What they need | Where they live |
|---|---|---|
| **MakoZim staff / board / legal** | A durable, readable, structured record — progress reports, decisions, sign-offs. Non-technical. | A wiki/doc tool, **not** GitHub |
| **Collaborators (alumni devs)** | Fast, async coordination; code-level detail. Distributed across diaspora timezones. | GitHub |

So the answer is a **small layered stack with one source of truth**, not
"Slack vs Notion."

---

## Recommended setup — three layers

### Layer 1 — System of record = **Notion** (this is the official channel)
A single **org-owned** Notion workspace is the front door for non-technical
staff. Suggested structure:

- 📊 **Progress Reports** — one short written update on a fixed cadence
  (**fortnightly** recommended), same template every time
  (see [`templates/progress-report.md`](./templates/progress-report.md)).
- 🗺️ **Roadmap / status board** — done · in progress · blocked, mirroring the
  phases in `PROJECT_DESCRIPTION.md`.
- ✅ **Decisions log** — so choices survive people moving on (mitigates
  key-person risk on the lead builder).
- 🛡️ **Safeguarding & risk register** — DSL sign-offs and the `TASK_LIST.md`
  items, in a **private** space.
- 👋 **Onboarding page** — links to HANDOFF.md, the repo, and contribution rules.

**Why Notion over Slack for the *record*:** Slack's free tier deletes messages
after ~90 days — unacceptable for a nonprofit that needs an audit trail and
board-readable history. Notion is free, generous for nonprofits, readable by
non-technical staff, and async-first (which suits poor connectivity and
diaspora timezones).

### Layer 2 — Technical truth = **GitHub** (already in place)
Issues + Projects + Pull Requests. The commit history *is* a progress record —
which doubles as the **"Build Fellowship"** teaching asset. **Staff never need
to touch GitHub**; technical activity is summarised *up* into the fortnightly
Notion report.

### Layer 3 — Chat / human layer = **one channel** *(open decision — see below)*
A fast, informal channel for day-to-day questions and announcements:
- A `#dev` channel that auto-receives GitHub PR/commit notifications, and
- A separate `#announcements` channel for staff.

The discipline is simple: **chat announces, Notion records.** Nothing important
ever lives *only* in chat.

---

## Guardrails (these matter more than the tool choice)

1. **Org-owned accounts, never personal** — GitHub org, Notion, and whichever
   chat tool. Survives any one contributor (incl. the lead builder) leaving.
   *(Note: the repo currently sits on a personal GitHub account for the demo and
   should be transferred to a Makomborero org — same rule.)*
2. **No minors' data or PII in any of these tools.** Notion / Slack / WhatsApp
   are now additional surfaces the safeguarding rule covers. Progress reports
   discuss *features and synthetic data* — never real student information.
3. **Two access tiers**, mirroring the repo:
   - a **private** staff / co-management space (safeguarding, governance,
     anything sensitive), and
   - an **open** collaborator space.

---

## The one open decision: the chat tool

The right Layer-3 tool depends on **what MakoZim staff already use daily**:

| If staff… | Use | Why |
|---|---|---|
| are comfortable with workplace apps | **Slack** (free; nonprofit discounts available) | Clean GitHub integration; channel separation; familiar |
| realistically only use **WhatsApp** (common in Zimbabwe — lowest bandwidth, highest adoption) | a **WhatsApp group** for announcements | Don't fight existing behaviour; just keep the record in Notion |

**Recommendation:** default to **Slack** for collaborators + a WhatsApp
announcements group for staff *if* that's where staff already are. Either way,
**Notion is the record and chat is disposable.**

> 👉 **Decision needed from the lead / MakoZim:** confirm the chat tool, based on
> staff's actual habits.

---

## Cadence & ownership

- **Fortnightly progress report**, written by the **accountable lead** (David),
  by summarising GitHub activity into the Notion template. ~20 minutes; gives
  staff a single, predictable, readable pulse without touching developer tools.
- **Real-time questions** in the chat layer; **decisions** captured in the Notion
  decisions log the same day they're made.

---

## What to action once approved (checklist)

- [ ] **Confirm the chat tool** (Slack vs WhatsApp) — the one open decision above.
- [ ] Create the **org-owned Notion workspace** with the five sections in Layer 1.
- [ ] Set up the **private vs open** access tiers in Notion.
- [ ] Stand up the **chat channels** (`#dev` + `#announcements`) and invite the
      co-management group.
- [ ] Connect **GitHub → chat** notifications for `#dev`.
- [ ] Post the **first fortnightly progress report** from the template.
- [ ] Add the Notion + chat links to the **onboarding page** and `HANDOFF.md`.
- [ ] (Governance) Transfer the **repo and all accounts to a Makomborero org.**

---

*Boring tooling, careful with kids and money, durable by default — the same
principles as the product.*
