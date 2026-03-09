import { Hono } from 'hono'
import { searchJobs } from '../../domain/jobs'
import { getCompanies } from '../../domain/companies'
import siteConfig from '../../../product/site.json'

export const llmTxtSeo = new Hono()

llmTxtSeo.get('/llm.txt', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const { data: jobs } = searchJobs({ limit: 100 })
  const companies = getCompanies()

  const jobLines = jobs
    .map((j) => `- ${j.title} at ${j.company.name} (${j.location}, ${j.type}) — ${j.sector}`)
    .join('\n')

  const companyLines = companies
    .map((co) => `- ${co.name}: ${co.tagline} (${co.location}, ${co.sector}) — ${co.openPositions} open positions`)
    .join('\n')

  const sectors = [...new Set(jobs.map((j) => j.sector))].join(', ')
  const locations = [...new Set(jobs.map((j) => j.location))].join(', ')

  const body = `# ${siteConfig.name}

> ${siteConfig.tagline}

## API
- Agent Capabilities: ${baseUrl}${siteConfig.links.agentManifest}
- Jobs API: ${baseUrl}${siteConfig.links.jobsApi}
- Companies API: ${baseUrl}${siteConfig.links.companiesApi}

## Jobs (${jobs.length})
${jobLines}

## Companies (${companies.length})
${companyLines}

## Sectors
${sectors}

## Locations
${locations}
`
  return c.text(body)
})
