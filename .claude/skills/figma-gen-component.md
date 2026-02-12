# /figma-gen-component

Generate a React component from a Figma frame selection, reusing existing shadcn/ui primitives and design tokens.

## Prerequisites

- Figma desktop app must be running with a frame selected
- Dev Mode must be enabled (Inspect panel > Enable MCP)
- The `figma-desktop` MCP server must be connected

## Workflow

1. **Read selection** — Call `get_design_context` on the current Figma selection to get the frame's structure, styles, and layout

2. **Resolve existing components** — Check `.figma/design-system-rules.md` for the component library inventory (Section 2). Match Figma layer names against the 14 shadcn/ui primitives and 6 app components listed there. Reuse existing components instead of generating new code.

3. **Generate component** — Create a React + TypeScript component that:
   - Reuses existing shadcn/ui components from `@/components/ui/`
   - Uses `cn()` from `@/lib/utils` for class merging
   - Uses `lucide-react` for icons
   - References CSS variables (`--brand-*` or Tailwind theme) instead of hardcoded colors
   - Follows the project's naming conventions (PascalCase components, camelCase props, kebab-case files)
   - Uses Radix UI primitives for interactive elements (accessibility)

4. **Place the file** — Determine the correct directory based on component type:

   | Type | Directory |
   |------|-----------|
   | UI primitive | `apps/ai4su/src/components/ui/` |
   | App component | `apps/ai4su/src/components/` |
   | Shell component | `apps/ai4su/src/shell/components/` |
   | Feature component | `apps/ai4su/src/features/{feature}/components/` |

5. **Update exports** — If the component is a UI primitive, check if a barrel export exists and update it

## Component Library

| Component | File | Package |
|-----------|------|---------|
| Avatar | `components/ui/avatar.tsx` | shadcn/ui |
| Badge | `components/ui/badge.tsx` | shadcn/ui |
| Button | `components/ui/button.tsx` | shadcn/ui |
| Card | `components/ui/card.tsx` | shadcn/ui |
| Collapsible | `components/ui/collapsible.tsx` | shadcn/ui |
| Dialog | `components/ui/dialog.tsx` | shadcn/ui |
| DropdownMenu | `components/ui/dropdown-menu.tsx` | shadcn/ui |
| Input | `components/ui/input.tsx` | shadcn/ui |
| Label | `components/ui/label.tsx` | shadcn/ui |
| Separator | `components/ui/separator.tsx` | shadcn/ui |
| Sheet | `components/ui/sheet.tsx` | shadcn/ui |
| Skeleton | `components/ui/skeleton.tsx` | shadcn/ui |
| Table | `components/ui/table.tsx` | shadcn/ui |
| Tabs | `components/ui/tabs.tsx` | shadcn/ui |
| AppShell | `shell/components/AppShell.tsx` | App |
| EmptyState | `components/EmptyState.tsx` | App |
| Footer | `shell/components/Footer.tsx` | App |
| Header | `shell/components/Header.tsx` | App |
| HeroSection | `sections/home/components/HeroSection.tsx` | App |
| StepIndicator | `components/StepIndicator.tsx` | App |

## Generation Rules

- **Always** import from `@/components/ui/` for shadcn/ui primitives
- **Always** use `cn()` from `@/lib/utils` for conditional classes
- **Always** use `lucide-react` for icons (never other icon libraries)
- **Never** inline colors — use CSS variables (`var(--brand-primary)`) or Tailwind theme classes
- **Never** add new npm dependencies without explicit approval
- **Never** hardcode brand-specific values — use BrandConfig via CSS custom properties
- **Prefer** Tailwind utility classes over custom CSS
- **Prefer** responsive design with mobile-first breakpoints
- **Include** loading, empty, and error states for data-driven components

## Component Template

```tsx
import { cn } from '@/lib/utils'

interface ComponentNameProps {
  className?: string
}

export function ComponentName({ className }: ComponentNameProps) {
  return (
    <div className={cn('', className)}>
      {/* Component content */}
    </div>
  )
}
```

## Link-Based Workflow

If the user provides a Figma link instead of using selection:
1. Extract the `node-id` from the URL
2. Call `get_design_context` with the extracted node reference
3. Follow the same generation flow

## Validation

After generating a component:
1. Run `bunx tsc --noEmit` to verify the component compiles
2. Verify all imports resolve correctly
3. Check that no hardcoded colors exist (grep for hex values)
4. Confirm accessibility: interactive elements use Radix primitives

## Screenshot Comparison (Optional)

If layout fidelity is important:
1. Call `get_screenshot` on the Figma frame
2. Compare the screenshot visually with the rendered component
3. Adjust spacing/layout if significant differences exist

## Example

```
User: /figma-gen-component
Claude: Reading Figma selection...
  Frame: "UserProfileCard" (480x320)
  Detected components: Avatar, Badge, Button (from @/components/ui/)

  Generating apps/ai4su/src/components/UserProfileCard.tsx...

  Generated component:
  - Reuses: Avatar, Badge, Button from @/components/ui/
  - Icons: User, Mail from lucide-react
  - Props: { user: UserProfile, onEdit?: () => void }
  - Responsive: sm/md/lg breakpoints

  Typecheck passed.
```
