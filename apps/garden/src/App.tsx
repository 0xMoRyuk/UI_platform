import { useEffect, useMemo, useState } from 'react'

type Domain = { id: string; title: string; summary: string }
type Artifact = {
  id: string
  domain: string
  title: string
  description: string
  date: string
  file: string
  generator: string
  sensitivity: string
  bytes: number
}
type Manifest = { synced_at: string; domains: Domain[]; artifacts: Artifact[] }
type Load = { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; data: Manifest }

const kb = (n: number) => `${Math.max(1, Math.round(n / 1024))} Ko`
const day = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

export default function App() {
  const [load, setLoad] = useState<Load>({ state: 'loading' })
  const [domain, setDomain] = useState<string>(() => location.hash.replace('#', '') || 'all')

  useEffect(() => {
    fetch('/artifacts/manifest.json', { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`manifest ${r.status}`))))
      .then((data: Manifest) => setLoad({ state: 'ready', data }))
      .catch((e: Error) => setLoad({ state: 'error', message: e.message }))
  }, [])

  useEffect(() => {
    const onHash = () => setDomain(location.hash.replace('#', '') || 'all')
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [])

  const shown = useMemo(() => {
    if (load.state !== 'ready') return []
    return load.data.artifacts
      .filter(a => domain === 'all' || a.domain === domain)
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [load, domain])

  return (
    <div className="shell">
      <header className="top">
        <div>
          <p className="eyebrow">Garden</p>
          <h1>Artifacts produits avec Claude Code</h1>
        </div>
        {load.state === 'ready' && <p className="synced">Synchronisé le {day(load.data.synced_at)}</p>}
      </header>

      {load.state === 'loading' && (
        <ul className="grid" aria-busy="true" aria-label="Chargement">
          {[0, 1, 2].map(i => (
            <li key={i} className="card skeleton" />
          ))}
        </ul>
      )}

      {load.state === 'error' && (
        <p className="notice">
          Le manifest des artifacts n'a pas pu être chargé ({load.message}). Rechargez la page ; si l'erreur persiste,
          relancez <code>bun run sync</code> puis redéployez.
        </p>
      )}

      {load.state === 'ready' && (
        <>
          <nav className="tabs" aria-label="Domaines">
            <a href="#all" aria-current={domain === 'all' ? 'page' : undefined}>
              Tous <b>{load.data.artifacts.length}</b>
            </a>
            {load.data.domains.map(d => (
              <a key={d.id} href={`#${d.id}`} aria-current={domain === d.id ? 'page' : undefined}>
                {d.title} <b>{load.data.artifacts.filter(a => a.domain === d.id).length}</b>
              </a>
            ))}
          </nav>

          {domain !== 'all' && <p className="summary">{load.data.domains.find(d => d.id === domain)?.summary}</p>}

          {shown.length === 0 ? (
            <p className="notice">Aucun artifact publié pour ce domaine.</p>
          ) : (
            <ul className="grid">
              {shown.map(a => (
                <li key={a.id} className="card">
                  <a href={`/artifacts/${a.domain}/${a.file}`}>
                    <span className="meta">
                      <span className="chip">{a.domain}</span>
                      <span>{day(a.date)}</span>
                      <span>{kb(a.bytes)}</span>
                    </span>
                    <span className="title">{a.title}</span>
                    <span className="desc">{a.description}</span>
                    <span className="gen">{a.generator}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
