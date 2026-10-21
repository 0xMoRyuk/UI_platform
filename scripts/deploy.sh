#!/bin/bash
# Deploy a specific app manually
#
# Usage:
#   ./scripts/deploy.sh ai4su           # Deploy ai4su
#   ./scripts/deploy.sh web             # Deploy web
#   ./scripts/deploy.sh ai4su --drill   # Gate-check only, no cloud build —
#                                        # probeable per PROTO-037 / the
#                                        # defense-liveness-probe-class

set -euo pipefail

APP="${1:-}"
MODE="${2:-}"
DRILL=0
if [[ "$MODE" == "--drill" || "${DEPLOY_DRILL:-0}" == "1" ]]; then
  DRILL=1
fi

if [ -z "$APP" ]; then
  echo "Usage: ./scripts/deploy.sh <app-name> [--drill]"
  echo ""
  echo "Available apps:"
  ls -d apps/*/ 2>/dev/null | xargs -I{} basename {} | grep -v node_modules | sed 's/^/  /'
  exit 1
fi

if [ ! -d "apps/$APP" ]; then
  echo "Error: apps/$APP not found"
  exit 1
fi

# Refuse to deploy with uncommitted changes (skipped in --drill mode: a
# drill only exercises the gate check + logs a verdict, it never builds or
# submits anything, so it must stay probeable regardless of working-tree
# state — a drill that requires a clean tree isn't provably inert).
if [ "$DRILL" != "1" ]; then
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
fi

# --- PROTO-037 domain-specific gate: main-branch check (soft) ---
# Machine-readable verdict, logged to deployment-history.jsonl on every
# invocation (real deploy or --drill probe). The deploy-gate-check
# PreToolUse hook detects this same non-main-branch condition
# (hooks.py::check_deploy_gate) but only calls logger.warning() server-side
# and never returns a surfaced warning to the caller — this makes the same
# check fire visibly, machine-readably, and probeably instead.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HISTORY_FILE="$SCRIPT_DIR/deployment-history.jsonl"
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)
COMMIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo unknown)
GATE_VERDICT="pass"
if [ "$BRANCH" != "main" ]; then
  GATE_VERDICT="warn"
  echo "Warning: deploying from branch '$BRANCH', not main (gate_verdict=warn, soft gate)."
  echo ""
fi

log_entry() {
  local action="$1" status="$2" exit_code="$3"
  local id ts
  id="dep_$(date +%s)_$RANDOM"
  ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  printf '{"id":"%s","timestamp":"%s","domain":"ui_platform","target":"%s","environment":"manual","action":"%s","status":"%s","exit_code":%s,"gate_check":"main-branch-check","gate_verdict":"%s","branch":"%s","commit_sha":"%s"}\n' \
    "$id" "$ts" "$APP" "$action" "$status" "$exit_code" "$GATE_VERDICT" "$BRANCH" "$COMMIT_SHA" >> "$HISTORY_FILE"
}

publish_drill_receipt() {
  local result="$1"
  command -v nats >/dev/null 2>&1 || return 0
  local ts; ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  nats --js-domain puppy-air pub evidence.defense_drill.completed \
    "{\"event_id\":\"drill-deploy-gate-$(date +%s)\",\"kind\":\"defense_drill\",\"domain\":\"ui_platform\",\"source\":\"scripts/deploy.sh\",\"ts\":\"$ts\",\"body\":{\"target\":\"deploy-gate:ui_platform-main-branch-check\",\"defense_class\":\"deploy-gate\",\"result\":\"$result\",\"checked_at\":\"$ts\",\"detail\":\"branch=$BRANCH gate_verdict=$GATE_VERDICT\"}}" \
    >/dev/null 2>&1 || true
}

if [ "$DRILL" = "1" ]; then
  log_entry "drill" "pass" "0"
  publish_drill_receipt "pass"
  echo "Drill complete: gate_verdict=$GATE_VERDICT (no cloud build submitted)."
  exit 0
fi

log_entry "deploy" "started" "null"

echo "Deploying $APP ($COMMIT_SHA)..."
echo ""

set +e
gcloud builds submit \
  --project=digital-africa-rainbow \
  --region=europe-west1 \
  --config=cloudbuild.yaml \
  --substitutions="_APP_NAME=$APP"
DEPLOY_EXIT=$?
set -e

if [ "$DEPLOY_EXIT" -eq 0 ]; then
  log_entry "deploy" "success" "$DEPLOY_EXIT"
else
  log_entry "deploy" "failure" "$DEPLOY_EXIT"
fi

exit "$DEPLOY_EXIT"
