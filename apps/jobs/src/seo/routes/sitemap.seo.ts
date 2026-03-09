import { Hono } from 'hono'
import { searchJobs } from '../../domain/jobs'
import { getCompanies } from '../../domain/companies'

export const sitemapSeo = new Hono()

sitemapSeo.get('/sitemap.xml', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const { data: jobs } = searchJobs({ limit: 100 })
  const companies = getCompanies()

  const urls: { loc: string; priority: string }[] = [
    { loc: '/', priority: '1.0' },
    { loc: '/jobs', priority: '0.9' },
    { loc: '/companies', priority: '0.8' },
    { loc: '/s/jobs', priority: '0.8' },
  ]

  for (const job of jobs) {
    urls.push({ loc: `/jobs/${job.slug}`, priority: '0.6' })
  }

  for (const company of companies) {
    urls.push({ loc: `/companies`, priority: '0.5' })
    void company // companies share a single listing page
    break
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
