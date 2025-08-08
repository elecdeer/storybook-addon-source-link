# storybook-addon-source-link

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

### Patch Changes

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
