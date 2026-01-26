# Toolbox Specification

## Overview
The Toolbox is the central resource hub and main value proposition of AI4Startups. It showcases all 24 open-source AI models with GitHub links, research studies with downloadable PDFs, hackathon best practices reports, and the final program report. Users can browse, filter by sector and country, search, and access all program deliverables.

## User Flows
- User lands on Toolbox → Sees compact KPI summary bar → Understands program scope at a glance
- User browses AI Models grid → Uses sector/country filters in sidebar → Narrows results → Clicks model card → Modal opens with full details and GitHub link
- User searches for specific model → Types in search input → Results filter in real-time → Finds target model
- User explores Studies section → Sees study cards with thumbnails → Clicks download button → PDF downloads
- User accesses Best Practices → Browses hackathon-linked reports → Downloads specific hackathon's best practices PDF
- User downloads Final Report → Clicks prominent download button → Gets comprehensive program report PDF

## UI Requirements
- Compact KPI summary bar at page top: 4 metrics (Models: 24, Hackathons: 6, Countries: 8, Studies: 4)
- Search input with magnifying glass icon, filters results as user types
- Filter sidebar on desktop with checkboxes for Sector (Agriculture, Healthcare, FinTech, Education, Environment, Logistics) and Country (8 African countries)
- Filters collapse to dropdown/sheet on mobile
- AI Models grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Model cards showing: name, short description (2 lines max), sector badge with color, country flag, GitHub button
- Model detail modal with: full description, use case, technical requirements, GitHub repository link, related hackathon link
- Studies section below models: card grid with study title, partner logo (Briter), description preview, download PDF button
- Best Practices section: cards linked to hackathons with download buttons
- Final Report: prominent card with EU branding and download button
- Empty state when no models match filters
- Loading skeletons while data loads
- All interactive elements use EU accent color (#F5CE2A) for hover/focus states

## Configuration
- shell: true
