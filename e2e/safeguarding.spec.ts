import { expect, test } from "@playwright/test";

/**
 * END-TO-END SAFEGUARDING — the existential check, exercised through the real
 * rendered UI (the unit tests in tests/safeguarding.test.ts cover the data
 * layer; these cover what a browser actually shows).
 */
test.describe("safeguarding: minors are invisible in the public UI", () => {
  // Synthetic student records (minors, family-only) — they must never surface.
  const STUDENTS = [
    { id: "s-anesu-k", name: "Anesu K." },
    { id: "s-rutendo-m", name: "Rutendo M." },
  ];

  test("no student appears or is searchable in the directory", async ({
    page,
  }) => {
    await page.goto("/directory");

    for (const student of STUDENTS) {
      // Not present in the default listing.
      await expect(
        page.getByRole("link", { name: new RegExp(student.name) }),
      ).toHaveCount(0);

      // Searching their name yields the empty state, never a result.
      await page
        .getByRole("searchbox", { name: /Search the directory/i })
        .fill(student.name);
      await expect(page.getByText(/No one matches that yet/i)).toBeVisible();
    }
  });

  test("a student's profile is gated: family-only banner, no open messaging", async ({
    page,
  }) => {
    await page.goto("/profile/s-anesu-k");

    await expect(
      page.getByRole("heading", { level: 1, name: "Anesu K." }),
    ).toBeVisible();

    // The family-only safeguarding notice is shown.
    await expect(page.getByText(/Family-only profile/i)).toBeVisible();
    await expect(
      page.getByText(/Direct messaging is disabled for students/i),
    ).toBeVisible();

    // There is NO actionable contact/messaging control on a minor's profile.
    // (The data layer separately guarantees no aid/economic field exists in the
    // public model — see tests/safeguarding.test.ts.)
    await expect(
      page.getByRole("button", { name: /Request mentorship/i }),
    ).toHaveCount(0);
  });

  test("an alum profile keeps mentorship behind a not-yet-enabled control", async ({
    page,
  }) => {
    await page.goto("/profile/a-tafadzwa-moyo");
    const button = page.getByRole("button", { name: /Request mentorship/i });
    await expect(button).toBeVisible();
    // Disabled in the synthetic demo — routes through staff in the full app.
    await expect(button).toBeDisabled();
  });
});
