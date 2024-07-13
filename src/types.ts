import type * as iconsModule from "@storybook/icons";

export type IconName = Exclude<keyof typeof iconsModule, "iconList">;

export type SourceLinkParameter = {
	links: Record<string, Resolvable<LinkEntry>>;
};

export type ResolveContext = {
	importPath: string;
	rootPath: string | undefined;
	isStaticBuild: boolean;
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
