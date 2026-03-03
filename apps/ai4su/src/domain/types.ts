import type { AIModel, Sector, CountryCode, FilterOptions, Study, BestPractices, FinalReport } from '../../product/sections/toolbox/types'
import type { Hackathon } from '../../product/sections/hackathons/types'

export type { AIModel, Sector, CountryCode, FilterOptions, Study, BestPractices, FinalReport, Hackathon }

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ModelSearchParams extends PaginationParams {
  q?: string
  sector?: Sector | Sector[]
  country?: CountryCode | CountryCode[]
}

export interface HackathonSearchParams extends PaginationParams {
  country?: CountryCode
}
