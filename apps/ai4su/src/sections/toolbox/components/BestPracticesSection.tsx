import { Download, Trophy, Sparkles } from 'lucide-react'
import type { BestPracticesSectionProps, BestPractices } from '@/../product/sections/toolbox/types'

interface BestPracticesCardProps {
  bp: BestPractices
  onDownload: () => void
}

function BestPracticesCard({ bp, onDownload }: BestPracticesCardProps) {
  return (
    <div className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 hover:shadow-lg hover:border-brand-primary dark:hover:border-brand-secondary transition-all duration-300">
      {/* Hackathon reference */}
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-brand-accent" />
        <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
          {bp.hackathonName}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-brand-primary dark:text-white mb-3 font-[Barlow] group-hover:text-brand-accent transition-colors">
        {bp.title}
      </h3>

      {/* Highlights */}
      <ul className="space-y-2 mb-4">
        {bp.highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Download button */}
      <button
        onClick={onDownload}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary dark:text-brand-secondary hover:text-brand-accent transition-colors"
      >
        <Download className="w-4 h-4" />
        Download Report
      </button>
    </div>
  )
}

export function BestPracticesSection({ bestPractices, onDownload }: BestPracticesSectionProps) {
  return (
    <section className="py-12 border-t border-stone-200 dark:border-stone-800">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-2">
          Hackathon Best Practices
        </h2>
        <p className="text-stone-600 dark:text-stone-400">
          Lessons learned and best practices from each hackathon event.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bestPractices.map((bp) => (
          <BestPracticesCard
            key={bp.id}
            bp={bp}
            onDownload={() => onDownload(bp.id, bp.pdfUrl)}
          />
        ))}
      </div>
    </section>
  )
}
