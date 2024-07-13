import type { Addon_DecoratorFunction } from "@storybook/types";
import type { SourceLinkParameter } from "./types";
import { getFileUrl } from "./link";

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
		},
	} satisfies SourceLinkParameter,
};

export const decorators: Addon_DecoratorFunction[] = [withParameterResolver];
