import { expect, test } from "@playwright/test";

test.describe("directory search & filtering", () => {
  test("searching narrows results and an alum profile opens", async ({
    page,
  }) => {
    await page.goto("/directory");

    const search = page.getByRole("searchbox", { name: /Search the directory/i });
    await search.fill("Tafadzwa");

    const card = page
      .getByRole("main")
      .getByRole("link", { name: /Tafadzwa Moyo/ });
    await expect(card).toBeVisible();
    await card.click();

    await expect(page).toHaveURL(/\/profile\/a-tafadzwa-moyo$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Tafadzwa Moyo" }),
    ).toBeVisible();
  });

  test("the mentorship filter and clear-filters control work", async ({
    page,
  }) => {
    await page.goto("/directory");
    const main = page.getByRole("main");

    // Count is shown as "<n> people".
    await expect(page.getByText(/\bpeople\b/)).toBeVisible();

    // Mrs Dube (staff) does not offer mentorship; she is listed by default.
    await expect(main.getByRole("link", { name: /Mrs Dube/ })).toBeVisible();

    await page
      .getByRole("combobox", { name: /Filter by mentorship/i })
      .selectOption("offers");

    // Filtering to mentors drops her but keeps an alum who offers it.
    await expect(main.getByRole("link", { name: /Mrs Dube/ })).toHaveCount(0);
    await expect(
      main.getByRole("link", { name: /Tafadzwa Moyo/ }),
    ).toBeVisible();

    // A search with no matches shows the friendly empty state.
    await page
      .getByRole("searchbox", { name: /Search the directory/i })
      .fill("zzzzz-no-match");
    await expect(page.getByText(/No one matches that yet/i)).toBeVisible();

    // Clearing filters brings members back.
    await page.getByRole("button", { name: /Clear filters/i }).click();
    await expect(
      page.getByRole("main").getByRole("link", { name: /Tafadzwa Moyo/ }),
    ).toBeVisible();
  });
});
