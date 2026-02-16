#!/usr/bin/env bash
# Setup CI/CD Pipeline for UI Platform
# This script configures Cloud Build triggers and IAM permissions

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
INFRA_DIR="$PROJECT_ROOT/packages/infra"

# Load environment variables
if [ -f "$PROJECT_ROOT/.env" ]; then
  export $(cat "$PROJECT_ROOT/.env" | grep -v '^#' | xargs)
fi

PROJECT_ID="${GCP_PROJECT_ID:-}"
REGION="${GCP_REGION:-europe-west1}"

# Functions
log_info() {
  echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
  echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
  echo -e "${RED}✗${NC} $1"
}

check_prerequisites() {
  log_info "Checking prerequisites..."

  if ! command -v gcloud &> /dev/null; then
    log_error "gcloud CLI not found. Install from https://cloud.google.com/sdk/docs/install"
    exit 1
  fi

  if [ -z "$PROJECT_ID" ]; then
    log_error "GCP_PROJECT_ID not set in .env file"
    exit 1
  fi

  log_success "Prerequisites check passed"
}

configure_iam() {
  log_info "Configuring IAM permissions..."

  PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')
  SERVICE_ACCOUNT="$PROJECT_NUMBER@cloudbuild.gserviceaccount.com"

  # Grant Cloud Run Admin role
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/run.admin" \
    --quiet || true

  # Grant Service Account User role
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/iam.serviceAccountUser" \
    --quiet || true

  # Grant Storage Admin role
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/storage.admin" \
    --quiet || true

  log_success "IAM permissions configured"
}

setup_github_connection() {
  log_info "Setting up GitHub connection..."
  log_warning "Please complete the following steps manually:"
  echo ""
  echo "1. Go to: https://console.cloud.google.com/cloud-build/triggers?project=$PROJECT_ID"
  echo "2. Click 'Connect Repository'"
  echo "3. Select 'GitHub' and authenticate"
  echo "4. Select your repository"
  echo ""
  read -p "Press Enter when GitHub connection is complete..."
  log_success "GitHub connection setup"
}

create_triggers() {
  log_info "Creating Cloud Build triggers..."

  # Get GitHub repo info
  read -p "Enter GitHub username/organization: " GITHUB_OWNER
  read -p "Enter repository name (default: UI_platform): " GITHUB_REPO
  GITHUB_REPO=${GITHUB_REPO:-UI_platform}

  # Update trigger files with actual values
  sed -i.bak "s/YOUR_GITHUB_USERNAME/$GITHUB_OWNER/g" "$INFRA_DIR/triggers/production.yaml"
  sed -i.bak "s/UI_platform/$GITHUB_REPO/g" "$INFRA_DIR/triggers/production.yaml"
  sed -i.bak "s/YOUR_GITHUB_USERNAME/$GITHUB_OWNER/g" "$INFRA_DIR/triggers/staging.yaml"
  sed -i.bak "s/UI_platform/$GITHUB_REPO/g" "$INFRA_DIR/triggers/staging.yaml"

  # Create production trigger
  log_info "Creating production trigger..."
  if gcloud builds triggers create github \
    --name="ui-platform-production-deploy" \
    --repo-name="$GITHUB_REPO" \
    --repo-owner="$GITHUB_OWNER" \
    --branch-pattern="^main$" \
    --build-config="packages/infra/cloudbuild-cicd.yaml" \
    --substitutions="_APP_NAME=ai4su,_ENV=production,_REGION=$REGION,_MIN_INSTANCES=0,_MAX_INSTANCES=10" \
    --project="$PROJECT_ID" 2>/dev/null; then
    log_success "Production trigger created"
  else
    log_warning "Production trigger may already exist"
  fi

  # Create staging trigger
  log_info "Creating staging trigger..."
  if gcloud builds triggers create github \
    --name="ui-platform-staging-deploy" \
    --repo-name="$GITHUB_REPO" \
    --repo-owner="$GITHUB_OWNER" \
    --branch-pattern="^staging/.*$" \
    --build-config="packages/infra/cloudbuild-cicd.yaml" \
    --substitutions="_APP_NAME=ai4su,_ENV=staging,_REGION=$REGION,_MIN_INSTANCES=0,_MAX_INSTANCES=3" \
    --project="$PROJECT_ID" 2>/dev/null; then
    log_success "Staging trigger created"
  else
    log_warning "Staging trigger may already exist"
  fi

  # Clean up backup files
  rm -f "$INFRA_DIR/triggers/"*.bak

  log_success "Triggers created"
}

verify_setup() {
  log_info "Verifying setup..."

  # List triggers
  echo ""
  log_info "Cloud Build Triggers:"
  gcloud builds triggers list --project="$PROJECT_ID" --format="table(name,github.owner,github.name,github.push.branch)"

  echo ""
  log_success "Setup verification complete"
}

print_summary() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  log_success "CI/CD Pipeline Setup Complete!"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "Next steps:"
  echo "  1. Push code to 'main' branch for production deployment"
  echo "  2. Push code to 'staging/*' branch for staging deployment"
  echo "  3. Monitor builds: https://console.cloud.google.com/cloud-build/builds?project=$PROJECT_ID"
  echo ""
  echo "Documentation:"
  echo "  • CI/CD Guide: $INFRA_DIR/CICD.md"
  echo "  • Triggers: $INFRA_DIR/triggers/"
  echo ""
  echo "Useful commands:"
  echo "  • List builds: gcloud builds list --project=$PROJECT_ID"
  echo "  • Stream logs: gcloud builds log BUILD_ID --stream --project=$PROJECT_ID"
  echo "  • List services: gcloud run services list --project=$PROJECT_ID"
  echo ""
}

# Main execution
main() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  UI Platform - CI/CD Setup"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  check_prerequisites
  configure_iam
  setup_github_connection
  create_triggers
  verify_setup
  print_summary
}

# Run main function
main "$@"
