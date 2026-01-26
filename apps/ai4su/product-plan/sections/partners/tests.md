# Test Instructions: Partners

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Partners section has a three-tier layout with EU compliance requirements. Test that mandatory EU elements are present, links work, and visual hierarchy is correct.

---

## User Flow Tests

### Flow 1: View Funders Section

**Scenario:** User views EU funding attribution

**Setup:**
- Render Partners with EU attribution data

**Steps:**
1. User navigates to `/partners`
2. User sees Funders (Tier 1) section

**Expected Results:**
- [ ] EU flag is prominently displayed
- [ ] Flag has 12 gold stars on blue background
- [ ] "Funded by the European Union" text is visible
- [ ] Disclaimer text is present
- [ ] Section has dark blue background (`#003399`)

### Flow 2: View Team Europe Members

**Scenario:** User views Team Europe logos

**Setup:**
- Render with Team Europe members (EU, France, Germany)

**Steps:**
1. User scrolls within Funders section
2. User sees Team Europe grid

**Expected Results:**
- [ ] "Team Europe" heading is visible
- [ ] EU logo has "Primary" badge
- [ ] France and Germany logos are displayed
- [ ] Logos are clickable

### Flow 3: Click Partner Logo

**Scenario:** User clicks to visit partner website

**Setup:**
- Mock `onPartnerClick` callback

**Steps:**
1. User clicks EU logo

**Expected Results:**
- [ ] `onPartnerClick` called with `("eu", "https://european-union.europa.eu")`
- [ ] Link opens in new tab (target="_blank")
- [ ] Link has rel="noopener noreferrer"

### Flow 4: View Implementing Partners

**Scenario:** User views Digital Africa and other partners

**Steps:**
1. User scrolls to Implementing Partners (Tier 2)

**Expected Results:**
- [ ] Digital Africa shows as lead partner (larger card)
- [ ] Digital Africa card has full description
- [ ] Expertise France and GIZ show as smaller cards
- [ ] Each card has "Visit Website" button
- [ ] Section has white/light background

### Flow 5: View Service Providers

**Scenario:** User views provider grid

**Steps:**
1. User scrolls to Service Providers (Tier 3)

**Expected Results:**
- [ ] Data354, Briter, AWS, Google cards displayed
- [ ] Each card shows services/contributions
- [ ] Cards are smaller than Tier 2
- [ ] Section has gray background (visual differentiation)

### Flow 6: DataGov Initiative CTA

**Scenario:** User clicks DataGov callout

**Setup:**
- Mock `onDatagovClick` callback

**Steps:**
1. User scrolls to DataGov Initiative callout
2. User clicks "Learn More About DataGov" button

**Expected Results:**
- [ ] Callout shows initiative description
- [ ] CTA button has yellow accent color
- [ ] `onDatagovClick` called with DataGov URL
- [ ] Opens in new tab

### Flow 7: Social Media Links

**Scenario:** User clicks social buttons

**Setup:**
- Mock `onSocialClick` callback

**Steps:**
1. User scrolls to bottom
2. User sees hashtags
3. User clicks Twitter button

**Expected Results:**
- [ ] Hashtags display: #AI4Startups, #TeamEurope, etc.
- [ ] Twitter button has Twitter brand color
- [ ] LinkedIn button has LinkedIn brand color
- [ ] `onSocialClick` called with `"twitter"`

---

## Empty State Tests

### No Service Providers

**Scenario:** Service providers list is empty

**Setup:**
- `serviceProviders.providers = []`

**Expected Results:**
- [ ] Tier 3 section is hidden OR shows placeholder
- [ ] Does not show empty grid
- [ ] Tier 1 and Tier 2 still display normally

### No Team Europe Members

**Scenario:** Team Europe list is empty (only EU)

**Setup:**
- `funders.teamEurope.members = [euOnly]`

**Expected Results:**
- [ ] EU logo still displays
- [ ] Grid shows single item
- [ ] "Team Europe" section heading may be hidden

---

## Component Interaction Tests

### EUAttributionBanner

**Renders correctly:**
- [ ] EU flag displays with correct colors
- [ ] Flag has 12 stars in circle
- [ ] "Funded by the European Union" text visible
- [ ] Disclaimer text in smaller font

### LeadPartnerCard

**Renders correctly:**
- [ ] Shows "Lead Implementing Partner" badge
- [ ] Has dark blue header with logo
- [ ] Shows full description
- [ ] Lists contributions
- [ ] "Visit Website" button visible

**User interactions:**
- [ ] Clicking button triggers `onClick`

### PartnerCard

**Renders correctly:**
- [ ] Shows role badge
- [ ] Shows partner logo
- [ ] Shows description
- [ ] Shows top 3 contributions

### ProviderCard

**Renders correctly:**
- [ ] Shows provider name
- [ ] Shows services as tags
- [ ] Shows short description
- [ ] "Learn More" link visible

### DatagovCallout

**Renders correctly:**
- [ ] Has dark blue background with gradient
- [ ] Shows globe icon
- [ ] Shows initiative description
- [ ] CTA button is prominent
- [ ] Highlights list with checkmarks

---

## EU Compliance Checks

**Critical - These MUST pass:**
- [ ] EU flag is visible without scrolling (above fold on most screens)
- [ ] "Funded by the European Union" text is legible
- [ ] Flag uses correct colors (blue: #003399, yellow: #F5CE2A)
- [ ] Disclaimer is present on page
- [ ] Partner logos don't overshadow EU flag

---

## Edge Cases

- [ ] Very long partner descriptions truncate properly
- [ ] Partner with no logo shows placeholder
- [ ] Partner with no website hides "Visit" button
- [ ] Mobile: cards stack in single column
- [ ] Print styles maintain EU visibility

---

## Accessibility Checks

- [ ] All logos have alt text with org name
- [ ] External links indicate "opens in new tab"
- [ ] Color contrast meets WCAG AA on dark sections
- [ ] Social buttons have accessible labels
- [ ] Keyboard can reach all interactive elements

---

## Sample Test Data

```typescript
const mockFunders = {
  euAttribution: {
    text: "Funded by the European Union",
    flagUrl: "/logos/eu-flag.svg",
    disclaimer: "This website was created with EU financial support..."
  },
  teamEurope: {
    title: "Team Europe",
    members: [
      { id: "eu", name: "European Union", logoUrl: "...", websiteUrl: "...", isPrimary: true },
      { id: "france", name: "France", logoUrl: "...", websiteUrl: "...", isPrimary: false }
    ]
  }
}

const mockLeadPartner = {
  id: "digital-africa",
  name: "Digital Africa",
  role: "Lead Implementing Partner",
  logoUrl: "/logos/digital-africa.svg",
  websiteUrl: "https://digital-africa.co",
  fullDescription: "Digital Africa is a platform initiative...",
  contributions: ["Program coordination", "Hackathon organization", "Startup support"],
  isLead: true
}
```
