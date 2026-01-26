#!/usr/bin/env bash
# Setup Cloud Build triggers for GTM configuration management
#
# Prerequisites:
#   - gcloud CLI authenticated with appropriate permissions
#   - Cloud Build API enabled
#   - Cloud Scheduler API enabled (for drift detection)
#
# Required environment variables (or set via Secret Manager):
#   - GTM_ACCOUNT_ID
#   - GTM_CONTAINER_ID_WEB
#   - GTM_CONTAINER_ID_AI4SU
#   - GTM_CONTAINER_ID_SANDBOX
#   - GTM_CONTAINER_CONFIG_WEB
#   - GTM_CONTAINER_CONFIG_AI4SU
#   - GTM_CONTAINER_CONFIG_SANDBOX

set -euo pipefail

PROJECT_ID="${PROJECT_ID:-$(gcloud config get-value project)}"
REGION="${REGION:-europe-west1}"
GITHUB_OWNER="${GITHUB_OWNER:-0xMoRyuk}"
GITHUB_REPO="${GITHUB_REPO:-UI_platform}"

echo "==================================="
echo "GTM Cloud Build Trigger Setup"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "==================================="
echo ""

# Enable required APIs
echo "Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable cloudscheduler.googleapis.com

# Create GTM sync triggers for each app
echo ""
echo "Creating GTM sync triggers..."

for app in web ai4su designOS_sandbox; do
  # Map app to container ID variable name
  case "$app" in
    web)
      CONTAINER_ID_VAR="_GTM_CONTAINER_ID_WEB"
      ;;
    ai4su)
      CONTAINER_ID_VAR="_GTM_CONTAINER_ID_AI4SU"
      ;;
    designOS_sandbox)
      CONTAINER_ID_VAR="_GTM_CONTAINER_ID_SANDBOX"
      ;;
  esac

  echo "Creating trigger: gtm-deploy-$app"
  gcloud builds triggers create github \
    --name="gtm-deploy-$(echo $app | tr '_' '-')" \
    --description="Sync GTM configuration for $app app on push to main" \
    --repo-owner="$GITHUB_OWNER" \
    --repo-name="$GITHUB_REPO" \
    --branch-pattern="^main$" \
    --included-files=".claude/config/gtm/shared/**,.claude/config/gtm/$app/**" \
    --build-config="packages/infra/gtm/cloudbuild-gtm-sync.yaml" \
    --substitutions="_APP_ID=$app" \
    --region="$REGION" \
    2>/dev/null || echo "  Trigger may already exist"
done

# Create sGTM deploy triggers for each app
echo ""
echo "Creating sGTM deploy triggers..."

for app in web ai4su designOS_sandbox; do
  case "$app" in
    web)
      SERVICE_NAME="sgtm-web"
      ;;
    ai4su)
      SERVICE_NAME="sgtm-ai4su"
      ;;
    designOS_sandbox)
      SERVICE_NAME="sgtm-sandbox"
      ;;
  esac

  echo "Creating trigger: sgtm-deploy-$(echo $app | tr '_' '-')"
  gcloud builds triggers create github \
    --name="sgtm-deploy-$(echo $app | tr '_' '-')" \
    --description="Deploy sGTM container for $app app to Cloud Run" \
    --repo-owner="$GITHUB_OWNER" \
    --repo-name="$GITHUB_REPO" \
    --branch-pattern="^main$" \
    --included-files="packages/infra/gtm/Dockerfile.sgtm,packages/infra/gtm/cloudbuild-sgtm.yaml" \
    --build-config="packages/infra/gtm/cloudbuild-sgtm.yaml" \
    --substitutions="_APP_ID=$app,_SERVICE_NAME=$SERVICE_NAME" \
    --region="$REGION" \
    2>/dev/null || echo "  Trigger may already exist"
done

# Create drift detection trigger (manual invocation)
echo ""
echo "Creating drift detection trigger..."

gcloud builds triggers create manual \
  --name="gtm-drift" \
  --description="Weekly GTM configuration drift detection" \
  --build-config="packages/infra/gtm/cloudbuild-gtm-drift.yaml" \
  --region="$REGION" \
  2>/dev/null || echo "  Trigger may already exist"

# Get the drift trigger ID for Cloud Scheduler
DRIFT_TRIGGER_ID=$(gcloud builds triggers describe gtm-drift --region="$REGION" --format='value(id)' 2>/dev/null || echo "")

if [ -n "$DRIFT_TRIGGER_ID" ]; then
  # Get project number for service account
  PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')

  echo ""
  echo "Creating Cloud Scheduler job for weekly drift detection..."

  # Create scheduler job
  gcloud scheduler jobs create http gtm-drift-weekly \
    --schedule="0 6 * * 1" \
    --time-zone="UTC" \
    --uri="https://cloudbuild.googleapis.com/v1/projects/$PROJECT_ID/locations/$REGION/triggers/$DRIFT_TRIGGER_ID:run" \
    --http-method=POST \
    --oauth-service-account-email="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
    --location="$REGION" \
    2>/dev/null || echo "  Scheduler job may already exist"
fi

echo ""
echo "==================================="
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure substitution variables in Secret Manager or trigger settings:"
echo "   - _GTM_ACCOUNT_ID"
echo "   - _GTM_CONTAINER_ID_WEB"
echo "   - _GTM_CONTAINER_ID_AI4SU"
echo "   - _GTM_CONTAINER_ID_SANDBOX"
echo "   - _GTM_CONTAINER_CONFIG_WEB"
echo "   - _GTM_CONTAINER_CONFIG_AI4SU"
echo "   - _GTM_CONTAINER_CONFIG_SANDBOX"
echo ""
echo "2. Test triggers:"
echo "   gcloud builds triggers run gtm-deploy-web --region=$REGION"
echo "   gcloud builds triggers run gtm-drift --region=$REGION"
echo ""
echo "3. View triggers in console:"
echo "   https://console.cloud.google.com/cloud-build/triggers?project=$PROJECT_ID"
echo "==================================="
