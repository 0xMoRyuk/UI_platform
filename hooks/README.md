# Hooks

Shared React hooks used across multiple features.

## Guidelines

- Use TypeScript for parameter and return types
- Consider data usage impact for hooks that fetch data
- Include proper error handling
- Document complex hooks with JSDoc comments

## Examples

- `useDataMode()` - Detect and respect low-data mode
- `useOfflineStatus()` - Track online/offline state
- `useOptimisticUpdate()` - Optimistic UI updates
