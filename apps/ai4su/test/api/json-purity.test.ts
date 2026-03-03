import { describe, it, expect } from 'vitest'
import { api } from '@/api/server'

/**
 * Regression tests: JSON endpoints must never return HTML (SPA fallback).
 */
describe('JSON purity', () => {
  it('/api/models returns JSON with no HTML markers', async () => {
    const res = await api.request('/api/models')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('application/json')
    const text = await res.text()
    expect(text).not.toContain('<!DOCTYPE')
    expect(text).not.toContain('<html')
    JSON.parse(text) // must be valid JSON
  })

  it('/api/models?q=agriculture returns parseable JSON', async () => {
    const res = await api.request('/api/models?q=agriculture')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('application/json')
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('/api/models/nonexistent-id returns JSON 404', async () => {
    const res = await api.request('/api/models/nonexistent-id')
    expect(res.status).toBe(404)
    expect(res.headers.get('content-type')).toContain('application/json')
    const body = await res.json()
    expect(body.success).toBe(false)
    expect(body.error.code).toBe('NOT_FOUND')
  })

  it('/api/nonexistent returns 404 without HTML', async () => {
    // Inner API returns Hono default 404; server.ts guard ensures JSON in production
    const res = await api.request('/api/nonexistent')
    expect(res.status).toBe(404)
    const text = await res.text()
    expect(text).not.toContain('<!DOCTYPE')
    expect(text).not.toContain('<html')
  })

  it('/.well-known/agent-capabilities.json returns JSON', async () => {
    const res = await api.request('http://localhost/.well-known/agent-capabilities.json')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('application/json')
    const text = await res.text()
    expect(text).not.toContain('<!DOCTYPE')
    const body = JSON.parse(text)
    expect(body.base_url).toBe('http://localhost')
  })

  it('/.well-known/nonexistent returns 404 without HTML', async () => {
    // Inner API returns Hono default 404; server.ts guard ensures JSON in production
    const res = await api.request('/.well-known/nonexistent')
    expect(res.status).toBe(404)
    const text = await res.text()
    expect(text).not.toContain('<!DOCTYPE')
    expect(text).not.toContain('<html')
  })

  it('manifest endpoints are absolute URLs', async () => {
    const res = await api.request('http://localhost/.well-known/agent-capabilities.json')
    const body = await res.json()
    for (const cap of body.capabilities) {
      expect(cap.endpoint).toMatch(/^http/)
    }
  })
})
