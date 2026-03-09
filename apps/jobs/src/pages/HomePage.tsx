'use client'

import { useNavigate } from 'react-router-dom'
import { Home } from '@/sections/home/components'
import type { HomeProps } from '@/../product/sections/home/types'
import type { Job } from '@/../product/sections/jobs/types'
import homeDataRaw from '@/../product/sections/home/data.json'
import jobsDataRaw from '@/../product/sections/jobs/data.json'

const homeData = homeDataRaw as unknown as Omit<HomeProps, 'onCtaClick' | 'onStatClick' | 'onSectionClick' | 'onJobClick'>
const jobsData = jobsDataRaw as unknown as { jobs: Job[] }

export function HomePage() {
  const navigate = useNavigate()

  const featuredJobs = jobsData.jobs.filter((j) => j.featured)

  return (
    <Home
      hero={homeData.hero}
      stats={homeData.stats}
      sectionPreviews={homeData.sectionPreviews}
      featuredJobs={featuredJobs}
      onCtaClick={(link) => navigate(link)}
      onSectionClick={(_id, link) => navigate(link)}
      onJobClick={(slug) => navigate(`/jobs/${slug}`)}
    />
  )
}
