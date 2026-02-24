'use client'

import { useParams, useNavigate } from 'react-router-dom'
import { HackathonDetail } from '@/sections/hackathons/components'
import type { Hackathon, HackathonFieldLabels } from '@/../product/sections/hackathons/types'
import hackathonsDataRaw from '@/../product/sections/hackathons/data.json'

// Cast JSON data to proper types (JSON imports lose literal type information)
const hackathonsData = hackathonsDataRaw as unknown as { methodology: unknown; hackathons: Hackathon[]; fieldLabels: HackathonFieldLabels }

export function HackathonDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const hackathon = hackathonsData.hackathons.find(h => h.slug === slug)

  if (!hackathon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
            Hackathon not found
          </h1>
          <button
            onClick={() => navigate('/hackathons')}
            className="text-brand-primary hover:underline"
          >
            ← Back to Hackathons
          </button>
        </div>
      </div>
    )
  }

  const handleBackClick = () => {
    navigate('/hackathons')
  }

  const handleChallengeBriefDownload = () => {
    console.log('[Hackathon] Challenge brief download')
    if (hackathon.challengeBrief?.pdfUrl) {
      window.open(hackathon.challengeBrief.pdfUrl, '_blank')
    }
  }

  const handleBestPracticesDownload = (bpId: string) => {
    console.log('[Hackathon] Best practices download:', bpId)
    // Navigate to toolbox with the best practices highlighted
    navigate(`/deliverables?bp=${bpId}`)
  }

  const handleModelClick = (modelId: string) => {
    navigate(`/deliverables?model=${modelId}`)
  }

  const handlePhotoClick = (photoId: string) => {
    console.log('[Hackathon] Photo clicked:', photoId)
    // Lightbox is handled internally by HackathonDetail component
  }

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    console.log('[Hackathon] Share on:', platform)
    // Sharing is handled internally by HackathonDetail component
  }

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
