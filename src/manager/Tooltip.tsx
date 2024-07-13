import {
	IconButton,
	TooltipLinkList,
	WithTooltip,
} from "@storybook/components";
import { JumpToIcon } from "@storybook/icons";
import { useStorybookApi } from "@storybook/manager-api";
import React, { memo, useCallback, useState, type ReactNode } from "react";
import { StorybookIcon, isIconName } from "./StorybookIcon";
import { resolveLinks } from "./resolveParameter";

export const Tool = memo(function MyAddonSelector() {
	const rootPath = process.env.SOURCE_LINK_PROJECT_ROOT_PATH ?? "";
	const isStaticBuild = process.env.NODE_ENV === "production";

	const api = useStorybookApi();

	const importPath = api.getCurrentStoryData()?.importPath as
		| string
		| undefined;

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

	const onOpenTooltip = useCallback(() => {
		if (!importPath) return;
		if (links) return;

		resolveLinks({
			importPath,
			rootPath,
			isStaticBuild,
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
						order: item.order ?? Number.MAX_SAFE_INTEGER,
					};
				})
				.sort((a, b) => a.order - b.order);

			setLinks(sortedLinks);
		});
	}, [importPath, rootPath, isStaticBuild, links]);

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
