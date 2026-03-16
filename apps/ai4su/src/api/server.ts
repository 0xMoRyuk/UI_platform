import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { errorHandler } from './middleware/error-handler'
import { cacheControl } from './middleware/cache-control'
import { rateLimit } from './middleware/rate-limit'
import { modelsRoutes } from './routes/models.routes'
import { hackathonsRoutes } from './routes/hackathons.routes'
import { activitiesRoutes } from './routes/activities.routes'
import { partnersRoutes } from './routes/partners.routes'
import { studiesRoutes } from './routes/studies.routes'
import { bestPracticesRoutes } from './routes/best-practices.routes'
import { homeRoutes } from './routes/home.routes'
import { datagovRoutes } from './routes/datagov.routes'
import { manifestRoutes } from './routes/manifest.routes'

export const api = new Hono()

api.use('*', cors())
api.use('/api/*', rateLimit)
api.use('/api/*', cacheControl)
api.onError(errorHandler)

api.route('/api', modelsRoutes)
api.route('/api', hackathonsRoutes)
api.route('/api', activitiesRoutes)
api.route('/api', partnersRoutes)
api.route('/api', studiesRoutes)
api.route('/api', bestPracticesRoutes)
api.route('/api', homeRoutes)
api.route('/api', datagovRoutes)
api.route('', manifestRoutes)
