import { Hono } from 'hono'
import { getCompanies, getCompanyById } from '@/domain/companies'
import { NotFoundError } from '@/contract/errors'

export const companiesRoutes = new Hono()

/**
 * GET /api/companies — List companies, with optional search
 */
companiesRoutes.get('/companies', (c) => {
  const q = c.req.query('q')
  const companies = getCompanies(q)
  return c.json({ success: true, data: companies })
})

/**
 * GET /api/companies/:id — Single company by ID
 */
companiesRoutes.get('/companies/:id', (c) => {
  const id = c.req.param('id')
  const company = getCompanyById(id)
  if (!company) {
    throw new NotFoundError('Company', id)
  }
  return c.json({ success: true, data: company })
})
