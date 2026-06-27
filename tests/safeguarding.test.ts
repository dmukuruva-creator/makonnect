import { describe, expect, it } from "vitest";
import { getDirectoryMembers, getMember } from "@/lib/data";
import { SEED_MEMBERS } from "@/data/seed/members";

/**
 * SAFEGUARDING INVARIANTS — the existential constraint for MaKonnect.
 *
 * The platform connects adults (alumni/staff/donors) with a user base that
 * includes gifted underprivileged MINORS. These tests lock in the rules from
 * PROJECT_DESCRIPTION.md §2B / §7 so a future change can never silently leak a
 * student into a public surface. If one of these fails, STOP — it is not a
 * cosmetic regression.
 */
describe("safeguarding: the public directory never exposes minors", () => {
  const directory = getDirectoryMembers();

  it("returns at least one member (sanity)", () => {
    expect(directory.length).toBeGreaterThan(0);
  });

  it("contains no minors", () => {
    expect(directory.every((m) => m.isMinor === false)).toBe(true);
  });

  it("contains only directory-visible members (never family-only)", () => {
    expect(directory.every((m) => m.visibility === "directory")).toBe(true);
  });

  it("excludes every seed member who is a minor", () => {
    const minorIds = SEED_MEMBERS.filter((m) => m.isMinor).map((m) => m.id);
    const directoryIds = new Set(directory.map((m) => m.id));
    for (const id of minorIds) {
      expect(directoryIds.has(id)).toBe(false);
    }
  });

  it("excludes every family-only seed member", () => {
    const familyOnlyIds = SEED_MEMBERS.filter(
      (m) => m.visibility === "family-only",
    ).map((m) => m.id);
    const directoryIds = new Set(directory.map((m) => m.id));
    for (const id of familyOnlyIds) {
      expect(directoryIds.has(id)).toBe(false);
    }
  });

  it("never lists a member with the student role", () => {
    expect(directory.some((m) => m.role === "student")).toBe(false);
  });
});

describe("safeguarding: students exist but are gated, not orphaned", () => {
  const students = SEED_MEMBERS.filter(
    (m) => m.isMinor || m.visibility === "family-only",
  );

  it("the seed set actually exercises the minor / family-only paths", () => {
    expect(students.length).toBeGreaterThan(0);
  });

  it("every minor is family-only (a minor is never directory-visible)", () => {
    for (const m of SEED_MEMBERS.filter((s) => s.isMinor)) {
      expect(m.visibility).toBe("family-only");
    }
  });

  it("a student profile is still individually fetchable (so it is not orphaned)", () => {
    for (const s of students) {
      expect(getMember(s.id)).toBeDefined();
    }
  });
});

describe("safeguarding: economic-vulnerability / aid fields never enter the public model", () => {
  // Such data is STAFF-ONLY and must live behind row-level security, never in
  // a surface a member or donor can read (lib/types.ts header comment).
  const FORBIDDEN = /aid|vulnerab|econom|income|stipend|sponsor|need|poverty/i;

  it("no seed member object carries a staff-only-looking field", () => {
    for (const m of SEED_MEMBERS) {
      for (const key of Object.keys(m)) {
        expect(
          FORBIDDEN.test(key),
          `member ${m.id} exposes field "${key}"`,
        ).toBe(false);
      }
    }
  });
});
