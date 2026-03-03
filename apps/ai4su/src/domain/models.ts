import type { AIModel, ModelSearchParams, PaginatedResult, FilterOptions, Study, BestPractices, FinalReport } from './types'
import toolboxData from '../../product/sections/toolbox/data.json'

const allModels = toolboxData.aiModels as AIModel[]
const allStudies = toolboxData.studies as Study[]
const allBestPractices = toolboxData.bestPractices as BestPractices[]
const finalReport = toolboxData.finalReport as FinalReport
const filterOptions = toolboxData.filterOptions as FilterOptions

function paginate<T>(items: T[], page: number, limit: number): PaginatedResult<T> {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * limit
  return {
    data: items.slice(start, start + limit),
    total,
    page: safePage,
    limit,
    totalPages,
  }
}

/**
 * Search and filter models. Extracted from Toolbox.tsx useMemo (lines 38-62).
 * Filters: q (text search on name, shortDescription, sector),
 *          sector (single or array, OR within),
 *          country (single or array, OR within).
 * All filter dimensions are AND-combined.
 */
export function searchModels(params: ModelSearchParams = {}): PaginatedResult<AIModel> {
  const { q, sector, country, page = 1, limit = 20 } = params

  const sectors = sector ? (Array.isArray(sector) ? sector : [sector]) : []
  const countries = country ? (Array.isArray(country) ? country : [country]) : []

  const filtered = allModels.filter((model) => {
    if (q) {
      const query = q.toLowerCase()
      const matchesSearch =
        model.name.toLowerCase().includes(query) ||
        model.shortDescription.toLowerCase().includes(query) ||
        model.sector.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    if (sectors.length > 0 && !sectors.includes(model.sector)) {
      return false
    }

    if (countries.length > 0 && !countries.includes(model.country)) {
      return false
    }

    return true
  })

  return paginate(filtered, page, limit)
}

export function getModelById(id: string): AIModel | null {
  return allModels.find((m) => m.id === id) ?? null
}

export function getAvailableFilters(): FilterOptions {
  return filterOptions
}

export function getAllStudies(): Study[] {
  return allStudies
}

export function getStudyById(id: string): Study | null {
  return allStudies.find((s) => s.id === id) ?? null
}

export function getAllBestPractices(): BestPractices[] {
  return allBestPractices
}

export function getBestPracticeById(id: string): BestPractices | null {
  return allBestPractices.find((bp) => bp.id === id) ?? null
}

export function getFinalReport(): FinalReport {
  return finalReport
}
