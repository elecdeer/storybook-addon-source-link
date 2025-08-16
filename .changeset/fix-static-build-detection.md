---
"storybook-addon-source-link": patch
---

Improve static build detection using Storybook CONFIG_TYPE

Replace NODE_ENV-based detection with more accurate Storybook-specific environment variables. This provides more reliable build environment detection and adds proper warning when CONFIG_TYPE is unavailable for better debugging.