import { describe, it, expect } from 'vitest'
import { api } from '@/api/server'

describe('GET /.well-known/agent-capabilities.json', () => {
  it('returns manifest with capabilities', async () => {
    const res = await api.request('http://localhost/.well-known/agent-capabilities.json')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.schema_version).toBe('1.0')
    expect(body.name).toContain('AI4SU')
    expect(body.capabilities).toBeInstanceOf(Array)
    expect(body.capabilities.length).toBeGreaterThanOrEqual(3)
  })

  it('includes base_url derived from request origin', async () => {
    const res = await api.request('http://localhost/.well-known/agent-capabilities.json')
    const body = await res.json()
    expect(body.base_url).toBe('http://localhost')
  })

  it('includes search-models capability with absolute endpoint', async () => {
    const res = await api.request('http://localhost/.well-known/agent-capabilities.json')
    const body = await res.json()
    const searchCap = body.capabilities.find((c: { id: string }) => c.id === 'search-models')
    expect(searchCap).toBeDefined()
    expect(searchCap.endpoint).toBe('http://localhost/api/models')
    expect(searchCap.method).toBe('GET')
    expect(searchCap.parameters).toHaveProperty('q')
    expect(searchCap.parameters).toHaveProperty('sector')
  })

  it('includes get-model capability with absolute endpoint', async () => {
    const res = await api.request('http://localhost/.well-known/agent-capabilities.json')
    const body = await res.json()
    const getCap = body.capabilities.find((c: { id: string }) => c.id === 'get-model')
    expect(getCap).toBeDefined()
    expect(getCap.endpoint).toBe('http://localhost/api/models/{id}')
  })
})
