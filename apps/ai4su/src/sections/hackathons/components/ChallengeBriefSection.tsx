import { Download, FileText, Target } from 'lucide-react'
import type { ChallengeBriefSectionProps } from '@/../product/sections/hackathons/types'

export function ChallengeBriefSection({ challengeBrief, onDownload }: ChallengeBriefSectionProps) {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#003399]/10 dark:bg-[#003399]/20 flex items-center justify-center">
          <Target className="w-5 h-5 text-[#003399] dark:text-[#9BB1DC]" />
        </div>
        <h2 className="text-2xl font-bold text-[#003399] dark:text-white font-[Barlow]">
          Challenge Brief
        </h2>
      </div>

      <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#003399] dark:text-white font-[Barlow] mb-4">
          {challengeBrief.title}
        </h3>

        <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
          {challengeBrief.summary}
        </p>

        <button
          onClick={() => onDownload(challengeBrief.pdfUrl)}
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#F5CE2A] text-[#003399] font-bold rounded-lg
                   hover:bg-[#FFE066] transition-colors shadow-lg shadow-[#F5CE2A]/25"
        >
          <FileText className="w-5 h-5" />
          <span>Download Challenge Brief (PDF)</span>
          <Download className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
