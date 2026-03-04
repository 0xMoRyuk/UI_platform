import { Hono } from 'hono'
import { searchModels } from '../../domain/models'
import { searchHackathons } from '../../domain/hackathons'
import { seoPage, escapeHtml, COUNTRY_NAMES, SECTOR_LABELS } from '../html'
import siteConfig from '../../../product/site.json'

export const datasetSeo = new Hono()

datasetSeo.get('/s/datasets/agriculture-ai-africa', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const { data: models, total: modelCount } = searchModels({ limit: 100 })
  const { data: hackathons, total: hackathonCount } = searchHackathons({ limit: 100 })

  // Unique countries
  const countries = [...new Set(models.map((m) => m.country))]
  const sectors = [...new Set(models.map((m) => m.sector))]

  // Models by country table
  const byCountry = new Map<string, number>()
  for (const m of models) {
    byCountry.set(m.country, (byCountry.get(m.country) ?? 0) + 1)
  }

  let countryTableHtml = `<table><thead><tr><th>Country</th><th>Models</th></tr></thead><tbody>`
  for (const [code, count] of byCountry) {
    countryTableHtml += `<tr><td>${escapeHtml(COUNTRY_NAMES[code] ?? code)}</td><td>${count}</td></tr>`
  }
  countryTableHtml += `</tbody></table>`

  // Hackathon events table
  let hackathonTableHtml = `<table><thead><tr><th>Event</th><th>Date</th><th>Location</th><th>Participants</th><th>Models</th></tr></thead><tbody>`
  for (const h of hackathons) {
    hackathonTableHtml += `<tr><td>${escapeHtml(h.name)}</td><td>${escapeHtml(h.startDate)}</td><td>${escapeHtml(h.location.city)}, ${escapeHtml(COUNTRY_NAMES[h.location.countryCode] ?? h.location.country)}</td><td>${h.participantCount}</td><td>${h.modelsProduced}</td></tr>`
  }
  hackathonTableHtml += `</tbody></table>`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Agriculture AI Africa — Open-Source Model Collection',
    description: `${modelCount} open-source AI models for African agriculture across ${sectors.length} sectors and ${countries.length} countries, produced through ${hackathonCount} hackathon events.`,
    url: `${baseUrl}/s/datasets/agriculture-ai-africa`,
    license: 'https://opensource.org/licenses',
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    spatialCoverage: countries.map((code) => COUNTRY_NAMES[code] ?? code),
    keywords: [
      'artificial intelligence',
      'agriculture',
      'Africa',
      'open source',
      'machine learning',
    ],
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${baseUrl}/api/models`,
      },
    ],
  }

  const html = seoPage({
    title: `Agriculture AI Africa — Open-Source Model Collection`,
    description: `${modelCount} open-source AI models for African agriculture across ${sectors.length} sectors and ${countries.length} countries.`,
    canonicalPath: '/s/datasets/agriculture-ai-africa',
    ogType: 'article',
    jsonLd,
    body: `<h1>Agriculture AI Africa</h1>
<p>An open-source collection of ${modelCount} AI models for African agriculture, produced through ${hackathonCount} hackathon events across ${countries.length} countries.</p>

<div>
  <span class="stat"><strong>${modelCount}</strong> models</span>
  <span class="stat"><strong>${hackathonCount}</strong> hackathons</span>
  <span class="stat"><strong>${countries.length}</strong> countries</span>
  <span class="stat"><strong>${sectors.length}</strong> sectors</span>
</div>

<h2>Models by Country</h2>
${countryTableHtml}

<h2>Hackathon Events</h2>
${hackathonTableHtml}

<h2>Sectors</h2>
<p>${sectors.map((s) => escapeHtml(SECTOR_LABELS[s] ?? s)).join(', ')}</p>

<h2>Access Methods</h2>
<ul>
  <li><a href="${escapeHtml(baseUrl)}/models">Browse models interactively</a></li>
  <li><a href="${escapeHtml(baseUrl)}/api/models">REST API</a> — JSON endpoint for programmatic access</li>
  <li><a href="${escapeHtml(baseUrl)}/.well-known/agent-capabilities.json">Agent capabilities</a> — machine-readable discovery for AI agents</li>
  <li><a href="${escapeHtml(baseUrl)}/llm.txt">LLM context</a> — plain text summary for language models</li>
</ul>`,
    baseUrl,
  })

  return c.html(html)
})
