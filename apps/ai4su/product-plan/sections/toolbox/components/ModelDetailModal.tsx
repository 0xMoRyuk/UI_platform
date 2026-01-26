'use client'

import { useEffect, useRef } from 'react'
import { X, Github, ExternalLink, Cpu, FileText, Target, Link as LinkIcon } from 'lucide-react'
import type { ModelDetailModalProps } from '../types'

const sectorColors: Record<string, { bg: string; text: string }> = {
  agriculture: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
  healthcare: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
  fintech: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
  education: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
  environment: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300' },
  logistics: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300' },
}

const countryNames: Record<string, string> = {
  KE: 'Kenya',
  NG: 'Nigeria',
  GH: 'Ghana',
  SN: 'Senegal',
  RW: 'Rwanda',
  ZA: 'South Africa',
  EG: 'Egypt',
  MA: 'Morocco',
}

const countryFlags: Record<string, string> = {
  KE: '🇰🇪',
  NG: '🇳🇬',
  GH: '🇬🇭',
  SN: '🇸🇳',
  RW: '🇷🇼',
  ZA: '🇿🇦',
  EG: '🇪🇬',
  MA: '🇲🇦',
}

export function ModelDetailModal({ model, isOpen, onClose, onGitHubClick }: ModelDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!isOpen || !model) return null

  const colors = sectorColors[model.sector] || sectorColors.agriculture

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#003399] to-[#002266] text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
              {model.sector.charAt(0).toUpperCase() + model.sector.slice(1)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/80">
              <span>{countryFlags[model.country]}</span>
              <span>{countryNames[model.country]}</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold font-[Barlow]">{model.name}</h2>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#003399] dark:text-[#9BB1DC] mb-2">
              <FileText className="w-4 h-4" />
              <span>Description</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.fullDescription}
            </p>
          </div>

          {/* Use Case */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#003399] dark:text-[#9BB1DC] mb-2">
              <Target className="w-4 h-4" />
              <span>Use Case</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.useCase}
            </p>
          </div>

          {/* Technical Requirements */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#003399] dark:text-[#9BB1DC] mb-2">
              <Cpu className="w-4 h-4" />
              <span>Technical Requirements</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 font-mono text-sm bg-stone-50 dark:bg-stone-800 rounded-lg px-4 py-3">
              {model.technicalRequirements}
            </p>
          </div>

          {/* Hackathon Link */}
          {model.hackathonId && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#003399] dark:text-[#9BB1DC] mb-2">
                <LinkIcon className="w-4 h-4" />
                <span>Related Hackathon</span>
              </div>
              <a
                href={`/hackathons/${model.hackathonId}`}
                className="inline-flex items-center gap-2 text-[#003399] dark:text-[#9BB1DC] hover:underline"
              >
                View hackathon details
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 dark:border-stone-700 p-6 bg-stone-50 dark:bg-stone-800/50">
          <button
            onClick={() => onGitHubClick(model.githubUrl)}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#003399] text-white font-semibold rounded-xl
                     hover:bg-[#002266] transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
