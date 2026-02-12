'use client'

import { useState, useMemo } from 'react'
import type { EcosystemPageProps, ActivityTypeId, CountryCode } from '@/../product/sections/ecosystem/types'
import { EcosystemHero } from './EcosystemHero'
import { WomenFoundersSection } from './WomenFoundersSection'
import { ActivityFilter } from './ActivityFilter'
import { ActivityList } from './ActivityList'
import { ActivityMap } from './ActivityMap'
import { MobileMapToggle } from './MobileMapToggle'

export function Ecosystem({
  activityTypes,
  activities,
  womenFounders,
  countries,
  onTypeFilter,
  onCountryFilter,
  onActivityClick,
  onMapMarkerClick,
  onResourceDownload: _onResourceDownload,
  onWomenFoundersCta,
}: EcosystemPageProps) {
  // Note: onResourceDownload is available for future use via _onResourceDownload
  void _onResourceDownload
  const [selectedType, setSelectedType] = useState<ActivityTypeId | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null)
  const [highlightedActivityId, setHighlightedActivityId] = useState<string | null>(null)
  const [isMobileMapVisible, setIsMobileMapVisible] = useState(false)

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      if (selectedType && activity.type !== selectedType) return false
      if (selectedCountry && activity.location.countryCode !== selectedCountry) return false
      return true
    })
  }, [activities, selectedType, selectedCountry])

  // Calculate totals
  const totalParticipants = activities.reduce((sum, a) => sum + a.participantCount, 0)

  const handleTypeChange = (type: ActivityTypeId | null) => {
    setSelectedType(type)
    onTypeFilter?.(type)
  }

  const handleCountryChange = (country: CountryCode | null) => {
    setSelectedCountry(country)
    onCountryFilter?.(country)
  }

  const handleActivityClick = (activityId: string) => {
    setHighlightedActivityId(activityId)
    onActivityClick?.(activityId)
  }

  const handleMapMarkerClick = (activityId: string) => {
    setHighlightedActivityId(activityId)
    onMapMarkerClick?.(activityId)

    // Scroll to activity card
    const element = document.getElementById(`activity-${activityId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    // Close mobile map after selection
    setIsMobileMapVisible(false)
  }

  const handleMarkerHover = (activityId: string | null) => {
    setHighlightedActivityId(activityId)
  }

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero */}
      <EcosystemHero
        totalActivities={activities.length}
        totalParticipants={totalParticipants}
        countriesCount={countries.length}
      />

      {/* Women Founders Section */}
      <WomenFoundersSection
        program={womenFounders}
        onCtaClick={onWomenFoundersCta || (() => {})}
      />

      {/* Activities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-2">
              All Activities
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              {filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'}
              {selectedType || selectedCountry ? ' matching filters' : ' across Africa'}
            </p>
          </div>

          {/* Filters */}
          <ActivityFilter
            activityTypes={activityTypes}
            selectedType={selectedType}
            selectedCountry={selectedCountry}
            countries={countries}
            onTypeChange={handleTypeChange}
            onCountryChange={handleCountryChange}
          />

          {/* Split layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Map - hidden on mobile by default */}
            <div className={`
              lg:w-2/5 lg:sticky lg:top-4 lg:self-start
              ${isMobileMapVisible
                ? 'fixed inset-0 z-50 p-4 bg-black/50 lg:relative lg:p-0 lg:bg-transparent'
                : 'hidden lg:block'
              }
            `}>
              <div className="h-[500px] lg:h-[600px]">
                <ActivityMap
                  activities={filteredActivities}
                  activityTypes={activityTypes}
                  selectedActivityId={highlightedActivityId}
                  onMarkerClick={handleMapMarkerClick}
                  onMarkerHover={handleMarkerHover}
                />
              </div>
            </div>

            {/* Activity list */}
            <div className="lg:w-3/5">
              <ActivityList
                activities={filteredActivities}
                activityTypes={activityTypes}
                highlightedActivityId={highlightedActivityId}
                onActivityClick={handleActivityClick}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile map toggle */}
      <MobileMapToggle
        isMapVisible={isMobileMapVisible}
        onToggle={() => setIsMobileMapVisible(!isMobileMapVisible)}
      />
    </main>
  )
}
