import { addons } from "@storybook/manager-api";
import type { LinkEntry, SourceLinkParameter } from "../types";
import { EVENTS } from "src/constants";

export const resolveLinks = async (
	parameter: SourceLinkParameter,
	context: {
		importPath: string;
		rootPath: string;
		isStaticBuild: boolean;
	},
): Promise<(LinkEntry & { id: string })[]> => {
	const channel = addons.getChannel();

	return new Promise((resolve) => {
		channel.on(EVENTS.RESPONSE_RESOLVABLE_PARAM, (resolvedParam) => {
			resolve(resolvedParam);
		});

		channel.emit(EVENTS.REQUEST_RESOLVABLE_PARAM, context);
	});
};
