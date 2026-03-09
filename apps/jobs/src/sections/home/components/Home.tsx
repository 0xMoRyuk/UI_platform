import type { HomeProps } from '@/../product/sections/home/types'
import type { Job } from '@/../product/sections/jobs/types'
import { HeroSection } from './HeroSection'
import { FeaturedJobs } from './FeaturedJobs'
import { SectionPreviews } from './SectionPreviews'

interface HomeComponentProps extends HomeProps {
  featuredJobs?: Job[]
}

export function Home({
  hero,
  sectionPreviews,
  featuredJobs = [],
  onCtaClick,
  onSectionClick,
  onJobClick,
}: HomeComponentProps) {
  return (
    <main className="min-h-screen">
      <HeroSection hero={hero} onCtaClick={onCtaClick} />
      <FeaturedJobs
        jobs={featuredJobs}
        onJobClick={onJobClick}
        onViewAllClick={() => onCtaClick?.('/jobs')}
      />
      <SectionPreviews previews={sectionPreviews} onSectionClick={onSectionClick} />
    </main>
  )
}
