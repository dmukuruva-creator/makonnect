import { SEED_CAMPAIGNS } from "@/data/seed/campaigns";
import { SEED_MEMBERS } from "@/data/seed/members";
import { SEED_RESOURCES } from "@/data/seed/resources";
import type { Campaign, Member, Resource } from "@/lib/types";

/**
 * v1 data access layer.
 *
 * In this slice everything reads from SYNTHETIC seed data so the artifact
 * builds and deploys with no database and no secrets. At the deployment phase
 * these functions are swapped to query Supabase (with Row-Level Security
 * enforcing the staff-only / family-only tiers) — call sites do not change.
 */

/** Members shown in the public directory. Minors are never directory-visible. */
export function getDirectoryMembers(): Member[] {
  return SEED_MEMBERS.filter(
    (m) => m.visibility === "directory" && !m.isMinor,
  );
}

export function getMember(id: string): Member | undefined {
  return SEED_MEMBERS.find((m) => m.id === id);
}

/** All member ids — used to pre-render profile pages at build time. */
export function getAllMemberIds(): string[] {
  return SEED_MEMBERS.map((m) => m.id);
}

export function getResources(): Resource[] {
  return SEED_RESOURCES;
}

export function getResource(slug: string): Resource | undefined {
  return SEED_RESOURCES.find((r) => r.slug === slug);
}

export function getAllResourceSlugs(): string[] {
  return SEED_RESOURCES.map((r) => r.slug);
}

/** Alumni-directed giving campaigns (§3.12). Demo: link-out only, no real money. */
export function getCampaigns(): Campaign[] {
  return SEED_CAMPAIGNS;
}

export function getCampaign(slug: string): Campaign | undefined {
  return SEED_CAMPAIGNS.find((c) => c.slug === slug);
}

export function getAllCampaignSlugs(): string[] {
  return SEED_CAMPAIGNS.map((c) => c.slug);
}
