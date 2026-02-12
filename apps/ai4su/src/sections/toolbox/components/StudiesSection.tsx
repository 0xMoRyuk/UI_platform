import { Download, FileText, CheckCircle } from 'lucide-react'
import type { StudySectionProps, Study } from '@/../product/sections/toolbox/types'

interface StudyCardProps {
  study: Study
  onDownload: () => void
}

function StudyCard({ study, onDownload }: StudyCardProps) {
  return (
    <div className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header with partner logo placeholder */}
      <div className="bg-gradient-to-r from-stone-100 to-stone-50 dark:from-stone-800 dark:to-stone-850 p-4 flex items-center justify-between">
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
            Key Findings
          </p>
          <ul className="space-y-1.5">
            {study.keyFindings.slice(0, 2).map((finding, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Download button */}
        <button
          onClick={onDownload}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-secondary font-medium rounded-lg
                   hover:bg-brand-primary hover:text-brand-primary-foreground transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
    </div>
  )
}

export function StudiesSection({ studies, onDownload }: StudySectionProps) {
  return (
    <section className="py-12 border-t border-stone-200 dark:border-stone-800">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-2">
          Research & Studies
        </h2>
        <p className="text-stone-600 dark:text-stone-400">
          In-depth analysis and research from our partner organizations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map((study) => (
          <StudyCard
            key={study.id}
            study={study}
            onDownload={() => onDownload(study.id, study.pdfUrl)}
          />
        ))}
      </div>
    </section>
  )
}
