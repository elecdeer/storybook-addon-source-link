import {
	IconButton,
	TooltipLinkList,
	WithTooltip,
} from "@storybook/core/components";
import { STORY_CHANGED } from "@storybook/core/core-events";
import { useChannel, useStorybookApi } from "@storybook/core/manager-api";
import type { API_LeafEntry } from "@storybook/core/types";
import { JumpToIcon } from "@storybook/icons";
import React, { memo, useCallback, useState, type ReactNode } from "react";
import { StorybookIcon, isIconName } from "./StorybookIcon";
import { resolveLinks } from "./resolveParameter";

export const Tool = memo(function MyAddonSelector() {
	const rootPath = process.env.SOURCE_LINK_PROJECT_ROOT_PATH ?? "";
	const isStaticBuild = process.env.NODE_ENV === "production";

	const api = useStorybookApi();
	const storyData = api.getCurrentStoryData() as API_LeafEntry | undefined;

	const [links, setLinks] = useState<
		| {
				id: string;
				title: string;
				href: string;
				target: string;
				icon?: ReactNode;
		  }[]
		| undefined
	>();

	useChannel({
		[STORY_CHANGED]: () => {
			setLinks(undefined);
		},
	});

	const onOpenTooltip = useCallback(() => {
		if (!storyData) return;
		if (links) return;

		resolveLinks({
			rootPath,
			isStaticBuild,
			type: storyData.type,
			importPath: storyData.importPath,
			id: storyData.id,
			title: storyData.title,
			name: storyData.name,
			tags: storyData.tags,
		}).then((links) => {
			const sortedLinks = links
				.map((item) => {
					return {
						id: item.id,
						title: item.label,
						href: item.href,
						target: "_blank",
						icon: item.icon && isIconName(item.icon) && (
							<StorybookIcon name={item.icon} />
						),
						order: item.order ?? 0,
					};
				})
				.sort((a, b) => {
					if (a.order === b.order) {
						return a.title.localeCompare(b.title);
					}
					return a.order - b.order;
				});

			setLinks(sortedLinks);
		});
	}, [rootPath, isStaticBuild, storyData, links]);

	return (
		<WithTooltip
			placement="top"
			closeOnOutsideClick
			onVisibleChange={(state) => {
				if (state && !links) {
					onOpenTooltip();
				}
			}}
			tooltip={() => <TooltipLinkList links={links ?? []} />}
		>
			<IconButton key="open-source-file" title="Open source file">
				<JumpToIcon />
			</IconButton>
		</WithTooltip>
	);
});
