import { Hono } from 'hono'
import siteConfig from '@/../product/site.json'

export const manifestRoutes = new Hono()

manifestRoutes.get('/.well-known/agent-capabilities.json', (c) => {
  const baseUrl = new URL(c.req.url).origin

  return c.json({
    schema_version: '1.0',
    name: siteConfig.name,
    description: siteConfig.description,
    capabilities: {
      endpoints: [
        {
          path: '/api/jobs',
          method: 'GET',
          description: 'Search and list job postings',
          parameters: {
            q: 'Search query (optional)',
            type: 'Job type filter (optional)',
            sector: 'Sector filter (optional)',
            location: 'Location filter (optional)',
            page: 'Page number (default: 1)',
            limit: 'Results per page (default: 20)',
          },
        },
        {
          path: '/api/jobs/:slug',
          method: 'GET',
          description: 'Get a specific job posting by slug',
        },
        {
          path: '/api/jobs/sectors',
          method: 'GET',
          description: 'List all available job sectors',
        },
        {
          path: '/api/companies',
          method: 'GET',
          description: 'List companies, with optional search',
          parameters: {
            q: 'Search query (optional)',
          },
        },
        {
          path: '/api/companies/:id',
          method: 'GET',
          description: 'Get a specific company by ID',
        },
      ],
      discovery: {
        sitemap: `${baseUrl}/sitemap.xml`,
        llm_txt: `${baseUrl}/llm.txt`,
        robots: `${baseUrl}/robots.txt`,
      },
    },
  })
})
