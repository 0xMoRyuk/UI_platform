# AI4Startups — Product Overview

## Summary

AI4Startups is a showcase website presenting the AI4Startups program results before project closure (March 2026), highlighting open-source AI models, hackathon outcomes, ecosystem activities, and program impact across Africa.

The product solves key problems for African startups by providing:
- Visibility into available AI resources for local contexts (~24 open-source models)
- Centralized access to program results (studies, reports, best practices)
- Documented hackathon outcomes and reusable resources
- Clear ecosystem impact visualization for institutional stakeholders
- Static, lightweight architecture for post-project maintenance

## Planned Sections

1. **Home** — Landing page with hero section, program KPIs overview, Toolbox highlight, and navigation to all program areas.

2. **Toolbox** — AI models repository (~24 open-source models), studies, best practices reports, and downloadable resources — the main value proposition.

3. **Hackathons** — Documentation of all hackathons organized with challenge briefs, best practices reports, results, photos, and links to developed AI models.

4. **Ecosystem** — Ecosystem activities including networking events, research studies, women founders program, and interactive map of activities across Africa.

5. **Partners** — Team Europe partners, service providers, Digital Africa presentation, and EU-compliant attribution with logos.

## Data Model

**Entities:**
- `AIModel` — Open-source AI models with GitHub links, sector, country
- `Hackathon` — Events with dates, location, challenge briefs, results
- `EcosystemActivity` — Events, research, workshops with GPS coordinates
- `Study` — Research documents with PDFs and key findings
- `Partner` — Organizations (funders, implementers, service providers)
- `Country` — 8 African countries with coordinates for maps

**Key Relationships:**
- Hackathon produces many AIModel
- Hackathon occurs in one Country
- EcosystemActivity occurs in one Country
- Study is produced by one Partner

## Design System

**Colors (EU Visibility Compliant):**
- Primary: `#003399` (EU Dark Blue) — Headers, links, primary actions
- Secondary: `#9BB1DC` (EU Light Blue) — Backgrounds, supporting elements
- Accent: `#F5CE2A` (EU Yellow) — CTAs, highlights, focus rings
- Neutral: `#DBD2CC` (EU Sand) — Subtle backgrounds, borders

**Typography:**
- Heading: Barlow (fallback: Arial)
- Body: Barlow (fallback: Arial)
- Mono: JetBrains Mono (fallback: monospace)

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Home** — Landing page with hero, KPI counters, and section previews
3. **Toolbox** — AI models catalog with filtering, studies, and downloads
4. **Hackathons** — Event listing and detail pages with photo galleries
5. **Ecosystem** — Activity map/list with Women Founders highlight
6. **Partners** — Three-tier partner showcase with EU compliance

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
