import type { HomeProps } from '@/../product/sections/home/types'
import { HeroSection } from './HeroSection'
import { KPIGrid } from './KPIGrid'
import { ToolboxHighlight } from './ToolboxHighlight'
import { SectionPreviews } from './SectionPreviews'

export function Home({
  hero,
  kpis,
  kpiSection,
  featuredModels,
  toolboxHighlight,
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
        kpiSection={kpiSection}
        onKpiClick={onKpiClick}
      />

      {/* Toolbox Highlight */}
      <ToolboxHighlight
        featuredModels={featuredModels}
        toolboxHighlight={toolboxHighlight}
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
