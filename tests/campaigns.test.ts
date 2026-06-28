import { describe, expect, it } from "vitest";
import { getAllCampaignSlugs, getCampaign, getCampaigns } from "@/lib/data";

/**
 * Data-integrity checks for the demo giving campaigns (§3.12).
 *
 * DEMO INVARIANT: money never moves inside MaKonnect — every campaign links OUT
 * to a named processor. The safeguarding invariants (no campaign names a minor)
 * live in safeguarding.test.ts.
 */
describe("data integrity: campaigns", () => {
  const campaigns = getCampaigns();

  it("has at least one campaign (sanity)", () => {
    expect(campaigns.length).toBeGreaterThan(0);
  });

  it("has unique slugs (used as static route params)", () => {
    const slugs = campaigns.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every campaign has sane numbers", () => {
    for (const c of campaigns) {
      expect(c.goalUsd, c.slug).toBeGreaterThan(0);
      expect(c.raisedUsd, c.slug).toBeGreaterThanOrEqual(0);
      expect(c.contributors, c.slug).toBeGreaterThanOrEqual(0);
    }
  });

  it("a funded campaign has met its goal", () => {
    for (const c of campaigns.filter((x) => x.status === "funded")) {
      expect(c.raisedUsd, c.slug).toBeGreaterThanOrEqual(c.goalUsd);
    }
  });

  it("giving links OUT to a named processor (no in-app capture, never MaKonnect)", () => {
    for (const c of campaigns) {
      expect(c.processor.length, c.slug).toBeGreaterThan(0);
      expect(c.processorUrl, c.slug).toMatch(/^https:\/\//);
      expect(c.processorUrl.toLowerCase(), c.slug).not.toContain("makonnect");
    }
  });

  it("has a stated miss-target behaviour and a body", () => {
    for (const c of campaigns) {
      expect(c.missTargetNote.trim().length, c.slug).toBeGreaterThan(0);
      expect(c.body.length, c.slug).toBeGreaterThan(0);
    }
  });

  it("every status is valid", () => {
    const valid = new Set(["active", "funded", "upcoming"]);
    for (const c of campaigns) {
      expect(valid.has(c.status), c.slug).toBe(true);
    }
  });

  it("getCampaign resolves every slug and returns undefined for unknown slugs", () => {
    for (const slug of getAllCampaignSlugs()) {
      expect(getCampaign(slug)?.slug).toBe(slug);
    }
    expect(getCampaign("does-not-exist")).toBeUndefined();
  });
});
