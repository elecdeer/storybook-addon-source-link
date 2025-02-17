import {
	IconButton,
	TooltipLinkList,
	WithTooltip,
} from "@storybook/components";
import { STORY_CHANGED } from "@storybook/core-events";
import { CheckIcon, CopyIcon, JumpToIcon } from "@storybook/icons";
import { useChannel, useStorybookApi } from "@storybook/manager-api";
import { styled } from "@storybook/theming";
import type { API_LeafEntry } from "@storybook/types";
import React, { memo, useCallback, useMemo, useState } from "react";
import type { LinkEntry } from "../types";
import { StorybookIcon, isIconName } from "./StorybookIcon";
import { resolveLinks } from "./resolveParameter";

const ColoredCopyIcon = styled(CopyIcon)`
	fill: ${({ theme }) => theme.color.dark};
`;

const ColoredCheckIcon = styled(CheckIcon)`
	fill: ${({ theme }) => theme.color.dark};
`;

export const Tool = memo(function MyAddonSelector() {
	const rootPath = process.env.SOURCE_LINK_PROJECT_ROOT_PATH ?? "";
	const isStaticBuild = process.env.NODE_ENV === "production";

	const api = useStorybookApi();
	const storyData = api.getCurrentStoryData() as API_LeafEntry | undefined;

	const [linksData, setLinksData] = useState<
		(LinkEntry & { id: string })[] | undefined
	>();
	const [copyClickedLink, setCopyClickedLink] = useState<string>();

	useChannel({
		[STORY_CHANGED]: () => {
			setLinksData(undefined);
		},
	});

	const onOpenTooltip = useCallback(() => {
		setCopyClickedLink(undefined);
		if (!storyData) return;
		if (linksData) return;

		resolveLinks({
			rootPath,
			isStaticBuild,
			type: storyData.type,
			importPath: storyData.importPath,
			id: storyData.id,
			title: storyData.title,
			name: storyData.name,
			tags: storyData.tags,
		}).then((link) => {
			setLinksData(link);
		});
	}, [rootPath, isStaticBuild, storyData, linksData]);

	const links = useMemo(() => {
		return linksData
			?.map((item) => {
				if (item.type === "copy") {
					const clicked = !!copyClickedLink;
					return {
						id: item.id,
						title: item.label,
						onClick: () => {
							navigator.clipboard.writeText(item.href);
							if (!clicked) {
								setCopyClickedLink(item.id);
							}
						},
						icon: item.icon && isIconName(item.icon) && (
							<StorybookIcon name={item.icon} />
						),
						right: clicked ? <ColoredCheckIcon /> : <ColoredCopyIcon />,
						order: item.order ?? 0,
					};
				}

				return {
					id: item.id,
					title: item.label,
					href: item.href,
					target:
						(item.type ?? "linkBlank") === "linkBlank" ? "_blank" : undefined,
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
	}, [linksData, copyClickedLink]);

	return (
		<WithTooltip
			placement="top"
			closeOnOutsideClick
			onVisibleChange={(state) => {
				if (state) {
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
