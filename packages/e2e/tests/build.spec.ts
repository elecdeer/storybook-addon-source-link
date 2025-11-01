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

		// ツールチップ内のリンク/ボタンを取得
		const links = tooltip.locator("a[href], button");
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

		// ツールチップ内のリンク/ボタンを取得
		const links = tooltip.locator("a[href], button");
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

		// Docs tabをクリック（最初のリンクを選択）
		await page.getByRole("link", { name: "Docs" }).click();
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

		// ツールチップ内のリンク/ボタンを取得
		const links = tooltip.locator("a[href], button");
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

	test("should show only 'Powered by addon-source-link' link for Header WithCustomLinks story in static build", async ({
		page,
	}) => {
		// まずホームページに移動
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		// Headerストーリーに移動
		await page.getByText("Header", { exact: true }).first().click();
		await page.waitForURL(/.*header.*/i, { timeout: 10000 });
		await page.waitForLoadState("networkidle");

		// WithCustomLinksストーリーに移動（ストーリー一覧から選択）
		await page
			.locator('[data-item-id="example-header--with-custom-links"]')
			.click();
		await page.waitForURL(/.*with-custom-links.*/i, { timeout: 10000 });
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

		// ツールチップ内のリンク/ボタンを取得
		const links = tooltip.locator("a[href], button");
		const linkCount = await links.count();

		// カスタムリンクも表示されることを確認（undefinedでない限り）
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

		// 期待されるカスタムリンクの検証
		const expectedCustomLinks = [
			{
				title: "Open Header on GitHub",
				expectedHref:
					"https://github.com/elecdeer/storybook-addon-source-link/blob/main/packages/e2e/stories/Header.tsx",
			},
			{
				title: "Custom external link",
				expectedHref: "https://example.com",
			},
		];

		// カスタムリンクが含まれていることを確認
		for (const expectedLink of expectedCustomLinks) {
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
			"✅ Custom links and 'Powered by addon-source-link' link displayed in static build for Header WithCustomLinks story",
		);
	});

	test("should display function-based links for Header WithFunctionLinks story in static build", async ({
		page,
	}) => {
		// まずホームページに移動
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		// Headerストーリーに移動
		await page.getByText("Header", { exact: true }).first().click();
		await page.waitForURL(/.*header.*/i, { timeout: 10000 });
		await page.waitForLoadState("networkidle");

		// WithFunctionLinksストーリーに移動（ストーリー一覧から選択）
		await page
			.locator('[data-item-id="example-header--with-function-links"]')
			.click();
		await page.waitForURL(/.*with-function-links.*/i, { timeout: 10000 });
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

		// ツールチップ内のリンク/ボタンを取得
		const links = tooltip.locator("a[href], button");
		const linkCount = await links.count();

		// 関数型リンクが表示されることを確認（undefinedを返すものは除く）
		expect(linkCount).toBeGreaterThanOrEqual(2);

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

		// 期待される関数型リンク（静的ビルドでの動作）
		const expectedFunctionLinks = [
			{
				title: "GitHub (Static Build)",
				expectedHref:
					"https://github.com/elecdeer/storybook-addon-source-link/blob/main/packages/e2e/stories/Header.stories.ts",
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

		// "Dev Only Link"は静的ビルドでは表示されないことを確認
		const devOnlyLink = actualLinks.find(
			(link) => link.title === "Dev Only Link",
		);
		expect(devOnlyLink).toBeFalsy();

		// "Powered by" リンクの確認
		const poweredByLink = actualLinks.find(
			(link) => link.title === "Powered by addon-source-link",
		);
		expect(poweredByLink).toBeTruthy();
		expect(poweredByLink?.href).toBe(
			"https://github.com/elecdeer/storybook-addon-source-link",
		);

		console.log(
			"✅ Function-based links are displayed correctly in static build for Header WithFunctionLinks story",
		);
	});
});
