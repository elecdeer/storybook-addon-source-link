// You can use presets to augment the Storybook configuration
// You rarely want to do this in addons,
// so often you want to delete this file and remove the reference to it in package.json#exports and package.json#bunder.nodeEntries
// Read more about presets at https://storybook.js.org/docs/addons/writing-presets

import type { PresetProperty } from "@storybook/types";

export const env: PresetProperty<"env"> = (base, _config) => {
	// If NODE_ENV is set to production, Storybook is being executed with a static build.
	if (process.env.NODE_ENV === "production") {
		return {
			...base,
			SOURCE_LINK_PROJECT_ROOT_PATH: "",
		};
	}

	// Storybook uses process.cwd() as the root path for the project
	const workingDir = process.cwd();

	return {
		...base,
		SOURCE_LINK_PROJECT_ROOT_PATH: workingDir,
	};
};
