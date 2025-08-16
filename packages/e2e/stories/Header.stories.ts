import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import type {
	ResolveContext,
	SourceLinkParameter,
} from "storybook-addon-source-link";
import { joinPath } from "storybook-addon-source-link";

import { Header } from "./Header";

const meta = {
	title: "Example/Header",
	component: Header,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: "fullscreen",
	},
	args: {
		onLogin: fn(),
		onLogout: fn(),
		onCreateAccount: fn(),
	},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
	args: {
		user: {
			name: "Jane Doe",
		},
	},
};

export const LoggedOut: Story = {};

export const WithCustomLinks: Story = {
	args: {
		user: {
			name: "Jane Doe",
		},
	},
	parameters: {
		sourceLink: {
			links: {
				// デフォルトリンクを無効化
				"component-vscode": undefined,
				"story-vscode": undefined,
				// カスタムリンクを追加
				"header-github": {
					label: "Open Header on GitHub",
					href: "https://github.com/elecdeer/storybook-addon-source-link/blob/main/packages/e2e/stories/Header.tsx",
					icon: "GithubIcon",
					order: 1,
				},
				"header-docs": {
					label: "Copy import path",
					href: "./stories/Header.tsx",
					type: "copy" as const,
					icon: "DocumentIcon",
					order: 0,
				},
				"header-custom-link": {
					label: "Custom external link",
					href: "https://example.com",
					icon: "LinkIcon",
					type: "linkBlank" as const,
					order: 3,
				},
			},
		} satisfies SourceLinkParameter,
	},
};

export const WithFunctionLinks: Story = {
	args: {
		user: {
			name: "Jane Doe",
		},
	},
	parameters: {
		sourceLink: {
			links: {
				// デフォルトリンクを無効化
				"component-vscode": undefined,
				"story-vscode": undefined,
				// 関数型リンクを追加
				"dynamic-github": ({ importPath, isStaticBuild }: ResolveContext) => {
					if (isStaticBuild) {
						return {
							label: "GitHub (Static Build)",
							href: `https://github.com/elecdeer/storybook-addon-source-link/blob/main/${joinPath("packages/e2e", importPath)}`,
							icon: "GithubIcon",
							order: 1,
						};
					}
					return {
						label: "GitHub (Dev Mode)",
						href: `https://github.com/elecdeer/storybook-addon-source-link/blob/main/${joinPath("packages/e2e", importPath)}`,
						icon: "GithubIcon",
						order: 1,
					};
				},
				"conditional-link": ({ isStaticBuild }: ResolveContext) => {
					if (isStaticBuild) {
						return undefined; // 静的ビルドでは表示しない
					}
					return {
						label: "Dev Only Link",
						href: "https://localhost:6006",
						icon: "ShareAltIcon",
						order: 2,
					};
				},
				"context-aware": ({ name, id }: ResolveContext) => ({
					label: `Story: ${name}`,
					href: `https://example.com/story/${id}`,
					icon: "BookIcon",
					order: 3,
				}),
			},
		} satisfies SourceLinkParameter,
	},
};
