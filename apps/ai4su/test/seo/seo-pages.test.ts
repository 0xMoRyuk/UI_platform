import { describe, it, expect } from 'vitest'
import { seo } from '@/seo'

describe('SEO pages', () => {
  describe('GET /s/models', () => {
    it('returns 200 with text/html', async () => {
      const res = await seo.request('http://localhost/s/models')
      expect(res.status).toBe(200)
      expect(res.headers.get('content-type')).toContain('text/html')
    })

    it('contains all 24 model names', async () => {
      const res = await seo.request('http://localhost/s/models')
      const html = await res.text()
      // Should reference all models — check total in stats
      expect(html).toContain('<strong>24</strong> models')
    })

    it('has correct title', async () => {
      const res = await seo.request('http://localhost/s/models')
      const html = await res.text()
      expect(html).toContain('<title>Open-Source AI Models for Africa')
    })

    it('includes JSON-LD ItemList', async () => {
      const res = await seo.request('http://localhost/s/models')
      const html = await res.text()
      expect(html).toContain('application/ld+json')
      expect(html).toContain('"@type":"ItemList"')
      expect(html).toContain('"@type":"SoftwareSourceCode"')
    })

    it('canonical points to /models (SPA)', async () => {
      const res = await seo.request('http://localhost/s/models')
      const html = await res.text()
      expect(html).toContain('<link rel="canonical" href="http://localhost/models">')
    })

    it('HTML-escapes model data', async () => {
      const res = await seo.request('http://localhost/s/models')
      const html = await res.text()
      // No raw unescaped script tags in model data
      expect(html).not.toMatch(/<script(?! type="application\/ld\+json")/)
    })

    it('includes Cache-Control header', async () => {
      const res = await seo.request('http://localhost/s/models')
      expect(res.headers.get('cache-control')).toContain('public')
    })
  })

  describe('GET /s/hackathons', () => {
    it('returns 200 with text/html', async () => {
      const res = await seo.request('http://localhost/s/hackathons')
      expect(res.status).toBe(200)
      expect(res.headers.get('content-type')).toContain('text/html')
    })

    it('contains all 8 hackathon count', async () => {
      const res = await seo.request('http://localhost/s/hackathons')
      const html = await res.text()
      expect(html).toContain('<strong>8</strong> hackathons')
    })

    it('includes JSON-LD Event items', async () => {
      const res = await seo.request('http://localhost/s/hackathons')
      const html = await res.text()
      expect(html).toContain('application/ld+json')
      expect(html).toContain('"@type":"Event"')
    })

    it('canonical points to /hackathons (SPA)', async () => {
      const res = await seo.request('http://localhost/s/hackathons')
      const html = await res.text()
      expect(html).toContain('<link rel="canonical" href="http://localhost/hackathons">')
    })
  })

  describe('GET /s/datasets/agriculture-ai-africa', () => {
    it('returns 200 with text/html', async () => {
      const res = await seo.request('http://localhost/s/datasets/agriculture-ai-africa')
      expect(res.status).toBe(200)
      expect(res.headers.get('content-type')).toContain('text/html')
    })

    it('includes JSON-LD Dataset', async () => {
      const res = await seo.request('http://localhost/s/datasets/agriculture-ai-africa')
      const html = await res.text()
      expect(html).toContain('application/ld+json')
      expect(html).toContain('"@type":"Dataset"')
    })

    it('contains Access Methods section', async () => {
      const res = await seo.request('http://localhost/s/datasets/agriculture-ai-africa')
      const html = await res.text()
      expect(html).toContain('Access Methods')
    })

    it('links to API and agent manifest', async () => {
      const res = await seo.request('http://localhost/s/datasets/agriculture-ai-africa')
      const html = await res.text()
      expect(html).toContain('/api/models')
      expect(html).toContain('/.well-known/agent-capabilities.json')
    })

    it('is self-canonical', async () => {
      const res = await seo.request('http://localhost/s/datasets/agriculture-ai-africa')
      const html = await res.text()
      expect(html).toContain('<link rel="canonical" href="http://localhost/s/datasets/agriculture-ai-africa">')
    })
  })
})
