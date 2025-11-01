---
"storybook-addon-source-link": minor
---

Add support for opening links in the code editor. New link type `"editor"` allows links to be opened directly in the user's code editor by automatically detecting which editor they are using. This is different from the previous `vscode://` URL scheme approach, which only worked with VS Code.

**Breaking change**: The preset link keys have been renamed from `"component-vscode"` and `"story-vscode"` to `"component-editor"` and `"story-editor"`. If you are overriding these keys in your configuration, you will need to update your code.
