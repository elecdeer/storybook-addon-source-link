import * as iconsModule from "@storybook/icons";
import type { FC } from "react";
import React from "react";
import type { IconName } from "../types";

const storybookIconMap = Object.fromEntries(
	Object.entries(iconsModule)
		// is it component
		.filter((entry) => entry[0][0] === entry[0][0].toUpperCase())
		.map(([key, value]) => [key, value]),
) as Record<IconName, (typeof iconsModule)[IconName]>;

export const isIconName = (name: string): name is IconName =>
	Object.keys(storybookIconMap).includes(name);

export const StorybookIcon: FC<{ name: IconName }> = ({ name }) => {
	const IconComponent = storybookIconMap[name];
	if (!IconComponent) return null;

	return <IconComponent />;
};
