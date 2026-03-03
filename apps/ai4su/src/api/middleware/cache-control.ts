import type { Context, Next } from 'hono'

/**
 * Sets Cache-Control headers for API responses.
 * Data is static (in-memory JSON), so we can cache aggressively.
 * s-maxage for CDN, max-age for browser, stale-while-revalidate for graceful refresh.
 */
export async function cacheControl(c: Context, next: Next) {
  await next()
  if (c.req.method === 'GET' && c.res.status < 400) {
    c.header('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400')
  }
}
