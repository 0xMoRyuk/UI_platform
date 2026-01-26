# Home Specification

## Overview
The Home section is the landing page introducing visitors to the AI4Startups program. It features a hero with the program tagline, animated KPI counters highlighting program impact (24 AI models, 6 hackathons, 8 countries, 500+ participants), a prominent Toolbox highlight, and quick navigation to all content areas.

## User Flows
- Visitor lands on page → Sees hero with tagline and primary CTA → Understands program purpose
- Visitor views KPI counters → Counters animate on scroll → Clicks a KPI card → Navigates to relevant section
- Visitor scrolls to Toolbox highlight → Sees preview of AI models → Clicks "Explore Toolbox" CTA → Goes to Toolbox page
- Visitor browses section previews → Clicks Hackathons/Ecosystem/Partners card → Navigates to that section

## UI Requirements
- Hero section with EU Dark Blue gradient background, program title "AI4Startups", subtitle describing the initiative, and yellow CTA button
- KPI counter grid with 4 cards: AI Models (24), Hackathons (6), Countries (8), Participants (500+)
- KPI counters animate with count-up effect on scroll into view
- KPI cards are clickable and navigate to relevant sections (Toolbox, Hackathons, Ecosystem)
- Toolbox highlight section with preview cards of featured AI models and "Explore Toolbox" CTA
- Section preview cards for Hackathons, Ecosystem, Partners with image thumbnails and short descriptions
- All sections use EU color palette: primary #003399, accent #F5CE2A, secondary #9BB1DC
- Responsive layout: single column on mobile, 2-column on tablet, multi-column grid on desktop
- Smooth scroll behavior between sections
- Lazy loading for images below the fold

## Configuration
- shell: true
