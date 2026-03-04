import { Download, FileText, Target } from 'lucide-react'
import { Button } from '@ui-platform/ui/components/button'
import type { ChallengeBriefSectionProps } from '@/../product/sections/hackathons/types'
import hackathonsDataRaw from '../../../../product/sections/hackathons/data.json'

const ui = (hackathonsDataRaw as Record<string, unknown>).ui as Record<string, string>

export function ChallengeBriefSection({ challengeBrief, onDownload }: ChallengeBriefSectionProps) {
  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
          <Target className="w-5 h-5 text-brand-primary dark:text-brand-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-brand-primary dark:text-white font-[Barlow]">
          {ui.challengeBrief}
        </h2>
      </div>

      <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-4">
          {challengeBrief.title}
        </h3>

        <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
          {challengeBrief.summary}
        </p>

        <Button
          onClick={() => onDownload(challengeBrief.pdfUrl)}
          className="gap-3 px-6 py-3 h-auto bg-brand-accent text-brand-accent-foreground font-bold rounded-lg
                   hover:bg-[#FFE066] shadow-lg shadow-brand-accent/25"
        >
          <FileText className="w-5 h-5" />
          <span>{ui.downloadChallengeBrief}</span>
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </section>
  )
}
