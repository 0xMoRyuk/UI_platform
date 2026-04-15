import { LeadPartnerCard } from './LeadPartnerCard'
import { PartnerCard } from './PartnerCard'
import type { ImplementingPartnersSectionProps } from '@/../product/sections/partners/types'

export function ImplementingPartnersSection({ partners, onPartnerClick }: ImplementingPartnersSectionProps) {
  const leadPartner = partners.partners.find((p) => p.isLead)
  const otherPartners = partners.partners.filter((p) => !p.isLead)
  const orderedPartners = leadPartner ? [leadPartner, ...otherPartners] : otherPartners

  return (
    <section className="py-16 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orderedPartners.map((partner) =>
            partner.isLead ? (
              <LeadPartnerCard
                key={partner.id}
                partner={partner}
                onClick={() => onPartnerClick?.(partner.id, partner.websiteUrl)}
              />
            ) : (
              <PartnerCard
                key={partner.id}
                partner={partner}
                onClick={() => onPartnerClick?.(partner.id, partner.websiteUrl)}
              />
            ),
          )}
        </div>
      </div>
    </section>
  )
}
