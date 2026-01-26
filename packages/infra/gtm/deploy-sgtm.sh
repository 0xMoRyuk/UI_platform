#!/usr/bin/env bash
#
# Deploy sGTM to Cloud Run
#
# Usage:
#   ./deploy-sgtm.sh
#
# Environment variables:
#   GTM_CONTAINER_CONFIG - Required: GTM container configuration string
#   GCP_PROJECT          - GCP project ID (auto-detected if not set)
#   REGION               - Cloud Run region (default: europe-west1)
#   SERVICE_NAME         - Service name (default: sgtm-container)

set -euo pipefail

# Configuration
REGION="${REGION:-europe-west1}"
SERVICE_NAME="${SERVICE_NAME:-sgtm-container}"
IMAGE_NAME="gcr.io/${GCP_PROJECT}/${SERVICE_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Check required environment variables
if [[ -z "${GTM_CONTAINER_CONFIG:-}" ]]; then
  log_error "GTM_CONTAINER_CONFIG is required"
  log_info "Get this from GTM Admin > Container Settings > Container Config"
  exit 1
fi

# Auto-detect GCP project if not set
if [[ -z "${GCP_PROJECT:-}" ]]; then
  GCP_PROJECT=$(gcloud config get-value project 2>/dev/null)
  if [[ -z "${GCP_PROJECT}" ]]; then
    log_error "GCP_PROJECT is required or run: gcloud config set project PROJECT_ID"
    exit 1
  fi
  log_info "Using GCP project: ${GCP_PROJECT}"
fi

# Build container image
log_info "Building sGTM container image..."
docker build \
  -t "${IMAGE_NAME}:latest" \
  -f packages/infra/gtm/Dockerfile.sgtm \
  .

# Push to Container Registry
log_info "Pushing image to Container Registry..."
docker push "${IMAGE_NAME}:latest"

# Deploy to Cloud Run
log_info "Deploying to Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
  --image="${IMAGE_NAME}:latest" \
  --region="${REGION}" \
  --platform=managed \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=10 \
  --memory=256Mi \
  --cpu=1 \
  --timeout=60s \
  --concurrency=80 \
  --set-env-vars="CONTAINER_CONFIG=${GTM_CONTAINER_CONFIG}"

# Get service URL
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" \
  --region="${REGION}" \
  --format='value(status.url)')

log_info "sGTM deployed successfully!"
log_info "Service URL: ${SERVICE_URL}"
log_info ""
log_info "Next steps:"
log_info "1. Configure custom domain mapping for first-party data collection"
log_info "2. Update SGTM_ENDPOINT in your app environment variables"
log_info "3. Test by sending events and checking GA4 Real-Time report"
