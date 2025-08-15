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

	test("should display source-link addon tool", async ({ page }) => {
		await page.goto("/");

		// ページが完全に読み込まれるまで待つ
		await page.waitForLoadState("networkidle");

		// Buttonストーリーに移動
		await page.getByText("Button", { exact: true }).first().click();

		// URLが変更されるまで待つ
		await page.waitForURL(/.*button.*/i, { timeout: 10000 });

		// source-linkアドオンのツールボタンが表示されていることを確認
		const sourceLinkButton = page.locator('button[title="Open source file"]');
		await expect(sourceLinkButton).toBeVisible();

		// JumpToIconが表示されていることを確認
		await expect(sourceLinkButton.locator("svg")).toBeVisible();

		console.log("✅ Source-link addon tool is displayed in toolbar!");
	});

	test("should have correct link URLs in tooltip", async ({ page }) => {
		await page.goto("/");

		// ページが完全に読み込まれるまで待つ
		await page.waitForLoadState("networkidle");

		// Buttonストーリーに移動
		await page.getByText("Button", { exact: true }).first().click();

		// URLが変更されるまで待つ
		await page.waitForURL(/.*button.*/i, { timeout: 10000 });

		// source-linkアドオンのツールボタンをクリック
		const sourceLinkButton = page.locator('button[title="Open source file"]');
		await expect(sourceLinkButton).toBeVisible();
		await sourceLinkButton.click();

		// ツールチップ内のリンクを取得
		const tooltip = page.locator('[data-testid="tooltip"]');
		await expect(tooltip).toBeAttached({ timeout: 10000 });

		// ツールチップ内のリンクを全て取得
		const links = tooltip.locator("a[href], button[data-href]");
		const linkCount = await links.count();

		// 少なくとも1つのリンクが存在することを確認
		expect(linkCount).toBeGreaterThan(0);

		// 期待されるリンクのパターンを定義（環境に依存しない形で）
		const expectedLinkPatterns = [
			{
				title: "./stories/Button.stories.ts",
				hrefPattern:
					/^vscode:\/\/file:\/\/.*\/packages\/demo\/stories\/Button\.stories\.ts$/,
			},
			{
				title: "./stories/Button.tsx",
				hrefPattern:
					/^vscode:\/\/file:\/\/.*\/packages\/demo\/stories\/Button\.tsx$/,
			},
			{
				title: "Powered by addon-source-link",
				hrefPattern:
					/^https:\/\/github\.com\/elecdeer\/storybook-addon-source-link$/,
			},
		];

		// 各リンクのURLをパターンマッチで検証
		for (let i = 0; i < linkCount; i++) {
			const link = links.nth(i);
			const href =
				(await link.getAttribute("href")) ||
				(await link.getAttribute("data-href"));
			const title = await link.textContent();

			// リンクが存在することを確認
			expect(href).toBeTruthy();
			expect(title).toBeTruthy();

			// 期待されるパターンの中から一致するものを探す
			const expectedPattern = expectedLinkPatterns.find(
				(pattern) => pattern.title === title && pattern.hrefPattern.test(href!),
			);

			expect(expectedPattern).toBeTruthy();
			console.log(`✅ Correct link found: "${title}" -> ${href}`);
		}

		// 期待される数のリンクが存在することを確認
		expect(linkCount).toBe(expectedLinkPatterns.length);
		console.log(`✅ All ${linkCount} links match expected patterns!`);
	});
});
