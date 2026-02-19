#!/bin/bash
# Deploy a specific app manually
#
# Usage:
#   ./scripts/deploy.sh ai4su           # Deploy ai4su
#   ./scripts/deploy.sh web             # Deploy web
#   ./scripts/deploy.sh ai4su

set -euo pipefail

APP="${1:-}"

if [ -z "$APP" ]; then
  echo "Usage: ./scripts/deploy.sh <app-name>"
  echo ""
  echo "Available apps:"
  ls -d apps/*/ 2>/dev/null | xargs -I{} basename {} | grep -v node_modules | sed 's/^/  /'
  exit 1
fi

if [ ! -d "apps/$APP" ]; then
  echo "Error: apps/$APP not found"
  exit 1
fi

# Refuse to deploy with uncommitted changes
if ! git diff --quiet HEAD 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
  echo "Error: Uncommitted changes detected."
  echo "Commit your changes first, then deploy."
  echo ""
  git status --short
  exit 1
fi

# Warn if local HEAD is behind remote
LOCAL=$(git rev-parse HEAD 2>/dev/null)
REMOTE=$(git rev-parse origin/main 2>/dev/null || true)
if [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
  echo "Warning: Local HEAD ($LOCAL) differs from origin/main ($REMOTE)"
  echo "Consider pulling latest changes before deploying."
  echo ""
fi

echo "Deploying $APP ($(git rev-parse --short HEAD))..."
echo ""

gcloud builds submit \
  --project=digital-africa-ai4su \
  --region=europe-west1 \
  --config=packages/infra/cloudbuild-cicd.yaml \
  --substitutions="_APP_NAME=$APP"
