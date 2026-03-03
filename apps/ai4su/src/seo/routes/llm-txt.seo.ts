import { Hono } from 'hono'
import { searchModels } from '../../domain/models'
import { searchHackathons } from '../../domain/hackathons'
import { COUNTRY_NAMES, SECTOR_LABELS } from '../html'

export const llmTxtSeo = new Hono()

llmTxtSeo.get('/llm.txt', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const { data: models } = searchModels({ limit: 100 })
  const { data: hackathons } = searchHackathons({ limit: 100 })

  const modelLines = models
    .map(
      (m) =>
        `- ${m.name}: ${m.shortDescription} (${COUNTRY_NAMES[m.country] ?? m.country}, ${SECTOR_LABELS[m.sector] ?? m.sector})`,
    )
    .join('\n')

  const hackathonLines = hackathons
    .map(
      (h) =>
        `- ${h.name} (${h.startDate}, ${COUNTRY_NAMES[h.location.countryCode] ?? h.location.country}) - ${h.participantCount} participants, ${h.modelsProduced} models`,
    )
    .join('\n')

  const sectors = [...new Set(models.map((m) => SECTOR_LABELS[m.sector] ?? m.sector))].join(', ')
  const countries = [...new Set(models.map((m) => COUNTRY_NAMES[m.country] ?? m.country))].join(', ')

  const body = `# AI4Startups (AI4SU)

> Enabling African startups to build scalable, responsible AI solutions.

## API
- Agent Capabilities: ${baseUrl}/.well-known/agent-capabilities.json
- Models API: ${baseUrl}/api/models
- Hackathons API: ${baseUrl}/api/hackathons

## Models (${models.length})
${modelLines}

## Hackathons (${hackathons.length})
${hackathonLines}

## Sectors
${sectors}

## Countries
${countries}
`
  return c.text(body)
})
