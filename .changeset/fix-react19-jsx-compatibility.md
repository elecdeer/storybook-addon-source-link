---
"storybook-addon-source-link": patch
---

Fix JSX transform compatibility with React 19

Change JSX setting from "react-jsx" to "react" to ensure compatibility with packages using React 19, which may not work correctly with the newer JSX transform.