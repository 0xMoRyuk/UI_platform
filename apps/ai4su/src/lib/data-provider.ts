/**
 * Data provider wrapping domain functions for React components.
 * Provides the same data shapes that pages currently get from direct JSON imports,
 * but sourced through the domain layer.
 */
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

import type {
  AIModel,
  Sector,
  CountryCode,
  FilterOptions,
  Study,
  BestPractices,
  FinalReport,
} from '@/domain/types'

export type { AIModel, Sector, CountryCode, FilterOptions, Study, BestPractices, FinalReport }

/** Get all models (unpaginated, for UI compatibility) */
export function getAllModels(): AIModel[] {
  return searchModels({ limit: 100 }).data
}

/** Filter models with text, sectors, and countries — matches Toolbox.tsx filter shape */
export function filterModels(query: string, sectors: Sector[], countries: CountryCode[]): AIModel[] {
  return searchModels({
    q: query || undefined,
    sector: sectors.length > 0 ? sectors : undefined,
    country: countries.length > 0 ? countries : undefined,
    limit: 100,
  }).data
}

export { getModelById, getAvailableFilters, getAllStudies, getStudyById, getAllBestPractices, getBestPracticeById, getFinalReport }
