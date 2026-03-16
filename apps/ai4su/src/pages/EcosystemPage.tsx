'use client'

import { useMemo } from 'react'
import { Ecosystem } from '@/sections/ecosystem/components'
import type { EcosystemPageProps, Activity } from '@/../product/sections/ecosystem/types'
import type { Hackathon } from '@/../product/sections/hackathons/types'
import ecosystemDataRaw from '@/../product/sections/ecosystem/data.json'
import hackathonsDataRaw from '@/../product/sections/hackathons/data.json'

// Cast JSON data to proper types
const ecosystemData = ecosystemDataRaw as unknown as Omit<EcosystemPageProps, 'onTypeFilter' | 'onCountryFilter' | 'onActivityClick' | 'onMapMarkerClick' | 'onResourceDownload' | 'onWomenFoundersCta'>
const hackathonsData = (hackathonsDataRaw as unknown as { hackathons: Hackathon[] }).hackathons

// City → coordinates lookup from ecosystem activities
const cityCoordinates: Record<string, [number, number]> = {
  'Nairobi': [-1.2864, 36.8172],
  'Lagos': [6.5244, 3.3792],
  'Accra': [5.6037, -0.187],
  'Cairo': [30.0444, 31.2357],
  'Dakar': [14.6928, -17.4467],
  'Kigali': [-1.9403, 29.8739],
  'Johannesburg': [-26.2041, 28.0473],
  'Casablanca': [33.5731, -7.5898],
}

function hackathonToActivity(h: Hackathon): Activity {
  return {
    id: h.id,
    title: h.name,
    type: 'hackathon',
    description: h.description,
    fullDescription: h.description,
    startDate: h.startDate,
    endDate: h.endDate,
    location: {
      venue: h.location.venue,
      city: h.location.city,
      country: h.location.country,
      countryCode: h.location.countryCode,
      coordinates: cityCoordinates[h.location.city] || [0, 0],
    },
    participantCount: h.participantCount,
    highlights: [
      `${h.teamCount} teams`,
      `${h.modelsProduced} AI models produced`,
      h.theme,
    ],
    photos: h.photos.slice(0, 3).map((p) => ({ id: p.id, url: p.url, caption: p.caption })),
    resources: h.challengeBrief
      ? [{ title: 'Challenge Brief', type: 'pdf' as const, url: h.challengeBrief.pdfUrl }]
      : [],
  }
}

export function EcosystemPage() {
  const allActivities = useMemo(() => {
    const hackathonActivities = hackathonsData.map(hackathonToActivity)
    return [...hackathonActivities, ...ecosystemData.activities]
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }, [])

  const handleTypeFilter = (type: string | null) => {
    console.log('[Ecosystem] Type filter:', type)
  }

  const handleCountryFilter = (country: string | null) => {
    console.log('[Ecosystem] Country filter:', country)
  }

  const handleActivityClick = (activityId: string) => {
    console.log('[Ecosystem] Activity clicked:', activityId)
  }

  const handleMapMarkerClick = (activityId: string) => {
    console.log('[Ecosystem] Map marker clicked:', activityId)
  }

  const handleResourceDownload = (resourceId: string) => {
    console.log('[Ecosystem] Resource download:', resourceId)
    for (const activity of allActivities) {
      const resource = activity.resources?.find((r) => r.title === resourceId || r.url.includes(resourceId))
      if (resource) {
        window.open(resource.url, '_blank')
        break
      }
    }
  }

  return (
    <Ecosystem
      activityTypes={ecosystemData.activityTypes}
      activities={allActivities}
      countries={ecosystemData.countries}
      pageContent={ecosystemData.pageContent}
      onTypeFilter={handleTypeFilter}
      onCountryFilter={handleCountryFilter}
      onActivityClick={handleActivityClick}
      onMapMarkerClick={handleMapMarkerClick}
      onResourceDownload={handleResourceDownload}
    />
  )
}
