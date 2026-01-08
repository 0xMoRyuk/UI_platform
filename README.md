# UI Platform

Low-data, high-performance web platform designed for users in Africa, where data usage has a direct monetary cost.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Language**: TypeScript
- **Deployment**: Google Cloud Run

## Core Principles

1. **Bytes are money** - Optimize for value per megabyte
2. **Perceived speed > raw speed** - Always show something immediately
3. **Scale-to-zero by default** - No always-on servers unless justified
4. **Async by default** - Heavy work never blocks user requests
5. **Offline-first mindset** - Assume intermittent connectivity

See [CLAUDE.md](./CLAUDE.md) for complete architectural guidelines.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0
- Node.js >= 18 (for compatibility)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd UI_platform

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env.local

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

```bash
# Development server
bun run dev

# Type checking
bun run type-check

# Linting
bun run lint

# Build for production
bun run build

# Start production server
bun run start
```

## Adding shadcn/ui Components

```bash
# Add a component (e.g., button)
bunx shadcn@latest add button

# Add multiple components
bunx shadcn@latest add button card dialog
```

## Project Structure

```
UI_platform/
├── app/                   # Next.js App Router pages and layouts
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
│   └── ui/              # shadcn/ui components
├── features/            # Feature-specific code
├── hooks/               # Shared React hooks
├── lib/                 # Utilities and configurations
├── services/            # API clients and data layer
├── utils/               # Pure utility functions
├── public/              # Static assets
└── scripts/             # Build and deployment scripts
```

## Cloud Run Deployment

### Prerequisites

- Google Cloud account
- `gcloud` CLI installed and configured
- Project with Cloud Run API enabled

### Deploy

```bash
# Using Cloud Build (recommended)
./scripts/deploy.sh your-project-id europe-west1

# Or manually
gcloud builds submit --config=cloudbuild.yaml

# Or local Docker build
docker build -t ui-platform .
docker run -p 8080:8080 ui-platform
```

### Environment Variables

Set environment variables in Cloud Run:

```bash
gcloud run services update ui-platform \
  --region=europe-west1 \
  --set-env-vars="NODE_ENV=production,NEXT_PUBLIC_API_URL=https://your-api.com"
```

## Performance Guidelines

- **Bundle size**: Keep initial JS bundle < 200KB
- **Images**: Always use WebP/AVIF, lazy load below the fold
- **API calls**: Max 1 per screen load (BFF pattern)
- **Loading states**: Required for every async operation
- **Code splitting**: Lazy load features and heavy components

## Cost Optimization

- Scale-to-zero enabled (minInstances: 0)
- Memory limit: 512Mi (adjust as needed)
- CPU: 1 vCPU
- Request timeout: 300s
- Max instances: 10 (prevents runaway costs)

## License

Private - All Rights Reserved

## Contributing

See [CLAUDE.md](./CLAUDE.md) for development guidelines and architectural standards.
