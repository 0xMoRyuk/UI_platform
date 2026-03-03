import { describe, it, expect } from 'vitest'
import { api } from '@/api/server'

describe('GET /api/activities', () => {
  it('returns activities', async () => {
    const res = await api.request('/api/activities')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.total).toBeGreaterThanOrEqual(1)
  })

  it('filters by type', async () => {
    const res = await api.request('/api/activities?type=event')
    const body = await res.json()
    expect(body.data.data.every((a: { type: string }) => a.type === 'event')).toBe(true)
  })
})

describe('GET /api/partners', () => {
  it('returns implementing partners', async () => {
    const res = await api.request('/api/partners')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.length).toBeGreaterThanOrEqual(1)
  })
})

describe('GET /api/service-providers', () => {
  it('returns service providers', async () => {
    const res = await api.request('/api/service-providers')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.length).toBeGreaterThanOrEqual(1)
  })
})

describe('GET /api/studies', () => {
  it('returns all studies', async () => {
    const res = await api.request('/api/studies')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.data).toHaveLength(4)
  })
})

describe('GET /api/best-practices', () => {
  it('returns all best practices', async () => {
    const res = await api.request('/api/best-practices')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.data).toHaveLength(3)
  })
})

describe('GET /api/home/kpis', () => {
  it('returns KPIs', async () => {
    const res = await api.request('/api/home/kpis')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.data.length).toBeGreaterThanOrEqual(1)
  })
})

describe('GET /api/home/countries', () => {
  it('returns countries', async () => {
    const res = await api.request('/api/home/countries')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.data).toHaveLength(8)
  })
})

describe('manifest completeness', () => {
  it('has 15 capabilities', async () => {
    const res = await api.request('/.well-known/agent-capabilities.json')
    const body = await res.json()
    expect(body.capabilities).toHaveLength(15)
  })

  it('all non-parameterized endpoints return 200', async () => {
    const res = await api.request('/.well-known/agent-capabilities.json')
    const body = await res.json()
    for (const cap of body.capabilities) {
      if (cap.endpoint.includes('{')) continue
      const capRes = await api.request(cap.endpoint)
      expect(capRes.status).toBe(200)
    }
  })
})
