'use client'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { Jobs } from '@/sections/jobs/components'
import type { JobsData } from '@/../product/sections/jobs/types'
import jobsDataRaw from '@/../product/sections/jobs/data.json'

const jobsData = jobsDataRaw as unknown as JobsData

export function JobsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  return (
    <Jobs
      jobs={jobsData.jobs}
      pageContent={jobsData.pageContent}
      filters={jobsData.filters}
      initialQuery={initialQuery}
      onJobClick={(slug) => navigate(`/jobs/${slug}`)}
    />
  )
}
