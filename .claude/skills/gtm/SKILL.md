---
name: gtm
version: 2.0.0
description: Manage GTM Server-Side configuration as code (per-app isolation)
invocable: true
commands:
  - status
  - init
  - sync
  - validate
  - publish
  - deploy
---

# /gtm Skill

User-invocable skill for managing Google Tag Manager Server-Side containers with **per-app isolation**.

## Architecture

Each app gets its own GTM container for independent deployment:

```
GTM Account
└── Container: sgtm-ai4su      → sgtm-ai4su.run.app      → GA4 (ai4su)
```

## Commands

| Command | Description |
|---------|-------------|
| `/gtm status [app]` | Show container status (all apps or specific app) |
| `/gtm init <app>` | Initialize GTM container for app |
| `/gtm sync <app>` | Sync local config to app's GTM workspace |
| `/gtm validate <app>` | Validate app config against analytics.md |
| `/gtm publish <app>` | Create version and publish to production |
| `/gtm deploy <app>` | Deploy sGTM to Cloud Run |

---

## `/gtm status [app]`

Show current GTM configuration status.

### Usage

```bash
# Show all apps
/gtm status

# Show specific app
/gtm status web
```

### What it does

1. Read `.claude/config/gtm/account.yaml` for app list
2. For each app (or specified app):
   - Read `<app>/container.yaml` for container details
   - Check authentication with `tagmanager2`
   - Query container state if container ID exists
   - Report sync status

### Output (all apps)

```
GTM Configuration Status
========================
Account: accounts/123456789

Apps:
  ai4su:          GTM-YYYYY (synced 2026-01-25)

Run /gtm init <app> to initialize missing containers.
```

### Output (specific app)

```
GTM Status: ai4su
=================
Container: GTM-YYYYY
Measurement ID: G-YYYYYYYYYY
sGTM Service: sgtm-ai4su
sGTM Endpoint: https://sgtm-ai4su-xxxxx.run.app

Last synced: 2026-01-26T10:30:00Z

Resources:
  Tags: 1
  Triggers: 3 (from shared/)
  Variables: 7 (5 shared + 2 app-specific)
```

---

## `/gtm init <app>`

Initialize a new GTM Server container for an app.

### Arguments

- `<app>` - App name (must exist in `apps/` directory)

### Prerequisites

- `tagmanager2` CLI installed
- Google Cloud project with Tag Manager API enabled
- GTM account access

### What it does

1. Verify app exists in `apps/` directory
2. Check if container already exists for app
3. Prompt for GA4 Measurement ID
4. Create Server container: `sgtm-<app>`
5. Create default workspace
6. Copy shared triggers from `shared/triggers/`
7. Copy shared variables from `shared/variables/`
8. Create app-specific measurement ID variable
9. Create GA4 event tag
10. Update `<app>/container.yaml` with container ID
11. Output next steps for Cloud Run deployment

### Prompts

- GA4 Measurement ID (e.g., G-XXXXXXXXXX)
- Confirm container creation

### Output

```
Initializing GTM container for: ai4su

Enter GA4 Measurement ID: G-XXXXXXXXXX

Creating container...
  Container: sgtm-ai4su
  Container ID: GTM-XXXXXX

Syncing shared resources...
  ✓ consent-analytics trigger
  ✓ consent-marketing trigger
  ✓ low-data-mode trigger
  ✓ custom-dimensions variables
  ✓ consent-state variables

Creating app-specific resources...
  ✓ measurement-id variable
  ✓ ga4-event tag

Updated .claude/config/gtm/ai4su/container.yaml

Next steps:
1. Add secrets to Secret Manager (or Cloud Build substitutions):
   - GTM_CONTAINER_ID_AI4SU=GTM-XXXXXX
   - GA4_MEASUREMENT_ID_AI4SU=G-XXXXXXXXXX

2. Deploy sGTM to Cloud Run:
   /gtm deploy ai4su
```

---

## `/gtm sync <app>`

Sync local configuration files to app's GTM workspace.

### Arguments

- `<app>` - App name

### What it does

1. Read `<app>/container.yaml` for container ID
2. Create new workspace for changes
3. Compare local config with remote
4. Sync shared triggers/variables
5. Sync app-specific tags/variables
6. Show diff summary
7. Prompt for confirmation before applying

### Output

```
Syncing to GTM workspace: ai4su

Creating workspace: Sync-2026-01-26...

Changes detected:
  Shared:
    = triggers/consent-analytics.json (unchanged)
    = triggers/consent-marketing.json (unchanged)
    ~ triggers/low-data-mode.json (modified)
    = variables/* (unchanged)

  App (ai4su):
    = tags/ga4-event.json (unchanged)
    + variables/new-custom-var.json (new)

Apply these changes? [y/N]
```

---

## `/gtm validate <app>`

Validate app configuration against analytics.md principles.

### Arguments

- `<app>` - App name

### What it validates

- [ ] Container config exists (`<app>/container.yaml`)
- [ ] GA4 event tag has consent trigger
- [ ] GA4 event tag has Low Data Mode blocking trigger
- [ ] Measurement ID variable is configured
- [ ] Event names follow taxonomy (via schema validation)
- [ ] All shared triggers present

### Output

```
Validating GTM configuration: ai4su

✓ Container config exists
✓ GA4 event tag has consent trigger
✓ GA4 event tag has Low Data Mode blocker
✓ Measurement ID configured
✓ Event schema valid

Validation passed!
```

Or with issues:

```
Validating GTM configuration: ai4su

✓ Container config exists
✗ GA4 event tag missing consent trigger
✓ GA4 event tag has Low Data Mode blocker
✗ Measurement ID not configured
✓ Event schema valid

Validation failed with 2 errors.
```

---

## `/gtm publish <app>`

Create version and publish to production.

### Arguments

- `<app>` - App name

### What it does

1. Run `/gtm validate <app>` first
2. Show summary of changes since last publish
3. Prompt for version name and notes
4. Create version from workspace
5. Publish to production container
6. Update `last_synced` in `<app>/container.yaml`

### Prompts

- Version name (default: auto-generated from date)
- Version notes
- Confirm publish

### Output

```
Publishing GTM configuration: ai4su

Validation passed!

Changes since last publish:
  - Updated low-data-mode trigger regex
  - Added new-custom-var variable

Version name [v2026.01.26]:
Version notes: Updated Low Data Mode extended events list

Creating version... done
Publishing... done

Version v2026.01.26 published successfully!

Container: GTM-XXXXX
Published at: 2026-01-26T10:45:00Z
```

---

## `/gtm deploy <app>`

Deploy sGTM container to Cloud Run.

### Arguments

- `<app>` - App name

### What it does

1. Read `<app>/container.yaml` for sGTM service name
2. Trigger Cloud Build: `gcloud builds triggers run sgtm-deploy-<app>`
3. Deploy to Cloud Run as `sgtm-<app>`
4. Output service URL

### Output

```
Deploying sGTM for: ai4su

Triggering Cloud Build...
  Trigger: sgtm-deploy-ai4su
  Service: sgtm-ai4su
  Region: europe-west1

Build started: https://console.cloud.google.com/cloud-build/builds/...
Waiting for build to complete...

sGTM deployed successfully!
  URL: https://sgtm-ai4su-xxxxx-ey.a.run.app

Update SGTM_ENDPOINT_AI4SU in Secret Manager.
```

---

## Configuration Files

All configuration is stored in `.claude/config/gtm/`:

```
.claude/config/gtm/
├── account.yaml              # Account + app list
├── shared/                   # Shared across all apps
│   ├── triggers/
│   ├── variables/
│   └── schemas/
└── ai4su/                    # Per-app config
    ├── container.yaml
    ├── tags/
    └── variables/
```

---

## Environment Variables

| Variable | Description | Scope |
|----------|-------------|-------|
| `GTM_ACCOUNT_ID` | GTM Account ID | Account |
| `GTM_CONTAINER_ID_<APP>` | Container ID | Per-app |
| `GA4_MEASUREMENT_ID_<APP>` | GA4 ID | Per-app |
| `SGTM_ENDPOINT_<APP>` | sGTM URL | Per-app |

Example for `ai4su` app:
- `GTM_CONTAINER_ID_AI4SU`
- `GA4_MEASUREMENT_ID_AI4SU`
- `SGTM_ENDPOINT_AI4SU`

---

## Error Handling

### Authentication Failed

```
Error: Not authenticated with GTM API

Run: tagmanager2 accounts list
This will prompt for OAuth2 authentication.
```

### Container Not Found

```
Error: Container not found for app: ai4su

Run: /gtm init ai4su
This will create a new container for the app.
```

### App Not Found

```
Error: App 'unknown' not found

Available apps:
  - ai4su

Apps must exist in apps/ directory.
```

### Validation Failed

```
Error: Validation failed for app: ai4su

Fix the issues listed above, then re-run:
  /gtm validate ai4su
```

---

## Related

- Agent: `.claude/agents/gtm-config.md`
- Reference: `.claude/references/gtm-setup.md`
- Analytics principles: `standards/analytics.md`
- Client SDK: `packages/ui/src/analytics/`
