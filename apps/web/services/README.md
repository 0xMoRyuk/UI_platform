# Services

API clients, data fetching logic, and external service integrations.

## Guidelines

- Centralize API calls here
- Implement proper error handling
- Use Next.js Server Actions or API routes when appropriate
- Cache responses where possible
- Respect low-data mode settings
- Return job_id for async operations

## Structure

```typescript
// Example: services/api.ts
export const apiClient = {
  get: async <T>(url: string) => {...},
  post: async <T>(url: string, data: any) => {...},
};
```
