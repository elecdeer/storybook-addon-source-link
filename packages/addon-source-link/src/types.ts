import type { API_LeafEntry } from "@storybook/core/types";
import type * as iconsModule from "@storybook/icons";

export type IconName = Exclude<keyof typeof iconsModule, "iconList">;

export type SourceLinkParameter = {
	links: Record<string, Resolvable<LinkEntry>>;
};

export type ResolveContext = {
	/**
	 * The root path of the Storybook project.
	 * This is the path where the `.storybook` directory is located.
	 *
	 * @example `"/Users/username/path/to/project"`
	 */
	rootPath: string | undefined;
	/**
	 * Whether the Storybook is being executed with a static build.
	 */
	isStaticBuild: boolean;
	/**
	 * The type of entry.
	 */
	type: API_LeafEntry["type"];
	/**
	 * The path to the source file.
	 * @example `"./src/stories/Button.tsx"`
	 */
	importPath: API_LeafEntry["importPath"];
	/**
	 * The id of the entry.
	 * @example `"example-button--primary"`
	 */
	id: API_LeafEntry["id"];
	/**
	 * The title of the entry.
	 * @example `"Example/Button"`
	 */
	title: API_LeafEntry["title"];
	/**
	 * The name of the entry.
	 * @example `"Primary"`
	 */
	name: API_LeafEntry["name"];
	/**
	 * The tags of the entry.
	 */
	tags: API_LeafEntry["tags"];
};

export type Resolvable<T> = ((context: ResolveContext) => T) | T;

export type LinkEntry =
	| {
			label: string;
			href: string;
			icon?: IconName | undefined;
			order?: number | undefined;
	  }
	| undefined;
