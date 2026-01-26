# Milestone 3: Toolbox

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

Implement the Toolbox section — the central resource hub showcasing AI models, studies, and program deliverables.

## Overview

The Toolbox is the main value proposition of AI4Startups. It provides access to all 24 open-source AI models with GitHub links, research studies, hackathon best practices reports, and the final program report. Users can browse, filter, search, and download resources.

**Key Functionality:**
- Display KPI summary bar with program metrics
- Browse AI models in a filterable grid
- Filter models by sector (Agriculture, Healthcare, etc.) and country
- Search models by name or description
- View model details in a modal with GitHub link
- Download studies, best practices PDFs, and final report

## Recommended Approach: Test-Driven Development

See `product-plan/sections/toolbox/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/toolbox/components/`:

- `KPISummaryBar.tsx` — Compact metrics bar (24 models, 6 hackathons, etc.)
- `SearchInput.tsx` — Search field with magnifying glass icon
- `ModelFilterSidebar.tsx` — Sector and country filter checkboxes
- `ModelCard.tsx` — Model preview card with sector badge
- `ModelGrid.tsx` — Responsive grid of model cards
- `ModelDetailModal.tsx` — Full model details with GitHub link
- `EmptyState.tsx` — "No models found" state
- `StudiesSection.tsx` — Study cards with download buttons
- `BestPracticesSection.tsx` — Hackathon-linked report cards
- `FinalReportCard.tsx` — Prominent final report download
- `Toolbox.tsx` — Main container composing all sections

### Data Layer

```typescript
interface ToolboxPageProps {
  kpis: ToolboxKPI[]
  models: AIModel[]
  studies: Study[]
  bestPractices: BestPracticesReport[]
  finalReport: FinalReport
  onModelClick?: (modelId: string) => void
  onGitHubClick?: (url: string) => void
  onDownload?: (resourceId: string, type: string) => void
}
```

You'll need to:
- Fetch AI models from backend/CMS
- Implement client-side filtering and search
- Handle PDF downloads
- Track download analytics (optional)

### Callbacks

| Callback | Description | Action |
|----------|-------------|--------|
| `onModelClick` | User clicks model card | Open detail modal |
| `onGitHubClick` | User clicks GitHub button | Open GitHub URL in new tab |
| `onDownload` | User clicks download button | Download PDF file |

## Files to Reference

- `product-plan/sections/toolbox/README.md` — Feature overview
- `product-plan/sections/toolbox/tests.md` — Test-writing instructions
- `product-plan/sections/toolbox/components/` — React components
- `product-plan/sections/toolbox/types.ts` — TypeScript interfaces
- `product-plan/sections/toolbox/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Browse and Filter Models

1. User lands on Toolbox page
2. User sees KPI bar and model grid
3. User clicks "Agriculture" filter in sidebar
4. Model grid updates to show only Agriculture models
5. **Outcome:** User sees filtered results

### Flow 2: Search for Model

1. User types "crop" in search input
2. Grid filters in real-time as user types
3. User sees matching models highlighted
4. **Outcome:** User finds specific model quickly

### Flow 3: View Model Details

1. User clicks on a model card
2. Modal opens with full description
3. User reads use case and technical requirements
4. User clicks "View on GitHub" button
5. **Outcome:** GitHub repository opens in new tab

### Flow 4: Download Study

1. User scrolls to Studies section
2. User sees study cards with thumbnails
3. User clicks "Download PDF" button
4. **Outcome:** PDF file downloads

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] KPI summary bar displays metrics
- [ ] Model grid renders all 24 models
- [ ] Sector filters work correctly
- [ ] Country filters work correctly
- [ ] Search filters results in real-time
- [ ] Model detail modal opens with full info
- [ ] GitHub links open in new tab
- [ ] Studies section shows downloadable PDFs
- [ ] Best practices reports are downloadable
- [ ] Final report card is prominent and downloadable
- [ ] Empty state shows when no models match filters
- [ ] Responsive on mobile (filters collapse to dropdown)
