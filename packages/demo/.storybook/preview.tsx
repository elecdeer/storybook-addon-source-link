import type { Preview } from "@storybook/react";
import {
	type SourceLinkParameter,
	getFileUrl,
} from "storybook-addon-source-link";

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: "light",
		},
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		sourceLink: {
			links: {
				"story-vscode": ({ importPath, rootPath, isStaticBuild }) => {
					if (isStaticBuild) return undefined;
					if (!rootPath) return undefined;
					const fileUrl = getFileUrl(rootPath, importPath);
					const href = `vscode://${fileUrl.href}`;
					return {
						label: importPath.split("/").at(-1) ?? "",
						href,
						icon: "StorybookIcon",
					};
				},
				"story-github": ({ importPath, rootPath }) => {
					if (!rootPath) return undefined;
					const href = `https://github.com/elecdeer/storybook-addon-source-link/blob/-/packages/demo${importPath.replace(/^\./, "")}`;
					return {
						label: importPath,
						href,
						icon: "GithubIcon",
					};
				},
			},
		} satisfies SourceLinkParameter,
	},
};

export default preview;
