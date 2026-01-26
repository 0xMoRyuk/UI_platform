---
version: "2.1.0"
last_updated: "2026-01-26"
load_trigger: "GTM|Tag Manager|sGTM|analytics setup|tagmanager2"
---

# GTM Setup Reference

Reference documentation for Google Tag Manager Server-Side configuration with **per-app container isolation**.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    GTM Account (centralized)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ GTM Container   │  │ GTM Container   │  │ GTM Container   │  │
│  │ (web)           │  │ (ai4su)         │  │ (designOS_sbox) │  │
│  │                 │  │                 │  │                 │  │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │
│  │ │ GA4 Tag     │ │  │ │ GA4 Tag     │ │  │ │ GA4 Tag     │ │  │
│  │ │ Consent Trg │ │  │ │ Consent Trg │ │  │ │ Consent Trg │ │  │
│  │ │ Variables   │ │  │ │ Variables   │ │  │ │ Variables   │ │  │
│  │ └─────────────┘ │  │ └─────────────┘ │  │ └─────────────┘ │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │            │
│           ▼                    ▼                    ▼            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Cloud Run       │  │ Cloud Run       │  │ Cloud Run       │  │
│  │ sgtm-web        │  │ sgtm-ai4su      │  │ sgtm-sandbox    │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │            │
│           ▼                    ▼                    ▼            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ GA4 Property    │  │ GA4 Property    │  │ GA4 Property    │  │
│  │ (web)           │  │ (ai4su)         │  │ (designOS_sbox) │  │
│  │ G-XXXXXXXXXX    │  │ G-YYYYYYYYYY    │  │ G-ZZZZZZZZZZ    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Benefits of Per-App Architecture

| Aspect | Per-App Containers | Shared Container |
|--------|-------------------|------------------|
| Deployment risk | Isolated | Changes affect all apps |
| Testing | Independent workspaces | Shared workspace conflicts |
| Config complexity | Simple, single-purpose | Complex routing rules |
| Scaling | Per-app scaling | Shared scaling |

---

## Quick Start

### Install CLI

```bash
# Install tagmanager2 CLI (Rust)
cargo install google-tagmanager2-cli

# Verify
tagmanager2 --version
```

### Authenticate

```bash
# Interactive OAuth2 (first time)
tagmanager2 accounts list

# Credentials stored at ~/.google-service-cli/tagmanager2-token-*.json
```

### Initialize Container for App

```bash
# Use the skill
/gtm init web

# Or manually (see CLI Commands below)
```

---

## Configuration Structure

```
.claude/config/gtm/
├── account.yaml              # Centralized account config
├── shared/                   # Shared templates (applied to all containers)
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
│
├── web/                      # Per-app: web
│   ├── container.yaml        # Container ID, measurement ID, sGTM endpoint
│   ├── tags/
│   │   └── ga4-event.json
│   └── variables/
│       └── measurement-id.json
│
├── ai4su/                    # Per-app: ai4su
│   ├── container.yaml
│   ├── tags/
│   └── variables/
│
└── designOS_sandbox/         # Per-app: designOS_sandbox
    ├── container.yaml
    ├── tags/
    └── variables/
```

### Account Config (account.yaml)

```yaml
version: "1.0.0"
account_id: "${GTM_ACCOUNT_ID}"

apps:
  - web
  - ai4su
  - designOS_sandbox

defaults:
  sgtm:
    region: europe-west1
    min_instances: 0
    max_instances: 10
  consent:
    default: denied
    categories: [analytics, marketing]
  events:
    core: [page_view, error, consent_update]
    extended: [performance, user_interaction, session_start]
```

### Per-App Config (<app>/container.yaml)

```yaml
version: "1.0.0"
app_id: web
container_id: "${GTM_CONTAINER_ID_WEB}"
measurement_id: "${GA4_MEASUREMENT_ID_WEB}"
last_synced: null

sgtm:
  service_name: sgtm-web
  endpoint: "${SGTM_ENDPOINT_WEB}"
```

---

## CLI Commands

### Account Operations

```bash
# List accounts
tagmanager2 accounts list

# Get account details
tagmanager2 accounts get --account-id=$GTM_ACCOUNT_ID
```

### Container Operations

```bash
# List all containers
tagmanager2 accounts containers-list --account-id=$GTM_ACCOUNT_ID

# Create server container for app
tagmanager2 accounts containers-create \
  --account-id=$GTM_ACCOUNT_ID \
  -r '{"name":"sgtm-web","usageContext":["server"]}'

# Get container snippet
tagmanager2 accounts containers-snippet \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB
```

### Workspace Operations

```bash
# List workspaces
tagmanager2 accounts containers-workspaces-list \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB

# Create workspace
tagmanager2 accounts containers-workspaces-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB \
  -r '{"name":"Sync-2026-01-26"}'
```

### Tag Operations

```bash
# List tags
tagmanager2 accounts containers-workspaces-tags-list \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB \
  --workspace-id=$WORKSPACE_ID

# Create tag
tagmanager2 accounts containers-workspaces-tags-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB \
  --workspace-id=$WORKSPACE_ID \
  -r @.claude/config/gtm/web/tags/ga4-event.json
```

### Trigger Operations

```bash
# Create trigger from shared template
tagmanager2 accounts containers-workspaces-triggers-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB \
  --workspace-id=$WORKSPACE_ID \
  -r @.claude/config/gtm/shared/triggers/consent-analytics.json
```

### Variable Operations

```bash
# Create variable
tagmanager2 accounts containers-workspaces-variables-create \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB \
  --workspace-id=$WORKSPACE_ID \
  -r @.claude/config/gtm/web/variables/measurement-id.json
```

### Version Operations

```bash
# Create version from workspace
tagmanager2 accounts containers-workspaces-create-version \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB \
  --workspace-id=$WORKSPACE_ID \
  -r '{"name":"v1.0.0","notes":"Initial release"}'

# List versions
tagmanager2 accounts containers-versions-list \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB

# Publish version
tagmanager2 accounts containers-versions-publish \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB \
  --container-version-id=$VERSION_ID
```

---

## Event Taxonomy

### Naming Convention

```
{category}_{action}_{optional_qualifier}
```

- All lowercase
- Snake_case
- Max 40 characters
- Category first, action second

### Examples

| Event | Description |
|-------|-------------|
| `page_view` | Page navigation |
| `form_submit` | Form submission |
| `button_click_cta` | CTA button click |
| `error_javascript` | JS error |
| `performance_load` | Page load metrics |

### Core vs Extended Events

| Type | Fires in Low Data Mode | Examples |
|------|------------------------|----------|
| Core | Always | page_view, error, consent_update |
| Extended | Only when disabled | performance, user_interaction, session_start |

---

## Required Dimensions

Every event must include:

| Dimension | Purpose |
|-----------|---------|
| `app_id` | Which app (web, ai4su, etc.) |
| `brand_id` | Active brand (default, eu-d4d) |
| `low_data_mode` | Boolean - is Low Data Mode active |
| `session_id` | Session identifier |
| `client_id` | Persistent client identifier |

---

## Cloud Run Deployment

### Deploy sGTM for App

```bash
# Using the skill
/gtm deploy web

# Using Cloud Build
gcloud builds submit \
  --config=packages/infra/gtm/cloudbuild-sgtm.yaml \
  --substitutions=_APP_ID=web,_SERVICE_NAME=sgtm-web
```

### Direct Deployment

```bash
gcloud run deploy sgtm-web \
  --image=gcr.io/$PROJECT_ID/sgtm:latest \
  --region=europe-west1 \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=10 \
  --set-env-vars="CONTAINER_CONFIG=$GTM_CONTAINER_CONFIG_WEB"
```

### Custom Domain Setup

1. Create domain mapping in Cloud Run for each sGTM service
2. Configure DNS CNAME to ghs.googlehosted.com
3. Update `SGTM_ENDPOINT_<APP>` in secrets

---

## Environment Variables

### Account Level

| Variable | Description |
|----------|-------------|
| `GTM_ACCOUNT_ID` | GTM Account ID |

### Per-App (replace `<APP>` with uppercase app name)

| Variable | Description |
|----------|-------------|
| `GTM_CONTAINER_ID_<APP>` | Container ID |
| `GTM_CONTAINER_CONFIG_<APP>` | Container config string |
| `GA4_MEASUREMENT_ID_<APP>` | GA4 Measurement ID |
| `SGTM_ENDPOINT_<APP>` | sGTM endpoint URL |

Example for `web` app:
- `GTM_CONTAINER_ID_WEB`
- `GTM_CONTAINER_CONFIG_WEB`
- `GA4_MEASUREMENT_ID_WEB`
- `SGTM_ENDPOINT_WEB`

---

## Troubleshooting

### Authentication Issues

```bash
# Re-authenticate
rm ~/.google-service-cli/tagmanager2-token-*.json
tagmanager2 accounts list
```

### Container Not Found

```bash
# List containers to find the ID
tagmanager2 accounts containers-list --account-id=$GTM_ACCOUNT_ID

# Initialize if missing
/gtm init <app>
```

### Publish Failed

```bash
# Check workspace status
tagmanager2 accounts containers-workspaces-get \
  --account-id=$GTM_ACCOUNT_ID \
  --container-id=$GTM_CONTAINER_ID_WEB \
  --workspace-id=$WORKSPACE_ID
```

### Events Not Appearing in GA4

1. Check consent state in browser devtools
2. Verify sGTM endpoint is receiving requests
3. Check GA4 Real-Time report (filter by app)
4. Verify measurement ID in `<app>/variables/measurement-id.json`

---

## CI/CD (Cloud Build)

GTM configuration is managed via Cloud Build triggers (not GitHub Actions).

### Configuration Files

| File | Purpose |
|------|---------|
| `packages/infra/gtm/cloudbuild-gtm-sync.yaml` | Syncs GTM config to container |
| `packages/infra/gtm/cloudbuild-gtm-drift.yaml` | Weekly drift detection |
| `packages/infra/gtm/cloudbuild-sgtm.yaml` | Deploys sGTM to Cloud Run |
| `packages/infra/gtm/setup-triggers.sh` | Creates all triggers |

### Triggers

| Trigger | Fires On |
|---------|----------|
| `gtm-deploy-web` | Changes to `shared/` or `web/` config |
| `gtm-deploy-ai4su` | Changes to `shared/` or `ai4su/` config |
| `gtm-deploy-sandbox` | Changes to `shared/` or `designOS_sandbox/` config |
| `gtm-drift` | Weekly via Cloud Scheduler |
| `sgtm-deploy-*` | Changes to `Dockerfile.sgtm` |

### Setup Triggers

```bash
# Run setup script
packages/infra/gtm/setup-triggers.sh

# Or manually create a trigger
gcloud builds triggers create github \
  --name="gtm-deploy-web" \
  --repo-owner=0xMoRyuk \
  --repo-name=UI_platform \
  --branch-pattern="^main$" \
  --included-files=".claude/config/gtm/shared/**,.claude/config/gtm/web/**" \
  --build-config="packages/infra/gtm/cloudbuild-gtm-sync.yaml" \
  --substitutions="_APP_ID=web"
```

### Manual Trigger

```bash
# Sync GTM config for an app
gcloud builds triggers run gtm-deploy-web --region=europe-west1

# Run drift detection
gcloud builds triggers run gtm-drift --region=europe-west1
```

### Required Substitutions

Configure these in Cloud Build trigger settings or Secret Manager:

| Substitution | Description |
|--------------|-------------|
| `_GTM_ACCOUNT_ID` | GTM Account ID |
| `_GTM_CONTAINER_ID_WEB` | Container ID for web |
| `_GTM_CONTAINER_ID_AI4SU` | Container ID for ai4su |
| `_GTM_CONTAINER_ID_SANDBOX` | Container ID for sandbox |
| `_GTM_CONTAINER_CONFIG_*` | Container config strings |

---

## Related Documentation

- Analytics principles: `standards/analytics.md`
- Agent: `.claude/agents/gtm-config.md`
- Skill: `.claude/skills/gtm/SKILL.md`
- Client SDK: `packages/ui/src/analytics/`
- GCP deployment: `.claude/references/deployment-gcp.md`
