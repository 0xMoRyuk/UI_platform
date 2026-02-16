---
name: deploy
version: 1.0.0
description: Deploy apps to Cloud Run from Claude Code
invocable: true
commands:
  - status
  - deploy
  - rollback
  - logs
---

# /deploy Skill

> **Note**: This skill is also accessible via the unified `/deploy ui` command from any project.

User-invocable skill for deploying apps to Google Cloud Run.

## Commands

| Command | Description |
|---------|-------------|
| `/deploy status [app]` | Show Cloud Run service status |
| `/deploy deploy <app>` | Deploy app via Cloud Build |
| `/deploy rollback <app>` | Rollback to previous revision |
| `/deploy logs <app>` | View recent Cloud Run logs |

---

## `/deploy status [app]`

Show current Cloud Run service status.

### Usage

```bash
# Show all apps
/deploy status

# Show specific app
/deploy status web
```

### What it does

1. Query: `gcloud run services list --region=europe-west1 --filter="metadata.name~ui-platform"`
2. For specific app: `gcloud run services describe ui-platform-<app> --region=europe-west1`
3. Show: URL, revision, traffic, last deploy time

### Output (all apps)

```
Cloud Run Status (europe-west1)
===============================
  ai4su:             ✓ https://ui-platform-ai4su-xxx.run.app
```

### Output (specific app)

```
Status: ai4su
=============
Service: ui-platform-ai4su
URL: https://ui-platform-ai4su-xxx.run.app
Revision: ui-platform-ai4su-00042-abc (100%)
Last Deploy: 2026-01-26T10:30:00Z
```

---

## `/deploy deploy <app>`

Deploy an app via Cloud Build.

### Arguments

- `<app>` - App name (must exist in `apps/` directory)

### What it does

1. Validate app exists in `apps/`
2. Show git status (warn if uncommitted changes)
3. Confirm with user
4. Run: `./scripts/deploy.sh <app>`
5. Stream build output
6. Show final URL and version

### Interactive flow

```
Deploy: ai4su

Git: main @ abc1234 "feat: add analytics"
Uncommitted: none

Proceed? [y/N] y

Building... (3-5 min)
[stream build output]

✓ Deployed: https://ui-platform-ai4su-xxx.run.app
  Version: v20260126-abc1234
```

### Validation

Before deploying:
1. Check `apps/<app>` directory exists
2. Run `git status` to show uncommitted changes
3. Ask for confirmation before triggering build

---

## `/deploy rollback <app>`

Rollback to previous revision.

### Arguments

- `<app>` - App name

### What it does

1. List revisions: `gcloud run revisions list --service=ui-platform-<app> --region=europe-west1 --limit=5`
2. Show current vs previous
3. Confirm
4. Run: `./scripts/rollback.sh ui-platform-<app>`

### Interactive flow

```
Rollback: ai4su

Current:  ui-platform-ai4su-00042-abc (100%)
Previous: ui-platform-ai4su-00041-def (0%)

Rollback to 00041-def? [y/N] y

✓ Rolled back to ui-platform-ai4su-00041-def
```

---

## `/deploy logs <app>`

View recent Cloud Run logs.

### Arguments

- `<app>` - App name
- `--errors` - Show only severity>=ERROR
- `--since=1h` - Time filter (default: 1h)

### Usage

```bash
# Recent logs
/deploy logs ai4su

# Errors only
/deploy logs ai4su --errors

# Last 24 hours
/deploy logs ai4su --since=24h
```

### What it does

1. Query Cloud Logging for the service
2. Format and display recent entries
3. Support filtering by severity and time

### Query template

```bash
gcloud logging read \
  "resource.type=cloud_run_revision AND resource.labels.service_name=ui-platform-<app>" \
  --limit=50 \
  --format="table(timestamp,severity,textPayload)"
```

---

## Error Handling

### App Not Found

```
Error: App 'foo' not found

Available apps:
  - ai4su
```

### Build Failed

```
Error: Build failed

View logs: gcloud builds log <build-id> --region=europe-west1

Common fixes:
  - bun run type-check
  - bun run lint
```

### Not Authenticated

```
Error: gcloud not authenticated

Run: gcloud auth login
```

### No Previous Revision

```
Error: No previous revision found to rollback to

This is likely the first deployment. No rollback possible.
```

---

## Configuration

### Region

All Cloud Run services deploy to `europe-west1`.

### Service Naming

Services follow the pattern: `ui-platform-<app>`

| App | Service Name |
|-----|-------------|
| ai4su | ui-platform-ai4su |

### Scripts

This skill uses existing scripts:

- `./scripts/deploy.sh <app>` - Triggers Cloud Build
- `./scripts/rollback.sh <service>` - Rolls back traffic

---

## Related

- Cloud Build config: `packages/infra/cloudbuild-cicd.yaml`
- GCP deployment guide: `.claude/references/deployment-gcp.md`
