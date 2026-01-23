# CLAUDE.md - AI4Startups Website

## 1. Project Context

**AI4Startups** is a showcase website for the AI4Startups program results before project closure (March 2026). It highlights open-source AI models, hackathon outcomes, ecosystem activities, and program impact.

### Target Audiences

1. **Primary:** African startups (beneficiaries, future AI model users)
2. **Secondary:** African tech ecosystem (hubs, investors, developers)
3. **Tertiary:** Institutional partners (Team Europe, donors, ministries)

### Critical Constraints

- **Deadline:** Mid-to-late February 2026
- **Post-project:** Uncertain maintenance → favor static, autonomous site
- **Branding:** DataGov Initiative (not Digital Africa alone)
- **Languages:** English priority, French secondary
- **EU Compliance:** Mandatory visibility guidelines

---

## 2. Design System

### EU-Mandated Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Dark Blue | `#003399` |
| Secondary | Light Blue | `#9BB1DC` |
| Accent | Yellow | `#F5CE2A` |
| Neutral | Sand | `#DBD2CC` |
| Background | White | `#FFFFFF` |
| Text | Black | `#000000` |

### Typography

- **Primary:** Barlow (fallback: Arial)
- **Weights:** Regular (400), Medium (500), Bold (700)

### Required Branding

- EU logo (mandatory)
- "Funded by the European Union" mention
- Partner logos: DataGov Initiative, Expertise France, GIZ, Team Europe

---

## 3. Site Architecture

```
/                       → Home (Hero + KPIs + Toolbox highlight)
/hackathons             → Hackathon overview + list
/hackathons/[slug]      → Individual hackathon detail
/ecosystem              → Ecosystem activities (research, events, women founders)
/toolbox                → Program Results - Toolbox (PRIORITY PAGE)
/toolbox/models         → AI Models catalog (~24 models)
/toolbox/models/[slug]  → Individual model detail
/partners               → Partner showcase
```

### Priority Page: `/toolbox`

The **Toolbox** is the main value proposition:
- Program KPIs summary
- AI Models (~24 open-source models with GitHub links)
- Studies & Research PDFs
- Best Practices Reports
- Final Report

---

## 4. Technical Requirements

### Performance (Non-Negotiable)

- **Load time:** <3s on 3G connections
- **Images:** WebP format, max 500KB, lazy loading
- **Bundle:** Code-split by route, no unused dependencies

### Accessibility (WCAG 2.1 AA)

- Color contrast ratios must meet AA
- Keyboard navigation for all interactive elements
- Alt text for all images
- ARIA labels where semantic HTML insufficient

### SEO

- Meta tags (title, description) per page
- Open Graph tags for social sharing
- `sitemap.xml` and `robots.txt`

### Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

---

## 5. Content Types

| Content | Count | Format | Source |
|---------|-------|--------|--------|
| AI Models | ~24 | Markdown + GitHub links | Tech team |
| Hackathons | 3-6 | Text + photos + PDFs | Archives |
| Ecosystem Activities | 8-15 | Text + photos + GPS | Data354 |
| Studies | 3-4 | PDFs + infographics | Briter |
| Photos | 100-200 | WebP <500KB | Drive |
| Videos | 1-3 | YouTube embed preferred | TBC |

---

## 6. Feature Scope

### MVP (Must Ship)

- [ ] Responsive navigation
- [ ] Document display (PDFs, optimized images)
- [ ] External links (GitHub, Drive, partners)
- [ ] Photo galleries (lightbox, lazy loading)
- [ ] Interactive map (Mapbox/Leaflet for events)
- [ ] File downloads
- [ ] EU-compliant branding

### Post-MVP (If Time/Budget)

- [ ] AI demo interface (model inference playground)
- [ ] Language switcher (EN/FR)
- [ ] Site search
- [ ] Analytics (prefer Matomo over GA for EU compliance)
- [ ] Contact form

---

## 7. Agent Rules

When working on this project:

1. **Static-first:** Prefer static generation over client-side fetching
2. **Image optimization:** Always use `next/image` with WebP, never raw `<img>`
3. **No heavy dependencies:** Question any package >50KB gzipped
4. **EU colors only:** Use the mandated palette, no off-brand colors
5. **Bilingual assets:** All graphic elements must support EN + FR
6. **Map interactions:** Use Leaflet (lighter) over Mapbox unless specific features needed
7. **PDF handling:** Link to hosted PDFs, don't embed viewers
8. **GitHub links:** Validate all AI model repo links exist before launch

### Before Adding Features

Ask:
- Does this work offline/cached?
- Does this increase bundle size significantly?
- Is this maintainable without a dedicated team post-March 2026?

---

## 8. File Conventions

```
app/
├── (marketing)/          → Public pages (home, hackathons, etc.)
├── toolbox/              → Toolbox section (priority)
│   └── models/[slug]/    → Dynamic model pages
├── components/           → Page-specific components
└── data/                 → Static content (models.json, hackathons.json)

components/               → Shared UI components
├── ui/                   → shadcn/ui components
├── maps/                 → Map components (Leaflet)
└── galleries/            → Photo gallery components

public/
├── images/               → Optimized WebP images
├── documents/            → PDFs for download
└── logos/                → Partner and EU logos (SVG)
```

---

## 9. Deployment Notes

- **Primary:** GitHub Pages (for static export)
- **Fallback:** Current Cloud Run setup (if dynamic features needed)
- **Domain:** TBD - should include "AI4Startups" and link to DataGov

### Static Export Command

```bash
bun run build  # Ensure output: 'export' in next.config.js
```

---

## 10. Success Criteria

- [ ] All 24 AI models documented with working GitHub links
- [ ] <3s load time on simulated 3G
- [ ] WCAG 2.1 AA compliance verified
- [ ] EU visibility guidelines met
- [ ] Responsive across mobile/tablet/desktop
- [ ] Maintenance docs for D4D transfer
