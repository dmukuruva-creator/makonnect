// Domain types for MaKonnect v1.
//
// SAFEGUARDING NOTE: economic-vulnerability / aid status is intentionally
// absent from these public-facing types. Such fields are STAFF-ONLY and live
// behind Supabase Row-Level Security at the deployment phase — they must never
// be modelled into a surface that a member or donor can read. See
// PROJECT_DESCRIPTION.md §2B / §7 and the safeguarding memory.

export type MemberRole = "alumni" | "student" | "staff";

export type Visibility = "family-only" | "directory";

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
