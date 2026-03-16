'use client'

import { useRouter } from 'next/navigation'
import { Home } from './components'
import type { HomeProps } from '@/../product/sections/home/types'
import homeDataRaw from '@/../product/sections/home/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const homeData = homeDataRaw as unknown as Omit<HomeProps, 'onCtaClick' | 'onKpiClick' | 'onSectionClick' | 'onCountryClick'>

export function HomePreview() {
  const router = useRouter()

  const handleCtaClick = (link: string) => {
    router.push(link)
  }

  const handleKpiClick = (kpiId: string, link: string) => {
    console.log('KPI clicked:', kpiId)
    router.push(link)
  }

  const handleSectionClick = (sectionId: string, link: string) => {
    console.log('Section clicked:', sectionId)
    router.push(link)
  }

  return (
    <Home
      hero={homeData.hero}
      kpis={homeData.kpis}
      kpiSection={homeData.kpiSection}
      about={homeData.about}
      sectionPreviews={homeData.sectionPreviews}
      countries={homeData.countries}
      onCtaClick={handleCtaClick}
      onKpiClick={handleKpiClick}
      onSectionClick={handleSectionClick}
    />
  )
}
