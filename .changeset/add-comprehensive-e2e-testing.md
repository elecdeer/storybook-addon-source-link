---
"storybook-addon-source-link": minor
---

feat: add comprehensive E2E testing with Playwright

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