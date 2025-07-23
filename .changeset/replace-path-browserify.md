---
"storybook-addon-source-link": patch
---

Replace path-browserify with @std/path for modern compatibility

- Replace deprecated path-browserify with @std/path from JSR
- Update pnpm to v10.13.1 for better JSR support  
- Improve TypeScript configuration for modern bundler workflow
- Remove @types/path-browserify dependency
- Move @std/path to devDependencies to ensure it gets bundled into the output
