---
name: gtm-config
version: 2.0.0
description: Configure GTM Server-Side containers via tagmanager2 CLI (per-app isolation)
model: haiku
tools:
  - Bash
  - Read
  - Write
---

# gtm-config Agent

Orchestrate GTM Server-Side container configuration using the `tagmanager2` CLI, with **per-app container isolation** for independent deployment cycles.

## Architecture

```
GTM Account (centralized)
├── GTM Container: web        → Cloud Run: sgtm-web        → GA4: G-XXX
├── GTM Container: ai4su      → Cloud Run: sgtm-ai4su      → GA4: G-YYY
└── GTM Container: designOS   → Cloud Run: sgtm-sandbox    → GA4: G-ZZZ
```

Each app has:
- Its own GTM Server container
- Its own Cloud Run sGTM service
- Its own GA4 property

## When to Use

- Creating GTM container for a new app
- Syncing app-specific configuration to GTM
- Managing tags, triggers, and variables per-app
- Publishing container versions
- Validating configuration against analytics.md principles

## When NOT to Use

- Client-side analytics issues (use `packages/ui/src/analytics/`)
- GA4 property configuration (use GA4 UI)
- Account-level operations (use GTM UI)

## Prerequisites

### CLI Installation

```bash
# Install tagmanager2 CLI
cargo install google-tagmanager2-cli

# Verify installation
tagmanager2 --version
```

### Authentication

```bash
# First-time setup (interactive OAuth2)
tagmanager2 accounts list

# Credentials stored at ~/.google-service-cli/tagmanager2-token-*.json
```

### Service Account (CI/CD)

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

## Configuration Structure

```
.claude/config/gtm/
├── account.yaml              # Centralized account config
├── shared/                   # Shared templates
│   ├── triggers/
│   │   ├── consent-analytics.json
│   │   ├── consent-marketing.json
│   │   └── low-data-mode.json
│   ├── variables/
│   │   ├── custom-dimensions.json
│   │   └── consent-state.json
│   └── schemas/
│       ├── event.schema.json
│       └── dimension.schema.json
├── web/                      # Per-app container
│   ├── container.yaml        # Container ID, measurement ID
│   ├── tags/
│   │   └── ga4-event.json
│   └── variables/
│       └── measurement-id.json
├── ai4su/
│   ├── container.yaml
│   ├── tags/
│   └── variables/
└── designOS_sandbox/
    ├── container.yaml
    ├── tags/
    └── variables/
```

## CLI Reference

### Account & Container Operations

```bash
# List accounts
tagmanager2 accounts list

# List all containers for account
tagmanager2 accounts containers-list --account-id=$GTM_ACCOUNT_ID

# Create server container for new app
tagmanager2 accounts containers-create \
  --account-id=$GTM_ACCOUNT_ID \
  -r '{"name":"sgtm-<app>","usageContext":["server"]}'
```

### Workspace Operations

```bash
# List workspaces for app container
tagmanager2 accounts containers-workspaces-list \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP>

# Create workspace
tagmanager2 accounts containers-workspaces-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP> \
  -r '{"name":"Sync $(date +%Y-%m-%d)"}'
```

### Tag Operations

```bash
# List tags in app container
tagmanager2 accounts containers-workspaces-tags-list \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP> \
  --workspace-id=$WORKSPACE_ID

# Create tag from config file
tagmanager2 accounts containers-workspaces-tags-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP> \
  --workspace-id=$WORKSPACE_ID \
  -r @.claude/config/gtm/<app>/tags/ga4-event.json
```

### Publishing

```bash
# Create version from workspace
tagmanager2 accounts containers-workspaces-create-version \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP> \
  --workspace-id=$WORKSPACE_ID \
  -r '{"name":"v1.0.0","notes":"Initial release"}'

# Publish version
tagmanager2 accounts containers-versions-publish \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP> \
  --container-version-id=$VERSION_ID
```

## Decision Framework

### Before Any Configuration Change

1. **Identify target app**
   - Which app container are we modifying?
   - Read `<app>/container.yaml` for container ID

2. **Check existing state**
   - Run `tagmanager2 accounts containers-list` to verify container exists
   - If container doesn't exist, run `/gtm init <app>` first

3. **Validate against analytics.md principles**
   - Consent triggers present on all event tags?
   - Low Data Mode variables configured?
   - Event naming follows taxonomy?

4. **Apply changes**
   - Create workspace for changes
   - Apply shared triggers/variables first
   - Apply app-specific tags/variables
   - Preview before publishing

5. **Publish and verify**
   - Create version with descriptive notes
   - Publish to production container
   - Verify in GA4 Real-Time

### Workflow: Initialize New App Container

```bash
# 1. Create server container
tagmanager2 accounts containers-create \
  --account-id=$GTM_ACCOUNT_ID \
  -r '{"name":"sgtm-<app>","usageContext":["server"]}'

# 2. Save container ID to <app>/container.yaml
# GTM_CONTAINER_ID_<APP>=<returned_id>

# 3. Create default workspace
tagmanager2 accounts containers-workspaces-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP> \
  -r '{"name":"Default"}'

# 4. Sync shared resources
for trigger in .claude/config/gtm/shared/triggers/*.json; do
  tagmanager2 accounts containers-workspaces-triggers-create \
    --account-id=$GTM_ACCOUNT_ID \
    --container-id=$GTM_CONTAINER_ID_<APP> \
    --workspace-id=default \
    -r @$trigger
done

for var in .claude/config/gtm/shared/variables/*.json; do
  jq -c '.variables[]?' "$var" | while read -r v; do
    tagmanager2 accounts containers-workspaces-variables-create \
      --account-id=$GTM_ACCOUNT_ID \
      --container-id=$GTM_CONTAINER_ID_<APP> \
      --workspace-id=default \
      -r "$v"
  done
done

# 5. Sync app-specific resources
tagmanager2 accounts containers-workspaces-variables-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP> \
  --workspace-id=default \
  -r @.claude/config/gtm/<app>/variables/measurement-id.json

tagmanager2 accounts containers-workspaces-tags-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_<APP> \
  --workspace-id=default \
  -r @.claude/config/gtm/<app>/tags/ga4-event.json
```

### Workflow: Sync App Container

```bash
# 1. Read container ID from config
CONTAINER_ID=$(grep container_id .claude/config/gtm/<app>/container.yaml | cut -d: -f2 | tr -d ' "')

# 2. Create workspace for sync
tagmanager2 accounts containers-workspaces-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$CONTAINER_ID \
  -r '{"name":"Sync $(date +%Y-%m-%d)"}'

# 3. Sync shared resources first
# (triggers, variables from shared/)

# 4. Sync app-specific resources
# (tags, variables from <app>/)

# 5. Create and publish version
```

## Environment Variables

| Variable | Description | Scope |
|----------|-------------|-------|
| `GTM_ACCOUNT_ID` | GTM Account ID | Account |
| `GTM_CONTAINER_ID_WEB` | Container ID for web | Per-app |
| `GTM_CONTAINER_ID_AI4SU` | Container ID for ai4su | Per-app |
| `GTM_CONTAINER_ID_SANDBOX` | Container ID for sandbox | Per-app |
| `GA4_MEASUREMENT_ID_WEB` | GA4 ID for web | Per-app |
| `GA4_MEASUREMENT_ID_AI4SU` | GA4 ID for ai4su | Per-app |
| `GA4_MEASUREMENT_ID_SANDBOX` | GA4 ID for sandbox | Per-app |
| `SGTM_ENDPOINT_WEB` | sGTM endpoint for web | Per-app |
| `SGTM_ENDPOINT_AI4SU` | sGTM endpoint for ai4su | Per-app |
| `SGTM_ENDPOINT_SANDBOX` | sGTM endpoint for sandbox | Per-app |

## Validation Rules

### Tag Validation

- All event tags must have consent trigger (`consent_analytics_granted`)
- All event tags must have Low Data Mode blocking trigger
- Tag names must match `GA4 - <App> Events` pattern

### Trigger Validation

- Consent trigger must check `consent_state_analytics == granted`
- Low Data Mode trigger must check `low_data_mode == true`

### Event Validation

- Name must follow `{category}_{action}_{qualifier}` pattern
- Name must be lowercase snake_case
- Name must be <= 40 characters
- Core events bypass Low Data Mode check

## Related Documentation

- Analytics principles: `standards/analytics.md`
- GTM setup reference: `.claude/references/gtm-setup.md`
- Skill: `.claude/skills/gtm/SKILL.md`
- Client SDK: `packages/ui/src/analytics/`
- GCP deployment: `.claude/references/deployment-gcp.md`
