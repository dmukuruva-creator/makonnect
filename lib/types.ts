// Domain types for MaKonnect v1.
//
// SAFEGUARDING NOTE: economic-vulnerability / aid status is intentionally
// absent from these public-facing types. Such fields are STAFF-ONLY and live
// behind Supabase Row-Level Security at the deployment phase — they must never
// be modelled into a surface that a member or donor can read. See
// PROJECT_DESCRIPTION.md §2B / §7 and the safeguarding memory.

export type MemberRole = "alumni" | "student" | "staff";

export type Visibility = "family-only" | "directory";

/**
 * Adult↔adult connection intents — what a member is "open to" in the peer
 * network (§3.2). Drives the directory "open to" filter and profile Connect
 * affordance. SAFEGUARDING: only ever set on adults; minors carry no intents
 * and never expose a Connect control.
 */
export type ConnectionIntent =
  | "Mentoring"
  | "Hiring"
  | "Collaborating"
  | "Investing"
  | "Reconnecting";

export interface JourneyMilestone {
  year: string;
  title: string;
  detail: string;
}

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  /** True for under-18s. Drives age-gating, consent and visibility defaults. */
  isMinor: boolean;
  /** Profiles default to family-only; a minor is never directory-visible in v1. */
  visibility: Visibility;
  headline: string;
  cohort: string; // Makomborero intake year
  location: string;
  fields: string[]; // study / work areas, used for search + filtering
  // Mentorship is the point: alumni offer it, students seek it.
  offersMentorship: boolean;
  seekingMentorship: boolean;
  /**
   * Peer-network connection intents (adults only). Optional: students/minors
   * leave this unset — they never expose a Connect affordance (§2B).
   */
  openTo?: ConnectionIntent[];
  bio: string;
  journey: JourneyMilestone[];
}

export interface Resource {
  slug: string;
  title: string;
  category: ResourceCategory;
  summary: string;
  author: string; // alumni contributor (synthetic)
  readMinutes: number;
  body: string[]; // paragraphs — static, offline-readable
}

export type ResourceCategory =
  | "College Apps"
  | "Finances"
  | "Networking"
  | "Relationships";

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  "College Apps",
  "Finances",
  "Networking",
  "Relationships",
];

// ---------------------------------------------------------------------------
// Campaigns — alumni-directed giving (§3.12).
//
// DEMO SCOPE: this models a *link-out* campaign UI only. No money moves inside
// MaKonnect — `processorUrl` sends the donor to a named processor (Paynow /
// EcoCash) whose name is on the receipt. Real capture/reconciliation is gated
// (legal entity, reconciler, regulatory check) and not modelled here.
//
// SAFEGUARDING: a beneficiary is ALWAYS an aggregate cohort, never a named
// minor (§2B). The safeguarding tests assert no campaign references a seed minor.
// ---------------------------------------------------------------------------

export type CampaignStatus = "active" | "funded" | "upcoming";

/** The named payment processors a campaign can link out to. Never "MaKonnect". */
export type PaymentProcessor = "Paynow" | "EcoCash";

export interface Campaign {
  slug: string;
  title: string;
  summary: string;
  /** The organising alum (synthetic) — giving is alumni-directed. */
  organiser: string;
  /** AGGREGATE beneficiary group (e.g. "the 2026 A-Level cohort") — never a named minor. */
  beneficiaryCohort: string;
  goalUsd: number;
  raisedUsd: number;
  contributors: number;
  /** ISO date (YYYY-MM-DD). */
  deadline: string;
  status: CampaignStatus;
  processor: PaymentProcessor;
  /** External link-out for money movement — opens the processor, not an in-app form. */
  processorUrl: string;
  /** What happens if the target is missed — stated up front (§3.12). */
  missTargetNote: string;
  body: string[];
}
