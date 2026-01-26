# Application Shell Specification

## Overview
AI4Startups uses a top navigation layout optimized for a public showcase website. The shell includes a header with navigation, search, and language switcher, plus an EU-compliant footer with mandatory attribution and partner logos.

## Navigation Structure
- **Home** → Landing page with hero and KPIs
- **Toolbox** → AI models, studies, and resources (priority section)
- **Hackathons** → Hackathon documentation and results
- **Ecosystem** → Activities, events, and women founders program
- **Partners** → Team Europe and service providers

## Header Components
- **Logo**: AI4Startups logo (left)
- **Main Navigation**: Horizontal nav links (center)
- **Search**: Search icon that expands to input (right)
- **Language Switcher**: EN/FR toggle (right)
- **Mobile**: Hamburger menu icon triggers slide-out drawer

## Footer Components
- **EU Attribution**: EU logo + "Funded by the European Union" (mandatory)
- **Partner Logos**: Digital Africa, Expertise France, GIZ, Team Europe
- **Legal Links**: Privacy Policy, Legal Notice, Accessibility
- **Social/Hashtags**: #D4DataGOV #DataGovernanceAfrica #TeamEurope
- **Copyright**: © 2026 DataGov Initiative

## Layout Pattern
Top navigation bar (sticky) with main content area and footer at bottom.

## Responsive Behavior
- **Desktop (1024px+)**: Full horizontal navigation, search input visible
- **Tablet (768-1023px)**: Condensed navigation, search icon only
- **Mobile (<768px)**: Hamburger menu, slide-out navigation drawer, stacked footer

## Design Tokens Applied
- **Primary** (`#003399`): Logo, nav links, footer background
- **Accent** (`#F5CE2A`): Active nav indicator, hover states, CTAs
- **Secondary** (`#9BB1DC`): Footer secondary elements
- **Neutral** (`#DBD2CC`): Borders, subtle backgrounds
- **Typography**: Barlow for all text

## Design Notes
- Header is sticky on scroll (desktop only)
- Active section indicated by yellow underline
- Footer always visible at bottom (not fixed)
- Mobile nav drawer slides from right
- Search expands inline on desktop, full-screen on mobile
- Language switcher persists selection in localStorage
