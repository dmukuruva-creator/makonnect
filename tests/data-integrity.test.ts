import { describe, expect, it } from "vitest";
import {
  getAllMemberIds,
  getAllResourceSlugs,
  getDirectoryMembers,
  getMember,
  getResource,
  getResources,
} from "@/lib/data";
import { SEED_MEMBERS } from "@/data/seed/members";
import { RESOURCE_CATEGORIES } from "@/lib/types";

describe("data integrity: members", () => {
  it("has unique ids (ids are used as static route params)", () => {
    const ids = getAllMemberIds();
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every member has the fields the UI renders", () => {
    for (const m of SEED_MEMBERS) {
      expect(m.name.trim()).not.toBe("");
      expect(m.headline.trim()).not.toBe("");
      expect(m.cohort.trim()).not.toBe("");
      expect(m.location.trim()).not.toBe("");
      expect(Array.isArray(m.fields) && m.fields.length).toBeTruthy();
      expect(Array.isArray(m.journey) && m.journey.length).toBeTruthy();
    }
  });

  it("getMember resolves every id and returns undefined for unknown ids", () => {
    for (const id of getAllMemberIds()) {
      expect(getMember(id)?.id).toBe(id);
    }
    expect(getMember("does-not-exist")).toBeUndefined();
  });

  it("the directory is a strict subset of all members", () => {
    const all = new Set(getAllMemberIds());
    for (const m of getDirectoryMembers()) {
      expect(all.has(m.id)).toBe(true);
    }
  });
});

describe("data integrity: resources", () => {
  const resources = getResources();

  it("has unique slugs", () => {
    const slugs = getAllResourceSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every resource uses a known category and has a body", () => {
    for (const r of resources) {
      expect(RESOURCE_CATEGORIES).toContain(r.category);
      expect(r.body.length).toBeGreaterThan(0);
      expect(r.readMinutes).toBeGreaterThan(0);
    }
  });

  it("getResource resolves every slug and returns undefined for unknown slugs", () => {
    for (const slug of getAllResourceSlugs()) {
      expect(getResource(slug)?.slug).toBe(slug);
    }
    expect(getResource("nope")).toBeUndefined();
  });
});
