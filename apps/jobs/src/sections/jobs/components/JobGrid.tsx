import { JobCard } from './JobCard'
import type { JobGridProps } from '@/../product/sections/jobs/types'

export function JobGrid({ jobs, onJobClick }: JobGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobClick?.(job.slug)} />
      ))}
    </div>
  )
}
