import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { errorHandler } from './middleware/error-handler'
import { cacheControl } from './middleware/cache-control'
import { rateLimit } from './middleware/rate-limit'
import { jobsRoutes } from './routes/jobs.routes'
import { companiesRoutes } from './routes/companies.routes'
import { manifestRoutes } from './routes/manifest.routes'

export const api = new Hono()

api.use('*', cors())
api.use('/api/*', rateLimit)
api.use('/api/*', cacheControl)
api.onError(errorHandler)

api.route('/api', jobsRoutes)
api.route('/api', companiesRoutes)
api.route('', manifestRoutes)
