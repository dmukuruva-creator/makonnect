import { expect, test } from "@playwright/test";

test.describe("alum↔alum connection (demo)", () => {
  test("the 'open to' filter narrows the directory", async ({ page }) => {
    await page.goto("/directory");
    const main = page.getByRole("main");

    // Tafadzwa is open to Hiring; Farai (teacher) is not.
    await page
      .getByRole("combobox", { name: /open to/i })
      .selectOption("Hiring");

    await expect(main.getByRole("link", { name: /Tafadzwa Moyo/ })).toBeVisible();
    await expect(main.getByRole("link", { name: /Farai Sibanda/ })).toHaveCount(
      0,
    );
  });

  test("an adult shows a Connect control; a minor shows neither Connect nor Give", async ({
    page,
  }) => {
    await page.goto("/profile/a-tafadzwa-moyo");
    await expect(page.getByRole("button", { name: /Connect/i })).toBeVisible();

    // A minor's profile keeps the family-only gate — no Connect, no Give.
    await page.goto("/profile/s-anesu-k");
    await expect(page.getByText(/Family-only profile/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Connect/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Give via/i })).toHaveCount(0);
  });
});
