# Ecosystem Section

## Overview

The Ecosystem section showcases all ecosystem-building activities beyond hackathons: networking events, research initiatives, workshops, and the Women Founders support program. Features an interactive map showing activities across 8 African countries alongside a filterable activity list, plus a dedicated Women Founders highlight section.

## User Flows

1. **Explore Map and List** — View split layout → Hover map markers → Click to highlight in list
2. **Filter Activities** — Select type filter → Map and list update
3. **Filter by Country** — Select country → Map zooms → List filters
4. **View Details** — Click activity card → Expand to see full info → Download resources
5. **Women Founders** — Scroll to highlight → View stats → Browse testimonials

## Components Provided

| Component | Description |
|-----------|-------------|
| `EcosystemHero` | Section header with intro |
| `ActivityFilter` | Type and country filter controls |
| `ActivityCard` | Expandable activity card |
| `ActivityList` | Scrollable list of activity cards |
| `ActivityMap` | Leaflet map with colored markers |
| `MobileMapToggle` | Toggle button for mobile map view |
| `WomenFoundersSection` | Program highlight with stats |
| `TestimonialCarousel` | Participant quotes carousel |
| `Ecosystem` | Main container with split layout |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onActivityClick` | Expand activity card |
| `onMarkerClick` | Highlight activity in list |
| `onFilterChange` | Update map and list filters |
| `onDownload` | Download resource PDF |

## Data Used

**Entities from types.ts:**
- `EcosystemActivity` — Activity with type, location, GPS, description
- `WomenFoundersContent` — Program stats and description
- `Testimonial` — Participant quote with photo

## Map Integration

The map uses Leaflet with OpenStreetMap tiles. Markers are color-coded:
- **Blue:** Events
- **Purple:** Research
- **Green:** Workshops
- **Pink:** Women Founders

## Visual Reference

Desktop shows split layout (40% map, 60% list). Mobile hides map by default with toggle button. Activity cards expand on click to show full details.
