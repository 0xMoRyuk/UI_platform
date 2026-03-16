import { Download, FileText, CheckCircle, Trophy } from 'lucide-react'
import type { StudySectionProps, Study, StudiesSectionContent } from '@/../product/sections/toolbox/types'
import type { BestPractices } from '@/../product/sections/toolbox/types'

// =============================================================================
// Study Card — blue accent
// =============================================================================

interface StudyCardProps {
  study: Study
  content: Pick<StudiesSectionContent, 'keyFindingsLabel' | 'downloadLabel'>
  onDownload: () => void
}

function StudyCard({ study, content, onDownload }: StudyCardProps) {
  return (
    <div className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header — blue */}
      <div className="bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 dark:from-brand-primary/20 dark:to-brand-primary/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white dark:bg-stone-700 flex items-center justify-center shadow-sm">
            <FileText className="w-5 h-5 text-brand-primary" />
          </div>
          <span className="text-sm font-medium text-stone-600 dark:text-stone-400">{study.partner}</span>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-500">
          {new Date(study.publishedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-primary dark:text-white mb-2 font-[Barlow] group-hover:text-brand-accent transition-colors">
          {study.title}
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
          {study.description}
        </p>

        {/* Key findings */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-stone-500 dark:text-stone-500 uppercase tracking-wide mb-2">
            {content.keyFindingsLabel}
          </p>
          <ul className="space-y-1.5">
            {study.keyFindings.slice(0, 2).map((finding, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
                <CheckCircle className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                <span className="line-clamp-1">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Download */}
        <button
          onClick={onDownload}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-secondary font-medium rounded-lg
                   hover:bg-brand-primary hover:text-brand-primary-foreground transition-colors"
        >
          <Download className="w-4 h-4" />
          {content.downloadLabel}
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// Best Practices Card — amber accent
// =============================================================================

interface BPCardProps {
  bp: BestPractices
  downloadLabel: string
  onDownload: () => void
}

function BPCard({ bp, downloadLabel, onDownload }: BPCardProps) {
  return (
    <div className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header — amber */}
      <div className="bg-gradient-to-r from-brand-accent/15 to-brand-accent/5 dark:from-brand-accent/20 dark:to-brand-accent/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white dark:bg-stone-700 flex items-center justify-center shadow-sm">
            <Trophy className="w-5 h-5 text-brand-accent" />
          </div>
          <span className="text-sm font-medium text-stone-600 dark:text-stone-400">{bp.hackathonName}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-primary dark:text-white mb-2 font-[Barlow] group-hover:text-brand-accent transition-colors">
          {bp.title}
        </h3>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-4">
          {bp.highlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
              <CheckCircle className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Download */}
        <button
          onClick={onDownload}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-accent/10 dark:bg-brand-accent/20 text-brand-primary dark:text-brand-secondary font-medium rounded-lg
                   hover:bg-brand-primary hover:text-brand-primary-foreground transition-colors"
        >
          <Download className="w-4 h-4" />
          {downloadLabel}
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// Merged Section
// =============================================================================

interface ResearchSectionProps extends StudySectionProps {
  bestPractices: BestPractices[]
  bestPracticesContent: { downloadLabel: string }
  onBestPracticesDownload: (id: string, pdfUrl: string) => void
}

export function StudiesSection({
  studies,
  content,
  onDownload,
  bestPractices,
  bestPracticesContent,
  onBestPracticesDownload,
}: ResearchSectionProps) {
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map((study) => (
          <StudyCard
            key={study.id}
            study={study}
            content={content}
            onDownload={() => onDownload(study.id, study.pdfUrl)}
          />
        ))}
        {bestPractices.map((bp) => (
          <BPCard
            key={bp.id}
            bp={bp}
            downloadLabel={bestPracticesContent.downloadLabel}
            onDownload={() => onBestPracticesDownload(bp.id, bp.pdfUrl)}
          />
        ))}
      </div>
    </section>
  )
}
