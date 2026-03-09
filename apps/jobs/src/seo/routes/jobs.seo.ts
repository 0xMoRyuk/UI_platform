import { Hono } from 'hono'
import { searchJobs } from '../../domain/jobs'
import { seoPage, escapeHtml } from '../html'
import siteConfig from '../../../product/site.json'

export const jobsSeo = new Hono()

jobsSeo.get('/s/jobs', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const { data: jobs } = searchJobs({ limit: 100 })

  const jobRows = jobs
    .map(
      (j) =>
        `<tr>
  <td><a href="${baseUrl}/jobs/${j.slug}">${escapeHtml(j.title)}</a></td>
  <td>${escapeHtml(j.company.name)}</td>
  <td>${escapeHtml(j.location)}</td>
  <td>${escapeHtml(j.type)}</td>
  <td>${escapeHtml(j.sector)}</td>
</tr>`,
    )
    .join('\n')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteConfig.name} — Job Listings`,
    numberOfItems: jobs.length,
    itemListElement: jobs.map((j, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'JobPosting',
        title: j.title,
        hiringOrganization: { '@type': 'Organization', name: j.company.name },
        jobLocation: { '@type': 'Place', address: j.location },
        employmentType: j.type,
        datePosted: j.postedAt,
      },
    })),
  }

  const body = `
<h1>${escapeHtml(siteConfig.name)} — Job Listings</h1>
<p>${escapeHtml(siteConfig.description)}</p>
<div class="stat"><strong>${jobs.length}</strong> open positions</div>

<h2>All Jobs</h2>
<table>
<thead><tr><th>Title</th><th>Company</th><th>Location</th><th>Type</th><th>Sector</th></tr></thead>
<tbody>
${jobRows}
</tbody>
</table>`

  const html = seoPage({
    title: `${siteConfig.name} — Job Listings`,
    description: siteConfig.description,
    canonicalPath: '/s/jobs',
    jsonLd,
    body,
    baseUrl,
  })

  return c.html(html)
})
