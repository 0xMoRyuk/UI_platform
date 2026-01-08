#!/bin/bash
# Deploy script for Cloud Run
# Usage: ./scripts/deploy.sh [project-id] [region]

set -e

PROJECT_ID=${1:-"your-project-id"}
REGION=${2:-"europe-west1"}
SERVICE_NAME="ui-platform"

echo "🚀 Deploying $SERVICE_NAME to Cloud Run..."
echo "   Project: $PROJECT_ID"
echo "   Region: $REGION"

# Build and deploy using Cloud Build
gcloud builds submit \
  --project="$PROJECT_ID" \
  --config=cloudbuild.yaml \
  --substitutions=_REGION="$REGION"

echo "✅ Deployment complete!"
echo "🌐 Service URL:"
gcloud run services describe "$SERVICE_NAME" \
  --project="$PROJECT_ID" \
  --region="$REGION" \
  --format="value(status.url)"
