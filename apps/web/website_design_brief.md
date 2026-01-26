# AI4Startups - Website Design Brief

**Last updated:** January 22, 2026

**Project deadline:** Mid-to-late February 2026

---

## ?? PROJECT CONTEXT & OBJECTIVES

### Main Objective

Create a web app to showcase the AI4Startups program results before project closure (March 2026), highlighting open-source AI models developed, resources produced, and ecosystem impact.

### Target Audiences

- **Primary:** African startups (beneficiaries and future users of AI models)
- **Secondary:** African tech ecosystem (hubs, investors, developers)
- **Tertiary:** Institutional partners (Team Europe, donors, ministries)

### Project Constraints

- **Timeline:** Design system and mockups by end of February 2026
- **Hosting:** GitHub Pages (for AI models) + possibly D4D/D4D Access
- **Maintenance:** Uncertain post-March 2026 ? favor static, lightweight, autonomous site
- **Branding:** DataGov Initiative only (not Digital Africa alone)
- **Languages:** English priority, French secondary if feasible
    - **IMPORTANT:** Designer must produce all graphic elements in both languages (EN + FR)
- **Domain name:** TBD - should include "AI 4 Startups" and link to DataGov

---

## ?? VISUAL IDENTITY & BRAND GUIDELINES

### EU Visibility Guidelines

**Mandatory color palette:**

- Primary: Dark Blue `#003399`
- Secondary: Light Blue `#9BB1DC`
- Accent: Yellow `#F5CE2A`
- Neutral: Sand `#DBD2CC`, White `#FFFFFF`, Black `#000000`

**Typography:**

- Main font: Barlow (fallback Arial)
- Hierarchy: Design contractor to define weights (Regular, Medium, Bold) and sizes per device

**EU Guidelines Reference:**

### Logos & Legal Mentions

**Status:** Logos to be verified in phase 2

- EU logo (mandatory - cf. PDF guidelines)
- Mention "Funded by the European Union"
- Partner logos: DataGov Initiative, Expertise France, GIZ, Team Europe
- **Action item:** Add logo files here or link to the logos resource page

---

## ?? SITE ARCHITECTURE & NAVIGATION

### Proposed Sitemap

**1. Home**

- Hero: Program title + tagline + primary CTA
- **Key Performance Indicators (KPIs)** section with clickable cards:
    - Number of hackathons organized
    - Number of AI models developed
    - Number of countries covered
    - Other relevant metrics
- Highlight section: **Program Results / Toolbox** (main focus)
- Footer: Partners, links, legal mentions

**2. Hackathons**

- Overview: Methodology, formats (online/in-person), objectives
- List of hackathons organized:
    - For each hackathon:
        - Dates, location, theme
        - **Challenge brief** (fiche challenge)
        - **Best practices report** (to be produced)
        - Results and key takeaways
        - Photos/videos
        - Link to AI models developed during this hackathon
- Note: AI models can be showcased within hackathon pages or in Program Results

**3. Ecosystem Activities**

- Overview of all ecosystem-building activities:
    - **Research & Analysis** (studies, surveys)
    - **Networking events** (list with dates, locations, photos)
    - **Support for Women Founders** program
    - Other ecosystem activities
- For each activity type:
    - Description: why, how, methodology
    - Results and impact
    - Visual content (photos, infographics)
    - Downloadable resources (PDFs, reports)
- **Ecosystem studies integration:**
    - Include studies within this section (not as separate page)
    - For each study: title, embedded looker studio, challenge addressed, methodology, partner (e.g., Briter)
    - Key results (infographics, stats)
    - Downloadable PDFs
    - Video content (e.g., Briter Keynote at Abidjan event, if available)

**4. Program Results - Toolbox** *(priority page)*

- **Program KPIs** at the top (summary metrics)
- **Resources Toolbox** - main focus:
    - **AI Models** (~24 open-source models)
        - For each model:
            - Name, short description, use case
            - GitHub repository link
            - Demo/inference interface (if budget/feasibility allows)
        - Filters by sector/model type
        - Centralized technical documentation
    - **Studies & Research** (PDFs downloadable)
    - **Best Practices Reports** (from hackathons)
    - **Final Report** from Digital Africa
    - Other resources and documentation
- Interactive map of events (if relevant to include here)
- Note: NO timeline needed

**5. Partners**

- Presentation of Digital Africa (mission, project team)
- Team Europe partners (logos + short descriptions)
- Service providers (Data354, etc.)
- Link to DataGov Initiative website
- No call-to-action for now

---

## ?? TECHNICAL FEATURES & SPECIFICATIONS

### Must-Have Features

- **Responsive navigation** (mobile-first approach)
- **Visual hierarchy** (H1?H6, spacing, color coding)
- **Document upload/display** (PDFs, optimized images)
- **External links** (GitHub, Google Drive, partner websites)
- **Logo integration** (EU guidelines, high-resolution SVG)
- **Interactive map** (Mapbox or Leaflet for ecosystem activities/events)
- **Photo galleries** (lightbox, lazy loading)
- **File downloads** (PDFs for studies, reports)
- **Bilingual graphic elements** (EN + FR versions for all visuals)

### Nice-to-Have *(depending on budget/timeline - not MVP)*

- AI demo interface (inference playground for models)
- Multilingual switcher (FR/EN)
- Internal search
- Analytics (Google Analytics or Matomo)
- Newsletter/contact form

### Technical Specs for Engineer

- **Recommended stack:** Static site (Hugo, Jekyll, or Next.js export) + GitHub Pages
- **Performance:** <3s load time, optimized images (WebP), lazy loading
- **Accessibility:** WCAG 2.1 AA (contrast, keyboard nav, alt text, ARIA labels)
- **SEO:** Meta tags, Open Graph, sitemap.xml
- **Security:** HTTPS, no forms without server-side validation (unless dedicated backend)

---

## ?? CONTENT SPECIFICATIONS *(to be completed with team)*

| Section | Estimated Volume | Formats | Source |
| --- | --- | --- | --- |
| AI Models | ~24 models | JSON/Markdown + GitHub links | Tech team |
| Hackathons | 3-6 events | Text + photos (10-20 per event) + challenge briefs + best practices reports | Project archives |
| Ecosystem Activities | 8-15 activities/events | Text + photos + GPS location | Data354/team |
| Studies | 3-4 studies | PDFs + infographics | Briter, partners |
| Photos | ~100-200 total | JPG/PNG ? WebP, max 500KB | Google Drive |
| Videos | 1-3 videos | MP4 or YouTube embed | TBC |

**Languages:** English priority, French if feasible (designer to produce all graphic elements in both languages)

---

## ?? TIMELINE & DELIVERABLES

| Date | Deliverable | Owner |
| --- | --- | --- |
| **Week 4 (Jan 20-26)** | Brief validation & sitemap | Jeanne + team |
| **Week 5 (Jan 27 - Feb 2)** | Figma design system (components, key pages) | Designer |
| **Week 6-7 (Feb 3-16)** | Desktop + mobile mockups (all pages, EN + FR) | Designer |
| **Week 8-9 (Feb 17 - Mar 2)** | Front-end development | Engineer |
| **Week 9 (Mar 3-9)** | Content integration + testing | Jeanne + team |
| **Mid-March** | Launch | Engineer |

---

## ? SUCCESS CRITERIA

- [ ]  Site accessible via GitHub Pages with custom domain name (if available)
- [ ]  All AI models documented and accessible (functional GitHub repos)
- [ ]  Complete content (text, photos, PDFs) by end of February
- [ ]  Responsive tested on mobile/tablet/desktop
- [ ]  Compliant with EU visibility guidelines
- [ ]  All graphic elements produced in EN + FR
- [ ]  Maintenance documentation for potential transfer to D4D
