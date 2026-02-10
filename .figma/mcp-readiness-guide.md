# Figma MCP Readiness Guide — AI4SU Design System

> **Purpose**: Adapt the current Figma design system for efficient code generation via Figma MCP + Claude Code
> **Audience**: Design team, design system maintainers
> **Date**: 2026-02-10

---

## Current State

The "AI4SU Design System" Figma file contains a solid component inventory (buttons, inputs, checkboxes, radios, toggles, alerts, tabs, badges, status icons, progress bars) but is structured around a **template UI kit** (TapTap) rather than the **EU D4D brand** used in production code.

An audit of the file against the MCP toolchain identified gaps in three areas: **Variables**, **Component structure**, and **Brand alignment**.

---

## 1. Figma Variables (Critical — Blocks Token Sync)

### Problem

The MCP tool `get_variable_defs` reads Figma Variables to sync design tokens into code. The file currently defines **3 variables** — the token sync skill requires **15+**.

### What Exists

| Variable | Value |
|----------|-------|
| `Colour/Primary/500` | `#003399` |
| `Colour/Primary/700` | `#001f5c` |
| `Colour/Text/Heading/white` | `#ffffff` |

### What to Add

Create a **"Brand / EU D4D"** variable collection with these variables. Values come from `packages/ui/src/tokens/brands/eu-d4d.ts` in the codebase.

#### Color Variables

| Variable Name | Hex Value | Role |
|--------------|-----------|------|
| `Colors/Primary` | `#003399` | Headers, links, primary actions |
| `Colors/Primary Foreground` | `#FFFFFF` | Text on primary backgrounds |
| `Colors/Secondary` | `#9BB1DC` | Backgrounds, supporting elements |
| `Colors/Secondary Foreground` | `#003399` | Text on secondary backgrounds |
| `Colors/Accent` | `#F5CE2A` | CTAs, highlights, focus rings |
| `Colors/Accent Foreground` | `#000000` | Text on accent backgrounds |
| `Colors/Neutral` | `#DBD2CC` | Subtle backgrounds, borders |
| `Colors/Neutral Foreground` | `#000000` | Text on neutral backgrounds |
| `Colors/Highlight` | `#F5CE2A` | Emphasis, callouts |
| `Colors/Highlight Foreground` | `#000000` | Text on highlight backgrounds |

#### Typography Variables

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `Typography/Font Family` | `Barlow` | Primary brand font |
| `Typography/Font URL` | `https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap` | Google Fonts |
| `Typography/Weights/Regular` | `400` | Body text |
| `Typography/Weights/Medium` | `500` | Subtitles |
| `Typography/Weights/Semibold` | `600` | Headings |
| `Typography/Weights/Bold` | `700` | Emphasis |

#### Semantic Variables (Optional but Recommended)

These map to shadcn/ui tokens used in the codebase. Define as a separate collection or mode.

| Variable Name | Light Value | Dark Value |
|--------------|-------------|------------|
| `Semantic/Background` | `#FFFFFF` | `#0B1120` |
| `Semantic/Foreground` | `#0B1120` | `#F8FAFC` |
| `Semantic/Muted` | `#F1F5F9` | `#1E293B` |
| `Semantic/Border` | `#E2E8F0` | `#1E293B` |
| `Semantic/Destructive` | `#EF4444` | `#EF4444` |

### Naming Convention

The MCP token sync skill expects this pattern:
```
Collection: "Brand"
  Colors/Primary          → maps to → BrandConfig.colors.primary
  Colors/Accent           → maps to → BrandConfig.colors.accent
  Typography/Font Family  → maps to → BrandConfig.typography.font.family
```

Keep names in `Category/Name` format. The skill parses the slash-separated path to determine which `BrandConfig` field to update.

---

## 2. Component Structure (Important — Improves Code Generation)

### Problem

Components are organized as **separate top-level frames per variant** (e.g., "Primary", "Outline", "Ghost" as siblings). The MCP `get_design_context` tool works best with **Figma component sets** that use variant properties.

### Current Structure (Fragmented)

```
Page: Internal Only Canvas
├── Primary          ← 12 button variants (Size × State)
├── Outline          ← 12 button variants
├── Ghost            ← 12 button variants
├── Success          ← separate component
├── Link             ← separate component
├── Basic            ← ambiguous (input? alert? tabs?)
├── Basic            ← ambiguous (duplicate name)
├── Basic            ← ambiguous (duplicate name)
├── Check            ← checkbox internals
├── Checkbox         ← separate from Check
└── ...35 total top-level elements
```

### Target Structure (Component Sets)

```
Page: Components
├── Button               ← COMPONENT SET
│   ├── Variant: Primary, Size: Large, State: Default
│   ├── Variant: Primary, Size: Large, State: Hover
│   ├── Variant: Outline, Size: Large, State: Default
│   └── ...
├── Input                ← COMPONENT SET
│   ├── Size: Large, State: Default, Filled: False
│   └── ...
├── Checkbox             ← COMPONENT SET
│   ├── Checked: True, Disabled: False
│   └── ...
├── Radio                ← COMPONENT SET
├── Toggle               ← COMPONENT SET
├── Badge                ← COMPONENT SET
├── Alert                ← COMPONENT SET
├── Tabs                 ← COMPONENT SET
├── StatusIcon           ← COMPONENT SET
└── ProgressBar          ← COMPONENT SET
```

### How to Reorganize

For each component group:

1. **Select all variant frames** (e.g., all 12 Primary button variants)
2. **Right-click → Combine as variants** to create a component set
3. **Name the set** using the component name (e.g., "Button")
4. **Add variant properties** via the right panel:
   - `Variant`: Primary, Outline, Ghost, Success, Link
   - `Size`: Large, Medium, Small
   - `State`: Default, Hover, Pressed, Disabled
5. **Merge related groups** — Primary + Outline + Ghost + Success + Link should all be variants of "Button", not separate component sets

### Priority Order

Reorganize these first — they map directly to shadcn/ui components in the codebase:

| Priority | Figma Component | Maps to Codebase |
|----------|----------------|-------------------|
| 1 | Button (Primary + Outline + Ghost + Link) | `components/ui/button.tsx` |
| 2 | Input (Basic + label + Help text) | `components/ui/input.tsx` + `label.tsx` |
| 3 | Checkbox | `components/ui/checkbox.tsx` (if added) |
| 4 | Radio | `components/ui/radio.tsx` (if added) |
| 5 | Toggle | `components/ui/toggle.tsx` (if added) |
| 6 | Alert/Banner | `components/ui/alert.tsx` (if added) |
| 7 | Tabs | `components/ui/tabs.tsx` |
| 8 | Badge | `components/ui/badge.tsx` |
| 9 | StatusIcon | App-specific component |
| 10 | ProgressBar | App-specific component |

---

## 3. Brand Alignment (Important — Prevents Manual Rework)

### Problem

Components currently use **TapTap brand colors** (teal palette: `#15c5ce`, `#47cfd6`, `#00abb6`). The codebase uses the **EU D4D palette** (blue: `#003399`, yellow: `#F5CE2A`, sand: `#DBD2CC`).

When MCP generates code from these components, it outputs hardcoded teal values that must be manually replaced.

### Solution

Once Variables are set up (Section 1), bind component fills and strokes to Variables instead of hardcoded hex values:

| Component Property | Bind to Variable |
|-------------------|-----------------|
| Primary button fill | `Colors/Primary` |
| Primary button text | `Colors/Primary Foreground` |
| Outline button border | `Colors/Primary` |
| Ghost button hover fill | `Colors/Neutral` |
| Accent button fill | `Colors/Accent` |
| Input border | `Colors/Neutral` |
| Input focus ring | `Colors/Primary` |
| Error state fills | `Semantic/Destructive` |
| Body text | `Semantic/Foreground` |
| Backgrounds | `Semantic/Background` |

### Rebinding Steps (per component)

1. Select the component variant
2. In the Fill/Stroke property, click the hex value
3. Click the Variables icon (diamond)
4. Choose the matching variable from the "Brand" collection
5. Repeat for all states (hover = primary with opacity, disabled = neutral, etc.)

### Chinese Layer Names

Some layers contain Chinese text (e.g., `提示建议性/Line/加号_LPlus`). While this doesn't affect MCP functionality, renaming to English improves readability in generated code comments:

| Current | Suggested |
|---------|-----------|
| `提示建议性/Line/加号_LPlus` | `Icon/Line/Plus` |

---

## 4. Page Structure (Nice to Have — Enables Full Workflow)

### Current Pages

| Page | Content |
|------|---------|
| Cover (0:1) | Title card only |
| Internal Only Canvas (0:2) | All components, tokens, swatches |

### Recommended Pages

| Page | Content | MCP Use |
|------|---------|---------|
| **Cover** | Title, description, status | Reference |
| **Tokens** | Color swatches, typography specimens, spacing scale | `get_variable_defs` validation |
| **Components** | All component sets (Button, Input, etc.) | `get_design_context` for component gen |
| **Templates** | Common layouts (auth form, dashboard, data table, empty state) | `get_design_context` for page gen |
| **Screens** | AI4SU app screens (current + proposed) | `get_screenshot` for visual reference |

### Why Separate Pages

- `get_variable_defs` on the Tokens page validates all variables render correctly
- `get_design_context` on a Template frame generates a full page layout using existing components
- `get_screenshot` on a Screen provides visual reference without pulling code

---

## 5. Validation Checklist

After making changes, verify MCP readiness:

### Variables
- [ ] `get_variable_defs` on any frame returns all 10 color pairs
- [ ] Color values match `packages/ui/src/tokens/brands/eu-d4d.ts`
- [ ] Typography variables present (font family, weights)

### Components
- [ ] Each component is a **component set** (not separate frames)
- [ ] Component sets have named variant properties (Size, State, Variant)
- [ ] No duplicate names (no three components all called "Basic")
- [ ] Component names match codebase: Button, Input, Checkbox, Radio, Toggle, Badge, Alert, Tabs

### Brand
- [ ] No hardcoded TapTap colors (`#15c5ce`, `#47cfd6`, `#00abb6`, `#b0ebec`)
- [ ] Component fills/strokes bound to Variables
- [ ] `get_design_context` on Button generates code using variable references, not hex

### Structure
- [ ] Components page is not marked "Internal Only"
- [ ] Layer names in English
- [ ] At least one Template frame exists for E2E testing

---

## Quick Reference: MCP Tools

| Tool | What It Does | What It Needs from Figma |
|------|-------------|-------------------------|
| `get_variable_defs` | Reads Figma Variables for token sync | Variables defined in collections |
| `get_design_context` | Generates React code from a frame | Well-structured component sets with variable bindings |
| `get_screenshot` | Takes a screenshot of a node | Any visible frame |
| `get_metadata` | Returns node tree structure | Any page |
| `create_design_system_rules` | Analyzes codebase (not Figma) | Nothing from Figma |
