import { Hono } from 'hono'

export const manifestRoutes = new Hono()

const manifest = {
  schema_version: '1.0',
  name: 'AI4SU — AI for Scaled-Up Impact',
  description: 'Open-source AI models, hackathons, studies, and ecosystem data from the AI4SU programme across Africa.',
  url: 'https://ai4su.app',
  capabilities: [
    // Models
    {
      id: 'search-models',
      name: 'Search AI Models',
      description: 'Search and filter the 24 open-source AI models by text, sector, or country.',
      endpoint: '/api/models',
      method: 'GET',
      parameters: {
        q: { type: 'string', description: 'Text search on name, description, sector' },
        sector: { type: 'string', description: 'Filter by sector (agriculture, healthcare, fintech, education, environment, logistics)' },
        country: { type: 'string', description: 'Filter by country code (KE, NG, GH, SN, RW, ZA, EG, MA)' },
        page: { type: 'integer', description: 'Page number (default: 1)' },
        limit: { type: 'integer', description: 'Items per page (default: 20, max: 100)' },
      },
    },
    {
      id: 'get-model',
      name: 'Get AI Model',
      description: 'Retrieve a single AI model by its ID.',
      endpoint: '/api/models/{id}',
      method: 'GET',
    },
    {
      id: 'get-filters',
      name: 'Get Available Filters',
      description: 'List all available sectors and countries for filtering models.',
      endpoint: '/api/models/filters',
      method: 'GET',
    },
    // Hackathons
    {
      id: 'search-hackathons',
      name: 'Search Hackathons',
      description: 'List hackathon events, optionally filter by country.',
      endpoint: '/api/hackathons',
      method: 'GET',
      parameters: {
        country: { type: 'string', description: 'Country code filter (KE, NG, GH, SN, RW, ZA, EG, MA)' },
        page: { type: 'integer', description: 'Page number (default: 1)' },
        limit: { type: 'integer', description: 'Items per page (default: 20)' },
      },
    },
    {
      id: 'get-hackathon',
      name: 'Get Hackathon',
      description: 'Retrieve a single hackathon by slug, with resolved AI models.',
      endpoint: '/api/hackathons/{slug}',
      method: 'GET',
    },
    // Activities
    {
      id: 'search-activities',
      name: 'Search Activities',
      description: 'Search ecosystem activities (events, research, workshops, women-founders programs).',
      endpoint: '/api/activities',
      method: 'GET',
      parameters: {
        type: { type: 'string', description: 'Activity type (event, research, workshop, women-founders)' },
        country: { type: 'string', description: 'Country code filter' },
        page: { type: 'integer', description: 'Page number (default: 1)' },
        limit: { type: 'integer', description: 'Items per page (default: 20)' },
      },
    },
    {
      id: 'get-activity',
      name: 'Get Activity',
      description: 'Retrieve a single activity by its ID.',
      endpoint: '/api/activities/{id}',
      method: 'GET',
    },
    // Partners
    {
      id: 'get-partners',
      name: 'Get Partners',
      description: 'List all implementing partners.',
      endpoint: '/api/partners',
      method: 'GET',
    },
    {
      id: 'get-partner',
      name: 'Get Partner',
      description: 'Retrieve a single implementing partner by ID.',
      endpoint: '/api/partners/{id}',
      method: 'GET',
    },
    {
      id: 'get-service-providers',
      name: 'Get Service Providers',
      description: 'List all service providers.',
      endpoint: '/api/service-providers',
      method: 'GET',
    },
    // Studies & Reports
    {
      id: 'get-studies',
      name: 'Get Studies',
      description: 'List all research studies.',
      endpoint: '/api/studies',
      method: 'GET',
    },
    {
      id: 'get-study',
      name: 'Get Study',
      description: 'Retrieve a single study by ID.',
      endpoint: '/api/studies/{id}',
      method: 'GET',
    },
    {
      id: 'get-best-practices',
      name: 'Get Best Practices',
      description: 'List all hackathon best practices reports.',
      endpoint: '/api/best-practices',
      method: 'GET',
    },
    // Home
    {
      id: 'get-kpis',
      name: 'Get KPIs',
      description: 'Get programme KPIs (models count, hackathons count, countries, etc.).',
      endpoint: '/api/home/kpis',
      method: 'GET',
    },
    {
      id: 'get-countries',
      name: 'Get Countries',
      description: 'List all programme countries with coordinates.',
      endpoint: '/api/home/countries',
      method: 'GET',
    },
  ],
}

manifestRoutes.get('/.well-known/agent-capabilities.json', (c) => {
  const baseUrl = new URL(c.req.url).origin
  return c.json({
    ...manifest,
    base_url: baseUrl,
    capabilities: manifest.capabilities.map((cap) => ({
      ...cap,
      endpoint: `${baseUrl}${cap.endpoint}`,
    })),
  })
})
