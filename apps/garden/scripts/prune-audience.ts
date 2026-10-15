// Keep in public/artifacts/ only the artifacts approved for one audience, and rewrite manifest.json.
// Run after sync-artifacts.ts, before vite build — in Cloud Build when _AUDIENCE is set (a second
// service, e.g. ui-platform-garden-observe, serves a subset of the gallery). An artifact enters an
// audience through its `audiences` list in artifacts.json; the garden manifest (notebook/garden/
// manifest.yaml) is the authority on approval — artifacts.json only mirrors the approved ones.
// Usage: bun scripts/prune-audience.ts <audience>
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const audience = process.argv[2]
if (!audience) {
  console.error('usage: prune-audience.ts <audience>')
  process.exit(2)
}
const appDir = path.resolve(import.meta.dirname, '..')
const outRoot = path.join(appDir, 'public', 'artifacts')
const manifestPath = path.join(outRoot, 'manifest.json')
if (!existsSync(manifestPath)) {
  console.error(`no synced manifest at ${manifestPath} — run sync-artifacts.ts first`)
  process.exit(1)
}
type Entry = { id: string; domain: string; file: string; audiences?: string[] }
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { domains: unknown; artifacts: Entry[]; synced_at: string }
const keep = manifest.artifacts.filter(a => Array.isArray(a.audiences) && a.audiences.includes(audience))
const drop = manifest.artifacts.filter(a => !keep.includes(a))
for (const a of drop) {
  const f = path.join(outRoot, a.domain, a.file)
  if (existsSync(f)) rmSync(f)
}
writeFileSync(
  manifestPath,
  JSON.stringify({ ...manifest, audience, artifacts: keep }, null, 2) + '\n',
)
console.log(`audience ${audience}: kept ${keep.length} artifact(s) (${keep.map(a => a.id).join(', ') || 'none'}), removed ${drop.length}`)
if (keep.length === 0) {
  console.error('nothing to serve for this audience — refusing to build an empty gallery')
  process.exit(1)
}
