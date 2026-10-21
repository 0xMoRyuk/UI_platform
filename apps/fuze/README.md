# fuze

Public application surface for the **Bee Network** — Digital Africa's startup intake portal. Embeds the canonical Typeform application (`nCZzuxiM`) at `/apply`.

## Architecture

```
Pub/Sub: puppy.canon.forms (digital-africa-fuze)   ← authoritative form_id
   │ build-time pull (ADC)
   ▼
.env.production: VITE_BEE_FORM_ID=<id>
   │
   ▼
/apply  →  <Widget id={VITE_BEE_FORM_ID} />
                │ user submits
                ▼
       form.typeform.com webhook
                ▼
   puppy/agents/ingestion/webhook  →  Notion (Startups Pool)
```

The form itself is a duplicate of Typeform `Y9M8SR2j` (the source-of-truth template). Submissions still flow through the existing puppy webhook gateway — no fuze-side handling.

## Local dev

```bash
# Option A — pull canon from Pub/Sub (requires gcloud ADC + subscription access)
gcloud auth application-default login
bun run prebuild
bun run dev

# Option B — short-circuit with env override
VITE_BEE_FORM_ID=<dup_form_id> bun run prebuild
bun run dev
```

Open http://localhost:3001/ — auto-redirects to `/apply`.

## Build & deploy

```bash
bun run build
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_APP_NAME=fuze \
  ../..    # build context = monorepo root
```

The root `cloudbuild.yaml` auto-detects Vite via `packages/infra/Dockerfile.vite`. Cloud Run service name will be `ui-platform-fuze` in `europe-west1`.

## Rotating the canonical form

See `vault-protocols/procedures/bee-network-application-canon.md`. tl;dr:

1. Duplicate the new template via Typeform API.
2. `gcloud pubsub topics publish puppy.canon.forms --message='{"form_id":"<NEW>",...}'`.
3. Redeploy fuze (build re-pulls canon).

## Files

- `src/pages/ApplyPage.tsx` — Typeform Widget full-page embed
- `src/lib/router.tsx` — `/` → `/apply` redirect, `/apply` → `<ApplyPage />`
- `scripts/resolve-canon.ts` — build-time Pub/Sub pull → `.env.production`
