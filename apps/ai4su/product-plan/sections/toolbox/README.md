# Toolbox Section

## Overview

The Toolbox is the central resource hub and main value proposition of AI4Startups. It showcases all 24 open-source AI models with GitHub links, research studies with downloadable PDFs, hackathon best practices reports, and the final program report. Users can browse, filter by sector and country, search, and access all program deliverables.

## User Flows

1. **Browse Models** — View model grid → Use filters → Click card → See details
2. **Search Models** — Type in search → Results filter in real-time
3. **View Model Details** — Click card → Modal opens → Click GitHub link
4. **Download Resources** — Browse studies → Click download → PDF downloads

## Components Provided

| Component | Description |
|-----------|-------------|
| `KPISummaryBar` | Compact metrics bar at page top |
| `SearchInput` | Search field with magnifying glass icon |
| `ModelFilterSidebar` | Sector and country filter checkboxes |
| `ModelCard` | Model preview with sector badge |
| `ModelGrid` | Responsive grid of model cards |
| `ModelDetailModal` | Full model details with GitHub link |
| `EmptyState` | "No models found" when filters match nothing |
| `StudiesSection` | Study cards with download buttons |
| `BestPracticesSection` | Hackathon-linked report cards |
| `FinalReportCard` | Prominent final report download |
| `Toolbox` | Main container composing all sections |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onModelClick` | Called when user clicks model card |
| `onGitHubClick` | Called when user clicks GitHub button |
| `onDownload` | Called when user clicks download button |
| `onFilterChange` | Called when filters change |
| `onSearch` | Called when search query changes |

## Data Used

**Entities from types.ts:**
- `AIModel` — Model name, description, sector, country, GitHub URL
- `Study` — Research document with PDF
- `BestPracticesReport` — Hackathon-linked report
- `FinalReport` — Program final report

## Visual Reference

Model cards show sector badges with colors. Filters collapse to dropdown on mobile. Modal has GitHub button with external link icon.
