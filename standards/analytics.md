# Analytics Principles

Guidelines for measuring app activities in the UI Platform monorepo, aligned with the North Star principles (bytes are money, low-data UX, users in Africa).

---

## Core Principles

### 1. Server-Side Tagging First

- Use GTM Server-Side Container on Cloud Run (scale-to-zero compatible)
- Reduces client payload by ~50-80KB (no gtag.js on client)
- Better data accuracy (avoids ad blockers)
- First-party data collection via custom domain

### 2. Consent-First Architecture

- **No consent = No tracking** (zero network calls)
- GDPR-compliant consent banner with granular controls
- Consent state persisted in localStorage
- Default state: all tracking disabled

### 3. Measure Value, Not Vanity

Track metrics that matter for user experience and system health:

| Metric | Why |
|--------|-----|
| Bytes per session | Core KPI - data costs money for users |
| API calls per screen | Network discipline validation |
| Cache hit rate | Offline-first effectiveness |
| Core Web Vitals (LCP, FCP) | Perceived performance |
| Error rate | System reliability |

**Avoid:** Pageviews for vanity, excessive custom events, engagement time (gameable)

### 4. Data Budget for Analytics

- **Target:** <10KB total analytics client payload
- **Avoid:** Marketing tags, heatmaps, session replay (heavy)
- **Defer:** Non-critical tracking until after LCP

### 5. Per-App Isolation

- Separate GA4 property per app (ai4su)
- Separate sGTM container per app (independent deployment cycles)
- Separate Cloud Run service per app (isolated scaling, failure isolation)
- No cross-app user tracking without explicit business need

### 6. Low Data Mode Respect

When `NEXT_PUBLIC_ENABLE_LOW_DATA_MODE=true`:
- Only essential events fire: `page_view`, `error`, `consent_update`
- Performance tracking disabled
- Reduced beacon frequency

---

## Event Taxonomy

### Naming Convention

```
{category}_{action}_{optional_qualifier}

Examples:
- page_view
- form_submit
- button_click_cta
- error_javascript
- performance_load
```

**Rules:**
- All lowercase
- Snake_case
- Max 40 characters
- Category first, action second

### Core Events

| Event | Description | Low Data Mode |
|-------|-------------|---------------|
| `page_view` | Page navigation | Always |
| `performance` | LCP, FCP, bytes, cache hits | Skipped |
| `user_interaction` | Clicks, form submits | Skipped |
| `error` | Client-side errors | Always |
| `consent_update` | Consent changes | Always |
| `session_start` | New session began | Skipped |

### Custom Dimensions

Every event includes:

| Dimension | Purpose |
|-----------|---------|
| `app_id` | Which app (web, ai4su, etc.) |
| `brand_id` | Active brand (default, eu-d4d) |
| `low_data_mode` | Boolean - is low data mode active |
| `session_id` | Session identifier |
| `client_id` | Persistent client identifier |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Per-App Architecture                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ App: web        │  │ App: ai4su      │  │ App: sandbox    │  │
│  │ <10KB client JS │  │ <10KB client JS │  │ <10KB client JS │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │            │
│           ▼                    ▼                    ▼            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ sgtm-web        │  │ sgtm-ai4su      │  │ sgtm-sandbox    │  │
│  │ Cloud Run       │  │ Cloud Run       │  │ Cloud Run       │  │
│  │ scale-to-zero   │  │ scale-to-zero   │  │ scale-to-zero   │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │            │
│           ▼                    ▼                    ▼            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ GA4 Property    │  │ GA4 Property    │  │ GA4 Property    │  │
│  │ (web)           │  │ (ai4su)         │  │ (sandbox)       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Why Per-App Containers?

| Aspect | Per-App | Shared |
|--------|---------|--------|
| Deployment risk | Isolated - can't break other apps | Changes affect all |
| Testing | Independent workspaces | Conflicts possible |
| Failure isolation | One app down ≠ all down | Single point of failure |
| Cost (low traffic) | ~$0-2/month | ~$0-1/month |

### Why Server-Side?

| Benefit | Impact |
|---------|--------|
| No gtag.js | Save 50-80KB per page |
| First-party | Avoids ad blockers, better data |
| Scale-to-zero | Pay only for actual requests |
| Per-app isolation | Safer deployments |

---

## Implementation Checklist

### Prerequisites

- [ ] Create GA4 properties (one per app)
- [ ] Create GTM Server containers (one per app)
- [ ] Deploy sGTM to Cloud Run (one service per app)

### Package Setup

- [ ] Analytics client (`packages/ui/src/analytics/`)
- [ ] Consent banner component
- [ ] Framework providers (Next.js, Vite)

### App Integration

- [ ] Add AnalyticsProvider to each app's root
- [ ] Add ConsentBanner to each app
- [ ] Configure environment variables

### GTM Configuration

- [ ] GA4 Event tag
- [ ] Consent-aware triggers
- [ ] Variable mapping (measurement_id, events)

---

## What NOT to Track

- PII (emails, names, phone numbers)
- Exact user location (city-level max)
- Financial information
- Health data
- Anything requiring consent not granted

## What NOT to Use

- Session replay tools (data-heavy, privacy concerns)
- Heatmaps (data-heavy)
- Third-party marketing pixels
- Real-time chat analytics
- Scroll depth (rarely actionable)

---

## Cost Considerations

**Target traffic:** ~300 users/day, ~10 pageviews each = 90,000 events/month

### Monthly Cost Breakdown

| Component | Qty | Cost | Notes |
|-----------|-----|------|-------|
| Cloud Run (sGTM) | 3 services | $0-2 | Scale-to-zero, within free tier |
| Cloud Build | ~20 builds | $0 | 120 free build-minutes/day |
| Container Registry | ~500MB | $0.05 | $0.026/GB/month |
| Cloud Scheduler | 1 job | $0 | 3 free jobs/month |
| GTM | 3 containers | $0 | Free |
| GA4 | 3 properties | $0 | Free (10M events/month limit) |
| **Total** | | **$0-2** | |

### Cloud Run Free Tier Coverage

```
Per sGTM container (~30k requests/month):
- CPU:      180,000 vCPU-seconds FREE → usage ~15 hrs = within free tier
- Memory:   360,000 GiB-seconds FREE → usage minimal = within free tier
- Requests: 2M requests FREE → usage 30k = within free tier
```

### Cost at Scale

| Traffic | Events/month | Estimated Cost |
|---------|--------------|----------------|
| 300 users/day | 90,000 | $0-2 |
| 1,000 users/day | 300,000 | $2-10 |
| 10,000 users/day | 3,000,000 | $15-30 |

### Data Transfer (User Cost)

- Users pay for bytes downloaded
- Target: <10KB analytics payload
- User cost: ~$0.0001 per session at $0.10/MB

### Cost Optimization

- `min_instances: 0` (scale-to-zero) - already configured
- `max_instances: 3` sufficient for low traffic
- CPU throttling enabled for idle periods

---

## Verification

### Bundle Size

```bash
# Check analytics contribution to bundle
cd apps/ai4su && bun run build
# Verify analytics code < 10KB
```

### Consent Flow

1. Clear localStorage
2. Load app - consent banner should appear
3. Check Network tab - no analytics calls before consent
4. Accept consent - verify POST to sGTM endpoint
5. Reject consent - verify no analytics calls

### GA4 Real-Time

1. Give consent in app
2. Navigate between pages
3. Check GA4 Real-Time report
4. Verify events appear with correct app_id

---

## References

- [GTM Server-Side on Cloud Run](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [GDPR Consent Requirements](https://gdpr.eu/cookies/)
