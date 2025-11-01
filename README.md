# storybook-addon-source-link

![](./readme-hero.png)

This addon adds links to open the source code of story or components in your editor.

## Getting started

### Requirements

- Storybook 9.0 or later

### 1. Install the addon.

```sh
npm install -D storybook-addon-source-link
# or
yarn add -D storybook-addon-source-link
# or
pnpm add -D storybook-addon-source-link
```

### 2. Register the addon in your Storybook configuration.

Then, register it as an addon in `.storybook/main.js` (or `.storybook/main.ts`).

```ts
// .storybook/main.ts
import type { StorybookConfig } from "@storybook/your-framework";

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    // ...other addons
    "storybook-addon-source-link",
  ],
};

export default config;
```

### 3. (Optional) Configure the addon.

You can modify or add links using `.storybook/preview.ts` or the parameters of a Story.

```ts
import type { Preview } from "@storybook/react";
import {
  type SourceLinkParameter,
  getFileUrl,
} from "storybook-addon-source-link";

const preview: Preview = {
  parameters: {
    // ...other parameters
    sourceLink: {
      links: {
        // override addon's default link
        "story-vscode": ({ importPath, rootPath, isStaticBuild }) => {
          if (isStaticBuild) return undefined;
          if (!rootPath) return undefined;
          const fileUrl = getFileUrl(rootPath, importPath);
          const href = `vscode://${fileUrl.href}`;
          return {
            label: importPath.split("/").at(-1) ?? "",
            href,
            icon: "StorybookIcon",
          };
        },

        // add a new link type
        "story-github": ({ importPath, rootPath }) => {
          if (!rootPath) return undefined;
          const href = `https://github.com/elecdeer/storybook-addon-source-link/blob/-/packages/e2e${importPath.replace(
            /^\./,
            ""
          )}`;
          return {
            label: importPath,
            href,
            icon: "GithubIcon",
          };
        },
      },
    } satisfies SourceLinkParameter,
  },
};

export default preview;
```

## API

### Parameters

This addon contributes the following parameters to Storybook, under the `sourceLink` namespace.

> [!TIP]
> Storybook parameters can be specified at the story, component, and global levels, and are merged for each value.
>
> https://storybook.js.org/docs/writing-stories/parameters

#### `links`

Type: `{ [key: string]: LinkEntry | undefined | ((context: ResolveContext) => LinkEntry | undefined) }`

If `undefined` is returned, the link will not be added.

- `ResolveContext`:
  - `rootPath`: The path to the root directory of the source files. e.g. `"/Users/username/project"`. If `isStaticBuild` is `true`, this value is `""`.
  - `isStaticBuild`: Whether the Storybook is built statically.
  - `type`: The type of entry. `"story"` or `"docs"`.
  - `importPath`: The path to the source file. e.g. `"./src/stories/Button.tsx"`
  - `id`: The ID of the story. e.g. `"example-button--primary"`
  - `title`: The title of the story or the component. e.g. `"Example/Button"`
  - `name`: The name of the story. e.g. `"Primary"`
  - `tags`: The tags of the story. e.g. `["autodocs"]`
- `LinkEntry`:
  - `label`: The label of the link.
  - `href`: The URL of the link.
  - `icon`: (Optional) The icon name in [@storybook/icons](https://main--64b56e737c0aeefed9d5e675.chromatic.com/?path=/docs/introduction--docs)
  - `type`: (Optional) The type of the link.
    - `"link"`: The link will be opened in the same tab.
    - `"linkBlank"`: (default) The link will be opened in a new tab. Added target="\_blank" to the link.
    - `"copy"`: The link will be copied to the clipboard.
    - `"editor"`: The link will be opened in the code editor.
  - `order`: (Optional) When order is specified, it will be sorted in ascending order. The default value is `0`.

### Preset settings provided by the addon

```ts
// preview.tsx

const preview: Preview = {
  parameters: {
    sourceLink: {
      links: {
        "component-editor": ({ importPath, rootPath }) => {
          if (!rootPath) return undefined;
          const componentPath = importPath.replace(/\.stories\.tsx?$/, ".tsx");
          const componentFileUrl = getFileUrl(rootPath, componentPath);
          return {
            type: "editor",
            label: componentPath,
            href: componentFileUrl.href,
            icon: "VSCodeIcon",
          };
        },
        "story-editor": ({ importPath, rootPath }) => {
          if (!rootPath) return undefined;
          const fileUrl = getFileUrl(rootPath, importPath);
          return {
            type: "editor",
            label: importPath,
            href: fileUrl.href,
            icon: "VSCodeIcon",
          };
        },
        "addon-powered-by": {
          label: "Powered by addon-source-link",
          href: "https://github.com/elecdeer/storybook-addon-source-link",
          order: Number.MAX_SAFE_INTEGER,
          icon: "InfoIcon",
        },
      },
    } satisfies SourceLinkParameter,
  },
};
```
