# @ui-platform/ui

Shared UI components and design system for UI Platform apps.

## Structure

- `src/components/` - Reusable UI components (shadcn/ui compatible)
- `src/lib/` - Utility functions (cn, etc.)

## Usage

```typescript
// In your app
import { Button } from "@ui-platform/ui/components/button";
import { cn } from "@ui-platform/ui";
```

## Adding shadcn/ui Components

When adding shadcn/ui components, add them to this package so all apps can use them:

```bash
# From the root directory
cd packages/ui
bunx shadcn@latest add button

# Then export in src/index.ts
# export * from "./components/button";
```

## Guidelines

- All components should be framework-agnostic where possible
- Follow low-data principles (lazy loading, minimal bundle size)
- Include TypeScript types
- Document complex components
