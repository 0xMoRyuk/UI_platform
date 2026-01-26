# Test Instructions: Home

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

The Home section is the landing page with hero, KPI counters, Toolbox highlight, and section navigation. Test that all elements render correctly and navigation callbacks work.

---

## User Flow Tests

### Flow 1: Land and Understand

**Scenario:** User lands on home page and understands the program

**Setup:**
- Render Home component with sample hero data

**Steps:**
1. User navigates to `/`
2. User sees hero section

**Expected Results:**
- [ ] Hero displays title "AI4Startups"
- [ ] Hero displays subtitle about open-source AI models
- [ ] Hero displays "Explore Toolbox" CTA button
- [ ] EU Dark Blue gradient background is visible

### Flow 2: View KPI Metrics

**Scenario:** User views animated KPI counters

**Setup:**
- Render Home with KPI data: `{ models: 24, hackathons: 6, countries: 8, participants: 500 }`

**Steps:**
1. User scrolls to KPI section
2. User observes counter animations

**Expected Results:**
- [ ] Four KPI cards are displayed
- [ ] "AI Models" card shows "24"
- [ ] "Hackathons" card shows "6"
- [ ] "Countries" card shows "8"
- [ ] "Participants" card shows "500+"
- [ ] Cards have hover effect

### Flow 3: Click KPI Card

**Scenario:** User clicks a KPI card to navigate

**Setup:**
- Mock `onKPIClick` callback

**Steps:**
1. User clicks "AI Models" KPI card

**Expected Results:**
- [ ] `onKPIClick` is called with `"toolbox"` argument
- [ ] Card shows click feedback (visual state change)

### Flow 4: Explore Toolbox

**Scenario:** User clicks "Explore Toolbox" CTA

**Setup:**
- Mock `onToolboxClick` callback

**Steps:**
1. User clicks "Explore Toolbox" button in hero OR Toolbox highlight section

**Expected Results:**
- [ ] `onToolboxClick` is called
- [ ] Button has yellow background (`#F5CE2A`)

### Flow 5: Navigate via Section Preview

**Scenario:** User clicks section preview card

**Setup:**
- Mock `onSectionClick` callback

**Steps:**
1. User clicks "Hackathons" preview card

**Expected Results:**
- [ ] `onSectionClick` is called with `"hackathons"` argument
- [ ] Card shows hover state before click

---

## Empty State Tests

### No Featured Models

**Scenario:** Toolbox highlight has no featured models

**Setup:**
- `toolboxHighlight.featuredModels = []`

**Expected Results:**
- [ ] Toolbox highlight section still renders
- [ ] Shows placeholder or "Coming soon" message
- [ ] "Explore Toolbox" CTA still functional

---

## Component Interaction Tests

### HeroSection

**Renders correctly:**
- [ ] Displays title "AI4Startups"
- [ ] Displays subtitle text
- [ ] Displays CTA button with correct label
- [ ] Background has EU blue gradient

**User interactions:**
- [ ] Clicking CTA button triggers `onCtaClick`

### KPIGrid

**Renders correctly:**
- [ ] Displays 4 KPI cards in a grid
- [ ] Each card shows icon, label, and value
- [ ] Values are formatted correctly (500+ not 500)

**User interactions:**
- [ ] Clicking card triggers `onKPIClick` with section ID
- [ ] Hover shows visual feedback

### ToolboxHighlight

**Renders correctly:**
- [ ] Shows section heading
- [ ] Displays featured model cards
- [ ] Shows "Explore Toolbox" button

**User interactions:**
- [ ] Clicking model card triggers callback
- [ ] Clicking CTA triggers `onExploreClick`

---

## Edge Cases

- [ ] Handles missing hero content gracefully
- [ ] KPI values of 0 display correctly
- [ ] Very long titles truncate properly
- [ ] Works with 1-4 section previews

---

## Accessibility Checks

- [ ] All buttons are keyboard accessible
- [ ] KPI cards have appropriate ARIA labels
- [ ] Color contrast meets WCAG AA (white text on #003399)
- [ ] Focus states are visible

---

## Sample Test Data

```typescript
const mockHero = {
  title: "AI4Startups",
  subtitle: "Open-source AI models for African innovation",
  ctaText: "Explore Toolbox",
  ctaHref: "/toolbox"
}

const mockKPIs = [
  { id: "models", label: "AI Models", value: 24, icon: "package", section: "toolbox" },
  { id: "hackathons", label: "Hackathons", value: 6, icon: "trophy", section: "hackathons" },
  { id: "countries", label: "Countries", value: 8, icon: "globe", section: "ecosystem" },
  { id: "participants", label: "Participants", value: 500, suffix: "+", section: "ecosystem" }
]
```
