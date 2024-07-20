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
			/**
			 * The label of the link.
			 */
			label: string;
			/**
			 * The URL of the link.
			 */
			href: string;
			/**
			 * The icon name in [@storybook/icons](https://main--64b56e737c0aeefed9d5e675.chromatic.com/?path=/docs/introduction--docs)
			 */
			icon?: IconName | undefined;
			/**
			 * When order is specified, it will be sorted in ascending order. The default value is `0`.
			 */
			order?: number | undefined;

			/**
			 * The type of the link.
			 *
			 * - `"link"`: The link will be opened in the same tab.
			 * - `"linkBlank"`: The link will be opened in a new tab. Added target="_blank" to the link.
			 * - `"copy"`: The link will be copied to the clipboard.
			 *
			 * @default "linkBlank"
			 */
			type?: "link" | "linkBlank" | "copy" | undefined;
	  }
	| undefined;
