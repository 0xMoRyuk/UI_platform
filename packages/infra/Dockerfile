# Multi-stage Dockerfile optimized for Cloud Run and Bun (Monorepo)
# Based on Next.js standalone output mode

ARG APP_NAME=web

FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lockb ./
COPY packages/*/package.json ./packages/

# Copy app package.json
ARG APP_NAME
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/

# Install dependencies with Bun workspaces
RUN bun install --frozen-lockfile --production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lockb ./

# Install all dependencies (including devDependencies)
COPY packages/*/package.json ./packages/
ARG APP_NAME
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/
RUN bun install --frozen-lockfile

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
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output from the specific app
COPY --from=builder /app/apps/${APP_NAME}/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./.next/static

USER nextjs

EXPOSE 8080

# Start the Next.js server
CMD ["bun", "server.js"]
