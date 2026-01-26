'use client'

import { useState, useMemo } from 'react'
import { Trophy } from 'lucide-react'
import type { HackathonsPageProps, CountryCode } from '@/../product/sections/hackathons/types'
import { MethodologySection } from './MethodologySection'
import { CountryFilter } from './CountryFilter'
import { HackathonGrid } from './HackathonGrid'

export function Hackathons({
  methodology,
  hackathons,
  onHackathonClick,
  onCountryFilter,
}: HackathonsPageProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null)

  const filteredHackathons = useMemo(() => {
    if (!selectedCountry) return hackathons
    return hackathons.filter((h) => h.location.countryCode === selectedCountry)
  }, [hackathons, selectedCountry])

  const handleCountryChange = (country: CountryCode | null) => {
    setSelectedCountry(country)
    onCountryFilter?.(country)
  }

  const handleHackathonClick = (slug: string) => {
    onHackathonClick?.(slug)
  }

  // Calculate totals
  const totalParticipants = hackathons.reduce((sum, h) => sum + h.participantCount, 0)
  const totalModels = hackathons.reduce((sum, h) => sum + h.modelsProduced, 0)

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-[#003399] via-[#002266] to-[#001133] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[#F5CE2A]/20 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-[#F5CE2A]" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold font-[Barlow]">
                Hackathons
              </h1>
              <p className="text-white/70 text-lg">
                {hackathons.length} events across Africa
              </p>
            </div>
          </div>

          <p className="text-xl text-white/80 max-w-3xl mb-8">
            Our hackathon series brought together {totalParticipants}+ developers, data scientists,
            and domain experts to build {totalModels} open-source AI models addressing African challenges.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: hackathons.length, label: 'Events' },
              { value: `${totalParticipants}+`, label: 'Participants' },
              { value: totalModels, label: 'AI Models' },
              { value: '8', label: 'Countries' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                <div className="text-2xl font-bold text-[#F5CE2A]">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <MethodologySection steps={methodology} />

      {/* Hackathon grid section */}
      <section className="py-16 bg-stone-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#003399] dark:text-white font-[Barlow]">
                All Hackathons
              </h2>
              <p className="text-stone-600 dark:text-stone-400">
                {filteredHackathons.length} event{filteredHackathons.length !== 1 ? 's' : ''}
                {selectedCountry && ' in selected country'}
              </p>
            </div>
            <CountryFilter
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
            />
          </div>

          {/* Grid */}
          <HackathonGrid
            hackathons={filteredHackathons}
            onHackathonClick={handleHackathonClick}
          />

          {/* Empty state */}
          {filteredHackathons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-600 dark:text-stone-400">
                No hackathons found for the selected country.
              </p>
              <button
                onClick={() => handleCountryChange(null)}
                className="mt-4 text-[#003399] dark:text-[#9BB1DC] font-medium hover:underline"
              >
                View all hackathons
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
