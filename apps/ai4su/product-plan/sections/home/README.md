# Home Section

## Overview

The Home section is the landing page introducing visitors to the AI4Startups program. It features a hero with the program tagline, animated KPI counters highlighting program impact (24 AI models, 6 hackathons, 8 countries, 500+ participants), a prominent Toolbox highlight, and quick navigation to all content areas.

## User Flows

1. **Land and Understand** — Visitor sees hero → Reads tagline → Understands program purpose
2. **View Impact Metrics** — Scroll to KPIs → Counters animate → Click card → Navigate to section
3. **Explore Toolbox** — See featured models → Click "Explore Toolbox" → Go to Toolbox
4. **Navigate to Section** — Click preview card → Navigate to that section

## Components Provided

| Component | Description |
|-----------|-------------|
| `HeroSection` | Full-width hero with gradient, title, CTA button |
| `KPIGrid` | Animated counter cards (models, hackathons, countries, participants) |
| `ToolboxHighlight` | Featured AI models preview with CTA |
| `SectionPreviews` | Navigation cards to other sections |
| `Home` | Main container composing all sections |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onKPIClick` | Called when user clicks a KPI card |
| `onToolboxClick` | Called when user clicks "Explore Toolbox" |
| `onSectionClick` | Called when user clicks section preview |

## Data Used

**Entities from types.ts:**
- `HeroContent` — Title, subtitle, CTA text
- `KPIItem` — Label, value, icon, target section
- `ToolboxHighlightContent` — Featured models, CTA
- `SectionPreview` — Section cards with images

## Visual Reference

The hero uses EU Dark Blue gradient (`#003399` to `#001133`) with yellow CTA button (`#F5CE2A`). KPI counters animate on scroll.
