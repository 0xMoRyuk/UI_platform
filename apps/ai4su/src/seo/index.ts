import { Hono } from 'hono'
import type { Context, Next } from 'hono'
import { modelsSeo } from './routes/models.seo'
import { hackathonsSeo } from './routes/hackathons.seo'
import { datasetSeo } from './routes/dataset.seo'
import { robotsSeo } from './routes/robots.seo'
import { sitemapSeo } from './routes/sitemap.seo'
import { llmTxtSeo } from './routes/llm-txt.seo'

export const seo = new Hono()

/** Cache-Control for SEO pages — same policy as API responses. */
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

seo.route('', modelsSeo)
seo.route('', hackathonsSeo)
seo.route('', datasetSeo)
seo.route('', robotsSeo)
seo.route('', sitemapSeo)
seo.route('', llmTxtSeo)
