---
version: "1.0.0"
last_updated: "2026-01-10"
load_trigger: "quick|reference"
---

# Quick Reference Reference

Load this file when working on quick reference related tasks.

---


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
