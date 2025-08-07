---
"storybook-addon-source-link": major
---

feat: migrate to Storybook v9

This change updates the addon to support Storybook v9, which introduces several breaking changes:

- Updated peer dependency to require Storybook ^9.0.0
- Migrated demo package structure and configuration
- Updated all internal imports to use new Storybook v9 APIs
- Reorganized demo stories to follow new structure
- Updated dependencies and build configuration for compatibility

BREAKING CHANGE: This addon now requires Storybook v9 or later. Projects using older versions of Storybook will need to upgrade.