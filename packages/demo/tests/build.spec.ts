import { expect, test } from "@playwright/test";

test.describe("Storybook Demo (Build)", () => {
	test("should load Storybook homepage from static files", async ({ page }) => {
		// Storybookのメインページにアクセス
		await page.goto("/");

		// ページのタイトルがStorybookであることを確認
		await expect(page).toHaveTitle(/Storybook/);

		// サイドバー（ナビゲーション）が表示されていることを確認
		await expect(page.locator("nav")).toBeVisible();

		// ストーリーのiframeが表示されていることを確認
		await expect(page.locator("iframe#storybook-preview-iframe")).toBeVisible();

		// Storybookが正常に動作していることを確認
		console.log("✅ Storybook loaded successfully from static files!");
	});

	test("should display source-link addon tool in static build", async ({
		page,
	}) => {
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

		console.log("✅ Source-link addon tool is displayed in static build!");
	});

	test("should show only 'Powered by addon-source-link' link in tooltip for Button story in static build", async ({
		page,
	}) => {
		// まずホームページに移動
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		// Buttonストーリーにクリックで移動
		await page.getByText("Button", { exact: true }).first().click();
		await page.waitForURL(/.*button.*/i, { timeout: 10000 });
		await page.waitForLoadState("networkidle");

		// source-linkアドオンのツールボタンをクリック
		const sourceLinkButton = page.locator('button[title="Open source file"]');
		await expect(sourceLinkButton).toBeVisible();
		await sourceLinkButton.click();

		// ツールチップの表示を待つ
		await page.waitForTimeout(500);

		// ツールチップが表示されることを確認
		const tooltip = page.locator('[data-testid="tooltip"]');
		await expect(tooltip).toBeAttached({ timeout: 10000 });

		// ツールチップ内のリンクを取得
		const links = tooltip.locator("a[href], button[data-href]");
		const linkCount = await links.count();

		// 「Powered by addon-source-link」リンクのみが表示されることを確認
		expect(linkCount).toBe(1);

		const link = links.first();
		const linkText = await link.textContent();
		const linkHref =
			(await link.getAttribute("href")) ||
			(await link.getAttribute("data-href"));

		expect(linkText).toBe("Powered by addon-source-link");
		expect(linkHref).toBe(
			"https://github.com/elecdeer/storybook-addon-source-link",
		);

		console.log(
			"✅ Only 'Powered by addon-source-link' link displayed in static build for Button story",
		);
	});

	test("should show only 'Powered by addon-source-link' link in tooltip for Configure docs in static build", async ({
		page,
	}) => {
		// まずホームページに移動
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		// Configure docsページにクリックで移動
		await page
			.getByText("Configure your project", { exact: true })
			.first()
			.click();
		await page.waitForURL(/.*configure.*/i, { timeout: 10000 });
		await page.waitForLoadState("networkidle");

		// source-linkアドオンのツールボタンをクリック
		const sourceLinkButton = page.locator('button[title="Open source file"]');
		await expect(sourceLinkButton).toBeVisible();
		await sourceLinkButton.click();

		// ツールチップの表示を待つ
		await page.waitForTimeout(500);

		// ツールチップが表示されることを確認
		const tooltip = page.locator('[data-testid="tooltip"]');
		await expect(tooltip).toBeAttached({ timeout: 10000 });

		// ツールチップ内のリンクを取得
		const links = tooltip.locator("a[href], button[data-href]");
		const linkCount = await links.count();

		// 「Powered by addon-source-link」リンクのみが表示されることを確認
		expect(linkCount).toBe(1);

		const link = links.first();
		const linkText = await link.textContent();
		const linkHref =
			(await link.getAttribute("href")) ||
			(await link.getAttribute("data-href"));

		expect(linkText).toBe("Powered by addon-source-link");
		expect(linkHref).toBe(
			"https://github.com/elecdeer/storybook-addon-source-link",
		);

		console.log(
			"✅ Only 'Powered by addon-source-link' link displayed in static build for Configure docs",
		);
	});

	test("should show only 'Powered by addon-source-link' link in tooltip for Button autodocs in static build", async ({
		page,
	}) => {
		// まずホームページに移動
		// なぜか直接遷移だとNo Preview画面になってしまう
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		// Buttonストーリーにクリックで移動してからDocs tabに切り替え
		await page.getByText("Button", { exact: true }).first().click();
		await page.waitForURL(/.*button.*/i, { timeout: 10000 });
		await page.waitForLoadState("networkidle");

		// Docs tabをクリック
		await page.getByText("Docs", { exact: true }).click();
		await page.waitForLoadState("networkidle");

		// source-linkアドオンのツールボタンをクリック
		const sourceLinkButton = page.locator('button[title="Open source file"]');
		await expect(sourceLinkButton).toBeVisible();
		await sourceLinkButton.click();

		// ツールチップの表示を待つ
		await page.waitForTimeout(500);

		// ツールチップが表示されることを確認
		const tooltip = page.locator('[data-testid="tooltip"]');
		await expect(tooltip).toBeAttached({ timeout: 10000 });

		// ツールチップ内のリンクを取得
		const links = tooltip.locator("a[href], button[data-href]");
		const linkCount = await links.count();

		// 「Powered by addon-source-link」リンクのみが表示されることを確認
		expect(linkCount).toBe(1);

		const link = links.first();
		const linkText = await link.textContent();
		const linkHref =
			(await link.getAttribute("href")) ||
			(await link.getAttribute("data-href"));

		expect(linkText).toBe("Powered by addon-source-link");
		expect(linkHref).toBe(
			"https://github.com/elecdeer/storybook-addon-source-link",
		);

		console.log(
			"✅ Only 'Powered by addon-source-link' link displayed in static build for Button autodocs",
		);
	});
});
