# Milestone 2: Home

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Home section — the landing page introducing visitors to the AI4Startups program with hero, KPIs, and navigation to all content areas.

## Overview

The Home page is the entry point for all visitors. It immediately communicates the program's purpose and impact through animated KPI counters, highlights the main value proposition (Toolbox), and provides navigation paths to all content areas.

**Key Functionality:**
- Display hero section with program tagline and primary CTA
- Show animated KPI counters (24 models, 6 hackathons, 8 countries, 500+ participants)
- Highlight the Toolbox section with featured model previews
- Provide quick navigation cards to all sections
- Drive users toward the Toolbox as the primary destination

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/home/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/home/components/`:

- `HeroSection.tsx` — Full-width hero with gradient, title, CTA
- `KPIGrid.tsx` — Animated counter cards for program metrics
- `ToolboxHighlight.tsx` — Featured models preview with CTA
- `SectionPreviews.tsx` — Navigation cards to other sections
- `Home.tsx` — Main container composing all sections

### Data Layer

The components expect these data shapes:

```typescript
interface HomePageProps {
  hero: HeroContent
  kpis: KPIItem[]
  toolboxHighlight: ToolboxHighlightContent
  sectionPreviews: SectionPreview[]
  onKPIClick?: (sectionId: string) => void
  onToolboxClick?: () => void
  onSectionClick?: (sectionId: string) => void
}
```

You'll need to:
- Provide KPI data (can be static or from API)
- Provide featured models for Toolbox highlight
- Connect navigation callbacks to router

### Callbacks

Wire up these user actions:

| Callback | Description | Navigation |
|----------|-------------|------------|
| `onKPIClick` | User clicks a KPI card | Navigate to related section |
| `onToolboxClick` | User clicks "Explore Toolbox" | Navigate to `/toolbox` |
| `onSectionClick` | User clicks section preview card | Navigate to that section |

## Files to Reference

- `product-plan/sections/home/README.md` — Feature overview and design intent
- `product-plan/sections/home/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/home/components/` — React components
- `product-plan/sections/home/types.ts` — TypeScript interfaces
- `product-plan/sections/home/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Land and Understand

1. User lands on home page
2. User sees hero with "AI4Startups" title and program description
3. User reads the tagline about open-source AI models for Africa
4. **Outcome:** User understands what AI4Startups is about

### Flow 2: View Impact Metrics

1. User scrolls to KPI section
2. User sees counters animate (24 models, 6 hackathons, etc.)
3. User clicks "AI Models" KPI card
4. **Outcome:** User navigates to Toolbox section

### Flow 3: Explore Toolbox

1. User scrolls to Toolbox highlight
2. User sees preview of featured AI models
3. User clicks "Explore Toolbox" button
4. **Outcome:** User navigates to `/toolbox`

### Flow 4: Navigate to Section

1. User scrolls to section previews
2. User clicks "Hackathons" card
3. **Outcome:** User navigates to `/hackathons`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Hero renders with correct content
- [ ] KPI counters animate on scroll
- [ ] KPI cards are clickable and navigate correctly
- [ ] Toolbox highlight shows featured models
- [ ] "Explore Toolbox" CTA navigates to `/toolbox`
- [ ] Section preview cards navigate correctly
- [ ] Responsive on mobile (single column layout)
- [ ] Matches the visual design (EU colors, Barlow font)
