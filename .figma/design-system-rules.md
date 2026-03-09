# Design System Rules — UI Platform

> **Generated via**: `create_design_system_rules` (Figma MCP)
> **Last updated**: 2026-02-10

These rules tell AI tools how to translate Figma designs into code that matches this codebase.

---

## 1. Token Definitions

### Location
`packages/ui/src/tokens/` — shared across all apps

### Structure
```
tokens/
├── types.ts          # BrandConfig, ColorToken, BrandColors interfaces
├── theme.ts          # CSS variable generators (getBrandCSSVars, getBrandCSSString)
├── index.ts          # Re-exports + activeBrand
└── brands/
    ├── index.ts      # Brand registry, getBrand()
    ├── default.ts    # System fonts, slate/blue palette
    └── eu-d4d.ts     # Barlow font, EU blue palette
```

### Color Token Format
```typescript
interface ColorToken {
  hex: string;       // "#003399"
  hsl: string;       // "220 100% 30%" — NO hsl() wrapper
}
```

All colors stored as bare HSL values (`"220 100% 30%"`) to work with Tailwind's `hsl(var(--brand-*))` pattern.

### Brand Colors (10 tokens)
| Token | CSS Variable | Tailwind Class |
|-------|-------------|----------------|
| primary | `--brand-primary` | `text-brand-primary`, `bg-brand-primary` |
| primaryForeground | `--brand-primary-foreground` | `text-brand-primary-foreground` |
| secondary | `--brand-secondary` | `text-brand-secondary`, `bg-brand-secondary` |
| secondaryForeground | `--brand-secondary-foreground` | `text-brand-secondary-foreground` |
| accent | `--brand-accent` | `text-brand-accent`, `bg-brand-accent` |
| accentForeground | `--brand-accent-foreground` | `text-brand-accent-foreground` |
| neutral | `--brand-neutral` | `text-brand-neutral`, `bg-brand-neutral` |
| neutralForeground | `--brand-neutral-foreground` | `text-brand-neutral-foreground` |
| highlight | `--brand-highlight` | `text-brand-highlight`, `bg-brand-highlight` |
| highlightForeground | `--brand-highlight-foreground` | `text-brand-highlight-foreground` |

### shadcn/ui Semantic Tokens
| Token | CSS Variable | Purpose |
|-------|-------------|---------|
| background | `--background` | Page background |
| foreground | `--foreground` | Default text |
| primary | `--primary` | Primary buttons/links |
| secondary | `--secondary` | Secondary elements |
| muted | `--muted` | Muted backgrounds |
| accent | `--accent` | Hover states |
| destructive | `--destructive` | Error/danger |
| border | `--border` | Default borders |
| input | `--input` | Form input borders |
| ring | `--ring` | Focus rings |
| radius | `--radius` | Border radius base |
| chart-1..5 | `--chart-1` to `--chart-5` | Chart palette |

### Typography
```typescript
interface BrandTypography {
  font: {
    family: string[];       // ["Barlow"]
    fallback: string[];     // ["Arial", "system-ui", "sans-serif"]
    url?: string;           // Google Fonts URL
  };
  weights: {
    regular: 400;
    medium: 500;
    semibold: 600;
    bold: 700;
  };
}
```
- CSS variable: `--brand-font-family`
- Tailwind class: `font-brand`

### Brand Resolution
- Active brand set via `NEXT_PUBLIC_BRAND_ID` env var
- Applied via `data-brand` attribute on `<html>` element
- CSS overrides in `globals.css` → `[data-brand="eu-d4d"] { ... }`

---

## 2. Component Library

### Base: shadcn/ui
- **Style**: `new-york` (ai4su)
- **Primitives**: Radix UI for all interactive elements
- **Variants**: CVA (class-variance-authority)
- **Class merging**: `cn()` from `@/lib/utils` (clsx + tailwind-merge)

### Component Locations
| Type | Directory | Example |
|------|-----------|---------|
| UI primitives | `apps/{app}/src/components/ui/` | `button.tsx`, `card.tsx` |
| App components | `apps/{app}/src/components/` | `AppLayout.tsx`, `EmptyState.tsx` |
| Shell components | `apps/{app}/src/shell/components/` | `Header.tsx`, `Footer.tsx` |
| Feature components | `apps/{app}/src/features/{name}/components/` | Per-feature |
| Shared components | `packages/ui/src/components/` | `BrandProvider`, `BrandAttribution` |

### shadcn/ui Components Available (14)
Avatar, Badge, Button, Card, Collapsible, Dialog, DropdownMenu, Input, Label, Separator, Sheet, Skeleton, Table, Tabs

### App Components (6 core)
AppLayout, AppShell, Header, Footer, StepIndicator, EmptyState

### Component Pattern
```tsx
import { cn } from '@/lib/utils'

interface ComponentNameProps {
  className?: string
  // props...
}

export function ComponentName({ className, ...props }: ComponentNameProps) {
  return (
    <div className={cn('base-classes', className)} {...props}>
      {/* content */}
    </div>
  )
}
```

### CVA Variant Pattern
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  'base-classes shared-by-all-variants',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border bg-background',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

### cn() Utility
```typescript
// packages/ui/src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 3. Frameworks & Build

| App | Framework | Build | RSC |
|-----|-----------|-------|-----|
| ai4su | React 19 | Vite | No |

- **Package manager**: Bun workspaces
- **Monorepo**: `apps/*` + `packages/*`
- **TypeScript**: Strict mode, path alias `@/` → `src/`
- **Styling**: Tailwind CSS 4 with CSS custom properties
- **Animations**: `tailwindcss-animate` plugin

---

## 4. Asset Management

### Images
- **Format**: WebP/AVIF preferred (configured in `next.config.ts`)
- **Optimization**: `next/image` for Next.js apps, responsive `srcset`
- **Lazy loading**: Default behavior
- **Budget**: Max 500KB per image
- **Device sizes**: 640, 750, 828, 1080, 1200
- **Image sizes**: 16, 32, 48, 64, 96

### Logos
Defined in `BrandConfig.logos` (primary, secondary, partners arrays). Currently placeholder divs — asset files not yet added.

### Low-Data Constraints
- No heavy animations (Tailwind transitions only)
- Lazy-load images with responsive srcset
- Analytics budget: <10KB
- Code-split by route/feature

---

## 5. Icon System

### Library: lucide-react (exclusively)

### Import Pattern
```tsx
import { Check, ArrowRight, Menu, X } from 'lucide-react'
```

### Sizing Convention
| Size | Classes | Pixels | Usage |
|------|---------|--------|-------|
| Small | `w-3 h-3` | 12px | Badges, indicators |
| Default | `w-4 h-4` | 16px | Buttons, inline |
| Medium | `w-5 h-5` | 20px | List items, cards |
| Large | `w-6 h-6` | 24px | Mobile menu, headers |

### Usage
```tsx
<Check className="w-3 h-3" strokeWidth={2.5} />
<ArrowRight className="w-4 h-4 mr-2" />
<Menu className="h-6 w-6" />
```

### Optimization
```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ['lucide-react'],
}
```

---

## 6. Styling Approach

### CSS Methodology
- Tailwind CSS 4 utility-first
- CSS custom properties for theming (brand + shadcn/ui semantic)
- No CSS Modules, no Styled Components

### Global Styles Location
| App | File |
|-----|------|
| ai4su | `apps/ai4su/src/index.css` |

### CSS Variable Layers
```css
@layer base {
  :root {
    /* shadcn/ui semantic tokens (light) */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... */

    /* Brand tokens (default) */
    --brand-primary: 222 47% 17%;
    --brand-font-family: system-ui, -apple-system, sans-serif;
  }

  .dark {
    /* Dark mode overrides */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }

  [data-brand="eu-d4d"] {
    --brand-primary: 220 100% 30%;
    --brand-secondary: 220 43% 73%;
    --brand-accent: 45 91% 56%;
    --brand-neutral: 27 18% 83%;
    --brand-font-family: "Barlow", Arial, system-ui, sans-serif;
  }
}
```

### Responsive Design
- Mobile-first breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Grid: `grid grid-cols-1 gap-8 md:grid-cols-4`

### Dark Mode
- Class-based: `.dark` on root element
- Tailwind: `dark:` prefix
- Toggle: ThemeToggle component

### Tailwind Config Extension
```javascript
// packages/config/tailwind/index.js
colors: {
  brand: {
    primary: {
      DEFAULT: 'hsl(var(--brand-primary))',
      foreground: 'hsl(var(--brand-primary-foreground))',
    },
    secondary: { DEFAULT: '...', foreground: '...' },
    accent: { DEFAULT: '...', foreground: '...' },
    neutral: { DEFAULT: '...', foreground: '...' },
    highlight: { DEFAULT: '...', foreground: '...' },
  },
},
fontFamily: {
  brand: 'var(--brand-font-family)',
},
borderRadius: {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
},
```

---

## 7. Project Structure

```
UI_platform/
├── apps/
│   ├── web/                    # Next.js 15 — main website
│   │   ├── app/                # App router pages
│   │   ├── components/         # App components + ui/
│   │   └── tailwind.config.ts
│   ├── ai4su/                  # Vite + React — design tool
│   │   ├── src/components/     # App components + ui/
│   │   ├── src/shell/          # Shell (Header, Footer, etc.)
│   │   └── src/features/       # Feature-based organization
├── packages/
│   ├── ui/                     # Shared: tokens, brand, analytics, cn()
│   ├── config/                 # Tailwind base config, tsconfigs
│   ├── types/                  # Shared TypeScript types
│   ├── utils/                  # Shared utilities
│   └── infra/                  # Cloud Run Pulumi infrastructure
├── .figma/
│   └── design-system-rules.md  # This file
└── standards/
    └── analytics.md            # Analytics implementation guide
```

---

## 8. Code Generation Rules

When generating code from Figma designs:

### Always
- Import from `@/components/ui/` for shadcn/ui primitives
- Use `cn()` from `@/lib/utils` for class merging
- Use `lucide-react` for icons (never other icon libraries)
- Use CSS variables (`var(--brand-primary)`) or Tailwind brand classes — never hardcoded colors
- Use Radix UI primitives for interactive elements (accessibility)
- Include `className?: string` prop for component override
- Use TypeScript with explicit interface for props

### Never
- Inline hex/rgb color values
- Add new npm dependencies without approval
- Use icon libraries other than lucide-react
- Use CSS Modules or styled-components
- Skip loading/empty/error states for data-driven components
- Hardcode brand-specific values — use BrandConfig via CSS variables

### Prefer
- Tailwind utility classes over custom CSS
- Mobile-first responsive breakpoints
- Semantic shadcn/ui tokens (`bg-primary`) over brand tokens (`bg-brand-primary`) for UI chrome
- Brand tokens (`bg-brand-primary`) for brand-specific elements (headers, CTAs, attribution)
- CVA for components with multiple variants
- `data-slot` attributes on compound component parts

---

## 9. Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Components | PascalCase | `UserProfileCard.tsx` |
| Props interfaces | PascalCase + Props | `UserProfileCardProps` |
| Props | camelCase | `onSubmit`, `isLoading` |
| Utility files | kebab-case | `user-profile-card.tsx` |
| CSS variables | kebab-case | `--brand-primary` |
| Tailwind classes | kebab-case | `text-brand-primary` |
| Directories | kebab-case | `components/ui/` |

---

## 10. Accessibility Requirements

- All interactive elements must use Radix UI primitives
- Focus management via Radix (no custom focus traps)
- Color contrast: WCAG AA minimum
- Keyboard navigation for all interactive components
- Semantic HTML elements (`<nav>`, `<main>`, `<header>`, `<footer>`)
- `aria-label` for icon-only buttons
- `role` attributes where semantic HTML insufficient
