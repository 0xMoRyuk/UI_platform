'use client'

import { useRouter } from 'next/navigation'
import { Ecosystem } from './components'
import type { ActivityTypeId, CountryCode, EcosystemPageProps } from '@/../product/sections/ecosystem/types'
import ecosystemDataRaw from '@/../product/sections/ecosystem/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const ecosystemData = ecosystemDataRaw as unknown as Omit<EcosystemPageProps, 'onTypeFilter' | 'onCountryFilter' | 'onActivityClick' | 'onMapMarkerClick' | 'onResourceDownload' | 'onWomenFoundersCta'>

export function EcosystemPreview() {
  const router = useRouter()

  const handleTypeFilter = (type: ActivityTypeId | null) => {
    console.log('Type filter:', type)
  }

  const handleCountryFilter = (country: CountryCode | null) => {
    console.log('Country filter:', country)
  }

  const handleActivityClick = (activityId: string) => {
    console.log('Activity clicked:', activityId)
  }

  const handleMapMarkerClick = (activityId: string) => {
    console.log('Map marker clicked:', activityId)
  }

  const handleResourceDownload = (activityId: string, resourceUrl: string) => {
    console.log('Resource download:', activityId, resourceUrl)
    window.open(resourceUrl, '_blank', 'noopener,noreferrer')
  }

  const handleWomenFoundersCta = () => {
    console.log('Women Founders CTA clicked')
    router.push(ecosystemData.womenFounders.ctaLink)
  }

  return (
    <Ecosystem
      activityTypes={ecosystemData.activityTypes}
      activities={ecosystemData.activities}
      womenFounders={ecosystemData.womenFounders}
      countries={ecosystemData.countries}
      pageContent={ecosystemData.pageContent}
      onTypeFilter={handleTypeFilter}
      onCountryFilter={handleCountryFilter}
      onActivityClick={handleActivityClick}
      onMapMarkerClick={handleMapMarkerClick}
      onResourceDownload={handleResourceDownload}
      onWomenFoundersCta={handleWomenFoundersCta}
    />
  )
}
