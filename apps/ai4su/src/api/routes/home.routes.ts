import { Hono } from 'hono'
import { getKPIs, getCountries } from '@/domain/home'

export const homeRoutes = new Hono()

homeRoutes.get('/home/kpis', (c) => {
  return c.json({ success: true, data: getKPIs() })
})

homeRoutes.get('/home/countries', (c) => {
  return c.json({ success: true, data: getCountries() })
})
