import { expect, test } from "@playwright/test";

test.describe("campaigns: alumni-directed giving (demo, link-out)", () => {
  test("the campaigns list opens a campaign detail", async ({ page }) => {
    await page.goto("/campaigns");

    await expect(
      page.getByRole("heading", { level: 1, name: "Campaigns" }),
    ).toBeVisible();
    // The demo disclaimer must be present so no one mistakes it for live giving.
    await expect(page.getByText(/no real money moves here/i)).toBeVisible();

    const card = page
      .getByRole("main")
      .getByRole("link", { name: /A-Level exam fees/i });
    await expect(card).toBeVisible();
    await card.click();

    await expect(page).toHaveURL(/\/campaigns\/a-level-exam-fees-2026$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /A-Level exam fees/i }),
    ).toBeVisible();
  });

  test("the Give button is an external link-out to a named processor", async ({
    page,
  }) => {
    await page.goto("/campaigns/a-level-exam-fees-2026");

    const give = page.getByRole("link", { name: /Give via/i });
    await expect(give).toBeVisible();
    await expect(give).toHaveAttribute("target", "_blank");

    const href = await give.getAttribute("href");
    expect(href).toMatch(/^https:\/\//);
    expect(href?.toLowerCase()).not.toContain("makonnect");
  });
});
