import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { api } from './src/api/server'

const app = new Hono()

// Mount API routes
app.route('', api)

// JSON 404 guards — prevent SPA fallback for API/discovery paths
app.all('/api/*', (c) =>
  c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Endpoint not found' } }, 404))
app.all('/.well-known/*', (c) =>
  c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Resource not found' } }, 404))

// Serve static files from Vite build output
app.use('/*', serveStatic({ root: './dist' }))

// SPA fallback — serve index.html for all non-API, non-static routes
app.get('*', serveStatic({ root: './dist', path: 'index.html' }))

const port = Number(process.env.PORT) || 8080
console.log(`Server running on port ${port}`)

export default {
  port,
  fetch: app.fetch.bind(app),
}
