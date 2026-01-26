# Test Instructions: Ecosystem

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Ecosystem section has a map/list split layout, activity filtering, expandable cards, and Women Founders testimonials. Test map interactions, filtering, and card expansion.

---

## User Flow Tests

### Flow 1: Explore Map and List

**Scenario:** User explores activities on map

**Setup:**
- Render Ecosystem with activities across multiple countries
- Mock map marker interactions

**Steps:**
1. User navigates to `/ecosystem`
2. User sees map on left, list on right
3. User hovers over a marker on map

**Expected Results:**
- [ ] Map displays with OpenStreetMap tiles
- [ ] Markers are visible for all activities
- [ ] Marker colors match activity types (blue=Events, etc.)
- [ ] Hover shows marker popup with activity title

### Flow 2: Click Map Marker

**Scenario:** User clicks marker to highlight activity

**Setup:**
- Mock `onMarkerClick` callback

**Steps:**
1. User clicks a marker on the map

**Expected Results:**
- [ ] `onMarkerClick` called with activity ID
- [ ] Corresponding activity card highlights in list
- [ ] List scrolls to show highlighted card

### Flow 3: Filter by Activity Type

**Scenario:** User filters to show only research activities

**Setup:**
- Mock `onFilterChange` callback

**Steps:**
1. User clicks "Research" filter tab

**Expected Results:**
- [ ] Only Research activities show in list
- [ ] Only Research markers show on map (purple)
- [ ] "Research" tab is visually active
- [ ] `onFilterChange` called with `{ type: 'research' }`

### Flow 4: Filter by Country

**Scenario:** User filters to specific country

**Setup:**
- Mock map zoom behavior

**Steps:**
1. User selects "Kenya" from country dropdown

**Expected Results:**
- [ ] Map zooms to Kenya region
- [ ] Only Kenya activities show in list
- [ ] Country dropdown shows "Kenya" selected
- [ ] "Clear" option available to reset

### Flow 5: View Activity Details

**Scenario:** User expands activity card

**Setup:**
- Mock `onActivityClick` callback

**Steps:**
1. User clicks an activity card
2. Card expands to show full details

**Expected Results:**
- [ ] Card expands smoothly
- [ ] Full description is visible
- [ ] Photos are displayed (if any)
- [ ] Download button is visible (if resources exist)
- [ ] Clicking again collapses card

### Flow 6: Browse Women Founders

**Scenario:** User views Women Founders testimonials

**Setup:**
- Render with 5 testimonials

**Steps:**
1. User scrolls to Women Founders section
2. User clicks next arrow on carousel
3. User clicks previous arrow

**Expected Results:**
- [ ] Stats row shows: participants, countries, success stories
- [ ] Testimonial displays with photo and quote
- [ ] Next arrow shows next testimonial
- [ ] Previous arrow shows previous
- [ ] Dots indicate current position

---

## Empty State Tests

### No Activities

**Scenario:** No ecosystem activities exist

**Setup:**
- `activities = []`

**Expected Results:**
- [ ] Empty state shows "No activities yet"
- [ ] Map still displays (but no markers)
- [ ] Filter tabs may be disabled

### No Activities Match Filter

**Scenario:** Filter returns no results

**Setup:**
- Filter by "Workshops" when none exist

**Expected Results:**
- [ ] Empty state shows "No workshops found"
- [ ] Map shows no markers
- [ ] "Clear filters" option available

### No Women Founders Testimonials

**Scenario:** Testimonials array is empty

**Setup:**
- `testimonials = []`

**Expected Results:**
- [ ] Stats still display
- [ ] Carousel shows placeholder or hides
- [ ] No broken carousel navigation

---

## Component Interaction Tests

### ActivityMap

**Renders correctly:**
- [ ] Map tiles load from OpenStreetMap
- [ ] All activity markers are plotted
- [ ] Markers have correct colors by type
- [ ] Map centers on Africa

**User interactions:**
- [ ] Clicking marker triggers `onMarkerClick`
- [ ] Hovering shows popup
- [ ] Zoom controls work

### ActivityCard

**Renders correctly:**
- [ ] Shows activity title
- [ ] Shows type badge with color
- [ ] Shows date range
- [ ] Shows location with flag
- [ ] Shows short description (collapsed)

**User interactions:**
- [ ] Clicking expands card
- [ ] Expanded shows full description
- [ ] Download button triggers `onDownload`

### TestimonialCarousel

**Renders correctly:**
- [ ] Shows participant photo
- [ ] Shows quote text
- [ ] Shows participant name and role
- [ ] Navigation arrows visible

**User interactions:**
- [ ] Next/prev arrows cycle testimonials
- [ ] Dots indicate position
- [ ] Auto-advance may be present (optional)

### MobileMapToggle

**Renders correctly:**
- [ ] Shows "Show Map" button
- [ ] Only visible on mobile

**User interactions:**
- [ ] Clicking shows map overlay
- [ ] Map overlay has close button
- [ ] Close returns to list view

---

## Edge Cases

- [ ] Map handles activities without GPS coordinates
- [ ] Activities with same location don't overlap markers badly
- [ ] Very long activity names truncate in cards
- [ ] Filter handles activities with multiple types
- [ ] Testimonial with very long quote displays properly

---

## Accessibility Checks

- [ ] Map has keyboard navigation
- [ ] Filter tabs are keyboard accessible
- [ ] Activity cards can be expanded via keyboard
- [ ] Carousel has ARIA labels
- [ ] Map markers have accessible descriptions

---

## Sample Test Data

```typescript
const mockActivity = {
  id: "workshop-nairobi-2024",
  title: "AI Workshop Nairobi",
  type: "workshop",
  dates: { start: "2024-04-10", end: "2024-04-10" },
  location: {
    city: "Nairobi",
    country: "Kenya",
    countryCode: "KE",
    coordinates: { lat: -1.2921, lng: 36.8219 }
  },
  shortDescription: "One-day workshop on AI fundamentals...",
  fullDescription: "This workshop covered...",
  resources: [{ id: "report", type: "pdf", url: "/pdfs/workshop-report.pdf" }]
}

const mockTestimonial = {
  id: "jane-doe",
  name: "Jane Doe",
  role: "Founder, TechStartup",
  quote: "The Women Founders program helped me...",
  photo: "/images/testimonials/jane.jpg"
}
```
