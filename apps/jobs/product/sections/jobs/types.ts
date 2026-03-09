export interface JobCompany {
  id: string
  name: string
  logo: string | null
}

export interface JobSalary {
  min: number
  max: number
  currency: string
  period: string
}

export interface Job {
  id: string
  slug: string
  title: string
  company: JobCompany
  location: string
  type: string
  sector: string
  salary: JobSalary
  description: string
  requirements: string[]
  tags: string[]
  postedAt: string
  featured: boolean
}

export interface JobFilters {
  types: string[]
  sectors: string[]
  locations: string[]
}

export interface JobsPageContent {
  title: string
  subtitle: string
  emptyState: string
  searchPlaceholder: string
}

export interface JobsData {
  pageContent: JobsPageContent
  filters: JobFilters
  jobs: Job[]
}

export interface JobCardProps {
  job: Job
  onClick?: () => void
}

export interface JobGridProps {
  jobs: Job[]
  onJobClick?: (slug: string) => void
}

export interface JobSearchParams {
  q?: string
  type?: string
  sector?: string
  location?: string
  page?: number
  limit?: number
}

export interface JobDetailProps {
  job: Job
  relatedJobs: Job[]
  onBackClick?: () => void
  onJobClick?: (slug: string) => void
}
