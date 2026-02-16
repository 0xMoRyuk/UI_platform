# UI Platform

**Monorepo** for multiple independent web applications designed for users in Africa, where data usage has a direct monetary cost.

## Core Principles

1. **Bytes are money** - Optimize for value per megabyte
2. **Perceived speed > raw speed** - Always show something immediately
3. **Scale-to-zero by default** - No always-on servers unless justified
4. **Async by default** - Heavy work never blocks user requests
5. **Offline-first mindset** - Assume intermittent connectivity

See [CLAUDE.md](./CLAUDE.md) for complete architectural guidelines.

## Architecture

**Monorepo Structure:**
- **`apps/*`** - Independent applications (each deploys as separate Cloud Run service)
- **`packages/*`** - Shared code across all applications
  - `ui` - Shared UI components (shadcn/ui)
  - `config` - Shared configurations
  - `types` - Shared TypeScript types
  - `utils` - Shared utility functions
  - `infra` - Infrastructure and deployment code

**Tech Stack:**
- Monorepo: Bun workspaces
- Framework: Vite / React 19 (ai4su)
- Language: TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui
- Runtime: Bun
- Deployment: Google Cloud Run

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0
- [gcloud CLI](https://cloud.google.com/sdk/docs/install) (for deployment)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd UI_platform

# Install all dependencies
bun install
```

### Development

```bash
# Run the app
cd apps/ai4su
bun run dev
```

## Working with Apps

### Developing the App

```bash
# Navigate to app
cd apps/ai4su

# Start development server
bun run dev

# Build for production
bun run build

# Type checking
bun run type-check

# Linting
bun run lint
```

### Adding New App

1. **Create app directory:**
   ```bash
   mkdir apps/new-app
   cd apps/new-app
   ```

2. **Initialize framework:**
   ```bash
   bunx create-next-app@latest . --typescript --tailwind --app --use-bun
   ```

3. **Configure shared packages:**
   - Update `tsconfig.json` to extend `@ui-platform/config/tsconfig/nextjs.json`
   - Update `tailwind.config.ts` to extend `@ui-platform/config/tailwind`
   - Add paths to shared packages in `tsconfig.json`

4. **Deploy:**
   ```bash
   cd ../../packages/infra
   ./scripts/deploy.sh new-app your-project-id europe-west1
   ```

## Working with Shared Packages

### Using Shared Packages in Apps

```typescript
// Import from shared packages
import { Button } from "@ui-platform/ui/components/button";
import { cn } from "@ui-platform/ui";

// Import types
import type { User, ApiResponse } from "@ui-platform/types";

// Import utilities
import { formatBytes, shouldUseLowDataMode } from "@ui-platform/utils";
```

### Adding to Shared Packages

```bash
# Add shadcn/ui component to shared UI package
cd packages/ui
bunx shadcn@latest add button card dialog

# Export in packages/ui/src/index.ts
# export * from "./components/button";

# Add utility function
cd packages/utils
# Edit src/format.ts or create new module
```

### Available Shared Packages

- **`@ui-platform/ui`** - UI components, design system, utilities
- **`@ui-platform/config`** - TypeScript, Tailwind, ESLint configurations
- **`@ui-platform/types`** - Shared TypeScript type definitions
- **`@ui-platform/utils`** - Pure utility functions (formatting, validation, network)
- **`@ui-platform/infra`** - Infrastructure code (not imported in apps)

## Cloud Run Deployment

### Prerequisites

1. **Google Cloud Project** with billing enabled
2. **Enable APIs:**
   ```bash
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com
   ```

### Deploy Single App

```bash
cd packages/infra
./scripts/deploy.sh <app-name> <project-id> <region>
```

**Example:**
```bash
./scripts/deploy.sh ai4su my-gcp-project europe-west1
```

### Deploy All Apps

```bash
cd packages/infra
./scripts/deploy-all.sh <project-id> <region>
```

### Deployment Details

Each app deploys as a separate Cloud Run service:
- Service name: `ui-platform-<app-name>` (e.g., `ui-platform-ai4su`)
- Scale-to-zero enabled (minInstances: 0)
- Memory: 512Mi (configurable)
- CPU: 1 vCPU
- Max instances: 10 (cost protection)
- Region: europe-west1 (closest to Africa)

### Environment Variables

Set environment variables via Cloud Run:

```bash
gcloud run services update ui-platform-ai4su \
  --region=europe-west1 \
  --set-env-vars="NODE_ENV=production,NEXT_PUBLIC_API_URL=https://api.example.com"
```

## Project Structure

```
UI_platform/
├── apps/                       # Independent applications
│   └── ai4su/                  # Vite / React 19
├── packages/                   # Shared code
│   ├── ui/                     # Shared UI components
│   │   ├── src/
│   │   │   ├── components/     # shadcn/ui components
│   │   │   ├── lib/            # Utilities (cn)
│   │   │   └── index.ts        # Exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── config/                 # Shared configurations
│   │   ├── tsconfig/           # TypeScript configs
│   │   ├── tailwind/           # Tailwind config
│   │   └── package.json
│   ├── types/                  # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── common.ts       # Common types
│   │   │   ├── api.ts          # API types
│   │   │   └── index.ts
│   │   └── package.json
│   ├── utils/                  # Shared utilities
│   │   ├── src/
│   │   │   ├── format.ts       # Formatting utilities
│   │   │   ├── network.ts      # Network utilities
│   │   │   ├── validation.ts   # Validation
│   │   │   └── index.ts
│   │   └── package.json
│   └── infra/                  # Infrastructure code
│       ├── Dockerfile          # Legacy/base Dockerfile
│       ├── Dockerfile.next     # Next.js multi-stage build
│       ├── Dockerfile.vite     # Vite multi-stage build
│       ├── .dockerignore
│       ├── cloudbuild-cicd.yaml # Cloud Build CI/CD config
│       ├── scripts/
│       │   ├── deploy.sh       # Deploy single app
│       │   └── deploy-all.sh   # Deploy all apps
│       └── package.json
├── package.json                # Workspace root
├── bun.lock                    # Lock file
├── .gitignore
├── CLAUDE.md                   # AI collaboration guidelines
└── README.md                   # This file
```

## Performance Guidelines

- **Bundle size**: Keep initial JS < 200KB per app
- **Images**: Always WebP/AVIF, lazy load below fold
- **API calls**: Max 1 per screen (BFF pattern)
- **Loading states**: Required for every async operation
- **Code splitting**: Lazy load features and heavy components

## Cost Optimization

- All services scale to zero when not in use
- Pay only for request execution time
- Shared base image layers reduce build time
- Separate services provide clear cost attribution
- Max instances cap prevents runaway costs

## Contributing

See [CLAUDE.md](./CLAUDE.md) for:
- Development guidelines
- Architectural standards
- Low-data UX principles
- Agent/AI collaboration rules

## License

Private - All Rights Reserved
