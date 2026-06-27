import { expect, test } from "@playwright/test";

test.describe("navigation & landing", () => {
  test("home renders the hero and primary CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /someone who got where/i }),
    ).toBeVisible();
    // Both CTAs present in the hero.
    const main = page.getByRole("main");
    await expect(
      main.getByRole("link", { name: /Find an alum/ }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /Browse resources/ }),
    ).toBeVisible();
  });

  test("hero 'Find an alum' navigates to the directory", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("main")
      .getByRole("link", { name: /Find an alum/ })
      .click();
    await expect(page).toHaveURL(/\/directory$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Find your person/i }),
    ).toBeVisible();
  });

  test("header nav reflects the active section", async ({ page }) => {
    const header = page.getByRole("banner");

    await page.goto("/directory");
    await expect(
      header.getByRole("link", { name: "Directory" }),
    ).toHaveAttribute("aria-current", "page");

    await header.getByRole("link", { name: "Resources" }).click();
    await expect(page).toHaveURL(/\/resources$/);
    await expect(
      header.getByRole("link", { name: "Resources" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
