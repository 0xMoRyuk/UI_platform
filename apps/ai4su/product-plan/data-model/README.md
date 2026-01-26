# Data Model

## Overview

AI4Startups uses these core entities to structure program data. The entities are designed to support the showcase website's key features: AI model catalog, hackathon documentation, ecosystem activities, and partner information.

## Entities

### AIModel

An open-source AI model developed during the AI4Startups program.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (slug) |
| name | string | Model display name |
| shortDescription | string | Brief description (2 lines max) |
| fullDescription | string | Detailed description |
| sector | string | Category (agriculture, healthcare, etc.) |
| country | string | Country code (KE, NG, etc.) |
| githubUrl | string | GitHub repository URL |
| useCase | string | Primary use case description |
| requirements | string | Technical requirements |
| hackathonId | string? | Related hackathon (if any) |

### Hackathon

A hackathon event organized as part of the program.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Event name |
| slug | string | URL-safe identifier |
| dates | DateRange | Start and end dates |
| location | Location | City, country, venue |
| theme | string | Hackathon theme |
| challenge | string | Challenge description |
| participantCount | number | Number of participants |
| heroImage | string | Hero image URL |
| challengeBriefPdf | string | Challenge brief PDF URL |
| bestPracticesPdf | string | Best practices PDF URL |
| winningTeams | WinningTeam[] | Winning teams |
| photos | Photo[] | Event photos |
| modelIds | string[] | AI models produced |

### EcosystemActivity

An ecosystem-building activity such as events, workshops, or research.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Activity title |
| type | string | Type (event, research, workshop) |
| dates | DateRange | Start and end dates |
| location | LocationWithCoords | Location with GPS |
| shortDescription | string | Brief description |
| fullDescription | string | Detailed description |
| photos | Photo[] | Activity photos |
| resources | Resource[] | Downloadable resources |

### Study

A research document or analysis produced during the program.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Study title |
| description | string | Study description |
| partnerId | string | Producing partner (e.g., Briter) |
| pdfUrl | string | PDF download URL |
| thumbnailUrl | string | Thumbnail image |
| keyFindings | string[] | Key findings list |

### Partner

An organization involved in the program.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Organization name |
| role | string | Role description |
| tier | number | Partner tier (1=Funder, 2=Implementer, 3=Provider) |
| logoUrl | string | Logo image URL |
| websiteUrl | string | Organization website |
| description | string | Organization description |
| contributions | string[] | Key contributions |
| isLead | boolean | Is lead implementing partner |

### Country

An African country participating in the program.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Country code (ISO 3166-1 alpha-2) |
| name | string | Country name |
| flagUrl | string | Flag image URL |
| coordinates | Coordinates | Map center point |

## Relationships

```
Hackathon ──produces──> AIModel (1:N)
Hackathon ──occurs in──> Country (N:1)
Hackathon ──implemented by──> Partner (N:M)

EcosystemActivity ──occurs in──> Country (N:1)
EcosystemActivity ──linked to──> Partner (N:1, optional)

Study ──produced by──> Partner (N:1)

AIModel ──targets──> Country (N:M, deployment regions)

Partner ──funds/implements──> Hackathon (N:M)
```

## Type Definitions

See `types.ts` for full TypeScript interfaces. The types are designed to be:
- **Self-contained:** No external dependencies
- **Props-ready:** Structured for React component props
- **Nullable-safe:** Optional fields clearly marked
