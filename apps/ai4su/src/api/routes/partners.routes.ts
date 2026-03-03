import { Hono } from 'hono'
import { GetPartnerInputSchema } from '@/contract/schemas/partner.schema'
import { getAllPartners, getPartnerById, getAllServiceProviders } from '@/domain/partners'
import { NotFoundError, ValidationError } from '@/contract/errors'

export const partnersRoutes = new Hono()

partnersRoutes.get('/partners', (c) => {
  return c.json({ success: true, data: getAllPartners() })
})

partnersRoutes.get('/partners/:id', (c) => {
  const parsed = GetPartnerInputSchema.safeParse({ id: c.req.param('id') })
  if (!parsed.success) {
    throw new ValidationError('Invalid partner ID')
  }

  const partner = getPartnerById(parsed.data.id)
  if (!partner) {
    throw new NotFoundError('Partner', parsed.data.id)
  }

  return c.json({ success: true, data: partner })
})

partnersRoutes.get('/service-providers', (c) => {
  return c.json({ success: true, data: getAllServiceProviders() })
})
