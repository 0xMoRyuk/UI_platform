import { describe, it, expect } from 'vitest'
import { PaginationParamsSchema, StandardErrorSchema } from '@/contract/schemas/common.schema'

describe('PaginationParamsSchema', () => {
  it('applies defaults', () => {
    const result = PaginationParamsSchema.parse({})
    expect(result.page).toBe(1)
    expect(result.limit).toBe(20)
  })

  it('coerces string to number', () => {
    const result = PaginationParamsSchema.parse({ page: '2', limit: '10' })
    expect(result.page).toBe(2)
    expect(result.limit).toBe(10)
  })

  it('rejects page < 1', () => {
    expect(() => PaginationParamsSchema.parse({ page: 0 })).toThrow()
  })

  it('rejects limit > 100', () => {
    expect(() => PaginationParamsSchema.parse({ limit: 101 })).toThrow()
  })

  it('rejects non-integer page', () => {
    expect(() => PaginationParamsSchema.parse({ page: 1.5 })).toThrow()
  })
})

describe('StandardErrorSchema', () => {
  it('validates error shape', () => {
    const result = StandardErrorSchema.parse({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Resource not found' },
    })
    expect(result.success).toBe(false)
    expect(result.error.code).toBe('NOT_FOUND')
  })

  it('rejects success: true', () => {
    expect(() =>
      StandardErrorSchema.parse({
        success: true,
        error: { code: 'X', message: 'Y' },
      }),
    ).toThrow()
  })
})
