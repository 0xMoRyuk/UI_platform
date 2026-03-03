'use client'

import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink, Cpu, FileText, Target, Link as LinkIcon } from 'lucide-react'
import type { AIModel } from '@/../product/sections/toolbox/types'
import type { Hackathon } from '@/../product/sections/hackathons/types'
import toolboxDataRaw from '@/../product/sections/toolbox/data.json'
import hackathonsDataRaw from '@/../product/sections/hackathons/data.json'

const toolboxData = toolboxDataRaw as unknown as { aiModels: AIModel[] }
const hackathonsData = hackathonsDataRaw as unknown as { hackathons: Hackathon[] }

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
  KE: '\u{1F1F0}\u{1F1EA}',
  NG: '\u{1F1F3}\u{1F1EC}',
  GH: '\u{1F1EC}\u{1F1ED}',
  SN: '\u{1F1F8}\u{1F1F3}',
  RW: '\u{1F1F7}\u{1F1FC}',
  ZA: '\u{1F1FF}\u{1F1E6}',
  EG: '\u{1F1EA}\u{1F1EC}',
  MA: '\u{1F1F2}\u{1F1E6}',
}

export function ModelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const model = toolboxData.aiModels.find(m => m.id === id)

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
            Model not found
          </h1>
          <button
            onClick={() => navigate('/models')}
            className="text-brand-primary hover:underline"
          >
            &larr; Back to AI Models
          </button>
        </div>
      </div>
    )
  }

  const hackathon = model.hackathonId
    ? hackathonsData.hackathons.find(h => h.id === model.hackathonId)
    : null

  const colors = sectorColors[model.sector] || sectorColors.agriculture

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-brand-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/models')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to AI Models</span>
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
              <span>Description</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.fullDescription}
            </p>
          </div>

          {/* Use Case */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
              <Target className="w-4 h-4" />
              <span>Use Case</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {model.useCase}
            </p>
          </div>

          {/* Technical Requirements */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
              <Cpu className="w-4 h-4" />
              <span>Technical Requirements</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 font-mono text-sm bg-stone-50 dark:bg-stone-800 rounded-lg px-4 py-3">
              {model.technicalRequirements}
            </p>
          </div>

          {/* Hackathon Link */}
          {hackathon && (
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary dark:text-brand-secondary mb-2">
                <LinkIcon className="w-4 h-4" />
                <span>Related Hackathon</span>
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
          <div className="pt-6 border-t border-stone-200 dark:border-stone-700">
            <a
              href={model.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-primary text-brand-primary-foreground font-semibold rounded-xl
                       hover:bg-brand-primary-dark transition-colors w-full sm:w-auto"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
