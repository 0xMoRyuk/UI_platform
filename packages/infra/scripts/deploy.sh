#!/bin/bash
# Deploy script for Cloud Run (monorepo)
# Usage: ./scripts/deploy.sh <app-name> [project-id] [region]

set -e

# Validate arguments
if [ -z "$1" ]; then
  echo "❌ Error: App name is required"
  echo "Usage: ./scripts/deploy.sh <app-name> [project-id] [region]"
  echo ""
  echo "Available apps:"
  ls -1 ../../apps/
  exit 1
fi

APP_NAME=$1
PROJECT_ID=${2:-"your-project-id"}
REGION=${3:-"europe-west1"}
SERVICE_NAME="ui-platform-$APP_NAME"

# Check if app exists
if [ ! -d "../../apps/$APP_NAME" ]; then
  echo "❌ Error: App '$APP_NAME' not found in apps/ directory"
  echo ""
  echo "Available apps:"
  ls -1 ../../apps/
  exit 1
fi

echo "🚀 Deploying $APP_NAME to Cloud Run..."
echo "   App: $APP_NAME"
echo "   Service: $SERVICE_NAME"
echo "   Project: $PROJECT_ID"
echo "   Region: $REGION"
echo ""

# Navigate to repo root
cd ../..

# Build and deploy using Cloud Build
gcloud builds submit \
  --project="$PROJECT_ID" \
  --config=packages/infra/cloudbuild.yaml \
  --substitutions=_APP_NAME="$APP_NAME",_SERVICE_NAME="$SERVICE_NAME",_REGION="$REGION"

echo ""
echo "✅ Deployment complete!"
echo "🌐 Service URL:"
gcloud run services describe "$SERVICE_NAME" \
  --project="$PROJECT_ID" \
  --region="$REGION" \
  --format="value(status.url)"
