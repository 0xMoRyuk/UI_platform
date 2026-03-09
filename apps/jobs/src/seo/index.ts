import { Hono } from 'hono'
import type { Context, Next } from 'hono'
import { jobsSeo } from './routes/jobs.seo'
import { robotsSeo } from './routes/robots.seo'
import { sitemapSeo } from './routes/sitemap.seo'
import { llmTxtSeo } from './routes/llm-txt.seo'

export const seo = new Hono()

async function seoCacheControl(c: Context, next: Next) {
  await next()
  if (c.req.method === 'GET' && c.res.status < 400) {
    c.header('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400')
  }
}

seo.use('/s/*', seoCacheControl)
seo.use('/robots.txt', seoCacheControl)
seo.use('/sitemap.xml', seoCacheControl)
seo.use('/llm.txt', seoCacheControl)

seo.route('', jobsSeo)
seo.route('', robotsSeo)
seo.route('', sitemapSeo)
seo.route('', llmTxtSeo)
