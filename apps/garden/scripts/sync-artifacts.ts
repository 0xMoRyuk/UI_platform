// Copy the artifacts listed in artifacts.json from the notebook into public/artifacts/<domain>/,
// then write public/artifacts/manifest.json (the only data the gallery reads).
// Fails loudly on a missing source: a manifest entry never ships silently empty.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'

type Artifact = {
  id: string
  domain: string
  title: string
  description: string
  date: string
  source: string
  file: string
  generator: string
  sensitivity: string
}
type Manifest = {
  notebook_root: string
  domains: { id: string; title: string; summary: string }[]
  artifacts: Artifact[]
}

const appDir = path.resolve(import.meta.dirname, '..')
const manifest: Manifest = JSON.parse(readFileSync(path.join(appDir, 'artifacts.json'), 'utf8'))
const notebook = path.resolve(appDir, process.env.NOTEBOOK_ROOT ?? manifest.notebook_root)
const outRoot = path.join(appDir, 'public', 'artifacts')
const check = process.argv.includes('--check')

const missing = manifest.artifacts.filter(a => !existsSync(path.join(notebook, a.source)))
if (missing.length) {
  for (const a of missing) console.error(`missing source: ${a.id} → ${path.join(notebook, a.source)}`)
  process.exit(1)
}
const unknownDomain = manifest.artifacts.filter(a => !manifest.domains.some(d => d.id === a.domain))
if (unknownDomain.length) {
  for (const a of unknownDomain) console.error(`unknown domain: ${a.id} → ${a.domain}`)
  process.exit(1)
}

const entries = manifest.artifacts.map(a => {
  const src = path.join(notebook, a.source)
  const buf = readFileSync(src)
  return { ...a, bytes: statSync(src).size, sha256: createHash('sha256').update(buf).digest('hex').slice(0, 12) }
})

if (check) {
  for (const e of entries) console.log(`${e.domain}/${e.file}  ${e.bytes} B  ${e.sha256}`)
  process.exit(0)
}

// Rebuild the output tree from scratch so a removed manifest entry also disappears from the site.
if (existsSync(outRoot)) rmSync(outRoot, { recursive: true })
for (const e of entries) {
  const dir = path.join(outRoot, e.domain)
  mkdirSync(dir, { recursive: true })
  copyFileSync(path.join(notebook, e.source), path.join(dir, e.file))
}
writeFileSync(
  path.join(outRoot, 'manifest.json'),
  JSON.stringify({ synced_at: new Date().toISOString(), domains: manifest.domains, artifacts: entries }, null, 2) + '\n',
)
const shipped = readdirSync(outRoot, { recursive: true }).filter(f => String(f).endsWith('.html'))
console.log(`synced ${shipped.length} artifacts from ${notebook}`)
