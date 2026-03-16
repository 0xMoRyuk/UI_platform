'use client'

import { useState } from 'react'
import { Separator } from '@ui-platform/ui/components/separator'
import { Button } from '@ui-platform/ui/components/button'
import type { HackathonDetailPageProps } from '@/../product/sections/hackathons/types'
import hackathonsDataRaw from '../../../../product/sections/hackathons/data.json'

const ui = (hackathonsDataRaw as Record<string, unknown>).ui as Record<string, string>
import { ModelCard } from '@/sections/toolbox/components'
import { Breadcrumb } from './Breadcrumb'
import { HackathonHero } from './HackathonHero'
import { ShareButtons } from './ShareButtons'
import { ChallengeBriefSection } from './ChallengeBriefSection'
import { WinningTeamsSection } from './WinningTeamsSection'
import { PhotoGallery } from './PhotoGallery'
import { Lightbox } from './Lightbox'

export function HackathonDetail({
  hackathon,
  models,
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

        {/* AI Models Produced */}
        {models && models.length > 0 && (
          <>
          <Separator />
          <section className="py-12">
            <h2 className="text-2xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-6">
              {ui.modelsProduced}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {models.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onClick={() => onModelClick?.(model.id)}
                />
              ))}
            </div>
          </section>
          </>
        )}

        {/* Winning Teams */}
        <WinningTeamsSection
          teams={hackathon.winningTeams}
          onModelClick={onModelClick}
        />

        {/* Photo Gallery */}
        <PhotoGallery
          photos={hackathon.photos}
          onPhotoClick={handlePhotoClick}
        />

        {/* Best Practices Download (if available) */}
        {hackathon.bestPracticesId && (
          <>
          <Separator />
          <section className="py-12">
            <div className="bg-brand-primary rounded-2xl p-8 text-brand-primary-foreground text-center">
              <h3 className="text-2xl font-bold font-[Barlow] mb-3">
                {ui.bestPracticesReport}
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                {ui.bestPracticesDescription}
              </p>
              <Button
                onClick={() => onBestPracticesDownload?.(hackathon.bestPracticesId!)}
                className="gap-2 px-6 py-3 h-auto bg-brand-accent text-brand-accent-foreground font-bold rounded-lg
                         hover:bg-[#FFE066]"
              >
                {ui.downloadBestPractices}
              </Button>
            </div>
          </section>
          </>
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
