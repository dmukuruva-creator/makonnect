import { expect, test } from "@playwright/test";

// Runs only under the "mobile" project (Pixel 7) — see playwright.config.ts.
test.describe("mobile navigation", () => {
  test("the hamburger menu opens and navigates", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", {
      name: /Toggle navigation menu/i,
    });
    await expect(toggle).toBeVisible();

    // The pill nav is hidden on mobile until the menu is opened.
    await toggle.click();

    const menuResources = page
      .getByRole("banner")
      .getByRole("link", { name: "Resources" })
      .filter({ visible: true });
    await expect(menuResources).toBeVisible();
    await menuResources.click();

    await expect(page).toHaveURL(/\/resources$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Resources Hub/i }),
    ).toBeVisible();
  });
});
