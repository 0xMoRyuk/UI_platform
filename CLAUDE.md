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

## 5. Backend & Cloud Run Rules

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

## 6. Observability & Metrics

Track and optimize for:

* p95 latency (user-facing)
* Cold start rate
* Bytes transferred per session
* API calls per screen
* Cache hit rate

Avoid verbose logging on high-traffic endpoints.

---

## 7. Security & Secrets

* Use **IAM and service accounts** between services
* No hardcoded secrets
* All secrets must come from **Secret Manager**
* Public endpoints must be rate-limited and validated

---

## 8. Agent & AI Collaboration Rules (Claude)

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

## 9. Design OS / Agent OS Integration

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

## 10. Definition of "Done"

A feature is **not done** unless:

* It respects data budgets
* It works under poor connectivity
* It has defined loading and error states
* It does not introduce unnecessary cloud cost
* It can scale to zero safely

---

## Quick Reference

### Monorepo Commands

```bash
# Install all dependencies
bun install

# Development - all apps
bun run dev

# Development - specific app
cd apps/web && bun run dev

# Build all apps
bun run build

# Build specific app
cd apps/web && bun run build

# Add dependency to specific app
cd apps/web && bun add <package>

# Add dependency to shared package
cd packages/ui && bun add <package>

# Clean all node_modules
bun run clean
```

### Deployment Commands

```bash
# Manual deployment (single app)
cd packages/infra
./scripts/deploy.sh <app-name> <project-id> <region>

# Example: Deploy web app
./scripts/deploy.sh web digital-africa-ai4su europe-west1

# Deploy all apps
./scripts/deploy-all.sh <project-id> <region>
```

### CI/CD Pipeline (Automated Deployments)

**Automated deployments via Cloud Build:**

```bash
# One-time setup
cd packages/infra
./scripts/setup-cicd.sh

# Then deployments are automatic:
git push origin main              # → Production deployment
git push origin staging/feature   # → Staging deployment
```

**Pipeline features:**
- ✅ Automated testing (type check, lint) before deployment
- 🐳 Optimized builds with Kaniko caching (24h TTL)
- 🎯 Canary deployments (10% → 100% traffic)
- 🏷️ Version tagging with rollback capability
- 🔍 Smoke tests after deployment
- 💰 Cost-optimized (scale-to-zero, right-sized resources)

**Monitoring deployments:**

```bash
# List recent builds
gcloud builds list --limit=10

# Stream build logs
gcloud builds log BUILD_ID --stream

# Rollback if needed
gcloud run services update-traffic ui-platform-web \
  --to-revisions=PREVIOUS_VERSION=100 \
  --region=europe-west1
```

**Documentation:** See `packages/infra/CICD.md` for complete guide

### Adding shadcn/ui Components

```bash
# Add to shared UI package (recommended)
cd packages/ui
bunx shadcn@latest add button card dialog

# Then export in packages/ui/src/index.ts

# Or add to specific app
cd apps/web
bunx shadcn@latest add button
```

### Project Structure

```
UI_platform/
├── apps/                       # Independent applications
│   └── web/                    # First app (Next.js)
│       ├── app/                # Next.js App Router
│       ├── components/         # App-specific components
│       ├── features/           # App-specific features
│       ├── package.json        # App dependencies
│       ├── tsconfig.json       # Extends shared config
│       └── tailwind.config.ts  # Extends shared config
├── packages/                   # Shared code
│   ├── ui/                     # Shared UI components
│   │   ├── src/components/     # shadcn/ui components
│   │   └── src/lib/utils.ts    # cn() helper
│   ├── config/                 # Shared configurations
│   │   ├── tsconfig/           # TypeScript configs
│   │   └── tailwind/           # Tailwind base config
│   ├── types/                  # Shared TypeScript types
│   ├── utils/                  # Shared utilities
│   └── infra/                  # Infrastructure code
│       ├── Dockerfile          # Multi-stage build
│       ├── cloudbuild.yaml     # Cloud Build config
│       └── scripts/            # Deployment scripts
├── package.json                # Workspace root
├── CLAUDE.md                   # This file
└── README.md                   # User documentation
```

### Shared Package Usage

```typescript
// In any app, import from shared packages
import { Button } from "@ui-platform/ui/components/button";
import { cn } from "@ui-platform/ui";
import type { User, ApiResponse } from "@ui-platform/types";
import { formatBytes, shouldUseLowDataMode } from "@ui-platform/utils";
```

### Adding New Apps

```bash
# 1. Create app directory
mkdir apps/new-app

# 2. Initialize Next.js (or other framework)
cd apps/new-app
bunx create-next-app@latest . --use-bun

# 3. Update tsconfig.json to extend shared config
# 4. Update tailwind.config.ts to use shared config
# 5. Deploy with:
#    packages/infra/scripts/deploy.sh new-app <project-id>
```

### Cost Monitoring

* Use GCP Cost Management dashboard
* Set up budget alerts per service (ui-platform-web, ui-platform-admin, etc.)
* Monitor Cloud Run request counts and execution time
* Track egress data (major cost driver)
* Each app deploys as separate Cloud Run service for cost attribution

---

**Last Updated:** 2026-01-08
**Owner:** Mohamed
