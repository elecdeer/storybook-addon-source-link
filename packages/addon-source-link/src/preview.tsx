import { DocsContainer, type DocsContainerProps } from "@storybook/blocks";
import type { Addon_DecoratorFunction, Renderer } from "@storybook/core/types";
import { getFileUrl } from "./linkUtil";
import type { SourceLinkParameter } from "./types";

import React, { type PropsWithChildren } from "react";
import {
	ParameterResolver,
	withParameterResolver,
} from "./preview/parameterResolver";

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
	docs: {
		container: ({
			children,
			...props
		}: PropsWithChildren<DocsContainerProps<Renderer>>) => {
			const { projectAnnotations } = props.context;

			return (
				<DocsContainer {...props}>
					{children}
					{projectAnnotations.parameters && (
						<ParameterResolver
							parameter={projectAnnotations.parameters.sourceLink}
						/>
					)}
				</DocsContainer>
			);
		},
	},
};

export const decorators: Addon_DecoratorFunction[] = [withParameterResolver];
