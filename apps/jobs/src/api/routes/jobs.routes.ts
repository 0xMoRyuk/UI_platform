import { Hono } from 'hono'
import { SearchJobsInputSchema, GetJobInputSchema } from '@/contract/schemas/job.schema'
import { searchJobs, getJobBySlug, getAllSectors } from '@/domain/jobs'
import { NotFoundError, ValidationError } from '@/contract/errors'

export const jobsRoutes = new Hono()

/**
 * GET /api/jobs — List jobs, with optional search and filters
 */
jobsRoutes.get('/jobs', (c) => {
  const raw = Object.fromEntries(new URL(c.req.url).searchParams.entries())
  const parsed = SearchJobsInputSchema.safeParse(raw)
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues.map((i) => i.message).join(', '))
  }

  const result = searchJobs(parsed.data)
  return c.json({ success: true, data: result })
})

/**
 * GET /api/jobs/sectors — List all available sectors
 */
jobsRoutes.get('/jobs/sectors', (c) => {
  const sectors = getAllSectors()
  return c.json({ success: true, data: sectors })
})

/**
 * GET /api/jobs/:slug — Single job by slug
 */
jobsRoutes.get('/jobs/:slug', (c) => {
  const parsed = GetJobInputSchema.safeParse({ slug: c.req.param('slug') })
  if (!parsed.success) {
    throw new ValidationError('Invalid job slug')
  }

  const job = getJobBySlug(parsed.data.slug)
  if (!job) {
    throw new NotFoundError('Job', parsed.data.slug)
  }

  return c.json({ success: true, data: job })
})
