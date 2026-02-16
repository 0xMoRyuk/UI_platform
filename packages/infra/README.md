# @ui-platform/infra

Infrastructure code, Dockerfiles, and deployment scripts for all apps.

## Structure

- `Dockerfile` - Multi-stage Dockerfile for Next.js apps
- `cloudbuild.yaml` - Cloud Build configuration template
- `scripts/` - Deployment and infrastructure scripts
- `.dockerignore` - Docker ignore rules

## Deploying Apps

### Deploy Single App

```bash
# From root directory
cd packages/infra
./scripts/deploy.sh <app-name> <project-id> <region>

# Example
./scripts/deploy.sh ai4su my-gcp-project europe-west1
```

### Deploy All Apps

```bash
./scripts/deploy-all.sh <project-id> <region>
```

## Adding New App

1. Create app in `apps/<app-name>/`
2. Build configuration will be auto-detected
3. Deploy with `./scripts/deploy.sh <app-name>`

## Cloud Run Configuration

Each app deploys as a separate Cloud Run service with:
- Scale-to-zero enabled (minInstances: 0)
- Memory: 512Mi (configurable per app)
- CPU: 1 vCPU
- Max instances: 10 (cost protection)
- Region: europe-west1 (default, closest to Africa)

## CI/CD with Cloud Build

Cloud Build automatically:
1. Builds Docker image
2. Pushes to Container Registry
3. Deploys to Cloud Run
4. Tags with commit SHA and "latest"

Enable in your GCP project:
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

## Cost Optimization

- All services scale to zero when not in use
- Pay only for request execution time
- Shared base image layers reduce build time
- Aggressive caching in Cloud Build
