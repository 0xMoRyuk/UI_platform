import { Hono } from 'hono'
import datagovData from '../../../product/sections/datagov/data.json'

export const datagovRoutes = new Hono()

datagovRoutes.get('/datagov', (c) => {
  return c.json({ success: true, data: datagovData })
})
