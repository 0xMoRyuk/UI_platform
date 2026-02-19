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

echo "Deploying $APP..."
echo ""

gcloud builds submit \
  --project=digital-africa-ai4su \
  --region=europe-west1 \
  --config=packages/infra/cloudbuild-cicd.yaml \
  --substitutions="_APP_NAME=$APP"
