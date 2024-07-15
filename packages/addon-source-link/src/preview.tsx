import type { Addon_DecoratorFunction } from "@storybook/core/types";
import { getFileUrl } from "./linkUtil";
import type { SourceLinkParameter } from "./types";

import { withParameterResolver } from "./preview/parameterResolver";

export const parameters = {
	sourceLink: {
		links: {
			"component-vscode": ({ importPath, rootPath }) => {
				if (!rootPath) return undefined;
				const componentPath = importPath.replace(/\.stories\.tsx?$/, ".tsx");
				const componentFileUrl = getFileUrl(rootPath, componentPath);
				return {
					label: componentPath,
					href: `vscode://${componentFileUrl.href}`,
					icon: "VSCodeIcon",
				};
			},
			"story-vscode": ({ importPath, rootPath }) => {
				if (!rootPath) return undefined;
				const fileUrl = getFileUrl(rootPath, importPath);
				const href = `vscode://${fileUrl.href}`;
				return {
					label: importPath,
					href,
					icon: "VSCodeIcon",
				};
			},
			"addon-powered-by": {
				label: "Powered by addon-source-link",
				href: "https://github.com/elecdeer/storybook-addon-source-link",
				order: Number.MAX_SAFE_INTEGER,
				icon: "InfoIcon",
			},
		},
	} satisfies SourceLinkParameter,
};

export const decorators: Addon_DecoratorFunction[] = [withParameterResolver];
