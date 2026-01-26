# Test Instructions: Hackathons

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Hackathons section has list and detail views, photo lightbox, PDF downloads, and social sharing. Test navigation, filtering, gallery interactions, and downloads.

---

## User Flow Tests

### Flow 1: Browse Hackathons

**Scenario:** User browses hackathon list

**Setup:**
- Render Hackathons with 6 hackathon events

**Steps:**
1. User navigates to `/hackathons`
2. User sees methodology section
3. User scrolls to hackathon grid

**Expected Results:**
- [ ] Methodology section shows 4 steps with icons
- [ ] Hackathon grid displays 6 event cards
- [ ] Each card shows: name, hero image, date range, location, participant count

### Flow 2: Filter by Country

**Scenario:** User filters hackathons by country

**Setup:**
- Mock `onCountryFilter` callback

**Steps:**
1. User opens country filter dropdown
2. User selects "Kenya"

**Expected Results:**
- [ ] Only Kenya hackathons are displayed
- [ ] Filter dropdown shows "Kenya" as selected
- [ ] `onCountryFilter` called with `"kenya"`
- [ ] "Clear filter" option appears

### Flow 3: Navigate to Detail Page

**Scenario:** User clicks hackathon to view details

**Setup:**
- Mock `onHackathonClick` callback

**Steps:**
1. User clicks "Nairobi AI Hackathon" card

**Expected Results:**
- [ ] `onHackathonClick` called with hackathon ID
- [ ] Should navigate to `/hackathons/nairobi-2024`

### Flow 4: Download Challenge Brief

**Scenario:** User downloads challenge brief PDF

**Setup:**
- Render HackathonDetail page
- Mock `onDownload` callback

**Steps:**
1. User scrolls to Challenge section
2. User clicks "Download Challenge Brief" button

**Expected Results:**
- [ ] `onDownload` called with `(hackathonId, 'challenge-brief')`
- [ ] Button shows download icon
- [ ] Button has yellow accent color

### Flow 5: Browse Photo Gallery

**Scenario:** User views photos in lightbox

**Setup:**
- Render HackathonDetail with 10 photos

**Steps:**
1. User scrolls to Photo Gallery
2. User clicks first thumbnail
3. User presses right arrow key
4. User presses Escape

**Expected Results:**
- [ ] Gallery shows thumbnail grid
- [ ] Clicking thumbnail opens lightbox
- [ ] Lightbox shows full-size image
- [ ] Counter shows "1 / 10"
- [ ] Right arrow navigates to next image (counter: "2 / 10")
- [ ] Left arrow navigates to previous
- [ ] Escape closes lightbox
- [ ] Click outside image closes lightbox

#### Failure Path: Last Image Navigation

**Steps:**
1. User is on image 10 of 10
2. User presses right arrow

**Expected Results:**
- [ ] Either wraps to image 1, or right arrow is disabled/hidden

### Flow 6: Share Hackathon

**Scenario:** User shares hackathon on Twitter

**Setup:**
- Mock `onShare` callback

**Steps:**
1. User clicks Twitter share button

**Expected Results:**
- [ ] `onShare` called with `"twitter"`
- [ ] Share text includes hackathon name
- [ ] Share text includes hashtags (#AI4Startups, #TeamEurope)

---

## Empty State Tests

### No Hackathons

**Scenario:** No hackathons exist yet

**Setup:**
- `hackathons = []`

**Expected Results:**
- [ ] Empty state shows "No hackathons yet"
- [ ] Methodology section still displays
- [ ] Country filter is hidden or disabled

### No Photos in Gallery

**Scenario:** Hackathon has no photos

**Setup:**
- `hackathon.photos = []`

**Expected Results:**
- [ ] Photo Gallery section is hidden, or shows "No photos yet"
- [ ] No broken image placeholders

---

## Component Interaction Tests

### HackathonCard

**Renders correctly:**
- [ ] Shows hero thumbnail image
- [ ] Shows event name
- [ ] Shows date range formatted (e.g., "Mar 15-17, 2024")
- [ ] Shows location with country flag
- [ ] Shows participant count badge

**User interactions:**
- [ ] Clicking card triggers navigation
- [ ] Hover shows shadow effect

### Lightbox

**Renders correctly:**
- [ ] Full-screen dark backdrop
- [ ] Centered image
- [ ] Close button (X) in corner
- [ ] Navigation arrows on sides
- [ ] Image counter

**User interactions:**
- [ ] Left/right arrows navigate images
- [ ] Keyboard arrows work
- [ ] Escape closes lightbox
- [ ] Clicking backdrop closes lightbox

### Breadcrumb

**Renders correctly:**
- [ ] Shows "Hackathons > [Event Name]"
- [ ] "Hackathons" is a link

**User interactions:**
- [ ] Clicking "Hackathons" triggers `onBack`

---

## Edge Cases

- [ ] Handles hackathons with very long names
- [ ] Handles single photo in gallery
- [ ] Handles missing hero image (shows placeholder)
- [ ] Date formatting handles single-day events
- [ ] Responsive: cards stack on mobile

---

## Accessibility Checks

- [ ] Gallery images have alt text
- [ ] Lightbox has ARIA labels
- [ ] Keyboard navigation works throughout
- [ ] Share buttons have accessible names
- [ ] Download buttons indicate file type

---

## Sample Test Data

```typescript
const mockHackathon = {
  id: "nairobi-2024",
  name: "Nairobi AI Hackathon",
  slug: "nairobi-2024",
  dates: { start: "2024-03-15", end: "2024-03-17" },
  location: { city: "Nairobi", country: "Kenya", countryCode: "KE" },
  participantCount: 75,
  heroImage: "/images/hackathons/nairobi-hero.jpg",
  theme: "AI for Agriculture",
  challenge: "Build AI solutions for smallholder farmers...",
  challengeBriefPdf: "/pdfs/nairobi-challenge.pdf",
  bestPracticesPdf: "/pdfs/nairobi-best-practices.pdf",
  winningTeams: [...],
  photos: [...]
}
```
