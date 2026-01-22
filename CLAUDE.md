# CLAUDE.md

## 1. Project Context

This is a **monorepo** containing multiple independent **web applications** (desktop + mobile) deployed on **Google Cloud Run**, designed for **users in Africa**, where **data usage has a direct monetary cost**.

### Architecture

**Monorepo Structure:**
- `apps/*` - Independent applications (e.g., `apps/web`)
- `packages/*` - Shared code across applications
  - `ui` - Shared UI components and shadcn/ui
  - `config` - Shared configurations (TypeScript, Tailwind, ESLint)
  - `types` - Shared TypeScript types
  - `utils` - Shared utility functions
  - `infra` - Infrastructure code (Dockerfiles, deployment scripts)

**Tech Stack:**
* **Monorepo:** Bun workspaces (native, no external tooling)
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Components:** shadcn/ui
* **Runtime:** Bun
* **Deployment:** Google Cloud Run (separate service per app)

**System Priorities:**
* **Low data consumption**
* **Fast perceived UX under poor connectivity**
* **Scale-to-zero infrastructure**
* **Operational and cloud cost efficiency**

Backend services are **serverless and managed**, primarily on **Google Cloud Run**, with async workloads offloaded to managed queues.

This repository may use **Agent OS** or **Design OS** to structure product thinking, standards, and execution.

---

## 2. North Star Principles (Non-Negotiable)

1. **Bytes are money**

   * Treat every kilobyte downloaded as a user cost.
   * Optimize for *value per megabyte*.

2. **Perceived speed > raw speed**

   * Always show something immediately.
   * Skeletons, cached data, and progressive rendering are mandatory UX patterns.

3. **Scale-to-zero by default**

   * No always-on servers unless explicitly justified.
   * Pay for warmth only on critical user paths.

4. **Async by default**

   * Heavy work must never block user requests.
   * Use queues, background workers, and job status polling.

5. **Offline-first mindset**

   * Assume intermittent connectivity.
   * Reads should be cached, writes should be queueable.

---

## 3. UX & Data Usage Standards

### Low-Data UX

* Support a **Low Data Mode** that:

  * Disables media autoplay
  * Reduces polling frequency
  * Disables prefetching
  * Loads smaller images
* Persist the setting per user/device.

### Network Discipline

* **One API call per screen** whenever possible (BFF pattern).
* Avoid chatty APIs and client-side request waterfalls.
* Prefer server-side aggregation.

### Loading States

Every screen must define:

* Initial loading state
* Empty state
* Error state
* Offline / stale-data state

Spinners alone are not acceptable.

### Images & Media

* Always responsive sizes.
* Use modern formats (WebP/AVIF).
* Never load images that are not visible.
* Large media must be opt-in.

---

## 4. Frontend Engineering Rules (React / Tailwind / shadcn)

* Code-split by **route and feature**
* Lazy-load heavy components (charts, editors)
* Do not ship admin or power-user features to regular users
* Avoid heavy animation libraries; motion must be intentional and minimal
* Tailwind utilities are preferred over custom CSS
* shadcn/ui components must not introduce unnecessary dependencies

**Bundle size budgets must be respected.**

---

## 5. Brand & Design Tokens

This project uses a **brand-agnostic design token system** that supports multiple brand guidelines (EU, AU, custom, etc.) without code changes.

### Architecture

```
packages/ui/src/tokens/
├── index.ts              # Barrel export
├── types.ts              # Brand-agnostic interfaces
├── theme.ts              # Active brand resolver + utilities
└── brands/
    ├── index.ts          # Brand registry
    ├── default.ts        # System fonts, neutral colors (fallback)
    └── eu-d4d.ts         # EU Data Governance in Africa
```

### Available Brands

| Brand ID | Name | Source |
|----------|------|--------|
| `default` | UI Platform | System fonts, neutral palette |
| `eu-d4d` | EU Data Governance in Africa | D4D Hub Visibility Guidelines |

### Configuration

Set brand via environment variable:

```bash
# .env.local
NEXT_PUBLIC_BRAND_ID=eu-d4d
```

The brand is applied via `data-brand` attribute on `<html>`:

```tsx
// apps/web/app/layout.tsx
import { getBrandHtmlProps } from "@ui-platform/ui";

<html lang="en" {...getBrandHtmlProps()}>
```

### Tailwind Usage

Use semantic `brand-*` classes instead of hardcoded colors:

```tsx
// Good - brand-agnostic
<div className="bg-brand-primary text-brand-primary-foreground">
  <span className="text-brand-accent">Accent</span>
  <span className="bg-brand-highlight">Highlight</span>
</div>

// Avoid - brand-specific
<div className="bg-blue-900 text-white">
```

### Available Brand Colors

| Token | Tailwind Class | CSS Variable |
|-------|---------------|--------------|
| Primary | `bg-brand-primary` | `--brand-primary` |
| Primary Foreground | `text-brand-primary-foreground` | `--brand-primary-foreground` |
| Secondary | `bg-brand-secondary` | `--brand-secondary` |
| Accent | `bg-brand-accent` | `--brand-accent` |
| Neutral | `bg-brand-neutral` | `--brand-neutral` |
| Highlight | `bg-brand-highlight` | `--brand-highlight` |

### Components

```tsx
import { BrandAttribution, BrandLogoBar } from "@ui-platform/ui";

// Footer with attribution text
<BrandAttribution variant="full" showLogos />

// Logo bar for headers
<BrandLogoBar logos="primary" />
```

### Accessing Brand Config

```tsx
import { activeBrand, brands, getBrandAttribution } from "@ui-platform/ui";

// Active brand (from env)
console.log(activeBrand.name);
console.log(activeBrand.colors.primary.hex);

// Specific brand
const euBrand = brands["eu-d4d"];

// Get attribution text
const text = getBrandAttribution(activeBrand, "short");
```

### Adding a New Brand

1. **Create brand file** `packages/ui/src/tokens/brands/new-brand.ts`:

```typescript
import type { BrandConfig } from "../types";

export const newBrand: BrandConfig = {
  id: "new-brand",
  name: "New Brand Name",
  colors: {
    primary: { hex: "#003399", hsl: "220 100% 30%" },
    primaryForeground: { hex: "#FFFFFF", hsl: "0 0% 100%" },
    // ... other colors
  },
  typography: {
    font: {
      family: ["CustomFont"],
      fallback: ["system-ui", "sans-serif"],
      url: "https://fonts.googleapis.com/css2?family=CustomFont&display=swap",
    },
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  attribution: {
    short: "Funded by ...",
    full: "Funded by ... Implemented by ...",
  },
  // logos, social, badge - optional
};
```

2. **Register in registry** `packages/ui/src/tokens/brands/index.ts`:

```typescript
import { newBrand } from "./new-brand";

export const brands = {
  default: defaultBrand,
  "eu-d4d": euD4DBrand,
  "new-brand": newBrand,  // Add here
} as const;
```

3. **Add CSS variables** in `apps/web/app/globals.css`:

```css
[data-brand="new-brand"] {
  --brand-primary: 220 100% 30%;
  --brand-primary-foreground: 0 0% 100%;
  /* ... other variables */
  --brand-font-family: "CustomFont", system-ui, sans-serif;
}
```

4. **Set environment variable**:

```bash
NEXT_PUBLIC_BRAND_ID=new-brand
```

### EU D4D Brand Details

The `eu-d4d` brand implements the **EU Visibility Guidelines**:

| Color | Hex | Token | Usage |
|-------|-----|-------|-------|
| Dark Blue | `#003399` | `brand-primary` | Headers, links, primary actions |
| Light Blue | `#9BB1DC` | `brand-secondary` | Backgrounds, supporting elements |
| Yellow | `#F5CE2A` | `brand-accent` | CTAs, highlights, focus rings |
| Sand | `#DBD2CC` | `brand-neutral` | Subtle backgrounds, borders |

**Typography:** Barlow (Google Fonts) with Arial fallback

**Required Attribution:**
- Short: "Funded by the European Union"
- Full: Includes all member states and implementing partners

**Logos:** Global Gateway, EU Flag, African Union (primary), plus member state and partner logos

**Social:** `#D4DataGOV` `#DataGovernanceAfrica` `#TeamEurope` `#GlobalGateway`

---

## 6. Backend & Cloud Run Rules

### Service Architecture

* Separate services by responsibility:

  * `web` (UI / SSR if used)
  * `api` (fast request/response)
  * `worker` (async jobs)

### Cold Starts

* Only critical UX services may use `minInstances > 0`
* Workers and non-user-facing services must scale to zero

### Async Work

* Use **Cloud Tasks** for user-triggered background work
* Use **Pub/Sub** for event-driven processing
* APIs should return immediately with a `job_id` when work is async

### Datastores

* Prefer **Firestore** for:

  * Simple data models
  * Read-heavy workloads
* Use **Cloud SQL** only when relational guarantees are required

### Cost Guardrails

* Rate limit expensive endpoints
* Cap payload sizes and export frequencies
* Log with intent (sampling for hot paths)

---

## 7. Observability & Metrics

Track and optimize for:

* p95 latency (user-facing)
* Cold start rate
* Bytes transferred per session
* API calls per screen
* Cache hit rate

Avoid verbose logging on high-traffic endpoints.

---

## 8. Security & Secrets

* Use **IAM and service accounts** between services
* No hardcoded secrets
* All secrets must come from **Secret Manager**
* Public endpoints must be rate-limited and validated

---

## 9. Agent & AI Collaboration Rules (Claude)

When acting as an agent on this repo:

* **Never introduce features that increase data usage without justification**
* Prefer **simpler, cheaper, managed GCP services**
* Always consider:

  * Data cost to users
  * Cold start impact
  * Operational cost
* Propose async patterns before synchronous ones
* Ask for clarification if a feature risks:

  * Heavy data transfer
  * Persistent infrastructure
  * Complex state management

---

## 10. Design OS / Agent OS Integration

### If using Agent OS

* Follow the structure:

  * `standards/` → non-negotiable rules (performance, UX, APIs)
  * `product/` → vision, constraints, priorities
  * `specs/` → feature-level implementation details
* Standards override specs.

### If using Design OS

* Every screen must define:

  * Data budget
  * Loading/error/offline states
  * API contract
* Design decisions must be defensible in terms of cost and UX.

---

## 11. Definition of "Done"

A feature is **not done** unless:

* It respects data budgets
* It works under poor connectivity
* It has defined loading and error states
* It does not introduce unnecessary cloud cost
* It can scale to zero safely

---

## 12. Deployment

### GCP Project
- **Project ID:** `digital-africa-ai4su`
- **Region:** `europe-west1`

### Service URLs
- **Web App:** https://ui-platform-web-hs6gi2nj7a-ew.a.run.app

### Quick Deploy (Manual)

```bash
# Ensure correct project
gcloud config set project digital-africa-ai4su

# Submit build from repo root
cd /Users/mo/creative_home/UI_platform
gcloud builds submit \
  --config=packages/infra/cloudbuild-cicd.yaml \
  --substitutions=SHORT_SHA=$(git rev-parse --short HEAD),_APP_NAME=web,_SERVICE_NAME=ui-platform-web

# Route traffic to latest (if needed)
gcloud run services update-traffic ui-platform-web \
  --region=europe-west1 \
  --to-latest
```

### Infrastructure Files
- **Dockerfile:** `packages/infra/Dockerfile`
- **Cloud Build:** `packages/infra/cloudbuild-cicd.yaml`
- **Trigger config:** `packages/infra/triggers/production.yaml`

### Automatic Deployment (CI/CD)

Pushes to `main` branch automatically trigger deployment via Cloud Build.

**Trigger Details:**
- **Name:** `ui-platform-production-deploy`
- **Region:** `europe-west1`
- **ID:** `2e14e66c-41c4-412d-8725-58f4a7c15524`
- **Repository:** `0xMoRyuk/UI_platform`
- **Branch:** `^main$`
- **Service Account:** `ai4su-aiplatform@digital-africa-ai4su.iam.gserviceaccount.com`

**Required Service Account Permissions:**

The trigger's service account needs these IAM roles:

| Role | Purpose |
|------|---------|
| `roles/cloudbuild.builds.builder` | Run Cloud Build |
| `roles/storage.admin` | Push to Container Registry (GCR) |
| `roles/run.admin` | Deploy to Cloud Run |
| `roles/iam.serviceAccountUser` | Act as service account |
| `roles/logging.logWriter` | Write build logs |

```bash
# Grant permissions to service account (if needed)
PROJECT_ID="digital-africa-ai4su"
SA="ai4su-aiplatform@digital-africa-ai4su.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/cloudbuild.builds.builder" --condition=None --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/storage.admin" --condition=None --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/run.admin" --condition=None --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/iam.serviceAccountUser" --condition=None --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/logging.logWriter" --condition=None --quiet
```

```bash
# Check trigger status
gcloud builds triggers list --region=europe-west1

# Manually run trigger
gcloud builds triggers run ui-platform-production-deploy \
  --region=europe-west1 \
  --branch=main
```

### Check Build Status

```bash
# List recent builds (must specify region for triggered builds)
gcloud builds list --region=europe-west1 --limit=5

# Check specific build
gcloud builds describe <BUILD_ID> --region=europe-west1 --format="value(status)"
gcloud builds log <BUILD_ID> --region=europe-west1 | tail -50
```

### Smoke Test

```bash
SERVICE_URL="https://ui-platform-web-hs6gi2nj7a-ew.a.run.app"
curl -s -o /dev/null -w "%{http_code}" $SERVICE_URL          # Homepage
curl -s -o /dev/null -w "%{http_code}" $SERVICE_URL/form     # Form page
curl -s -o /dev/null -w "%{http_code}" $SERVICE_URL/analytics # Analytics
```

---

