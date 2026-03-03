import { Hono } from 'hono'
import { getAllStudies, getStudyById } from '@/domain/models'
import { NotFoundError } from '@/contract/errors'

export const studiesRoutes = new Hono()

studiesRoutes.get('/studies', (c) => {
  return c.json({ success: true, data: getAllStudies() })
})

studiesRoutes.get('/studies/:id', (c) => {
  const study = getStudyById(c.req.param('id'))
  if (!study) {
    throw new NotFoundError('Study', c.req.param('id'))
  }
  return c.json({ success: true, data: study })
})
