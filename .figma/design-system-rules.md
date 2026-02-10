# Design System Rules — UI Platform

> **Generated via**: `create_design_system_rules` (Figma MCP)
> **Status**: Placeholder — regenerate with Figma MCP connected

These rules tell Claude how to translate Figma designs into code that matches the existing codebase.

## Runtime & Build

- **Runtime**: Bun
- **Framework**: React 19 + TypeScript
- **Build**: Vite (ai4su), Next.js 15 (web)
- **Package manager**: Bun workspaces

## Styling

- **CSS framework**: Tailwind CSS 4 with CSS custom properties
- **Brand tokens**: `--brand-*` prefix via BrandProvider
- **Color space**: OKLch for app theme, HSL for brand tokens
- **Component variants**: CVA (class-variance-authority)
- **Class merging**: `cn()` from `@/lib/utils` (clsx + tailwind-merge)

## Component Library

- **Base**: shadcn/ui (new-york style)
- **Location**: `@/components/ui/` (app-local, not shared package)
- **Primitives**: Radix UI for all interactive elements
- **Icons**: `lucide-react` exclusively
- **Import alias**: `@/` = `src/`

## Naming Conventions

- **Components**: PascalCase (`UserProfileCard.tsx`)
- **Props**: camelCase (`onSubmit`, `isLoading`)
- **Files**: kebab-case (`user-profile-card.tsx`) for utils, PascalCase for components
- **CSS variables**: kebab-case (`--brand-primary`)

## Accessibility

- All interactive elements must use Radix UI primitives
- Focus management via Radix (no custom focus traps)
- Color contrast ratios must meet WCAG AA
- Keyboard navigation for all interactive components

## Low-Data Constraints

- No heavy animations (prefer Tailwind transitions)
- Lazy-load images with responsive srcset
- Analytics budget: <10KB
- Code-split by route/feature
- Bundle budgets enforced

## When to Regenerate

Run `create_design_system_rules` via Figma MCP when:
- New component patterns are added to Figma
- Design system conventions change
- New apps are added to the monorepo
