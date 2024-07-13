import { useChannel } from "@storybook/preview-api";
import type { Addon_DecoratorFunction } from "@storybook/types";
import type {
	LinkEntry,
	Resolvable,
	ResolveContext,
	SourceLinkParameter,
} from "../types";
import { EVENTS } from "src/constants";

export const withParameterResolver: Addon_DecoratorFunction = (
	StoryFn,
	ctx,
) => {
	const emit = useChannel({
		[EVENTS.REQUEST_RESOLVABLE_PARAM]: (context: ResolveContext) => {
			const parameters: SourceLinkParameter = ctx.parameters.sourceLink;

			const resolvedParameters = Object.entries(parameters.links)
				.map(([id, entry]) => {
					const resolvedEntry = resolveLinkEntry(entry, context);
					if (!resolvedEntry) return undefined;
					return {
						id,
						...resolvedEntry,
					};
				})
				.filter((entry) => !!entry);

			emit(EVENTS.RESPONSE_RESOLVABLE_PARAM, resolvedParameters);
		},
	});

	return StoryFn();
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
