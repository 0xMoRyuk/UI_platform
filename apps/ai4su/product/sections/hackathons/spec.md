# Hackathons Specification

## Overview
The Hackathons section documents all 6 AI hackathon events organized across Africa. It showcases the program methodology, event details, challenge briefs, results, photo galleries, and links to the AI models produced. Each hackathon has a dedicated detail page with comprehensive information and downloadable resources.

## User Flows
- User lands on Hackathons page → Reads methodology overview → Understands hackathon format and objectives
- User browses hackathon cards → Optionally filters by country → Clicks event card → Navigates to /hackathons/[slug] detail page
- User views hackathon detail page → Sees hero image, event info, theme → Downloads challenge brief PDF
- User explores results section → Sees winning teams and outcomes → Clicks AI model links → Navigates to Toolbox filtered by hackathon
- User browses photo gallery → Clicks thumbnail → Lightbox opens → Navigates through photos with arrows
- User downloads best practices → Clicks download button → PDF downloads

## UI Requirements
- Methodology overview section at page top with 3-4 icon cards explaining: Challenge Design, Mentorship, Development Sprint, Demo Day
- Hackathon cards grid (3 columns desktop, 2 tablet, 1 mobile) showing: event name, hero thumbnail, date range, location with country flag, participant count badge, models produced count
- Cards link to dedicated detail pages at /hackathons/[slug]
- Optional country filter dropdown to narrow results
- Detail page layout:
  - Hero section with full-width event photo, title overlay, date/location
  - Event info sidebar: dates, location, venue, participant count, partners involved
  - Theme & Challenge section: challenge description, problem statement, PDF download button for challenge brief
  - Results section: winning teams with descriptions, key outcomes and metrics
  - AI Models section: cards linking to models produced (filtered Toolbox view)
  - Best Practices section: report summary, PDF download button
  - Photo Gallery: thumbnail grid, click to open lightbox with navigation
- Back to all hackathons link on detail page
- Breadcrumb navigation: Hackathons > [Event Name]
- Share buttons for social media (Twitter/X, LinkedIn)
- All downloads use EU accent color (#F5CE2A) for buttons
- Loading skeleton states for images and content

## Configuration
- shell: true
