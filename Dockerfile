# Multi-stage Dockerfile optimized for Cloud Run and Bun
# Based on Next.js standalone output mode

FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies with Bun
RUN bun install --frozen-lockfile --production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

# Build Next.js
# This will use standalone output mode (configured in next.config.ts)
RUN bun run build

# Production image, copy all the files and run next
FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

# Start the Next.js server
CMD ["bun", "server.js"]
