import { join, normalize, parse } from "path-browserify";

export const getFileUrl = (rootPath: string, importPath: string) => {
	return new URL(`file:///${join(rootPath, importPath)}`);
};

/**
 * Joins path segments into a path.
 */
export const joinPath = (...paths: string[]): string => {
	return join(...paths);
};

/**
 * Parses a path into an object.
 *
 * @example "./src/stories/Button.stories.tsx"
 *   -> { root: "", dir: "./src/stories", base: "Button.stories.tsx", ext: ".tsx", name: "Button.stories" }
 */
export const parsePath = (path: string) => {
	return parse(path);
};

/**
 * Normalizes a path, resolving `.` and `..` segments.
 *
 * @example "./src/stories/Button.stories.tsx" -> "src/stories/Button.stories.tsx"
 */
export const normalizePath = (path: string) => {
	return normalize(path);
};
