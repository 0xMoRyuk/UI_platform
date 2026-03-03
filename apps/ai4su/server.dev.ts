import { Hono } from 'hono'
import { api } from './src/api/server'
import { seo } from './src/seo'

const app = new Hono()
app.route('', api)
app.route('', seo)

export default app
