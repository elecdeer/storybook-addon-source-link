import { expect, test } from "@playwright/test";

test.describe("Storybook Demo", () => {
	test("should load Storybook homepage", async ({ page }) => {
		// Storybookのメインページにアクセス
		await page.goto("/");

		// ページのタイトルがStorybookであることを確認
		await expect(page).toHaveTitle(/Storybook/);

		// サイドバー（ナビゲーション）が表示されていることを確認
		await expect(page.locator("nav")).toBeVisible();

		// ストーリーのiframeが表示されていることを確認
		await expect(page.locator("iframe#storybook-preview-iframe")).toBeVisible();

		// Storybookが正常に動作していることを確認
		console.log("✅ Storybook loaded successfully with dev server!");
	});
});
