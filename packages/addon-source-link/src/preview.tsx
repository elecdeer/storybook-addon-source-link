import {
	DocsContainer,
	type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import type { PropsWithChildren } from "react";
import React from "react";
import type {
	Addon_DecoratorFunction,
	Renderer,
} from "storybook/internal/types";
import { getFileUrl } from "./linkUtil";
import {
	ParameterResolver,
	withParameterResolver,
} from "./preview/parameterResolver";
import type { SourceLinkParameter } from "./types";

export const parameters = {
	sourceLink: {
		links: {
			"component-editor": ({ importPath, rootPath }) => {
				if (!rootPath) return undefined;
				const componentPath = importPath.replace(/\.stories\.tsx?$/, ".tsx");
				const componentFileUrl = getFileUrl(rootPath, componentPath);
				return {
					type: "editor",
					label: componentPath,
					href: componentFileUrl.href,
					icon: "VSCodeIcon",
				};
			},
			"story-editor": ({ importPath, rootPath }) => {
				if (!rootPath) return undefined;
				const fileUrl = getFileUrl(rootPath, importPath);
				return {
					type: "editor",
					label: importPath,
					href: fileUrl.href,
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
