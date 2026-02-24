/**
 * Static template content for the content guide.
 */

export function introSection(): string {
  return `> **Content Manager Guide** — This document lists every editable text string on the AI4Startups website.
> Edit the "Your Content" column, save, and hand back to the developer.
> Fields marked *(template)* contain \`{placeholders}\` — keep them as-is.

## How to Use This Guide

1. Find the section you want to edit in the **Table of Contents** below
2. Each table has four columns:
   - **Field** — the name of the content piece
   - **Current Value** — what the website shows today
   - **Your Content** — write your replacement text here (leave blank to keep current)
   - **Notes** — character limits, formatting hints, or special instructions
3. For items with multiple entries (models, hackathons), each gets its own sub-section
4. Asset references (images, PDFs, logos) are listed separately in **Part 2**
`
}

export function tocSection(): string {
  return `## Table of Contents

### Part 1: Editable Content
- [1.1 Global — Header & Navigation](#11-global--header--navigation)
- [1.2 Global — Footer](#12-global--footer)
- [1.3 Home Page — Hero Section](#13-home-page--hero-section)
- [1.4 Home Page — KPI Section](#14-home-page--kpi-section)
- [1.5 Home Page — KPIs](#15-home-page--kpis)
- [1.6 Home Page — Toolbox Highlight](#16-home-page--toolbox-highlight)
- [1.7 Home Page — Featured Models](#17-home-page--featured-models)
- [1.8 Home Page — Section Previews](#18-home-page--section-previews)
- [1.9 Toolbox — Page Content](#19-toolbox--page-content)
- [1.10 Toolbox — AI Models](#110-toolbox--ai-models)
- [1.11 Toolbox — Studies Section](#111-toolbox--studies-section)
- [1.12 Toolbox — Studies](#112-toolbox--studies)
- [1.13 Toolbox — Best Practices Section](#113-toolbox--best-practices-section)
- [1.14 Toolbox — Best Practices](#114-toolbox--best-practices)
- [1.15 Toolbox — Final Report Section](#115-toolbox--final-report-section)
- [1.16 Toolbox — Final Report](#116-toolbox--final-report)
- [1.17 Hackathons — Page Content](#117-hackathons--page-content)
- [1.18 Hackathons — Methodology](#118-hackathons--methodology)
- [1.19 Hackathons — Field Labels](#119-hackathons--field-labels)
- [1.20 Hackathons — Events](#120-hackathons--events)
- [1.21 Ecosystem — Page Content](#121-ecosystem--page-content)
- [1.22 Ecosystem — Activities](#122-ecosystem--activities)
- [1.23 Ecosystem — Women Founders](#123-ecosystem--women-founders)
- [1.24 Partners — Page Intro](#124-partners--page-intro)
- [1.25 Partners — Funders](#125-partners--funders)
- [1.26 Partners — Implementing Partners](#126-partners--implementing-partners)
- [1.27 Partners — Service Providers](#127-partners--service-providers)
- [1.28 Partners — DataGov Initiative](#128-partners--datagov-initiative)

### Part 2: Asset Inventory
- [2.1 Images & Logos](#21-images--logos)
- [2.2 PDF Documents](#22-pdf-documents)

### Part 3: Workflow
- [3.1 Making Changes](#31-making-changes)

### Part 4: Bilingual Content
- [4.1 English / French Strings](#41-english--french-strings)
`
}

export function workflowSection(): string {
  return `## Part 3: Workflow

### 3.1 Making Changes

1. **Edit this document** — fill in the "Your Content" column for any field you want to change
2. **Send to developer** — they will update the \`data.json\` files to match
3. **Review staging** — check the changes on the staging site before going live
4. **Approve for production** — developer deploys to production

**Tips:**
- Leave "Your Content" blank if the current value is fine
- Keep \`{placeholder}\` tokens exactly as they appear (e.g., \`{count}\`, \`{participants}\`)
- Respect character limits in the Notes column for best layout
- For bilingual fields (marked 🇫🇷), provide both English and French versions
`
}

export function bilingualSection(): string {
  return `## Part 4: Bilingual Content

### 4.1 English / French Strings

The following content appears in both English and French. When editing, provide both versions.

Currently bilingual sections:
- **Header**: Search placeholder text
- **Footer**: All legal and attribution text (fundedBy, implementedBy, privacy, legal, accessibility, copyright)

When adding new bilingual content, mark it with 🇫🇷 in the Notes column.
`
}
