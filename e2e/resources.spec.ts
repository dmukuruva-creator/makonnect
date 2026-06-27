import { expect, test } from "@playwright/test";

test.describe("resources hub", () => {
  test("a resource card opens its full article", async ({ page }) => {
    await page.goto("/resources");
    await expect(
      page.getByRole("heading", { level: 1, name: /Resources Hub/i }),
    ).toBeVisible();

    await page
      .getByRole("main")
      .getByRole("link", { name: /Starting your college applications early/i })
      .click();

    await expect(page).toHaveURL(/\/resources\/starting-your-college-apps$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Starting your college applications early/i,
      }),
    ).toBeVisible();
    // Back link returns to the hub.
    await page.getByRole("link", { name: /Back to resources/i }).click();
    await expect(page).toHaveURL(/\/resources$/);
  });
});
