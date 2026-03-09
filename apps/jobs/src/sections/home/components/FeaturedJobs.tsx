import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JobCard } from '@/sections/jobs/components/JobCard'
import type { Job } from '@/../product/sections/jobs/types'

interface FeaturedJobsProps {
  jobs: Job[]
  onJobClick?: (slug: string) => void
  onViewAllClick?: () => void
}

export function FeaturedJobs({ jobs, onJobClick, onViewAllClick }: FeaturedJobsProps) {
  if (jobs.length === 0) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <p className="text-muted-foreground mt-1">Hand-picked opportunities from top companies</p>
          </div>
          <Button
            variant="ghost"
            onClick={onViewAllClick}
            className="hidden sm:flex gap-2 group"
          >
            View All Jobs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => onJobClick?.(job.slug)} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" onClick={onViewAllClick} className="gap-2">
            View All Jobs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
