# @ui-platform/utils

Shared utility functions for UI Platform apps.

## Modules

### Format Utilities (`format.ts`)
- `formatBytes()` - Convert bytes to human-readable format
- `formatRelativeTime()` - Format dates as relative time
- `truncate()` - Truncate text with ellipsis

### Network Utilities (`network.ts`)
- `getConnectionQuality()` - Detect connection speed
- `shouldUseLowDataMode()` - Auto-detect or read low-data preference
- `debounce()` - Debounce function calls

### Validation Utilities (`validation.ts`)
- `isValidEmail()` - Email validation
- `isValidUrl()` - URL validation
- `sanitizeString()` - Basic XSS prevention

## Usage

```typescript
import { formatBytes, getConnectionQuality } from "@ui-platform/utils";

// Show data usage to user
const dataUsed = formatBytes(1234567); // "1.18 MB"

// Detect connection and adapt UX
if (getConnectionQuality() === "low") {
  // Show low-data mode prompt
}
```

## Guidelines

- Keep functions pure (no side effects where possible)
- Optimize for tree-shaking
- Document complex logic
- Add tests for critical utilities
