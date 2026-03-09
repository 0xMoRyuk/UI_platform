import { useState, useMemo } from 'react'
import type { Job, JobsPageContent, JobFilters } from '@/../product/sections/jobs/types'
import { SearchBar } from './SearchBar'
import { FilterBar } from './FilterBar'
import { JobGrid } from './JobGrid'

interface JobsProps {
  jobs: Job[]
  pageContent: JobsPageContent
  filters: JobFilters
  initialQuery?: string
  onJobClick?: (slug: string) => void
}

export function Jobs({ jobs, pageContent, filters, initialQuery = '', onJobClick }: JobsProps) {
  const [query, setQuery] = useState(initialQuery)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Text search
      if (query) {
        const q = query.toLowerCase()
        const match =
          job.title.toLowerCase().includes(q) ||
          job.company.name.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.tags.some((t) => t.toLowerCase().includes(q))
        if (!match) return false
      }
      // Filters
      if (selectedType !== 'all' && job.type !== selectedType) return false
      if (selectedSector !== 'all' && job.sector !== selectedSector) return false
      if (selectedLocation !== 'all' && !job.location.includes(selectedLocation)) return false
      return true
    })
  }, [jobs, query, selectedType, selectedSector, selectedLocation])

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{pageContent.title}</h1>
          <p className="text-muted-foreground">{pageContent.subtitle}</p>
        </div>

        {/* Search + Filters */}
        <div className="space-y-4 mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={pageContent.searchPlaceholder}
          />
          <FilterBar
            types={filters.types}
            sectors={filters.sectors}
            locations={filters.locations}
            selectedType={selectedType}
            selectedSector={selectedSector}
            selectedLocation={selectedLocation}
            onTypeChange={setSelectedType}
            onSectorChange={setSelectedSector}
            onLocationChange={setSelectedLocation}
          />
        </div>

        {/* Results */}
        {filteredJobs.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>
            <JobGrid jobs={filteredJobs} onJobClick={onJobClick} />
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">{pageContent.emptyState}</p>
          </div>
        )}
      </div>
    </section>
  )
}
