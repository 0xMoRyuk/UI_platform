# @ui-platform/config

Shared configuration files for TypeScript, Tailwind CSS, and ESLint across all apps.

## Usage

### TypeScript

```json
// In your app's tsconfig.json
{
  "extends": "@ui-platform/config/tsconfig/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Available configs:
- `tsconfig/base.json` - Base TypeScript configuration
- `tsconfig/nextjs.json` - Next.js specific configuration
- `tsconfig/react.json` - React-only configuration

### Tailwind CSS

```javascript
// In your app's tailwind.config.ts
import baseConfig from "@ui-platform/config/tailwind";

export default {
  ...baseConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
```

## Guidelines

- Keep configurations minimal and focused
- Document any deviations from defaults
- Version changes carefully (affects all apps)
