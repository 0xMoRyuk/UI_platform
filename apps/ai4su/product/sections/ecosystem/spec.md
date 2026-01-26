# Ecosystem Specification

## Overview
The Ecosystem section showcases all ecosystem-building activities beyond hackathons: networking events, research initiatives, workshops, and the Women Founders support program. Features an interactive map showing activities across 8 African countries alongside a filterable activity list, plus a dedicated Women Founders highlight section.

## User Flows
- User lands on Ecosystem page → Sees split view with map on left, activity list on right → Understands geographic spread of activities
- User interacts with map → Hovers over markers to see previews → Clicks marker → Activity card highlights in list → Scrolls to details
- User filters activities → Selects activity type (Events, Research, Workshops, Women Founders) → List and map markers filter accordingly
- User filters by country → Selects country from dropdown → Map zooms to country → List shows only that country's activities
- User explores Women Founders section → Scrolls to dedicated highlight → Sees program stats, participant testimonials, and photos
- User views activity details → Clicks activity card → Expands to show full description, photos, resources
- User downloads resources → Clicks PDF download button → Resource downloads

## UI Requirements
- Split layout on desktop: interactive map (40% width) on left, activity list (60% width) on right
- Map uses Leaflet with OpenStreetMap tiles, markers colored by activity type
- Map markers: Events (blue), Research (purple), Workshops (green), Women Founders (pink)
- Marker popups show activity title, date, and "View Details" link
- Activity type filter tabs above list: All, Events, Research, Workshops
- Country filter dropdown in header area
- Activity cards showing: title, type badge, date range, location with flag, thumbnail, short description
- Cards expandable to show full description, photo gallery, and download links
- Dedicated Women Founders highlight section between intro and activity list:
  - Section header with program title and description
  - Stats row: participants supported, countries, success stories
  - Testimonial carousel with participant quotes and photos
  - "Learn More" expandable with program details
- Mobile responsive: map hidden by default, toggle button to show map overlay
- Loading states for map tiles and activity data
- Empty state when no activities match filters

## Configuration
- shell: true
