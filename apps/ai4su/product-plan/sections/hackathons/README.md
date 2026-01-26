# Hackathons Section

## Overview

The Hackathons section documents all 6 AI hackathon events organized across Africa. It showcases the program methodology, event details, challenge briefs, results, photo galleries, and links to the AI models produced. Each hackathon has a dedicated detail page.

## User Flows

1. **Browse Hackathons** — View methodology → Browse cards → Filter by country → Click to view details
2. **View Hackathon Details** — See hero image → Read challenge → Download PDFs → Browse gallery
3. **Download Resources** — Download challenge brief → Download best practices report
4. **Share Hackathon** — Click share button → Post to social media

## Components Provided

### List View
| Component | Description |
|-----------|-------------|
| `MethodologySection` | Hackathon format explanation with icons |
| `CountryFilter` | Filter dropdown by country |
| `HackathonCard` | Event preview card with thumbnail |
| `HackathonGrid` | Responsive grid of hackathon cards |
| `Hackathons` | Main list container |

### Detail View
| Component | Description |
|-----------|-------------|
| `HackathonHero` | Full-width event hero with photo |
| `Breadcrumb` | Navigation breadcrumb |
| `ChallengeBriefSection` | Theme and challenge with PDF download |
| `WinningTeamsSection` | Results and winning teams |
| `OutcomesSection` | Key outcomes and metrics |
| `PhotoGallery` | Thumbnail grid with lightbox |
| `Lightbox` | Full-screen photo viewer |
| `ShareButtons` | Social sharing (Twitter, LinkedIn) |
| `HackathonDetail` | Detail page container |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onHackathonClick` | Navigate to detail page |
| `onCountryFilter` | Filter hackathon list |
| `onDownload` | Download PDF resource |
| `onModelClick` | Navigate to related AI model |
| `onShare` | Open share dialog |
| `onBack` | Return to list |
| `onPhotoClick` | Open lightbox |

## Data Used

**Entities from types.ts:**
- `Hackathon` — Event with dates, location, challenge, results
- `WinningTeam` — Team name, members, project description
- `Photo` — Gallery images with captions

## Visual Reference

Cards show hero thumbnail with date/location overlay. Detail page has full-width hero. Photo gallery opens in lightbox with keyboard navigation (arrows, Escape).
