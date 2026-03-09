'use client'

import { useParams, useNavigate } from 'react-router-dom'
import { JobDetail } from '@/sections/jobs/components'
import type { Job } from '@/../product/sections/jobs/types'
import jobsDataRaw from '@/../product/sections/jobs/data.json'

const jobsData = jobsDataRaw as unknown as { jobs: Job[] }

export function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const job = jobsData.jobs.find((j) => j.slug === slug)

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <button
            onClick={() => navigate('/jobs')}
            className="text-stone-600 hover:underline"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    )
  }

  // Related jobs: same sector or company, excluding current
  const relatedJobs = jobsData.jobs.filter(
    (j) => j.id !== job.id && (j.sector === job.sector || j.company.id === job.company.id),
  )

  return (
    <JobDetail
      job={job}
      relatedJobs={relatedJobs}
      onBackClick={() => navigate('/jobs')}
      onJobClick={(s) => navigate(`/jobs/${s}`)}
    />
  )
}
