# /figma-sync-tokens

Sync design tokens from Figma variables to BrandConfig TypeScript files.

## Prerequisites

- Figma desktop app must be running with the target file open
- Dev Mode must be enabled (Inspect panel > Enable MCP)
- The `figma-desktop` MCP server must be connected (`claude mcp list` shows it healthy)

## Workflow

1. **Extract variables** — Call `get_variable_defs` on the current Figma file selection to read all defined variables (colors, typography, spacing)

2. **Map to BrandConfig** — Transform Figma variables to the `BrandConfig` TypeScript interface:

   | Figma Variable Collection | BrandConfig Field | Format |
   |---------------------------|-------------------|--------|
   | `Colors/Primary` | `colors.primary` | `{ hex, hsl }` |
   | `Colors/Primary Foreground` | `colors.primaryForeground` | `{ hex, hsl }` |
   | `Colors/Secondary` | `colors.secondary` | `{ hex, hsl }` |
   | `Colors/Secondary Foreground` | `colors.secondaryForeground` | `{ hex, hsl }` |
   | `Colors/Accent` | `colors.accent` | `{ hex, hsl }` |
   | `Colors/Accent Foreground` | `colors.accentForeground` | `{ hex, hsl }` |
   | `Colors/Neutral` | `colors.neutral` | `{ hex, hsl }` |
   | `Colors/Neutral Foreground` | `colors.neutralForeground` | `{ hex, hsl }` |
   | `Colors/Highlight` | `colors.highlight` | `{ hex, hsl }` |
   | `Colors/Highlight Foreground` | `colors.highlightForeground` | `{ hex, hsl }` |
   | `Typography/Font Family` | `typography.font.family` | `string[]` |
   | `Typography/Font URL` | `typography.font.url` | Google Fonts URL |
   | `Typography/Weights/*` | `typography.weights` | `{ regular, medium, semibold, bold }` |

3. **Update target file** — Write changes to `packages/ui/src/tokens/brands/eu-d4d.ts` (or the brand file matching the current Figma variable collection)

4. **Report diff** — Show a summary of what changed:
   - Color changes (old hex → new hex)
   - New tokens added
   - Tokens removed
   - Typography changes

## Color Format Conversion

Figma variables provide hex values. Convert to HSL for the `hsl` field:
- Parse hex to RGB
- Convert RGB to HSL
- Format as `"H S% L%"` (without `hsl()` wrapper, matching existing convention)

## Target Files

| Brand | File |
|-------|------|
| EU D4D | `packages/ui/src/tokens/brands/eu-d4d.ts` |
| Default | `packages/ui/src/tokens/brands/default.ts` |

For new brands, create a new file in `packages/ui/src/tokens/brands/` following the `BrandConfig` interface and register it in `brands/index.ts`.

## Validation

After updating tokens:
1. Run `bunx tsc --noEmit` in the affected app to verify type correctness
2. Verify the `BrandConfig` interface is satisfied (all required fields present)
3. Report any missing variable mappings (Figma variables that don't map to BrandConfig fields)

## Example

```
User: /figma-sync-tokens
Claude: Reading Figma variables from current selection...
  Found 10 color variables, 3 typography variables
  Updating packages/ui/src/tokens/brands/eu-d4d.ts...

  Changes:
    colors.primary.hex: #003399 → #003399 (unchanged)
    colors.accent.hex: #F5CE2A → #F7D033 (updated)
    typography.weights.bold: 700 → 800 (updated)

  Typecheck passed.
```
