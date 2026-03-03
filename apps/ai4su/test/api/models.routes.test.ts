import { describe, it, expect } from 'vitest'
import { api } from '@/api/server'

function req(path: string) {
  return api.request(path)
}

describe('GET /api/models', () => {
  it('returns paginated models', async () => {
    const res = await req('/api/models')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.total).toBe(24)
    expect(body.data.data.length).toBeLessThanOrEqual(20)
    expect(body.data.page).toBe(1)
  })

  it('supports pagination params', async () => {
    const res = await req('/api/models?page=2&limit=5')
    const body = await res.json()
    expect(body.data.page).toBe(2)
    expect(body.data.limit).toBe(5)
    expect(body.data.data).toHaveLength(5)
  })

  it('filters by text query', async () => {
    const res = await req('/api/models?q=agriculture')
    const body = await res.json()
    expect(body.data.total).toBeGreaterThanOrEqual(1)
  })

  it('filters by sector', async () => {
    const res = await req('/api/models?sector=healthcare')
    const body = await res.json()
    expect(body.data.data.every((m: { sector: string }) => m.sector === 'healthcare')).toBe(true)
  })

  it('filters by country', async () => {
    const res = await req('/api/models?country=KE')
    const body = await res.json()
    expect(body.data.data.every((m: { country: string }) => m.country === 'KE')).toBe(true)
  })

  it('rejects invalid sector', async () => {
    const res = await req('/api/models?sector=invalid')
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.code).toBe('VALIDATION_ERROR')
  })

  it('returns cache-control header', async () => {
    const res = await req('/api/models')
    expect(res.headers.get('Cache-Control')).toContain('max-age=300')
  })
})

describe('GET /api/models/filters', () => {
  it('returns filter options', async () => {
    const res = await req('/api/models/filters')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.sectors).toHaveLength(6)
    expect(body.data.countries).toHaveLength(8)
  })
})

describe('GET /api/models/:id', () => {
  it('returns a single model', async () => {
    const res = await req('/api/models/model-001')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.data.id).toBe('model-001')
  })

  it('returns 404 for unknown model', async () => {
    const res = await req('/api/models/nonexistent')
    expect(res.status).toBe(404)
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.code).toBe('NOT_FOUND')
  })
})
