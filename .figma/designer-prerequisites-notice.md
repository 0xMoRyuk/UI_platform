# Designer Notice — Figma Prerequisites for AI Code Generation

> **For**: Design team
> **Date**: 2026-02-12
> **Deep dive**: See [mcp-readiness-guide.md](./mcp-readiness-guide.md) for the full technical reference

---

## What is MCP?

We use an AI assistant (Claude) that reads your Figma file directly to generate production-ready React code. It pulls colors from your Variables panel, reads component sets to understand variants, and generates code that matches your design — but **only if the file is structured correctly**. The closer your Figma file follows these guidelines, the better the generated code will be.

---

## Current State — 3 Blockers

| # | Problem | Impact |
|---|---------|--------|
| 1 | **Wrong brand palette** — Components use TapTap teal (`#15c5ce`) instead of EU D4D blue/yellow/sand | AI generates code with wrong colors; every component needs manual fixing |
| 2 | **Missing variables** — Only 3 defined, we need 16 | AI can't read design tokens; token sync is blocked entirely |
| 3 | **Fragmented components** — Variants are separate frames instead of component sets | AI generates code for one variant at a time, missing the variant structure |

> **Bottom line**: Until these three are resolved, AI code generation produces output that needs heavy manual rework.

---

## Brand Color Reference

These are the official EU D4D brand colors. All values come from the approved brand configuration.

| Color Name | Hex | Swatch | Usage |
|-----------|-----|--------|-------|
| **Primary** | `#003399` | 🔵 Dark Blue | Headers, links, primary buttons |
| **Primary Foreground** | `#FFFFFF` | ⬜ White | Text on primary backgrounds |
| **Secondary** | `#9BB1DC` | 🔵 Light Blue | Supporting elements, backgrounds |
| **Secondary Foreground** | `#003399` | 🔵 Dark Blue | Text on secondary backgrounds |
| **Accent** | `#F5CE2A` | 🟡 Yellow | CTAs, highlights, focus rings |
| **Accent Foreground** | `#000000` | ⬛ Black | Text on accent backgrounds |
| **Neutral** | `#DBD2CC` | 🟤 Sand | Subtle backgrounds, borders |
| **Neutral Foreground** | `#000000` | ⬛ Black | Text on neutral backgrounds |
| **Highlight** | `#F5CE2A` | 🟡 Yellow | Emphasis, callouts |
| **Highlight Foreground** | `#000000` | ⬛ Black | Text on highlight backgrounds |

**Typography**: Barlow from Google Fonts — weights 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold).

---

## Variable Checklist

Open the **Variables** panel in Figma (bottom of right sidebar) and create these collections.

### Brand Collection (16 variables)

**Color variables (10)** — create one variable per row:

| Variable Name | Value |
|--------------|-------|
| `Colors/Primary` | `#003399` |
| `Colors/Primary Foreground` | `#FFFFFF` |
| `Colors/Secondary` | `#9BB1DC` |
| `Colors/Secondary Foreground` | `#003399` |
| `Colors/Accent` | `#F5CE2A` |
| `Colors/Accent Foreground` | `#000000` |
| `Colors/Neutral` | `#DBD2CC` |
| `Colors/Neutral Foreground` | `#000000` |
| `Colors/Highlight` | `#F5CE2A` |
| `Colors/Highlight Foreground` | `#000000` |

> **Naming rule**: Title Case, slash-separated. `Colors/Primary Foreground` — not `colour-primary-fg` or `colors_primary`.

**Typography variables (6)**:

| Variable Name | Value |
|--------------|-------|
| `Typography/Font Family` | `Barlow` |
| `Typography/Font URL` | `https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap` |
| `Typography/Weights/Regular` | `400` |
| `Typography/Weights/Medium` | `500` |
| `Typography/Weights/Semibold` | `600` |
| `Typography/Weights/Bold` | `700` |

### Semantic Collection (reference only)

These exist so the AI sees correct dark/light mode tokens. You don't need to bind every element to these — just create them.

| Variable | Light Mode | Dark Mode |
|----------|-----------|-----------|
| `Background` | `#FAFAF9` | `#1C1917` |
| `Foreground` | `#1C1917` | `#FAFAF9` |
| `Card` | `#FFFFFF` | `#292524` |
| `Muted` | `#F5F5F4` | `#44403C` |
| `Border` | `#E7E5E4` | `#57534E` |
| `Destructive` | `#EF4444` | `#F87171` |

---

## Component Checklist

### What needs to change

Convert separate frames into **component sets** with variant properties. In Figma: select all related frames → right-click → **Combine as variants**.

### shadcn/ui primitives (14 component sets)

| Component Set | Variant Properties |
|--------------|-------------------|
| **Button** | `Variant`: default, destructive, outline, secondary, ghost, link / `Size`: default, sm, lg, icon |
| **Input** | `Size`: default, sm, lg / `State`: default, focus, error, disabled |
| **Badge** | `Variant`: default, secondary, destructive, outline |
| **Card** | Sub-components: CardHeader, CardContent, CardFooter, CardTitle, CardDescription |
| **Tabs** | `Variant`: default, outline / `State`: active, inactive |
| **Avatar** | — |
| **Dialog** | — |
| **Sheet** | — |
| **Table** | — |
| **Skeleton** | — |
| **Separator** | — |
| **DropdownMenu** | — |
| **Collapsible** | — |
| **Label** | — |

### App-specific components (6 component sets)

| Component Set | Variant Properties |
|--------------|-------------------|
| **Header** | `State`: default, mobile-open |
| **Footer** | — (EU attribution, partner logos, social links) |
| **AppShell** | — |
| **StepIndicator** | — |
| **EmptyState** | — |
| **HeroSection** | — |

### Naming rules

| What | Convention | Example |
|------|-----------|---------|
| Component sets | PascalCase | `Button`, `ModelCard` |
| Variant properties | PascalCase | `Variant`, `Size`, `State` |
| Variant values | lowercase | `default`, `destructive`, `sm` |
| Layer names | PascalCase | `Button/Label`, `Card/Header` |

> **Important**: Variant values must match the code exactly. Use `default`, `destructive`, `outline` — not `Default`, `Destructive`, `Outline`.

---

## Page Organization

Set up 6 pages in this order:

| Page | What goes here |
|------|---------------|
| **Cover** | Project title, version, EU attribution |
| **Tokens** | Color swatches and typography specimens bound to Variables |
| **Components** | All 20 component sets listed above |
| **Patterns** | Compound layouts: Hero, Card grid, Form, Navigation, Footer |
| **Vitrine Screens** | Full-page AI4SU showcase screens (Home, Toolbox, Hackathons, Ecosystem, Partners) |
| **Specifications** | Spacing rules, grid system, responsive breakpoints |

---

## Prohibited Patterns

Avoid these — they break AI code generation or produce unusable output:

- **No Chinese layer names** — Rename all layers to English PascalCase
- **No hardcoded hex in fills or strokes** — Always bind to a Variable (click the diamond icon in the color picker)
- **No generic names** — `Frame 1`, `Group 2`, `Rectangle 47` tell the AI nothing; use descriptive names
- **No separate frames for variants** — If Button has 6 visual styles, those are 6 variants inside one component set, not 6 separate frames

---

## How to Verify (Self-Check)

Before handing off, confirm these four things:

1. **Variables panel** shows 16+ variables in the Brand collection (10 color + 6 typography)
2. **Every fill and stroke** references a variable — select any colored element and check for the diamond icon (no raw hex values)
3. **Components page** contains component sets (purple diamond icon ◆) — not plain frames or groups
4. **All layers** use English PascalCase names — no Chinese text, no "Frame 1" generics
