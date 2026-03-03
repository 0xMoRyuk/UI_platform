import { Hono } from 'hono'

export const robotsSeo = new Hono()

robotsSeo.get('/robots.txt', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const body = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`
  return c.text(body)
})
