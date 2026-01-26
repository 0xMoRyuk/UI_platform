# Milestone 5: Ecosystem

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

Implement the Ecosystem section — activities map and list with Women Founders highlight.

## Overview

The Ecosystem section showcases all ecosystem-building activities beyond hackathons: networking events, research initiatives, workshops, and the Women Founders support program. Features an interactive map showing activities across 8 African countries alongside a filterable activity list.

**Key Functionality:**
- Display split layout with map and activity list
- Show activity markers on interactive map (Leaflet)
- Filter activities by type (Events, Research, Workshops)
- Filter activities by country
- Expand activity cards to show full details
- Highlight Women Founders program with testimonials
- Download activity resources (PDFs)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/ecosystem/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/ecosystem/components/`:

- `EcosystemHero.tsx` — Section header with intro
- `ActivityFilter.tsx` — Type and country filter controls
- `ActivityCard.tsx` — Expandable activity card
- `ActivityList.tsx` — Scrollable list of activity cards
- `ActivityMap.tsx` — Leaflet map with colored markers
- `MobileMapToggle.tsx` — Toggle button for mobile map view
- `WomenFoundersSection.tsx` — Program highlight with stats
- `TestimonialCarousel.tsx` — Participant quotes carousel
- `Ecosystem.tsx` — Main container with split layout

### Data Layer

```typescript
interface EcosystemPageProps {
  intro: EcosystemIntro
  activities: EcosystemActivity[]
  womenFounders: WomenFoundersContent
  testimonials: Testimonial[]
  onActivityClick?: (activityId: string) => void
  onMarkerClick?: (activityId: string) => void
  onFilterChange?: (filters: ActivityFilters) => void
  onDownload?: (resourceId: string) => void
}
```

### Map Integration

The map component uses Leaflet with OpenStreetMap tiles. Markers are color-coded:
- **Blue:** Events
- **Purple:** Research
- **Green:** Workshops
- **Pink:** Women Founders

You'll need to:
- Install Leaflet and react-leaflet
- Configure map tiles (OpenStreetMap)
- Plot markers from activity GPS coordinates
- Handle marker click to highlight activity in list

### Callbacks

| Callback | Description | Action |
|----------|-------------|--------|
| `onActivityClick` | User clicks activity card | Expand card to show details |
| `onMarkerClick` | User clicks map marker | Scroll to and highlight activity |
| `onFilterChange` | User changes filter | Update map and list |
| `onDownload` | User clicks download | Download resource PDF |

## Files to Reference

- `product-plan/sections/ecosystem/README.md` — Feature overview
- `product-plan/sections/ecosystem/tests.md` — Test-writing instructions
- `product-plan/sections/ecosystem/components/` — React components
- `product-plan/sections/ecosystem/types.ts` — TypeScript interfaces
- `product-plan/sections/ecosystem/sample-data.json` — Test data

## Expected User Flows

### Flow 1: Explore Map and List

1. User lands on Ecosystem page
2. User sees map on left, activity list on right
3. User hovers over map marker
4. Marker popup shows activity preview
5. User clicks marker
6. **Outcome:** Activity card highlights in list

### Flow 2: Filter Activities

1. User clicks "Research" filter tab
2. Map markers filter to show only research activities
3. Activity list updates accordingly
4. **Outcome:** User sees filtered activities on map and list

### Flow 3: Filter by Country

1. User selects "Kenya" from country dropdown
2. Map zooms to Kenya
3. List shows only Kenya activities
4. **Outcome:** User sees country-specific activities

### Flow 4: View Activity Details

1. User clicks activity card
2. Card expands to show full description
3. User sees photos and resources
4. User clicks "Download Report" button
5. **Outcome:** PDF downloads

### Flow 5: Explore Women Founders

1. User scrolls to Women Founders section
2. User sees program stats and description
3. User browses testimonial carousel
4. User clicks arrow to see next testimonial
5. **Outcome:** User learns about Women Founders program

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Split layout renders (map left, list right)
- [ ] Map displays with OpenStreetMap tiles
- [ ] Activity markers are color-coded by type
- [ ] Marker popups show activity preview
- [ ] Clicking marker highlights activity in list
- [ ] Activity type filters work
- [ ] Country filter works and zooms map
- [ ] Activity cards expand on click
- [ ] Women Founders section displays stats
- [ ] Testimonial carousel navigates
- [ ] Resource downloads work
- [ ] Empty state shows when no activities match filters
- [ ] Mobile: Map hidden by default, toggle button works
- [ ] Responsive layout
