# Milestone 6: Partners

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

Implement the Partners section — three-tier partner showcase with EU compliance.

## Overview

The Partners section showcases all organizations involved in AI4Startups using a tiered layout that emphasizes EU funding compliance. Features three tiers: Funders (EU/Team Europe), Implementing Partners (Digital Africa, Expertise France, GIZ), and Service Providers (Data354, Briter, AWS, Google).

**Key Functionality:**
- Display EU attribution with mandatory visibility elements
- Show Team Europe member logos
- Present implementing partners with descriptions
- List service providers with their contributions
- Link to partner websites
- Include DataGov Initiative callout
- Show social media links and hashtags

## Recommended Approach: Test-Driven Development

See `product-plan/sections/partners/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/partners/components/`:

- `PageHeader.tsx` — Section hero with title and intro
- `EUAttributionBanner.tsx` — EU flag with "Funded by EU" text
- `TeamEuropeGrid.tsx` — Grid of member state logos
- `HashtagsDisplay.tsx` — Social hashtag chips
- `FundersSection.tsx` — Tier 1 combining EU elements
- `LeadPartnerCard.tsx` — Digital Africa expanded card
- `PartnerCard.tsx` — Smaller partner cards
- `ImplementingPartnersSection.tsx` — Tier 2 partner section
- `ProviderCard.tsx` — Service provider card
- `ServiceProvidersSection.tsx` — Tier 3 provider grid
- `DatagovCallout.tsx` — CTA banner for DataGov Initiative
- `SocialLinksBar.tsx` — Twitter/LinkedIn with hashtags
- `Partners.tsx` — Main container composing all sections

### Data Layer

```typescript
interface PartnersPageProps {
  pageIntro: PageIntro
  funders: Funders
  implementingPartners: ImplementingPartners
  serviceProviders: ServiceProviders
  datagovInitiative: DatagovInitiative
  socialLinks: SocialLinks
  onPartnerClick?: (partnerId: string, websiteUrl: string) => void
  onDatagovClick?: (url: string) => void
  onSocialClick?: (platform: 'twitter' | 'linkedin') => void
}
```

### EU Visibility Compliance

**Mandatory Elements:**
- EU flag prominently displayed
- "Funded by the European Union" text
- Disclaimer text about EU not being responsible for content

**Required Styling:**
- EU Dark Blue (`#003399`) for Funders section background
- EU flag with 12 gold stars on blue background
- Partner logos at appropriate sizes (Funders largest)

### Callbacks

| Callback | Description | Action |
|----------|-------------|--------|
| `onPartnerClick` | User clicks partner logo/link | Open partner website in new tab |
| `onDatagovClick` | User clicks DataGov CTA | Open DataGov website in new tab |
| `onSocialClick` | User clicks Twitter/LinkedIn | Open social profile in new tab |

## Files to Reference

- `product-plan/sections/partners/README.md` — Feature overview
- `product-plan/sections/partners/tests.md` — Test-writing instructions
- `product-plan/sections/partners/components/` — React components
- `product-plan/sections/partners/types.ts` — TypeScript interfaces
- `product-plan/sections/partners/sample-data.json` — Test data

## Expected User Flows

### Flow 1: View Funders

1. User lands on Partners page
2. User sees EU flag and "Funded by the European Union"
3. User sees Team Europe member logos
4. User clicks EU logo
5. **Outcome:** EU website opens in new tab

### Flow 2: Explore Implementing Partners

1. User scrolls to Implementing Partners section
2. User sees Digital Africa as lead partner with full description
3. User sees Expertise France and GIZ cards
4. User clicks "Visit Website" on Digital Africa
5. **Outcome:** Digital Africa website opens in new tab

### Flow 3: View Service Providers

1. User scrolls to Service Providers section
2. User sees provider cards (Data354, Briter, AWS, Google)
3. User clicks on Briter card
4. **Outcome:** Briter website opens in new tab

### Flow 4: Learn About DataGov

1. User scrolls to DataGov Initiative callout
2. User reads about the broader initiative
3. User clicks "Learn More About DataGov" button
4. **Outcome:** DataGov website opens in new tab

### Flow 5: Follow on Social

1. User scrolls to bottom of page
2. User sees hashtags and social buttons
3. User clicks Twitter button
4. **Outcome:** Digital Africa Twitter profile opens

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Page header renders with intro text
- [ ] EU flag displays correctly (12 stars)
- [ ] "Funded by the European Union" text is visible
- [ ] Disclaimer text is present
- [ ] Team Europe logos display in grid
- [ ] Partner logos link to websites (new tab)
- [ ] Digital Africa card shows full description
- [ ] Expertise France and GIZ cards display
- [ ] Service provider cards show with services tags
- [ ] DataGov callout has working CTA button
- [ ] Hashtags display correctly
- [ ] Twitter/LinkedIn buttons work
- [ ] Three-tier visual hierarchy is clear
- [ ] Responsive on mobile
