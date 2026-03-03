import { Hono } from 'hono'
import { searchModels } from '../../domain/models'
import { searchHackathons } from '../../domain/hackathons'

export const sitemapSeo = new Hono()

sitemapSeo.get('/sitemap.xml', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const { data: models } = searchModels({ limit: 100 })
  const { data: hackathons } = searchHackathons({ limit: 100 })

  const urls: { loc: string; priority: string }[] = [
    { loc: '/', priority: '1.0' },
    { loc: '/models', priority: '0.9' },
    { loc: '/hackathons', priority: '0.9' },
    { loc: '/activities', priority: '0.7' },
    { loc: '/partners', priority: '0.6' },
    { loc: '/s/models', priority: '0.8' },
    { loc: '/s/datasets/agriculture-ai-africa', priority: '0.8' },
    { loc: '/s/hackathons', priority: '0.8' },
  ]

  // Individual model pages
  for (const m of models) {
    urls.push({ loc: `/models/${m.id}`, priority: '0.6' })
  }

  // Individual hackathon pages
  for (const h of hackathons) {
    urls.push({ loc: `/hackathons/${h.slug}`, priority: '0.6' })
  }

  urls.push({ loc: '/llm.txt', priority: '0.3' })

  const urlEntries = urls
    .map((u) => `  <url><loc>${escapeXml(`${baseUrl}${u.loc}`)}</loc><priority>${u.priority}</priority></url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  return c.body(xml, 200, { 'Content-Type': 'application/xml' })
})

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
