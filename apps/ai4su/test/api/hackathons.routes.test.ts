import { describe, it, expect } from 'vitest'
import { api } from '@/api/server'

describe('GET /api/hackathons', () => {
  it('returns paginated hackathons', async () => {
    const res = await api.request('/api/hackathons')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.total).toBe(8)
  })

  it('filters by country', async () => {
    const res = await api.request('/api/hackathons?country=KE')
    const body = await res.json()
    expect(body.data.data.every((h: { location: { countryCode: string } }) => h.location.countryCode === 'KE')).toBe(true)
  })
})

describe('GET /api/hackathons/:slug', () => {
  it('returns hackathon with resolved models', async () => {
    // Get first hackathon slug
    const listRes = await api.request('/api/hackathons')
    const listBody = await listRes.json()
    const slug = listBody.data.data[0].slug

    const res = await api.request(`/api/hackathons/${slug}`)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.data.slug).toBe(slug)
    expect(body.data.models).toBeDefined()
    expect(body.data.models.length).toBeGreaterThanOrEqual(1)
  })

  it('returns 404 for unknown slug', async () => {
    const res = await api.request('/api/hackathons/nonexistent')
    expect(res.status).toBe(404)
  })
})
