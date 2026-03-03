import { describe, it, expect } from 'vitest'
import {
  searchModels,
  getModelById,
  getAvailableFilters,
  getAllStudies,
  getStudyById,
  getAllBestPractices,
  getBestPracticeById,
  getFinalReport,
} from '@/domain/models'

describe('searchModels', () => {
  it('returns all 24 models with no filters', () => {
    const result = searchModels()
    expect(result.total).toBe(24)
    expect(result.page).toBe(1)
    expect(result.totalPages).toBeGreaterThanOrEqual(1)
  })

  it('paginates results', () => {
    const result = searchModels({ page: 1, limit: 5 })
    expect(result.data).toHaveLength(5)
    expect(result.total).toBe(24)
    expect(result.limit).toBe(5)
    expect(result.totalPages).toBe(5) // ceil(24/5) = 5
  })

  it('returns correct page 2', () => {
    const page1 = searchModels({ page: 1, limit: 10 })
    const page2 = searchModels({ page: 2, limit: 10 })
    expect(page1.data[0].id).not.toBe(page2.data[0].id)
    expect(page2.page).toBe(2)
  })

  it('clamps page to max', () => {
    const result = searchModels({ page: 999, limit: 20 })
    expect(result.page).toBe(result.totalPages)
    expect(result.data.length).toBeGreaterThan(0)
  })

  it('filters by text query on name', () => {
    const result = searchModels({ q: 'AgriYield' })
    expect(result.total).toBeGreaterThanOrEqual(1)
    expect(result.data.every((m) => m.name.toLowerCase().includes('agriyield'))).toBe(true)
  })

  it('filters by text query case-insensitively', () => {
    const result = searchModels({ q: 'agri' })
    expect(result.total).toBeGreaterThanOrEqual(1)
  })

  it('filters by single sector', () => {
    const result = searchModels({ sector: 'crop-science' })
    expect(result.total).toBeGreaterThanOrEqual(1)
    expect(result.data.every((m) => m.sector === 'crop-science')).toBe(true)
  })

  it('filters by multiple sectors (OR)', () => {
    const result = searchModels({ sector: ['crop-science', 'livestock'] })
    expect(result.total).toBeGreaterThanOrEqual(2)
    expect(result.data.every((m) => ['crop-science', 'livestock'].includes(m.sector))).toBe(true)
  })

  it('filters by single country', () => {
    const result = searchModels({ country: 'KE' })
    expect(result.total).toBeGreaterThanOrEqual(1)
    expect(result.data.every((m) => m.country === 'KE')).toBe(true)
  })

  it('filters by multiple countries (OR)', () => {
    const result = searchModels({ country: ['KE', 'NG'] })
    expect(result.data.every((m) => ['KE', 'NG'].includes(m.country))).toBe(true)
  })

  it('combines sector + country filters (AND)', () => {
    const result = searchModels({ sector: 'crop-science', country: 'KE' })
    expect(result.data.every((m) => m.sector === 'crop-science' && m.country === 'KE')).toBe(true)
  })

  it('combines text + sector filters (AND)', () => {
    const result = searchModels({ q: 'crop', sector: 'crop-science' })
    expect(result.data.every((m) => m.sector === 'crop-science')).toBe(true)
  })

  it('returns empty for no matches', () => {
    const result = searchModels({ q: 'xyznonexistent' })
    expect(result.total).toBe(0)
    expect(result.data).toHaveLength(0)
    expect(result.totalPages).toBe(1)
  })
})

describe('getModelById', () => {
  it('returns a model by id', () => {
    const model = getModelById('model-001')
    expect(model).not.toBeNull()
    expect(model!.id).toBe('model-001')
    expect(model!.name).toBeDefined()
  })

  it('returns null for unknown id', () => {
    expect(getModelById('nonexistent')).toBeNull()
  })
})

describe('getAvailableFilters', () => {
  it('returns sectors and countries', () => {
    const filters = getAvailableFilters()
    expect(filters.sectors).toHaveLength(6)
    expect(filters.countries).toHaveLength(8)
    expect(filters.sectors[0]).toHaveProperty('id')
    expect(filters.sectors[0]).toHaveProperty('label')
    expect(filters.countries[0]).toHaveProperty('code')
    expect(filters.countries[0]).toHaveProperty('name')
  })
})

describe('getAllStudies', () => {
  it('returns all studies', () => {
    const studies = getAllStudies()
    expect(studies).toHaveLength(4)
    expect(studies[0]).toHaveProperty('id')
    expect(studies[0]).toHaveProperty('title')
  })
})

describe('getStudyById', () => {
  it('returns a study by id', () => {
    const studies = getAllStudies()
    const study = getStudyById(studies[0].id)
    expect(study).not.toBeNull()
    expect(study!.id).toBe(studies[0].id)
  })

  it('returns null for unknown id', () => {
    expect(getStudyById('nonexistent')).toBeNull()
  })
})

describe('getAllBestPractices', () => {
  it('returns all best practices', () => {
    const bps = getAllBestPractices()
    expect(bps).toHaveLength(3)
    expect(bps[0]).toHaveProperty('id')
    expect(bps[0]).toHaveProperty('title')
  })
})

describe('getBestPracticeById', () => {
  it('returns a best practice by id', () => {
    const bps = getAllBestPractices()
    const bp = getBestPracticeById(bps[0].id)
    expect(bp).not.toBeNull()
    expect(bp!.id).toBe(bps[0].id)
  })

  it('returns null for unknown id', () => {
    expect(getBestPracticeById('nonexistent')).toBeNull()
  })
})

describe('getFinalReport', () => {
  it('returns the final report', () => {
    const report = getFinalReport()
    expect(report).toHaveProperty('title')
    expect(report).toHaveProperty('pdfUrl')
    expect(report).toHaveProperty('pages')
  })
})
