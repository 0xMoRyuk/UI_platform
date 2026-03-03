import { describe, it, expect } from 'vitest'
import {
  SectorEnum,
  CountryCodeEnum,
  SearchModelsInputSchema,
  GetModelInputSchema,
  AIModelOutputSchema,
} from '@/contract/schemas/model.schema'

describe('SectorEnum', () => {
  it('accepts valid sectors', () => {
    expect(SectorEnum.parse('crop-science')).toBe('crop-science')
    expect(SectorEnum.parse('livestock')).toBe('livestock')
    expect(SectorEnum.parse('precision-farming')).toBe('precision-farming')
    expect(SectorEnum.parse('agri-finance')).toBe('agri-finance')
    expect(SectorEnum.parse('supply-chain')).toBe('supply-chain')
    expect(SectorEnum.parse('climate-resilience')).toBe('climate-resilience')
  })

  it('rejects invalid sector', () => {
    expect(() => SectorEnum.parse('mining')).toThrow()
  })
})

describe('CountryCodeEnum', () => {
  it('accepts valid country codes', () => {
    expect(CountryCodeEnum.parse('KE')).toBe('KE')
    expect(CountryCodeEnum.parse('NG')).toBe('NG')
  })

  it('rejects invalid country code', () => {
    expect(() => CountryCodeEnum.parse('US')).toThrow()
  })
})

describe('SearchModelsInputSchema', () => {
  it('accepts empty params with defaults', () => {
    const result = SearchModelsInputSchema.parse({})
    expect(result.page).toBe(1)
    expect(result.limit).toBe(20)
    expect(result.q).toBeUndefined()
    expect(result.sector).toBeUndefined()
    expect(result.country).toBeUndefined()
  })

  it('accepts single sector string', () => {
    const result = SearchModelsInputSchema.parse({ sector: 'crop-science' })
    expect(result.sector).toBe('crop-science')
  })

  it('accepts sector array', () => {
    const result = SearchModelsInputSchema.parse({ sector: ['crop-science', 'livestock'] })
    expect(result.sector).toEqual(['crop-science', 'livestock'])
  })

  it('accepts single country string', () => {
    const result = SearchModelsInputSchema.parse({ country: 'KE' })
    expect(result.country).toBe('KE')
  })

  it('accepts country array', () => {
    const result = SearchModelsInputSchema.parse({ country: ['KE', 'NG'] })
    expect(result.country).toEqual(['KE', 'NG'])
  })

  it('rejects invalid sector', () => {
    expect(() => SearchModelsInputSchema.parse({ sector: 'invalid' })).toThrow()
  })

  it('accepts text query', () => {
    const result = SearchModelsInputSchema.parse({ q: 'crop' })
    expect(result.q).toBe('crop')
  })
})

describe('GetModelInputSchema', () => {
  it('accepts valid id', () => {
    const result = GetModelInputSchema.parse({ id: 'model-001' })
    expect(result.id).toBe('model-001')
  })

  it('rejects empty id', () => {
    expect(() => GetModelInputSchema.parse({ id: '' })).toThrow()
  })
})

describe('AIModelOutputSchema', () => {
  it('validates a complete model', () => {
    const model = {
      id: 'model-001',
      name: 'AgriYield Predictor',
      shortDescription: 'ML model for crop yields',
      fullDescription: 'Full description here',
      useCase: 'Farming optimization',
      technicalRequirements: 'Python 3.9+',
      sector: 'crop-science',
      country: 'KE',
      githubUrl: 'https://github.com/example',
      hackathonId: 'hack-001',
    }
    const result = AIModelOutputSchema.parse(model)
    expect(result.id).toBe('model-001')
  })

  it('allows optional hackathonId', () => {
    const model = {
      id: 'model-001',
      name: 'Test',
      shortDescription: 'Short',
      fullDescription: 'Full',
      useCase: 'Use',
      technicalRequirements: 'Reqs',
      sector: 'crop-science',
      country: 'KE',
      githubUrl: 'https://github.com/example',
    }
    const result = AIModelOutputSchema.parse(model)
    expect(result.hackathonId).toBeUndefined()
  })

  it('rejects invalid sector', () => {
    expect(() =>
      AIModelOutputSchema.parse({
        id: 'x',
        name: 'x',
        shortDescription: 'x',
        fullDescription: 'x',
        useCase: 'x',
        technicalRequirements: 'x',
        sector: 'invalid',
        country: 'KE',
        githubUrl: 'x',
      }),
    ).toThrow()
  })
})
