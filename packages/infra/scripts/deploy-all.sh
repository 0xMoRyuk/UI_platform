#!/bin/bash
# Deploy all apps to Cloud Run
# Usage: ./scripts/deploy-all.sh [project-id] [region]

set -e

PROJECT_ID=${1:-"your-project-id"}
REGION=${2:-"europe-west1"}

echo "🚀 Deploying all apps to Cloud Run..."
echo "   Project: $PROJECT_ID"
echo "   Region: $REGION"
echo ""

# Navigate to repo root
cd ../..

# Get list of apps
APPS=$(ls -1 apps/)

if [ -z "$APPS" ]; then
  echo "❌ No apps found in apps/ directory"
  exit 1
fi

echo "Found apps:"
echo "$APPS"
echo ""

# Deploy each app
for APP in $APPS; do
  echo "========================================"
  echo "Deploying: $APP"
  echo "========================================"
  packages/infra/scripts/deploy.sh "$APP" "$PROJECT_ID" "$REGION"
  echo ""
done

echo "✅ All apps deployed successfully!"
