#!/bin/bash
# Set up Cloud Build triggers for each app
#
# Usage:
#   ./scripts/setup-triggers.sh              # Set up all apps
#   ./scripts/setup-triggers.sh ai4su        # Set up specific app
#   ./scripts/setup-triggers.sh --list       # List current triggers
#   ./scripts/setup-triggers.sh --delete     # Delete all ui-platform triggers
#
# Prerequisites:
#   - gcloud CLI authenticated
#   - GitHub repo connected to Cloud Build
#
# Configure these variables before running:

set -euo pipefail

# ============ CONFIGURATION ============
REPO_NAME="0xMoRyuk-UI_platform"  # As shown in gcloud builds repositories list
CONNECTION_NAME="ui_platform"      # As shown in gcloud builds connections list
REGION="europe-west1"
BRANCH="^main$"
BUILD_CONFIG="packages/infra/cloudbuild-cicd.yaml"
PROJECT_ID="digital-africa-ai4su"
PROJECT_NUMBER="609932720471"
SERVICE_ACCOUNT="projects/$PROJECT_ID/serviceAccounts/$PROJECT_NUMBER-compute@developer.gserviceaccount.com"
# =======================================

# Apps to deploy (auto-detected from apps/ directory)
get_apps() {
  ls -d apps/*/ 2>/dev/null | xargs -I{} basename {} | grep -v node_modules || true
}

list_triggers() {
  echo "Current ui-platform triggers:"
  gcloud builds triggers list --filter="name~^deploy-" --format="table(name,createTime)"
}

delete_triggers() {
  echo "Deleting ui-platform triggers..."
  for trigger in $(gcloud builds triggers list --filter="name~^deploy-" --format="value(name)"); do
    echo "  Deleting $trigger..."
    gcloud builds triggers delete "$trigger" --quiet
  done
  echo "Done"
}

create_trigger() {
  local app="$1"
  local trigger_name="deploy-${app}"

  echo "Creating trigger: $trigger_name"

  # Check if trigger exists
  if gcloud builds triggers describe "$trigger_name" &>/dev/null; then
    echo "  Trigger exists, updating..."
    gcloud builds triggers delete "$trigger_name" --quiet
  fi

  local repo_path="projects/$PROJECT_ID/locations/$REGION/connections/$CONNECTION_NAME/repositories/$REPO_NAME"

  gcloud builds triggers create github \
    --name="$trigger_name" \
    --repository="$repo_path" \
    --branch-pattern="$BRANCH" \
    --build-config="$BUILD_CONFIG" \
    --substitutions="_APP_NAME=$app" \
    --region="$REGION" \
    --service-account="$SERVICE_ACCOUNT" \
    --include-logs-with-status

  echo "  Created $trigger_name"
}

# Main
case "${1:-}" in
  --list)
    list_triggers
    ;;
  --delete)
    read -p "Delete all deploy-* triggers? [y/N] " -n 1 -r
    echo
    [[ $REPLY =~ ^[Yy]$ ]] && delete_triggers
    ;;
  --help|-h)
    head -15 "$0" | tail -13
    ;;
  "")
    # Set up all apps
    echo "Setting up triggers for all apps..."
    echo "Repo: $REPO_NAME (connection: $CONNECTION_NAME)"
    echo "Branch: $BRANCH"
    echo ""

    for app in $(get_apps); do
      create_trigger "$app"
    done

    echo ""
    echo "Done. Triggers created:"
    list_triggers
    ;;
  *)
    # Set up specific app
    create_trigger "$1"
    ;;
esac
