import { Sparkles } from 'lucide-react'
import { EUAttributionBanner } from './EUAttributionBanner'
import { TeamEuropeGrid } from './TeamEuropeGrid'
import { HashtagsDisplay } from './HashtagsDisplay'
import type { FundersSectionProps } from '@/../product/sections/partners/types'

export function FundersSection({ funders, onMemberClick }: FundersSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-brand-secondary/20 to-white dark:from-brand-primary/20 dark:to-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full text-sm font-medium text-brand-primary dark:text-brand-secondary mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Tier 1 - Funders</span>
          </div>
          <h2 className="text-3xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-4">
            {funders.sectionTitle}
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {funders.sectionDescription}
          </p>
        </div>

        {/* EU Attribution */}
        <EUAttributionBanner attribution={funders.euAttribution} />

        {/* Team Europe */}
        <TeamEuropeGrid
          teamEurope={funders.teamEurope}
          onMemberClick={onMemberClick}
        />

        {/* Hashtags */}
        <div className="flex justify-center">
          <HashtagsDisplay hashtags={funders.hashtags} />
        </div>
      </div>
    </section>
  )
}
