import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: ["@storybook/addon-docs", "storybook-addon-source-link"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
};
export default config;
