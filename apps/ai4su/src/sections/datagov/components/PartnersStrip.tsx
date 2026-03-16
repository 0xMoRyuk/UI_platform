import { ExternalLink } from 'lucide-react'
import type { PartnersStripProps } from '@/../product/sections/datagov/types'

export function PartnersStrip({ partners, onPartnerClick }: PartnersStripProps) {
  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-primary dark:text-white font-[Barlow] text-center mb-10">
          {partners.sectionTitle}
        </h2>

        {/* Funders */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-stone-500 dark:text-stone-500 uppercase tracking-wide mb-4 text-center">
            {partners.funders.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.funders.members.map((funder) => (
              <div
                key={funder.id}
                className="flex items-center gap-2 bg-white dark:bg-stone-900 rounded-xl px-5 py-3 border border-stone-200 dark:border-stone-700 shadow-sm"
              >
                <span className="text-2xl" role="img" aria-label={funder.name}>
                  {funder.flag}
                </span>
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  {funder.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Implementing Partners */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-stone-500 dark:text-stone-500 uppercase tracking-wide mb-4 text-center">
            {partners.implementingPartners.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.implementingPartners.members.map((partner) => (
              <button
                key={partner.id}
                onClick={() => onPartnerClick?.(partner.id, partner.websiteUrl)}
                className="group flex items-center gap-2 bg-white dark:bg-stone-900 rounded-xl px-5 py-3 border border-stone-200 dark:border-stone-700 shadow-sm hover:border-brand-primary hover:shadow-md transition-all duration-200"
              >
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-brand-primary">
                  {partner.name}
                </span>
                <ExternalLink className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
