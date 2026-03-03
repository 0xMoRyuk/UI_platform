import type { Hackathon } from '../../product/sections/hackathons/types'
import type { AIModel } from '../../product/sections/toolbox/types'
import type { HackathonSearchParams, PaginatedResult } from './types'
import hackathonsData from '../../product/sections/hackathons/data.json'
import toolboxData from '../../product/sections/toolbox/data.json'

const allHackathons = hackathonsData.hackathons as Hackathon[]
const allModels = toolboxData.aiModels as AIModel[]

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

export function searchHackathons(params: HackathonSearchParams = {}): PaginatedResult<Hackathon> {
  const { country, page = 1, limit = 20 } = params

  const filtered = country
    ? allHackathons.filter((h) => h.location.countryCode === country)
    : allHackathons

  return paginate(filtered, page, limit)
}

export function getHackathonBySlug(slug: string): Hackathon | null {
  return allHackathons.find((h) => h.slug === slug) ?? null
}

export function getHackathonById(id: string): Hackathon | null {
  return allHackathons.find((h) => h.id === id) ?? null
}

/** Resolve modelIds to actual AIModel objects */
export function resolveHackathonModels(hackathon: Hackathon): AIModel[] {
  return hackathon.modelIds
    .map((id) => allModels.find((m) => m.id === id))
    .filter((m): m is AIModel => m != null)
}
