'use client'

import { useState } from 'react'
import type { HackathonDetailPageProps } from '@/../product/sections/hackathons/types'
import { Breadcrumb } from './Breadcrumb'
import { HackathonHero } from './HackathonHero'
import { ShareButtons } from './ShareButtons'
import { ChallengeBriefSection } from './ChallengeBriefSection'
import { WinningTeamsSection } from './WinningTeamsSection'
import { OutcomesSection } from './OutcomesSection'
import { PhotoGallery } from './PhotoGallery'
import { Lightbox } from './Lightbox'

export function HackathonDetail({
  hackathon,
  fieldLabels,
  onBackClick,
  onChallengeBriefDownload,
  onBestPracticesDownload,
  onModelClick,
  onPhotoClick,
  onShare,
}: HackathonDetailPageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoId, setCurrentPhotoId] = useState<string | null>(null)

  const handlePhotoClick = (photoId: string) => {
    setCurrentPhotoId(photoId)
    setLightboxOpen(true)
    onPhotoClick?.(photoId)
  }

  const handleLightboxClose = () => {
    setLightboxOpen(false)
    setCurrentPhotoId(null)
  }

  const handleLightboxNext = () => {
    const currentIndex = hackathon.photos.findIndex((p) => p.id === currentPhotoId)
    if (currentIndex < hackathon.photos.length - 1) {
      setCurrentPhotoId(hackathon.photos[currentIndex + 1].id)
    }
  }

  const handleLightboxPrevious = () => {
    const currentIndex = hackathon.photos.findIndex((p) => p.id === currentPhotoId)
    if (currentIndex > 0) {
      setCurrentPhotoId(hackathon.photos[currentIndex - 1].id)
    }
  }

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    onShare?.(platform)
    // In a real app, this would open share dialogs
    const url = window.location.href
    const text = `Check out the ${hackathon.name} hackathon! ${hackathon.tagline}`

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    } else {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-stone-950">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between">
          <Breadcrumb
            hackathonName={hackathon.name}
            onBackClick={onBackClick || (() => {})}
          />
          <ShareButtons hackathon={hackathon} onShare={handleShare} />
        </div>
      </div>

      {/* Hero */}
      <HackathonHero hackathon={hackathon} fieldLabels={fieldLabels} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Challenge Brief */}
        <ChallengeBriefSection
          challengeBrief={hackathon.challengeBrief}
          onDownload={onChallengeBriefDownload || (() => {})}
        />

        {/* Winning Teams */}
        <WinningTeamsSection
          teams={hackathon.winningTeams}
          onModelClick={onModelClick}
        />

        {/* Outcomes */}
        <OutcomesSection outcomes={hackathon.outcomes} />

        {/* Photo Gallery */}
        <PhotoGallery
          photos={hackathon.photos}
          onPhotoClick={handlePhotoClick}
        />

        {/* Best Practices Download (if available) */}
        {hackathon.bestPracticesId && (
          <section className="py-12 border-t border-stone-200 dark:border-stone-800">
            <div className="bg-brand-primary rounded-2xl p-8 text-brand-primary-foreground text-center">
              <h3 className="text-2xl font-bold font-[Barlow] mb-3">
                Best Practices Report
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Download our comprehensive best practices report from this hackathon to learn
                what worked and how to replicate success.
              </p>
              <button
                onClick={() => onBestPracticesDownload?.(hackathon.bestPracticesId!)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-accent-foreground font-bold rounded-lg
                         hover:bg-[#FFE066] transition-colors"
              >
                Download Best Practices (PDF)
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        photos={hackathon.photos}
        currentPhotoId={currentPhotoId}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onNext={handleLightboxNext}
        onPrevious={handleLightboxPrevious}
      />
    </main>
  )
}
