'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hackathons, HackathonDetail } from './components'
import type { CountryCode, Hackathon, HackathonsPageProps, HackathonFieldLabels } from '@/../product/sections/hackathons/types'
import hackathonsDataRaw from '@/../product/sections/hackathons/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const hackathonsData = hackathonsDataRaw as unknown as Omit<HackathonsPageProps, 'onHackathonClick' | 'onCountryFilter'> & { hackathons: Hackathon[]; fieldLabels: HackathonFieldLabels }

export function HackathonsPreview() {
  const router = useRouter()
  const [selectedHackathon, setSelectedHackathon] = useState<string | null>(null)

  const hackathon = selectedHackathon
    ? hackathonsData.hackathons.find((h) => h.slug === selectedHackathon)
    : null

  const handleHackathonClick = (slug: string) => {
    setSelectedHackathon(slug)
    // In production: router.push(`/hackathons/${slug}`)
  }

  const handleBackClick = () => {
    setSelectedHackathon(null)
  }

  const handleCountryFilter = (country: CountryCode | null) => {
    console.log('Country filter:', country)
  }

  const handleChallengeBriefDownload = (url: string) => {
    console.log('Challenge brief download:', url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleBestPracticesDownload = (bpId: string) => {
    console.log('Best practices download:', bpId)
  }

  const handleModelClick = (modelId: string) => {
    console.log('Model clicked:', modelId)
    router.push(`/deliverables/models/${modelId}`)
  }

  const handlePhotoClick = (photoId: string) => {
    console.log('Photo clicked:', photoId)
  }

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    console.log('Share on:', platform)
  }

  // Show detail page if hackathon is selected
  if (hackathon) {
    return (
      <HackathonDetail
        hackathon={hackathon}
        fieldLabels={hackathonsData.fieldLabels}
        onBackClick={handleBackClick}
        onChallengeBriefDownload={handleChallengeBriefDownload}
        onBestPracticesDownload={handleBestPracticesDownload}
        onModelClick={handleModelClick}
        onPhotoClick={handlePhotoClick}
        onShare={handleShare}
      />
    )
  }

  // Show list page
  return (
    <Hackathons
      methodology={hackathonsData.methodology}
      hackathons={hackathonsData.hackathons}
      pageContent={hackathonsData.pageContent}
      methodologyContent={hackathonsData.methodologyContent}
      onHackathonClick={handleHackathonClick}
      onCountryFilter={handleCountryFilter}
    />
  )
}
