import type { HomeProps } from '@/../product/sections/home/types'
import { HeroSection } from './HeroSection'
import { KPIGrid } from './KPIGrid'
import { AboutSection } from './AboutSection'
import { SectionPreviews } from './SectionPreviews'

export function Home({
  hero,
  kpis,
  kpiSection,
  about,
  sectionPreviews,
  onCtaClick,
  onKpiClick,
  onSectionClick,
}: HomeProps) {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        hero={hero}
        onCtaClick={onCtaClick}
      />

      {/* KPI Grid */}
      <KPIGrid
        kpis={kpis}
        kpiSection={kpiSection}
        onKpiClick={onKpiClick}
      />

      {/* About AI4Startups */}
      <AboutSection about={about} />

      {/* Section Previews */}
      <SectionPreviews
        previews={sectionPreviews}
        onSectionClick={onSectionClick}
      />
    </main>
  )
}
