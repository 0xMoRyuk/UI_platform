import type { HomeProps } from '../types'
import { HeroSection } from './HeroSection'
import { KPIGrid } from './KPIGrid'
import { ToolboxHighlight } from './ToolboxHighlight'
import { SectionPreviews } from './SectionPreviews'

export function Home({
  hero,
  kpis,
  featuredModels,
  sectionPreviews,
  onCtaClick,
  onKpiClick,
  onModelClick,
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
        onKpiClick={onKpiClick}
      />

      {/* Toolbox Highlight */}
      <ToolboxHighlight
        featuredModels={featuredModels}
        onModelClick={onModelClick}
        onViewAllClick={() => onCtaClick?.('/toolbox')}
      />

      {/* Section Previews */}
      <SectionPreviews
        previews={sectionPreviews}
        onSectionClick={onSectionClick}
      />
    </main>
  )
}
