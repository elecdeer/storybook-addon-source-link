# storybook-addon-source-link

## 2.0.0

### Major Changes

- [#60](https://github.com/elecdeer/storybook-addon-source-link/pull/60) [`1bac9ab`](https://github.com/elecdeer/storybook-addon-source-link/commit/1bac9ab9b85d50f21579452211989887b190bc01) Thanks [@elecdeer](https://github.com/elecdeer)! - Support Storybook v10

### Minor Changes

- [#64](https://github.com/elecdeer/storybook-addon-source-link/pull/64) [`9103432`](https://github.com/elecdeer/storybook-addon-source-link/commit/910343286257aeebe35d9c9aa897f383727d4bb9) Thanks [@elecdeer](https://github.com/elecdeer)! - Add support for opening links in the code editor. New link type `"editor"` allows links to be opened directly in the user's code editor by automatically detecting which editor they are using. This is different from the previous `vscode://` URL scheme approach, which only worked with VS Code.

  **Breaking change**: The preset link keys have been renamed from `"component-vscode"` and `"story-vscode"` to `"component-editor"` and `"story-editor"`. If you are overriding these keys in your configuration, you will need to update your code.

### Patch Changes

- [#65](https://github.com/elecdeer/storybook-addon-source-link/pull/65) [`29fc30f`](https://github.com/elecdeer/storybook-addon-source-link/commit/29fc30f9592495df3362979f2a4c53161818f232) Thanks [@elecdeer](https://github.com/elecdeer)! - Migrate to npm trusted publishing for automated releases

## 1.0.1

### Patch Changes

- [#51](https://github.com/elecdeer/storybook-addon-source-link/pull/51) [`7bbafca`](https://github.com/elecdeer/storybook-addon-source-link/commit/7bbafcaf1163fa4c9c5bf503e5c1cc0842c91da2) Thanks [@elecdeer](https://github.com/elecdeer)! - Fix JSX transform compatibility with React 19

  Change JSX setting from "react-jsx" to "react" to ensure compatibility with packages using React 19, which may not work correctly with the newer JSX transform.

## 1.0.0

### Major Changes

- [#21](https://github.com/elecdeer/storybook-addon-source-link/pull/21) [`e21c632`](https://github.com/elecdeer/storybook-addon-source-link/commit/e21c632a0e26748653d651bbfdb80233849a3bbc) Thanks [@elecdeer](https://github.com/elecdeer)! - feat: migrate to Storybook v9

  This change updates the addon to support Storybook v9, which introduces several breaking changes:

  - Updated peer dependency to require Storybook ^9.0.0
  - Migrated demo package structure and configuration
  - Updated all internal imports to use new Storybook v9 APIs
  - Reorganized demo stories to follow new structure
  - Updated dependencies and build configuration for compatibility

  BREAKING CHANGE: This addon now requires Storybook v9 or later. Projects using older versions of Storybook will need to upgrade.

### Minor Changes

- [#43](https://github.com/elecdeer/storybook-addon-source-link/pull/43) [`57bf147`](https://github.com/elecdeer/storybook-addon-source-link/commit/57bf1476c77748b84f58fd7405976fbd4839fbf4) Thanks [@elecdeer](https://github.com/elecdeer)! - feat: add comprehensive E2E testing with Playwright

  This change adds comprehensive end-to-end testing capabilities to verify the addon functionality in both development and build environments:

  - Add Playwright testing framework with full E2E test suite
  - Create separate test configurations for dev and build environments
  - Add automated link validation for source code links in all story contexts
  - Test custom link parameters and function-based link generation
  - Add comprehensive coverage for Button, Header, Page, and Configure stories
  - Verify 'Powered by addon-source-link' display functionality
  - Add test scripts for dev, build, and UI test modes
  - All tests pass in both development (5/5) and production build (5/5) environments

  The E2E tests ensure the addon works correctly across different Storybook environments and validates that source links are properly generated and functional.

### Patch Changes

- [#47](https://github.com/elecdeer/storybook-addon-source-link/pull/47) [`7345627`](https://github.com/elecdeer/storybook-addon-source-link/commit/73456277284a911cb02f18c80db31154552d6f8e) Thanks [@elecdeer](https://github.com/elecdeer)! - Improve static build detection using Storybook CONFIG_TYPE

  Replace NODE_ENV-based detection with more accurate Storybook-specific environment variables. This provides more reliable build environment detection and adds proper warning when CONFIG_TYPE is unavailable for better debugging.

- [#43](https://github.com/elecdeer/storybook-addon-source-link/pull/43) [`57bf147`](https://github.com/elecdeer/storybook-addon-source-link/commit/57bf1476c77748b84f58fd7405976fbd4839fbf4) Thanks [@elecdeer](https://github.com/elecdeer)! - chore: improve code quality and development tooling

  Enhance development experience and code quality with improved tooling:

  - Add lint and type-check scripts to e2e package for better development workflow
  - Format all files with Biome for consistent code style
  - Add serve dependency for static file serving during build tests
  - Update pnpm-lock.yaml with new dependencies for testing infrastructure

  These improvements provide better developer experience with consistent formatting, type checking, and linting capabilities across the project.

- [#43](https://github.com/elecdeer/storybook-addon-source-link/pull/43) [`57bf147`](https://github.com/elecdeer/storybook-addon-source-link/commit/57bf1476c77748b84f58fd7405976fbd4839fbf4) Thanks [@elecdeer](https://github.com/elecdeer)! - refactor: rename demo package to e2e for clarity

  Restructure the demo package to better reflect its primary purpose as an E2E testing environment:

  - Rename packages/demo directory to packages/e2e
  - Update package name from "demo" to "e2e" in package.json
  - Update root package.json scripts to reference e2e package
  - Update README.md documentation to use e2e path examples
  - Clean up old demo package directory after successful migration

  This change provides better semantic clarity as the package is primarily used for end-to-end testing of the addon functionality rather than just demonstration purposes.

- [#27](https://github.com/elecdeer/storybook-addon-source-link/pull/27) [`68fa677`](https://github.com/elecdeer/storybook-addon-source-link/commit/68fa6771e259a99f029104d4efe68fa1b2d56f25) Thanks [@elecdeer](https://github.com/elecdeer)! - Remove unused npm-run-all dependency from package.json

## 0.2.2

### Patch Changes

- [#15](https://github.com/elecdeer/storybook-addon-source-link/pull/15) [`ef91ce4`](https://github.com/elecdeer/storybook-addon-source-link/commit/ef91ce446ed8289fcda9c05032b4703202b7c59f) Thanks [@elecdeer](https://github.com/elecdeer)! - Replace path-browserify with @std/path for modern compatibility

  - Replace deprecated path-browserify with @std/path from JSR
  - Update pnpm to v10.13.1 for better JSR support
  - Improve TypeScript configuration for modern bundler workflow
  - Remove @types/path-browserify dependency
  - Move @std/path to devDependencies to ensure it gets bundled into the output

## 0.2.1

### Patch Changes

- [#12](https://github.com/elecdeer/storybook-addon-source-link/pull/12) [`adeb9e4`](https://github.com/elecdeer/storybook-addon-source-link/commit/adeb9e466ab63b93e5ae780bcfc598a539eeba66) Thanks [@elecdeer](https://github.com/elecdeer)! - Fixed a bug causing unintended removal of enviriment variables #11

## 0.2.0

### Minor Changes

- [#9](https://github.com/elecdeer/storybook-addon-source-link/pull/9) [`dc32316`](https://github.com/elecdeer/storybook-addon-source-link/commit/dc32316ed5291490c08481964230d41e0ef79d48) Thanks [@elecdeer](https://github.com/elecdeer)! - This addon supports not only Storybook ^8.2.0 but also ^8.0.0

- [#8](https://github.com/elecdeer/storybook-addon-source-link/pull/8) [`4f6367f`](https://github.com/elecdeer/storybook-addon-source-link/commit/4f6367f3a8972e466a234abbdcbe1f5553074a46) Thanks [@elecdeer](https://github.com/elecdeer)! - Add path utility functions

- [#6](https://github.com/elecdeer/storybook-addon-source-link/pull/6) [`5cf1933`](https://github.com/elecdeer/storybook-addon-source-link/commit/5cf1933c6dabb00cafca5161315bd871bae2ba5d) Thanks [@elecdeer](https://github.com/elecdeer)! - Add link type and support for clipboard-only links

This project adheres to [Semantic Versioning](https://semver.org/).

## 0.1.0

### Minor Changes

- [#3](https://github.com/elecdeer/storybook-addon-source-link/pull/3) [`9a57daa`](https://github.com/elecdeer/storybook-addon-source-link/commit/9a57daa08d7134308ef3994f9053f8d1045cb2ee) Thanks [@elecdeer](https://github.com/elecdeer)! - First release
