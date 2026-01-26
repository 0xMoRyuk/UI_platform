# Backend & Cloud Run Standards

## Service Architecture

Separate services by responsibility:

| Service | Purpose |
|---------|---------|
| `web` | UI / SSR |
| `api` | Fast request/response |
| `worker` | Async jobs |

## Cold Starts

- Only critical UX services may use `minInstances > 0`
- Workers and non-user-facing services must scale to zero

## Async Work

- Use **Cloud Tasks** for user-triggered background work
- Use **Pub/Sub** for event-driven processing
- APIs should return immediately with a `job_id` when work is async

## Datastores

| Use Case | Datastore |
|----------|-----------|
| Simple data models, read-heavy | **Firestore** |
| Relational guarantees required | **Cloud SQL** |

## Cost Guardrails

- Rate limit expensive endpoints
- Cap payload sizes and export frequencies
- Log with intent (sampling for hot paths)

---

# Observability & Metrics

Track and optimize for:

- p95 latency (user-facing)
- Cold start rate
- Bytes transferred per session
- API calls per screen
- Cache hit rate

Avoid verbose logging on high-traffic endpoints.

---

# Analytics

**Full principles:** See `standards/analytics.md`

## Core Rules

1. **Server-side tagging first** - GTM Server-Side on Cloud Run (saves ~80KB client payload)
2. **Consent-first** - No tracking without explicit GDPR consent
3. **Per-app isolation** - Separate GA4 property per app
4. **<10KB budget** - Total analytics client code must stay under 10KB
5. **Low Data Mode aware** - Only essential events when enabled

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 property ID for the app |
| `NEXT_PUBLIC_SGTM_ENDPOINT` | GTM Server-Side container URL |
| `VITE_GA4_MEASUREMENT_ID` | GA4 property ID (Vite apps) |
| `VITE_SGTM_ENDPOINT` | GTM Server-Side container URL (Vite apps) |

## What to Track

| Event | Low Data Mode |
|-------|---------------|
| `page_view` | Always |
| `performance` (LCP, bytes, cache) | Skipped |
| `user_interaction` | Skipped |
| `error` | Always |
| `consent_update` | Always |

## What NOT to Track

- PII (emails, names, exact location)
- Session replay / heatmaps (data-heavy)
- Third-party marketing pixels
- Scroll depth (rarely actionable)

---

# Security & Secrets

- Use **IAM and service accounts** between services
- No hardcoded secrets
- All secrets must come from **Secret Manager**
- Public endpoints must be rate-limited and validated
