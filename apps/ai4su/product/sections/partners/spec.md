# Partners Specification

## Overview
The Partners section showcases all organizations involved in AI4Startups using a tiered layout that emphasizes EU funding compliance. Features three tiers: Funders (EU/Team Europe) at top with mandatory visibility elements, Implementing Partners (Digital Africa, Expertise France, GIZ) in the middle, and Service Providers (Data354, Briter) at the bottom. Includes DataGov Initiative callout and external links to all partner websites.

## User Flows
- User lands on Partners page → Sees tiered partner sections → Understands program funding and implementation structure
- User views Funders section → Sees EU flag and "Funded by the European Union" → Sees Team Europe member logos → Understands EU involvement
- User explores Implementing Partners → Reads about Digital Africa's lead role → Sees Expertise France and GIZ contributions
- User views Service Providers → Sees Data354 and Briter logos → Understands their technical contributions
- User clicks partner logo or "Visit Website" → Opens partner website in new tab
- User clicks DataGov Initiative callout → Navigates to DataGov website

## UI Requirements
- Page header with "Our Partners" title and intro paragraph about collaborative nature of AI4Startups
- Three-tier layout with clear visual hierarchy:

### Tier 1: Funders (EU Visibility Compliant)
- Full-width section with EU Dark Blue (#003399) background
- EU flag (mandatory) prominently displayed
- "Funded by the European Union" text (mandatory)
- Global Gateway logo and mention
- Team Europe member state flags/logos in grid (if applicable)
- Most prominent section with largest logos

### Tier 2: Implementing Partners
- White/light background section
- Digital Africa as lead partner with:
  - Large logo
  - Extended description (2-3 paragraphs)
  - Mission statement
  - "Learn More" link to website
- Expertise France and GIZ with:
  - Medium logos
  - Short descriptions (1 paragraph each)
  - Website links

### Tier 3: Service Providers
- Light gray background section
- Logo grid (3-4 columns on desktop)
- Each provider shows: logo, name, one-line description, website link
- Smaller logos than implementing partners

### DataGov Initiative Callout
- Highlighted card/banner linking to DataGov Initiative website
- Brief description of the broader initiative
- Prominent CTA button

### Footer Integration
- Note that EU attribution also appears in site footer (shell component)
- Partners page provides extended information

## Configuration
- shell: true
