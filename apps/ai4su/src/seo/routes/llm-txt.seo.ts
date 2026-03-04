import { Hono } from 'hono'
import { searchModels } from '../../domain/models'
import { searchHackathons } from '../../domain/hackathons'
import { COUNTRY_NAMES, SECTOR_LABELS } from '../html'
import siteConfig from '../../../product/site.json'

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

  const body = `# ${siteConfig.name} (${siteConfig.shortName})

> ${siteConfig.tagline}

## API
- Agent Capabilities: ${baseUrl}${siteConfig.links.agentManifest}
- Models API: ${baseUrl}${siteConfig.links.modelsApi}
- Hackathons API: ${baseUrl}${siteConfig.links.hackathonsApi}

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
