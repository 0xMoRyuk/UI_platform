# GCP Deployment

## Project Details

- **Project ID:** `digital-africa-ai4su`
- **Region:** `europe-west1`
- **Service URL:** https://ui-platform-ai4su-jvrtfyxamq-ew.a.run.app

## Infrastructure Files

| File | Purpose |
|------|---------|
| `packages/infra/Dockerfile.next` | Next.js container build |
| `packages/infra/Dockerfile.vite` | Vite container build |
| `packages/infra/cloudbuild-cicd.yaml` | Cloud Build config |
| `packages/infra/triggers/production.yaml` | Trigger config |

## Quick Deploy (Manual)

```bash
# Ensure correct project
gcloud config set project digital-africa-ai4su

# Submit build from repo root
cd /Users/mo/creative_home/UI_platform
gcloud builds submit \
  --config=packages/infra/cloudbuild-cicd.yaml \
  --substitutions=SHORT_SHA=$(git rev-parse --short HEAD),_APP_NAME=ai4su,_SERVICE_NAME=ui-platform-ai4su

# Route traffic to latest (if needed)
gcloud run services update-traffic ui-platform-ai4su \
  --region=europe-west1 \
  --to-latest
```

## Automatic Deployment (CI/CD)

Pushes to `main` branch automatically trigger deployment via Cloud Build.

**Trigger Details:**
- **Name:** `ui-platform-production-deploy`
- **Region:** `europe-west1`
- **ID:** `2e14e66c-41c4-412d-8725-58f4a7c15524`
- **Repository:** `0xMoRyuk/UI_platform`
- **Branch:** `^main$`
- **Service Account:** `ai4su-aiplatform@digital-africa-ai4su.iam.gserviceaccount.com`

## Required Service Account Permissions

The trigger's service account needs these IAM roles:

| Role | Purpose |
|------|---------|
| `roles/cloudbuild.builds.builder` | Run Cloud Build |
| `roles/storage.admin` | Push to Container Registry (GCR) |
| `roles/run.admin` | Deploy to Cloud Run |
| `roles/iam.serviceAccountUser` | Act as service account |
| `roles/logging.logWriter` | Write build logs |

```bash
# Grant permissions to service account (if needed)
PROJECT_ID="digital-africa-ai4su"
SA="ai4su-aiplatform@digital-africa-ai4su.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/cloudbuild.builds.builder" --condition=None --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/storage.admin" --condition=None --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/run.admin" --condition=None --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/iam.serviceAccountUser" --condition=None --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/logging.logWriter" --condition=None --quiet
```

## Trigger Management

```bash
# Check trigger status
gcloud builds triggers list --region=europe-west1

# Manually run trigger
gcloud builds triggers run ui-platform-production-deploy \
  --region=europe-west1 \
  --branch=main
```

## Check Build Status

```bash
# List recent builds (must specify region for triggered builds)
gcloud builds list --region=europe-west1 --limit=5

# Check specific build
gcloud builds describe <BUILD_ID> --region=europe-west1 --format="value(status)"
gcloud builds log <BUILD_ID> --region=europe-west1 | tail -50
```

## Smoke Test

```bash
SERVICE_URL="https://ui-platform-ai4su-hs6gi2nj7a-ew.a.run.app"
curl -s -o /dev/null -w "%{http_code}" $SERVICE_URL          # Homepage
curl -s -o /dev/null -w "%{http_code}" $SERVICE_URL/form     # Form page
curl -s -o /dev/null -w "%{http_code}" $SERVICE_URL/analytics # Analytics
```
