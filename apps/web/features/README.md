# Features

Feature-specific code organized by domain.

## Structure

Each feature should be self-contained with its own:
- Components
- Hooks
- Types
- API calls (if applicable)

Example:
```
features/
  auth/
    components/
    hooks/
    types.ts
    api.ts
  dashboard/
    ...
```

## Guidelines

- Code-split features to reduce initial bundle size
- Keep feature boundaries clear
- Export only what's needed by other features
