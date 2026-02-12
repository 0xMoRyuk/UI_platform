import { Users } from 'lucide-react'
import { LeadPartnerCard } from './LeadPartnerCard'
import { PartnerCard } from './PartnerCard'
import type { ImplementingPartnersSectionProps } from '@/../product/sections/partners/types'

export function ImplementingPartnersSection({ partners, onPartnerClick }: ImplementingPartnersSectionProps) {
  const leadPartner = partners.partners.find((p) => p.isLead)
  const otherPartners = partners.partners.filter((p) => !p.isLead)

  return (
    <section className="py-16 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 dark:bg-stone-800 rounded-full text-sm font-medium text-stone-600 dark:text-stone-400 mb-4">
            <Users className="w-4 h-4" />
            <span>Tier 2 - Implementing Partners</span>
          </div>
          <h2 className="text-3xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-4">
            {partners.sectionTitle}
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {partners.sectionDescription}
          </p>
        </div>

        {/* Lead partner (full width) */}
        {leadPartner && (
          <div className="mb-8">
            <LeadPartnerCard
              partner={leadPartner}
              onClick={() => onPartnerClick?.(leadPartner.id, leadPartner.websiteUrl)}
            />
          </div>
        )}

        {/* Other partners (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherPartners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onClick={() => onPartnerClick?.(partner.id, partner.websiteUrl)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
