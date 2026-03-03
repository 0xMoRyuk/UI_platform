import type { Activity, ActivityTypeId } from '../../product/sections/ecosystem/types'
import type { PaginatedResult, PaginationParams } from './types'
import ecosystemData from '../../product/sections/ecosystem/data.json'

const allActivities = ecosystemData.activities as Activity[]

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

export interface ActivitySearchParams extends PaginationParams {
  type?: ActivityTypeId
  country?: string
}

export function searchActivities(params: ActivitySearchParams = {}): PaginatedResult<Activity> {
  const { type, country, page = 1, limit = 20 } = params

  let filtered = allActivities
  if (type) {
    filtered = filtered.filter((a) => a.type === type)
  }
  if (country) {
    filtered = filtered.filter((a) => a.location.countryCode === country)
  }

  return paginate(filtered, page, limit)
}

export function getActivityById(id: string): Activity | null {
  return allActivities.find((a) => a.id === id) ?? null
}
