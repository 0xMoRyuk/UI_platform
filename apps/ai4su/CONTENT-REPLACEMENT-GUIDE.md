# AI4Startups Content Replacement Guide

This document helps the content team replace all synthetic/placeholder data with real content. Each section maps to a JSON data file in `product/`.

> **Convention**: Fields marked with `[UI]` are interface labels (translate but don't change meaning). Fields marked with `[CONTENT]` need real data. Fields marked with `[ASSET]` need actual files uploaded.

---

## 1. Global Shell (`product/shell/data.json`)

| Field | Current Value | Action |
|-------|--------------|--------|
| `header.logoText` | "AI4Startups" | `[UI]` Confirm brand name |
| `footer.en.copyright` | "2026 AI4Startups" | `[UI]` Update year if needed |
| `footer.en.implementedBy` | "by Digital Africa in collaboration with Expertise France" | `[CONTENT]` Verify |
| `footer.fr.*` | French translations | `[UI]` Review all French strings |

---

## 2. Home Page (`product/sections/home/data.json`)

### Hero
| Field | Type | Notes |
|-------|------|-------|
| `hero.subtitle` | `[CONTENT]` | Programme tagline |
| `hero.stats[0].value` | `[CONTENT]` | "24" AI Models count |
| `hero.stats[1].value` | `[CONTENT]` | "8" Countries count |
| `hero.stats[2].value` | `[CONTENT]` | "700+" Participants -- **verify real number** |

### KPIs
| Field | Current | Notes |
|-------|---------|-------|
| `kpis[0].value` | 24 | `[CONTENT]` Real model count |
| `kpis[1].value` | 8 | `[CONTENT]` Real hackathon count |
| `kpis[2].value` | 8 | `[CONTENT]` Real country count |
| `kpis[3].value` | 80 | `[CONTENT]` Real startup count -- **verify** |
| `kpis[3].description` | "reached by AI4startups program" | `[CONTENT]` Confirm wording |

### About Section
| Field | Type | Notes |
|-------|------|-------|
| `about.paragraphs[0..2]` | `[CONTENT]` | 3 programme description paragraphs -- review for accuracy |
| `about.countriesFootnote` | `[CONTENT]` | List of 8 countries -- confirm complete list |
| `about.photos[0..2].url` | `[ASSET]` | 3 programme photos needed (1 featured large + 2 small) |
| `about.photos[*].caption` | `[CONTENT]` | Photo captions |

**Photos needed:**
- [ ] 1 featured photo (landscape, min 800x800) -- e.g. hackathon group shot
- [ ] 2 smaller photos (square, min 400x400) -- e.g. workshop, presentation

### Section Previews
| Field | Type | Notes |
|-------|------|-------|
| `sectionPreviews[*].imageUrl` | `[ASSET]` | 3 preview card thumbnails |
| `sectionPreviews[*].stats` | `[CONTENT]` | Summary stat strings |

**Images needed:**
- [ ] `/images/hackathon-preview.jpg` -- DataGov preview card
- [ ] `/images/ecosystem-preview.jpg` -- Activities preview card
- [ ] `/images/partners-preview.jpg` -- Partners preview card

---

## 3. Hackathons (`product/sections/hackathons/data.json`)

### Per Hackathon (8 total)

Each hackathon record needs the following replaced:

| Field | Type | Priority |
|-------|------|----------|
| `hackathons[n].name` | `[CONTENT]` | Official event name |
| `hackathons[n].tagline` | `[CONTENT]` | Short event tagline |
| `hackathons[n].theme` | `[CONTENT]` | Theme/topic |
| `hackathons[n].description` | `[CONTENT]` | 1-paragraph summary |
| `hackathons[n].startDate` | `[CONTENT]` | Actual date (YYYY-MM-DD) |
| `hackathons[n].endDate` | `[CONTENT]` | Actual date (YYYY-MM-DD) |
| `hackathons[n].location.venue` | `[CONTENT]` | Real venue name |
| `hackathons[n].location.city` | `[CONTENT]` | City |
| `hackathons[n].location.coordinates` | `[CONTENT]` | [lat, lng] of venue |
| `hackathons[n].participantCount` | `[CONTENT]` | Real participant count |
| `hackathons[n].teamCount` | `[CONTENT]` | Real team count |
| `hackathons[n].modelsProduced` | `[CONTENT]` | Real model count |
| `hackathons[n].heroImage` | `[ASSET]` | Hero photo (1440x600 min) |
| `hackathons[n].challengeBrief.title` | `[CONTENT]` | Challenge title |
| `hackathons[n].challengeBrief.summary` | `[CONTENT]` | Challenge description |
| `hackathons[n].challengeBrief.pdfUrl` | `[ASSET]` | Actual PDF upload |
| `hackathons[n].partners[]` | `[CONTENT]` | Real partner org names |

### Winning Teams (3 per hackathon = 24 total)

| Field | Type | Notes |
|-------|------|-------|
| `winningTeams[n].teamName` | `[CONTENT]` | Real team name |
| `winningTeams[n].projectName` | `[CONTENT]` | Real project/model name |
| `winningTeams[n].description` | `[CONTENT]` | Project summary |
| `winningTeams[n].prize` | `[CONTENT]` | Actual prize description |

### Photo Gallery (5 per hackathon = 40 total)

| Field | Type | Notes |
|-------|------|-------|
| `photos[n].url` | `[ASSET]` | Event photo (min 600x600) |
| `photos[n].caption` | `[CONTENT]` | Photo caption |
| `photos[n].featured` | -- | First photo = `true` (large display) |

**Assets needed per hackathon:**
- [ ] 1 hero image
- [ ] 5 gallery photos
- [ ] 1 challenge brief PDF

**Total hackathon assets: 8 hero images + 40 gallery photos + 8 PDFs = 56 files**

---

## 4. AI Models / Resources Hub (`product/sections/toolbox/data.json`)

### AI Models (24 total)

| Field | Type | Notes |
|-------|------|-------|
| `aiModels[n].name` | `[CONTENT]` | Real model name |
| `aiModels[n].shortDescription` | `[CONTENT]` | 1-line summary (shown on card) |
| `aiModels[n].fullDescription` | `[CONTENT]` | 2-3 sentence description (detail view) |
| `aiModels[n].useCase` | `[CONTENT]` | How it's used in practice |
| `aiModels[n].technicalRequirements` | `[CONTENT]` | Tech stack / requirements |
| `aiModels[n].sector` | `[CONTENT]` | One of: `crop-science`, `livestock`, `precision-farming`, `agri-finance`, `supply-chain`, `climate-resilience` |
| `aiModels[n].country` | `[CONTENT]` | ISO code: KE, NG, GH, SN, RW, ZA, EG, MA |
| `aiModels[n].githubUrl` | `[CONTENT]` | Real GitHub repo URL |
| `aiModels[n].hackathonId` | `[CONTENT]` | Must match a hackathon `id` |

### Research Studies (4 total)

| Field | Type | Notes |
|-------|------|-------|
| `studies[n].title` | `[CONTENT]` | Study title |
| `studies[n].description` | `[CONTENT]` | 1-paragraph abstract |
| `studies[n].partner` | `[CONTENT]` | Publishing organization |
| `studies[n].partnerLogo` | `[ASSET]` | Partner logo SVG |
| `studies[n].pdfUrl` | `[ASSET]` | Actual PDF upload |
| `studies[n].publishedDate` | `[CONTENT]` | YYYY-MM-DD |
| `studies[n].keyFindings[]` | `[CONTENT]` | 3 bullet-point findings |

### Best Practices Reports (3 total)

| Field | Type | Notes |
|-------|------|-------|
| `bestPractices[n].title` | `[CONTENT]` | Report title |
| `bestPractices[n].hackathonName` | `[CONTENT]` | Source hackathon name |
| `bestPractices[n].pdfUrl` | `[ASSET]` | Actual PDF upload |
| `bestPractices[n].highlights[]` | `[CONTENT]` | 3 key highlights |

**Assets needed: 4 study PDFs + 4 partner logos + 3 best practices PDFs = 11 files**

---

## 5. Activities / Ecosystem (`product/sections/ecosystem/data.json`)

### Activities (10 total)

| Field | Type | Notes |
|-------|------|-------|
| `activities[n].title` | `[CONTENT]` | Event name |
| `activities[n].type` | `[CONTENT]` | One of: `hackathon`, `event`, `research`, `workshop` |
| `activities[n].description` | `[CONTENT]` | Short description (card) |
| `activities[n].fullDescription` | `[CONTENT]` | Detailed description (expanded) |
| `activities[n].startDate` | `[CONTENT]` | YYYY-MM-DD |
| `activities[n].endDate` | `[CONTENT]` | YYYY-MM-DD |
| `activities[n].location.*` | `[CONTENT]` | venue, city, country, countryCode, coordinates |
| `activities[n].participantCount` | `[CONTENT]` | Real count |
| `activities[n].highlights[]` | `[CONTENT]` | 3-4 key highlights |
| `activities[n].photos[*].url` | `[ASSET]` | Activity photos |
| `activities[n].photos[*].caption` | `[CONTENT]` | Photo captions |
| `activities[n].resources[*].url` | `[ASSET]` | Related documents/links |

> **Note**: Hackathons from `hackathons/data.json` are also merged into this list at runtime. No need to duplicate hackathon data here.

---

## 6. Partners (`product/sections/partners/data.json`)

### Implementing Partners (2 total)

| Field | Type | Notes |
|-------|------|-------|
| `implementingPartners.partners[n].name` | `[CONTENT]` | Organization name |
| `implementingPartners.partners[n].role` | `[CONTENT]` | e.g. "Lead Implementing Partner" |
| `implementingPartners.partners[n].logoUrl` | `[ASSET]` | Logo SVG/PNG |
| `implementingPartners.partners[n].websiteUrl` | `[CONTENT]` | Real website URL |
| `implementingPartners.partners[n].fullDescription` | `[CONTENT]` | Organization description |

### Service Providers (4 total)

| Field | Type | Notes |
|-------|------|-------|
| `serviceProviders.providers[n].name` | `[CONTENT]` | Organization name |
| `serviceProviders.providers[n].logoUrl` | `[ASSET]` | Logo SVG/PNG |
| `serviceProviders.providers[n].websiteUrl` | `[CONTENT]` | Real website URL |
| `serviceProviders.providers[n].services[]` | `[CONTENT]` | List of service contributions |

### EU Attribution

| Field | Type | Notes |
|-------|------|-------|
| `funders.euAttribution.disclaimer` | `[CONTENT]` | Official EU disclaimer text |
| `funders.euAttribution.flagUrl` | `[ASSET]` | EU flag image |

**Assets needed: 6 partner logos + 1 EU flag = 7 files**

---

## 7. Data Governance (`product/sections/datagov/data.json`)

| Field | Type | Notes |
|-------|------|-------|
| `hero.subtitle` | `[CONTENT]` | Initiative description |
| `hero.stats[*]` | `[CONTENT]` | Investment, funders, partners, launch year |
| `about.description` | `[CONTENT]` | Initiative overview paragraph |
| `strategy.levels[*].description` | `[CONTENT]` | Macro/meso/micro level descriptions |
| `activities.items[*].description` | `[CONTENT]` | 3 activity area descriptions |
| `partners.funders.members[*]` | `[CONTENT]` | 6 funder nations with flags |
| `partners.implementingPartners.members[*]` | `[CONTENT]` | 6 implementing orgs with URLs |

---

## Asset Checklist Summary

| Category | Count | Format | Min Size |
|----------|-------|--------|----------|
| Hackathon hero images | 8 | JPG/WebP | 1440x600 |
| Hackathon gallery photos | 40 | JPG/WebP | 600x600 |
| Challenge brief PDFs | 8 | PDF | -- |
| Home preview thumbnails | 3 | JPG/WebP | 600x400 |
| About section photos | 3 | JPG/WebP | 800x800 (featured), 400x400 |
| Study PDFs | 4 | PDF | -- |
| Best practices PDFs | 3 | PDF | -- |
| Partner/org logos | 7+ | SVG preferred | -- |
| EU flag | 1 | SVG | -- |
| Activity photos | ~30 | JPG/WebP | 600x600 |
| **TOTAL** | **~107** | | |

---

## Data Relationships (must stay consistent)

These IDs link records across files. When replacing content, keep IDs consistent:

```
hackathon.id  <-->  aiModel.hackathonId      (model was produced at this hackathon)
hackathon.id  <-->  bestPractices.hackathonId (report from this hackathon)
study.id      <-->  activity.studyId         (activity links to study)
aiModel.id    <-->  featuredModels.id        (home page featured selection)
```

---

## Workflow

1. **Start with hackathons** -- they generate models and best practices
2. **Then AI models** -- link each to its source hackathon
3. **Then studies & best practices** -- link to hackathons/partners
4. **Then activities** -- standalone events
5. **Then partners** -- organizational info
6. **Then home page** -- pulls stats from all above
7. **Upload all assets** to `public/` matching the URL paths
8. **Test**: Run `bun run dev` and check each page
