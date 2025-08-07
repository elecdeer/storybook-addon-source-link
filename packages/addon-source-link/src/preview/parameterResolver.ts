import { type FC, useEffect } from "react";
import type { Addon_DecoratorFunction } from "storybook/internal/types";
import { addons } from "storybook/preview-api";
import { EVENTS } from "../constants";
import type {
	LinkEntry,
	Resolvable,
	ResolveContext,
	SourceLinkParameter,
} from "../types";

export const useParameterResolver = (
	parameter: SourceLinkParameter,
	disabled?: boolean,
) => {
	useEffect(() => {
		const channel = addons.getChannel();

		if (disabled) return;

		const handler = (context: ResolveContext) => {
			const resolvedParameters = Object.entries(parameter.links)
				.map(([id, entry]) => {
					const resolvedEntry = resolveLinkEntry(entry, context);
					if (!resolvedEntry) return undefined;
					return {
						id,
						...resolvedEntry,
					};
				})
				.filter((entry) => !!entry);

			channel.emit(EVENTS.RESPONSE_RESOLVABLE_PARAM, resolvedParameters);
		};

		channel.on(EVENTS.REQUEST_RESOLVABLE_PARAM, handler);

		return () => {
			channel.off(EVENTS.REQUEST_RESOLVABLE_PARAM, handler);
		};
	});
};

export const withParameterResolver: Addon_DecoratorFunction = (
	StoryFn,
	ctx,
) => {
	// if the viewMode is docs, the source link is resolved in ParameterResolver
	useParameterResolver(ctx.parameters.sourceLink, ctx.viewMode === "docs");
	return StoryFn();
};

export const ParameterResolver: FC<{
	parameter: SourceLinkParameter;
}> = ({ parameter }) => {
	useParameterResolver(parameter);
	return null;
};

const resolveLinkEntry = (
	value: Resolvable<LinkEntry>,
	params: ResolveContext,
): LinkEntry => {
	if (value instanceof Function) {
		return value(params);
	}
	return value;
};
