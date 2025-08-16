---
"storybook-addon-source-link": patch
---

refactor: rename demo package to e2e for clarity

Restructure the demo package to better reflect its primary purpose as an E2E testing environment:

- Rename packages/demo directory to packages/e2e
- Update package name from "demo" to "e2e" in package.json
- Update root package.json scripts to reference e2e package
- Update README.md documentation to use e2e path examples
- Clean up old demo package directory after successful migration

This change provides better semantic clarity as the package is primarily used for end-to-end testing of the addon functionality rather than just demonstration purposes.