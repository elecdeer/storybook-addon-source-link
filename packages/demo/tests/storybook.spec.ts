import { resolve } from "node:path";
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

	test("should have correct link URLs in tooltip for Button story", async ({ page }) => {
		// Buttonストーリーに直接移動
		await page.goto("/?path=/story/example-button--primary");

		// ページが完全に読み込まれるまで待つ
		await page.waitForLoadState("networkidle");

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

		// 実際のファイルパスを動的に構築（CIでも動作するように）
		const projectRoot = process.cwd();
		const buttonStoriesPath = resolve(projectRoot, "stories/Button.stories.ts");
		const buttonComponentPath = resolve(projectRoot, "stories/Button.tsx");

		const expectedLinkPatterns = [
			{
				title: "./stories/Button.stories.ts",
				expectedHref: `vscode://file://${buttonStoriesPath}`,
			},
			{
				title: "./stories/Button.tsx",
				expectedHref: `vscode://file://${buttonComponentPath}`,
			},
			{
				title: "Powered by addon-source-link",
				expectedHref: "https://github.com/elecdeer/storybook-addon-source-link",
			},
		];

		// 各リンクのURLを実際のパスで検証（順番は固定）
		for (let i = 0; i < linkCount; i++) {
			const link = links.nth(i);
			const href =
				(await link.getAttribute("href")) ||
				(await link.getAttribute("data-href"));
			const title = await link.textContent();

			// リンクが存在することを確認
			expect(href).toBeTruthy();
			expect(title).toBeTruthy();

			// 順番に基づいて期待される値と比較
			const expectedPattern = expectedLinkPatterns[i];
			expect(title).toBe(expectedPattern.title);
			expect(href).toBe(expectedPattern.expectedHref);
		}

		// 期待される数のリンクが存在することを確認
		expect(linkCount).toBe(expectedLinkPatterns.length);
	});

	test("should have correct link URLs in tooltip for Configure docs", async ({ page }) => {
		// Configure docsページに直接移動
		await page.goto("/?path=/docs/configure-your-project--docs");

		// ページが完全に読み込まれるまで待つ
		await page.waitForLoadState("networkidle");

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

		// 実際のファイルパスを動的に構築（CIでも動作するように）
		const projectRoot = process.cwd();
		const configureMdxPath = resolve(projectRoot, "stories/Configure.mdx");
		
		const expectedLinkPatterns = [
			{
				title: "./stories/Configure.mdx",
				expectedHref: `vscode://file://${configureMdxPath}`,
			},
			{
				title: "./stories/Configure.mdx",
				expectedHref: `vscode://file://${configureMdxPath}`,
			},
			{
				title: "Powered by addon-source-link",
				expectedHref: "https://github.com/elecdeer/storybook-addon-source-link",
			},
		];

		// 各リンクのURLを実際のパスで検証（順番は固定）
		for (let i = 0; i < linkCount; i++) {
			const link = links.nth(i);
			const href =
				(await link.getAttribute("href")) ||
				(await link.getAttribute("data-href"));
			const title = await link.textContent();

			// リンクが存在することを確認
			expect(href).toBeTruthy();
			expect(title).toBeTruthy();

			// 順番に基づいて期待される値と比較
			const expectedPattern = expectedLinkPatterns[i];
			expect(title).toBe(expectedPattern.title);
			expect(href).toBe(expectedPattern.expectedHref);
		}

		// 期待される数のリンクが存在することを確認
		expect(linkCount).toBe(expectedLinkPatterns.length);
	});

	test("should have correct link URLs in tooltip for Button autodocs", async ({ page }) => {
		// Button autodocsページに直接移動
		await page.goto("/?path=/docs/example-button--docs");

		// ページが完全に読み込まれるまで待つ
		await page.waitForLoadState("networkidle");

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

		// 実際のファイルパスを動的に構築（CIでも動作するように）
		const projectRoot = process.cwd();
		const buttonStoriesPath = resolve(projectRoot, "stories/Button.stories.ts");
		const buttonComponentPath = resolve(projectRoot, "stories/Button.tsx");

		const expectedLinkPatterns = [
			{
				title: "./stories/Button.stories.ts",
				expectedHref: `vscode://file://${buttonStoriesPath}`,
			},
			{
				title: "./stories/Button.tsx",
				expectedHref: `vscode://file://${buttonComponentPath}`,
			},
			{
				title: "Powered by addon-source-link",
				expectedHref: "https://github.com/elecdeer/storybook-addon-source-link",
			},
		];

		// 各リンクのURLを実際のパスで検証（順番は固定）
		for (let i = 0; i < linkCount; i++) {
			const link = links.nth(i);
			const href =
				(await link.getAttribute("href")) ||
				(await link.getAttribute("data-href"));
			const title = await link.textContent();

			// リンクが存在することを確認
			expect(href).toBeTruthy();
			expect(title).toBeTruthy();

			// 順番に基づいて期待される値と比較
			const expectedPattern = expectedLinkPatterns[i];
			expect(title).toBe(expectedPattern.title);
			expect(href).toBe(expectedPattern.expectedHref);
		}

		// 期待される数のリンクが存在することを確認
		expect(linkCount).toBe(expectedLinkPatterns.length);
	});
});
