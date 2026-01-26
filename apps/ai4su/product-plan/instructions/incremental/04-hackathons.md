# Milestone 4: Hackathons

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

Implement the Hackathons section — documentation of all hackathon events with detail pages, photo galleries, and downloadable resources.

## Overview

The Hackathons section documents all 6 AI hackathon events organized across Africa. It showcases the program methodology, event details, challenge briefs, results, photo galleries, and links to AI models produced. Each hackathon has a dedicated detail page.

**Key Functionality:**
- Display hackathon methodology overview
- Browse hackathon event cards with filtering
- View detailed hackathon pages with full information
- Download challenge briefs and best practices PDFs
- Browse photo galleries with lightbox navigation
- Link to AI models produced at each hackathon

## Recommended Approach: Test-Driven Development

See `product-plan/sections/hackathons/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/hackathons/components/`:

**List View:**
- `MethodologySection.tsx` — Hackathon format explanation with icons
- `CountryFilter.tsx` — Filter dropdown by country
- `HackathonCard.tsx` — Event preview card with thumbnail
- `HackathonGrid.tsx` — Responsive grid of hackathon cards
- `Hackathons.tsx` — Main list container

**Detail View:**
- `HackathonHero.tsx` — Full-width event hero with photo
- `Breadcrumb.tsx` — Navigation breadcrumb
- `ChallengeBriefSection.tsx` — Theme and challenge with PDF download
- `WinningTeamsSection.tsx` — Results and winning teams
- `OutcomesSection.tsx` — Key outcomes and metrics
- `PhotoGallery.tsx` — Thumbnail grid with lightbox
- `Lightbox.tsx` — Full-screen photo viewer with navigation
- `ShareButtons.tsx` — Social sharing (Twitter, LinkedIn)
- `HackathonDetail.tsx` — Detail page container

### Data Layer

```typescript
interface HackathonsPageProps {
  methodology: MethodologyItem[]
  hackathons: Hackathon[]
  onHackathonClick?: (hackathonId: string) => void
  onCountryFilter?: (countryId: string | null) => void
}

interface HackathonDetailPageProps {
  hackathon: Hackathon
  onDownload?: (resourceId: string, type: string) => void
  onModelClick?: (modelId: string) => void
  onShare?: (platform: string) => void
  onBack?: () => void
}
```

### Callbacks

| Callback | Description | Action |
|----------|-------------|--------|
| `onHackathonClick` | User clicks hackathon card | Navigate to `/hackathons/[slug]` |
| `onCountryFilter` | User selects country filter | Filter hackathon list |
| `onDownload` | User clicks download button | Download PDF |
| `onModelClick` | User clicks AI model link | Navigate to Toolbox with filter |
| `onShare` | User clicks share button | Open share dialog |
| `onBack` | User clicks back link | Navigate to `/hackathons` |

## Files to Reference

- `product-plan/sections/hackathons/README.md` — Feature overview
- `product-plan/sections/hackathons/tests.md` — Test-writing instructions
- `product-plan/sections/hackathons/components/` — React components
- `product-plan/sections/hackathons/types.ts` — TypeScript interfaces
- `product-plan/sections/hackathons/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Browse Hackathons

1. User lands on Hackathons page
2. User reads methodology overview
3. User browses hackathon cards
4. User clicks on "Nairobi AI Hackathon" card
5. **Outcome:** User navigates to `/hackathons/nairobi-2024`

### Flow 2: Filter by Country

1. User opens country filter dropdown
2. User selects "Kenya"
3. Hackathon grid updates to show only Kenya events
4. **Outcome:** User sees filtered results

### Flow 3: Download Challenge Brief

1. User views hackathon detail page
2. User scrolls to Challenge section
3. User clicks "Download Challenge Brief" button
4. **Outcome:** PDF file downloads

### Flow 4: Browse Photo Gallery

1. User scrolls to Photo Gallery on detail page
2. User clicks a thumbnail image
3. Lightbox opens with full-size image
4. User uses arrow keys to navigate photos
5. User presses Escape to close
6. **Outcome:** User has viewed event photos

### Flow 5: Share Hackathon

1. User clicks Twitter share button
2. Share dialog opens with pre-filled text
3. **Outcome:** User can share hackathon on social media

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Methodology section renders with icons
- [ ] Hackathon cards display all events
- [ ] Country filter works correctly
- [ ] Clicking card navigates to detail page
- [ ] Detail page shows full hackathon info
- [ ] Challenge brief PDF downloads
- [ ] Best practices PDF downloads
- [ ] Photo gallery thumbnails render
- [ ] Lightbox opens and navigates photos
- [ ] Keyboard navigation works (arrows, Escape)
- [ ] Share buttons work for Twitter/LinkedIn
- [ ] AI model links navigate to Toolbox
- [ ] Back link returns to hackathon list
- [ ] Responsive on mobile
