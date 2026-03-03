import { describe, it, expect } from 'vitest'
import { seo } from '@/seo'

describe('SEO discovery files', () => {
  describe('GET /robots.txt', () => {
    it('returns 200 with text/plain', async () => {
      const res = await seo.request('http://localhost/robots.txt')
      expect(res.status).toBe(200)
      expect(res.headers.get('content-type')).toContain('text/plain')
    })

    it('contains Sitemap directive', async () => {
      const res = await seo.request('http://localhost/robots.txt')
      const text = await res.text()
      expect(text).toContain('Sitemap:')
      expect(text).toContain('/sitemap.xml')
    })

    it('allows all user agents', async () => {
      const res = await seo.request('http://localhost/robots.txt')
      const text = await res.text()
      expect(text).toContain('User-agent: *')
      expect(text).toContain('Allow: /')
    })
  })

  describe('GET /sitemap.xml', () => {
    it('returns 200 with application/xml', async () => {
      const res = await seo.request('http://localhost/sitemap.xml')
      expect(res.status).toBe(200)
      expect(res.headers.get('content-type')).toContain('application/xml')
    })

    it('contains urlset root element', async () => {
      const res = await seo.request('http://localhost/sitemap.xml')
      const xml = await res.text()
      expect(xml).toContain('<urlset')
      expect(xml).toContain('</urlset>')
    })

    it('includes /s/models and /models', async () => {
      const res = await seo.request('http://localhost/sitemap.xml')
      const xml = await res.text()
      expect(xml).toContain('/s/models')
      expect(xml).toContain('http://localhost/models')
    })

    it('includes all 24 individual model URLs', async () => {
      const res = await seo.request('http://localhost/sitemap.xml')
      const xml = await res.text()
      const modelUrlMatches = xml.match(/\/models\/[^<]+/g) ?? []
      // 24 individual + /models and /s/models
      expect(modelUrlMatches.length).toBeGreaterThanOrEqual(24)
    })

    it('includes all 8 hackathon slug URLs', async () => {
      const res = await seo.request('http://localhost/sitemap.xml')
      const xml = await res.text()
      const hackathonUrlMatches = xml.match(/\/hackathons\/[^<]+/g) ?? []
      expect(hackathonUrlMatches.length).toBeGreaterThanOrEqual(8)
    })
  })

  describe('GET /llm.txt', () => {
    it('returns 200 with text/plain', async () => {
      const res = await seo.request('http://localhost/llm.txt')
      expect(res.status).toBe(200)
      expect(res.headers.get('content-type')).toContain('text/plain')
    })

    it('contains all 24 model references', async () => {
      const res = await seo.request('http://localhost/llm.txt')
      const text = await res.text()
      expect(text).toContain('## Models (24)')
    })

    it('contains API URLs', async () => {
      const res = await seo.request('http://localhost/llm.txt')
      const text = await res.text()
      expect(text).toContain('/api/models')
      expect(text).toContain('/api/hackathons')
      expect(text).toContain('/.well-known/agent-capabilities.json')
    })

    it('contains sections header and countries', async () => {
      const res = await seo.request('http://localhost/llm.txt')
      const text = await res.text()
      expect(text).toContain('## Sectors')
      expect(text).toContain('## Countries')
      expect(text).toContain('Kenya')
    })
  })
})
