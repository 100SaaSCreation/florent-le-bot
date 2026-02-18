import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("page loads and has title or root content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/florent-le-bot|Next/);
  });
});
