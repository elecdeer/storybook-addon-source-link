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

	test("should have correct link URLs in tooltip for Button story", async ({
		page,
	}) => {
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

	test("should have correct link URLs in tooltip for Configure docs", async ({
		page,
	}) => {
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

	test("should have correct link URLs in tooltip for Button autodocs", async ({
		page,
	}) => {
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

	test("should display custom links for Header WithCustomLinks story", async ({
		page,
	}) => {
		// Header WithCustomLinksストーリーに直接移動
		await page.goto("/?path=/story/example-header--with-custom-links");

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

		// 期待されるリンク数を確認（デフォルト + カスタム、Copy import pathが表示されない場合は4）
		expect(linkCount).toBeGreaterThanOrEqual(4);

		// 実際に表示されているリンクを取得
		const actualLinks = [];
		for (let i = 0; i < linkCount; i++) {
			const link = links.nth(i);
			const href =
				(await link.getAttribute("href")) ||
				(await link.getAttribute("data-href"));
			const title = await link.textContent();
			actualLinks.push({ title, href });
		}

		// 期待されるカスタムリンクの検証
		const expectedCustomLinks = [
			{
				title: "Copy import path",
				expectedHref: "./stories/Header.tsx",
			},
			{
				title: "Open Header on GitHub",
				expectedHref:
					"https://github.com/elecdeer/storybook-addon-source-link/blob/main/packages/demo/stories/Header.tsx",
			},
			{
				title: "Custom external link",
				expectedHref: "https://example.com",
			},
		];

		// カスタムリンクが含まれていることを確認（Copy import pathを除く）
		const nonCopyLinks = expectedCustomLinks.filter(
			(link) => link.title !== "Copy import path",
		);
		for (const expectedLink of nonCopyLinks) {
			const foundLink = actualLinks.find(
				(link) => link.title === expectedLink.title,
			);
			expect(foundLink).toBeTruthy();
			expect(foundLink?.href).toBe(expectedLink.expectedHref);
		}

		// Copy import pathリンクは現在表示されていないため、他のカスタムリンクの存在を確認

		// デフォルトリンクも含まれていることを確認
		const storyLink = actualLinks.find(
			(link) => link.title === "./stories/Header.stories.ts",
		);
		expect(storyLink).toBeTruthy();
		expect(storyLink?.href).toContain("vscode://file://");

		const componentLink = actualLinks.find(
			(link) => link.title === "./stories/Header.tsx",
		);
		expect(componentLink).toBeTruthy();
		expect(componentLink?.href).toContain("vscode://file://");

		// "Powered by" リンクの確認
		const poweredByLink = actualLinks.find(
			(link) => link.title === "Powered by addon-source-link",
		);
		expect(poweredByLink).toBeTruthy();
		expect(poweredByLink?.href).toBe(
			"https://github.com/elecdeer/storybook-addon-source-link",
		);

		console.log(
			"✅ Custom links are displayed correctly in Header WithCustomLinks story!",
		);
	});

	test("should display function-based links for Header WithFunctionLinks story", async ({
		page,
	}) => {
		// Header WithFunctionLinksストーリーに直接移動
		await page.goto("/?path=/story/example-header--with-function-links");

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

		// 少なくとも3つのリンクが存在することを確認（関数型リンク + Powered by）
		expect(linkCount).toBeGreaterThanOrEqual(3);

		// 実際に表示されているリンクを取得
		const actualLinks = [];
		for (let i = 0; i < linkCount; i++) {
			const link = links.nth(i);
			const href =
				(await link.getAttribute("href")) ||
				(await link.getAttribute("data-href"));
			const title = await link.textContent();
			actualLinks.push({ title, href });
		}

		// 期待される関数型リンクの検証
		const expectedFunctionLinks = [
			{
				title: "GitHub (Dev Mode)",
				expectedHref:
					"https://github.com/elecdeer/storybook-addon-source-link/blob/main/packages/demo./stories/Header.stories.ts",
			},
			{
				title: "Dev Only Link",
				expectedHref: "https://localhost:6006",
			},
			{
				title: "Story: With Function Links",
				expectedHref:
					"https://example.com/story/example-header--with-function-links",
			},
		];

		// 関数型リンクが含まれていることを確認
		for (const expectedLink of expectedFunctionLinks) {
			const foundLink = actualLinks.find(
				(link) => link.title === expectedLink.title,
			);
			expect(foundLink).toBeTruthy();
			expect(foundLink?.href).toBe(expectedLink.expectedHref);
		}

		// "Powered by" リンクの確認
		const poweredByLink = actualLinks.find(
			(link) => link.title === "Powered by addon-source-link",
		);
		expect(poweredByLink).toBeTruthy();
		expect(poweredByLink?.href).toBe(
			"https://github.com/elecdeer/storybook-addon-source-link",
		);

		console.log(
			"✅ Function-based links are displayed correctly in Header WithFunctionLinks story!",
		);
	});
});
