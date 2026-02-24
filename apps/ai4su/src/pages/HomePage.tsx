'use client'

import { useNavigate } from 'react-router-dom'
import { Home } from '@/sections/home/components'
import type { HomeProps } from '@/../product/sections/home/types'
import homeDataRaw from '@/../product/sections/home/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const homeData = homeDataRaw as unknown as Omit<HomeProps, 'onCtaClick' | 'onKpiClick' | 'onModelClick' | 'onSectionClick'>

export function HomePage() {
  const navigate = useNavigate()

  const handleCtaClick = (link: string) => {
    navigate(link)
  }

  const handleKpiClick = (kpiId: string, link: string) => {
    console.log('[Home] KPI clicked:', kpiId)
    navigate(link)
  }

  const handleModelClick = (modelId: string) => {
    console.log('[Home] Model clicked:', modelId)
    navigate(`/toolbox?model=${modelId}`)
  }

  const handleSectionClick = (sectionId: string, link: string) => {
    console.log('[Home] Section clicked:', sectionId)
    navigate(link)
  }

  return (
    <Home
      hero={homeData.hero}
      kpis={homeData.kpis}
      kpiSection={homeData.kpiSection}
      featuredModels={homeData.featuredModels}
      toolboxHighlight={homeData.toolboxHighlight}
      sectionPreviews={homeData.sectionPreviews}
      countries={homeData.countries}
      onCtaClick={handleCtaClick}
      onKpiClick={handleKpiClick}
      onModelClick={handleModelClick}
      onSectionClick={handleSectionClick}
    />
  )
}
