---
version: "1.0.0"
last_updated: "2026-02-11"
status: audit
project: digital-africa-rainbow
---

# Rainbow K8s-to-Cloud Run Migration Audit

## 1. Executive Summary

The `digital-africa-rainbow` GCP project runs a program/data management platform on GKE (Kubernetes) that is expensive relative to its traffic. Three always-on workloads (Express.js backend, MongoDB, Redis) plus a GKE cluster management fee cost an estimated **$190-250/mo** for what is a low-traffic CRUD application.

| Metric | Current | Target | Savings |
|--------|---------|--------|---------|
| **Monthly cost** | $190-250 | $0-20 | 90-95% |
| **Annual cost** | $2,280-3,000 | $0-240 | $2,040-2,760/yr |
| **Always-on services** | 4 (backend, frontend, MongoDB, Redis) | 0 | All scale-to-zero |
| **Managed databases** | 0 (self-hosted MongoDB) | 1 (Firestore) | Zero ops |
| **Background queues** | Redis + Bull (4 queues) | Cloud Tasks | Eliminate Redis entirely |

**GCP project**: Stays on `digital-africa-rainbow` (separate billing from `digital-africa-ai4su`).

**Frontend**: Migrates into UI_platform monorepo as `apps/rainbow/` (Nuxt 2/Vue 2/Vuetify → Next.js 15/React/shadcn).

**Timeline estimate**: 4-8 weeks for full migration across 7 phases.

---

## 2. Current Architecture Audit

### 2.1 K8s Inventory

All values extracted from `deployment/*.yaml` in the `rainbow-backend` repository.

| Component | Kind | Image | CPU Limit | Memory Limit | PVC | Port | Always-On |
|-----------|------|-------|-----------|-------------|-----|------|-----------|
| Backend (Express + PM2) | StatefulSet | `kinshasadigital/rainbow-back-prod` | 1000m | 4Gi | 5Gi (`/app/src/uploads/`) | 5001 | Yes |
| Frontend (Nuxt 2) | Deployment | `kinshasadigital/rainbow-front-prod:latest` | 1000m | 2Gi | None | 3000 | Yes |
| MongoDB (custom image) | StatefulSet | `kinshasadigital/rainbow-mongo-prod:latest` | 1000m | 4Gi | 10Gi (`/data/db`) | 27017 | Yes |
| Redis 5.0.1-alpine | StatefulSet | `redis:5.0.1-alpine` | None | None | 2Gi (`/data`) | 6379 | Yes |
| GKE Cluster | Standard | — | 1-2 nodes | — | — | — | Yes |
| HTTP(S) LB + Static IP | GCE Ingress | — | — | — | — | 80/443 | Yes |
| Managed Certificate | ManagedCertificate | — | — | — | — | — | Yes |

**Total K8s resource limits**: 3000m CPU (3 cores), 10Gi memory, 17Gi persistent storage.

**Notes**:
- No CPU/memory **requests** set anywhere — only limits. K8s sets requests equal to limits (Guaranteed QoS), potentially over-provisioning.
- Redis has **zero resource limits** — could consume unbounded resources (BestEffort QoS).
- No replicas > 1 anywhere — no HA, but appropriate for a low-traffic app.
- No HPA configured — no scale-to-zero, paying full compute 24/7.
- PM2 in cluster mode with 1800MB memory limit for backend process management.

### 2.2 Ingress Routing

Host: `rainbow.digital-africa.co`

| Path | Backend Service | Port | Purpose |
|------|----------------|------|---------|
| `/api/*` | `backend` | 5001 | REST API |
| `/uploads/*` | `backend` | 5001 | Static file uploads |
| `/*` | `frontend` | 3000 | Nuxt 2 SSR |

**Annotations**: Mixed GCE (`kubernetes.io/ingress.class: "gce"`) and nginx (`nginx.ingress.kubernetes.io/force-ssl-redirect`) annotations. GCE class takes precedence; nginx annotations are ignored.

HTTPS-only: `kubernetes.io/ingress.allow-http: "false"`.

### 2.3 GCP Services in Use

| Service | Resource | Details |
|---------|----------|---------|
| GKE Standard | Cluster | 1-2 e2-standard-2 nodes |
| GCE HTTP(S) LB | Ingress | Global static IP named `static-ip` |
| Managed Certificate | TLS | `rainbow.digital-africa.co` |
| Cloud Storage | 3 buckets | `CLOUD_STORAGE_BUCKET_NAME`, `rainbow-uploads`, `rainbow-upload-public` |
| BigQuery | Dataset `t4su` | Project `digital-africa-rainbow` |
| Google OAuth 2.0 | Authentication | Client ID + secret |
| Persistent Disks | 3 PVCs | 17Gi total (SSD) |

### 2.4 Itemized Cost Breakdown

| Component | Estimated Monthly Cost | % of Total | Waste Factor |
|-----------|----------------------|------------|-------------|
| GKE cluster management fee | $73 | 34% | **High** — $73/mo just for control plane |
| Compute (e2-standard-2 node × 1-2) | $49-97 | 23-45% | **High** — always-on for low traffic |
| HTTP(S) Load Balancer | $18 | 8% | **High** — Cloud Run includes HTTPS free |
| Static IP (reserved) | $7.30 | 3% | **Medium** — unnecessary with Cloud Run |
| Persistent Disks (17Gi SSD) | $1.36 | 1% | **Low** — small and cheap |
| Cloud Storage (~5GB) | $0.10 | <1% | None — already optimized |
| BigQuery (low query volume) | $0-5 | 0-2% | None |
| Managed Certificate | $0 | 0% | None |
| **Total** | **$149-201** | — | — |

> **Note**: Actual costs may be higher ($200-250/mo) depending on node count, network egress, and BigQuery usage. The GKE cluster fee alone ($73/mo) represents 34%+ of costs and is entirely eliminated by Cloud Run.

**Waste analysis**:
1. **GKE cluster fee ($73/mo)**: 34% of costs for a control plane that adds no value for this workload size.
2. **Always-on compute ($49-97/mo)**: No traffic-based scaling. Paying for 3 CPU cores and 10Gi RAM 24/7.
3. **HTTP(S) LB ($18/mo)**: Cloud Run provides HTTPS with custom domains at no extra cost.
4. **Over-provisioned resources**: Backend and MongoDB each get 4Gi memory limit; actual usage likely 512Mi-1Gi.
5. **Redis ($0 compute, but operational cost)**: Uses an outdated image (5.0.1, 2018), no resource limits, running only for 4 use cases that can be eliminated.

### 2.5 Security Concerns

| Issue | Severity | Details |
|-------|----------|---------|
| Secrets committed in base64 | **Critical** | `app-secrets.yaml` and `docker-credentials.yaml` contain credentials in plain base64 |
| CORS wide open | **High** | `origin: "*"` allows any domain |
| Unauthenticated endpoints | **Medium** | File download, preview, email fetch, Wiin webhook — no auth required |
| No rate limiting | **Medium** | No protection against API abuse |
| Password minimum 4 chars | **Medium** | Registration allows weak passwords (should be 8+) |
| JWT 30-day expiry | **Low** | Long-lived tokens increase risk window |
| Redis 5.0.1 (2018) | **Low** | No security patches since 2018 |
| reCAPTCHA key confusion | **Low** | Login uses SITE_KEY where SECRET_KEY is expected |

---

## 3. Feature Inventory

### 3.1 Backend: 16 MongoDB Models, 10 Controller Groups, ~80 API Endpoints

#### Models by Domain

| Domain | Models | Key Fields | Relationships | Complexity |
|--------|--------|------------|---------------|------------|
| **Auth & Users** | User, Role | email, password (bcrypt), level, language, user_groups | Role→User, Role→Program, Role→Collect | Medium |
| **Programs** | Program | name, status, regions, budget, dates, guidelines | Virtual: managers, members, tasks, collects, reports | High |
| **Data Collection** | Collect, CollectItem, FieldContent, CollectDisplayTemplate | title (en/fr), filters (operator logic), matched_fields, paginated items | Collect→Program, CollectItem→Collect/User/Program, FieldContent→ModelField/CollectItem | **High** |
| **Data Models** | Model, ModelField | display_name (en/fr), data_type, input_method, validation_rules, field_options | ModelField→Model | Low |
| **Reports** | Report, ReportGraphicItem | type, grouping, aggregation, conditions | Report→Program, ReportGraphicItem→Report/Collect/ModelField | Medium |
| **Tasks** | Task, Notification | type, frequency, execution dates, users array | Task→Program/Collect/User, Notification→User/Program/UserGroup | Medium |
| **Attribution** | AttributionRule | permission (READ/WRITE), conditions (field+operator+value) | AttributionRule→Collect/UserGroup/ModelField | Low |
| **User Groups** | UserGroup | name (en/fr), role, hierarchical (parent_id self-ref) | UserGroup→Program, self-referencing tree | Medium |
| **External** | WiinItem | wiin_id, data array, sync status | Standalone (webhook staging) | Low |

#### API Endpoints by Controller

| Controller | Endpoints | Key Operations | Auth Level |
|------------|-----------|----------------|------------|
| **Auth** | 14 | Login (email/Google OAuth), register, invite, RBAC, password reset | Mixed (public + authenticated + superAdmin) |
| **Program** | 30 | Full CRUD, members, invitations, milestones, collects, import (CSV/Excel/Wiin/Google Sheets), export records | programManager+ |
| **Model** | 11 | CRUD for data model schemas and fields | admin |
| **Report** | 6 | Create/update/reorder/preview graphic items | authenticated |
| **Task** | 5 | CRUD for recurring tasks with reminders | programManager |
| **UserGroup** | 6 | CRUD with hierarchical groups | programManager |
| **AttributionRule** | 5 | CRUD for data-level access conditions | programManager |
| **Collect** | 2 | Cloud Storage upload, field content upload | superAdmin |
| **CollectItem** | 4 | Get by ID, next/previous navigation, download/preview files | Mixed (some public) |
| **Global** | 2 | Search, health check | authenticated / public |
| **Total** | **~85** | — | — |

#### Auth Architecture

| Aspect | Implementation |
|--------|---------------|
| **Token type** | JWT (jsonwebtoken 8.5.1) |
| **Login token expiry** | 30 days |
| **OAuth token expiry** | 24 hours |
| **Password hashing** | bcryptjs |
| **Role levels** | SUPER_ADMIN, PROGRAM_MANAGER, COLLECT_SINGLE_CONTRIBUTOR, COLLECT_BULK_CONTRIBUTOR |
| **Role caching** | Redis with 600s TTL per user |
| **Data-level access** | AttributionRules with conditions (field_id + operator + value) → UserGroups |
| **reCAPTCHA** | Server-side verification on email/password login |

### 3.2 Bull Queues (4, Redis-backed)

| Queue | Trigger | Processing Logic | Completion Action |
|-------|---------|-----------------|-------------------|
| `importCollectContentQueue` | CSV/Excel/Wiin/Google Sheets upload | Parse rows, match fields to model, validate, upsert by primary key or insert. Store invalid items. | Triggers `recomputeReportGraphicsQueue`. Cleans up WiinItems if Wiin source. |
| `recomputeReportGraphicsQueue` | After import completion, on login | Load program's default report, fetch all graphic items, apply attribution rules, run MongoDB aggregation (COUNT/SUM/AVG/PERCENTAGE) in 500-doc batches. | Cache results in Redis (1hr TTL). |
| `recomputeCollectOptionsQueue` | On user auth (Redis cache miss) | For each user role, aggregate distinct field values across collect items. | Cache field options per user in Redis (1hr TTL). |
| `syncRecordsWithBigQueryQueue` | Manual / post-import | Export unsynced CollectItems to CSV, load to BigQuery (WRITE_TRUNCATE), mark items synced. | Uses model's `big_query_table_name`. |

### 3.3 Cron Job

| Schedule | Logic |
|----------|-------|
| `CRON_EXECUTION_TIME` (production: `"0 0 */3 * *"` = every 3 days) | Scan active tasks. For each task user: send notification day before, day of, and day after execution date. Calculate next execution date (weekly×frequency or monthly×frequency). Mark inactive when end_date passed. Sends email + Slack + in-app notifications in en/fr. |

### 3.4 Integrations

| Integration | Package | Usage |
|-------------|---------|-------|
| **Google BigQuery** | @google-cloud/bigquery 6.0.2 | Sync CollectItems to dataset `t4su` in project `digital-africa-rainbow`. WRITE_TRUNCATE load from CSV. |
| **Google Cloud Storage** | @google-cloud/storage 6.5.2 | File uploads (private + public buckets), signed URL generation (1hr expiry) |
| **Google OAuth 2.0** | google-auth-library 8.5.2 | OAuth login. Verifies ID tokens, auto-creates users from invitations. |
| **Google Drive** | googleapis 105.0.0 | Import spreadsheets as data source for collects |
| **Sentry** | @sentry/node 7.10.0 | Error tracking + performance tracing |
| **Slack** | @slack/bolt 3.12.1 | Channel notifications for: new program, new collect, data imports, webhook events, task reminders |
| **Nodemailer** | email-templates 10.0.1 + nodemailer 6.7.8 | 12 Pug email templates (6 FR + 6 EN): invitation, forgot password, program/collect/task invites, end task |
| **reCAPTCHA v3** | node-fetch | Server-side verification on login |

### 3.5 Frontend: Nuxt 2 / Vue 2 / Vuetify

#### Stack

| Layer | Package | Version | Estimated Size |
|-------|---------|---------|---------------|
| Framework | Vue 2 | 2.7.10 | ~65KB |
| SSR | Nuxt 2 | 2.15.8 | ~50KB |
| UI Library | Vuetify | 2.6.1 | ~150KB |
| State | Vuex | (built-in) | ~12KB |
| i18n | @nuxtjs/i18n | 7.3 | ~30KB |
| HTTP | @nuxtjs/axios | — | ~15KB |
| Forms | vee-validate 4 + Vuelidate 2 | — | ~32KB |
| Charts | chart.js + vue-chartjs | — | ~60KB |
| **Total estimated** | — | — | **~414KB** |

#### Pages by Area

| Area | Pages | Key Features | Migration Effort |
|------|-------|-------------|------------------|
| Auth (login, register, forgot password) | 4 | OAuth, reCAPTCHA, form validation | Low |
| Dashboard (home, program dashboard) | 3 | Charts, summary cards | Medium |
| Programs (about, settings, members, activity) | 6 | CRUD, role management, file upload | Medium |
| Collects (list, detail, import, matching, records) | 8 | Data tables, CSV import, field matching, pagination | **High** |
| Reports (graphics, preview) | 2 | Chart.js visualizations, drag-and-drop reorder | Medium |
| Tasks/Reminders | 2 | Recurring task scheduling | Low |
| Admin (models, users, roles) | 5 | Model schema editor, user management | Medium |
| Legal/static | 3 | Privacy, terms, cookies | Trivial |
| Search | 1 | Global search | Low |
| Other (user groups, attribution rules) | 5+ | Hierarchical groups, rule builder | Low |
| **Total** | **~49** | — | — |

#### Vuetify Component Usage (Top 18 by Frequency)

| Vuetify Component | Approximate Uses | shadcn/ui Equivalent |
|-------------------|-----------------|---------------------|
| `v-col` / `v-row` | 176 | Tailwind `flex` / `grid` |
| `v-icon` (mdi-*) | 88 | `lucide-react` icons |
| `v-text-field` | 54 | `<Input>` |
| `v-select` | 52 | `<Select>` |
| `v-card` | 32 | `<Card>` |
| `v-dialog` | 26 | `<Dialog>` |
| `v-list-item` | 22 | Custom list components |
| `v-textarea` | 20 | `<Textarea>` |
| `v-form` | 18 | react-hook-form `<Form>` |
| `v-checkbox` | 18 | `<Checkbox>` |
| `v-btn` | 18 | `<Button>` |
| `v-chip` | 14 | `<Badge>` |
| `v-stepper` | 13 | Custom stepper (or Radix) |
| `v-menu` | 13 | `<DropdownMenu>` |
| `v-combobox` | 10 | `<Combobox>` |
| `v-alert` | 10 | `<Alert>` |
| `v-data-table` | 6 | `<DataTable>` (TanStack Table) |
| `v-date-picker` | 6 | `<DatePicker>` (date-fns) |

Additional Vuetify components in use: `v-snackbar`, `v-tabs`, `v-expansion-panel`, `v-badge`, `v-avatar`, `v-tooltip`, `v-divider`, `v-spacer`, `v-progress-linear`, `v-progress-circular`, `v-autocomplete`, `v-switch`, `v-radio`, `v-slider`, `v-file-input`, `v-navigation-drawer`, `v-app-bar`, `v-toolbar`, `v-footer`, `v-container`, `v-sheet`, `v-simple-table`, `v-treeview`, `v-timeline`, `v-breadcrumbs`, `v-pagination`, `v-overlay`.

#### Vuex Store Modules (8)

| Module | State Fields | Key Actions |
|--------|-------------|-------------|
| `auth` | user, token, roles | login, logout, register, getCurrentUser |
| `program` | programs, currentProgram | fetchPrograms, createProgram, updateProgram |
| `collect` | collects, currentCollect, collectItems | fetchCollects, importData, fetchItems |
| `model` | models, modelFields | fetchModels, createField, updateField |
| `report` | reports, graphicItems | fetchReport, createGraphic, reorder |
| `task` | tasks | fetchTasks, createTask, updateTask |
| `notification` | notifications | fetchNotifications, markDone |
| `userGroup` | userGroups | fetchGroups, createGroup |

#### i18n

- **Languages**: English (`en`), French (`fr`)
- **Key count**: 300+ translation keys
- **Coverage**: Full app localization including form labels, error messages, navigation, email templates

---

## 4. Refactoring Opportunities

High-value optimizations to apply during migration:

| Opportunity | Current Waste | Proposed Change | Monthly Savings |
|-------------|---------------|-----------------|----------------|
| **Eliminate GKE cluster** | $73/mo management fee, always-on nodes | Cloud Run serverless (scale-to-zero) | $73+ |
| **Eliminate Redis entirely** | Always-on StatefulSet for 4 use cases | JWT sessions (already used), Cloud Tasks (queues), in-memory TTL cache (reports), on-demand recompute (options) | $30-50 |
| **Managed database** | Self-hosted MongoDB on PVC (no backup, no HA) | Firestore native mode (free tier: 1GB storage, 50K reads/day) | $50-80 |
| **Eliminate HTTP(S) LB** | Dedicated load balancer + static IP | Cloud Run built-in HTTPS with custom domain | $25 |
| **Consolidate file uploads** | PVC (5Gi) + Cloud Storage (partial) | Cloud Storage only (already has 3 buckets) | Simpler ops |
| **Cron → Cloud Scheduler** | In-process node-cron | Cloud Scheduler hitting worker HTTP endpoint (3 free jobs/mo) | Cleaner separation |
| **Bundle size reduction** | Vuetify ~150KB + Axios ~15KB + vue-i18n ~30KB | shadcn/ui ~20KB + native fetch + next-intl ~4KB | ~195KB savings |
| **Dual validation libraries** | Both vee-validate AND Vuelidate loaded | Single: react-hook-form + zod | ~20KB savings |
| **Dead code: Swagger** | swagger-jsdoc + swagger-ui-express bundled | Remove or replace with lightweight OpenAPI spec | ~50KB savings |
| **Security fixes** | CORS `*`, weak passwords, long JWT, base64 secrets | Proper CORS, 8+ char passwords, shorter JWT, Secret Manager | Risk reduction |

**Total estimated savings**: $178-228/mo → **90-95% cost reduction**.

---

## 5. Migration Architecture

### 5.1 Target: 3 Cloud Run Services

Per UI_platform `backend-standards.md` web/api/worker pattern:

| Service | Runtime | Purpose | Memory | CPU | Scale | Source |
|---------|---------|---------|--------|-----|-------|--------|
| `ui-platform-rainbow` | Next.js 15 (standalone) | SSR + BFF | 512Mi | 1 | 0→5 | `apps/rainbow/` in UI_platform monorepo |
| `rainbow-api` | Express.js (migrated) | REST API | 512Mi | 1 | 0→10 | Separate repo or `apps/rainbow-api/` |
| `rainbow-worker` | Express.js (minimal) | Async jobs + cron | 1Gi | 1 | 0→5 | Separate repo or `apps/rainbow-worker/` |

### 5.2 Component Replacement Map

| Current | Target | Monthly Cost |
|---------|--------|-------------|
| GKE cluster ($73/mo) | Cloud Run (serverless) | $0 |
| Compute (e2-standard-2, $49-97/mo) | Cloud Run auto-scaling | $0-10 |
| MongoDB StatefulSet (self-hosted) | Firestore (native mode) | $0 (free tier) |
| Redis StatefulSet | **Eliminated entirely** | $0 |
| Redis → Bull queues (4) | Cloud Tasks | $0 (1M free/mo) |
| Redis → Report cache (1hr TTL) | In-memory Map with TTL (per instance) | $0 |
| Redis → Collect options cache | Recompute on demand or Cloud Tasks | $0 |
| Redis → Auth role cache (600s TTL) | Already JWT-based (JWT contains level; roles from Firestore with in-memory cache) | $0 |
| Cron (node-cron in-process) | Cloud Scheduler → worker HTTP endpoint | $0 (3 free jobs) |
| PVC uploads (5Gi) | Cloud Storage (already 3 buckets configured) | $0.10/mo |
| HTTP(S) LB + static IP ($25/mo) | Cloud Run built-in HTTPS | $0 |
| PM2 cluster mode | Cloud Run auto-scaling (concurrency-based) | $0 |
| Managed Certificate | Cloud Run managed cert | $0 |

### 5.3 Frontend Integration into UI_Platform Monorepo

| Aspect | Details |
|--------|---------|
| **App location** | `apps/rainbow/` (alongside `web`, `ai4su`, `designOS_sandbox`) |
| **Package name** | `@ui-platform/rainbow` |
| **Cloud Run service** | `ui-platform-rainbow` |
| **GCR image** | `gcr.io/digital-africa-ai4su/ui-platform-rainbow` |
| **Shared packages** | `@ui-platform/ui`, `@ui-platform/config`, `@ui-platform/types`, `@ui-platform/utils` |
| **Deployment** | `packages/infra/scripts/deploy.sh rainbow` |
| **CI/CD** | Existing `cloudbuild-cicd.yaml` auto-detects Next.js apps via `_APP_NAME` substitution |
| **Trigger** | `packages/infra/triggers/rainbow.yaml` (fires on `apps/rainbow/**` changes) |
| **Dockerfile** | Existing `packages/infra/Dockerfile.next` (no changes needed) |
| **Next.js config** | Must include `output: "standalone"` + `outputFileTracingRoot` pointing to workspace root |
| **Region** | `europe-west1` |

---

## 6. Data Migration: MongoDB → Firestore

### 6.1 Collection Migration Map (16 Collections)

| Collection | Documents (est.) | Relationships | Query Complexity | Migration Risk |
|------------|-----------------|---------------|-----------------|----------------|
| **User** | Low (10s) | → Role (virtual), → UserGroup | Simple lookups | Low |
| **Program** | Low (10s) | → Role, → Collect, → Task, → Report (all virtual) | Aggregation (member/task/collect counts) | Medium |
| **Collect** | Medium (100s) | → Program, → ModelField, → CollectItem (virtual) | Filter operators (EQUAL/IN/NOT_IN/NOT_EQUAL) | Medium |
| **CollectItem** | **High (1000s+)** | → Collect, → User, → Program, → FieldContent (virtual) | **Paginated queries** (mongoose-paginate-v2), field-level filtering | **High** |
| **FieldContent** | **High (1000s+)** | → ModelField, → CollectItem, → Collect, → Program | Bulk reads per collect item | Medium |
| **Model** | Low (10s) | → ModelField (virtual) | Simple CRUD | Low |
| **ModelField** | Medium (100s) | → Model | Simple CRUD | Low |
| **Role** | Medium (100s) | → User, → Program, → Collect | Multi-field lookups (user+program+role) | Medium |
| **Task** | Low (10s) | → Program, → Collect, → User (array) | Date-range queries for cron | Medium |
| **Notification** | Medium (100s) | → User, → Program, → UserGroup | Filtered by type and date | Low |
| **Report** | Low (10s) | → Program, → ReportGraphicItem (virtual) | Simple lookups | Low |
| **ReportGraphicItem** | Low (10s) | → Program, → Report, → ModelField (in conditions) | Condition-based aggregation | Medium |
| **CollectDisplayTemplate** | Low (10s) | → Collect, → User | Simple CRUD | Low |
| **AttributionRule** | Low (10s) | → Collect, → UserGroup, → ModelField (in conditions) | Condition matching | Low |
| **UserGroup** | Low (10s) | → Program, self-reference (parent_id) | Hierarchical queries | Medium |
| **WiinItem** | Variable | Standalone | Simple CRUD (staging table) | Low |

### 6.2 Key Firestore Challenges

| Challenge | MongoDB Pattern | Firestore Approach |
|-----------|----------------|-------------------|
| **CollectItem pagination** | `mongoose-paginate-v2` (offset-based) | Cursor-based pagination using `startAfter()` / `endBefore()`. UX may change — test thoroughly. |
| **Filter operators** | `EQUAL`, `IN`, `NOT_IN`, `NOT_EQUAL` in Collect filter schema | Maps well to Firestore `where()` clauses: `==`, `in`, `not-in`, `!=`. Composite indexes required for multi-field filters. |
| **Regex search** | `$regex` for text matching (if used) | No `$regex` support. Use Firestore full-text search alternatives (Algolia, Typesense) or restructure to prefix matching with `>=` / `<=`. |
| **Virtual fields** | Mongoose `populate()` for related docs | Denormalize frequently-accessed counts into parent documents, or use subcollections for 1:N relationships. |
| **Aggregation** | MongoDB aggregation pipeline for report graphics (COUNT/SUM/AVG/PERCENTAGE) | Pre-compute aggregations in Cloud Tasks worker. Store results in Firestore. No server-side aggregation pipeline. |
| **ObjectId references** | `ObjectId` for document references | String document IDs. Generate during ETL or use Firestore auto-IDs with a mapping table. |
| **Hierarchical data** | UserGroup self-reference (`parent_id`) | Firestore supports self-referencing. Consider `materialized path` pattern for deep hierarchy queries. |
| **Embedded documents** | CollectItem has embedded `fieldContentSchema` | Firestore supports maps and arrays natively. Embedded data migrates cleanly. |
| **Bulk operations** | Mongoose `insertMany`, `updateMany` | Firestore batch writes (500 docs/batch max). Larger operations need batched iteration. |

### 6.3 Firestore Collection Design

```
firestore/
├── users/                         # User documents
├── programs/                      # Program documents
│   └── {programId}/
│       ├── roles/                 # Subcollection: roles for this program
│       ├── tasks/                 # Subcollection: tasks for this program
│       └── reports/               # Subcollection: reports for this program
├── collects/                      # Collect documents (top-level for cross-program queries)
│   └── {collectId}/
│       └── items/                 # Subcollection: collect items (paginated)
├── models/                        # Data model schemas
│   └── {modelId}/
│       └── fields/                # Subcollection: model fields
├── notifications/                 # Notification documents
├── userGroups/                    # User group documents
├── attributionRules/              # Attribution rule documents
├── collectDisplayTemplates/       # Display templates
└── wiinItems/                     # Wiin staging items
```

### 6.4 Composite Index Requirements

| Collection | Fields | Query Pattern |
|------------|--------|---------------|
| `roles` | `user_id` + `program_id` + `is_active` | Auth middleware: lookup user roles per program |
| `collects` | `program_id` + `created_at` | Program page: list collects |
| `items` (subcollection) | `collect_id` + `imported_by` + `created_at` | Collect detail: paginated items with filters |
| `notifications` | `user_id` + `type` + `created_at` | User notifications list |
| `tasks` | `program_id` + `status` + `executionDate` | Cron: find active tasks due |
| `attributionRules` | `collect_id` + `user_group_id` | Attribution lookup per collect |

### 6.5 ETL Approach

1. **Export**: `mongodump --archive` from live MongoDB (or use K8s port-forward to access)
2. **Transform**: Node.js script that:
   - Reads BSON documents
   - Converts `ObjectId` → string IDs
   - Resolves virtual references → denormalized fields (e.g., member counts)
   - Maps embedded schemas to Firestore-compatible structures
   - Validates data integrity (no orphaned references)
3. **Load**: Firestore batch writes (500 docs/batch)
4. **Verify**: Count documents per collection, spot-check relationships

**Safety**: Keep MongoDB read-only during migration. Run dry-run ETL first with count verification.

---

## 7. Frontend Migration: Nuxt 2 → Next.js 15

### 7.1 Stack Transition

| Layer | Current (Nuxt 2) | Target (Next.js 15) | Bundle Savings |
|-------|-------------------|---------------------|----------------|
| Framework | Vue 2 (~65KB) | React 18 (~42KB) | 23KB |
| SSR | Nuxt 2 (~50KB) | Next.js 15 (~40KB) | 10KB |
| Components | Vuetify 2.6.1 — 47 unique (~150KB) | shadcn/ui (~20KB) | 130KB |
| State | Vuex — 8 modules (~12KB) | TanStack Query + Zustand (~14KB) | -2KB |
| i18n | @nuxtjs/i18n 7.3 — 300+ keys, en/fr (~30KB) | next-intl (~4KB) | 26KB |
| Forms | vee-validate 4 + Vuelidate 2 (~32KB) | react-hook-form + zod (~12KB) | 20KB |
| HTTP | @nuxtjs/axios (~15KB) | native fetch (0KB) | 15KB |
| Charts | chart.js + vue-chartjs (~60KB) | chart.js + react-chartjs-2 (~60KB) | 0KB |
| **Total** | **~414KB** | **~192KB** | **~222KB** |

### 7.2 Vuetify → shadcn/ui Component Mapping (Complete)

#### High-frequency Components (>10 uses)

| Vuetify | Uses | shadcn/ui Target | Notes |
|---------|------|-----------------|-------|
| `v-col` / `v-row` | 176 | Tailwind `flex` / `grid` | Direct CSS replacement |
| `v-icon` (mdi-*) | 88 | `lucide-react` | Icon name mapping required |
| `v-text-field` | 54 | `<Input>` | With `react-hook-form` integration |
| `v-select` | 52 | `<Select>` | |
| `v-card` / `v-card-*` | 32 | `<Card>` / `<CardHeader>` / `<CardContent>` | |
| `v-dialog` | 26 | `<Dialog>` | |
| `v-list-item` | 22 | Custom list with Tailwind | |
| `v-textarea` | 20 | `<Textarea>` | |
| `v-form` | 18 | react-hook-form `<Form>` | |
| `v-checkbox` | 18 | `<Checkbox>` | |
| `v-btn` | 18 | `<Button>` | Variant mapping: text→ghost, outlined→outline |
| `v-chip` | 14 | `<Badge>` | |
| `v-stepper` | 13 | Custom stepper or `@radix-ui/react-stepper` | No direct shadcn equivalent |
| `v-menu` | 13 | `<DropdownMenu>` | |
| `v-combobox` | 10 | `<Combobox>` | |
| `v-alert` | 10 | `<Alert>` | |

#### Medium-frequency Components (3-9 uses)

| Vuetify | shadcn/ui Target |
|---------|-----------------|
| `v-data-table` | `<DataTable>` (TanStack Table) |
| `v-date-picker` | `<DatePicker>` (date-fns) |
| `v-snackbar` | `<Toast>` (sonner) |
| `v-tabs` | `<Tabs>` |
| `v-expansion-panel` | `<Accordion>` |
| `v-avatar` | `<Avatar>` |
| `v-tooltip` | `<Tooltip>` |
| `v-autocomplete` | `<Combobox>` with search |
| `v-switch` | `<Switch>` |
| `v-file-input` | `<Input type="file">` |
| `v-pagination` | Custom pagination or `<Pagination>` |
| `v-progress-linear` | `<Progress>` |
| `v-progress-circular` | `<Spinner>` (custom) |
| `v-badge` | `<Badge>` |

#### Layout Components

| Vuetify | Target |
|---------|--------|
| `v-app-bar` | Next.js `<header>` with Tailwind |
| `v-navigation-drawer` | `<Sheet>` (side) or custom sidebar |
| `v-toolbar` | Tailwind flex layout |
| `v-footer` | Next.js `<footer>` with Tailwind |
| `v-container` | Tailwind `max-w-*` container |
| `v-divider` | `<Separator>` |
| `v-spacer` | Tailwind `flex-1` |
| `v-sheet` | `<div>` with Tailwind |
| `v-overlay` | `<Dialog>` overlay or custom |

#### Remaining Components

| Vuetify | Target |
|---------|--------|
| `v-radio` / `v-radio-group` | `<RadioGroup>` |
| `v-slider` | `<Slider>` |
| `v-treeview` | Custom tree component |
| `v-timeline` | Custom timeline with Tailwind |
| `v-breadcrumbs` | `<Breadcrumb>` |
| `v-simple-table` | `<Table>` |

### 7.3 Page Migration Order

| Phase | Pages | Count | Rationale |
|-------|-------|-------|-----------|
| **1** | Login, Register, Forgot Password, Legal (privacy, terms, cookies) | 6 | Standalone, no complex state, establishes auth flow |
| **2** | Home, Dashboard, Search | 4 | Read-only, establishes layout shell and navigation |
| **3** | Program dashboard, members, settings, about, activity | 6 | Core navigation, RBAC integration |
| **4** | Collects list, detail, records CRUD | 8 | **Highest complexity** — core feature, data tables, pagination |
| **5** | Import (CSV/Excel/Wiin/Google Sheets), field matching | 3 | File handling + async jobs (Cloud Tasks) |
| **6** | Reports, attribution rules | 4 | Chart.js visualizations + rules engine |
| **7** | Admin (models, users, roles) | 5 | Admin-only, lower priority |
| **8** | Remaining (user groups, activity log, reminders) | 5+ | Final cleanup |

### 7.4 State Management Migration

| Vuex Module | Target | Approach |
|-------------|--------|----------|
| `auth` (user, token, roles) | Zustand `useAuthStore` | Client-side store for auth state. JWT in httpOnly cookie. |
| `program` (programs, currentProgram) | TanStack Query | Server state — cache with automatic revalidation |
| `collect` (collects, items) | TanStack Query | Server state with pagination support |
| `model` (models, fields) | TanStack Query | Server state — rarely changes |
| `report` (reports, graphics) | TanStack Query | Server state with optimistic updates for reorder |
| `task` (tasks) | TanStack Query | Server state |
| `notification` (notifications) | TanStack Query + Zustand | TQ for data, Zustand for unread count badge |
| `userGroup` (groups) | TanStack Query | Server state |

---

## 8. Cost Projection

### 8.1 Target Monthly Costs

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| `ui-platform-rainbow` (Cloud Run) | $0-3 | Next.js SSR, scale-to-zero, ~100 req/day |
| `rainbow-api` (Cloud Run) | $0-5 | Express API, scale-to-zero |
| `rainbow-worker` (Cloud Run) | $0-2 | Async jobs, scales down between imports |
| Firestore | $0 | Free tier: 1GB storage, 50K reads/day, 20K writes/day |
| Cloud Storage (~5GB) | $0.10 | Standard storage + minimal egress |
| Cloud Tasks | $0 | Free tier: 1M tasks/month |
| Cloud Scheduler | $0 | Free tier: 3 jobs/month |
| BigQuery (queries) | $0-5 | First 1TB/month free; low query volume |
| Secret Manager | $0 | Free tier: 10K access operations/month |
| Artifact Registry | $0-1 | Container image storage |
| **Total** | **$0-16/mo** | |

### 8.2 Scaling Projections

| Traffic Level | Cloud Run Cost | Firestore Cost | Total |
|---------------|---------------|----------------|-------|
| **Current** (~100 req/day) | $0-5 | $0 | $0-16 |
| **2x** (~200 req/day) | $1-8 | $0 | $1-20 |
| **10x** (~1000 req/day) | $5-20 | $0-5 | $5-35 |
| **50x** (~5000 req/day) | $20-60 | $5-15 | $25-85 |

Even at **50x current traffic**, the migrated architecture costs less than the current idle baseline.

### 8.3 Cost Estimation Methodology

- **Cloud Run**: Based on [Cloud Run pricing](https://cloud.google.com/run/pricing) — $0.00002400/vCPU-second, $0.00000250/GiB-second. With scale-to-zero and ~100 req/day averaging 200ms each, monthly compute is negligible.
- **Firestore**: Based on [Firestore pricing](https://cloud.google.com/firestore/pricing) — free tier covers 50K reads/day and 20K writes/day. Rainbow's estimated daily volume: ~500 reads, ~100 writes.
- **GKE current cost**: Based on [GKE pricing](https://cloud.google.com/kubernetes-engine/pricing) — $0.10/hr cluster fee + e2-standard-2 at $0.067116/hr.

---

## 9. Migration Phases

| Phase | Scope | Duration | Risk | Dependencies |
|-------|-------|----------|------|-------------|
| **0: Preparation** | Audit live MongoDB (document counts, sizes), enable GCP APIs (Firestore, Cloud Tasks, Cloud Scheduler, Secret Manager), set up IAM, create Firestore database in `digital-africa-rainbow` project | 1-2 days | Low | GCP console access |
| **1: Data Layer** | Firestore collection setup, write ETL script (mongodump → transform → batch write), create composite indexes, set up Cloud Tasks queues, configure Cloud Scheduler for cron | 3-5 days | Medium | Phase 0 |
| **2: Backend API** | Port Express routes to use Firestore SDK instead of Mongoose, replace Bull queues with Cloud Tasks dispatch, replace Redis cache with in-memory Map (TTL), update auth middleware, deploy `rainbow-api` + `rainbow-worker` to Cloud Run | 5-7 days | Medium | Phase 1 |
| **3: Frontend Shell** | Create `apps/rainbow/` in UI_platform monorepo, set up Next.js 15 with standalone output, implement auth flow (login, register, OAuth), layout (app bar, sidebar, footer), navigation, i18n (en/fr) | 3-5 days | Low | Phase 2 (API must be running) |
| **4: Frontend Features** | Route-by-route migration following phase order: collects (highest priority), programs, reports, admin, tasks, user groups, attribution rules | 2-3 weeks | Medium | Phase 3 |
| **5: CI/CD** | Create `packages/infra/triggers/rainbow.yaml`, configure Secret Manager secrets, add smoke tests, verify Cloud Build auto-detection | 1-2 days | Low | Phase 4 |
| **6: Cutover** | DNS switch (`rainbow.digital-africa.co` → Cloud Run), parallel running period (1-2 days), verify all features, decommission GKE workloads (delete StatefulSets, PVCs, Ingress, cluster) | 1-2 days | **High** | Phase 5 |

**Total estimated timeline: 4-8 weeks.**

---

## 10. Risk Register

| # | Risk | Severity | Likelihood | Mitigation |
|---|------|----------|------------|------------|
| 1 | **Data loss during MongoDB → Firestore ETL** | High | Low | Dry-run ETL with count verification. Keep MongoDB read-only during migration window. Backup with `mongodump --archive` before starting. |
| 2 | **Firestore query limits vs MongoDB aggregation** | Medium | Medium | Pre-audit all query patterns in controllers. Denormalize counts and aggregations into parent documents. Pre-compute report graphics in worker. |
| 3 | **Cold start latency (Cloud Run)** | Medium | Medium | Acceptable for low-traffic app (~2-5s cold start). If needed: set `minInstances=1` for API during business hours ($10-15/mo premium). |
| 4 | **CollectItem pagination behavior change** | Medium | High | Cursor-based pagination may change UX (no "jump to page N"). Test thoroughly. Consider maintaining offset-based by storing page cursors server-side. |
| 5 | **Auth token compatibility during parallel run** | Medium | Low | Both systems share JWT secret. Tokens signed by old backend work with new API. No user re-authentication needed. |
| 6 | **Vuetify → shadcn/ui visual regression** | Low | High | Component-by-component visual review. Use existing Vuetify layout as reference. Design QA pass per phase. |
| 7 | **BigQuery sync timing change** | Low | Low | Cloud Tasks provides same async behavior as Bull queue. Sync triggers remain identical. |
| 8 | **Firestore transaction limits** | Medium | Low | Firestore limits: 500 writes/transaction, 10 MiB/transaction. Import queue handles batching already. |
| 9 | **i18n key coverage gap** | Low | Medium | Migrate all 300+ keys. Run automated comparison between old and new key sets. |
| 10 | **GKE decommission data loss** | High | Low | Verify all PVC data migrated (uploads → Cloud Storage, MongoDB → Firestore) before deleting any K8s resources. Document rollback procedure. |

---

## 11. Environment Variable Mapping

### 11.1 Current Inventory (32 Variables)

| # | Variable | Current Value / Source | Migration Target |
|---|----------|----------------------|-----------------|
| | **Server** | | |
| 1 | `BASE_URL` | `https://rainbow.digital-africa.co` | Cloud Run env var |
| 2 | `ASSET_URL` | App URL | Cloud Run env var |
| 3 | `PORT` | `5001` | Cloud Run default (`8080`) |
| | **MongoDB** | | |
| 4 | `MONGO_DB_HOST` | `mongo.default.svc.cluster.local` | **Remove** — replaced by Firestore project config |
| 5 | `MONGO_DB_PORT` | `27017` | **Remove** |
| 6 | `MONGO_DB_NAME` | `rainbow` | **Remove** |
| 7 | `MONGO_DB_USER_NAME` | K8s Secret | **Remove** |
| 8 | `MONGO_DB_PASSWORD` | K8s Secret | **Remove** |
| | **Redis** | | |
| 9 | `REDIS_HOST` | `redis.default.svc.cluster.local` | **Remove** — Redis eliminated |
| 10 | `REDIS_PORT` | `6379` | **Remove** |
| | **Mail (SMTP)** | | |
| 11 | `MAIL_HOST` | `smtp.gmail.com` | Cloud Run env var |
| 12 | `MAIL_PORT` | `587` | Cloud Run env var |
| 13 | `MAIL_USERNAME` | Gmail account | Secret Manager |
| 14 | `MAIL_PASSWORD` | Gmail app password | Secret Manager |
| 15 | `MAIL_ENCRYPTION` | `tls` | Cloud Run env var |
| 16 | `MAIL_FROM_ADDRESS` | Sender email | Cloud Run env var |
| 17 | `MAIL_MAILER` | `smtp` | Cloud Run env var |
| | **Google OAuth** | | |
| 18 | `GOOGLE_OAUTH_REDIRECT_URL` | OAuth callback URL | Cloud Run env var |
| 19 | `GOOGLE_OAUTH_CLIENT_ID` | OAuth client ID | Secret Manager |
| 20 | `GOOGLE_OAUTH_CLIENT_SECRET` | OAuth client secret | Secret Manager |
| | **Slack** | | |
| 21 | `SLACK_TOKEN` | Bot token | Secret Manager |
| 22 | `SLACK_SINGING_SECRET` | Signing secret | Secret Manager |
| 23 | `SLACK_CHANNEL` | Channel ID | Cloud Run env var |
| | **JWT** | | |
| 24 | `JWS_SECRET_KEY` | JWT signing key | Secret Manager |
| | **Cron** | | |
| 25 | `CRON_EXECUTION_TIME` | `0 0 */3 * *` | Cloud Scheduler schedule (not env var) |
| | **Observability** | | |
| 26 | `SENTRY_DSN` | Sentry project DSN | Cloud Run env var |
| 27 | `SENTRY_TRACES_SAMPLE_RATE` | Sample rate | Cloud Run env var |
| 28 | `SENTRY_TRANSACTION_OP` | Transaction operation | Cloud Run env var |
| 29 | `SENTRY_TRANSACTION_NAME` | Transaction name | Cloud Run env var |
| | **Google Cloud** | | |
| 30 | `GOOGLE_CLOUD_PROJECT_ID` | `digital-africa-rainbow` | Automatic on Cloud Run (metadata server) |
| 31 | `CLOUD_STORAGE_BUCKET_NAME` | Storage bucket name | Cloud Run env var |
| 32 | `CLOUD_STORAGE_UPLOAD_BUCKET_NAME` | `rainbow-uploads` | Cloud Run env var |
| 33 | `CLOUD_STORAGE_UPLOAD_PUBLIC_BUCKET_NAME` | `rainbow-upload-public` | Cloud Run env var |
| 34 | `CLOUD_STORAGE_ACCOUNT_SERVICE_FILE` | `credentials/service-account.json` | **Remove** — use IAM service account on Cloud Run |
| | **reCAPTCHA** | | |
| 35 | `GOOGLE_RECAPTCHA_SITE_VERIFY_URL` | Google verify URL | Cloud Run env var |
| 36 | `GOOGLE_RECAPTCHA_SITE_KEY` | reCAPTCHA site key | Cloud Run env var |

### 11.2 Migration Summary

| Category | Count | Approach |
|----------|-------|----------|
| **Remove entirely** | 7 | MongoDB (5) + Redis (2) — services eliminated |
| **Secret Manager** | 7 | Passwords, tokens, keys, secrets |
| **Cloud Run env vars** | 18 | Non-sensitive configuration |
| **Remove (implicit)** | 2 | `GOOGLE_CLOUD_PROJECT_ID` (auto-detected), `CLOUD_STORAGE_ACCOUNT_SERVICE_FILE` (IAM replaces file) |
| **Cloud Scheduler** | 1 | `CRON_EXECUTION_TIME` becomes scheduler config |
| **Cloud Run default** | 1 | `PORT` defaults to 8080 on Cloud Run |
| **Total** | **36** | — |

---

## 12. Appendices

### Appendix A: Full MongoDB Schema Summary

<details>
<summary>Click to expand — 16 models with all fields</summary>

#### User
```
first_name: String
last_name: String
title: String
organisation: String
email: String (required, unique)
password: String (select: false)
is_active: Boolean (default: true)
level: String
language: String
hasAgreed: Boolean (default: true)
agreementDate: Date
user_groups: [ObjectId → UserGroup]
timestamps: true
Virtuals: roles (→ Role), attributionRules (→ AttributionRule)
```

#### Program
```
name: String (required)
description: String
description_fr: String
status: String (default: "ON_GOING")
website: String
estimated_budget: String
start_at: Date
end_at: Date
regions: [String]
logo: String
reporting_guidelines: String
communication_guidelines: String
contract_and_appendices: String
invoices: String
deleted_at: Date (soft delete)
timestamps: true
Virtuals: managersCount, membersCount, tasksCount, defaultReport, collectsCount, collects
```

#### Collect
```
title: String (required)
title_fr: String
description: String
description_fr: String
main_source: String
main_source_template: String
incoming_hook_id: String
program_id: ObjectId → Program (required)
wiin_secret_key: String
csv_matching_template: Mixed
wiin_matching_template: Mixed
matched_fields: [ObjectId → ModelField]
filters: [{
  field_id: ObjectId → ModelField
  operator: String (EQUAL/IN/NOT_IN/NOT_EQUAL)
  value: Mixed
}]
timestamps: true
Virtuals: items (→ CollectItem, count)
```

#### CollectItem
```
collect_id: ObjectId → Collect (required)
imported_by: ObjectId → User
program_id: ObjectId → Program (required)
is_synced_with_big_query: Boolean (default: false)
fields: [{
  variable_name: String
  value: Mixed
  type_hint: String
  display_name: String
  display_name_fr: String
  field_id: ObjectId
  collect_item_id: ObjectId
  collect_id: ObjectId
  program_id: ObjectId
}]
timestamps: true
Plugins: mongoose-paginate-v2
Virtuals: fieldContent (→ FieldContent), owner (→ User)
```

#### FieldContent
```
variable_name: String
value: Mixed
type_hint: String
display_name: String
display_name_fr: String
field_id: ObjectId → ModelField
collect_item_id: ObjectId → CollectItem
collect_id: ObjectId → Collect
program_id: ObjectId → Program
timestamps: true
```

#### Model
```
title: String (required)
description: String
icon: String
is_available: Boolean
big_query_table_name: String (default: "")
timestamps: true
Virtuals: modelFields (→ ModelField), modelFieldsCount
```

#### ModelField
```
display_name: String (required)
display_name_fr: String
help_text: String
help_text_fr: String
big_query_variable_name: String
variable_name: String (required)
data_type: String (required)
input_method: String (required)
is_available: Boolean
is_dynamic_options_allowed: Boolean (default: true)
is_bulk_update_allowed: Boolean (default: false)
is_inline_update_allowed: Boolean (default: false)
is_primary_key: Boolean
is_attribution_field: Boolean (default: false)
default_value: Mixed
order: Number
validation_rules: [String]
field_options: [String] (sorted getter)
model_id: ObjectId → Model (required)
created_by: ObjectId → User
timestamps: true
```

#### Role
```
role: String (required)
is_active: Boolean (default: true)
user_id: ObjectId → User (required)
program_id: ObjectId → Program (required)
collect_id: ObjectId → Collect
timestamps: true
Virtuals: users (→ User, count), collect (→ Collect)
```

#### Task
```
type: String
period: String
period_day: String
frequency: Number
title: String
title_fr: String
description: String
description_fr: String
status: String (default: "active")
program_id: ObjectId → Program (required)
collect_id: ObjectId → Collect
executionDate: Date
created_by: ObjectId → User
end_date: Date
last_execution_date: Date
invitation_sent: Boolean (default: false)
users: [ObjectId → User]
timestamps: true
```

#### Report
```
type: String
is_updating: Boolean (default: false)
program_id: ObjectId → Program (required)
timestamps: true
Virtuals: reportItems (→ ReportGraphicItem), reportItemsCount
```

#### ReportGraphicItem
```
title: String
title_fr: String
type: String
group_by: String
grouping_operator: String
indicator_symbol: String
indicator_target_value: Number
indicator_symbol_position: String
order: Number
size: String
report_id: ObjectId → Report (required)
collect_id: ObjectId → Collect
indicator: ObjectId → ModelField
conditions: [{
  field_id: ObjectId → ModelField
  operator: String
  value: Mixed
}]
timestamps: true
```

#### Notification
```
type: String
is_action_done: Boolean
to: String
created_at: Date
with_email: Boolean
role: String
expected_action: Boolean (default: true)
task_user_email: String
notification_data: {
  updated_rows: Number
  inserted_rows: Number
  exported_rows: Number
  filename: String
}
user_id: ObjectId → User
program_id: ObjectId → Program
user_group_id: ObjectId → UserGroup
collect_id: ObjectId → Collect
created_by: ObjectId → User
task_id: ObjectId → Task
timestamps: true
Virtuals: user (→ User), userGroup (→ UserGroup)
```

#### UserGroup
```
name: String (required)
name_fr: String
logo: String
description: String
description_fr: String
role: String
program_id: ObjectId → Program (required)
parent_id: ObjectId → UserGroup (self-reference)
is_parent: Boolean (default: false)
timestamps: true
Virtuals: attributionRules, userGroups (children), userGroupsCount, parent, program, usersCount
```

#### AttributionRule
```
collect_id: ObjectId → Collect (required)
user_group_id: ObjectId → UserGroup
permission: String (READ/WRITE)
attributionConditions: [{
  field_id: ObjectId → ModelField
  operator: String
  value: Mixed
}]
timestamps: true
Virtuals: user (→ User), collect (→ Collect)
```

#### CollectDisplayTemplate
```
matched_fields_to_display: Array
collect_id: ObjectId → Collect (required)
created_by: ObjectId → User
timestamps: true
```

#### WiinItem
```
wiin_id: String
program_name: String
data: Array
in_sync: Boolean
error_message: String
collect_id: ObjectId → Collect
timestamps: true
```

</details>

### Appendix B: Complete API Endpoint Inventory

<details>
<summary>Click to expand — ~85 endpoints grouped by controller</summary>

#### Auth Controller (14 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | POST | `/api/auth/login` | none | Login (email/password or Google token) |
| 2 | POST | `/api/auth/logout` | authenticated | Logout |
| 3 | POST | `/api/auth/reset_pwd_request` | none | Request password reset email |
| 4 | POST | `/api/auth/reset_pwd` | none | Reset password with token |
| 5 | POST | `/api/admin/auth/invite_user` | superAdmin | Bulk invite users |
| 6 | DELETE | `/api/admin/auth/delete-user-invitation/:id` | authenticated | Delete invitation |
| 7 | PUT | `/api/admin/auth/delete-user-group/:id` | superAdmin | Remove user role |
| 8 | PUT | `/api/admin/change_user_status` | superAdmin | Toggle user active/inactive |
| 9 | POST | `/api/invite_user/register` | none | Self-register from invitation |
| 10 | GET | `/api/admin/get_user_by` | authenticated | Lookup user |
| 11 | GET | `/api/auth/get_current_user` | authenticated | Get current user profile |
| 12 | PUT | `/api/auth/update_user_data` | authenticated | Update profile |
| 13 | GET | `/api/auth/verify_reset_pwd_email` | none | Verify reset token |
| 14 | GET | `/api/invite_user/fetch_email/:id` | none | Get invitation details |
| 15 | GET | `/api/auth/rainbow_invitations` | authenticated | List invitations |

#### Program Controller (30 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | GET | `/api/programs` | authenticated | List programs |
| 2 | GET | `/api/programs/:id` | authenticated | Get program details |
| 3 | POST | `/api/programs` | superAdmin | Create program (with logo upload) |
| 4 | PUT | `/api/programs/:id` | programManager | Update program |
| 5 | GET | `/api/programs/:id/milestones` | authenticated | Get program milestones |
| 6 | GET | `/api/programs/:id/members` | authenticated | List program members |
| 7 | POST | `/api/programs/:id/toggle_user` | programManager | Add/remove member |
| 8 | POST | `/api/programs/:id/invite_users` | programManager | Invite users to program |
| 9 | GET | `/api/programs/:id/invitations` | authenticated | List program invitations |
| 10 | GET | `/api/programs/:id/actions` | authenticated | Get program actions |
| 11 | PUT | `/api/programs/:id/actions/:actionId` | authenticated | Mark action done |
| 12 | GET | `/api/programs/:id/collects` | authenticated | List program collects |
| 13 | GET | `/api/programs/:id/collects/:collectId` | authenticated | Get collect details |
| 14 | POST | `/api/programs/:id/collects` | programManager | Create collect |
| 15 | PUT | `/api/programs/:id/collects/:collectId` | programManager | Update collect |
| 16 | GET | `/api/programs/:id/collects/:collectId/default_report` | authenticated | Get default report |
| 17 | GET | `/api/programs/:id/collects/:collectId/import_content` | authenticated | Get import status |
| 18 | POST | `/api/programs/:id/collects/:collectId/import_from_google` | programManager | Import from Google Sheets |
| 19 | POST | `/api/programs/:id/collects/:collectId/import_from_csv` | programManager | Import from CSV/Excel |
| 20 | GET | `/api/programs/:id/collects/:collectId/contributors` | authenticated | List contributors |
| 21 | POST | `/api/programs/:id/collects/:collectId/invite_to_collect` | programManager | Invite to collect |
| 22 | POST | `/api/programs/:id/collects/:collectId/import_wiin_content` | programManager | Import from Wiin |
| 23 | POST | `/api/programs/:id/collects/:collectId/import_wiin_data` | none | Wiin webhook |
| 24 | POST | `/api/programs/:id/collects/:collectId/import_webhook_payload` | none | Generic webhook |
| 25 | POST | `/api/programs/:id/collects/:collectId/resend_invitations` | programManager | Resend invitations |
| 26 | PUT | `/api/programs/:id/collects/:collectId/display_template` | authenticated | Update display template |
| 27 | PUT | `/api/programs/:id/collects/:collectId/default_filters` | authenticated | Update default filters |
| 28 | GET | `/api/programs/:id/collects/:collectId/items` | authenticated | List collect items (paginated) |
| 29 | POST | `/api/programs/:id/collects/:collectId/items` | authenticated | Create collect item |
| 30 | PUT | `/api/programs/:id/collects/:collectId/items/:itemId` | authenticated | Update collect item |
| 31 | PUT | `/api/programs/:id/collects/:collectId/items/bulk_update` | authenticated | Bulk update items |
| 32 | DELETE | `/api/programs/:id/collects/:collectId/items/:itemId` | authenticated | Delete collect item |
| 33 | POST | `/api/programs/:id/collects/:collectId/export_records` | authenticated | Export records |
| 34 | GET | `/api/programs/:id/collects/:collectId/user_role` | authenticated | Get user's role in collect |
| 35 | PUT | `/api/programs/:id/members/:memberId/role` | superAdmin | Update member role |

#### Model Controller (11 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | GET | `/api/models/available` | authenticated | List available models |
| 2 | GET | `/api/admin/models` | admin | List all models |
| 3 | GET | `/api/admin/models/:id` | admin | Get model details |
| 4 | POST | `/api/admin/models` | admin | Create model |
| 5 | PUT | `/api/admin/models/:id` | admin | Update model |
| 6 | PUT | `/api/admin/models/:id/toggle` | admin | Toggle availability |
| 7 | GET | `/api/admin/models/:id/fields/:fieldId` | admin | Get field details |
| 8 | POST | `/api/admin/models/:id/fields` | admin | Create field |
| 9 | PUT | `/api/admin/models/:id/fields/:fieldId` | admin | Update field |
| 10 | PUT | `/api/admin/models/:id/fields/order` | admin | Reorder fields |
| 11 | DELETE | `/api/admin/models/:id/fields/:fieldId` | admin | Delete field |

#### Report Controller (6 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | GET | `/api/reports/:id/graphics` | authenticated | List report graphics |
| 2 | GET | `/api/reports/:id/graphics/:graphicId/preview` | authenticated | Preview graphic |
| 3 | POST | `/api/reports/:id/graphics` | authenticated | Create graphic item |
| 4 | PUT | `/api/reports/:id/graphics/reorder` | authenticated | Reorder graphics |
| 5 | PUT | `/api/reports/:id/graphics/:graphicId` | authenticated | Update graphic |
| 6 | DELETE | `/api/reports/:id/graphics/:graphicId` | authenticated | Delete graphic |

#### Task Controller (5 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | GET | `/api/programs/:id/tasks` | authenticated | List program tasks |
| 2 | POST | `/api/programs/:id/tasks` | programManager | Create task |
| 3 | PUT | `/api/programs/:id/tasks/:taskId` | programManager | Update task |
| 4 | PUT | `/api/programs/:id/tasks/:taskId/toggle` | authenticated | Toggle task status |
| 5 | DELETE | `/api/programs/:id/tasks/:taskId` | programManager | Delete task |

#### UserGroup Controller (6 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | GET | `/api/programs/:id/user_groups` | authenticated | List user groups |
| 2 | GET | `/api/programs/:id/user_groups/:groupId` | authenticated | Get group details |
| 3 | POST | `/api/programs/:id/user_groups` | programManager | Create group (with logo) |
| 4 | PUT | `/api/programs/:id/user_groups/:groupId` | programManager | Update group |
| 5 | PUT | `/api/programs/:id/user_groups/:groupId/remove_user` | programManager | Remove user |
| 6 | DELETE | `/api/programs/:id/user_groups/:groupId` | programManager | Delete group |

#### AttributionRule Controller (5 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | GET | `/api/collects/:id/attribution_rules` | authenticated | List rules |
| 2 | GET | `/api/collects/:id/attribution_rules/:ruleId` | authenticated | Get rule details |
| 3 | POST | `/api/collects/:id/attribution_rules` | programManager | Create rule |
| 4 | PUT | `/api/collects/:id/attribution_rules/:ruleId` | programManager | Update rule |
| 5 | DELETE | `/api/collects/:id/attribution_rules/:ruleId` | programManager | Delete rule |

#### Collect Controller (2 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | POST | `/api/admin/upload_to_cloud_storage` | superAdmin | Upload file to Cloud Storage |
| 2 | POST | `/api/upload_field_content` | authenticated | Upload field content file |

#### CollectItem Controller (4 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | GET | `/api/collect_items/:id` | authenticated | Get item details |
| 2 | GET | `/api/collect_items/:id/next_previous` | authenticated | Navigate items |
| 3 | GET | `/api/collect_items/download/:fieldId` | none | Download file |
| 4 | GET | `/api/collect_items/preview/:fieldId` | none | Preview file URL |

#### Global Controller (2 endpoints)
| # | Method | Path | Auth | Purpose |
|---|--------|------|------|---------|
| 1 | GET | `/api/search` | authenticated | Global search |
| 2 | GET | `/api/health` | none | Health check |

**Total: ~85 endpoints**

</details>

### Appendix C: i18n Key Categories

<details>
<summary>Click to expand — 300+ keys across en/fr</summary>

| Category | Estimated Keys | Examples |
|----------|---------------|---------|
| Navigation | ~20 | home, programs, collects, reports, admin, settings |
| Auth | ~30 | login, register, forgot_password, invite, welcome |
| Program management | ~40 | create_program, edit_program, members, invitations |
| Data collection | ~50 | create_collect, import_data, matching, records, filters |
| Reports | ~20 | create_report, graphic_types, indicators |
| Tasks | ~20 | create_task, frequency, reminders, status |
| Admin | ~30 | models, fields, users, roles, permissions |
| Common | ~40 | save, cancel, delete, edit, confirm, loading, error |
| Validation | ~30 | required, min_length, invalid_email, format_error |
| Notifications | ~20 | new_invitation, task_reminder, import_complete |

**Languages**: `en` (English), `fr` (French) — full coverage for both.

</details>

### Appendix D: Email Templates

| Template | Languages | Trigger |
|----------|-----------|---------|
| `invitation_to_rainbow` | FR, EN | New user invited to platform |
| `forgot_password` | FR, EN | Password reset request |
| `invitation_to_join_program` | FR, EN | User invited to program |
| `invitation_to_join_collect` | FR, EN | User invited to collect |
| `invitation_to_task` | FR, EN | User assigned to task |
| `end_task_notification` | FR, EN | Task period ended |
| `layout` | Shared | Base HTML template |

**Template engine**: Pug (compiled server-side). Migrate to React Email or similar during backend migration.

### Appendix E: Key Dependencies

<details>
<summary>Click to expand — Backend package.json</summary>

| Package | Version | Purpose | Migration Notes |
|---------|---------|---------|----------------|
| express | 4.18.1 | HTTP framework | Keep (Cloud Run compatible) |
| mongoose | 6.5.2 | MongoDB ODM | **Replace** with `@google-cloud/firestore` |
| bull | 4.8.5 | Job queues | **Replace** with Cloud Tasks SDK |
| ioredis | 5.3.2 | Redis client | **Remove** |
| @google-cloud/bigquery | 6.0.2 | BigQuery client | Keep |
| @google-cloud/storage | 6.5.2 | Cloud Storage client | Keep |
| @sentry/node | 7.10.0 | Error tracking | Keep |
| @slack/bolt | 3.12.1 | Slack integration | Keep |
| jsonwebtoken | 8.5.1 | JWT auth | Keep |
| bcryptjs | 2.4.3 | Password hashing | Keep |
| email-templates | 10.0.1 | Email rendering | Replace with React Email |
| nodemailer | 6.7.8 | SMTP client | Keep |
| pug | 3.0.2 | Template engine | **Remove** (email templates migrate) |
| multer | 1.4.5 | File uploads | Keep (for multipart handling) |
| xlsx | 0.18.5 | Excel parsing | Keep |
| exceljs | 4.4.0 | Excel generation | Keep |
| google-auth-library | 8.5.2 | OAuth | Keep |
| googleapis | 105.0.0 | Google APIs | Keep |
| swagger-jsdoc | 6.2.5 | API docs | **Remove** |
| swagger-ui-express | 4.5.0 | API docs UI | **Remove** |
| node-cron | 3.0.2 | Cron scheduler | **Remove** (Cloud Scheduler) |
| mongoose-paginate-v2 | 1.8.0 | Pagination | **Remove** (Firestore cursors) |
| pm2 | (ecosystem.config.js) | Process manager | **Remove** (Cloud Run auto-scaling) |

</details>

---

## Document Information

| Field | Value |
|-------|-------|
| **Author** | Generated by Claude Code audit |
| **Date** | 2026-02-11 |
| **Source repos** | `github.com/Digital-Africa/rainbow-backend`, `github.com/Digital-Africa/rainbow-frontend` |
| **GCP project** | `digital-africa-rainbow` |
| **Target monorepo** | `UI_platform` (`github.com/0xMoRyuk/UI_platform`) |
| **Status** | Audit complete — ready for implementation planning |
