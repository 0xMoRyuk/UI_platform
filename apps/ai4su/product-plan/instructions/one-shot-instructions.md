# AI4Startups — Complete Implementation Instructions

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

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

## Product Overview

AI4Startups is a showcase website presenting the AI4Startups program results before project closure (March 2026), highlighting open-source AI models, hackathon outcomes, ecosystem activities, and program impact across Africa.

**Sections:**
1. **Home** — Landing page with hero, KPIs, Toolbox highlight
2. **Toolbox** — AI models catalog (~24 models), studies, resources
3. **Hackathons** — Event documentation with photos and downloads
4. **Ecosystem** — Activities map and Women Founders program
5. **Partners** — EU-compliant partner showcase

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with EU-compliant tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Required Colors:**
- Primary: `#003399` (EU Dark Blue)
- Secondary: `#9BB1DC` (EU Light Blue)
- Accent: `#F5CE2A` (EU Yellow)
- Neutral: `#DBD2CC` (EU Sand)

### 2. Data Model Types

Create TypeScript interfaces from `product-plan/data-model/types.ts`:
- `AIModel`, `Hackathon`, `EcosystemActivity`, `Study`, `Partner`, `Country`

### 3. Routing Structure

| Route | Section |
|-------|---------|
| `/` | Home |
| `/toolbox` | Toolbox |
| `/hackathons` | Hackathons |
| `/hackathons/[slug]` | Hackathon Detail |
| `/ecosystem` | Ecosystem |
| `/partners` | Partners |

### 4. Application Shell

Copy components from `product-plan/shell/components/`:
- `AppShell.tsx`, `Header.tsx`, `Footer.tsx`, `MobileNav.tsx`

**Navigation:** Home, Toolbox, Hackathons, Ecosystem, Partners

## Done When

- [ ] Design tokens configured
- [ ] Data model types defined
- [ ] Routes exist for all sections
- [ ] Shell renders with header and footer
- [ ] Navigation links work
- [ ] Responsive on mobile

---

# Milestone 2: Home

## Goal

Implement the landing page with hero, KPIs, and navigation to all content areas.

## What to Implement

Copy from `product-plan/sections/home/components/`:
- `HeroSection.tsx`, `KPIGrid.tsx`, `ToolboxHighlight.tsx`, `SectionPreviews.tsx`, `Home.tsx`

**Callbacks to wire:**
- `onKPIClick` → Navigate to related section
- `onToolboxClick` → Navigate to `/toolbox`
- `onSectionClick` → Navigate to that section

## Files to Reference

- `product-plan/sections/home/tests.md` — Test instructions
- `product-plan/sections/home/types.ts` — TypeScript interfaces
- `product-plan/sections/home/sample-data.json` — Test data

## Done When

- [ ] Hero renders with correct content
- [ ] KPI counters animate on scroll
- [ ] All navigation works
- [ ] Responsive on mobile

---

# Milestone 3: Toolbox

## Goal

Implement the AI models catalog with filtering, search, and downloads.

## What to Implement

Copy from `product-plan/sections/toolbox/components/`:
- `KPISummaryBar.tsx`, `SearchInput.tsx`, `ModelFilterSidebar.tsx`
- `ModelCard.tsx`, `ModelGrid.tsx`, `ModelDetailModal.tsx`, `EmptyState.tsx`
- `StudiesSection.tsx`, `BestPracticesSection.tsx`, `FinalReportCard.tsx`, `Toolbox.tsx`

**Callbacks to wire:**
- `onModelClick` → Open detail modal
- `onGitHubClick` → Open GitHub URL in new tab
- `onDownload` → Download PDF file

## Done When

- [ ] Model grid renders all models
- [ ] Filtering by sector/country works
- [ ] Search filters in real-time
- [ ] Modal shows full model details
- [ ] Downloads work
- [ ] Empty state shows when no matches

---

# Milestone 4: Hackathons

## Goal

Implement hackathon listing and detail pages with photo galleries.

## What to Implement

**List view** from `product-plan/sections/hackathons/components/`:
- `MethodologySection.tsx`, `CountryFilter.tsx`, `HackathonCard.tsx`, `HackathonGrid.tsx`, `Hackathons.tsx`

**Detail view:**
- `HackathonHero.tsx`, `Breadcrumb.tsx`, `ChallengeBriefSection.tsx`
- `WinningTeamsSection.tsx`, `OutcomesSection.tsx`, `PhotoGallery.tsx`, `Lightbox.tsx`
- `ShareButtons.tsx`, `HackathonDetail.tsx`

**Callbacks to wire:**
- `onHackathonClick` → Navigate to `/hackathons/[slug]`
- `onDownload` → Download PDF
- `onShare` → Open share dialog
- `onPhotoClick` → Open lightbox

## Done When

- [ ] Hackathon cards display all events
- [ ] Detail page shows full info
- [ ] Photo lightbox works with keyboard navigation
- [ ] PDFs download correctly
- [ ] Share buttons work

---

# Milestone 5: Ecosystem

## Goal

Implement activities map and list with Women Founders highlight.

## What to Implement

Copy from `product-plan/sections/ecosystem/components/`:
- `EcosystemHero.tsx`, `ActivityFilter.tsx`, `ActivityCard.tsx`, `ActivityList.tsx`
- `ActivityMap.tsx`, `MobileMapToggle.tsx`, `WomenFoundersSection.tsx`
- `TestimonialCarousel.tsx`, `Ecosystem.tsx`

**Map integration:** Use Leaflet with OpenStreetMap tiles

**Callbacks to wire:**
- `onActivityClick` → Expand card
- `onMarkerClick` → Highlight in list
- `onFilterChange` → Update map and list

## Done When

- [ ] Map displays with markers
- [ ] Clicking markers highlights activities
- [ ] Filters work for type and country
- [ ] Cards expand to show details
- [ ] Testimonial carousel navigates
- [ ] Mobile toggle shows/hides map

---

# Milestone 6: Partners

## Goal

Implement three-tier partner showcase with EU compliance.

## What to Implement

Copy from `product-plan/sections/partners/components/`:
- `PageHeader.tsx`, `EUAttributionBanner.tsx`, `TeamEuropeGrid.tsx`, `HashtagsDisplay.tsx`
- `FundersSection.tsx`, `LeadPartnerCard.tsx`, `PartnerCard.tsx`, `ImplementingPartnersSection.tsx`
- `ProviderCard.tsx`, `ServiceProvidersSection.tsx`, `DatagovCallout.tsx`, `SocialLinksBar.tsx`, `Partners.tsx`

**EU Compliance (Critical):**
- EU flag prominently displayed
- "Funded by the European Union" text visible
- Disclaimer text present

**Callbacks to wire:**
- `onPartnerClick` → Open website in new tab
- `onDatagovClick` → Open DataGov website
- `onSocialClick` → Open social profile

## Done When

- [ ] EU flag and attribution visible
- [ ] Three-tier hierarchy is clear
- [ ] All partner links work (new tab)
- [ ] DataGov CTA works
- [ ] Social buttons work

---

## Final Checklist

After all milestones:

- [ ] All routes work correctly
- [ ] Shell navigation works on all pages
- [ ] EU compliance verified (Partners + Footer)
- [ ] Responsive on mobile/tablet/desktop
- [ ] All downloads work
- [ ] All external links open in new tabs
- [ ] Empty states display properly
- [ ] Loading states implemented
- [ ] Error handling in place
