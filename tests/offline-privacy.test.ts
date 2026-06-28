import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SEED_MEMBERS } from "@/data/seed/members";

/**
 * SAFEGUARDING: nothing personal may persist on a user's device.
 *
 * Loads the SAME offline cache policy the service worker uses (public/
 * offline-cache-policy.js) and asserts it never marks a person/profile/roster
 * path as cacheable. If this fails, a future change is about to let personal
 * data — including a MINOR's profile — be written to on-device Cache Storage.
 */
const src = readFileSync(
  resolve(__dirname, "../public/offline-cache-policy.js"),
  "utf8",
);
const scope: { OFFLINE_CACHEABLE?: (p: string) => boolean } = {};
new Function("self", src)(scope);
const cacheable = scope.OFFLINE_CACHEABLE!;

describe("offline privacy: only learning content + app chrome may persist", () => {
  it("caches learning content, the shell, and build assets", () => {
    expect(cacheable("/")).toBe(true);
    expect(cacheable("/resources")).toBe(true);
    expect(cacheable("/resources/starting-your-college-apps")).toBe(true);
    expect(cacheable("/manifest.webmanifest")).toBe(true);
    expect(cacheable("/_next/static/chunks/main.js")).toBe(true);
  });

  it("NEVER caches the directory roster or any member profile", () => {
    expect(cacheable("/directory")).toBe(false);
    for (const m of SEED_MEMBERS) {
      expect(cacheable(`/profile/${m.id}`), `/profile/${m.id}`).toBe(false);
    }
  });

  it("NEVER caches a MINOR's profile (the critical case)", () => {
    const minors = SEED_MEMBERS.filter((m) => m.isMinor);
    expect(minors.length).toBeGreaterThan(0);
    for (const m of minors) {
      expect(cacheable(`/profile/${m.id}`), m.id).toBe(false);
    }
  });

  it("does not cache operational/non-learning data (campaigns)", () => {
    expect(cacheable("/campaigns")).toBe(false);
    expect(cacheable("/campaigns/a-level-exam-fees-2026")).toBe(false);
  });
});
