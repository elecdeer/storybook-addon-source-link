export const ADDON_ID = "storybook-addon-source-link";
export const TOOL_ID = `${ADDON_ID}/tool`;

export const EVENTS = {
	REQUEST_RESOLVABLE_PARAM: `${ADDON_ID}/request-resolve`,
	RESPONSE_RESOLVABLE_PARAM: `${ADDON_ID}/response-resolve`,
} as const;
