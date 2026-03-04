import type { AIModel, Sector, CountryCode, FilterOptions, Study, BestPractices, FinalReport } from '../../product/sections/toolbox/types'
import type { Hackathon } from '../../product/sections/hackathons/types'

export type { AIModel, Sector, CountryCode, FilterOptions, Study, BestPractices, FinalReport, Hackathon }

/** Shared country entry from product/shared/countries.json */
export interface Country {
  code: string
  name: string
  flag: string
}

/** Shared sector entry from product/shared/sectors.json */
export interface SectorEntry {
  id: Sector
  label: string
  color: string
}

/** Site configuration from product/site.json */
export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  url: string
  themeColor: string
  og: {
    title: string
    description: string
    type: string
  }
  seo: {
    titleSuffix: string
  }
  links: {
    agentManifest: string
    modelsApi: string
    hackathonsApi: string
    sitemap: string
    llmTxt: string
  }
}

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
