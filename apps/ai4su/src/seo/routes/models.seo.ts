import { Hono } from 'hono'
import { searchModels, getAvailableFilters } from '../../domain/models'
import { seoPage, escapeHtml, COUNTRY_NAMES, SECTOR_LABELS } from '../html'
import siteConfig from '../../../product/site.json'

export const modelsSeo = new Hono()

modelsSeo.get('/s/models', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const { data: models, total } = searchModels({ limit: 100 })
  const filters = getAvailableFilters()

  // Group models by sector
  const bySector = new Map<string, typeof models>()
  for (const m of models) {
    const group = bySector.get(m.sector) ?? []
    group.push(m)
    bySector.set(m.sector, group)
  }

  const statsHtml = `
<div>
  <span class="stat"><strong>${total}</strong> models</span>
  <span class="stat"><strong>${filters.sectors.length}</strong> sectors</span>
  <span class="stat"><strong>${filters.countries.length}</strong> countries</span>
</div>`

  let modelsHtml = ''
  for (const [sector, sectorModels] of bySector) {
    modelsHtml += `<h2>${escapeHtml(SECTOR_LABELS[sector] ?? sector)}</h2>\n`
    for (const m of sectorModels) {
      modelsHtml += `<div class="model-card">
<h3><a href="${escapeHtml(baseUrl)}/models/${escapeHtml(m.id)}">${escapeHtml(m.name)}</a></h3>
<p>${escapeHtml(m.shortDescription)}</p>
<p><strong>Country:</strong> ${escapeHtml(COUNTRY_NAMES[m.country] ?? m.country)} | <strong>Sector:</strong> ${escapeHtml(SECTOR_LABELS[m.sector] ?? m.sector)}${m.githubUrl ? ` | <a href="${escapeHtml(m.githubUrl)}">GitHub</a>` : ''}</p>
</div>\n`
    }
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${siteConfig.shortName} Open-Source AI Models`,
      numberOfItems: total,
      itemListElement: models.map((m, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareSourceCode',
          name: m.name,
          description: m.shortDescription,
          ...(m.githubUrl ? { codeRepository: m.githubUrl } : {}),
          applicationCategory: SECTOR_LABELS[m.sector] ?? m.sector,
          spatialCoverage: COUNTRY_NAMES[m.country] ?? m.country,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ]

  const html = seoPage({
    title: `Open-Source AI Models for Africa${siteConfig.seo.titleSuffix}`,
    description: `Browse ${total} open-source AI models across ${filters.sectors.length} sectors and ${filters.countries.length} African countries. Crop science, livestock, precision farming, and more.`,
    canonicalPath: '/models',
    jsonLd,
    body: `<h1>Open-Source AI Models for Africa</h1>
<p>${total} models built by African innovators across ${filters.sectors.length} sectors.</p>
${statsHtml}
${modelsHtml}`,
    baseUrl,
  })

  return c.html(html)
})
