# Brand & Design Tokens

This project uses a **brand-agnostic design token system** that supports multiple brand guidelines (EU, AU, custom, etc.) without code changes.

## Architecture

```
packages/ui/src/tokens/
├── index.ts              # Barrel export
├── types.ts              # Brand-agnostic interfaces
├── theme.ts              # Active brand resolver + utilities
└── brands/
    ├── index.ts          # Brand registry
    ├── default.ts        # System fonts, neutral colors (fallback)
    └── eu-d4d.ts         # EU Data Governance in Africa
```

## Available Brands

| Brand ID | Name | Source |
|----------|------|--------|
| `default` | UI Platform | System fonts, neutral palette |
| `eu-d4d` | EU Data Governance in Africa | D4D Hub Visibility Guidelines |

## Configuration

Set brand via environment variable:

```bash
# .env.local
NEXT_PUBLIC_BRAND_ID=eu-d4d
```

The brand is applied via `data-brand` attribute on `<html>`:

```tsx
// apps/web/app/layout.tsx
import { getBrandHtmlProps } from "@ui-platform/ui";

<html lang="en" {...getBrandHtmlProps()}>
```

## Tailwind Usage

Use semantic `brand-*` classes instead of hardcoded colors:

```tsx
// Good - brand-agnostic
<div className="bg-brand-primary text-brand-primary-foreground">
  <span className="text-brand-accent">Accent</span>
  <span className="bg-brand-highlight">Highlight</span>
</div>

// Avoid - brand-specific
<div className="bg-blue-900 text-white">
```

## Available Brand Colors

| Token | Tailwind Class | CSS Variable |
|-------|---------------|--------------|
| Primary | `bg-brand-primary` | `--brand-primary` |
| Primary Foreground | `text-brand-primary-foreground` | `--brand-primary-foreground` |
| Secondary | `bg-brand-secondary` | `--brand-secondary` |
| Accent | `bg-brand-accent` | `--brand-accent` |
| Neutral | `bg-brand-neutral` | `--brand-neutral` |
| Highlight | `bg-brand-highlight` | `--brand-highlight` |

## Components

```tsx
import { BrandAttribution, BrandLogoBar } from "@ui-platform/ui";

// Footer with attribution text
<BrandAttribution variant="full" showLogos />

// Logo bar for headers
<BrandLogoBar logos="primary" />
```

## Accessing Brand Config

```tsx
import { activeBrand, brands, getBrandAttribution } from "@ui-platform/ui";

// Active brand (from env)
console.log(activeBrand.name);
console.log(activeBrand.colors.primary.hex);

// Specific brand
const euBrand = brands["eu-d4d"];

// Get attribution text
const text = getBrandAttribution(activeBrand, "short");
```

## Adding a New Brand

1. **Create brand file** `packages/ui/src/tokens/brands/new-brand.ts`:

```typescript
import type { BrandConfig } from "../types";

export const newBrand: BrandConfig = {
  id: "new-brand",
  name: "New Brand Name",
  colors: {
    primary: { hex: "#003399", hsl: "220 100% 30%" },
    primaryForeground: { hex: "#FFFFFF", hsl: "0 0% 100%" },
    // ... other colors
  },
  typography: {
    font: {
      family: ["CustomFont"],
      fallback: ["system-ui", "sans-serif"],
      url: "https://fonts.googleapis.com/css2?family=CustomFont&display=swap",
    },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  attribution: {
    short: "Funded by ...",
    full: "Funded by ... Implemented by ...",
  },
  // logos, social, badge - optional
};
```

2. **Register in registry** `packages/ui/src/tokens/brands/index.ts`:

```typescript
import { newBrand } from "./new-brand";

export const brands = {
  default: defaultBrand,
  "eu-d4d": euD4DBrand,
  "new-brand": newBrand,  // Add here
} as const;
```

3. **Add CSS variables** in `apps/web/app/globals.css`:

```css
[data-brand="new-brand"] {
  --brand-primary: 220 100% 30%;
  --brand-primary-foreground: 0 0% 100%;
  /* ... other variables */
  --brand-font-family: "CustomFont", system-ui, sans-serif;
}
```

4. **Set environment variable**:

```bash
NEXT_PUBLIC_BRAND_ID=new-brand
```

## EU D4D Brand Details

The `eu-d4d` brand implements the **EU Visibility Guidelines**:

| Color | Hex | Token | Usage |
|-------|-----|-------|-------|
| Dark Blue | `#003399` | `brand-primary` | Headers, links, primary actions |
| Light Blue | `#9BB1DC` | `brand-secondary` | Backgrounds, supporting elements |
| Yellow | `#F5CE2A` | `brand-accent` | CTAs, highlights, focus rings |
| Sand | `#DBD2CC` | `brand-neutral` | Subtle backgrounds, borders |

**Typography:** Barlow (Google Fonts) with Arial fallback

**Required Attribution:**
- Short: "Funded by the European Union"
- Full: Includes all member states and implementing partners

**Logos:** Global Gateway, EU Flag, African Union (primary), plus member state and partner logos

**Social:** `#D4DataGOV` `#DataGovernanceAfrica` `#TeamEurope` `#GlobalGateway`
