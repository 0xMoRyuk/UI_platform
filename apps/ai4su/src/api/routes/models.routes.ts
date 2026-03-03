import { Hono } from 'hono'
import { SearchModelsInputSchema, GetModelInputSchema } from '@/contract/schemas/model.schema'
import { searchModels, getModelById, getAvailableFilters } from '@/domain/models'
import { NotFoundError, ValidationError } from '@/contract/errors'

export const modelsRoutes = new Hono()

/**
 * GET /api/models - Search and filter AI models
 * Query params: q, sector, country, page, limit
 */
modelsRoutes.get('/models', (c) => {
  const raw = Object.fromEntries(new URL(c.req.url).searchParams.entries())

  // Handle array params (sector=a&sector=b)
  const url = new URL(c.req.url)
  const sectorParams = url.searchParams.getAll('sector')
  const countryParams = url.searchParams.getAll('country')

  const input = {
    ...raw,
    ...(sectorParams.length > 1 ? { sector: sectorParams } : {}),
    ...(countryParams.length > 1 ? { country: countryParams } : {}),
  }

  const parsed = SearchModelsInputSchema.safeParse(input)
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues.map((i) => i.message).join(', '))
  }

  const result = searchModels(parsed.data)
  return c.json({ success: true, data: result })
})

/**
 * GET /api/models/filters - Available filter options
 */
modelsRoutes.get('/models/filters', (c) => {
  const filters = getAvailableFilters()
  return c.json({ success: true, data: filters })
})

/**
 * GET /api/models/:id - Single model by ID
 */
modelsRoutes.get('/models/:id', (c) => {
  const parsed = GetModelInputSchema.safeParse({ id: c.req.param('id') })
  if (!parsed.success) {
    throw new ValidationError('Invalid model ID')
  }

  const model = getModelById(parsed.data.id)
  if (!model) {
    throw new NotFoundError('Model', parsed.data.id)
  }

  return c.json({ success: true, data: model })
})
