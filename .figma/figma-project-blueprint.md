# Figma Project Blueprint — AI4SU Vitrine Design System

> **Purpose**: Comprehensive spec for building the AI4SU Figma project optimized for MCP consumption with Claude Code
> **Audience**: Design team, design system maintainers
> **Date**: 2026-02-12
> **Replaces**: `mcp-readiness-guide.md` (board audit remediation)

---

## Page Structure

The Figma file is organized into 6 pages, each optimized for a specific MCP tool:

| Page | Content | MCP Tool |
|------|---------|----------|
| **Cover** | Project title, version, EU attribution | `get_screenshot` |
| **Tokens** | Color swatches, typography specimens bound to Variables | `get_variable_defs` |
| **Components** | Component sets with variant properties | `get_design_context` |
| **Patterns** | Compound layouts: Hero, Card grid, Form, Nav, Footer | `get_design_context` |
| **Vitrine Screens** | Full-page AI4SU showcase screens | `get_design_context` + `get_screenshot` |
| **Specifications** | Spacing rules, grid system, responsive breakpoints | `get_metadata` |

---

## Variable Collection: "Brand" (26 variables)

### Colors (20 variables — 10 pairs from `eu-d4d.ts`)

| Figma Variable | Value | BrandConfig Field |
|----------------|-------|-------------------|
| `Colors/Primary` | `#003399` | `colors.primary` |
| `Colors/Primary Foreground` | `#FFFFFF` | `colors.primaryForeground` |
| `Colors/Secondary` | `#9BB1DC` | `colors.secondary` |
| `Colors/Secondary Foreground` | `#003399` | `colors.secondaryForeground` |
| `Colors/Accent` | `#F5CE2A` | `colors.accent` |
| `Colors/Accent Foreground` | `#000000` | `colors.accentForeground` |
| `Colors/Neutral` | `#DBD2CC` | `colors.neutral` |
| `Colors/Neutral Foreground` | `#000000` | `colors.neutralForeground` |
| `Colors/Highlight` | `#F5CE2A` | `colors.highlight` |
| `Colors/Highlight Foreground` | `#000000` | `colors.highlightForeground` |

### Typography (6 variables)

| Figma Variable | Value | BrandConfig Field |
|----------------|-------|-------------------|
| `Typography/Font Family` | `Barlow` | `typography.font.family[0]` |
| `Typography/Font URL` | `https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap` | `typography.font.url` |
| `Typography/Weights/Regular` | `400` | `typography.weights.regular` |
| `Typography/Weights/Medium` | `500` | `typography.weights.medium` |
| `Typography/Weights/Semibold` | `600` | `typography.weights.semibold` |
| `Typography/Weights/Bold` | `700` | `typography.weights.bold` |

> **Note**: Spacing/Radius variables may be included for designer reference only. The `/figma-sync-tokens` skill skips them — they don't vary per brand.

---

## Variable Collection: "Semantic" (Light/Dark modes)

Reference-only — NOT synced by `/figma-sync-tokens`. These are shadcn/ui theme tokens managed in CSS. They exist in Figma so `get_design_context` generates correct variable references.

| Variable | Light | Dark |
|----------|-------|------|
| `Background` | `#FAFAF9` | `#1C1917` |
| `Foreground` | `#1C1917` | `#FAFAF9` |
| `Card` | `#FFFFFF` | `#292524` |
| `Muted` | `#F5F5F4` | `#44403C` |
| `Border` | `#E7E5E4` | `#57534E` |
| `Destructive` | `#EF4444` | `#F87171` |

---

## Component Sets (20 total)

Each as a Figma **component set** with variant properties. Variant values must match CVA enum values exactly.

### shadcn/ui Primitives (14)

| Component | Variant Properties | Notes |
|-----------|-------------------|-------|
| **Button** | `Variant`: default/destructive/outline/secondary/ghost/link, `Size`: default/sm/lg/icon | |
| **Input** | `Size`: default/sm/lg, `State`: default/focus/error/disabled | |
| **Badge** | `Variant`: default/secondary/destructive/outline | |
| **Card** | — | Sub-components: CardHeader, CardContent, CardFooter, CardTitle, CardDescription |
| **Tabs** | `Variant`: default/outline, `State`: active/inactive | |
| **Avatar** | — | |
| **Dialog** | — | |
| **Sheet** | — | |
| **Table** | — | |
| **Skeleton** | — | |
| **Separator** | — | |
| **DropdownMenu** | — | |
| **Collapsible** | — | |
| **Label** | — | |

### App Components (6)

| Component | Variant Properties | Notes |
|-----------|-------------------|-------|
| **Header** | `State`: default/mobile-open | |
| **Footer** | — | EU attribution, partner logos, social links |
| **AppShell** | — | |
| **StepIndicator** | — | |
| **EmptyState** | — | |
| **HeroSection** | — | |

---

## Vitrine Screens (5 screens)

| Screen | Sections | Brand Showcase |
|--------|----------|----------------|
| **HomeScreen** | Hero, KPIGrid, ToolboxHighlight, SectionPreviews | Primary gradient, accent CTAs, all weights |
| **ToolboxScreen** | SearchBar, Filters, ModelGrid, ModelDetail | Secondary badges, neutral borders, accent active |
| **HackathonsScreen** | CountryFilter, EventGrid, EventDetail | Country badges, primary headers |
| **EcosystemScreen** | Map, ActivityList, WomenFounders, Testimonials | Full palette, data viz placeholders |
| **PartnersScreen** | Funders, ImplementingPartners, SocialLinks | Logo placement rules, EU attribution (PROTO-034) |

---

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Component sets | PascalCase | `Button`, `ModelCard` |
| Variant properties | PascalCase | `Variant`, `Size`, `State` |
| Variant values | lowercase | `default`, `sm`, `outline` |
| Layers | PascalCase | `Button/Label`, `Card/Header/Title` |
| Variable paths | Title Case, slash-separated | `Colors/Primary Foreground` |
| Screen frames | PascalCase + Screen suffix | `HomeScreen`, `ToolboxScreen` |

**Prohibited**: Chinese layer names, generic "Frame 1"/"Group 2", hardcoded hex in fills/strokes.

---

## MCP Validation Sequence

Run these checks after building the Figma file to verify MCP readiness:

1. **Variables**: `get_variable_defs` → verify 20+ Brand variables (expected: 20 color + 6 typography = 26 total)
2. **Structure**: `get_metadata` → verify component sets match the 20 listed above
3. **Code gen**: `get_design_context` on Button → verify output contains variable references (not hardcoded hex)
4. **Token sync**: `/figma-sync-tokens` → verify clean diff against `eu-d4d.ts`
5. **Screenshot**: `get_screenshot` on HomeScreen → verify brand colors render correctly
