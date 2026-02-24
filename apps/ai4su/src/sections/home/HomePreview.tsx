'use client'

import { useRouter } from 'next/navigation'
import { Home } from './components'
import type { HomeProps } from '@/../product/sections/home/types'
import homeDataRaw from '@/../product/sections/home/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const homeData = homeDataRaw as unknown as Omit<HomeProps, 'onCtaClick' | 'onKpiClick' | 'onModelClick' | 'onSectionClick' | 'onCountryClick'>

export function HomePreview() {
  const router = useRouter()

  const handleCtaClick = (link: string) => {
    router.push(link)
  }

  const handleKpiClick = (kpiId: string, link: string) => {
    console.log('KPI clicked:', kpiId)
    router.push(link)
  }

  const handleModelClick = (modelId: string) => {
    console.log('Model clicked:', modelId)
    router.push(`/toolbox/models/${modelId}`)
  }

  const handleSectionClick = (sectionId: string, link: string) => {
    console.log('Section clicked:', sectionId)
    router.push(link)
  }

  return (
    <Home
      hero={homeData.hero}
      kpis={homeData.kpis}
      featuredModels={homeData.featuredModels}
      sectionPreviews={homeData.sectionPreviews}
      countries={homeData.countries}
      kpiSection={homeData.kpiSection}
      toolboxHighlight={homeData.toolboxHighlight}
      onCtaClick={handleCtaClick}
      onKpiClick={handleKpiClick}
      onModelClick={handleModelClick}
      onSectionClick={handleSectionClick}
    />
  )
}
