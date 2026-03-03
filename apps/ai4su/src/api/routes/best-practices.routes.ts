import { Hono } from 'hono'
import { getAllBestPractices, getBestPracticeById } from '@/domain/models'
import { NotFoundError } from '@/contract/errors'

export const bestPracticesRoutes = new Hono()

bestPracticesRoutes.get('/best-practices', (c) => {
  return c.json({ success: true, data: getAllBestPractices() })
})

bestPracticesRoutes.get('/best-practices/:id', (c) => {
  const bp = getBestPracticeById(c.req.param('id'))
  if (!bp) {
    throw new NotFoundError('BestPractice', c.req.param('id'))
  }
  return c.json({ success: true, data: bp })
})
