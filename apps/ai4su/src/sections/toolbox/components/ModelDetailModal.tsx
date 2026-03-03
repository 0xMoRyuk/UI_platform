'use client'

import { X, Github, ExternalLink, Cpu, FileText, Target, Link as LinkIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@ui-platform/ui/components/dialog'
import { Button } from '@ui-platform/ui/components/button'
import { Separator } from '@ui-platform/ui/components/separator'
import type { ModelDetailModalProps } from '@/../product/sections/toolbox/types'

const sectorColors: Record<string, { bg: string; text: string }> = {
  'crop-science': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
  'livestock': { bg: 'bg-lime-100 dark:bg-lime-900/30', text: 'text-lime-700 dark:text-lime-300' },
  'precision-farming': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
  'agri-finance': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  'supply-chain': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300' },
  'climate-resilience': { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300' },
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
  if (!model) return null

  const colors = sectorColors[model.sector] || sectorColors['crop-science']

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent
        className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl p-0 overflow-hidden gap-0 border-0"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="relative bg-gradient-to-r from-brand-primary to-brand-primary-dark text-brand-primary-foreground p-6 space-y-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3 mb-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
              {model.sector.charAt(0).toUpperCase() + model.sector.slice(1)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/80">
              <span>{countryFlags[model.country]}</span>
              <span>{countryNames[model.country]}</span>
            </span>
          </div>

          <DialogTitle className="text-2xl font-bold font-[Barlow] text-white">
            {model.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Details for {model.name} AI model
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
              <FileText className="w-4 h-4" />
              <span>Description</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.fullDescription}
            </p>
          </div>

          {/* Use Case */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
              <Target className="w-4 h-4" />
              <span>Use Case</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.useCase}
            </p>
          </div>

          {/* Technical Requirements */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
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
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
                <LinkIcon className="w-4 h-4" />
                <span>Related Hackathon</span>
              </div>
              <a
                href={`/hackathons/${model.hackathonId}`}
                className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-secondary hover:underline"
              >
                View hackathon details
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <Separator />
        <div className="p-6 bg-stone-50 dark:bg-stone-800/50">
          <Button
            onClick={() => onGitHubClick(model.githubUrl)}
            className="w-full gap-3 px-6 py-4 h-auto bg-brand-primary text-brand-primary-foreground font-semibold rounded-xl
                     hover:bg-brand-primary-dark"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
