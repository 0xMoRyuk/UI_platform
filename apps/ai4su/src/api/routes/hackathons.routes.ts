import { Hono } from 'hono'
import { SearchHackathonsInputSchema, GetHackathonInputSchema } from '@/contract/schemas/hackathon.schema'
import { searchHackathons, getHackathonBySlug, resolveHackathonModels } from '@/domain/hackathons'
import { NotFoundError, ValidationError } from '@/contract/errors'

export const hackathonsRoutes = new Hono()

/**
 * GET /api/hackathons - List hackathons, optionally filter by country
 */
hackathonsRoutes.get('/hackathons', (c) => {
  const raw = Object.fromEntries(new URL(c.req.url).searchParams.entries())
  const parsed = SearchHackathonsInputSchema.safeParse(raw)
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues.map((i) => i.message).join(', '))
  }

  const result = searchHackathons(parsed.data)
  return c.json({ success: true, data: result })
})

/**
 * GET /api/hackathons/:slug - Single hackathon by slug, with resolved models
 */
hackathonsRoutes.get('/hackathons/:slug', (c) => {
  const parsed = GetHackathonInputSchema.safeParse({ slug: c.req.param('slug') })
  if (!parsed.success) {
    throw new ValidationError('Invalid hackathon slug')
  }

  const hackathon = getHackathonBySlug(parsed.data.slug)
  if (!hackathon) {
    throw new NotFoundError('Hackathon', parsed.data.slug)
  }

  const models = resolveHackathonModels(hackathon)
  return c.json({ success: true, data: { ...hackathon, models } })
})
