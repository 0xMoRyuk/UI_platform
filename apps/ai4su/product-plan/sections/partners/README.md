# Partners Section

## Overview

The Partners section showcases all organizations involved in AI4Startups using a tiered layout that emphasizes EU funding compliance. Features three tiers: Funders (EU/Team Europe) at top with mandatory visibility elements, Implementing Partners (Digital Africa, Expertise France, GIZ) in the middle, and Service Providers (Data354, Briter, AWS, Google) at the bottom. Includes DataGov Initiative callout and external links.

## User Flows

1. **View Funders** — See EU flag and attribution → View Team Europe members
2. **Explore Partners** — See Digital Africa lead role → View other implementing partners
3. **View Providers** — See service provider contributions
4. **Learn About DataGov** — Click CTA to visit DataGov website
5. **Follow on Social** — Click Twitter/LinkedIn buttons

## Components Provided

| Component | Description |
|-----------|-------------|
| `PageHeader` | Section hero with title and intro |
| `EUAttributionBanner` | EU flag with "Funded by EU" text |
| `TeamEuropeGrid` | Grid of member state logos |
| `HashtagsDisplay` | Social hashtag chips |
| `FundersSection` | Tier 1 combining EU elements |
| `LeadPartnerCard` | Digital Africa expanded card |
| `PartnerCard` | Smaller partner cards |
| `ImplementingPartnersSection` | Tier 2 partner section |
| `ProviderCard` | Service provider card |
| `ServiceProvidersSection` | Tier 3 provider grid |
| `DatagovCallout` | CTA banner for DataGov Initiative |
| `SocialLinksBar` | Twitter/LinkedIn with hashtags |
| `Partners` | Main container composing all sections |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onPartnerClick` | Open partner website in new tab |
| `onDatagovClick` | Open DataGov website in new tab |
| `onSocialClick` | Open social profile in new tab |

## Data Used

**Entities from types.ts:**
- `Partner` — Name, logo, description, website, role
- `TeamEuropeMember` — Member state with flag
- `DatagovInitiative` — CTA content and URL
- `SocialLinks` — Hashtags and profile URLs

## EU Visibility Compliance

**Mandatory Elements:**
- EU flag with 12 gold stars on blue background
- "Funded by the European Union" text
- Disclaimer text

The Funders section uses EU Dark Blue (`#003399`) background with white text. EU flag should be prominent and correctly rendered.

## Visual Reference

Three-tier layout with clear visual hierarchy. Funders section is largest with dark blue background. Partner logos decrease in size from Tier 1 to Tier 3.
