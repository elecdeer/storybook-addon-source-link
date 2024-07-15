import { addons } from "@storybook/core/manager-api";
import { EVENTS } from "../constants";
import type { LinkEntry, ResolveContext } from "../types";

export const resolveLinks = async (
	context: ResolveContext,
): Promise<(LinkEntry & { id: string })[]> => {
	const channel = addons.getChannel();

	return new Promise((resolve) => {
		channel.on(EVENTS.RESPONSE_RESOLVABLE_PARAM, (resolvedParam) => {
			resolve(resolvedParam);
		});

		channel.emit(EVENTS.REQUEST_RESOLVABLE_PARAM, context);
	});
};
