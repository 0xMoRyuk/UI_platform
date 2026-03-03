#!/usr/bin/env bash
# smoke-json.sh — Post-deploy JSON purity verification
# Usage: ./scripts/smoke-json.sh <base-url>
# Example: ./scripts/smoke-json.sh http://localhost:8080

set -euo pipefail

BASE_URL="${1:?Usage: smoke-json.sh <base-url>}"
BASE_URL="${BASE_URL%/}" # strip trailing slash
FAIL=0

check() {
  local label="$1" url="$2" expected_status="$3" expected_type="$4"
  local body status content_type

  body=$(curl -sf -w '\n%{http_code}\n%{content_type}' "$url" 2>/dev/null) || {
    # curl failed — extract status from a non-silent retry
    status=$(curl -s -o /dev/null -w '%{http_code}' "$url")
    content_type=$(curl -s -o /dev/null -w '%{content_type}' "$url")
    body=$(curl -s "$url")
  }

  # Parse status and content-type from the appended lines
  if [[ -z "${status:-}" ]]; then
    content_type=$(echo "$body" | tail -1)
    status=$(echo "$body" | tail -2 | head -1)
    body=$(echo "$body" | sed '$d' | sed '$d')
  fi

  local pass=true

  # Status check
  if [[ "$status" != "$expected_status" ]]; then
    echo "FAIL [$label] expected status $expected_status, got $status"
    pass=false
  fi

  # Content-Type check
  if [[ "$content_type" != *"$expected_type"* ]]; then
    echo "FAIL [$label] expected Content-Type *$expected_type*, got $content_type"
    pass=false
  fi

  # HTML contamination check (only for JSON endpoints)
  if [[ "$expected_type" == "application/json" ]]; then
    if echo "$body" | grep -qi '<!DOCTYPE\|<html'; then
      echo "FAIL [$label] response body contains HTML"
      pass=false
    fi
    if ! echo "$body" | python3 -m json.tool > /dev/null 2>&1; then
      echo "FAIL [$label] response body is not valid JSON"
      pass=false
    fi
  fi

  if $pass; then
    echo "PASS [$label] $status $content_type"
  else
    FAIL=1
  fi
}

echo "=== JSON Purity Smoke Tests ==="
echo "Target: $BASE_URL"
echo ""

check "agent-capabilities" \
  "$BASE_URL/.well-known/agent-capabilities.json" 200 "application/json"

check "models-search" \
  "$BASE_URL/api/models?q=agriculture" 200 "application/json"

check "api-404-guard" \
  "$BASE_URL/api/nonexistent" 404 "application/json"

check "spa-html" \
  "$BASE_URL/" 200 "text/html"

echo ""
if [[ $FAIL -eq 0 ]]; then
  echo "All checks passed."
else
  echo "Some checks FAILED."
  exit 1
fi
