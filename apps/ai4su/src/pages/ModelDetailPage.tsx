'use client'

import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink, FileText, Target, Link as LinkIcon } from 'lucide-react'
import { Separator } from '@ui-platform/ui/components/separator'
import { Button } from '@ui-platform/ui/components/button'
import type { Hackathon } from '@/../product/sections/hackathons/types'
import { getModelById } from '@/lib/data-provider'
import hackathonsDataRaw from '@/../product/sections/hackathons/data.json'
import toolboxDataRaw from '@/../product/sections/toolbox/data.json'
import { sectorColors, countryNames, countryFlags } from '@/shared/lookups'

const hackathonsData = hackathonsDataRaw as unknown as { hackathons: Hackathon[] }
const ui = (toolboxDataRaw as Record<string, unknown>).ui as Record<string, string>

export function ModelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const model = id ? getModelById(id) : null

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
            {ui.modelNotFound}
          </h1>
          <Button
            variant="link"
            onClick={() => navigate('/models')}
            className="text-brand-primary"
          >
            {ui.backToModels}
          </Button>
        </div>
      </div>
    )
  }

  const hackathon = model.hackathonId
    ? hackathonsData.hackathons.find(h => h.id === model.hackathonId)
    : null

  const colors = sectorColors[model.sector] || sectorColors['crop-science']

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-brand-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Button
            variant="ghost"
            onClick={() => navigate('/models')}
            className="gap-2 text-white/80 hover:text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{ui.backToModels}</span>
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

          <h1 className="text-3xl sm:text-4xl font-bold font-[Barlow]">{model.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 p-6 sm:p-8">
          {/* Description */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
              <FileText className="w-4 h-4" />
              <span>{ui.description}</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.fullDescription}
            </p>
          </div>

          {/* Use Case */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
              <Target className="w-4 h-4" />
              <span>{ui.useCase}</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.useCase}
            </p>
          </div>

          {/* Hackathon Link */}
          {hackathon && (
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
                <LinkIcon className="w-4 h-4" />
                <span>{ui.relatedHackathon}</span>
              </div>
              <Link
                to={`/hackathons/${hackathon.slug}`}
                className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-secondary hover:underline"
              >
                {hackathon.name}
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          )}

          {/* GitHub Button */}
          <Separator className="mb-6" />
          <div>
            <Button
              asChild
              className="gap-3 px-6 py-4 h-auto bg-brand-primary text-brand-primary-foreground font-semibold rounded-xl
                       hover:bg-brand-primary-dark w-full sm:w-auto"
            >
              <a href={model.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                <span>{ui.viewOnGithubFull}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
