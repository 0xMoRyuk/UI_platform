'use client'

import { Ecosystem } from '@/sections/ecosystem/components'
import type { EcosystemPageProps } from '@/../product/sections/ecosystem/types'
import ecosystemDataRaw from '@/../product/sections/ecosystem/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const ecosystemData = ecosystemDataRaw as unknown as Omit<EcosystemPageProps, 'onTypeFilter' | 'onCountryFilter' | 'onActivityClick' | 'onMapMarkerClick' | 'onResourceDownload' | 'onWomenFoundersCta'>

export function EcosystemPage() {
  const handleTypeFilter = (type: string | null) => {
    console.log('[Ecosystem] Type filter:', type)
    // Filtering is handled internally by Ecosystem component
  }

  const handleCountryFilter = (country: string | null) => {
    console.log('[Ecosystem] Country filter:', country)
    // Filtering is handled internally by Ecosystem component
  }

  const handleActivityClick = (activityId: string) => {
    console.log('[Ecosystem] Activity clicked:', activityId)
    // Handled by component expansion
  }

  const handleMapMarkerClick = (activityId: string) => {
    console.log('[Ecosystem] Map marker clicked:', activityId)
    // Scroll handled internally by Ecosystem component
  }

  const handleResourceDownload = (resourceId: string) => {
    console.log('[Ecosystem] Resource download:', resourceId)
    // Find resource and open
    for (const activity of ecosystemData.activities) {
      const resource = activity.resources?.find((r: { title: string; url: string }) => r.title === resourceId || r.url.includes(resourceId))
      if (resource) {
        window.open(resource.url, '_blank')
        break
      }
    }
  }

  const handleWomenFoundersCta = () => {
    console.log('[Ecosystem] Women Founders CTA clicked')
    window.open(ecosystemData.womenFounders.ctaLink, '_self')
  }

  return (
    <Ecosystem
      activityTypes={ecosystemData.activityTypes}
      activities={ecosystemData.activities}
      womenFounders={ecosystemData.womenFounders}
      countries={ecosystemData.countries}
      onTypeFilter={handleTypeFilter}
      onCountryFilter={handleCountryFilter}
      onActivityClick={handleActivityClick}
      onMapMarkerClick={handleMapMarkerClick}
      onResourceDownload={handleResourceDownload}
      onWomenFoundersCta={handleWomenFoundersCta}
    />
  )
}
