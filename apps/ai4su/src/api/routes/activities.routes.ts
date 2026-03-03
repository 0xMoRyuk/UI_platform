import { Hono } from 'hono'
import { SearchActivitiesInputSchema, GetActivityInputSchema } from '@/contract/schemas/activity.schema'
import { searchActivities, getActivityById } from '@/domain/activities'
import { NotFoundError, ValidationError } from '@/contract/errors'

export const activitiesRoutes = new Hono()

activitiesRoutes.get('/activities', (c) => {
  const raw = Object.fromEntries(new URL(c.req.url).searchParams.entries())
  const parsed = SearchActivitiesInputSchema.safeParse(raw)
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues.map((i) => i.message).join(', '))
  }

  const result = searchActivities(parsed.data)
  return c.json({ success: true, data: result })
})

activitiesRoutes.get('/activities/:id', (c) => {
  const parsed = GetActivityInputSchema.safeParse({ id: c.req.param('id') })
  if (!parsed.success) {
    throw new ValidationError('Invalid activity ID')
  }

  const activity = getActivityById(parsed.data.id)
  if (!activity) {
    throw new NotFoundError('Activity', parsed.data.id)
  }

  return c.json({ success: true, data: activity })
})
