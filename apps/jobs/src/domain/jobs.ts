import type { Job, JobSearchParams, PaginatedResult } from './types'
import jobsDataRaw from '@/../product/sections/jobs/data.json'

const allJobs = (jobsDataRaw as unknown as { jobs: Job[] }).jobs

export function searchJobs(params: JobSearchParams = {}): PaginatedResult<Job> {
  const { q, type, sector, location, page = 1, limit = 20 } = params

  let filtered = [...allJobs]

  if (q) {
    const query = q.toLowerCase()
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.name.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.tags.some((t) => t.toLowerCase().includes(query)),
    )
  }

  if (type && type !== 'all') {
    filtered = filtered.filter((job) => job.type === type)
  }

  if (sector && sector !== 'all') {
    filtered = filtered.filter((job) => job.sector === sector)
  }

  if (location && location !== 'all') {
    filtered = filtered.filter((job) => job.location.includes(location))
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const data = filtered.slice(start, start + limit)

  return { data, total, page, limit, totalPages }
}

export function getJobBySlug(slug: string): Job | undefined {
  return allJobs.find((job) => job.slug === slug)
}

export function getAllSectors(): string[] {
  return [...new Set(allJobs.map((job) => job.sector))].sort()
}

export function getAllLocations(): string[] {
  return [...new Set(allJobs.map((job) => job.location))].sort()
}

export function getAllTypes(): string[] {
  return [...new Set(allJobs.map((job) => job.type))].sort()
}

export function getFeaturedJobs(): Job[] {
  return allJobs.filter((job) => job.featured)
}

export function getRelatedJobs(job: Job, limit = 4): Job[] {
  return allJobs
    .filter((j) => j.id !== job.id && (j.sector === job.sector || j.company.id === job.company.id))
    .slice(0, limit)
}
