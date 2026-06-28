import type { Campaign } from "@/lib/types";

/**
 * SYNTHETIC seed campaigns — the ONLY campaign data used in development.
 *
 * Every campaign below is fictional. SAFEGUARDING (§2B): beneficiaries are
 * ALWAYS aggregate cohorts, never a named minor — no real or invented child is
 * identified here. DEMO SCOPE (§3.12): the "Give" action links OUT to a named
 * processor (Paynow / EcoCash); no money moves inside MaKonnect, and no card or
 * PII ever enters our system. Real capture/reconciliation is gated and not built.
 */
export const SEED_CAMPAIGNS: Campaign[] = [
  {
    slug: "a-level-exam-fees-2026",
    title: "A-Level exam fees — 2026 cohort",
    summary:
      "Cover the November A-Level examination fees for this year's Lower-6 to Upper-6 scholars so no one is held back by a registration deadline.",
    organiser: "Rumbidzai Chikwava",
    beneficiaryCohort: "12 students in the 2026 A-Level cohort (aggregate)",
    goalUsd: 4000,
    raisedUsd: 2600,
    contributors: 38,
    deadline: "2026-08-15",
    status: "active",
    processor: "Paynow",
    processorUrl: "https://www.paynow.co.zw/",
    missTargetNote:
      "If the target isn't met by the deadline, everything raised is still applied to exam fees and the shortfall is escalated to the general bursary — funds are never left unspent or returned to a different cause.",
    body: [
      "Every November, exam registration closes weeks before fees are due — and a handful of our strongest students risk missing the window over a few dollars. This campaign clears that hurdle for the whole 2026 cohort at once.",
      "Funds are disbursed by MakoZim staff directly to the examination board against registered candidates. Donors give through Paynow; the receipt comes from Paynow, not MaKonnect.",
      "This is a demo campaign on synthetic data — the Give button opens the processor to show how alumni-directed giving will work; no real money moves here.",
    ],
  },
  {
    slug: "laptops-for-university-scholars",
    title: "Laptops for university-bound scholars",
    summary:
      "Refurbished laptops for scholars heading to university this year — the single biggest gap between a place offered and a place taken up.",
    organiser: "Tafadzwa Moyo",
    beneficiaryCohort: "8 university-bound scholars (aggregate, names withheld)",
    goalUsd: 6000,
    raisedUsd: 1500,
    contributors: 22,
    deadline: "2026-09-30",
    status: "active",
    processor: "EcoCash",
    processorUrl: "https://www.ecocash.co.zw/",
    missTargetNote:
      "Partial funding buys whole laptops for as many scholars as the amount covers; remaining scholars roll into the next campaign. No one receives a half-funded device.",
    body: [
      "A university place means little without a machine to study on. Each laptop is the difference between a scholar keeping up and falling behind in their first year.",
      "Devices are sourced and verified by alumni in-country, then handed over by staff. Giving runs through EcoCash — a rail almost every Zimbabwean donor already uses.",
      "Demo campaign on synthetic data: the Give button links out to the processor to illustrate the flow; no real money is captured.",
    ],
  },
  {
    slug: "winter-boarding-essentials",
    title: "Winter boarding essentials",
    summary:
      "Blankets, warm uniforms and toiletries for boarders through the cold season — fully funded, kept here to show a completed campaign.",
    organiser: "Chiedza Mutasa",
    beneficiaryCohort: "the full boarding cohort for one term (aggregate)",
    goalUsd: 2000,
    raisedUsd: 2000,
    contributors: 51,
    deadline: "2026-05-01",
    status: "funded",
    processor: "Paynow",
    processorUrl: "https://www.paynow.co.zw/",
    missTargetNote:
      "This campaign reached its target. Any further gifts roll forward to next winter's essentials.",
    body: [
      "Reached 100% with a month to spare — thank you. Showing it here so the demo includes a funded campaign alongside the active ones.",
      "Funds were applied to bulk winter supplies for the whole boarding cohort, purchased and distributed by staff with no individual student named.",
      "Demo campaign on synthetic data; no real money moved through MaKonnect.",
    ],
  },
];
