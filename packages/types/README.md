# @ui-platform/types

Shared TypeScript types and interfaces for UI Platform.

## Structure

- `src/common.ts` - Common domain types (User, PaginatedResponse, etc.)
- `src/api.ts` - API request/response types
- Add more type modules as needed

## Usage

```typescript
import type { User, ApiResponse } from "@ui-platform/types";
import type { AsyncJobResponse } from "@ui-platform/types/api";

const user: User = {
  id: "1",
  email: "user@example.com",
  name: "John Doe",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

## Guidelines

- Keep types pure (no runtime code)
- Document complex types with JSDoc
- Use discriminated unions for state machines
- Avoid `any` - use `unknown` when type is truly unknown
- Export type-only with `export type` where applicable
