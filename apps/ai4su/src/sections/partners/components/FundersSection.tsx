import { EUAttributionBanner } from './EUAttributionBanner'
import type { FundersSectionProps } from '@/../product/sections/partners/types'

export function FundersSection({ funders }: FundersSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-brand-secondary/20 to-white dark:from-brand-primary/20 dark:to-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EUAttributionBanner attribution={funders.euAttribution} />
      </div>
    </section>
  )
}
