# CLAUDE.md

## Project Context

**Monorepo** for web apps on **Google Cloud Run**, designed for **users in Africa** where **data = money**.

**Structure:** `apps/*` (independent apps) + `packages/*` (shared: ui, config, types, utils, infra)

**Stack:** Bun workspaces · Vite · React 19 · TypeScript · Tailwind · shadcn/ui · Cloud Run

---

## North Star Principles

1. **Bytes are money** — Optimize for value per megabyte
2. **Perceived speed > raw speed** — Skeletons, cached data, progressive rendering
3. **Scale-to-zero by default** — No always-on servers unless justified
4. **Async by default** — Heavy work never blocks user requests
5. **Offline-first mindset** — Cache reads, queue writes

---

## UX Standards

- **Low Data Mode** — Disable autoplay, reduce polling, smaller images
- **One API call per screen** — BFF pattern, no chatty APIs
- **Required states** — Loading, empty, error, offline (spinners alone not acceptable)
- **Images** — Responsive, WebP/AVIF, lazy-loaded, large media opt-in

---

## Frontend Rules

- Code-split by route/feature
- Lazy-load heavy components (charts, editors)
- Don't ship admin features to regular users
- Minimal motion, prefer Tailwind utilities
- Bundle budgets enforced

---

## Agent Collaboration

- **Never increase data usage without justification**
- Prefer simpler, cheaper, managed GCP services
- Consider: data cost, cold start impact, operational cost
- Propose async before sync
- Ask if a feature risks heavy transfer, persistent infra, or complex state

---

## Definition of Done

- Respects data budgets
- Works under poor connectivity
- Has loading/error states
- No unnecessary cloud cost
- Scales to zero safely

---

## References

| Topic | Location |
|-------|----------|
| Brand tokens | `.claude/references/brand-tokens.md` |
| GCP deployment | `.claude/references/deployment-gcp.md` |
| Backend standards | `.claude/references/backend-standards.md` |
| Quick commands | `.claude/references/quick-reference.md` |
| Analytics | `standards/analytics.md` |
| Design system rules | `.figma/design-system-rules.md` |
