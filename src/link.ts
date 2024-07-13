import { join } from "path-browserify";

export const getFileUrl = (rootPath: string, importPath: string) => {
	return new URL(`file:///${join(rootPath, importPath)}`);
};
