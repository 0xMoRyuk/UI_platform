#!/bin/bash
# Rollback Cloud Run service to previous revision
#
# Usage:
#   ./scripts/rollback.sh [SERVICE] [REGION]
#
# Examples:
#   ./scripts/rollback.sh                          # Uses defaults
#   ./scripts/rollback.sh ui-platform-ai4su        # Specific service
#   ./scripts/rollback.sh ui-platform-ai4su us-central1

set -euo pipefail

SERVICE="${1:-ui-platform-ai4su}"
REGION="${2:-europe-west1}"

echo "Rolling back $SERVICE in $REGION..."

# Get the two most recent revisions
REVISIONS=$(gcloud run revisions list \
  --service="$SERVICE" \
  --region="$REGION" \
  --limit=2 \
  --format='value(name)' \
  --sort-by='~creationTimestamp')

CURRENT=$(echo "$REVISIONS" | head -1)
PREVIOUS=$(echo "$REVISIONS" | tail -1)

if [ -z "$PREVIOUS" ] || [ "$CURRENT" = "$PREVIOUS" ]; then
  echo "No previous revision found to rollback to"
  exit 1
fi

echo "Current:  $CURRENT"
echo "Rollback: $PREVIOUS"
echo ""

read -p "Proceed with rollback? [y/N] " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted"
  exit 0
fi

gcloud run services update-traffic "$SERVICE" \
  --to-revisions="$PREVIOUS=100" \
  --region="$REGION"

echo ""
echo "Rolled back to $PREVIOUS"
