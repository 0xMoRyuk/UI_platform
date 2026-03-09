export type { Job, JobCompany, JobSalary, JobSearchParams } from '@/../product/sections/jobs/types'
export type { Company } from '@/../product/sections/companies/types'

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginationParams {
  page?: number
  limit?: number
}
