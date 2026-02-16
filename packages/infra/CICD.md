---
version: "1.0.0"
last_updated: "2026-01-08"
type: "cicd-guide"
---

# CI/CD Pipeline for UI Platform

This guide explains the automated deployment pipeline for the UI Platform monorepo using Google Cloud Build.

## Overview

The CI/CD pipeline provides:
- ✅ **Automated testing** - Type checking, linting, and tests before deployment
- 🐳 **Optimized builds** - Kaniko with layer caching (24h TTL)
- 🎯 **Canary deployments** - Gradual traffic migration (10% → 100%)
- 🏷️ **Version tagging** - Semantic versioning with rollback capability
- 🌍 **Multi-environment** - Separate staging and production deployments
- 💰 **Cost-optimized** - Scale-to-zero when idle
- 🔍 **Smoke tests** - Automated health checks after deployment

## Architecture

```
Git Push → Cloud Build Trigger → Tests → Build → Deploy → Smoke Tests
                                    ↓
                              (if failed, stop)
                                    ↓
                          Canary Deployment
                          (10% → wait → 100%)
```

## Setup Instructions

### 1. Connect GitHub Repository

```bash
# Navigate to Cloud Build in GCP Console
# https://console.cloud.google.com/cloud-build/triggers

# Click "Connect Repository" and follow GitHub OAuth flow
# Select your UI_platform repository
```

### 2. Create Cloud Build Triggers

#### Production Trigger

```bash
# From project root
cd packages/infra

# Create production trigger
gcloud builds triggers create github \
  --name="ui-platform-production-deploy" \
  --repo-name="UI_platform" \
  --repo-owner="YOUR_GITHUB_USERNAME" \
  --branch-pattern="^main$" \
  --build-config="packages/infra/cloudbuild-cicd.yaml" \
  --substitutions="_APP_NAME=ai4su,_ENV=production,_REGION=europe-west1" \
  --project=digital-africa-ai4su

# Or import from YAML
gcloud builds triggers import --source=triggers/production.yaml \
  --project=digital-africa-ai4su
```

#### Staging Trigger

```bash
# Create staging trigger
gcloud builds triggers create github \
  --name="ui-platform-staging-deploy" \
  --repo-name="UI_platform" \
  --repo-owner="YOUR_GITHUB_USERNAME" \
  --branch-pattern="^staging/.*$" \
  --build-config="packages/infra/cloudbuild-cicd.yaml" \
  --substitutions="_APP_NAME=ai4su,_ENV=staging,_REGION=europe-west1" \
  --project=digital-africa-ai4su

# Or import from YAML
gcloud builds triggers import --source=triggers/staging.yaml \
  --project=digital-africa-ai4su
```

### 3. Configure IAM Permissions

The Cloud Build service account needs permissions to deploy to Cloud Run:

```bash
PROJECT_ID="digital-africa-ai4su"
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
SERVICE_ACCOUNT="$PROJECT_NUMBER@cloudbuild.gserviceaccount.com"

# Grant Cloud Run Admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/run.admin"

# Grant Service Account User role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/iam.serviceAccountUser"

# Grant Storage Admin role (for GCR)
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/storage.admin"
```

## Usage

### Deploy to Production

```bash
# Push to main branch
git checkout main
git add .
git commit -m "feat: your feature description"
git push origin main

# Cloud Build automatically:
# 1. Runs tests and type checks
# 2. Builds Docker image with caching
# 3. Deploys to Cloud Run (canary: 10% → 100%)
# 4. Runs smoke tests
# 5. Reports deployment URL
```

### Deploy to Staging

```bash
# Create staging branch
git checkout -b staging/your-feature
git push origin staging/your-feature

# Cloud Build deploys to staging environment
```

### Monitor Deployment

```bash
# List recent builds
gcloud builds list --limit=10 --project=digital-africa-ai4su

# Stream logs for specific build
gcloud builds log BUILD_ID --project=digital-africa-ai4su --stream

# Check Cloud Run service
gcloud run services describe ui-platform-ai4su \
  --region=europe-west1 \
  --project=digital-africa-ai4su
```

## Rollback

If a deployment fails or causes issues, rollback to a previous version:

```bash
# List revisions with traffic allocation
gcloud run revisions list \
  --service=ui-platform-ai4su \
  --region=europe-west1 \
  --project=digital-africa-ai4su

# Route 100% traffic to previous revision
gcloud run services update-traffic ui-platform-ai4su \
  --region=europe-west1 \
  --to-revisions=PREVIOUS_REVISION=100 \
  --project=digital-africa-ai4su

# Or use tagged version
gcloud run services update-traffic ui-platform-ai4su \
  --region=europe-west1 \
  --to-tags=v20260108-abc1234=100 \
  --project=digital-africa-ai4su
```

## Configuration

### Environment Variables

Add environment variables in `cloudbuild-cicd.yaml`:

```yaml
--set-env-vars="NODE_ENV=production,API_URL=https://api.example.com"
```

### Secrets

Use Secret Manager for sensitive data:

```bash
# Create secret
echo -n "secret-value" | gcloud secrets create my-secret \
  --data-file=- \
  --project=digital-africa-ai4su

# Grant access to Cloud Build
gcloud secrets add-iam-policy-binding my-secret \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/secretmanager.secretAccessor" \
  --project=digital-africa-ai4su

# Use in Cloud Build
steps:
  - name: 'gcr.io/cloud-builders/gcloud'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        SECRET=$(gcloud secrets versions access latest --secret=my-secret)
        # Use $SECRET in deployment
```

## Cost Optimization

Current configuration optimizes costs through:

1. **Scale-to-zero**: `_MIN_INSTANCES: '0'` - No charges when idle
2. **Right-sizing**: `_MEMORY: '512Mi'`, `_CPU: '1'` - Minimal resources
3. **Build caching**: Kaniko with 24h cache TTL - Faster, cheaper builds
4. **Efficient machine**: `N1_HIGHCPU_8` - Faster builds = lower costs

### Estimated Costs (Africa/Europe Region)

**Cloud Run** (with scale-to-zero):
- Idle: $0/month (scaled to zero)
- Active: ~$0.048/hour (~$35/month if constantly active)
- Per request: $0.0000004/request

**Cloud Build**:
- First 120 build-minutes/day: Free
- Additional: $0.003/build-minute
- ~10 builds/day @ 5min each = Free tier

**Container Registry**:
- Storage: $0.026/GB/month
- Network egress: First 1GB free, then ~$0.12/GB

**Expected monthly cost**: $5-15 (with scale-to-zero and low traffic)

## Deployment Lessons Learned

Based on our deployment experience, key issues resolved:

1. **Lockfile conflicts**: Don't copy lockfile to Docker, let Bun generate fresh
2. **TypeScript paths**: Use relative paths, not package names in monorepo
3. **Tailwind plugins**: Load plugins in app-specific config, not shared
4. **User creation**: Use `groupadd`/`useradd` for Debian-based images
5. **Server paths**: Next.js standalone preserves monorepo structure
6. **IAM policies**: Add `allUsers` invoker role for public access

## Troubleshooting

### Build Fails at Test Step

```bash
# Run tests locally first
bun install
cd apps/ai4su
bun run typecheck
bun run lint
```

### Deployment Timeout

Increase timeout in `cloudbuild-cicd.yaml`:

```yaml
substitutions:
  _TIMEOUT: '600s'  # Increase to 10 minutes
```

### Container Won't Start

Check Cloud Run logs:

```bash
gcloud logging read \
  "resource.type=cloud_run_revision AND resource.labels.service_name=ui-platform-ai4su" \
  --limit=50 \
  --project=digital-africa-ai4su
```

### Traffic Not Routing

Verify IAM policy allows public access:

```bash
gcloud run services add-iam-policy-binding ui-platform-ai4su \
  --region=europe-west1 \
  --member=allUsers \
  --role=roles/run.invoker \
  --project=digital-africa-ai4su
```

## Best Practices

1. **Branch Strategy**:
   - `main` → Production (protected, requires PR review)
   - `staging/*` → Staging (for testing)
   - Feature branches → Manual deployment

2. **Commit Messages**:
   - Use conventional commits: `feat:`, `fix:`, `chore:`
   - Triggers show commit message in build description

3. **Testing**:
   - Always run tests locally before pushing
   - Add unit tests to `apps/ai4su/tests/`
   - Smoke tests run automatically after deployment

4. **Monitoring**:
   - Set up Cloud Monitoring alerts for errors
   - Monitor response times and error rates
   - Review Cloud Build metrics weekly

5. **Rollback Plan**:
   - Tag all deployments with version
   - Keep last 3 revisions in Cloud Run
   - Test rollback procedure monthly

## Next Steps

1. **Add more apps**: Create new trigger for each app in monorepo
2. **Environment-specific configs**: Use Secret Manager for API keys
3. **Monitoring**: Set up Cloud Monitoring alerts
4. **Load testing**: Test scale-up behavior under load
5. **Security scanning**: Add container vulnerability scanning
6. **Preview deployments**: Deploy PRs to temporary URLs

## Resources

- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Kaniko Documentation](https://github.com/GoogleContainerTools/kaniko)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
