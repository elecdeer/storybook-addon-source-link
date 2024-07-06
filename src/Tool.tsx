import React, { memo } from "react";
import { useStorybookApi } from "@storybook/manager-api";
import {
	IconButton,
	WithTooltip,
	TooltipLinkList,
} from "@storybook/components";
import { JumpToIcon, VSCodeIcon } from "@storybook/icons";

export const Tool = memo(function MyAddonSelector() {
	const api = useStorybookApi();

	//TODO: get the root path
	const rootPath =
		"file:///Users/elecdeer/Dev/tools/storybook-addon-source-link/";
	const importPath = api.getCurrentStoryData()?.importPath as
		| string
		| undefined;

	const fileUrl = importPath ? new URL(importPath, rootPath) : null;

	if (fileUrl === null) {
		return null;
	}

	const vscodeHref = `vscode://${fileUrl.href}`;

	console.log(api.getCurrentStoryData());

	return (
		<WithTooltip
			placement="top"
			closeOnOutsideClick
			tooltip={({ onHide }) => (
				<TooltipLinkList
					links={[
						{
							id: "vscode",
							title: `${importPath}`,
							target: "_blank",
							href: vscodeHref,
							icon: <VSCodeIcon />,
						},
					]}
				/>
			)}
		>
			<IconButton key="open-source-file" title="Open source file">
				<JumpToIcon />
			</IconButton>
		</WithTooltip>
	);
});
