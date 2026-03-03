import { describe, it, expect } from 'vitest'
import { api } from '@/api/server'

/**
 * Thin-slice e2e: verifies the full chain from
 * data.json → domain functions → API routes → response envelope.
 */
describe('thin-slice: models API end-to-end', () => {
  it('list → filter → detail round trip', async () => {
    // 1. List all models
    const listRes = await api.request('/api/models')
    expect(listRes.status).toBe(200)
    const listBody = await listRes.json()
    expect(listBody.data.total).toBe(24)

    // 2. Filter by a sector
    const filterRes = await api.request('/api/models?sector=agriculture')
    const filterBody = await filterRes.json()
    expect(filterBody.data.total).toBeGreaterThanOrEqual(1)
    const firstModel = filterBody.data.data[0]

    // 3. Fetch that specific model by ID
    const detailRes = await api.request(`/api/models/${firstModel.id}`)
    expect(detailRes.status).toBe(200)
    const detailBody = await detailRes.json()
    expect(detailBody.data.id).toBe(firstModel.id)
    expect(detailBody.data.sector).toBe('agriculture')
  })

  it('manifest is discoverable', async () => {
    const res = await api.request('/.well-known/agent-capabilities.json')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.capabilities.length).toBeGreaterThanOrEqual(3)

    // Verify each declared endpoint is reachable
    for (const cap of body.capabilities) {
      if (cap.endpoint.includes('{')) continue // skip parameterized endpoints
      const capRes = await api.request(cap.endpoint)
      expect(capRes.status).toBe(200)
    }
  })
})
