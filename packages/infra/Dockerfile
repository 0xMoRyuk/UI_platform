# Multi-stage Dockerfile optimized for Cloud Run and Bun (Monorepo)
# Based on Next.js standalone output mode

ARG APP_NAME=web

FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy workspace configuration
COPY package.json ./

# Copy all package.json files preserving directory structure
COPY packages/ui/package.json ./packages/ui/
COPY packages/config/package.json ./packages/config/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/

ARG APP_NAME
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/

# Install dependencies with Bun workspaces
RUN bun install --production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy workspace configuration
COPY package.json ./

# Copy all package.json files preserving directory structure
COPY packages/ui/package.json ./packages/ui/
COPY packages/config/package.json ./packages/config/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/

ARG APP_NAME
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/

RUN bun install

# Copy all source code
COPY packages ./packages
COPY apps/${APP_NAME} ./apps/${APP_NAME}

# Build the specific app
WORKDIR /app/apps/${APP_NAME}
RUN bun run build

# Production image, copy all the files and run next
FROM oven/bun:1-slim AS runner
WORKDIR /app

ARG APP_NAME
ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
ENV APP_NAME=${APP_NAME}

# Create a non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Copy standalone output from the specific app
# The standalone output preserves the monorepo structure
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

USER nextjs

EXPOSE 8080

# Start the Next.js server (server.js is in the monorepo structure)
# Use shell form to expand APP_NAME environment variable
CMD bun ./apps/${APP_NAME}/server.js
