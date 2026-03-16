'use client'

import { X, Github, ExternalLink, FileText, Target, Link as LinkIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@ui-platform/ui/components/dialog'
import { Button } from '@ui-platform/ui/components/button'
import { Separator } from '@ui-platform/ui/components/separator'
import type { ModelDetailModalProps } from '@/../product/sections/toolbox/types'
import { sectorColors, countryNames, countryFlags } from '../../../shared/lookups'
import toolboxDataRaw from '../../../../product/sections/toolbox/data.json'

const ui = (toolboxDataRaw as Record<string, unknown>).ui as Record<string, string>

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
            <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: colors.bg, color: colors.text }}>
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
              <span>{ui.description}</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.fullDescription}
            </p>
          </div>

          {/* Use Case */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
              <Target className="w-4 h-4" />
              <span>{ui.useCase}</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.useCase}
            </p>
          </div>

          {/* Hackathon Link */}
          {model.hackathonId && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
                <LinkIcon className="w-4 h-4" />
                <span>{ui.relatedHackathon}</span>
              </div>
              <a
                href={`/hackathons/${model.hackathonId}`}
                className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-secondary hover:underline"
              >
                {ui.viewHackathonDetails}
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
            <span>{ui.viewOnGithubFull}</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
