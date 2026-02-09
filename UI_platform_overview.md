# UI_platform Overview

**Monorepo** for low-data, Africa-focused web applications deployed to Google Cloud Run.

## Architecture

**Bun workspace monorepo** with:

### Apps (3)
- **`web`** (37MB) - Next.js 15 / React 18 app using App Router
- **`ai4su`** - Vite / React 19 application
- **`designOS_sandbox`** (24MB) - Vite / React 19 sandbox using React Router

### Shared Packages (5)
- **`ui`** - shadcn/ui components, CVA utilities
- **`config`** - TypeScript, Tailwind, ESLint configs
- **`types`** - Shared TypeScript definitions
- **`utils`** - Pure utility functions
- **`infra`** - Dockerfile, Cloud Build, deployment scripts

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 15 / React 18 (web), Vite / React 19 (ai4su, designOS_sandbox)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.x/4.x
- **Components**: shadcn/ui + Radix UI
- **Deployment**: Google Cloud Run (europe-west1)

## Core Principles

Optimized for African users where data costs money:

1. **Bytes are money** - minimize data transfer
2. **Perceived speed > raw speed** - immediate feedback
3. **Scale-to-zero** - serverless, no idle costs
4. **Async by default** - non-blocking operations
5. **Offline-first** - handle intermittent connectivity

## Key Features

- Scale-to-zero Cloud Run services (minInstances: 0)
- Separate deployments per app for cost attribution
- Shared component library across apps
- CI/CD pipeline for automated deployments
- Low-data mode support (user-configurable)
- Bundle size monitoring (<200KB target)

## Recent Activity

Recent commits focus on:
- CI/CD automation
- Dockerfile optimization
- Monorepo build configuration fixes
- Tailwind plugin compatibility

## Development

```bash
bun install          # Install all dependencies
bun run dev          # Run all apps
cd apps/web && bun run dev  # Run specific app
```

## Project Structure

```
UI_platform/
├── apps/
│   ├── web/                    # Next.js 15 / React 18
│   ├── ai4su/                  # Vite / React 19
│   └── designOS_sandbox/       # Vite / React 19 sandbox
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── config/                 # Shared configurations
│   ├── types/                  # Shared TypeScript types
│   ├── utils/                  # Shared utilities
│   └── infra/                  # Infrastructure code
├── CLAUDE.md                   # AI collaboration guidelines
├── README.md                   # Project documentation
└── package.json                # Workspace configuration
```

## Additional Resources

- See `README.md` for detailed setup and deployment instructions
- See `CLAUDE.md` for architectural guidelines and development standards
